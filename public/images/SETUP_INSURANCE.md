# 📋 Setup para Insurance Transformation Project

## Archivos Necesarios

Para que el proyecto "Insurance Transformation" funcione correctamente, necesitas los siguientes archivos en esta carpeta (`/public/images/`):

### ✅ Archivos que ya tienes:
- `seguros_v2.pdf` → Renombrar a `insurance-ux-case-study.pdf`
- `seguros_v2.webp` → Copiar/renombrar a `vytal-redesign-after.webp`

### ⚠️ Archivos que necesitas agregar:
- `legacy-site-before.webp` - Captura de pantalla del sitio viejo K&K (antes del rediseño)

## Comandos para Configurar

```bash
# 1. Renombrar el PDF
cd public/images
mv seguros_v2.pdf insurance-ux-case-study.pdf

# 2. Copiar/renombrar la imagen del diseño nuevo
cp seguros_v2.webp vytal-redesign-after.webp

# 3. Agregar la imagen del sitio legacy (debes tenerla)
# Coloca 'legacy-site-before.webp' en esta carpeta
```

## Componentes Creados

1. **CompareSlider** - Slider interactivo para comparar antes/después
2. **ResearchSection** - Sección con personas (Pablo y Jaime) y botón de descarga del PDF

## Características

- ✅ Slider interactivo con arrastre (drag)
- ✅ Soporte táctil para móviles
- ✅ Tarjetas de personas con goals y pain points
- ✅ Botón de descarga del PDF con estilo outline
- ✅ Diseño glassmorphism consistente
- ✅ Animaciones suaves con Framer Motion
