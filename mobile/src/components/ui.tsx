import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { colors, radius, shadow, spacing, typography } from '@/theme';

export function Card({
  style,
  children,
  ...rest
}: ViewProps & { children: React.ReactNode }) {
  return (
    <View style={[styles.card, shadow.card as ViewStyle, style]} {...rest}>
      {children}
    </View>
  );
}

export function SectionHeader({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && (
        <Text style={styles.sectionAction} onPress={onAction}>
          {action}
        </Text>
      )}
    </View>
  );
}

const TONES = {
  primary: { bg: colors.primarySoft, fg: colors.primary },
  urgent: { bg: '#FEE2E2', fg: colors.urgent },
  warning: { bg: colors.warningSoft, fg: '#B45309' },
  success: { bg: colors.successSoft, fg: colors.success },
  info: { bg: colors.infoSoft, fg: colors.info },
  neutral: { bg: colors.surfaceAlt, fg: colors.textSecondary },
} as const;

export type Tone = keyof typeof TONES;

export function Tag({
  label,
  tone = 'neutral',
  icon,
  style,
}: {
  label: string;
  tone?: Tone;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}) {
  const t = TONES[tone];
  return (
    <View style={[styles.tag, { backgroundColor: t.bg }, style]}>
      {icon && <Ionicons name={icon} size={12} color={t.fg} />}
      <Text style={[styles.tagText, { color: t.fg }]}>{label}</Text>
    </View>
  );
}

export function StatTile({
  value,
  label,
  icon,
  tint = colors.primary,
}: {
  value: string | number;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  tint?: string;
}) {
  return (
    <Card style={styles.stat}>
      <View style={[styles.statIcon, { backgroundColor: tint + '18' }]}>
        <Ionicons name={icon} size={18} color={tint} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

export function Divider({ style }: { style?: ViewStyle }) {
  return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  sectionTitle: typography.h3 as TextStyle,
  sectionAction: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13.5,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 5,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  tagText: { fontSize: 11.5, fontWeight: '700', letterSpacing: 0.2 },
  stat: {
    flex: 1,
    padding: spacing.md,
    gap: 2,
  },
  statIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  statValue: { fontSize: 22, fontWeight: '800', color: colors.text },
  statLabel: { fontSize: 12, color: colors.textSecondary, fontWeight: '500' },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
});
