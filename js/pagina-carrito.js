
/*
    * js/pagina-carrito.js
*/

document.addEventListener("DOMContentLoaded", () => {
    if (TurnoExtraSesion.protegerPagina("cliente")) {
        document.getElementById("protected-content").classList.remove("d-none");
    }
});
