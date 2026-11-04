/*
    Gestión de sesiones simuladas de TurnoExtra.
    Proyecto académico sin backend.
*/

const loginUrl = new URL("../pages/login.html", document.currentScript.src);

const TurnoExtraSesion = {

    // Clave utilizada en sessionStorage
    storageKey: "turnoextra_session",

    claveCuentas: "turnoextra_cuentas",

    // Guardar los datos básicos del usuario
    iniciarSesion(user) {
        const session = {
            email: user.email,
            role: user.role,
            version: user.version ?? 0
        };

        sessionStorage.setItem(
            this.storageKey,
            JSON.stringify(session)
        );
    },

    // Obtener la sesión actual
    obtenerSesion() {
        const savedSession = sessionStorage.getItem(this.storageKey);

        if (!savedSession) {
            return null;
        }

        try {
            const session = JSON.parse(savedSession);

            if (
                session &&
                typeof session.email === "string" &&
                ["cliente", "administrador"].includes(session.role)
            ) {
                // Invalidar sesiones anteriores a un cambio de rol o desactivación
                const directorio = localStorage.getItem(this.claveCuentas);
                if (directorio !== null) {
                    const cuenta = JSON.parse(directorio).find((c) => c.email === session.email);
                    if (!cuenta?.activa || cuenta.role !== session.role || cuenta.version !== (session.version ?? 0)) {
                        sessionStorage.removeItem(this.storageKey);
                        return null;
                    }
                }
                return session;
            }
        } catch (error) {
            console.warn("No se pudo recuperar la sesión.", error);
        }

        return null;
    },

    // Comprobar si hay un usuario conectado
    estaAutenticado() {
        return this.obtenerSesion() !== null;
    },

    // Comprobar el rol del usuario
    tieneRol(role) {
        const session = this.obtenerSesion();
        return session !== null && session.role === role;
    },



    // Controlar el acceso a páginas según la sesión y el rol
    protegerPagina(requiredRole = null) {
        const session = this.obtenerSesion();

        // Si no existe una sesión, solicitar inicio de sesión
        if (!session) {
            window.location.replace("login.html");
            return false;
        }

        // Si se exige un rol y el usuario no lo tiene
        if (requiredRole && session.role !== requiredRole) {
            window.location.replace("../index.html");
            return false;
        }

        // El usuario puede acceder
        return true;
    },



    // Cerrar la sesión
    cerrarSesion() {
        sessionStorage.removeItem(this.storageKey);
        window.location.href = loginUrl.href;
    },

    
    // Actualizar los enlaces según el estado de la sesión
    actualizarNavegacion() {
        const session = this.obtenerSesion();

        // Enlaces visibles únicamente para visitantes
        const guestLinks = document.querySelectorAll(
            '[data-session="guest"]'
        );

        // Enlaces visibles para usuarios autenticados
        const profileLinks = document.querySelectorAll(
            '[data-session="profile"]'
        );

        // Enlaces exclusivos del administrador
        const adminLinks = document.querySelectorAll(
            '[data-session="admin"]'
        );

        // Enlaces exclusivos del cliente
        const clientLinks = document.querySelectorAll(
            '[data-session="cliente"]'
        );

        clientLinks.forEach((element) => {
            element.classList.toggle(
                "d-none",
                !this.tieneRol("cliente")
            );
        });

        // Botones para cerrar sesión
        const logoutButtons = document.querySelectorAll(
            '[data-session="logout"]'
        );

        guestLinks.forEach((element) => {
            element.classList.toggle("d-none", session !== null);
        });

        profileLinks.forEach((element) => {
            element.classList.toggle("d-none", session === null);
        });

        adminLinks.forEach((element) => {
            element.classList.toggle(
                "d-none",
                !this.tieneRol("administrador")
            );
        });

        logoutButtons.forEach((element) => {
            element.classList.toggle("d-none", session === null);

            // Evitar registrar el evento más de una vez
            if (element.dataset.listenerAdded !== "true") {
                element.addEventListener("click", () => {
                    this.cerrarSesion();
                });

                element.dataset.listenerAdded = "true";
            }
        });
    }

};

// Actualizar navegación cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
    TurnoExtraSesion.actualizarNavegacion();
});

// Revisar las pantallas abiertas si administración cambia el acceso de la cuenta
window.addEventListener("storage", (evento) => {
    if (evento.key === TurnoExtraSesion.claveCuentas &&
        sessionStorage.getItem(TurnoExtraSesion.storageKey) && !TurnoExtraSesion.obtenerSesion()) {
        window.location.replace(loginUrl.href);
    }
});
