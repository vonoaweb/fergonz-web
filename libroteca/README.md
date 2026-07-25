# Libroteca

App de lectura con cuatro piezas que se alimentan entre sí: **recomendaciones**,
**notas**, **comunidad** y **finales alternativos**. Además escanea el código de
barras de un libro físico para añadirlo en un toque.

## Qué hace

| Sección | Ruta | Qué hay |
| --- | --- | --- |
| Descubre | `/` | Buscador sobre Open Library, chips de temas favoritos y recomendaciones explicadas ("coincide con distopía y feminismo"). |
| Biblioteca | `/biblioteca` | Tus libros por estado (por leer / leyendo / leído / abandonado), con puntuación y progreso de página. |
| Escanear | `/escanear` | Cámara + lectura de EAN-13, o ISBN a mano. Resuelve el libro y lo añade a la estantería. |
| Comunidad | `/comunidad` | Feed de reseñas, recomendaciones y finales compartidos, con "me gusta". |
| Finales | `/finales` | Todos los finales alternativos, ordenados por votos o por fecha y filtrables por tono. |
| Ficha de libro | `/libro?id=…` | Notas con citas y etiquetas, y el editor de finales alternativos. |

### Escaneo de ISBN

`components/Scanner.tsx` usa la [Barcode Detection API][bd] sobre el stream de
`getUserMedia`. Como esa API sólo existe en Chrome/Edge/Android, hay dos
degradaciones:

1. Sin lector de códigos pero con cámara → se abre la cámara y se avisa.
2. Sin cámara o sin permiso → campo de ISBN manual, siempre visible.

El ISBN se valida en cliente (dígito de control de ISBN-10 y EAN-13, y prefijo
978/979) antes de consultar la API, así que un código de barras de un paquete de
galletas no dispara una búsqueda.

> La cámara sólo funciona sobre HTTPS o `localhost`.

### Finales alternativos

Cada final tiene título, cuerpo, **tono** (esperanzador, trágico, ambiguo,
vengativo, onírico, cómico), marca de spoiler —el texto sale difuminado hasta que
tocas— y votos. El botón *Dame una idea* saca un disparador de
`lib/prompts.ts` para quien se queda en blanco.

### Recomendaciones

`lib/recommend.ts` construye un perfil de temas ponderado: los favoritos
declarados pesan 3, los libros leídos 1,5 escalado por tu puntuación, los
abandonados restan, y haber escrito un final sobre un libro es la señal más
fuerte de todas. Encima suma afinidad de autor, "me gusta" de la comunidad y
número de finales escritos. Cada tarjeta muestra por qué salió.

## Datos

- **Catálogo**: [Open Library](https://openlibrary.org/developers/api) — pública,
  sin clave ni registro. Búsqueda, resolución de ISBN y portadas.
- **Tus datos**: `localStorage`, bajo la clave `libroteca:v1`. No hay backend ni
  cuentas: la comunidad viene sembrada en `lib/seed.ts` y tus publicaciones se
  añaden en local. Es el punto natural por donde meter una base de datos real.

## Diseño

Un solo sistema, dos temas: **noche** (por defecto) y **papel**, una página
impresa bajo luz cálida. Los colores no se escriben en las clases: son
variables CSS semánticas (`--c-bg`, `--c-surface`, `--c-ink`, `--c-accent`…)
declaradas en `app/globals.css` y expuestas a Tailwind como `bg-surface`,
`text-muted`, `border-line`. Cambiar de tema reasigna las variables; ningún
componente sabe qué tema está activo. El tema se guarda en `localStorage` y se
aplica con un script en línea antes del primer pintado, para que el modo claro
no parpadee en oscuro.

Tres tipografías, una función cada una:

| Familia | Uso |
| --- | --- |
| **Fraunces** (variable) | Titulares y títulos de libro. |
| **Inter** | Interfaz: botones, etiquetas, metadatos. |
| **Literata** | Lectura larga: citas, notas y finales alternativos. |

Las portadas se dibujan como objetos, no como rectángulos: lomo sombreado,
canto de páginas, brillo de barniz y una leve inclinación 3D al pasar el ratón.
Cuando Open Library no tiene portada —o falla la red— `BookCover` genera una
de tela con la paleta de las colecciones de bolsillo clásicas, en vez de
mostrar un hueco.

Los controles repetidos están extraídos: `Chip` para filtros y selección,
`Button` para acciones, `SectionHeader` para los encabezados de sección.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
npm run typecheck
```

## Stack

Next.js 14 (App Router) · TypeScript en modo estricto · Tailwind CSS ·
`next/font` · lucide-react. Sin dependencias de estado ni de UI externas:
`useReducer` + contexto en `lib/store.tsx`, y los componentes son propios.

## Estructura

```
app/
  page.tsx            Descubre
  biblioteca/         Estantería y filtros
  comunidad/          Feed
  escanear/           Escáner de ISBN
  finales/            Finales alternativos
  libro/              Ficha: notas + finales
components/
  BookCover.tsx       Portada dibujada como libro, con respaldo generado
  Chip / Button       Primitivas de control reutilizadas en toda la app
  Scanner.tsx         Cámara + lectura de códigos + ISBN manual
  …                   BookCard, EndingComposer, PostCard, ThemeToggle…
lib/
  openlibrary.ts      Cliente de la API + validación de ISBN
  recommend.ts        Motor de recomendaciones
  store.tsx           Estado global y persistencia
  theme.ts            Lectura y escritura del tema
  seed.ts             Catálogo y comunidad iniciales
  prompts.ts          Ideas para finales
```

[bd]: https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API
