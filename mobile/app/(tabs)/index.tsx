import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CenterCard } from '@/components/CenterCard';
import { ProgressRing } from '@/components/ProgressRing';
import { Card, SectionHeader, StatTile } from '@/components/ui';
import { useDonor } from '@/context/DonorContext';
import { CENTERS, PRE_TIPS, REAL_CASES_URL } from '@/data';
import { colors, gradients, radius, spacing } from '@/theme';
import { getEligibility, LIVES_PER_DONATION } from '@/utils/eligibility';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { profile, donations, lastDonationDate } = useDonor();

  const eligibility = useMemo(
    () => getEligibility(lastDonationDate),
    [lastDonationDate],
  );

  const livesHelped = donations.length * LIVES_PER_DONATION;
  const firstName = profile.name.split(' ')[0] || 'Donante';

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing.xxxl }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={gradients.hero}
          style={[styles.header, { paddingTop: insets.top + spacing.md }]}
        >
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.greeting}>Hola, {firstName} 👋</Text>
              <Text style={styles.greetingSub}>Gracias por salvar vidas</Text>
            </View>
            <View style={styles.bloodBadge}>
              {profile.bloodType ? (
                <Text style={styles.bloodBadgeText}>{profile.bloodType}</Text>
              ) : (
                <Ionicons name="help" size={20} color="#fff" />
              )}
            </View>
          </View>

          <Card style={styles.eligCard}>
            <View style={styles.eligLeft}>
              <View
                style={[
                  styles.pill,
                  { backgroundColor: eligibility.eligible ? colors.successSoft : colors.warningSoft },
                ]}
              >
                <Ionicons
                  name={eligibility.eligible ? 'checkmark-circle' : 'time'}
                  size={13}
                  color={eligibility.eligible ? colors.success : '#B45309'}
                />
                <Text
                  style={[
                    styles.pillText,
                    { color: eligibility.eligible ? colors.success : '#B45309' },
                  ]}
                >
                  {eligibility.eligible ? 'Puedes donar' : 'En recuperación'}
                </Text>
              </View>
              <Text style={styles.eligTitle}>
                {eligibility.eligible
                  ? '¡Estás listo para donar!'
                  : `Podrás donar en ${eligibility.daysRemaining} días`}
              </Text>
              <Text style={styles.eligSub}>
                {eligibility.eligible
                  ? donations.length === 0
                    ? 'Aún no registras donaciones. Da el primer paso.'
                    : 'Tu cuerpo ya se recuperó (pasaron 2 meses).'
                  : 'Sangre completa: se dona cada 2 meses.'}
              </Text>
              <Pressable style={styles.eligBtn} onPress={() => router.push('/(tabs)/centers')}>
                <Text style={styles.eligBtnText}>Ver centros para donar</Text>
                <Ionicons name="arrow-forward" size={15} color={colors.primary} />
              </Pressable>
            </View>
            <ProgressRing
              size={104}
              strokeWidth={10}
              progress={eligibility.eligible ? 1 : eligibility.progress}
              color={eligibility.eligible ? colors.success : colors.primary}
              centerTop={eligibility.eligible ? '✓' : String(eligibility.daysRemaining)}
              centerBottom={eligibility.eligible ? 'listo' : 'días'}
            />
          </Card>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.statsRow}>
            <StatTile icon="water" value={donations.length} label="Donaciones" tint={colors.primary} />
            <StatTile icon="heart" value={livesHelped} label="Vidas ayudadas" tint={colors.success} />
            <StatTile icon="location" value={CENTERS.length} label="Centros" tint={colors.secondary} />
          </View>

          <SectionHeader
            title="Dónde donar en Jalisco"
            action="Ver todos"
            onAction={() => router.push('/(tabs)/centers')}
          />
          <View style={{ gap: spacing.md }}>
            {CENTERS.slice(0, 2).map((c) => (
              <CenterCard key={c.id} center={c} onPress={() => router.push(`/center/${c.id}`)} />
            ))}
          </View>

          <Pressable
            onPress={() => Linking.openURL(REAL_CASES_URL).catch(() => {})}
            style={{ marginTop: spacing.lg }}
          >
            <Card style={styles.realCard}>
              <Ionicons name="information-circle" size={22} color="#0C8177" />
              <View style={{ flex: 1 }}>
                <Text style={styles.realTitle}>¿Buscas casos reales de pacientes?</Text>
                <Text style={styles.realSub}>
                  Las solicitudes deben venir de instituciones verificadas. Plataformas como
                  Blooders y los bancos de sangre publican necesidades reales.
                </Text>
                <Text style={styles.realLink}>Conocer Blooders →</Text>
              </View>
            </Card>
          </Pressable>

          <SectionHeader title="Antes de donar" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: spacing.md, paddingRight: spacing.lg }}
          >
            {PRE_TIPS.map((t) => (
              <Card key={t.id} style={styles.tipCard}>
                <View style={styles.tipIcon}>
                  <Ionicons name={t.icon as any} size={20} color={colors.primary} />
                </View>
                <Text style={styles.tipTitle}>{t.title}</Text>
                <Text style={styles.tipBody}>{t.body}</Text>
              </Card>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 64,
    borderBottomLeftRadius: radius.xxl,
    borderBottomRightRadius: radius.xxl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: { color: '#fff', fontSize: 23, fontWeight: '800', letterSpacing: -0.4 },
  greetingSub: { color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 2 },
  bloodBadge: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bloodBadgeText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  eligCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
    marginBottom: -52,
  },
  eligLeft: { flex: 1, gap: spacing.xs },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  pillText: { fontSize: 11.5, fontWeight: '700' },
  eligTitle: { fontSize: 17, fontWeight: '800', color: colors.text, marginTop: 4 },
  eligSub: { fontSize: 12.5, color: colors.textSecondary, lineHeight: 17 },
  eligBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.sm },
  eligBtnText: { color: colors.primary, fontWeight: '700', fontSize: 13.5 },
  body: { paddingHorizontal: spacing.xl, paddingTop: 64 },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  realCard: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
    backgroundColor: colors.secondarySoft,
    borderColor: '#B7ECE6',
  },
  realTitle: { fontSize: 14, fontWeight: '800', color: '#0A6E65' },
  realSub: { fontSize: 12.5, color: '#0C8177', lineHeight: 18, marginTop: 2 },
  realLink: { fontSize: 12.5, color: '#0C8177', fontWeight: '800', marginTop: 6 },
  tipCard: { width: 210, gap: spacing.sm },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipTitle: { fontSize: 15, fontWeight: '700', color: colors.text },
  tipBody: { fontSize: 12.5, color: colors.textSecondary, lineHeight: 18 },
});
