import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
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
import { Card, Divider, Tag } from '@/components/ui';
import { useDonor } from '@/context/DonorContext';
import { CENTERS } from '@/data';
import { colors, gradients, radius, spacing } from '@/theme';

export default function CenterDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addDonation } = useDonor();

  const center = useMemo(() => CENTERS.find((c) => c.id === id), [id]);

  if (!center) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Centro no encontrado.</Text>
        <Button label="Volver" fullWidth={false} onPress={() => router.back()} />
      </View>
    );
  }

  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    `${center.name} ${center.address}`,
  )}`;

  const registerDonation = () => {
    Alert.alert(
      'Registrar donación',
      `¿Confirmas que donaste en ${center.name}? Se sumará a tu impacto y actualizará tu elegibilidad.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, doné',
          onPress: async () => {
            await addDonation({ date: new Date().toISOString(), center: center.name });
            Alert.alert(
              '¡Gracias por donar! ❤️',
              'Acabas de ayudar hasta a 3 personas. Tu próxima donación se habilitará en 2 meses.',
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
              label={center.acceptsWalkIns ? 'Recibe sin cita' : 'Requiere cita'}
              tone={center.acceptsWalkIns ? 'success' : 'neutral'}
            />
          </View>
          <Text style={styles.name}>{center.name}</Text>
          <Text style={styles.type}>
            {center.type} · {center.alcaldia}
          </Text>
        </LinearGradient>

        <View style={styles.body}>
          <Card style={styles.map}>
            <Ionicons name="map-outline" size={30} color={colors.primary} />
            <Text style={styles.mapText}>{center.address}</Text>
            <Pressable
              style={styles.mapBtn}
              onPress={() =>
                Linking.openURL(mapsUrl).catch(() =>
                  Alert.alert('Mapa', 'No se pudo abrir el mapa.'),
                )
              }
            >
              <Ionicons name="navigate" size={15} color={colors.primary} />
              <Text style={styles.mapBtnText}>Cómo llegar</Text>
            </Pressable>
          </Card>

          <Card style={{ gap: spacing.md }}>
            <Info icon="time-outline" label="Horario" value={center.hours} />
            <Divider />
            <Info icon="call-outline" label="Teléfono" value={center.phone} />
            <Divider />
            <Info icon="globe-outline" label="Sitio oficial" value={center.site} />
          </Card>

          <Card style={styles.noteCard}>
            <Ionicons name="information-circle" size={20} color={colors.success} />
            <Text style={styles.noteText}>{center.note}</Text>
          </Card>

          <Card style={styles.reqCard}>
            <Ionicons name="shield-checkmark" size={20} color={colors.info} />
            <Text style={styles.reqText}>
              Requisitos: 18–65 años, más de 50 kg, 4 h de ayuno, buena salud e
              identificación oficial. El personal confirma tu elegibilidad al llegar.
            </Text>
          </Card>
        </View>
      </ScrollView>

      <View style={[styles.cta, { paddingBottom: insets.bottom + spacing.md }]}>
        <Pressable
          style={styles.callBtn}
          onPress={() => Linking.openURL(`tel:${center.phone.replace(/\s/g, '')}`)}
        >
          <Ionicons name="call" size={22} color={colors.primary} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Button label="Registrar donación" icon="checkmark" onPress={registerDonation} />
        </View>
      </View>
    </View>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.info}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
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
  name: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: spacing.md, lineHeight: 27 },
  type: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 4 },
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
  info: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  infoValue: { fontSize: 14.5, color: colors.text, fontWeight: '600', marginTop: 1 },
  noteCard: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.successSoft,
    borderColor: '#BBF7D0',
  },
  noteText: { flex: 1, fontSize: 13, color: '#166534', fontWeight: '600', lineHeight: 18 },
  reqCard: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.infoSoft,
    borderColor: '#BFDBFE',
  },
  reqText: { flex: 1, fontSize: 13, color: '#1E40AF', fontWeight: '600', lineHeight: 18 },
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
