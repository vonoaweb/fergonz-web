import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CenterCard } from '@/components/CenterCard';
import { CENTERS } from '@/data';
import { colors, gradients, radius, spacing } from '@/theme';

export default function Centers() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.title}>Centros de donación</Text>
        <Text style={styles.subtitle}>
          {CENTERS.length} bancos de sangre reales · Jalisco
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={gradients.primary} style={styles.banner}>
          <View style={styles.pins}>
            <Ionicons name="location" size={22} color="rgba(255,255,255,0.9)" />
            <Ionicons name="location" size={30} color="#fff" />
            <Ionicons name="location" size={18} color="rgba(255,255,255,0.75)" />
          </View>
          <Text style={styles.bannerTitle}>Bancos de sangre verificados</Text>
          <Text style={styles.bannerSub}>
            Toca un centro para ver dirección, teléfono y horario. Datos de fuentes oficiales.
          </Text>
        </LinearGradient>

        {CENTERS.map((c) => (
          <CenterCard key={c.id} center={c} onPress={() => router.push(`/center/${c.id}`)} />
        ))}

        <Text style={styles.footnote}>
          El CETS Jalisco tiene más de 20 sitios de donación registrados en el estado.
        </Text>
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
  list: { padding: spacing.xl, gap: spacing.md, paddingBottom: spacing.xxxl },
  banner: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.xs,
    overflow: 'hidden',
  },
  pins: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm },
  bannerTitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginTop: spacing.sm },
  bannerSub: { color: 'rgba(255,255,255,0.9)', fontSize: 13, lineHeight: 18 },
  footnote: {
    fontSize: 12.5,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
    lineHeight: 18,
    marginTop: spacing.xs,
  },
});
