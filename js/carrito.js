/*
    Carrito de compras simulado de TurnoExtra.
    Gestión de productos, cantidades y localStorage.
*/

// Catálogo inicial de productos
const TurnoExtraCarrito = {

    storageKey: "turnoextra_cart",

    productos: [
        {
            id: "wingspan",
            nombre: "Wingspan",
            precio: 54990,
            imagen: "../img/juegos/wingspan.png"
        },
        {
            id: "kurruf",
            nombre: "Kurrüf",
            precio: 25490,
            imagen: "../img/juegos/kurruf.png"
        },
        {
            id: "catan",
            nombre: "Catan",
            precio: 39990,
            imagen: "../img/juegos/catan.png"
        },
        {
            id: "exploding-kittens",
            nombre: "Exploding Kittens",
            precio: 19990,
            imagen: "../img/juegos/exploding-kittens.png"
        },
        {
            id: "dobble",
            nombre: "Dobble",
            precio: 11992,
            imagen: "../img/juegos/dobble.png"
        },
        {
            id: "sushi-go",
            nombre: "Sushi Go!",
            precio: 16990,
            imagen: "../img/juegos/sushi-go.png"
        },
        {
            id: "story-cubes",
            nombre: "Story Cubes",
            precio: 12990,
            imagen: "../img/juegos/story-cubes.png"
        },
        {
            id: "pictionary",
            nombre: "Pictionary",
            precio: 19992,
            imagen: "../img/juegos/pictionary.png"
        },
        {
            id: "telestrations",
            nombre: "Telestrations",
            precio: 27990,
            imagen: "../img/juegos/telestrations.png"
        },
        {
            id: "dixit",
            nombre: "Dixit",
            precio: 29990,
            imagen: "../img/juegos/dixit.png"
        },
        {
            id: "codigo-secreto",
            nombre: "Código Secreto",
            precio: 19992,
            imagen: "../img/juegos/codigo-secreto.png"
        },
        {
            id: "just-one",
            nombre: "Just One",
            precio: 21990,
            imagen: "../img/juegos/just-one.png"
        }
    ],

    // Obtener el carrito guardado
    obtenerCarrito() {
        try {
            const savedCart = localStorage.getItem(this.storageKey);

            if (!savedCart) {
                return [];
            }

            const cart = JSON.parse(savedCart);

            return Array.isArray(cart) ? cart : [];
        } catch (error) {
            console.warn("No se pudo cargar el carrito.", error);
            return [];
        }
    },

    // Guardar el carrito en el navegador
    guardarCarrito(cart) {
        localStorage.setItem(
            this.storageKey,
            JSON.stringify(cart)
        );
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
