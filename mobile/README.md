# VidaLink — Donación de sangre altruista 🩸

App móvil nativa (iOS + Android) para conectar donantes altruistas con quienes
necesitan sangre. Construida con **Expo + React Native + TypeScript** y
**expo-router**, desde un solo código base corre en iOS, Android y web.

## ✨ Funcionalidades

- **Onboarding** guiado: nombre, zona y tipo de sangre (o "no lo sé").
- **Dashboard de elegibilidad**: anillo de progreso con la cuenta regresiva de
  56 días entre donaciones y estado "puedes donar / en recuperación".
- **Solicitudes urgentes cercanas**: lista priorizada por urgencia y distancia,
  con filtros (todas / compatibles con tu tipo / críticas) y detalle completo.
- **Compatibilidad sanguínea**: matriz de a quién puedes donar y de quién puedes
  recibir, con indicadores de donante/receptor universal.
- **Centros de donación**: horarios, tiempo de espera, cómo llegar y llamada.
- **Agendar cita**: selector de centro, día y horario con confirmación.
- **Registro de donaciones e impacto**: "vidas ayudadas", logros/insignias y
  historial. Actualiza automáticamente tu elegibilidad.
- **Persistencia local** con AsyncStorage (los datos viven solo en el dispositivo).
- Diseño accesible con retroalimentación háptica y tema rojo cohesivo.

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
│   ├── (tabs)/              # Tabs: Inicio, Solicitudes, Centros, Perfil
│   ├── request/[id].tsx     # Detalle de solicitud + agendar
│   └── center/[id].tsx      # Detalle de centro + agendar/registrar
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
