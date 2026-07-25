import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RequestCard } from '@/components/RequestCard';
import { useDonor } from '@/context/DonorContext';
import { BloodRequest, REQUESTS } from '@/data';
import { colors, radius, spacing } from '@/theme';
import { DONATE_TO } from '@/utils/blood';

type Filter = 'all' | 'compatible' | 'critical';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'compatible', label: 'Compatibles' },
  { key: 'critical', label: 'Críticas' },
];

export default function Requests() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { profile } = useDonor();
  const [filter, setFilter] = useState<Filter>('all');

  const isCompatible = (r: BloodRequest) =>
    profile.bloodType ? DONATE_TO[profile.bloodType].includes(r.bloodType) : false;

  const list = useMemo(() => {
    const sorted = [...REQUESTS].sort((a, b) => {
      const order = { critical: 0, high: 1, normal: 2 } as const;
      return order[a.urgency] - order[b.urgency] || a.distanceKm - b.distanceKm;
    });
    if (filter === 'compatible') return sorted.filter(isCompatible);
    if (filter === 'critical') return sorted.filter((r) => r.urgency === 'critical');
    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, profile.bloodType]);

  const criticalCount = REQUESTS.filter((r) => r.urgency === 'critical').length;

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.title}>Solicitudes de sangre</Text>
        <Text style={styles.subtitle}>
          {criticalCount} urgencias críticas · red hospitalaria activa
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {FILTERS.map((f) => (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={[styles.chip, filter === f.key && styles.chipActive]}
            >
              <Text
                style={[styles.chipText, filter === f.key && styles.chipTextActive]}
              >
                {f.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {list.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Sin solicitudes en este filtro</Text>
            <Text style={styles.emptyText}>
              Cambia de filtro para ver más solicitudes de la red.
            </Text>
          </View>
        ) : (
          list.map((r) => (
            <RequestCard
              key={r.id}
              request={r}
              compatible={isCompatible(r)}
              onPress={() => router.push(`/request/${r.id}`)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, letterSpacing: -0.4 },
  subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 3 },
  filters: { gap: spacing.sm, paddingTop: spacing.lg },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 13.5, fontWeight: '700', color: colors.textSecondary },
  chipTextActive: { color: '#fff' },
  list: { padding: spacing.xl, gap: spacing.md, paddingBottom: spacing.xxxl },
  empty: { alignItems: 'center', paddingVertical: spacing.xxxl, gap: spacing.sm },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  emptyText: {
    fontSize: 13.5,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
});
