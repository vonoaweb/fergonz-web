import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Card } from '@/components/ui';
import { useDonor } from '@/context/DonorContext';
import { colors, gradients, radius, spacing } from '@/theme';
import { BLOOD_TYPES, BloodType, RECEIVE_FROM } from '@/utils/blood';

export default function RequestNew() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { profile } = useDonor();

  const [alias, setAlias] = useState('');
  const [type, setType] = useState<BloodType>('A-');
  const [hospital, setHospital] = useState('');
  const [units, setUnits] = useState('');
  const [contact, setContact] = useState('');

  const message = useMemo(() => {
    const comp = RECEIVE_FROM[type].join(' o ');
    const who = alias.trim() || 'un paciente';
    return (
      `🩸 SE BUSCAN DONADORES DE SANGRE\n\n` +
      `Paciente: ${who}\n` +
      `Tipo requerido: ${type}\n` +
      `Compatibles para donar: ${comp}\n` +
      `Hospital: ${hospital.trim() || '(hospital por confirmar)'}\n` +
      (units.trim() ? `Unidades: ${units.trim()}\n` : '') +
      `\nRequisitos del donador: 18 a 65 años, +50 kg, buena salud, 4 h de ayuno ` +
      `(última comida ligera, sin grasas), identificación oficial.\n` +
      `Al llegar, indica que donas para: ${who}.\n` +
      (contact.trim() ? `\nContacto: ${contact.trim()}\n` : '') +
      `\nGracias por compartir. 🙏 Una donación puede salvar hasta 3 vidas.`
    );
  }, [alias, type, hospital, units, contact]);

  const shareWhatsApp = async () => {
    const wa = `whatsapp://send?text=${encodeURIComponent(message)}`;
    const web = `https://wa.me/?text=${encodeURIComponent(message)}`;
    try {
      const ok = await Linking.canOpenURL(wa);
      await Linking.openURL(ok ? wa : web);
    } catch {
      Linking.openURL(web).catch(() => {});
    }
  };

  const shareOther = () => {
    Share.share({ message }).catch(() => {});
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: spacing.xxxl }}
          keyboardShouldPersistTaps="handled"
        >
          <LinearGradient
            colors={gradients.hero}
            style={[styles.header, { paddingTop: insets.top + spacing.sm }]}
          >
            <Pressable onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </Pressable>
            <Text style={styles.title}>Solicitar donadores</Text>
            <Text style={styles.sub}>
              Llena los datos y comparte el mensaje con tus contactos. La app no publica nada
              por su cuenta: tú decides con quién compartirlo.
            </Text>
          </LinearGradient>

          <View style={styles.body}>
            <Field label="Nombre o alias del paciente">
              <TextInput
                value={alias}
                onChangeText={setAlias}
                placeholder="Ej. Mi tío Luis"
                placeholderTextColor={colors.textMuted}
                style={styles.input}
              />
            </Field>

            <View style={styles.field}>
              <Text style={styles.label}>Tipo de sangre que necesita</Text>
              <View style={styles.typeGrid}>
                {BLOOD_TYPES.map((t) => {
                  const active = t === type;
                  return (
                    <Pressable
                      key={t}
                      onPress={() => setType(t)}
                      style={[styles.typeCell, active && styles.typeCellActive]}
                    >
                      <Text style={[styles.typeText, active && { color: '#fff' }]}>{t}</Text>
                    </Pressable>
                  );
                })}
              </View>
              <Text style={styles.compNote}>
                Compatibles para donar a <Text style={styles.bold}>{type}</Text>:{' '}
                <Text style={styles.bold}>{RECEIVE_FROM[type].join(' o ')}</Text>. Para
                reposición muchos bancos aceptan cualquier tipo.
              </Text>
            </View>

            <Field label="Hospital y ciudad">
              <TextInput
                value={hospital}
                onChangeText={setHospital}
                placeholder="Ej. Hospital Civil, Guadalajara"
                placeholderTextColor={colors.textMuted}
                style={styles.input}
              />
            </Field>

            <Field label="Unidades que se necesitan">
              <TextInput
                value={units}
                onChangeText={setUnits}
                placeholder="Ej. 3"
                keyboardType="number-pad"
                placeholderTextColor={colors.textMuted}
                style={styles.input}
              />
            </Field>

            <Field label="Contacto (WhatsApp / teléfono)">
              <TextInput
                value={contact}
                onChangeText={setContact}
                placeholder="A quién avisar"
                placeholderTextColor={colors.textMuted}
                style={styles.input}
              />
            </Field>

            <Card style={styles.preview}>
              <Text style={styles.previewLabel}>Vista previa</Text>
              <Text style={styles.previewText}>{message}</Text>
            </Card>

            <Button
              label="Compartir por WhatsApp"
              icon="logo-whatsapp"
              onPress={shareWhatsApp}
              variant="danger"
              style={{ marginTop: spacing.lg }}
            />
            <Button
              label="Compartir de otra forma"
              icon="share-social"
              variant="secondary"
              onPress={shareOther}
              style={{ marginTop: spacing.sm }}
            />

            <Text style={styles.disclaimer}>
              Coordina siempre con el banco de sangre del hospital y comparte solo con
              personas de confianza. Cuida los datos personales del paciente.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
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
  title: { color: '#fff', fontSize: 23, fontWeight: '800', marginTop: spacing.md },
  sub: { color: 'rgba(255,255,255,0.9)', fontSize: 13, marginTop: 5, lineHeight: 19 },
  body: { padding: spacing.xl, gap: spacing.lg },
  field: { gap: spacing.sm },
  label: { fontSize: 13, fontWeight: '800', color: colors.textSecondary },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    fontSize: 16,
    color: colors.text,
  },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  typeCell: {
    width: '22%',
    aspectRatio: 1.5,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeCellActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  typeText: { fontSize: 17, fontWeight: '800', color: colors.text },
  compNote: { fontSize: 12.5, color: colors.textSecondary, lineHeight: 18, marginTop: 4 },
  bold: { fontWeight: '800', color: colors.text },
  preview: { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
  previewLabel: { fontSize: 14, fontWeight: '800', color: colors.text, marginBottom: spacing.sm },
  previewText: { fontSize: 13, color: colors.text, lineHeight: 20 },
  disclaimer: {
    fontSize: 12.5,
    color: colors.textSecondary,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});
