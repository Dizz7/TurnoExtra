/*
    Vista del carrito de compras de TurnoExtra.
    Gestión de cantidades y confirmación de la compra simulada.
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

        // Usar la misma portada que en el catálogo de juegos
        fila.querySelector(".cart-cover").src = producto.imagen;
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

    const dialogo = document.getElementById("checkout-dialog");
    const resumenCompra = document.getElementById("checkout-summary");
    const errorCompra = document.getElementById("checkout-error");
    let carritoRevisado;

    // Revisar el número de unidades y el importe antes de confirmar
    document.getElementById("checkout").addEventListener("click", () => {
        const unidades = carrito.contarProductos();
        if (!unidades) {
            window.location.reload();
            return;
        }

        carritoRevisado = JSON.stringify(carrito.obtenerCarrito());
        const importe = carrito.formatearPrecio(carrito.calcularTotal());
        const etiqueta = unidades === 1 ? "unidad" : "unidades";
        resumenCompra.textContent = `${unidades} ${etiqueta} por un total de ${importe}.`;
        errorCompra.textContent = "";
        dialogo.showModal();
    });

    // Completar la simulación solo si el carrito sigue siendo el que se revisó
    document.getElementById("confirm-order").addEventListener("click", () => {
        if (!dialogo.open || !TurnoExtraSesion.protegerPagina("cliente")) {
            return;
        }

        if (carritoRevisado !== JSON.stringify(carrito.obtenerCarrito())) {
            window.location.reload();
            return;
        }

        dialogo.close();
        try {
            carrito.guardarCarrito([]);
        } catch (error) {
            errorCompra.textContent = "No se pudo completar la compra. Vuelve a intentarlo.";
            return;
        }

        filas.replaceChildren();
        actualizarResumen();
        mensajeVacio.hidden = true;
        document.getElementById("order-summary").textContent = resumenCompra.textContent;
        document.getElementById("order-success").hidden = false;
        document.getElementById("order-title").focus();
    });

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
