import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: 6,
          position: 'relative',
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: -1,
            lineHeight: 1,
          }}
        >
          FG
        </span>
        <div
          style={{
            position: 'absolute',
            right: 4,
            bottom: 10,
            width: 5,
            height: 5,
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
