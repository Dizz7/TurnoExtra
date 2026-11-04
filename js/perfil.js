/*
    Modificación de perfil de TurnoExtra.
    Datos ficticios, validaciones y localStorage.
*/

document.addEventListener("DOMContentLoaded", () => {

    // Elementos del formulario
    const form = document.getElementById("profile-form");
    const fullName = document.getElementById("profile-name");
    const username = document.getElementById("profile-username");
    const email = document.getElementById("profile-email");
    const birthDate = document.getElementById("profile-birth-date");
    const address = document.getElementById("profile-address");
    const formMessage = document.getElementById("profile-message");
    const restoreButton = document.getElementById("restore-profile");

    // Clave utilizada para almacenar el perfil ficticio
    const storageKey = "turnoextra_demo_profile";

    // Datos iniciales de demostración
    const defaultProfile = {
        fullName: "Cliente TurnoExtra",
        username: "cliente",
        email: "cliente@turnoextra.cl",
        birthDate: "2000-05-15",
        address: ""
    };

    // Expresión regular para el correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const fields = [
        fullName,
        username,
        email,
        birthDate,
        address
    ];

    // Mostrar mensajes de validación
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

    // Limpiar mensajes
    function clearMessage() {
        formMessage.textContent = "";
        formMessage.classList.remove(
            "message-error",
            "message-success"
        );
    }

    // Marcar un campo válido o inválido
    function markField(field, isValid) {
        field.classList.toggle("is-valid", isValid);
        field.classList.toggle("is-invalid", !isValid);
        field.setAttribute("aria-invalid", String(!isValid));
    }

    // Limpiar marcas de validación
    function clearValidation() {
        fields.forEach((field) => {
            field.classList.remove("is-valid", "is-invalid");
            field.removeAttribute("aria-invalid");
        });
    }

    // Calcular la edad a partir de la fecha de nacimiento
    function calculateAge(dateValue) {
        const today = new Date();
        const birth = new Date(dateValue + "T00:00:00");

        if (Number.isNaN(birth.getTime()) || birth > today) {
            return -1;
        }

        let age = today.getFullYear() - birth.getFullYear();

        const monthDifference = today.getMonth() - birth.getMonth();

        if (
            monthDifference < 0 ||
            (
                monthDifference === 0 &&
                today.getDate() < birth.getDate()
            )
        ) {
            age--;
        }

        return age;
    }

    // Mostrar datos en los campos
    function fillForm(profile) {
        fullName.value = profile.fullName;
        username.value = profile.username;
        email.value = profile.email;
        birthDate.value = profile.birthDate;
        address.value = profile.address;
    }

    // Cargar datos desde localStorage
    function loadProfile() {
        const savedProfile = localStorage.getItem(storageKey);

        if (savedProfile) {
            try {
                const profile = JSON.parse(savedProfile);

                // Comprobar que los datos tengan la estructura esperada
                if (
                    profile &&
                    typeof profile.fullName === "string" &&
                    typeof profile.username === "string" &&
                    typeof profile.email === "string" &&
                    typeof profile.birthDate === "string" &&
                    typeof profile.address === "string"
                ) {
                    fillForm(profile);
                    return;
                }
            } catch (error) {
                console.warn(
                    "No se pudieron interpretar los datos del perfil.",
                    error
                );
            }
        }

        // Si no hay datos guardados, usar los ficticios
        fillForm(defaultProfile);
    }

    // Validar todos los campos
    function validateForm() {
        const errors = [];

        const validName = fullName.value.trim().length >= 2;
        const validUsername = username.value.trim().length >= 3;
        const validEmail = emailRegex.test(email.value.trim());
        const validBirthDate = calculateAge(birthDate.value) >= 13;

        markField(fullName, validName);
        markField(username, validUsername);
        markField(email, validEmail);
        markField(birthDate, validBirthDate);

        // La dirección es opcional
        address.classList.remove("is-invalid");
        address.removeAttribute("aria-invalid");

        if (address.value.trim() !== "") {
            markField(address, true);
        } else {
            address.classList.remove("is-valid");
        }

        if (!validName) {
            errors.push("El nombre debe tener al menos 2 caracteres.");
        }

        if (!validUsername) {
            errors.push(
                "El nombre de usuario debe tener al menos 3 caracteres."
            );
        }

        if (!validEmail) {
            errors.push("Ingresa un correo electrónico válido.");
        }

        if (!validBirthDate) {
            errors.push(
                "Debes ingresar una fecha válida y tener al menos 13 años."
            );
        }

        if (errors.length > 0) {
            showMessage(errors.join(" "), "error");
            return false;
        }

        return true;
    }

    // Guardar modificaciones
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Crear objeto con los datos actualizados
        const updatedProfile = {
            fullName: fullName.value.trim(),
            username: username.value.trim(),
            email: email.value.trim().toLowerCase(),
            birthDate: birthDate.value,
            address: address.value.trim()
        };

        try {
            // Guardar los datos ficticios en el navegador
            localStorage.setItem(
                storageKey,
                JSON.stringify(updatedProfile)
            );

            showMessage(
                "¡Tu perfil se actualizó correctamente!",
                "success"
            );
        } catch (error) {
            showMessage(
                "No fue posible guardar el perfil en este navegador.",
                "error"
            );
        }
    });

    // Restaurar los datos ficticios originales
    restoreButton.addEventListener("click", () => {
        localStorage.removeItem(storageKey);

        fillForm(defaultProfile);
        clearValidation();

        showMessage(
            "Se restauraron los datos de demostración.",
            "success"
        );
    });

    // Validación al abandonar cada campo
    fields.forEach((field) => {
        field.addEventListener("blur", () => {
            if (field.value.trim() === "" && field === address) {
                field.classList.remove("is-valid", "is-invalid");
                field.removeAttribute("aria-invalid");
                return;
            }

            let isValid = true;

            if (field === fullName) {
                isValid = field.value.trim().length >= 2;
            } else if (field === username) {
                isValid = field.value.trim().length >= 3;
            } else if (field === email) {
                isValid = emailRegex.test(field.value.trim());
            } else if (field === birthDate) {
                isValid = calculateAge(field.value) >= 13;
            }

            markField(field, isValid);
        });
    });

    // Cargar el perfil al abrir la página
    loadProfile();

});
