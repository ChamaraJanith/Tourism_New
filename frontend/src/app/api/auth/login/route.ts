import { NextRequest, NextResponse } from 'next/server'
import { logIn } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (process.env.NODE_ENV !== 'production') {
      console.log('/api/auth/login body:', { email, password: password ? '***REDACTED***' : null })
    }
    const data = await logIn(email, password)
    return NextResponse.json({ message: 'Login successful', data })
  } catch (error: any) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('/api/auth/login error:', error)
    }
    return NextResponse.json({ error: error.message || 'Failed to log in' }, { status: 400 })
  }
}
