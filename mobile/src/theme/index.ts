/**
 * VidaLink design system.
 * A warm, trustworthy palette built around a clinical blood-red primary.
 */
import { Platform, TextStyle } from 'react-native';

export const colors = {
  // Brand
  primary: '#E11D2A',
  primaryDark: '#B01522',
  primaryLight: '#FF5A5F',
  primarySoft: '#FDECEC',
  primaryTint: '#FCE4E6',

  // Semantic
  urgent: '#DC2626',
  warning: '#F59E0B',
  warningSoft: '#FEF3C7',
  success: '#16A34A',
  successSoft: '#DCFCE7',
  info: '#2563EB',
  infoSoft: '#DBEAFE',

  // Neutrals
  bg: '#F7F7FB',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F2F6',
  border: '#E6E7EC',
  overlay: 'rgba(17, 18, 24, 0.55)',

  // Text
  text: '#15161C',
  textSecondary: '#5B5D6B',
  textMuted: '#9598A6',
  textOnPrimary: '#FFFFFF',

  // Extras
  gold: '#D4A017',
  shadow: '#101018',
} as const;

export const gradients = {
  primary: ['#FF5A5F', '#E11D2A', '#B01522'] as const,
  urgent: ['#F97316', '#DC2626'] as const,
  hero: ['#E11D2A', '#8E0F1A'] as const,
  success: ['#22C55E', '#15803D'] as const,
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
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  xxl: 28,
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
      shadowOpacity: 0.08,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
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
