import { createClient } from '@supabase/supabase-js'
import { getSupabaseCredentials } from './common'
import { supabase } from '../../supabase'

export const sendPasswordResetEmail = async (email: string, redirectTo: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  })

  if (error) {
    console.error('Error sending password reset email:', error.message)
    throw error
  }
}

export const updateUserPassword = async (accessToken: string, newPassword: string) => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseCredentials()

  const userSupabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  })

  const { data, error } = await userSupabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    console.error('Error updating user password:', error.message)
    throw error
  }

  return data
}
