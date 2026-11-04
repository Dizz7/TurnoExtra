/*
    Inicio de sesión simulado de TurnoExtra.
    Validaciones y manipulación del DOM.
*/

document.addEventListener("DOMContentLoaded", () => {

    // Seleccionar los elementos del formulario
    const form = document.getElementById("login-form");
    const email = document.getElementById("login-email");
    const password = document.getElementById("login-password");
    const formMessage = document.getElementById("login-message");

    // Cuentas ficticias para demostrar los dos roles
    const demoUsers = [
        {
            email: "cliente@turnoextra.cl",
            password: "Cliente123!",
            role: "cliente"
        },
        {
            email: "admin@turnoextra.cl",
            password: "Admin123!",
            role: "administrador"
        }
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Marcar un campo según su validez
    function markField(field, isValid) {
        field.classList.toggle("is-valid", isValid);
        field.classList.toggle("is-invalid", !isValid);
        field.setAttribute("aria-invalid", String(!isValid));
    }

    // Mostrar mensajes mediante el DOM
    function showMessage(message, type) {
        formMessage.textContent = message;

        formMessage.classList.remove(
            "message-error",
            "message-success"
        );

        formMessage.classList.add(
            type === "success"
                ? "message-success"
                : "message-error"
        );
    }

    // Comprobar los campos del formulario
    function validateForm() {
        const errors = [];

        const validEmail = emailRegex.test(email.value.trim());
        const validPassword = password.value.trim() !== "";

        markField(email, validEmail);
        markField(password, validPassword);

        if (!validEmail) {
            errors.push("Ingresa un correo electrónico válido.");
        }

        if (!validPassword) {
            errors.push("Ingresa tu contraseña.");
        }

        if (errors.length > 0) {
            showMessage(errors.join(" "), "error");
            return false;
        }

        return true;
    }

    // Validar correo al abandonar el campo
    email.addEventListener("blur", () => {
        if (email.value.trim() !== "") {
            markField(email, emailRegex.test(email.value.trim()));
        }
    });

    // Validar contraseña al abandonar el campo
    password.addEventListener("blur", () => {
        if (password.value !== "") {
            markField(password, true);
        }
    });

    // Procesar el inicio de sesión
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Buscar una cuenta de demostración coincidente
        const user = demoUsers.find((account) =>
            account.email === email.value.trim().toLowerCase() &&
            account.password === password.value
        );

        if (!user) {
            markField(email, false);
            markField(password, false);

            showMessage(
                "El correo o la contraseña no coinciden con las cuentas de demostración.",
                "error"
            );
            return;
        }

        // Guardar la sesión ficticia sin almacenar la contraseña
        TurnoExtraSesion.iniciarSesion(user);

        // Actualizar las opciones del menú después de iniciar sesión
        TurnoExtraSesion.actualizarNavegacion();

        // Mostrar el rol identificado
        const roleName = user.role === "administrador"
            ? "administrador"
            : "cliente";

        showMessage(
            `¡Bienvenido! Has iniciado sesión como ${roleName} (demostración).`,
            "success"
        );
    });

    // Limpiar el formulario y los mensajes
    form.addEventListener("reset", () => {
        formMessage.textContent = "";
        formMessage.classList.remove(
            "message-error",
            "message-success"
        );

        [email, password].forEach((field) => {
            field.classList.remove("is-valid", "is-invalid");
            field.removeAttribute("aria-invalid");
        });
    });

});
