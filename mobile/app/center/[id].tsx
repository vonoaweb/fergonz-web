import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { ScheduleSheet } from '@/components/ScheduleSheet';
import { Card, Divider, Tag } from '@/components/ui';
import { useDonor } from '@/context/DonorContext';
import { CENTERS } from '@/data';
import { colors, gradients, radius, spacing } from '@/theme';

const HOURS = [
  ['Lunes – Viernes', '07:00 – 19:00'],
  ['Sábado', '08:00 – 14:00'],
  ['Domingo', 'Cerrado'],
];

export default function CenterDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addDonation } = useDonor();
  const [sheetOpen, setSheetOpen] = useState(false);

  const center = useMemo(() => CENTERS.find((c) => c.id === id), [id]);

  if (!center) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Centro no encontrado.</Text>
        <Button label="Volver" fullWidth={false} onPress={() => router.back()} />
      </View>
    );
  }

  const registerDonation = () => {
    Alert.alert(
      'Registrar donación',
      `¿Confirmas que donaste hoy en ${center.name}? Se sumará a tu impacto.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, doné',
          onPress: async () => {
            await addDonation({ date: new Date().toISOString(), center: center.name });
            Alert.alert(
              '¡Gracias por donar! ❤️',
              'Acabas de ayudar hasta a 3 personas. Tu próxima donación se habilitará en 56 días.',
              [{ text: 'Ver mi impacto', onPress: () => router.replace('/(tabs)/profile') }],
            );
          },
        },
      ],
    );
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <LinearGradient
          colors={gradients.hero}
          style={[styles.header, { paddingTop: insets.top + spacing.sm }]}
        >
          <View style={styles.headerTop}>
            <Pressable onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </Pressable>
            <Tag
              label={center.openNow ? 'Abierto ahora' : 'Cerrado'}
              tone={center.openNow ? 'success' : 'neutral'}
            />
          </View>
          <Text style={styles.name}>{center.name}</Text>
          <Text style={styles.type}>{center.type}</Text>
          <View style={styles.headerStats}>
            <HeaderStat icon="navigate" text={`${center.distanceKm} km`} />
            <HeaderStat icon="star" text={center.rating.toFixed(1)} />
            <HeaderStat icon="hourglass" text={`~${center.waitMinutes} min`} />
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {/* Map placeholder */}
          <Card style={styles.map}>
            <Ionicons name="map-outline" size={30} color={colors.primary} />
            <Text style={styles.mapText}>{center.address}</Text>
            <Pressable
              style={styles.mapBtn}
              onPress={() =>
                Linking.openURL(
                  `https://maps.google.com/?q=${encodeURIComponent(center.address)}`,
                ).catch(() => Alert.alert('Mapa', 'No se pudo abrir el mapa.'))
              }
            >
              <Ionicons name="navigate" size={15} color={colors.primary} />
              <Text style={styles.mapBtnText}>Cómo llegar</Text>
            </Pressable>
          </Card>

          {/* Hours */}
          <Card style={{ gap: spacing.sm }}>
            <Text style={styles.cardTitle}>Horarios</Text>
            {HOURS.map(([d, h], i) => (
              <View key={i}>
                {i > 0 && <Divider style={{ marginVertical: spacing.sm }} />}
                <View style={styles.hourRow}>
                  <Text style={styles.hourDay}>{d}</Text>
                  <Text
                    style={[styles.hourVal, h === 'Cerrado' && { color: colors.textMuted }]}
                  >
                    {h}
                  </Text>
                </View>
              </View>
            ))}
          </Card>

          {/* Info */}
          <Card style={{ gap: spacing.md }}>
            <Text style={styles.cardTitle}>Información</Text>
            <Info
              icon={center.acceptsWalkIns ? 'walk' : 'calendar'}
              text={
                center.acceptsWalkIns
                  ? 'Acepta donantes sin cita (walk-in)'
                  : 'Solo con cita previa'
              }
            />
            <Info icon="call" text={center.phone} />
            <Info icon="water" text="Sangre completa, plaquetas y plasma" />
            <Info icon="card" text="Lleva identificación oficial con foto" />
          </Card>

          <Card style={styles.reqCard}>
            <Ionicons name="shield-checkmark" size={20} color={colors.success} />
            <Text style={styles.reqText}>
              Requisitos generales: 18–65 años, más de 50 kg, buena salud y haber comido.
              El personal confirma tu elegibilidad al llegar.
            </Text>
          </Card>
        </View>
      </ScrollView>

      <View style={[styles.cta, { paddingBottom: insets.bottom + spacing.md }]}>
        <Pressable style={styles.callBtn} onPress={() => Linking.openURL(`tel:${center.phone}`)}>
          <Ionicons name="call" size={22} color={colors.primary} />
        </Pressable>
        <View style={{ flex: 1, gap: spacing.sm }}>
          <Button label="Agendar cita" icon="calendar" onPress={() => setSheetOpen(true)} />
        </View>
      </View>

      <ScheduleSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        centerId={center.id}
        onScheduled={() => {
          setSheetOpen(false);
          registerDonation();
        }}
      />
    </View>
  );
}

function HeaderStat({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  return (
    <View style={styles.hStat}>
      <Ionicons name={icon} size={15} color="#fff" />
      <Text style={styles.hStatText}>{text}</Text>
    </View>
  );
}

function Info({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  return (
    <View style={styles.info}>
      <Ionicons name={icon} size={18} color={colors.primary} />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg },
  notFoundText: { fontSize: 16, color: colors.textSecondary },
  header: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius.xxl,
    borderBottomRightRadius: radius.xxl,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { color: '#fff', fontSize: 24, fontWeight: '800', marginTop: spacing.md },
  type: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 2 },
  headerStats: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.lg },
  hStat: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  hStatText: { color: '#fff', fontWeight: '700', fontSize: 13.5 },
  body: { padding: spacing.xl, gap: spacing.md },
  map: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl },
  mapText: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
  mapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    marginTop: spacing.xs,
  },
  mapBtnText: { color: colors.primary, fontWeight: '700', fontSize: 13.5 },
  cardTitle: { fontSize: 15.5, fontWeight: '800', color: colors.text, marginBottom: spacing.xs },
  hourRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hourDay: { fontSize: 14, color: colors.text, fontWeight: '500' },
  hourVal: { fontSize: 14, color: colors.text, fontWeight: '700' },
  info: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  infoText: { fontSize: 14, color: colors.text, fontWeight: '500', flex: 1 },
  reqCard: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.successSoft,
    borderColor: '#BBF7D0',
  },
  reqText: { flex: 1, fontSize: 13, color: '#166534', fontWeight: '600', lineHeight: 18 },
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
  callBtn: {
    width: 54,
    height: 54,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
