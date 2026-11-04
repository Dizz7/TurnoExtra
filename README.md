# TurnoExtra 🎲

Sitio web de un catálogo de juegos de mesa, desarrollado con HTML5, CSS3, Bootstrap 5 y JavaScript para las actividades de la Experiencia 1 de Desarrollo Full Stack II (DSY2202).

El proyecto comenzó en la Semana 1 con el desarrollo de la interfaz gráfica y fue ampliado durante la Semana 2 para incorporar diseño responsivo mediante Bootstrap 5, un formulario de registro, validaciones con JavaScript y manipulación dinámica del DOM.

En la Semana 3 se implementó la compra simulada de juegos y se incorporó un panel de administración para gestionar el catálogo, las existencias y las cuentas de la tienda.

## Datos de la actividad

- **Estudiante:** Daniel Alarcón
- **Asignatura:** Desarrollo Full Stack II (DSY2202)
- **Actividad:** Experiencia 1 — Semana 3 — Entrega sumativa
- **Proyecto:** TurnoExtra

## Descripción

TurnoExtra presenta juegos de mesa organizados en cuatro categorías. Desde la página principal se puede acceder a cada categoría y consultar las fichas de sus juegos.

Cada ficha incluye:

- Imagen del juego.
- Nombre.
- Breve descripción.
- Precio de venta.
- Indicación de si tiene descuento.

Durante la Semana 2 se incorporó una página de registro de usuarios con validaciones realizadas mediante JavaScript. También se integró Bootstrap 5 para mejorar la navegación y la distribución responsiva de los contenidos.

## Categorías y juegos

| Categoría | Juegos iniciales |
|---|---|
| Estrategia | Wingspan, Kurrüf y Catan |
| Familiares | Exploding Kittens, Dobble y Sushi Go! |
| Creatividad | Story Cubes, Pictionary y Telestrations |
| Fiesta | Dixit, Código Secreto y Just One |

Los precios y descuentos se utilizan con fines demostrativos para esta actividad académica.

## Tecnologías utilizadas

- **HTML5:** estructura semántica y navegación entre páginas.
- **CSS3:** diseño visual, distribución de elementos y adaptación a diferentes pantallas.
- **Bootstrap 5:** barra de navegación responsiva, menú hamburguesa, sistema de cuadrículas y componentes de formulario.
- **JavaScript:** validación de campos, manejo de eventos y manipulación del DOM.
- **Git y GitHub:** control de versiones y alojamiento del código.
- **Trello:** organización y seguimiento de tareas.
- **Google Fonts:** tipografía Nunito.

El proyecto funciona como un sitio web estático y carga Bootstrap mediante CDN. JavaScript utiliza `sessionStorage` para mantener la sesión de la pestaña y `localStorage` para conservar las cuentas, los perfiles, el catálogo, el inventario, el carrito y las compras en el navegador.

## Características del sitio

### Semana 1 — Desarrollo de la interfaz gráfica

- Página principal con el nombre de la tienda y enlaces a las cuatro categorías.
- Collages de tres imágenes en las tarjetas de categorías.
- Una página por categoría, con tres fichas de juegos.
- Menú de navegación y enlaces para volver al inicio.
- Hoja de estilos compartida por todas las páginas.
- Variables CSS para definir la paleta de colores y los bordes.
- Distribución mediante Flexbox y CSS Grid.
- Diseño responsivo mediante media queries.
- Cuatro animaciones CSS:
  - `fadeUp`: aparición del contenido principal.
  - `float`: movimiento de la ilustración decorativa.
  - `rotateDice`: rotación del elemento principal.
  - `cardReveal`: aparición de las tarjetas.
- Efectos al pasar el cursor sobre botones y tarjetas.
- Respeto por la preferencia de movimiento reducido.
- Texto alternativo en las imágenes de los productos.
- Favicon con un dado.

### Semana 2 — Bootstrap 5 y JavaScript

#### Diseño responsivo con Bootstrap 5

- Integración de Bootstrap 5 en las seis páginas del sitio.
- Barra de navegación con menú hamburguesa para celulares y tablets.
- Navegación horizontal en pantallas de escritorio.
- Uso del sistema de cuadrículas de Bootstrap mediante las clases `row`, `col-12`, `col-md-6`, `col-lg-3` y `col-lg-4`.
- Adaptación de las tarjetas de categorías y productos a distintos tamaños de pantalla.
- Conservación de la identidad visual original, incluyendo colores pastel, tipografía, bordes redondeados y animaciones.
- Diseño preparado para pantallas de celulares, tablets y computadores.

#### Formulario de registro

