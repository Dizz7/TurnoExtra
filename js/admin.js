/*
    Panel de administración de TurnoExtra.
    Control de acceso y consulta del catálogo de juegos.
*/

document.addEventListener("DOMContentLoaded", () => {
    if (!TurnoExtraSesion.protegerPagina("administrador")) {
        return;
    }

    // Mostrar los mismos productos y precios que utiliza el carrito
    const catalogo = TurnoExtraCarrito.productos;
    const lista = document.getElementById("admin-products");
    const plantilla = document.getElementById("admin-product");
    document.getElementById("product-count").textContent =
        `Juegos en el catálogo: ${catalogo.length}.`;

    catalogo.forEach((producto) => {
        const ficha = plantilla.content.firstElementChild.cloneNode(true);
        ficha.querySelector("img").src = producto.imagen;
        ficha.querySelector("h3").textContent = producto.nombre;
        ficha.querySelector(".product-price").textContent =
            TurnoExtraCarrito.formatearPrecio(producto.precio);
        lista.appendChild(ficha);
    });

    document.getElementById("protected-content").classList.remove("d-none");
});
