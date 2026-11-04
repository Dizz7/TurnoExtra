/*
    Historial de compras simuladas de TurnoExtra.
    Presentación de fechas, juegos y precios guardados al confirmar.
*/

document.addEventListener("DOMContentLoaded", () => {
    if (!TurnoExtraSesion.tieneRol("cliente")) {
        return;
    }

    const carrito = TurnoExtraCarrito;
    const mensaje = document.getElementById("history-message");
    const lista = document.getElementById("history-orders");
    const plantilla = document.getElementById("history-order");
    const formatoFecha = new Intl.DateTimeFormat("es-CL", {
        dateStyle: "long",
        timeStyle: "short"
    });

    // Mostrar solo las compras de la sesión actual
    let compras;
    try {
        compras = carrito.obtenerCompras();
    } catch (error) {
        mensaje.textContent = "No se pudo leer tu historial de compras.";
        return;
    }

    if (!compras.length) {
        mensaje.textContent = "Aún no tienes compras confirmadas.";
        return;
    }

    compras.forEach((compra) => {
        const pedido = plantilla.content.firstElementChild.cloneNode(true);
        const fecha = pedido.querySelector("time");
        fecha.dateTime = compra.fecha;
        fecha.textContent = formatoFecha.format(new Date(compra.fecha));
        pedido.querySelector(".order-total").textContent = carrito.formatearPrecio(compra.total);

        // Desglosar cada juego con el precio que tenía al comprarlo
        const juegos = pedido.querySelector("ul");
        compra.juegos.forEach(({ nombre, cantidad, precio }) => {
            const linea = document.createElement("li");
            linea.className = "list-group-item";
            const subtotal = carrito.formatearPrecio(precio * cantidad);
            linea.textContent = `${nombre} · ${cantidad} × ${carrito.formatearPrecio(precio)} = ${subtotal}`;
            juegos.appendChild(linea);
        });

        lista.appendChild(pedido);
    });
});
