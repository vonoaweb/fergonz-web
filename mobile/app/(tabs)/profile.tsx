import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BloodDrop } from '@/components/BloodDrop';
import { Button } from '@/components/Button';
import { Card, Divider, SectionHeader, Tag } from '@/components/ui';
import { useDonor } from '@/context/DonorContext';
import { ACHIEVEMENTS, FAQ } from '@/data';
import { colors, gradients, radius, spacing } from '@/theme';
import {
  BLOOD_TYPES,
  BloodType,
  DONATE_TO,
  isUniversalDonor,
  isUniversalRecipient,
  POPULATION_SHARE,
  RECEIVE_FROM,
} from '@/utils/blood';
import { formatDate, LIVES_PER_DONATION } from '@/utils/eligibility';

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { profile, donations, updateProfile, reset } = useDonor();
  const [editing, setEditing] = useState(false);
  const [showFaq, setShowFaq] = useState(false);

  const livesHelped = donations.length * LIVES_PER_DONATION;

  const confirmReset = () => {
    Alert.alert(
      'Restablecer datos',
      'Se borrará tu perfil, historial y citas de este dispositivo. ¿Continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Borrar', style: 'destructive', onPress: () => reset() },
      ],
    );
  };

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing.xxxl }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={gradients.hero}
          style={[styles.header, { paddingTop: insets.top + spacing.lg }]}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(profile.name.trim()[0] || 'D').toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{profile.name || 'Donante'}</Text>
          <Text style={styles.sub}>
            {profile.city ? `${profile.city} · ` : ''}
            Donante altruista
          </Text>
          <View style={styles.headerTags}>
            <View style={styles.headerTag}>
              <BloodDrop size={16} color="#fff" glossy={false} />
              <Text style={styles.headerTagText}>
                {profile.bloodType ?? 'Tipo desconocido'}
              </Text>
            </View>
            <Pressable style={styles.editBtn} onPress={() => setEditing(true)}>
              <Ionicons name="create-outline" size={15} color="#fff" />
              <Text style={styles.editText}>Editar</Text>
            </Pressable>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {/* Impact summary */}
          <Card style={styles.impact}>
            <ImpactItem value={donations.length} label="Donaciones" />
            <Divider style={styles.vDivider} />
            <ImpactItem value={livesHelped} label="Vidas ayudadas" tint={colors.success} />
            <Divider style={styles.vDivider} />
            <ImpactItem
              value={profile.bloodType ? `${POPULATION_SHARE[profile.bloodType]}%` : '—'}
              label="De la población"
              tint={colors.info}
            />
          </Card>

          {/* Compatibility */}
          {profile.bloodType && (
            <>
              <SectionHeader title="Tu compatibilidad" />
              <Card style={{ gap: spacing.lg }}>
                {isUniversalDonor(profile.bloodType) && (
                  <Tag label="Donante universal 🌍" tone="success" icon="ribbon" />
                )}
                {isUniversalRecipient(profile.bloodType) && (
                  <Tag label="Receptor universal" tone="info" icon="shield-checkmark" />
                )}
                <CompatRow
                  title="Puedes DONAR a"
                  icon="arrow-up-circle"
                  tint={colors.primary}
                  types={DONATE_TO[profile.bloodType]}
                  mine={profile.bloodType}
                />
                <Divider />
                <CompatRow
                  title="Puedes RECIBIR de"
                  icon="arrow-down-circle"
                  tint={colors.info}
                  types={RECEIVE_FROM[profile.bloodType]}
                  mine={profile.bloodType}
                />
              </Card>
            </>
          )}

          {/* Achievements */}
          <SectionHeader title="Logros" />
          <View style={styles.badges}>
            {ACHIEVEMENTS.map((a) => {
              const unlocked = donations.length >= a.threshold;
              return (
                <Card
                  key={a.id}
                  style={[styles.badge, !unlocked && styles.badgeLocked]}
                >
                  <View
                    style={[
                      styles.badgeIcon,
                      { backgroundColor: unlocked ? colors.primarySoft : colors.surfaceAlt },
                    ]}
                  >
                    <Ionicons
                      name={a.icon as any}
                      size={22}
                      color={unlocked ? colors.primary : colors.textMuted}
                    />
                  </View>
                  <Text style={[styles.badgeTitle, !unlocked && styles.mutedText]}>
                    {a.title}
                  </Text>
                  <Text style={styles.badgeDesc}>{a.description}</Text>
                  {!unlocked && (
                    <Ionicons
                      name="lock-closed"
                      size={12}
                      color={colors.textMuted}
                      style={styles.lock}
                    />
                  )}
                </Card>
              );
            })}
          </View>

          {/* History */}
          <SectionHeader title="Historial de donaciones" />
          {donations.length === 0 ? (
            <Card style={styles.emptyHistory}>
              <Ionicons name="water-outline" size={28} color={colors.textMuted} />
              <Text style={styles.emptyHistoryText}>
                Aún no registras donaciones. Cuando dones, aparecerán aquí con tu impacto.
              </Text>
            </Card>
          ) : (
            <Card style={{ gap: 0 }}>
              {donations.map((d, i) => (
                <View key={d.id}>
                  {i > 0 && <Divider />}
                  <View style={styles.historyRow}>
                    <View style={styles.historyIcon}>
                      <BloodDrop size={20} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.historyCenter}>{d.center}</Text>
                      <Text style={styles.historyDate}>
                        {formatDate(new Date(d.date))}
                      </Text>
                    </View>
                    <Tag label={`+${LIVES_PER_DONATION} vidas`} tone="success" />
                  </View>
                </View>
              ))}
            </Card>
          )}

          {/* Settings */}
          <SectionHeader title="Ajustes" />
          <Card style={{ gap: 0 }}>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Ionicons name="notifications-outline" size={20} color={colors.text} />
                <View>
                  <Text style={styles.settingLabel}>Alertas de urgencias</Text>
                  <Text style={styles.settingSub}>Avísame de solicitudes compatibles</Text>
                </View>
              </View>
              <Switch
                value={profile.notificationsEnabled}
                onValueChange={(v) => updateProfile({ notificationsEnabled: v })}
                trackColor={{ true: colors.primary, false: colors.border }}
                thumbColor="#fff"
              />
            </View>
            <Divider />
            <Pressable style={styles.settingRow} onPress={() => setShowFaq(true)}>
              <View style={styles.settingLeft}>
                <Ionicons name="help-circle-outline" size={20} color={colors.text} />
                <Text style={styles.settingLabel}>Preguntas frecuentes</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>
            <Divider />
            <Pressable style={styles.settingRow} onPress={confirmReset}>
              <View style={styles.settingLeft}>
                <Ionicons name="trash-outline" size={20} color={colors.urgent} />
                <Text style={[styles.settingLabel, { color: colors.urgent }]}>
                  Restablecer datos
                </Text>
              </View>
            </Pressable>
          </Card>

          <Text style={styles.footerNote}>
            VidaLink · Donación de sangre altruista{'\n'}
            Tus datos se guardan solo en tu dispositivo.
          </Text>
        </View>
      </ScrollView>

      <EditModal
        visible={editing}
        onClose={() => setEditing(false)}
        initial={profile}
        onSave={(patch) => {
          updateProfile(patch);
          setEditing(false);
        }}
      />
      <FaqModal visible={showFaq} onClose={() => setShowFaq(false)} />
    </View>
  );
}

