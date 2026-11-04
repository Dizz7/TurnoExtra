/*
    Catálogo de una categoría de TurnoExtra.
    Presentación de los juegos publicados y sus descuentos.
*/

// Crear las tarjetas antes de que el carrito conecte los botones
const cuadricula = document.querySelector(".product-grid");
const plantillaProducto = document.getElementById("category-product");
const juegosPublicados = TurnoExtraCarrito.productos.filter(
    (producto) => producto.categoria === cuadricula.dataset.categoria
);

for (const juego of juegosPublicados) {
    const ficha = plantillaProducto.content.firstElementChild.cloneNode(true);
    const portada = ficha.querySelector("img");
    portada.src = juego.imagen;
    portada.alt = "Portada de " + juego.nombre;
    portada.classList.toggle("imagen-wingspan", juego.id === "wingspan");
    ficha.querySelector("h3").textContent = juego.nombre;
    ficha.querySelector("p").textContent = juego.descripcion;
    ficha.querySelector(".product-price").textContent = TurnoExtraCarrito.formatearPrecio(juego.precio);
    ficha.querySelector("button").dataset.productId = juego.id;

    const etiqueta = ficha.querySelector(".product-status");
    if (juego.anterior > juego.precio) {
        const anterior = ficha.querySelector(".old-price");
        anterior.hidden = false;
        anterior.textContent = TurnoExtraCarrito.formatearPrecio(juego.anterior);
        etiqueta.className = "discount-badge";
        etiqueta.textContent = "DESCUENTO " + Math.round(100 * (1 - juego.precio / juego.anterior)) + "%";
    } else {
        etiqueta.textContent = "Sin descuento";
    }
    cuadricula.appendChild(ficha);
}

if (!juegosPublicados.length) {
    cuadricula.textContent = "Aún no hay juegos publicados en esta categoría.";
}