Se incorporó la página `pages/registro.html`, que contiene los siguientes campos:

- Nombre completo.
- Nombre de usuario.
- Correo electrónico.
- Contraseña.
- Confirmación de contraseña.
- Fecha de nacimiento.
- Dirección de despacho (opcional).

El formulario incluye los botones **Crear cuenta** y **Limpiar formulario**.

#### Validaciones con JavaScript

El archivo `js/registro.js` implementa las siguientes validaciones:

- Verificación de campos obligatorios.
- Validación del formato del correo electrónico.
- Contraseña de entre 6 y 18 caracteres.
- Contraseña con al menos una letra mayúscula y un número.
- Comprobación de coincidencia entre contraseña y confirmación.
- Validación de fecha de nacimiento.
- Verificación de edad mínima de 13 años.
- Exclusión de la dirección de despacho de los campos obligatorios.

Cuando se detectan errores, el formulario muestra mensajes específicos y destaca visualmente los campos incorrectos. Si todas las validaciones se cumplen, se presenta un mensaje de confirmación.

#### Manipulación del DOM

JavaScript interactúa dinámicamente con los elementos HTML mediante:

- `document.getElementById()` para seleccionar elementos del formulario.
- `addEventListener()` para gestionar los eventos de envío y limpieza.
- `document.createElement()` para generar elementos HTML.
- `appendChild()` para incorporar mensajes de error al documento.
- `textContent` para modificar el contenido de los mensajes.
- `classList.add()` y `classList.remove()` para modificar las clases CSS según el resultado de las validaciones.
- `replaceChildren()` para limpiar mensajes anteriores.

También se incorporó una animación `shake` al botón Crear cuenta cuando el formulario contiene errores.

#### Alcance del registro

En la Semana 2, el registro comprobaba los campos y mostraba el resultado. En la Semana 3 se conectó este formulario con las cuentas locales de la tienda.

### Semana 3 — Compra simulada y administración de la tienda

#### Cuentas, sesiones y perfil

- El registro crea una cuenta de cliente y comprueba que el correo de acceso esté disponible.
- El menú cambia según la sesión. Los visitantes pueden registrarse e iniciar sesión, los clientes acceden al carrito y los administradores acceden al panel. Ambos roles pueden editar su perfil y cerrar sesión.
- Cada cuenta tiene su propio perfil. El correo de contacto se puede modificar y el correo de acceso mantiene la asociación con las compras.
- La recuperación de contraseña muestra una confirmación simulada. Las contraseñas de las cuentas nuevas se verifican mediante una huella derivada con PBKDF2.

#### Carrito, confirmación e historial de compras

- Las cuatro categorías muestran los juegos del catálogo compartido, sus precios y descuentos. Los productos agotados se identifican en la ficha.
- El cliente puede agregar juegos, ajustar cantidades y eliminar productos. El carrito muestra las portadas, los precios unitarios, los subtotales y el total en pesos chilenos.
- **Finalizar compra** muestra las unidades y el importe para revisión. Volver al carrito conserva la selección. **Confirmar compra** registra el pedido, descuenta las existencias y vacía el carrito.
- En **Mi perfil → Historial de compras**, el cliente puede desplegar sus pedidos desde el más reciente y consultar la fecha, los juegos, las cantidades y los precios que pagó.

#### Panel de administración

- **Productos.** Permite agregar, editar y eliminar juegos, asignar su categoría y definir la portada, la descripción y los precios. Los cambios se reflejan en la tienda y el carrito.
- **Inventario.** Permite consultar y ajustar las unidades de cada juego. El catálogo inicial parte con 10 unidades por juego y los productos nuevos parten con 0. El carrito comprueba la disponibilidad antes de completar la compra.
- **Usuarios y clientes.** Permite buscar cuentas por nombre o correo, cambiar roles y activar o desactivar el acceso. Un cambio de permisos invalida la sesión anterior. El administrador conserva los permisos de su propia cuenta.

## Estructura del proyecto

```text
/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   ├── admin-cuentas.js
│   ├── admin.js
│   ├── carrito.js
│   ├── categoria.js
│   ├── cuentas.js
│   ├── historial.js
│   ├── login.js
│   ├── pagina-carrito.js
│   ├── perfil.js
│   ├── recuperar.js
│   ├── registro.js
│   └── sesion.js
├── img/
│   ├── favicon.svg
│   └── juegos/
│       ├── wingspan.png
│       ├── kurruf.png
│       ├── catan.png
│       ├── exploding-kittens.png
│       ├── dobble.png
│       ├── sushi-go.png
│       ├── pictionary.png
│       ├── story-cubes.png
│       ├── telestrations.png
│       ├── codigo-secreto.png
│       ├── dixit.png
│       └── just-one.png
└── pages/
    ├── admin.html
    ├── carrito.html
    ├── creatividad.html
    ├── estrategia.html
    ├── familiares.html
    ├── fiesta.html
    ├── login.html
    ├── perfil.html
    ├── recuperar.html
    └── registro.html
```

