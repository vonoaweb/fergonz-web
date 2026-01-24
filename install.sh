#!/bin/bash

echo "🚀 Instalando Node.js y configurando el proyecto..."
echo ""

# Verificar si Node.js ya está instalado
if command -v node &> /dev/null; then
    echo "✅ Node.js ya está instalado: $(node --version)"
    echo "✅ npm ya está instalado: $(npm --version)"
else
    echo "📦 Node.js no está instalado."
    echo ""
    echo "Por favor, instala Node.js desde: https://nodejs.org/"
    echo "O ejecuta este comando en la terminal:"
    echo ""
    echo "  # Instalar Homebrew (si no lo tienes)"
    echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    echo ""
    echo "  # Luego instalar Node.js"
    echo "  brew install node"
    echo ""
    exit 1
fi

echo ""
echo "📦 Instalando dependencias del proyecto..."
cd "$(dirname "$0")"
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡Instalación completada!"
    echo ""
    echo "Para ejecutar el proyecto, usa:"
    echo "  npm run dev"
    echo ""
    echo "Luego abre http://localhost:3000 en tu navegador"
else
    echo ""
    echo "❌ Error al instalar dependencias"
    exit 1
fi
