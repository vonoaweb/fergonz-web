import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CenterCard } from '@/components/CenterCard';
import { ProgressRing } from '@/components/ProgressRing';
import { Card, Divider, SectionHeader, StatTile } from '@/components/ui';
import { useDonor } from '@/context/DonorContext';
import { ALERT_LINKS, CENTERS, PRE_TIPS } from '@/data';
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

          <Pressable onPress={() => router.push('/request-new')} style={{ marginTop: spacing.lg }}>
            <LinearGradient colors={gradients.primary} style={styles.needCard}>
              <Ionicons name="heart" size={26} color="#fff" />
              <View style={{ flex: 1 }}>
                <Text style={styles.needTitle}>¿Un conocido necesita sangre?</Text>
                <Text style={styles.needSub}>
                  Crea una solicitud y compártela con tus contactos.
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </LinearGradient>
          </Pressable>

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

          <SectionHeader title="Alertas y campañas" />
          <Card style={styles.alertCard}>
            <Text style={styles.alertIntro}>
              La necesidad de sangre es real y constante. Los casos de pacientes se consultan
              en fuentes verificadas y en vivo, no en esta app:
            </Text>
            {ALERT_LINKS.map((a, i) => {
              const tint =
                a.tint === 'primary'
                  ? colors.primary
                  : a.tint === 'info'
                    ? colors.info
                    : colors.secondary;
              return (
                <View key={a.url}>
                  {i > 0 && <Divider />}
                  <Pressable
                    style={styles.linkRow}
                    onPress={() => Linking.openURL(a.url).catch(() => {})}
                  >
                    <View style={[styles.linkIcon, { backgroundColor: tint + '1c' }]}>
                      <Ionicons name={a.icon as any} size={20} color={tint} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.linkTitle}>{a.title}</Text>
                      <Text style={styles.linkSub}>{a.sub}</Text>
                    </View>
                    <Ionicons name="open-outline" size={16} color={colors.textMuted} />
                  </Pressable>
                </View>
              );
            })}
          </Card>

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
  needCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  needTitle: { color: '#fff', fontSize: 15, fontWeight: '800' },
  needSub: { color: 'rgba(255,255,255,0.92)', fontSize: 12.5, marginTop: 2 },
  alertCard: { paddingVertical: spacing.xs },
  alertIntro: {
    fontSize: 12.5,
    color: colors.textSecondary,
    lineHeight: 18,
    paddingVertical: spacing.sm,
  },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  linkIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkTitle: { fontSize: 14, fontWeight: '800', color: colors.text },
  linkSub: { fontSize: 12, color: colors.textSecondary, marginTop: 1 },
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
