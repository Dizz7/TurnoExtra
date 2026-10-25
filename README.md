# TurnoExtra 🎲

Sitio web de un catálogo de juegos de mesa, desarrollado con HTML5 y CSS3 para la actividad **“Desarrollando nuestra interfaz gráfica”**.

## Datos de la actividad

- **Estudiante:** Daniel Alarcón
- **Asignatura:** Desarrollo Full Stack II (DSY2202)
- **Actividad:** Experiencia 1 — Semana 1 — Actividad Formativa 1
- **Proyecto:** TurnoExtra

## Descripción

TurnoExtra presenta juegos de mesa organizados en cuatro categorías. Desde la página principal se puede acceder a cada categoría y consultar las fichas de sus juegos.

Cada ficha incluye:

- Imagen del juego.
- Nombre.
- Breve descripción.
- Precio de venta.
- Indicación de si tiene descuento.

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
- **Git y GitHub:** control de versiones y alojamiento del código.
- **Trello:** organización y seguimiento de tareas.
- **Google Fonts:** tipografía Nunito.

El sitio funciona sin JavaScript.

## Características del sitio

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

## Estructura del proyecto

```text
/
├── index.html
├── README.md
├── css/
│   └── styles.css
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
    └── fiesta.html
```

Las imágenes de `img/juegos/` se reutilizan tanto en las fichas de productos como en los collages de la página principal.

## Cómo visualizar el proyecto

1. Descargar y descomprimir el proyecto, o clonar el repositorio.
2. Abrir `index.html` en un navegador.
3. Utilizar el menú o las tarjetas de Inicio para recorrer las categorías.

También se puede abrir el proyecto desde Visual Studio Code con la extensión Live Server.

No requiere instalación de dependencias ni un proceso de compilación. La fuente Nunito se carga desde Google Fonts; si no hay conexión, se utiliza la fuente alternativa definida en el CSS.

## Organización del trabajo

El código se administra mediante Git y GitHub. Las tareas de desarrollo se organizan en Trello utilizando los estados solicitados:

- Backlog.
- Iniciado.
- Proceso.
- No terminado por dificultades.
- Terminado.

## Recursos gráficos y créditos

Las imágenes de las cajas corresponden a los juegos y sus respectivas marcas y editoriales. Se incorporaron como referencias visuales para este proyecto académico.

Se utilizó asistencia de inteligencia artificial para preparar versiones con fondo transparente.

La tipografía Nunito se obtiene de Google Fonts:
https://fonts.google.com/specimen/Nunito

## Enlaces de entrega

Se incluyen los enlaces en AVA.
- **Repositorio GitHub:** 
- **Tablero Trello:**

La entrega incluye el proyecto completo en formato ZIP y los enlaces al repositorio y al tablero de Trello.