import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BloodDrop } from '@/components/BloodDrop';
import { Button } from '@/components/Button';
import { useDonor } from '@/context/DonorContext';
import { colors, gradients, radius, spacing } from '@/theme';
import { BLOOD_TYPES, BloodType, POPULATION_SHARE } from '@/utils/blood';

const STEPS = 3;

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useDonor();

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [bloodType, setBloodType] = useState<BloodType | null>(null);
  const [unknownType, setUnknownType] = useState(false);

  const canContinue =
    step === 0 ||
    (step === 1 && name.trim().length > 1) ||
    (step === 2 && (bloodType !== null || unknownType));

  const finish = async () => {
    await completeOnboarding({
      name: name.trim() || 'Donante',
      city: city.trim(),
      bloodType: unknownType ? null : bloodType,
    });
    router.replace('/(tabs)');
  };

  const next = () => {
    if (step < STEPS - 1) setStep((s) => s + 1);
    else finish();
  };

  return (
    <View style={styles.root}>
      <LinearGradient colors={gradients.hero} style={[styles.hero, { paddingTop: insets.top + spacing.xl }]}>
        <View style={styles.brandRow}>
          <BloodDrop size={30} color="#fff" />
          <Text style={styles.brand}>VidaLink</Text>
        </View>
        <View style={styles.dots}>
          {Array.from({ length: STEPS }).map((_, i) => (
            <View key={i} style={[styles.dot, i <= step && styles.dotActive]} />
          ))}
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {step === 0 && (
            <View style={styles.stepBody}>
              <Text style={styles.title}>Donar sangre salva vidas</Text>
              <Text style={styles.subtitle}>
                Cada donación altruista puede ayudar hasta a 3 personas. Sin costo, sin
                pago: solo el gesto de compartir vida.
              </Text>
              <View style={styles.bullets}>
                <Bullet icon="pulse-outline" text="Conoce cuándo puedes volver a donar" />
                <Bullet icon="notifications-outline" text="Recibe alertas de urgencias compatibles cerca de ti" />
                <Bullet icon="ribbon-outline" text="Sigue tu impacto y tus logros como donante" />
              </View>
            </View>
          )}

          {step === 1 && (
            <View style={styles.stepBody}>
              <Text style={styles.title}>¿Cómo te llamas?</Text>
              <Text style={styles.subtitle}>
                Usaremos tu nombre para personalizar tu experiencia. Tus datos se guardan
                solo en tu dispositivo.
              </Text>
              <Field label="Nombre">
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Tu nombre"
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                  autoFocus
                  returnKeyType="next"
                />
              </Field>
              <Field label="Ciudad o zona (opcional)">
                <TextInput
                  value={city}
                  onChangeText={setCity}
                  placeholder="Ej. Zona Centro"
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                />
              </Field>
            </View>
          )}

          {step === 2 && (
            <View style={styles.stepBody}>
              <Text style={styles.title}>Tu tipo de sangre</Text>
              <Text style={styles.subtitle}>
                Nos ayuda a mostrarte solicitudes compatibles. Puedes cambiarlo luego.
              </Text>
              <View style={styles.typeGrid}>
                {BLOOD_TYPES.map((t) => {
                  const active = bloodType === t && !unknownType;
                  return (
                    <Pressable
                      key={t}
                      onPress={() => {
                        setBloodType(t);
                        setUnknownType(false);
                      }}
                      style={[styles.typeCell, active && styles.typeCellActive]}
                    >
                      <Text style={[styles.typeText, active && styles.typeTextActive]}>
                        {t}
                      </Text>
                      <Text
                        style={[styles.typeShare, active && styles.typeShareActive]}
                      >
                        {POPULATION_SHARE[t]}%
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <Pressable
                onPress={() => {
                  setUnknownType(true);
                  setBloodType(null);
                }}
                style={[styles.unknown, unknownType && styles.unknownActive]}
              >
                <Ionicons
                  name={unknownType ? 'radio-button-on' : 'radio-button-off'}
                  size={18}
                  color={unknownType ? colors.primary : colors.textMuted}
                />
                <Text style={styles.unknownText}>No conozco mi tipo de sangre todavía</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
          <Button
            label={step === STEPS - 1 ? 'Empezar a donar' : 'Continuar'}
            icon={step === STEPS - 1 ? 'heart' : 'arrow-forward'}
            onPress={next}
            disabled={!canContinue}
          />
          {step > 0 && (
            <Pressable onPress={() => setStep((s) => s - 1)} style={styles.back}>
              <Text style={styles.backText}>Atrás</Text>
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function Bullet({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  return (
    <View style={styles.bullet}>
      <View style={styles.bulletIcon}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  hero: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius.xxl,
    borderBottomRightRadius: radius.xxl,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  brand: { color: '#fff', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
  dots: { flexDirection: 'row', gap: 6, marginTop: spacing.lg },
  dot: {
    height: 5,
    flex: 1,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  dotActive: { backgroundColor: '#fff' },
  content: { padding: spacing.xl, flexGrow: 1 },
  stepBody: { gap: spacing.md },
  title: { fontSize: 27, fontWeight: '800', color: colors.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: colors.textSecondary, lineHeight: 22 },
  bullets: { gap: spacing.md, marginTop: spacing.md },
  bullet: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  bulletIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bulletText: { flex: 1, fontSize: 14.5, color: colors.text, fontWeight: '500' },
  field: { gap: spacing.sm, marginTop: spacing.md },
  fieldLabel: { fontSize: 13, fontWeight: '700', color: colors.textSecondary },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    fontSize: 16,
    color: colors.text,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  typeCell: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeCellActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  typeText: { fontSize: 19, fontWeight: '800', color: colors.text },
  typeTextActive: { color: '#fff' },
  typeShare: { fontSize: 10.5, color: colors.textMuted, marginTop: 2, fontWeight: '600' },
  typeShareActive: { color: 'rgba(255,255,255,0.85)' },
  unknown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  unknownActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  unknownText: { fontSize: 14, color: colors.text, fontWeight: '500' },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  back: { alignItems: 'center', paddingVertical: spacing.sm },
  backText: { color: colors.textSecondary, fontWeight: '600', fontSize: 14 },
});
