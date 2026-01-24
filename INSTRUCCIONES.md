# 🚀 Cómo Ver tu Portfolio en Ejecución

## Opción 1: Ejecutar Localmente (Recomendado para desarrollo)

### Paso 1: Instalar Node.js (si no lo tienes)

1. Ve a https://nodejs.org/
2. Descarga la versión LTS (Long Term Support)
3. Instala el paquete
4. Verifica la instalación abriendo una terminal y escribiendo:
   ```bash
   node --version
   npm --version
   ```

### Paso 2: Instalar Dependencias

Abre una terminal y navega a la carpeta del proyecto:

```bash
cd "/Users/fernandogonzalez/Documents/Pagina Personal/Nuevo_Portafolio_2026-01-05/portfolio-2026"
```

Luego instala las dependencias:

```bash
npm install
```

Esto instalará todas las librerías necesarias (Next.js, React, Tailwind, etc.)

### Paso 3: Ejecutar el Servidor de Desarrollo

```bash
npm run dev
```

Verás un mensaje como:
```
✓ Ready in 2.3s
○ Local:        http://localhost:3000
```

### Paso 4: Abrir en el Navegador

Abre tu navegador y ve a:
```
http://localhost:3000
```

¡Listo! Ya puedes ver tu portfolio en ejecución.

---

## Opción 2: Deploy en Vercel (Recomendado para producción)

### Método A: Desde GitHub (Más fácil)

1. **Crea un repositorio en GitHub:**
   - Ve a https://github.com/new
   - Crea un nuevo repositorio (ej: "portfolio-2026")
   - No inicialices con README

2. **Sube tu código:**
   ```bash
   cd "/Users/fernandogonzalez/Documents/Pagina Personal/Nuevo_Portafolio_2026-01-05/portfolio-2026"
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/portfolio-2026.git
   git push -u origin main
   ```

3. **Deploy en Vercel:**
   - Ve a https://vercel.com
   - Crea una cuenta (puedes usar GitHub)
   - Click en "Add New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente Next.js
   - Click en "Deploy"
   - En 2-3 minutos tendrás tu portfolio online

### Método B: Con Vercel CLI

1. **Instala Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd "/Users/fernandogonzalez/Documents/Pagina Personal/Nuevo_Portafolio_2026-01-05/portfolio-2026"
   vercel
   ```

3. Sigue las instrucciones en la terminal

---

## 📝 Comandos Útiles

```bash
# Desarrollo (con hot reload)
npm run dev

# Build para producción
npm run build

# Ejecutar build de producción localmente
npm start

# Ver errores de linting
npm run lint
```

---

## ⚠️ Notas Importantes

1. **Imágenes**: Antes de hacer deploy, asegúrate de agregar tus imágenes en `public/images/`:
   - `hero.webp` - Tu foto principal
   - `project1.webp` a `project6.webp` - Screenshots de tus proyectos

2. **Personalización**: Edita `lib/projectsData.ts` para cambiar el contenido de los proyectos

3. **Puerto alternativo**: Si el puerto 3000 está ocupado, Next.js usará automáticamente el 3001, 3002, etc.

---

## 🆘 Solución de Problemas

### Error: "npm: command not found"
- Instala Node.js desde https://nodejs.org/

### Error: "Port 3000 already in use"
- Cierra la aplicación que está usando el puerto
- O usa: `PORT=3001 npm run dev`

### Las imágenes no se muestran
- Verifica que estén en `public/images/`
- Los nombres deben coincidir exactamente con los del código

### Errores de TypeScript
- Ejecuta: `npm install` de nuevo
- Verifica que todas las dependencias estén instaladas

---

## 🌐 URLs de Ejemplo

Una vez deployado en Vercel, tendrás una URL como:
- `https://portfolio-2026.vercel.app`
- O puedes conectar tu dominio personalizado

¡Disfruta tu nuevo portfolio 2026! 🎉
