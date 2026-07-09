import { ImageResponse } from 'next/og';

export const alt = 'Honworth | Wealth Creation, Protection & Legacy Planning';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#2E4A3A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '12px solid #8C6921',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: '72px',
            color: '#FBF8F0',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
            marginBottom: '20px',
            fontFamily: 'serif',
          }}
        >
          HONWORTH
        </div>
        
        <div
          style={{
            width: '120px',
            height: '2px',
            background: '#8C6921',
            marginBottom: '30px',
          }}
        />

        <div
          style={{
            fontSize: '28px',
            color: '#E8EFE6',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            textAlign: 'center',
          }}
        >
          Wealth Creation · Protection · Legacy Planning
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
