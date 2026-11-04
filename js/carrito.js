/*
    Carrito de compras simulado de TurnoExtra.
    Gestión de productos, cantidades y localStorage.
*/

// Catálogo inicial de productos
const TurnoExtraCarrito = {

    storageKey: "turnoextra_cart",

    catalogoInicial: [
        {
            id: "wingspan",
            nombre: "Wingspan",
            categoria: "estrategia",
            descripcion: "Atrae aves a tu reserva natural, desarrolla combinaciones estratégicas y consigue la mayor cantidad de puntos.",
            precio: 54990,
            anterior: 0,
            imagen: "../img/juegos/wingspan.png"
        },
        {
            id: "kurruf",
            nombre: "Kurrüf",
            categoria: "estrategia",
            descripcion: "Explora la selva patagónica chilena y descubre cómo se conecta su biodiversidad. Un juego que te invita a mirar la naturaleza desde una perspectiva diferente.",
            precio: 25490,
            anterior: 29990,
            imagen: "../img/juegos/kurruf.png"
        },
        {
            id: "catan",
            nombre: "Catan",
            categoria: "estrategia",
            descripcion: "Recolecta recursos, construye caminos y poblados, e intercambia materiales para conquistar la isla de Catan.",
            precio: 39990,
            anterior: 0,
            imagen: "../img/juegos/catan.png"
        },
        {
            id: "exploding-kittens",
            nombre: "Exploding Kittens",
            categoria: "familiares",
            descripcion: "Roba cartas, esquiva a los gatos explosivos y usa tus mejores trucos para seguir en juego. Cada turno puede traer una sorpresa.",
            precio: 19990,
            anterior: 0,
            imagen: "../img/juegos/exploding-kittens.png"
        },
        {
            id: "dobble",
            nombre: "Dobble",
            categoria: "familiares",
            descripcion: "Encuentra el símbolo que se repite entre dos cartas antes que los demás. Pon a prueba tu atención y tus reflejos en cada partida.",
            precio: 11992,
            anterior: 14990,
            imagen: "../img/juegos/dobble.png"
        },
        {
            id: "sushi-go",
            nombre: "Sushi Go!",
            categoria: "familiares",
            descripcion: "Elige tus platos favoritos y pasa las cartas para crear la mejor combinación de sushi. Reúne puntos y prepara un menú ganador.",
            precio: 16990,
            anterior: 0,
            imagen: "../img/juegos/sushi-go.png"
        },
        {
            id: "story-cubes",
            nombre: "Story Cubes",
            categoria: "creatividad",
            descripcion: "Lanza los dados y conecta sus imágenes para inventar una historia. Personajes, lugares y aventuras cobran vida con tu imaginación.",
            precio: 12990,
            anterior: 0,
            imagen: "../img/juegos/story-cubes.png"
        },
        {
            id: "pictionary",
            nombre: "Pictionary",
            categoria: "creatividad",
            descripcion: "Convierte palabras en dibujos y ayuda a tu equipo a adivinarlas antes de que termine el tiempo. ¡Cada trazo puede ser la pista clave!",
            precio: 19992,
            anterior: 24990,
            imagen: "../img/juegos/pictionary.png"
        },
        {
            id: "telestrations",
            nombre: "Telestrations",
            categoria: "creatividad",
            descripcion: "Dibuja, pasa tu cuaderno y descubre cómo interpretan tu idea los demás. Las palabras se transforman en dibujos y los malentendidos en risas.",
            precio: 27990,
            anterior: 0,
            imagen: "../img/juegos/telestrations.png"
        },
        {
            id: "dixit",
            nombre: "Dixit",
            categoria: "fiesta",
            descripcion: "Imagina una pista para tu carta y descubre cómo la interpretan los demás. Un juego de ilustraciones e historias donde cada mirada cuenta.",
            precio: 29990,
            anterior: 0,
            imagen: "../img/juegos/dixit.png"
        },
        {
            id: "codigo-secreto",
            nombre: "Código Secreto",
            categoria: "fiesta",
            descripcion: "Conecta palabras con una sola pista y guía a tu equipo hacia sus agentes. Descifra las claves y evita al asesino para conseguir la victoria.",
            precio: 19992,
            anterior: 24990,
            imagen: "../img/juegos/codigo-secreto.png"
        },
        {
            id: "just-one",
            nombre: "Just One",
            categoria: "fiesta",
            descripcion: "Escribe una pista para ayudar a adivinar la palabra secreta. Las pistas repetidas se eliminan, así que piensa diferente y colabora con el grupo.",
            precio: 21990,
            anterior: 0,
            imagen: "../img/juegos/just-one.png"
        }
    ],

    get productos() {
        return this.leerEstado().productos ?? this.catalogoInicial;
    },

    // Guardar el catálogo y retirar del carrito los juegos eliminados
    modificarProducto(original, nuevo) {
        if (!TurnoExtraSesion.tieneRol("administrador")) {
            throw new Error("Necesitas una sesión de administración.");
        }
        const estado = this.leerEstado();
        const productos = [...(estado.productos ?? this.catalogoInicial)];
        if (original) {
            const indice = productos.findIndex((p) => p.id === original.id);
            if (JSON.stringify(productos[indice]) !== JSON.stringify(original)) {
                throw new Error("El producto cambió. Vuelve a abrirlo desde el catálogo.");
            }
            if (nuevo) {
                productos[indice] = nuevo;
            } else {
                productos.splice(indice, 1);
                estado.carrito = estado.carrito.filter((p) => p.id !== original.id);
            }
        } else {
            productos.push(nuevo);
        }
        estado.productos = productos;
        localStorage.setItem(this.storageKey, JSON.stringify(estado));
    },

    // Leer también los carritos creados antes de incorporar el historial
    leerEstado() {
        const datos = JSON.parse(localStorage.getItem(this.storageKey) ?? "[]");
        if (Array.isArray(datos)) {
            return { carrito: datos, compras: [] };
        }
        if (!datos || !Array.isArray(datos.carrito) || !Array.isArray(datos.compras)) {
            throw new Error("Los datos del carrito no tienen un formato válido.");
        }
        return datos;
    },

    obtenerCarrito() {
        try {
            return this.leerEstado().carrito;
        } catch (error) {
            console.warn("No se pudo cargar el carrito.", error);
            return [];
        }
    },

    // Conservar las compras anteriores al modificar el carrito
    guardarCarrito(cart) {
        const estado = this.leerEstado();
        estado.carrito = cart;
        localStorage.setItem(this.storageKey, JSON.stringify(estado));
    },

    // Guardar los precios de la compra y vaciar el carrito en una sola escritura
    confirmarCompra(carritoRevisado) {
        const sesion = TurnoExtraSesion.obtenerSesion();
        const estado = this.leerEstado();
        if (sesion?.role !== "cliente" || !estado.carrito.length ||
            JSON.stringify(estado.carrito) !== carritoRevisado) {
            return false;
        }

        const juegos = estado.carrito.map(({ id, cantidad }) => {
            const producto = this.productos.find((juego) => juego.id === id);
            if (!producto || !Number.isSafeInteger(cantidad) || cantidad < 1) {
                throw new Error("Hay un juego o una cantidad inválida en el carrito.");
            }
            return { nombre: producto.nombre, precio: producto.precio, cantidad };
        });

        estado.compras.unshift({
            cliente: sesion.email.trim().toLowerCase(),
            fecha: new Date().toISOString(),
            juegos,
            total: juegos.reduce((suma, juego) => suma + juego.precio * juego.cantidad, 0)
        });
        estado.carrito = [];
        localStorage.setItem(this.storageKey, JSON.stringify(estado));
        return true;
    },

    // Consultar las compras del cliente que inició sesión
    obtenerCompras() {
        const sesion = TurnoExtraSesion.obtenerSesion();
        if (sesion?.role !== "cliente") {
            return [];
        }
        const email = sesion.email.trim().toLowerCase();
        return this.leerEstado().compras.filter((compra) => compra.cliente === email);
    },

    // Agregar un producto al carrito
    agregarProducto(productId) {
        const product = this.productos.find(
            (item) => item.id === productId
        );

        if (!product) {
            return false;
        }

        const cart = this.obtenerCarrito();

        const existingProduct = cart.find(
            (item) => item.id === productId
        );

        if (existingProduct) {
            existingProduct.cantidad++;
        } else {
            cart.push({
                id: product.id,
                cantidad: 1
            });
        }

        this.guardarCarrito(cart);
        return true;
    },

    // Eliminar un producto
    eliminarProducto(productId) {
        const cart = this.obtenerCarrito().filter(
            (item) => item.id !== productId
        );

        this.guardarCarrito(cart);
    },

    // Modificar la cantidad
    actualizarCantidad(productId, cantidad) {
        const cart = this.obtenerCarrito();

        const product = cart.find(
            (item) => item.id === productId
        );

        if (!product) {
            return;
        }

        if (!Number.isInteger(cantidad) || cantidad < 1) {
            this.eliminarProducto(productId);
            return;
        }

        product.cantidad = cantidad;
        this.guardarCarrito(cart);
    },

    // Calcular el total de la compra
    calcularTotal() {
        const cart = this.obtenerCarrito();

        return cart.reduce((total, item) => {
            const product = this.productos.find(
                (p) => p.id === item.id
            );

            if (!product) {
                return total;
            }

            return total + product.precio * item.cantidad;
        }, 0);
    },

    // Contar unidades en el carrito
    contarProductos() {
        return this.obtenerCarrito().reduce(
            (total, item) => total + item.cantidad,
            0
        );
    },

    // Formatear precios en pesos chilenos
    formatearPrecio(precio) {
        return "$" + precio.toLocaleString("es-CL");
    }
};

// Eventos de los botones de agregar al carrito
document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {

            // Solo los clientes pueden comprar
            if (!TurnoExtraSesion.tieneRol("cliente")) {
                if (!TurnoExtraSesion.estaAutenticado()) {
                    alert("Debes iniciar sesión para agregar juegos al carrito.");
                    window.location.href = "login.html";
                } else {
                    alert("El administrador no puede realizar compras.");
                }

                return;
            }

            const productId = button.dataset.productId;

            const added = TurnoExtraCarrito.agregarProducto(productId);

            if (added) {
                const originalText = button.textContent;

                button.textContent = "✓ ¡Agregado!";
                button.disabled = true;

                // Restaurar el texto del botón
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 1200);
            }
        });
    });
});
