import { getSupabaseCredentials } from './common'
import { supabase } from '../../supabase'

export const updateProfile = async (accessToken: string, name: string, avatarUrl: string) => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseCredentials()

  const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      data: {
        full_name: name,
        avatar_url: avatarUrl,
      },
    }),
  })

  const userData = await res.json()

  if (!res.ok) {
    console.error('Error updating user metadata in Supabase Auth:', userData.error || userData.msg || 'Unknown error')
    throw new Error(userData.error_description || userData.msg || userData.error || 'Failed to update user auth metadata')
  }

  const { data: profileDataArray, error: profileError } = await supabase
    .from('users')
    .update({ full_name: name })
    .eq('auth_id', userData.id)
    .select()

  const profileData = profileDataArray && profileDataArray.length > 0 ? profileDataArray[0] : null

  if (profileError) {
    console.error('Error updating public.users profile name:', profileError.message)
  }

  return {
    user: userData,
    profile: profileData,
  }
}
