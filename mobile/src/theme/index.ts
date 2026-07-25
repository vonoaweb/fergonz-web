/**
 * VidaLink design system.
 * A warm, trustworthy palette built around a clinical blood-red primary.
 */
import { Platform, TextStyle } from 'react-native';

export const colors = {
  // Brand — warm, friendly crimson
  primary: '#F5334C',
  primaryDark: '#C21D3A',
  primaryLight: '#FF7085',
  primarySoft: '#FFEDEE',
  primaryTint: '#FFDDE1',

  // Friendly secondary accent (teal)
  secondary: '#12B3A6',
  secondarySoft: '#D8F6F2',

  // Semantic
  urgent: '#E11D48',
  warning: '#F59E0B',
  warningSoft: '#FEF3C7',
  success: '#17B26A',
  successSoft: '#DDF6E8',
  info: '#3B82F6',
  infoSoft: '#DEEBFF',

  // Warm neutrals
  bg: '#FFF7F5',
  surface: '#FFFFFF',
  surfaceAlt: '#FBEFEE',
  border: '#F3E4E3',
  overlay: 'rgba(42, 20, 22, 0.55)',

  // Text (warm near-black)
  text: '#2A1E21',
  textSecondary: '#7C6A6C',
  textMuted: '#B4A6A7',
  textOnPrimary: '#FFFFFF',

  // Extras
  gold: '#E0A422',
  shadow: '#5A0A19',
} as const;

export const gradients = {
  primary: ['#FF7085', '#F5334C', '#C21D3A'] as const,
  urgent: ['#FB7185', '#E11D48'] as const,
  hero: ['#FF7085', '#F5334C', '#C21D3A'] as const,
  success: ['#34D399', '#17B26A'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 40,
} as const;

export const radius = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 26,
  xxl: 32,
  pill: 999,
} as const;

const fontWeight = (w: TextStyle['fontWeight']): TextStyle['fontWeight'] => w;

export const typography = {
  hero: { fontSize: 32, fontWeight: fontWeight('800'), letterSpacing: -0.5 },
  h1: { fontSize: 26, fontWeight: fontWeight('800'), letterSpacing: -0.4 },
  h2: { fontSize: 21, fontWeight: fontWeight('700'), letterSpacing: -0.3 },
  h3: { fontSize: 17, fontWeight: fontWeight('700') },
  body: { fontSize: 15, fontWeight: fontWeight('500') },
  bodyStrong: { fontSize: 15, fontWeight: fontWeight('700') },
  small: { fontSize: 13, fontWeight: fontWeight('500') },
  caption: { fontSize: 11.5, fontWeight: fontWeight('600'), letterSpacing: 0.3 },
} satisfies Record<string, TextStyle>;

export const shadow = {
  card: Platform.select({
    ios: {
      shadowColor: colors.shadow,
      shadowOpacity: 0.1,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
    },
    android: { elevation: 3 },
    default: {},
  }),
  floating: Platform.select({
    ios: {
      shadowColor: colors.primary,
      shadowOpacity: 0.35,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
    },
    android: { elevation: 8 },
    default: {},
  }),
} as const;

export const theme = { colors, gradients, spacing, radius, typography, shadow };
export type Theme = typeof theme;
