
document.addEventListener("DOMContentLoaded", () => {
    if (TurnoExtraSesion.protegerPagina("administrador")) {
        document.getElementById("protected-content").classList.remove("d-none");
    }
});
