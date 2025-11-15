// app/apple-icon.tsx

import type { CSSProperties } from 'react'
import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

const gradientBackground = 'linear-gradient(135deg, #0f766e 0%, #0ea5e9 45%, #6366f1 100%)'

const baseStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '32%',
  background: gradientBackground,
  color: '#f8fafc',
  fontSize: 104,
  fontWeight: 800,
  fontFamily: 'system-ui, sans-serif',
  letterSpacing: '-6px',
  textShadow: '0 20px 36px rgba(14, 165, 233, 0.35)',
  boxShadow: '0 40px 68px rgba(14, 165, 233, 0.32)',
}

export const runtime = 'edge'

export default function AppleIcon() {
  return new ImageResponse(
    <div style={baseStyle}>
      S
    </div>,
    {
      width: size.width,
      height: size.height,
    }
  )
}