Las imágenes de `img/juegos/` se reutilizan tanto en las fichas de productos como en los collages de la página principal.

## Cómo visualizar el proyecto

1. Descargar y descomprimir el proyecto, o clonar el repositorio.
2. Abrir la carpeta en Visual Studio Code y utilizar Live Server para visualizar `index.html` desde localhost.
3. Recorrer las categorías como visitante o utilizar **Registro** para crear un cliente.
4. Iniciar sesión desde el menú. Para probar ambos recorridos se incluyen estas cuentas de demostración.

| Rol | Correo de acceso | Contraseña |
|---|---|---|
| Cliente | `cliente@turnoextra.cl` | `Cliente123!` |
| Administrador | `admin@turnoextra.cl` | `Admin123!` |

Utilizar el mismo navegador y la misma dirección local durante las pruebas para conservar los datos entre sesiones.

No requiere instalación de dependencias ni un proceso de compilación. Se recomienda disponer de conexión a Internet para cargar Bootstrap 5 y la fuente Nunito desde sus respectivos servicios CDN.

## Pruebas de funcionamiento

Para verificar el comportamiento responsivo se consideran tres tamaños de pantalla:

| Dispositivo | Ancho de referencia |
|---|---|
| Celular | 375 px |
| Tablet | 768 px |
| Escritorio | 1440 px |

Las comprobaciones contemplan:

- Visualización correcta de las páginas.
- Funcionamiento del menú hamburguesa.
- Distribución responsiva de las tarjetas de categorías y productos.
- Navegación entre páginas.
- Visualización de imágenes y precios.
- Validación de campos obligatorios.
- Rechazo de correos electrónicos incorrectos.
- Rechazo de contraseñas que no cumplan los requisitos.
- Detección de contraseñas que no coinciden.
- Validación de edad mínima.
- Visualización de mensajes de error y confirmación.
- Funcionamiento del botón Limpiar formulario.

### Comprobaciones de la Semana 3

| Recorrido | Resultado esperado |
|---|---|
| Registrar un cliente e iniciar sesión | El cliente puede abrir su perfil y el carrito. Si intenta entrar al panel, vuelve a Inicio. |
| Agregar juegos de dos categorías, cambiar cantidades y recargar | El carrito conserva los juegos y calcula los subtotales con los precios de venta. |
| Cancelar una compra y luego confirmarla | Al cancelar se conservan el carrito y el stock. Al confirmar se descuenta el stock y el pedido aparece en el historial del cliente. |
| Crear un juego desde Administración y asignarle una unidad | El juego aparece en su categoría. Tras comprar la última unidad, la ficha indica que está agotado. |
| Cambiar el precio de un juego ya comprado | El catálogo muestra el nuevo precio y el historial conserva el importe de la compra. |
| Desactivar y reactivar una cuenta de prueba | La cuenta pierde el acceso al desactivarla y puede volver a iniciar sesión al reactivarla. |

## Organización del trabajo

El código se administra mediante Git y GitHub. Las tareas de desarrollo se organizan en Trello utilizando los estados solicitados:

- Backlog.
- Iniciado.
- Proceso.
- No terminado por dificultades.
- Terminado.

Durante la Semana 2 se continuó utilizando el mismo repositorio y tablero de la Semana 1, registrando los cambios asociados a Bootstrap, JavaScript, el formulario y las pruebas de responsividad.

Durante la Semana 3 se organizaron las tareas de sesiones, compras y administración en el mismo tablero, junto con las pruebas funcionales y responsivas y la preparación de la entrega.

## Recursos gráficos y créditos

Las imágenes de las cajas corresponden a los juegos y sus respectivas marcas y editoriales. Se incorporaron como referencias visuales para este proyecto académico.

Se utilizó asistencia de inteligencia artificial para preparar versiones con fondo transparente.

La tipografía Nunito se obtiene de Google Fonts:

https://fonts.google.com/specimen/Nunito

Bootstrap 5 se obtiene desde su CDN:

https://getbootstrap.com/

## Enlaces de entrega

Se incluyen los enlaces en AVA.

- **Repositorio GitHub** 
- **Tablero Trello**

Para la entrega de la Semana 3 se prepara el proyecto actualizado en formato ZIP y se graba la presentación de la sumativa en Kaltura.
