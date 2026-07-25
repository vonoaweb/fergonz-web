import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DonationCenter } from '@/data';
import { colors, radius, spacing } from '@/theme';
import { Card, Tag } from './ui';

export function CenterCard({
  center,
  onPress,
}: {
  center: DonationCenter;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      {({ pressed }) => (
        <Card style={[styles.card, { transform: [{ scale: pressed ? 0.99 : 1 }] }]}>
          <View style={styles.header}>
            <View style={styles.iconWrap}>
              <Ionicons name="business" size={20} color={colors.primary} />
            </View>
            <View style={styles.headText}>
              <Text style={styles.name}>{center.name}</Text>
              <View style={styles.sectorRow}>
                <Tag
                  label={center.sector === 'privado' ? 'Privado' : 'Público'}
                  tone={center.sector === 'privado' ? 'warning' : 'info'}
                />
                <Text style={styles.type} numberOfLines={1}>
                  {center.alcaldia}
                </Text>
              </View>
            </View>
            <Tag
              label={center.acceptsWalkIns ? 'Sin cita' : 'Con cita'}
              tone={center.acceptsWalkIns ? 'secondary' : 'neutral'}
            />
          </View>

          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={14} color={colors.textMuted} />
            <Text style={styles.address}>{center.address}</Text>
          </View>

          <View style={styles.stats}>
            <Meta icon="time-outline" text={center.hours} />
            <Meta icon="call-outline" text={center.phone} />
          </View>
        </Card>
      )}
    </Pressable>
  );
}

function Meta({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <View style={styles.meta}>
      <Ionicons name={icon} size={13} color={colors.textSecondary} />
      <Text style={styles.metaText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.md },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headText: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: colors.text, lineHeight: 19 },
  sectorRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 5, flexWrap: 'wrap' },
  type: { fontSize: 12.5, color: colors.textSecondary, flexShrink: 1 },
  addressRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 5 },
  address: { fontSize: 13, color: colors.textSecondary, flex: 1 },
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { fontSize: 12.5, color: colors.textSecondary, fontWeight: '600' },
});
