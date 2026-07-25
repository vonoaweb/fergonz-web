import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { ScheduleSheet } from '@/components/ScheduleSheet';
import { URGENCY_META } from '@/components/RequestCard';
import { Card, Divider, Tag } from '@/components/ui';
import { useDonor } from '@/context/DonorContext';
import { REQUESTS } from '@/data';
import { colors, gradients, radius, spacing } from '@/theme';
import { DONATE_TO } from '@/utils/blood';
import { getEligibility } from '@/utils/eligibility';

export default function RequestDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { profile, lastDonationDate } = useDonor();
  const [sheetOpen, setSheetOpen] = useState(false);

  const request = useMemo(() => REQUESTS.find((r) => r.id === id), [id]);
  const eligibility = getEligibility(lastDonationDate);

  if (!request) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Solicitud no encontrada.</Text>
        <Button label="Volver" fullWidth={false} onPress={() => router.back()} />
      </View>
    );
  }

  const meta = URGENCY_META[request.urgency];
  const compatible = profile.bloodType
    ? DONATE_TO[profile.bloodType].includes(request.bloodType)
    : null;
  const pct = Math.round((request.unitsFulfilled / request.unitsNeeded) * 100);

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <LinearGradient
          colors={request.urgency === 'critical' ? gradients.urgent : gradients.hero}
          style={[styles.header, { paddingTop: insets.top + spacing.sm }]}
        >
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </Pressable>
          <View style={styles.headerCenter}>
            <View style={styles.bigBadge}>
              <Text style={styles.bigBadgeText}>{request.bloodType}</Text>
            </View>
            <Tag
              label={meta.label}
              tone={meta.tone}
              style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
            />
            <Text style={styles.patient}>{request.patientAlias}</Text>
            <Text style={styles.hospital}>{request.hospital}</Text>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {compatible !== null && (
            <Card
              style={[
                styles.compatBanner,
                { backgroundColor: compatible ? colors.successSoft : colors.warningSoft },
              ]}
            >
              <Ionicons
                name={compatible ? 'checkmark-circle' : 'information-circle'}
                size={22}
                color={compatible ? colors.success : colors.warning}
              />
              <Text style={styles.compatBannerText}>
                {compatible
                  ? `Tu tipo ${profile.bloodType} es compatible con esta solicitud.`
                  : `Tu tipo ${profile.bloodType} no es compatible, pero puedes compartir la solicitud.`}
              </Text>
            </Card>
          )}

          {/* Progress */}
          <Card style={{ gap: spacing.md }}>
            <View style={styles.progressHead}>
              <Text style={styles.progressLabel}>Unidades reunidas</Text>
              <Text style={styles.progressValue}>
                {request.unitsFulfilled}/{request.unitsNeeded}
              </Text>
            </View>
            <View style={styles.track}>
              <View
                style={[styles.fill, { width: `${pct}%`, backgroundColor: meta.color }]}
              />
            </View>
            <Text style={styles.progressSub}>
              Faltan {request.unitsNeeded - request.unitsFulfilled} unidades · {pct}% completado
            </Text>
          </Card>

          {/* Details */}
          <Card style={{ gap: spacing.md }}>
            <Detail icon="medkit-outline" label="Motivo" value={request.reason} />
            <Divider />
            <Detail
              icon="location-outline"
              label="Ubicación"
              value={`${request.city} · a ${request.distanceKm} km de ti`}
            />
            <Divider />
            <Detail icon="person-outline" label="Contacto" value={request.contactName} />
            <Divider />
            <Detail
              icon="time-outline"
              label="Publicado"
              value={`Hace ${request.postedHoursAgo} horas`}
            />
          </Card>

          {!eligibility.eligible && (
            <Card style={styles.warnCard}>
              <Ionicons name="time" size={20} color={colors.warning} />
              <Text style={styles.warnText}>
                Podrás donar en {eligibility.daysRemaining} días. Aun así puedes agendar
                para más adelante o compartir esta solicitud.
              </Text>
            </Card>
          )}
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View style={[styles.cta, { paddingBottom: insets.bottom + spacing.md }]}>
        <Pressable
          style={styles.shareBtn}
          onPress={() =>
            Alert.alert('Compartir solicitud', 'Se abriría el menú para compartir esta urgencia con tus contactos.')
          }
        >
          <Ionicons name="share-social-outline" size={22} color={colors.primary} />
        </Pressable>
        <Button
          label="Quiero ayudar"
          icon="heart"
          onPress={() => setSheetOpen(true)}
          variant={request.urgency === 'critical' ? 'danger' : 'primary'}
        />
      </View>

      <ScheduleSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        requestId={request.id}
        onScheduled={() => {
          setSheetOpen(false);
          router.back();
        }}
      />
    </View>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detail}>
      <View style={styles.detailIcon}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg },
  notFoundText: { fontSize: 16, color: colors.textSecondary },
  header: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: radius.xxl,
    borderBottomRightRadius: radius.xxl,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: { alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  bigBadge: {
    width: 76,
    height: 76,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigBadgeText: { color: '#fff', fontSize: 30, fontWeight: '800' },
  patient: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: spacing.xs },
  hospital: { color: 'rgba(255,255,255,0.9)', fontSize: 14 },
  body: { padding: spacing.xl, gap: spacing.md, marginTop: -spacing.md },
  compatBanner: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, borderWidth: 0 },
  compatBannerText: { flex: 1, fontSize: 13.5, color: colors.text, fontWeight: '600', lineHeight: 19 },
  progressHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel: { fontSize: 14, fontWeight: '700', color: colors.text },
  progressValue: { fontSize: 16, fontWeight: '800', color: colors.primary },
  track: { height: 10, borderRadius: radius.pill, backgroundColor: colors.surfaceAlt, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radius.pill },
  progressSub: { fontSize: 12.5, color: colors.textSecondary },
  detail: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  detailIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailLabel: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  detailValue: { fontSize: 14.5, color: colors.text, fontWeight: '500', lineHeight: 20, marginTop: 1 },
  warnCard: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.warningSoft,
    borderColor: '#FDE68A',
  },
  warnText: { flex: 1, fontSize: 13, color: '#92400E', fontWeight: '600', lineHeight: 18 },
  cta: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  shareBtn: {
    width: 54,
    height: 54,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
