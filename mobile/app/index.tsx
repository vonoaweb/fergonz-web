import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { BloodDrop } from '@/components/BloodDrop';
import { useDonor } from '@/context/DonorContext';
import { colors, spacing } from '@/theme';

export default function Index() {
  const { ready, onboarded } = useDonor();

  if (!ready) {
    return (
      <View style={styles.splash}>
        <BloodDrop size={72} />
        <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.xl }} />
      </View>
    );
  }

  return <Redirect href={onboarded ? '/(tabs)' : '/onboarding'} />;
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
});
