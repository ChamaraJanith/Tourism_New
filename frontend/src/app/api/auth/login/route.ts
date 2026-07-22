import { NextRequest, NextResponse } from 'next/server'
import { logIn } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    const data = await logIn(email, password)
    return NextResponse.json({ message: 'Login successful', data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to log in' }, { status: 400 })
  }
}
