# VidaLink — Donación de sangre altruista 🩸

App móvil nativa (iOS + Android) para conectar donantes altruistas con quienes
necesitan sangre. Construida con **Expo + React Native + TypeScript** y
**expo-router**, desde un solo código base corre en iOS, Android y web.

## ✨ Funcionalidades

- **Onboarding** guiado: nombre y tipo de sangre (o "no lo sé").
- **Dashboard de elegibilidad**: anillo de progreso con la cuenta regresiva
  (sangre completa cada 2 meses) y estado "puedes donar / en recuperación".
- **Centros de donación REALES (México)**: Cruz Roja Mexicana, CNTS, IMSS CMN
  Siglo XXI e INCMNSZ, con dirección, teléfono y horario verificados; "cómo
  llegar" (Google Maps) y llamada directa.
- **Requisitos y datos oficiales**: elegibilidad, frecuencia y preguntas
  frecuentes según CNTS, IMSS e ISSSTE, con fuentes citadas.
- **Compatibilidad sanguínea**: matriz de a quién puedes donar y de quién puedes
  recibir, con indicadores de donante/receptor universal.
- **Registro de donaciones e impacto**: "vidas ayudadas", logros/insignias e
  historial. Actualiza automáticamente tu elegibilidad.
- **Persistencia local** con AsyncStorage (los datos viven solo en el dispositivo).
- Diseño accesible con retroalimentación háptica y tema rojo cohesivo.

> **Sobre las solicitudes de pacientes:** no se incluyen casos ficticios. Las
> solicitudes reales de pacientes solo deben provenir de instituciones
> verificadas (bancos de sangre, hospitales) a través de un backend con
> validación. La app enlaza a plataformas verificadas (p. ej. Blooders) para
> casos reales. El siguiente paso natural es conectar un backend (Supabase) con
> publicación restringida a instituciones autorizadas.

## 🚀 Cómo ejecutar

```bash
cd mobile
npm install

# Abre el menú de Expo (escanea el QR con la app Expo Go)
npm start

# O directamente en cada plataforma:
npm run ios       # requiere macOS + Xcode
npm run android   # requiere Android Studio / dispositivo
npm run web       # navegador
```

### Compilar apps nativas (stores)

Con [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

## 🗂️ Estructura

```
mobile/
├── app/                     # Rutas (expo-router, file-based)
│   ├── _layout.tsx          # Providers + Stack raíz
│   ├── index.tsx            # Splash + redirección según onboarding
│   ├── onboarding.tsx       # Alta del donante
│   ├── (tabs)/              # Tabs: Inicio, Requisitos, Centros, Perfil
│   └── center/[id].tsx      # Detalle de centro + registrar donación
├── src/
│   ├── components/          # UI reutilizable (Button, Cards, ProgressRing…)
│   ├── context/             # DonorContext (estado + AsyncStorage)
│   ├── data/                # Datos de ejemplo (solicitudes, centros, tips)
│   ├── theme/               # Sistema de diseño (colores, spacing, tipografía)
│   └── utils/               # Compatibilidad sanguínea y elegibilidad
├── assets/                  # Íconos y splash (gota de sangre generada)
└── scripts/gen-assets.js    # Generador de assets sin dependencias
```

## 🔌 Siguientes pasos sugeridos

Los datos de solicitudes y centros son de ejemplo. Para producción se puede
conectar un backend (p. ej. Supabase) para solicitudes reales, geolocalización
con `expo-location`, y notificaciones push con `expo-notifications`.

> Nota: la donación altruista es voluntaria y no remunerada. Los requisitos de
> elegibilidad mostrados son orientativos; cada centro confirma los suyos.
