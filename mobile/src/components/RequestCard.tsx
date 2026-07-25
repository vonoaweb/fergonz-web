import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BloodRequest, Urgency } from '@/data';
import { colors, radius, shadow, spacing } from '@/theme';
import { Card, Tag, Tone } from './ui';

export const URGENCY_META: Record<
  Urgency,
  { label: string; tone: Tone; color: string }
> = {
  critical: { label: 'Crítico', tone: 'urgent', color: colors.urgent },
  high: { label: 'Urgente', tone: 'warning', color: colors.warning },
  normal: { label: 'Programado', tone: 'info', color: colors.info },
};

export function RequestCard({
  request,
  onPress,
  compatible,
}: {
  request: BloodRequest;
  onPress?: () => void;
  compatible?: boolean;
}) {
  const meta = URGENCY_META[request.urgency];
  const pct = Math.round(
    (request.unitsFulfilled / request.unitsNeeded) * 100,
  );

  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      {({ pressed }) => (
        <Card
          style={[styles.card, { transform: [{ scale: pressed ? 0.99 : 1 }] }]}
        >
          <View style={styles.top}>
            <View
              style={[styles.badge, shadow.card as ViewStyle]}
              accessibilityLabel={`Tipo ${request.bloodType}`}
            >
              <Text style={styles.badgeType}>{request.bloodType}</Text>
            </View>
            <View style={styles.info}>
              <View style={styles.tagRow}>
                <Tag label={meta.label} tone={meta.tone} />
                {compatible && (
                  <Tag label="Compatible contigo" tone="success" icon="checkmark-circle" />
                )}
              </View>
              <Text style={styles.hospital} numberOfLines={1}>
                {request.hospital}
              </Text>
              <View style={styles.metaRow}>
                <Ionicons name="location-outline" size={13} color={colors.textMuted} />
                <Text style={styles.metaText}>
                  {request.city} · {request.distanceKm} km
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${pct}%`, backgroundColor: meta.color },
              ]}
            />
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.units}>
              {request.unitsFulfilled}/{request.unitsNeeded} unidades reunidas
            </Text>
            <Text style={styles.time}>hace {request.postedHoursAgo} h</Text>
          </View>
        </Card>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.md },
  top: { flexDirection: 'row', gap: spacing.md },
  badge: {
    width: 58,
    height: 58,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primaryTint,
  },
  badgeType: { fontSize: 20, fontWeight: '800', color: colors.primary },
  info: { flex: 1, gap: 4, justifyContent: 'center' },
  tagRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  hospital: { fontSize: 15, fontWeight: '700', color: colors.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { fontSize: 12.5, color: colors.textSecondary },
  progressTrack: {
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: radius.pill },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  units: { fontSize: 12.5, fontWeight: '600', color: colors.textSecondary },
  time: { fontSize: 11.5, color: colors.textMuted },
});
