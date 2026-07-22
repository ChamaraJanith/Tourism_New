import { NextRequest, NextResponse } from 'next/server'
import { updateProfile, authenticateToken } from '@/lib/auth'

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: Missing token' }, { status: 401 })
    }

    const { name, avatarUrl } = await req.json()
    const data = await updateProfile(token, name, avatarUrl)
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.profile?.full_name || data.user.user_metadata?.full_name || name,
        profileId: data.profile?.id,
        avatarUrl: data.user.user_metadata?.avatar_url || '',
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update profile' }, { status: 400 })
  }
}
