/*
    Validaciones del formulario de registro
    y manipulación del DOM con JavaScript.
*/

// Esperar a que el documento HTML esté cargado
document.addEventListener("DOMContentLoaded", () => {

    // Seleccionar el formulario y sus elementos
    const form = document.getElementById("registration-form");
    const formMessage = document.getElementById("form-message");

    const fullName = document.getElementById("full-name");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const birthDate = document.getElementById("birth-date");
    const address = document.getElementById("address");
    const submitButton = form.querySelector('button[type="submit"]');

    // Obtener todos los campos del formulario
    const fields = [
        fullName,
        username,
        email,
        password,
        confirmPassword,
        birthDate,
        address
    ];

    // Expresión regular para validar el correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Expresiones regulares para validar la contraseña
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;

    /*
        Mostrar un mensaje general.

        Se utiliza textContent para modificar el
        contenido HTML y classList para cambiar
        dinámicamente los estilos CSS.
    */
    function showMessage(message, type) {
         // Limpiar mensajes anteriores
        formMessage.replaceChildren();

        formMessage.classList.remove(
            "message-error",
            "message-success"
        );

        formMessage.classList.add(
            type === "success"
                ? "message-success"
                : "message-error"
        );

        // Mostrar los errores como lista
        if (type === "error") {

            const title = document.createElement("p");
            title.textContent = "Revisa los siguientes campos:";
            title.classList.add("message-title");

            const list = document.createElement("ul");
            list.classList.add("error-list");

            message.forEach((error) => {
                const item = document.createElement("li");
                item.textContent = error;
                list.appendChild(item);
            });

            formMessage.appendChild(title);
            formMessage.appendChild(list);

        } else {

            // Mostrar confirmación de éxito
            formMessage.textContent = message;
        }
    }

    // Limpiar el mensaje general
    function clearMessage() {
        formMessage.textContent = "";

        formMessage.classList.remove(
            "message-error",
            "message-success"
        );
    }

    /*
        Marcar un campo como inválido.

        aria-invalid permite indicar a las
        tecnologías de asistencia que el campo
        contiene un error.
    */
    function markInvalid(field) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        field.setAttribute("aria-invalid", "true");
    }

    // Marcar un campo como válido
    function markValid(field) {
        field.classList.add("is-valid");
        field.classList.remove("is-invalid");
        field.setAttribute("aria-invalid", "false");
    }

    // Limpiar los estilos de validación
    function clearValidation() {
        fields.forEach((field) => {
            field.classList.remove("is-valid", "is-invalid");
            field.removeAttribute("aria-invalid");
        });
    }

    /*
        Calcular la edad de una persona a partir
        de su fecha de nacimiento.
    */
    function calculateAge(dateString) {
        const [year, month, day] = dateString
            .split("-")
            .map(Number);

        const today = new Date();

        let age = today.getFullYear() - year;

        // Comprobar si ya cumplió años este año
        const birthdayPassed =
            today.getMonth() + 1 > month ||
            (
                today.getMonth() + 1 === month &&
                today.getDate() >= day
            );

        if (!birthdayPassed) {
            age--;
        }

        return age;
    }

    /*
        Validar todos los datos cuando se
        intenta enviar el formulario.
    */
    function validateForm() {

        let isValid = true;
        const errors = [];

        // Eliminar marcas de validaciones anteriores
        clearValidation();

        // 1. Validar campos obligatorios
        const requiredFields = [
            fullName,
            username,
            email,
            password,
            confirmPassword,
            birthDate
        ];

        requiredFields.forEach((field) => {
            if (field.value.trim() === "") {
                markInvalid(field);
                isValid = false;
            }
        });

        if (!isValid) {
            errors.push("Completa todos los campos obligatorios.");
        }

        // 2. Validar formato del correo
        if (email.value.trim() !== "") {
            if (!emailRegex.test(email.value.trim())) {
                markInvalid(email);
                errors.push("Ingresa un correo electrónico válido.");
                isValid = false;
            } else {
                markValid(email);
            }
        }

        // 3. Validar longitud de la contraseña
        if (password.value !== "") {
            if (
                password.value.length < 6 ||
                password.value.length > 18
            ) {
                markInvalid(password);
                errors.push(
                    "La contraseña debe tener entre 6 y 18 caracteres."
                );
                isValid = false;
            }

            // 4. Validar mayúscula y número
            if (
                !uppercaseRegex.test(password.value) ||
                !numberRegex.test(password.value)
            ) {
                markInvalid(password);
                errors.push(
                    "La contraseña debe incluir una mayúscula y un número."
                );
                isValid = false;
            }

            if (
                password.value.length >= 6 &&
                password.value.length <= 18 &&
                uppercaseRegex.test(password.value) &&
                numberRegex.test(password.value)
            ) {
                markValid(password);
            }
        }

        // 5. Comprobar que las contraseñas coincidan
        if (
            password.value !== "" &&
            confirmPassword.value !== ""
        ) {
            if (password.value !== confirmPassword.value) {
                markInvalid(confirmPassword);
                errors.push("Las contraseñas no coinciden.");
                isValid = false;
            } else {
                markValid(confirmPassword);
            }
        }

        // 6. Validar fecha de nacimiento y edad mínima
        if (birthDate.value !== "") {

            const selectedDate = new Date(
                `${birthDate.value}T12:00:00`
            );

            const today = new Date();

            const [year, month, day] = birthDate.value
                .split("-")
                .map(Number);

            const validDate =
                !Number.isNaN(selectedDate.getTime()) &&
                selectedDate.getFullYear() === year &&
                selectedDate.getMonth() + 1 === month &&
                selectedDate.getDate() === day;

            if (!validDate || selectedDate > today) {
                markInvalid(birthDate);
                errors.push("Ingresa una fecha de nacimiento válida.");
                isValid = false;
            } else if (calculateAge(birthDate.value) < 13) {
                markInvalid(birthDate);
                errors.push(
                    "Debes tener al menos 13 años para registrarte."
                );
                isValid = false;
            } else {
                markValid(birthDate);
            }
        }

        // 7. Validar nombre completo
        if (fullName.value.trim() !== "") {
            markValid(fullName);
        }

        // 8. Validar nombre de usuario
        if (username.value.trim() !== "") {
            markValid(username);
        }

        // 9. La dirección de despacho es opcional
        if (address.value.trim() !== "") {
            markValid(address);
        }

        // Mostrar los errores encontrados
        if (!isValid) {
            showMessage(errors, "error");
        } else {
            clearMessage();
        }

        return isValid;
    }

    /*
        Evento submit:
        Se ejecuta cuando el usuario presiona
        el botón Crear cuenta.
    */
    form.addEventListener("submit", (event) => {

    // Evitar recargar la página
    event.preventDefault();

    if (validateForm()) {

        // Eliminar animación si los datos son válidos
        submitButton.classList.remove("shake");

        // Mostrar mensaje de éxito
        showMessage(
            "¡Formulario validado correctamente! " +
            "Tus datos cumplen los requisitos de registro.",
            "success"
        );

    } else {

        // Reiniciar la animación para que se ejecute
        // incluso si el usuario vuelve a presionar el botón
        submitButton.classList.remove("shake");

        // Forzar al navegador a reconocer el cambio
        void submitButton.offsetWidth;

        // Ejecutar la animación
        submitButton.classList.add("shake");
    }
    });

    // Quitar la clase al finalizar la animación
    submitButton.addEventListener("animationend", (event) => {
        if (event.animationName === "shake") {
            submitButton.classList.remove("shake");
        }
    });

    /*
        Evento reset:
        Se ejecuta al presionar Limpiar formulario.
    */
    form.addEventListener("reset", () => {

        clearMessage();
        clearValidation();

    });

});
