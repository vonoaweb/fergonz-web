import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1B33 100%)',
          borderRadius: 36,
          position: 'relative',
        }}
      >
        <span
          style={{
            fontSize: 100,
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          FG
        </span>
        <div
          style={{
            position: 'absolute',
            right: 28,
            bottom: 55,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#06B6D3',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
