// app/favicon.ico/route.ts

import type { CSSProperties } from 'react'
import { ImageResponse } from 'next/server'

export const runtime = 'edge'

const gradientBackground = 'linear-gradient(135deg, #0f766e 0%, #0ea5e9 45%, #6366f1 100%)'

const baseStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '30%',
  background: gradientBackground,
  color: '#ecfeff',
  fontSize: 40,
  fontWeight: 800,
  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  letterSpacing: '-4px',
  textShadow: '0 6px 16px rgba(14, 165, 233, 0.4)',
  boxShadow: '0 18px 32px rgba(14, 165, 233, 0.35)',
}

export function GET() {
  return new ImageResponse(
    <div style={baseStyle}>
      S
    </div>,
    {
      width: 64,
      height: 64,
    }
  )
}
