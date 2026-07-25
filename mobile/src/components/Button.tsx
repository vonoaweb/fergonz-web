import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors, gradients, radius, shadow, spacing } from '@/theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface Props {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled,
  loading,
  fullWidth = true,
  style,
}: Props) {
  const isDisabled = disabled || loading;

  const handlePress = () => {
    if (isDisabled) return;
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
    onPress?.();
  };

  const textColor =
    variant === 'primary' || variant === 'danger'
      ? colors.textOnPrimary
      : variant === 'ghost'
        ? colors.primary
        : colors.text;

  const content = (
    <View style={styles.row}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={18} color={textColor} />}
          <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        </>
      )}
    </View>
  );

  const base: ViewStyle = {
    opacity: isDisabled ? 0.55 : 1,
    width: fullWidth ? '100%' : undefined,
  };

  if (variant === 'primary' || variant === 'danger') {
    return (
      <Pressable
        onPress={handlePress}
        disabled={isDisabled}
        accessibilityRole="button"
        style={({ pressed }) => [
          base,
          shadow.floating as ViewStyle,
          { transform: [{ scale: pressed ? 0.98 : 1 }] },
          style,
        ]}
      >
        <LinearGradient
          colors={variant === 'danger' ? gradients.urgent : gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        base,
        styles.flat,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  label: { fontSize: 15.5, fontWeight: '700' },
  gradient: {
    borderRadius: radius.pill,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flat: {
    borderRadius: radius.pill,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: colors.primarySoft,
  },
});
