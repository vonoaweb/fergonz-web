# Guía de Personalización

## 📸 Imágenes a Reemplazar

### 1. Foto Principal (Hero)
- **Ubicación**: `public/images/hero.webp`
- **Tamaño recomendado**: 1200x1500px o similar
- **Formato**: WebP (recomendado)

### 2. Imágenes de Proyectos
Coloca tus screenshots de proyectos en:
- `public/images/project1.webp`
- `public/images/project2.webp`
- `public/images/project3.webp`
- `public/images/project4.webp`
- `public/images/project5.webp`
- `public/images/project6.webp`

**Tamaño recomendado**: 1200x800px o similar

## ✏️ Contenido a Personalizar

### 1. Información Personal
Edita `app/page.tsx`:

```tsx
// Línea ~20: Nombre
<h1 className="...">
  Ferguson  // ← Cambia aquí
  <br />
  <span className="...">González</span>  // ← Y aquí
</h1>

// Línea ~25: Título profesional
<p className="...">
  Digital Product Designer  // ← Personaliza
  <br />
  & Developer
</p>
```

### 2. Proyectos (con Modales Interactivos)
Edita el archivo `lib/projectsData.ts` para personalizar tus proyectos:

```tsx
export const projects: Project[] = [
  {
    id: 1,
    title: 'App de Delivery',  // ← Título del proyecto
    role: 'Product Designer',  // ← Tu rol
    image: '/images/project1.webp',  // ← Ruta de imagen
    link: '#',  // ← URL del proyecto (opcional)
    size: 'large',  // ← 'small', 'medium', 'large', 'xlarge'
    problem: 'Los usuarios tardaban 10 minutos...',  // ← Descripción del problema
    solution: 'Rediseñé el flujo a 3 pasos...',  // ← Tu solución
    results: 'Reducción de 60% en tiempo...',  // ← Resultados (opcional)
  },
  // ... más proyectos
];
```

**Estructura del Modal:**
- **Problema**: Describe el desafío o problema que había que resolver
- **Solución**: Explica tu proceso, estrategia y cómo lo resolviste
- **Resultados**: Menciona métricas, impacto o feedback (opcional)

**Tamaños de tarjetas:**
- `small`: 1 columna, 1 fila
- `medium`: 2 columnas, 1 fila
- `large`: 2 columnas, 2 filas
- `xlarge`: 3 columnas, 2 filas

### 3. Servicios
Edita el array `services` en `app/page.tsx` (línea ~60):

```tsx
const services = [
  {
    title: 'Product Design',  // ← Nombre del servicio
    description: 'End-to-end product design...',  // ← Descripción
    icon: '🎨',  // ← Emoji o icono
  },
  // ... más servicios
];
```

### 4. Habilidades
Edita el array de skills en la sección About (línea ~120):

```tsx
{[
  'Product Design',  // ← Agrega o modifica habilidades
  'UI/UX Design',
  'Frontend Development',
  // ... más skills
].map((skill) => (
  // ...
))}
```

### 5. Redes Sociales
Edita los links en la sección Contact (línea ~200):

```tsx
<a
  href="#"  // ← Tu LinkedIn
  className="..."
  aria-label="LinkedIn"
>
  LinkedIn
</a>
<a
  href="#"  // ← Tu Twitter/X
  className="..."
  aria-label="Twitter"
>
  Twitter
</a>
<a
  href="#"  // ← Tu GitHub
  className="..."
  aria-label="GitHub"
>
  GitHub
</a>
```

### 6. Email de Contacto
Si quieres agregar un email visible, edita la sección Contact.

## 🎨 Personalización de Colores

Edita `tailwind.config.js`:

```js
colors: {
  primary: '#6366F1',  // ← Color principal (azul)
  accent: '#10B981',   // ← Color de acento (verde)
  dark: {
    bg: '#050816',     // ← Fondo dark mode
    card: '#1F2937',   // ← Cards dark mode
    border: 'rgba(255, 255, 255, 0.1)',
  },
  // ...
}
```

## 🚀 Pasos para Deploy

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Probar localmente**:
   ```bash
   npm run dev
   ```
   Abre http://localhost:3000

3. **Build para producción**:
   ```bash
   npm run build
   ```

4. **Deploy en Vercel**:
   - Conecta tu repositorio GitHub con Vercel
   - O usa el CLI: `vercel`

## 📝 Notas Importantes

- Las imágenes deben estar en formato JPG o PNG
- Optimiza las imágenes antes de subirlas (usa herramientas como TinyPNG)
- El formulario de contacto es solo frontend - necesitarás un backend para procesar los mensajes
- Todos los componentes son responsive y funcionan en mobile

## 🔧 Solución de Problemas

### Las imágenes no se muestran
- Verifica que las imágenes estén en `public/images/`
- Asegúrate de que los nombres coincidan exactamente
- Reinicia el servidor de desarrollo

### El dark mode no funciona
- Limpia el localStorage del navegador
- Verifica que `darkMode: 'class'` esté en `tailwind.config.js`

### Errores de TypeScript
- Ejecuta `npm install` de nuevo
- Verifica que todas las dependencias estén instaladas
