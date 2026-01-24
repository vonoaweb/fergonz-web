# ✨ Características del Portfolio 2026

## 🎯 Modales Interactivos de Proyectos

Cada tarjeta de proyecto en el bento grid es clickeable y abre un modal elegante con el caso de estudio completo.

### Funcionalidades del Modal:

1. **Animaciones Suaves**
   - Fade-in del fondo oscuro (200ms)
   - Slide-up del modal desde abajo (300ms)
   - Fade-out al cerrar

2. **Contenido Estructurado**
   - **Imagen grande** del proyecto
   - **Título y rol**
   - **Problema**: Descripción del desafío (con fondo rojo suave)
   - **Solución**: Tu proceso y estrategia (con fondo azul suave)
   - **Resultados**: Métricas e impacto (con fondo verde suave, opcional)

3. **Interacciones**
   - Click fuera del modal para cerrar
   - Botón X en la esquina superior derecha
   - Tecla Escape para cerrar
   - Scroll interno si el contenido es largo
   - Bloqueo del scroll del body cuando el modal está abierto

4. **Responsive**
   - En móvil: modal ocupa 95% del ancho
   - En desktop: máximo 4xl de ancho
   - Scroll interno automático si hay mucho contenido

### Estructura de Datos

Cada proyecto tiene esta estructura:

```typescript
{
  id: number;              // ID único
  title: string;           // Título del proyecto
  role: string;            // Tu rol en el proyecto
  image: string;           // Ruta de la imagen
  link?: string;           // URL del proyecto (opcional)
  size: 'small' | 'medium' | 'large' | 'xlarge';  // Tamaño en el grid
  problem: string;         // Descripción del problema
  solution: string;        // Tu solución y proceso
  results?: string;        // Resultados y métricas (opcional)
}
```

## 🎨 Efectos Visuales

### Tarjetas de Proyecto:
- **Hover**: Escala 1.05, blur suave en imagen
- **Overlay**: Gradiente oscuro con texto "Click para ver más"
- **Transición de color**: Título cambia a color primario/accent en hover
- **Cursor pointer**: Indica que es clickeable

### Modal:
- **Glassmorphism**: Fondo translúcido con blur
- **Bordes redondeados**: rounded-3xl
- **Sombras**: shadow-2xl para profundidad
- **Secciones coloreadas**: Problema (rojo), Solución (azul), Resultados (verde)

## 🔧 Componentes Clave

1. **ProjectCard**: Tarjeta clickeable con hover effects
2. **ProjectModal**: Modal reutilizable con animaciones
3. **useProjectModal**: Hook personalizado para manejar estado
4. **projectsData.ts**: Archivo centralizado con todos los proyectos

## 📱 Responsive

- **Mobile**: Modal full-width con padding
- **Tablet**: Modal con márgenes laterales
- **Desktop**: Modal centrado con máximo 4xl de ancho

## ♿ Accesibilidad

- Botón de cerrar con aria-label
- Soporte para tecla Escape
- Focus trap (el modal captura el foco)
- Scroll bloqueado en body cuando modal está abierto
