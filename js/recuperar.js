/*
    Recuperación de contraseña simulada.
    Validación de correo y manipulación del DOM.
*/

document.addEventListener("DOMContentLoaded", () => {

    // Seleccionar los elementos del formulario
    const form = document.getElementById("recovery-form");
    const email = document.getElementById("recovery-email");
    const formMessage = document.getElementById("recovery-message");

    // Expresión regular para validar el correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Marcar el campo como válido o inválido
    function markField(isValid) {
        email.classList.toggle("is-valid", isValid);
        email.classList.toggle("is-invalid", !isValid);
        email.setAttribute("aria-invalid", String(!isValid));
    }

    // Mostrar mensajes dinámicos
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

    // Validar el correo electrónico
    function validateEmail() {
        const value = email.value.trim();
        const isValid = emailRegex.test(value);

        markField(isValid);
        return isValid;
    }

    // Validar al abandonar el campo
    email.addEventListener("blur", () => {
        if (email.value.trim() !== "") {
            validateEmail();
        }
    });

    // Procesar la solicitud
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validateEmail()) {
            showMessage(
                "Ingresa un correo electrónico válido para continuar.",
                "error"
            );
            return;
        }

        // Confirmación ficticia: no se envía ningún correo
        showMessage(
            "Solicitud simulada correctamente. " +
            "En una aplicación real recibirías instrucciones " +
            "de recuperación en tu correo electrónico.",
            "success"
        );
    });

    // Limpiar el formulario
    form.addEventListener("reset", () => {
        formMessage.textContent = "";

        formMessage.classList.remove(
            "message-error",
            "message-success"
        );

        email.classList.remove("is-valid", "is-invalid");
        email.removeAttribute("aria-invalid");
    });

});
