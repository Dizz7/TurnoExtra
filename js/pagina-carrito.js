/*
    Vista del carrito de compras de TurnoExtra.
    Presentación de juegos, actualización de cantidades y eliminación de productos.
*/

document.addEventListener("DOMContentLoaded", () => {
    if (!TurnoExtraSesion.protegerPagina("cliente")) {
        return;
    }

    const carrito = TurnoExtraCarrito;
    const filas = document.getElementById("cart-items");
    const plantilla = document.getElementById("cart-row");
    const detalle = document.getElementById("cart-detail");
    const mensajeVacio = document.getElementById("empty-cart");
    const total = document.getElementById("cart-total");

    // Mostrar el total o el mensaje para un carrito vacío
    function actualizarResumen() {
        const vacio = filas.rows.length === 0;
        detalle.hidden = vacio;
        mensajeVacio.hidden = !vacio;
        total.textContent = carrito.formatearPrecio(carrito.calcularTotal());
    }

    // Completar una fila con el juego y su cantidad guardada
    function mostrarJuego(producto, cantidadGuardada) {
        const fila = plantilla.content.firstElementChild.cloneNode(true);
        const cantidad = fila.querySelector(".quantity");
        const subtotal = fila.querySelector(".subtotal");
        const eliminar = fila.querySelector("button");

        fila.querySelector(".game-name").textContent = producto.nombre;
        fila.querySelector(".unit-price").textContent = carrito.formatearPrecio(producto.precio);
        cantidad.setAttribute("aria-label", "Cantidad de " + producto.nombre);
        eliminar.setAttribute("aria-label", "Eliminar " + producto.nombre);

        function mostrarCantidad(unidades) {
            cantidad.value = unidades;
            subtotal.textContent = carrito.formatearPrecio(producto.precio * unidades);
        }

        mostrarCantidad(cantidadGuardada);

        // Conservar la última cantidad válida si el campo está vacío o es inválido
        cantidad.addEventListener("change", () => {
            const unidades = cantidad.valueAsNumber;
            if (!cantidad.checkValidity() || !Number.isSafeInteger(unidades)) {
                cantidad.reportValidity();
                mostrarCantidad(cantidadGuardada);
                return;
            }

            carrito.actualizarCantidad(producto.id, unidades);
            cantidadGuardada = unidades;
            mostrarCantidad(unidades);
            actualizarResumen();
        });

        eliminar.addEventListener("click", () => {
            const otraFila = fila.nextElementSibling || fila.previousElementSibling;
            carrito.eliminarProducto(producto.id);
            fila.remove();
            actualizarResumen();

            const siguienteControl = otraFila
                ? otraFila.querySelector("button")
                : mensajeVacio.querySelector("a");
            siguienteControl.focus();
        });

        filas.appendChild(fila);
    }

    // Cargar los productos al entrar a la página
    carrito.obtenerCarrito().forEach((item) => {
        const producto = carrito.productos.find((juego) => juego.id === item.id);
        if (producto) {
            mostrarJuego(producto, item.cantidad);
        }
    });

    actualizarResumen();
    document.getElementById("protected-content").classList.remove("d-none");
});
