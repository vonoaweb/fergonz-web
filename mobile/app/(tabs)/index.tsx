import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BloodDrop } from '@/components/BloodDrop';
import { ProgressRing } from '@/components/ProgressRing';
import { RequestCard } from '@/components/RequestCard';
import { Card, SectionHeader, StatTile, Tag } from '@/components/ui';
import { useDonor } from '@/context/DonorContext';
import { PRE_TIPS, REQUESTS } from '@/data';
import { colors, gradients, radius, spacing } from '@/theme';
import { DONATE_TO } from '@/utils/blood';
import {
  formatDate,
  getEligibility,
  LIVES_PER_DONATION,
} from '@/utils/eligibility';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { profile, donations, lastDonationDate } = useDonor();

  const eligibility = useMemo(
    () => getEligibility(lastDonationDate),
    [lastDonationDate],
  );

  const compatibleRequests = useMemo(() => {
    if (!profile.bloodType) return REQUESTS.slice(0, 3);
    const can = DONATE_TO[profile.bloodType];
    return REQUESTS.filter((r) => can.includes(r.bloodType)).slice(0, 3);
  }, [profile.bloodType]);

  const livesHelped = donations.length * LIVES_PER_DONATION;
  const firstName = profile.name.split(' ')[0] || 'Donante';

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing.xxxl }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
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

          {/* Eligibility card overlapping header */}
          <Card style={styles.eligCard}>
            <View style={styles.eligLeft}>
              <Tag
                label={eligibility.eligible ? 'Puedes donar' : 'En recuperación'}
                tone={eligibility.eligible ? 'success' : 'warning'}
                icon={eligibility.eligible ? 'checkmark-circle' : 'time'}
              />
              <Text style={styles.eligTitle}>
                {eligibility.eligible
                  ? '¡Estás listo para donar!'
                  : `Podrás donar en ${eligibility.daysRemaining} días`}
              </Text>
              <Text style={styles.eligSub}>
                {eligibility.eligible
                  ? donations.length === 0
                    ? 'Aún no registras donaciones. Da el primer paso.'
                    : 'Tu cuerpo ya se recuperó. Encuentra una solicitud.'
                  : `Próxima fecha: ${formatDate(eligibility.nextDate)}`}
              </Text>
              <Pressable
                style={styles.eligBtn}
                onPress={() => router.push('/(tabs)/requests')}
              >
                <Text style={styles.eligBtnText}>
                  {eligibility.eligible ? 'Buscar dónde donar' : 'Ver solicitudes'}
                </Text>
                <Ionicons name="arrow-forward" size={15} color={colors.primary} />
              </Pressable>
            </View>
            <ProgressRing
              size={104}
              strokeWidth={10}
              progress={eligibility.eligible ? 1 : eligibility.progress}
              color={eligibility.eligible ? colors.success : colors.primary}
              centerTop={
                eligibility.eligible ? '✓' : String(eligibility.daysRemaining)
              }
              centerBottom={eligibility.eligible ? 'listo' : 'días'}
            />
          </Card>
        </LinearGradient>

        <View style={styles.body}>
          {/* Impact stats */}
          <View style={styles.statsRow}>
            <StatTile
              icon="water"
              value={donations.length}
              label="Donaciones"
              tint={colors.primary}
            />
            <StatTile
              icon="heart"
              value={livesHelped}
              label="Vidas ayudadas"
              tint={colors.success}
            />
            <StatTile
              icon="flame"
              value={compatibleRequests.length}
              label="Urgencias cerca"
              tint={colors.warning}
            />
          </View>

          {/* Urgent requests */}
          <SectionHeader
            title="Solicitudes para ti"
            action="Ver todas"
            onAction={() => router.push('/(tabs)/requests')}
          />
          {profile.bloodType && (
            <Text style={styles.compatNote}>
              Compatibles con tu tipo {profile.bloodType}
            </Text>
          )}
          <View style={{ gap: spacing.md }}>
            {compatibleRequests.map((r) => (
              <RequestCard
                key={r.id}
                request={r}
                compatible={!!profile.bloodType}
                onPress={() => router.push(`/request/${r.id}`)}
              />
            ))}
          </View>

          {/* Compatibility shortcut */}
          <Pressable
            onPress={() => router.push('/(tabs)/profile')}
            style={{ marginTop: spacing.xl }}
          >
            <Card style={styles.compatCard}>
              <BloodDrop size={40} />
              <View style={{ flex: 1 }}>
                <Text style={styles.compatTitle}>¿A quién puedes ayudar?</Text>
                <Text style={styles.compatSub}>
                  Descubre la compatibilidad de tu tipo de sangre.
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </Card>
          </Pressable>

          {/* Tips */}
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
  eligTitle: { fontSize: 17, fontWeight: '800', color: colors.text, marginTop: 4 },
  eligSub: { fontSize: 12.5, color: colors.textSecondary, lineHeight: 17 },
  eligBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.sm,
  },
  eligBtnText: { color: colors.primary, fontWeight: '700', fontSize: 13.5 },
  body: { paddingHorizontal: spacing.xl, paddingTop: 64 },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  compatNote: {
    fontSize: 12.5,
    color: colors.textSecondary,
    marginTop: -6,
    marginBottom: spacing.md,
  },
  compatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  compatTitle: { fontSize: 15.5, fontWeight: '700', color: colors.text },
  compatSub: { fontSize: 12.5, color: colors.textSecondary, marginTop: 2 },
  tipCard: { width: 220, gap: spacing.sm },
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
