import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, Divider, SectionHeader } from '@/components/ui';
import { FAQ, FRECUENCIA, REQUISITOS } from '@/data';
import { colors, gradients, radius, spacing } from '@/theme';

export default function Info() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.title}>Requisitos y datos</Text>
        <Text style={styles.subtitle}>Información oficial para donar en México</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={gradients.primary} style={styles.impact}>
          <Ionicons name="heart" size={30} color="#fff" />
          <View style={{ flex: 1 }}>
            <Text style={styles.impactTitle}>Una donación ayuda hasta a 3 personas</Text>
            <Text style={styles.impactSub}>
              Se separa en glóbulos rojos, plasma y plaquetas.
            </Text>
          </View>
        </LinearGradient>

        <SectionHeader title="¿Puedo donar?" />
        <Card style={{ gap: 0 }}>
          {REQUISITOS.map((r, i) => (
            <View key={r.title}>
              {i > 0 && <Divider style={{ marginVertical: spacing.sm }} />}
              <View style={styles.reqItem}>
                <View style={styles.reqDot}>
                  <Ionicons name="checkmark" size={15} color={colors.success} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reqTitle}>{r.title}</Text>
                  <Text style={styles.reqBody}>{r.body}</Text>
                </View>
              </View>
            </View>
          ))}
        </Card>

        <SectionHeader title="¿Cada cuánto?" />
        <Card style={{ gap: 0 }}>
          {FRECUENCIA.map(([k, v], i) => (
            <View key={k}>
              {i > 0 && <Divider style={{ marginVertical: spacing.sm }} />}
              <View style={styles.freqRow}>
                <Text style={styles.freqKey}>{k}</Text>
                <Text style={styles.freqVal}>{v}</Text>
              </View>
            </View>
          ))}
        </Card>

        <SectionHeader title="Preguntas frecuentes" />
        <Card style={{ gap: 0 }}>
          {FAQ.map((f, i) => (
            <View key={i}>
              {i > 0 && <Divider />}
              <View style={styles.faqItem}>
                <Text style={styles.faqQ}>{f.q}</Text>
                <Text style={styles.faqA}>{f.a}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card style={styles.sources}>
          <Text style={styles.sourcesText}>
            <Text style={{ fontWeight: '700' }}>Fuentes: </Text>
            Centro Nacional de la Transfusión Sanguínea (CNTS, Secretaría de Salud), IMSS e
            ISSSTE. Los requisitos pueden variar por centro; confirma antes de acudir.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, letterSpacing: -0.4 },
  subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 3 },
  body: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  impact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: radius.xl,
    padding: spacing.lg,
    overflow: 'hidden',
  },
  impactTitle: { color: '#fff', fontSize: 16, fontWeight: '800' },
  impactSub: { color: 'rgba(255,255,255,0.9)', fontSize: 12.5, marginTop: 2 },
  reqItem: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start', paddingVertical: spacing.sm },
  reqDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  reqTitle: { fontSize: 14.5, fontWeight: '700', color: colors.text },
  reqBody: { fontSize: 12.5, color: colors.textSecondary, lineHeight: 18, marginTop: 1 },
  freqRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    gap: spacing.md,
  },
  freqKey: { fontSize: 14, fontWeight: '600', color: colors.text, flex: 1 },
  freqVal: { fontSize: 13, fontWeight: '700', color: colors.primary, textAlign: 'right', flexShrink: 1 },
  faqItem: { paddingVertical: spacing.sm, gap: 3 },
  faqQ: { fontSize: 14.5, fontWeight: '700', color: colors.text },
  faqA: { fontSize: 13, color: colors.textSecondary, lineHeight: 19 },
  sources: { marginTop: spacing.lg, backgroundColor: colors.surfaceAlt, borderColor: colors.border },
  sourcesText: { fontSize: 12.5, color: colors.textSecondary, lineHeight: 18 },
});
