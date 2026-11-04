/*
    Cuentas locales de TurnoExtra.
    Registro, autenticación y administración de clientes en este navegador.
*/

const TurnoExtraCuentas = {
    // Conservar las dos cuentas de evaluación al inicializar el directorio
    leer() {
        const guardado = localStorage.getItem(TurnoExtraSesion.claveCuentas);
        if (guardado !== null) return JSON.parse(guardado);
        return ["cliente", "administrador"].map((role) => {
            const username = role === "cliente" ? "cliente" : "admin";
            const email = username + "@turnoextra.cl";
            const perfil = {
                fullName: role === "cliente" ? "Cliente TurnoExtra" : "Administrador TurnoExtra",
                username, email, birthDate: "2000-05-15", address: ""
            };
            let actual = perfil;
            if (role === "cliente") {
                try {
                    const previo = JSON.parse(localStorage.getItem("turnoextra_demo_profile"));
                    if (previo && Object.keys(perfil).every((k) => typeof previo[k] === "string")) actual = previo;
                } catch (error) {
                    console.warn("No se pudo leer el perfil de demostración.", error);
                }
            }
            return { email, role, activa: true, version: 0, inicial: perfil, perfil: actual };
        });
    },

    guardar(cuentas) {
        localStorage.setItem(TurnoExtraSesion.claveCuentas, JSON.stringify(cuentas));
    },

    // Derivar una huella independiente para cada contraseña nueva
    async huella(password, sal) {
        const clave = await crypto.subtle.importKey("raw", new TextEncoder().encode(password),
            "PBKDF2", false, ["deriveBits"]);
        const bytes = await crypto.subtle.deriveBits({
            name: "PBKDF2", hash: "SHA-256", salt: Uint8Array.from(sal), iterations: 210000
        }, clave, 256);
        return Array.from(new Uint8Array(bytes)).join(".");
    },

    async registrar(perfil, password) {
        const email = perfil.email.trim().toLowerCase();
        const sal = Array.from(crypto.getRandomValues(new Uint8Array(16)));
        const huella = await this.huella(password, sal);
        const cuentas = this.leer();
        if (cuentas.some((cuenta) => cuenta.email === email)) throw new Error("Ese correo ya tiene una cuenta.");
        const datos = { ...perfil, email };
        cuentas.push({ email, role: "cliente", activa: true, version: 0, inicial: datos, perfil: datos, sal, huella });
        this.guardar(cuentas);
    },

    async autenticar(email, password) {
        const cuenta = this.leer().find((c) => c.email === email.trim().toLowerCase());
        if (!cuenta?.activa) return null;
        const demos = { "cliente@turnoextra.cl": "Cliente123!", "admin@turnoextra.cl": "Admin123!" };
        const coincide = cuenta.huella
            ? await this.huella(password, cuenta.sal) === cuenta.huella
            : demos[cuenta.email] === password;
        return coincide ? cuenta : null;
    },

    // El correo de acceso identifica también las compras de la cuenta
    guardarPerfil(email, datos) {
        if (TurnoExtraSesion.obtenerSesion()?.email !== email) throw new Error("Inicia sesión nuevamente.");
        const cuentas = this.leer();
        cuentas.find((cuenta) => cuenta.email === email).perfil = datos;
        this.guardar(cuentas);
    },

    administrar(email, role, activa) {
        const sesion = TurnoExtraSesion.obtenerSesion();
        if (sesion?.role !== "administrador" || sesion.email === email) {
            throw new Error("No puedes modificar los permisos de esta cuenta.");
        }
        if (!["cliente", "administrador"].includes(role) || typeof activa !== "boolean") {
            throw new Error("Revisa el rol y el estado seleccionados.");
        }
        const cuentas = this.leer();
        const cuenta = cuentas.find((c) => c.email === email);
        if (!cuenta) throw new Error("La cuenta ya no está disponible.");
        if (cuenta.role !== role || cuenta.activa !== activa) {
            cuenta.role = role;
            cuenta.activa = activa;
            cuenta.version++;
            this.guardar(cuentas);
        }
    }
};
