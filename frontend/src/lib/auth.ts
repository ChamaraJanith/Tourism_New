import { createClient } from '@supabase/supabase-js'
import { supabase } from './supabase'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?~`]).{8,}$/

export type UserProfile = {
  id: string
  email: string | null
  name: string
  avatarUrl: string
  profileId?: number | null
  agreedToTerms?: boolean | null
}

export const signUp = async (
  email: string,
  password: string,
  fullName: string,
  agreedToTerms: boolean
) => {
  if (!email || !emailRegex.test(email)) {
    throw new Error('Please provide a valid email address')
  }

  if (!password || !passwordRegex.test(password)) {
    throw new Error(
      'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, a number, and a special character.'
    )
  }

  if (!fullName || !fullName.trim()) {
    throw new Error('Full name is required')
  }

  if (!agreedToTerms) {
    throw new Error('You must agree to the Terms & Conditions')
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    throw error
  }

  let profile = null
  if (data.user) {
    const { data: profileDataArray, error: profileError } = await supabase
      .from('users')
      .insert({
        auth_id: data.user.id,
        email: data.user.email,
        full_name: fullName,
        agreed_to_terms: agreedToTerms,
      })
      .select()

    if (profileError) {
      console.error('Error creating user profile:', profileError.message)
    } else {
      profile = profileDataArray && profileDataArray.length > 0 ? profileDataArray[0] : null
    }
  }

  return {
    user: data.user,
    session: data.session,
    profile,
  }
}

export const logIn = async (email: string, password: string) => {
  if (!email || !emailRegex.test(email)) {
    throw new Error('Please provide a valid email address')
  }

  if (!password) {
    throw new Error('Password is required')
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  let profile = null
  if (data.user) {
    const { data: profileDataArray, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', data.user.id)
      .limit(1)

    if (profileError) {
      console.error('Error fetching user profile:', profileError.message)
    } else {
      profile = profileDataArray && profileDataArray.length > 0 ? profileDataArray[0] : null
    }
  }

  return {
    user: data.user,
    session: data.session,
    profile,
  }
}

export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  return session
}

export const sendPasswordResetEmail = async (email: string, redirectTo: string) => {
  if (!email || !emailRegex.test(email)) {
    throw new Error('Please provide a valid email address')
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  })

  if (error) {
    throw error
  }
}

export const updateUserPassword = async (accessToken: string, newPassword: string) => {
  if (!newPassword || !passwordRegex.test(newPassword)) {
    throw new Error(
      'Password must be at least 8 characters long and include an uppercase letter, lowercase letter, a number, and a special character.'
    )
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

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
    throw error
  }

  return data
}

export const updateProfile = async (accessToken: string, name: string, avatarUrl: string) => {
  if (!name || !name.trim()) {
    throw new Error('Full name is required')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

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
    throw new Error(userData.error_description || userData.msg || userData.error || 'Failed to update user auth metadata')
  }

  const { data: profileDataArray, error: profileError } = await supabase
    .from('users')
    .update({ full_name: name })
    .eq('auth_id', userData.id)
    .select()

  if (profileError) {
    console.error('Error updating public.users profile name:', profileError.message)
  }

  return {
    user: userData,
    profile: profileDataArray && profileDataArray.length > 0 ? profileDataArray[0] : null,
  }
}

export const authenticateToken = async (token?: string) => {
  if (!token) {
    throw new Error('Access token is required')
  }

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) {
    throw new Error(error?.message || 'Invalid or expired token')
  }

  const { data: profiles, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', user.id)
    .limit(1)

  const profile = profiles && profiles.length > 0 ? profiles[0] : null
  if (profileError) {
    console.error('Error fetching user profile:', profileError.message)
  }

  return {
    id: user.id,
    email: user.email,
    name: profile?.full_name || user.user_metadata?.full_name || '',
    avatarUrl: user.user_metadata?.avatar_url || '',
    profileId: profile?.id,
    agreedToTerms: profile?.agreed_to_terms,
  }
}
