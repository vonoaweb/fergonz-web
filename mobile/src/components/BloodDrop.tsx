import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { colors } from '@/theme';

/** VidaLink mark: a blood drop with a subtle highlight. */
export function BloodDrop({
  size = 40,
  color = colors.primary,
  glossy = true,
}: {
  size?: number;
  color?: string;
  glossy?: boolean;
}) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 48 48">
        <Defs>
          <LinearGradient id="drop" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.primaryLight} />
            <Stop offset="1" stopColor={color} />
          </LinearGradient>
        </Defs>
        <Path
          d="M24 3C24 3 8 22 8 32a16 16 0 1 0 32 0C40 22 24 3 24 3Z"
          fill={glossy ? 'url(#drop)' : color}
        />
        {glossy && (
          <Path
            d="M18 30a6 6 0 0 0 6 8"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={2.4}
            strokeLinecap="round"
            fill="none"
          />
        )}
      </Svg>
    </View>
  );
}
