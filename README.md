# TurnoExtra 🎲

Sitio web de un catálogo de juegos de mesa, desarrollado con HTML5, CSS3, Bootstrap 5 y JavaScript para las actividades de la Experiencia 1 de Desarrollo Full Stack II (DSY2202).

El proyecto comenzó en la Semana 1 con el desarrollo de la interfaz gráfica y fue ampliado durante la Semana 2 para incorporar diseño responsivo mediante Bootstrap 5, un formulario de registro, validaciones con JavaScript y manipulación dinámica del DOM.

## Datos de la actividad

- **Estudiante:** Daniel Alarcón
- **Asignatura:** Desarrollo Full Stack II (DSY2202)
- **Actividad:** Experiencia 1 — Semana 2 — Actividad Formativa 2
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

| Categoría | Juegos |
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

El proyecto funciona como un sitio web estático, sin backend ni base de datos. Bootstrap se incorpora mediante CDN y JavaScript se utiliza para las validaciones del formulario.

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

El formulario realiza validaciones del lado del cliente con fines académicos. No crea cuentas reales ni almacena contraseñas o información personal en una base de datos.

## Estructura del proyecto

```text
/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── registro.js
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
    ├── estrategia.html
    ├── familiares.html
    ├── creatividad.html
    ├── fiesta.html
    └── registro.html
```

Las imágenes de `img/juegos/` se reutilizan tanto en las fichas de productos como en los collages de la página principal.

## Cómo visualizar el proyecto

1. Descargar y descomprimir el proyecto, o clonar el repositorio.
2. Abrir `index.html` en un navegador.
3. Utilizar el menú o las tarjetas de Inicio para recorrer las categorías.
4. Seleccionar Registro para acceder al formulario.
5. Completar los campos y utilizar Crear cuenta para comprobar las validaciones.

También se puede abrir el proyecto desde Visual Studio Code con la extensión Live Server.

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

## Organización del trabajo

El código se administra mediante Git y GitHub. Las tareas de desarrollo se organizan en Trello utilizando los estados solicitados:

- Backlog.
- Iniciado.
- Proceso.
- No terminado por dificultades.
- Terminado.

Durante la Semana 2 se continuó utilizando el mismo repositorio y tablero de la Semana 1, registrando los cambios asociados a Bootstrap, JavaScript, el formulario y las pruebas de responsividad.

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

La entrega de la Semana 2 incluye el proyecto completo en formato ZIP, junto con los enlaces al repositorio GitHub y al tablero Trello.
