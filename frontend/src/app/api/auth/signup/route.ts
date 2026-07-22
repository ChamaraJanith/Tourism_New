import { NextRequest, NextResponse } from 'next/server'
import { signUp } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, agreedToTerms } = await req.json()
    const data = await signUp(email, password, name, agreedToTerms)
    return NextResponse.json({ message: 'User created successfully', data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to sign up' }, { status: 400 })
  }
}
