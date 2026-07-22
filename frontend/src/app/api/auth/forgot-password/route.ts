import { NextRequest, NextResponse } from 'next/server'
import { sendPasswordResetEmail } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
    const redirectTo = `${frontendUrl}/auth/reset-password`
    await sendPasswordResetEmail(email, redirectTo)
    return NextResponse.json({ message: 'Password reset email sent successfully. Please check your inbox.' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to send password reset email' }, { status: 400 })
  }
}
