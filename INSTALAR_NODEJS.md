# 📥 Instalación Rápida de Node.js en macOS

## Opción 1: Instalador Oficial (MÁS FÁCIL) ⭐

1. **Abre tu navegador** y ve a:
   ```
   https://nodejs.org/
   ```

2. **Descarga la versión LTS** (Long Term Support) - el botón verde grande

3. **Ejecuta el instalador** que descargaste (archivo .pkg)

4. **Sigue el asistente** de instalación (solo haz click en "Siguiente")

5. **Reinicia la Terminal** (ciérrala y ábrela de nuevo)

6. **Verifica la instalación**:
   ```bash
   node --version
   npm --version
   ```

7. **Listo!** Ahora puedes ejecutar:
   ```bash
   cd "/Users/fernandogonzalez/Documents/Pagina Personal/Nuevo_Portafolio_2026-01-05/portfolio-2026"
   npm install
   npm run dev
   ```

---

## Opción 2: Con Homebrew (Si ya lo tienes)

```bash
brew install node
```

---

## Opción 3: Instalar Homebrew + Node.js

Si no tienes Homebrew, puedes instalarlo primero:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Luego instala Node.js:

```bash
brew install node
```

---

## ✅ Verificación

Después de instalar, verifica que todo funciona:

```bash
node --version   # Debería mostrar algo como: v20.x.x
npm --version    # Debería mostrar algo como: 10.x.x
```

---

## 🚀 Una vez instalado Node.js

Ejecuta estos comandos en la terminal:

```bash
# 1. Ir a la carpeta del proyecto
cd "/Users/fernandogonzalez/Documents/Pagina Personal/Nuevo_Portafolio_2026-01-05/portfolio-2026"

# 2. Instalar dependencias
npm install

# 3. Ejecutar el servidor
npm run dev
```

Luego abre: **http://localhost:3000**

---

## 💡 Consejo

La **Opción 1 (Instalador Oficial)** es la más fácil y recomendada para usuarios que no están familiarizados con la terminal.
