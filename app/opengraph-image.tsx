import { ImageResponse } from 'next/og';

export const alt = 'Ferguson González – UX/UI Designer & Digital Product Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1B33 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.05,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 120,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            FerGonz
          </span>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#06B6D3',
              marginLeft: 4,
              marginBottom: 8,
            }}
          />
        </div>

        {/* Subtitle */}
        <span
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: 8,
            textTransform: 'uppercase',
          }}
        >
          UX/UI Designer & Developer
        </span>

        {/* Cyan accent line */}
        <div
          style={{
            width: 80,
            height: 3,
            background: '#06B6D3',
            borderRadius: 2,
            marginTop: 32,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