function ImpactItem({
  value,
  label,
  tint = colors.primary,
}: {
  value: string | number;
  label: string;
  tint?: string;
}) {
  return (
    <View style={styles.impactItem}>
      <Text style={[styles.impactValue, { color: tint }]}>{value}</Text>
      <Text style={styles.impactLabel}>{label}</Text>
    </View>
  );
}

function CompatRow({
  title,
  icon,
  tint,
  types,
  mine,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  tint: string;
  types: BloodType[];
  mine: BloodType;
}) {
  return (
    <View style={{ gap: spacing.sm }}>
      <View style={styles.compatHead}>
        <Ionicons name={icon} size={16} color={tint} />
        <Text style={styles.compatTitle}>{title}</Text>
        <Text style={styles.compatCount}>{types.length} tipos</Text>
      </View>
      <View style={styles.compatChips}>
        {BLOOD_TYPES.map((t) => {
          const active = types.includes(t);
          const isMine = t === mine;
          return (
            <View
              key={t}
              style={[
                styles.compatChip,
                active && { backgroundColor: tint + '18', borderColor: tint },
                isMine && { borderWidth: 2 },
              ]}
            >
              <Text
                style={[
                  styles.compatChipText,
                  { color: active ? tint : colors.textMuted },
                ]}
              >
                {t}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function EditModal({
  visible,
  onClose,
  initial,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  initial: { name: string; city: string; bloodType: BloodType | null };
  onSave: (patch: { name: string; city: string; bloodType: BloodType | null }) => void;
}) {
  const [name, setName] = useState(initial.name);
  const [city, setCity] = useState(initial.city);
  const [bloodType, setBloodType] = useState<BloodType | null>(initial.bloodType);

  // Reset local state when reopened.
  React.useEffect(() => {
    if (visible) {
      setName(initial.name);
      setCity(initial.city);
      setBloodType(initial.bloodType);
    }
  }, [visible, initial]);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />
        <View style={styles.modalSheet}>
          <View style={styles.sheetHandle} />
          <Text style={styles.modalTitle}>Editar perfil</Text>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Text style={styles.modalLabel}>Nombre</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.modalInput}
              placeholder="Tu nombre"
              placeholderTextColor={colors.textMuted}
            />
            <Text style={styles.modalLabel}>Ciudad o zona</Text>
            <TextInput
              value={city}
              onChangeText={setCity}
              style={styles.modalInput}
              placeholder="Ej. Zona Centro"
              placeholderTextColor={colors.textMuted}
            />
            <Text style={styles.modalLabel}>Tipo de sangre</Text>
            <View style={styles.typeGrid}>
              {BLOOD_TYPES.map((t) => {
                const active = bloodType === t;
                return (
                  <Pressable
                    key={t}
                    onPress={() => setBloodType(active ? null : t)}
                    style={[styles.typeCell, active && styles.typeCellActive]}
                  >
                    <Text style={[styles.typeText, active && { color: '#fff' }]}>
                      {t}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
          <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
            <Button
              label="Guardar cambios"
              icon="checkmark"
              onPress={() => onSave({ name: name.trim() || 'Donante', city: city.trim(), bloodType })}
            />
            <Button label="Cancelar" variant="secondary" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

function FaqModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />
        <View style={styles.modalSheet}>
          <View style={styles.sheetHandle} />
          <Text style={styles.modalTitle}>Preguntas frecuentes</Text>
          <ScrollView>
            {FAQ.map((f, i) => (
              <View key={i} style={styles.faqItem}>
                <Text style={styles.faqQ}>{f.q}</Text>
                <Text style={styles.faqA}>{f.a}</Text>
              </View>
            ))}
          </ScrollView>
          <Button label="Entendido" onPress={onClose} style={{ marginTop: spacing.md }} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: radius.xxl,
    borderBottomRightRadius: radius.xxl,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 30, fontWeight: '800' },
  name: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: spacing.md },
  sub: { color: 'rgba(255,255,255,0.85)', fontSize: 13.5, marginTop: 2 },
  headerTags: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  headerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  headerTagText: { color: '#fff', fontWeight: '700', fontSize: 13.5 },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  editText: { color: '#fff', fontWeight: '700', fontSize: 13.5 },
  body: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg },
  impact: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.lg },
  impactItem: { flex: 1, alignItems: 'center', gap: 2 },
  impactValue: { fontSize: 22, fontWeight: '800' },
  impactLabel: { fontSize: 11.5, color: colors.textSecondary, fontWeight: '600' },
  vDivider: { width: 1, height: 36, marginVertical: 0, marginHorizontal: 0 },
  compatHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  compatTitle: { fontSize: 13, fontWeight: '800', color: colors.text, flex: 1 },
  compatCount: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  compatChips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  compatChip: {
    width: 42,
    height: 34,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compatChipText: { fontSize: 13, fontWeight: '800' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  badge: { width: '47.5%', gap: 4, position: 'relative' },
  badgeLocked: { opacity: 0.7 },
  badgeIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  badgeTitle: { fontSize: 14.5, fontWeight: '700', color: colors.text },
  badgeDesc: { fontSize: 12, color: colors.textSecondary, lineHeight: 16 },
  mutedText: { color: colors.textSecondary },
  lock: { position: 'absolute', top: spacing.lg, right: spacing.lg },
  emptyHistory: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl },
  emptyHistoryText: {
    fontSize: 13.5,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyCenter: { fontSize: 14.5, fontWeight: '700', color: colors.text },
  historyDate: { fontSize: 12.5, color: colors.textSecondary, marginTop: 1 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
  settingLabel: { fontSize: 14.5, fontWeight: '600', color: colors.text },
  settingSub: { fontSize: 12, color: colors.textSecondary, marginTop: 1 },
  footerNote: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xxl,
    lineHeight: 18,
  },
  // Modals
  modalRoot: { flex: 1, justifyContent: 'flex-end' },
  modalBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.overlay },
  modalSheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    padding: spacing.xl,
    maxHeight: '85%',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: spacing.lg },
  modalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  modalInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  typeCell: {
    width: '22%',
    aspectRatio: 1.4,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeCellActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  typeText: { fontSize: 17, fontWeight: '800', color: colors.text },
  faqItem: { marginBottom: spacing.lg, gap: 4 },
  faqQ: { fontSize: 15, fontWeight: '700', color: colors.text },
  faqA: { fontSize: 13.5, color: colors.textSecondary, lineHeight: 20 },
});
