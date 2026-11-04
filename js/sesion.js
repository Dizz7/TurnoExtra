/*
    Gestión de sesiones simuladas de TurnoExtra.
    Proyecto académico sin backend.
*/

const TurnoExtraSesion = {

    // Clave utilizada en sessionStorage
    storageKey: "turnoextra_session",

    // Guardar los datos básicos del usuario
    iniciarSesion(user) {
        const session = {
            email: user.email,
            role: user.role
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

    // Cerrar la sesión
    cerrarSesion() {
        sessionStorage.removeItem(this.storageKey);
        window.location.href = "login.html";
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
