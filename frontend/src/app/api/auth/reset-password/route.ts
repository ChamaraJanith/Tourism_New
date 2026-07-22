import { NextRequest, NextResponse } from 'next/server'
import { updateUserPassword } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 })
    }

    const { password } = await req.json()
    await updateUserPassword(token, password)
    return NextResponse.json({ message: 'Password updated successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update password' }, { status: 400 })
  }
}
