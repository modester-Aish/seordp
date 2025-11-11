// app/icon.tsx

import type { CSSProperties } from 'react'
import { ImageResponse } from 'next/server'

export const size = {
  width: 192,
  height: 192,
}

export const contentType = 'image/png'

const gradientBackground = 'linear-gradient(135deg, #0f766e 0%, #0ea5e9 45%, #6366f1 100%)'

const baseStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '28%',
  background: gradientBackground,
  color: '#ecfeff',
  fontSize: 112,
  fontWeight: 800,
  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  letterSpacing: '-6px',
  textShadow: '0 18px 36px rgba(14, 165, 233, 0.35)',
  boxShadow: '0 36px 64px rgba(14, 165, 233, 0.35)',
}

export default function Icon() {
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
