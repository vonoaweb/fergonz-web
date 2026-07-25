import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDonor } from '@/context/DonorContext';
import { CENTERS } from '@/data';
import { colors, radius, spacing } from '@/theme';

const SLOTS = ['08:30', '10:00', '11:30', '13:00', '16:00', '17:30'];
const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function nextDays(count: number): Date[] {
  const out: Date[] = [];
  const base = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push(d);
  }
  return out;
}

export function ScheduleSheet({
  visible,
  onClose,
  requestId,
  centerId,
  onScheduled,
}: {
  visible: boolean;
  onClose: () => void;
  requestId?: string;
  centerId?: string;
  onScheduled?: () => void;
}) {
  const insets = useSafeAreaInsets();
  const { scheduleAppointment } = useDonor();

  const days = useMemo(() => nextDays(10), []);
  const [selectedCenter, setSelectedCenter] = useState<string>(centerId ?? CENTERS[0].id);
  const [dayIndex, setDayIndex] = useState(1);
  const [slot, setSlot] = useState<string>(SLOTS[1]);
  const [saving, setSaving] = useState(false);

  const center = CENTERS.find((c) => c.id === selectedCenter) ?? CENTERS[0];
  const lockCenter = !!centerId;

  const confirm = async () => {
    setSaving(true);
    const day = days[dayIndex];
    const [h, m] = slot.split(':').map(Number);
    const when = new Date(day);
    when.setHours(h, m, 0, 0);
    await scheduleAppointment({
      centerId: center.id,
      centerName: center.name,
      requestId,
      date: when.toISOString(),
    });
    setSaving(false);
    Alert.alert(
      '¡Cita agendada! 🎉',
      `Te esperamos el ${WEEKDAYS[day.getDay()]} ${day.getDate()} de ${MONTHS[day.getMonth()]} a las ${slot} en ${center.name}.\n\nRecuerda hidratarte y comer antes de donar.`,
      [{ text: 'Listo', onPress: onScheduled }],
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
          <View style={styles.handle} />
          <Text style={styles.title}>Agendar donación</Text>
          <Text style={styles.subtitle}>Elige centro, día y horario disponibles.</Text>

          <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420 }}>
            {!lockCenter && (
              <>
                <Text style={styles.label}>Centro</Text>
                {CENTERS.map((c) => {
                  const active = c.id === selectedCenter;
                  return (
                    <Pressable
                      key={c.id}
                      onPress={() => setSelectedCenter(c.id)}
                      style={[styles.centerRow, active && styles.centerRowActive]}
                    >
                      <Ionicons
                        name={active ? 'radio-button-on' : 'radio-button-off'}
                        size={20}
                        color={active ? colors.primary : colors.textMuted}
                      />
                      <View style={{ flex: 1 }}>
                        <Text style={styles.centerName}>{c.name}</Text>
                        <Text style={styles.centerMeta}>
                          {c.distanceKm} km · ~{c.waitMinutes} min de espera
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </>
            )}

            <Text style={styles.label}>Día</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: spacing.sm }}
            >
              {days.map((d, i) => {
                const active = i === dayIndex;
                return (
                  <Pressable
                    key={i}
                    onPress={() => setDayIndex(i)}
                    style={[styles.day, active && styles.dayActive]}
                  >
                    <Text style={[styles.dayName, active && styles.dayTextActive]}>
                      {i === 0 ? 'Hoy' : WEEKDAYS[d.getDay()]}
                    </Text>
                    <Text style={[styles.dayNum, active && styles.dayTextActive]}>
                      {d.getDate()}
                    </Text>
                    <Text style={[styles.dayMon, active && styles.dayTextActive]}>
                      {MONTHS[d.getMonth()]}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <Text style={styles.label}>Horario</Text>
            <View style={styles.slots}>
              {SLOTS.map((s) => {
                const active = s === slot;
                return (
                  <Pressable
                    key={s}
                    onPress={() => setSlot(s)}
                    style={[styles.slot, active && styles.slotActive]}
                  >
                    <Text style={[styles.slotText, active && styles.slotTextActive]}>
                      {s}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          <Pressable
            style={[styles.confirm, saving && { opacity: 0.6 }]}
            onPress={confirm}
            disabled={saving}
          >
            <Ionicons name="calendar" size={18} color="#fff" />
            <Text style={styles.confirmText}>
              {saving ? 'Agendando...' : 'Confirmar cita'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.overlay },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    padding: spacing.xl,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  title: { fontSize: 20, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 13.5, color: colors.textSecondary, marginTop: 2, marginBottom: spacing.sm },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  centerRowActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  centerName: { fontSize: 14.5, fontWeight: '700', color: colors.text },
  centerMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 1 },
  day: {
    width: 62,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    gap: 1,
  },
  dayActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dayName: { fontSize: 12, fontWeight: '700', color: colors.textSecondary },
  dayNum: { fontSize: 20, fontWeight: '800', color: colors.text },
  dayMon: { fontSize: 11, color: colors.textMuted, fontWeight: '600' },
  dayTextActive: { color: '#fff' },
  slots: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  slot: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  slotActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  slotText: { fontSize: 14, fontWeight: '700', color: colors.text },
  slotTextActive: { color: '#fff' },
  confirm: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: radius.pill,
  },
  confirmText: { color: '#fff', fontWeight: '800', fontSize: 15.5 },
});
