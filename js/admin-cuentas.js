/*
    Gestión de usuarios y clientes de TurnoExtra.
    Consulta de cuentas, asignación de roles y control de acceso.
*/

document.addEventListener("DOMContentLoaded", () => {
    if (!TurnoExtraSesion.tieneRol("administrador")) return;

    const lista = document.getElementById("account-list");
    const plantilla = document.getElementById("account-row");
    const filtro = document.getElementById("account-search");
    const mensaje = document.getElementById("account-message");

    // Identificar cada cuenta por su correo de acceso, incluso si cambia el de contacto
    function mostrar() {
        lista.replaceChildren();
        const sesion = TurnoExtraSesion.obtenerSesion();
        if (sesion?.role !== "administrador") return;
        const texto = filtro.value.trim().toLowerCase();
        for (const cuenta of TurnoExtraCuentas.leer()) {
            if (!(cuenta.perfil.fullName + " " + cuenta.email).toLowerCase().includes(texto)) continue;
            const fila = plantilla.content.firstElementChild.cloneNode(true);
            fila.querySelector("strong").textContent = cuenta.perfil.fullName;
            fila.querySelector(".account-email").textContent = cuenta.email;
            const { role, estado } = fila.elements;
            role.value = cuenta.role;
            estado.value = cuenta.activa ? "activa" : "inactiva";
            if (cuenta.email === sesion.email) {
                role.disabled = estado.disabled = fila.querySelector("button").disabled = true;
                fila.querySelector("button").textContent = "Tu cuenta";
            }
            fila.addEventListener("submit", (evento) => {
                evento.preventDefault();
                try {
                    TurnoExtraCuentas.administrar(cuenta.email, role.value, estado.value === "activa");
                    mensaje.textContent = "Permisos guardados para " + cuenta.email + ".";
                } catch (error) {
                    mensaje.textContent = error instanceof DOMException ? "No se pudo guardar el cambio." : error.message;
                }
                mostrar();
            });
            lista.appendChild(fila);
        }
        if (!lista.children.length) lista.textContent = "No hay cuentas que coincidan con la búsqueda.";
    }

    filtro.addEventListener("input", mostrar);
    window.addEventListener("storage", (evento) => {
        if (evento.key === TurnoExtraSesion.claveCuentas) mostrar();
    });
    mostrar();
});
