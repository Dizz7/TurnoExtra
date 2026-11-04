/*
    Gestión de productos de TurnoExtra.
    Creación, edición y eliminación de juegos del catálogo.
*/

document.addEventListener("DOMContentLoaded", () => {
    if (!TurnoExtraSesion.protegerPagina("administrador")) {
        return;
    }

    const catalogo = TurnoExtraCarrito;
    const lista = document.getElementById("admin-products");
    const plantilla = document.getElementById("admin-product");
    const formulario = document.getElementById("product-form");
    const campos = formulario.elements;
    const mensaje = document.getElementById("product-message");
    const agregar = document.getElementById("new-product");
    let original = null;

    // Reutilizar el formulario y conservar el identificador durante la edición
    function abrirFormulario(producto) {
        original = producto;
        formulario.reset();
        if (producto) {
            for (const nombre of ["nombre", "categoria", "descripcion", "imagen", "precio", "anterior"]) {
                campos[nombre].value = producto[nombre] || "";
            }
        }
        mensaje.textContent = "";
        document.getElementById("form-title").textContent = producto ? "Editar juego" : "Agregar juego";
        formulario.hidden = false;
        campos.nombre.focus();
    }

    function cerrarFormulario() {
        formulario.hidden = true;
        original = null;
        agregar.focus();
    }

    // Mostrar el resultado solo después de guardar los cambios
    function guardar(anterior, nuevo, confirmacion) {
        try {
            catalogo.modificarProducto(anterior, nuevo);
        } catch (error) {
            mensaje.textContent = error instanceof DOMException
                ? "No se pudo guardar el catálogo en este navegador."
                : error.message;
            mostrarCatalogo();
            return;
        }
        cerrarFormulario();
        mostrarCatalogo();
        mensaje.textContent = confirmacion;
    }

    function mostrarCatalogo() {
        const productos = catalogo.productos;
        lista.replaceChildren();
        document.getElementById("product-count").textContent = `Juegos en el catálogo: ${productos.length}.`;
        for (const producto of productos) {
            const ficha = plantilla.content.firstElementChild.cloneNode(true);
            ficha.querySelector("img").src = producto.imagen;
            ficha.querySelector("h3").textContent = producto.nombre;
            ficha.querySelector(".product-price").textContent = catalogo.formatearPrecio(producto.precio);
            ficha.querySelector(".edit-product").addEventListener("click", () => abrirFormulario(producto));
            ficha.querySelector(".delete-product").addEventListener("click", () => {
                if (window.confirm(`¿Eliminar «${producto.nombre}» del catálogo y de los carritos pendientes?`)) {
                    guardar(producto, null, "Juego eliminado.");
                }
            });
            lista.appendChild(ficha);
        }
    }

    agregar.addEventListener("click", () => abrirFormulario(null));
    document.getElementById("cancel-product").addEventListener("click", cerrarFormulario);
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const nombre = campos.nombre.value.trim();
        const descripcion = campos.descripcion.value.trim();
        const precio = campos.precio.valueAsNumber;
        const anterior = campos.anterior.valueAsNumber || 0;
        const imagen = campos.imagen.value.trim() || "../img/favicon.svg";
        if (!nombre || !descripcion) {
            mensaje.textContent = "Escribe el nombre y la descripción del juego.";
            return;
        }
        if (anterior && anterior <= precio) {
            mensaje.textContent = "El precio anterior debe ser mayor que el precio de venta.";
            campos.anterior.focus();
            return;
        }
        if (!/^https:\/\/[^\s/]+\/[^\s]+$/i.test(imagen) && !/^\.\.\/img\/(?:[\w-]+\/)*[\w.-]+$/i.test(imagen)) {
            mensaje.textContent = "Usa una URL https de imagen o una ruta dentro de ../img/.";
            campos.imagen.focus();
            return;
        }
        const id = original?.id ?? "juego-" + crypto.getRandomValues(new Uint32Array(4)).join("-");
        guardar(original, { id, nombre, categoria: campos.categoria.value, descripcion, precio, anterior, imagen },
            original ? "Cambios guardados." : "Juego agregado al catálogo.");
    });

    mostrarCatalogo();
    document.getElementById("protected-content").classList.remove("d-none");
});
