import { createClient } from '@supabase/supabase-js'
import { supabase } from './supabase'

/**
 * Signup a new user with email and password
 * @param email          - User's email address
 * @param password       - User's password (stored by Supabase Auth, NOT in users table)
 * @param fullName       - User's full name
 * @param agreedToTerms  - Whether user agreed to Terms & Conditions
 */
export const signUp = async (
  email: string,
  password: string,
  fullName: string,
  agreedToTerms: boolean
) => {
  // Step 1: Create user in Supabase Auth
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
    console.error('Error signing up:', error.message)
    throw error
  }

  // Step 2: Insert profile into public.users table and retrieve the auto-incremented id
  let profile = null;
  if (data.user) {
    const { data: profileDataArray, error: profileError } = await supabase
      .from('users')
      .insert({
        auth_id:         data.user.id,   // UUID from Supabase Auth
        email:           data.user.email,
        full_name:       fullName,
        agreed_to_terms: agreedToTerms,  // true = user accepted T&C
      })
      .select();

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



/**
 * Login an existing user with email and password
 * @param email - User's email address
 * @param password - User's password
 */
export const logIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Error logging in:', error.message)
    throw error
  }

  let profile = null
  if (data.user) {
    const { data: profileDataArray, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', data.user.id)
      .limit(1);

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

/**
 * Sign out the current user
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Error signing out:', error.message)
    throw error
  }
}

/**
 * Get the current user session
 */
export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Error getting session:', error.message)
    throw error
  }

  return session
}

/**
 * Send password reset email to user
 * @param email - User's email address
 * @param redirectTo - URL to redirect to after clicking the reset link
 */
export const sendPasswordResetEmail = async (email: string, redirectTo: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  })

  if (error) {
    console.error('Error sending password reset email:', error.message)
    throw error
  }
}

/**
 * Update user's password using their access token
 * @param accessToken - User's active JWT access token
 * @param newPassword - User's new password
 */
export const updateUserPassword = async (accessToken: string, newPassword: string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  // Create a request-scoped Supabase client authenticated as the user
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

/**
 * Update user's profile metadata and sync full name to database users table
 * @param accessToken - User's active JWT access token
 * @param name        - User's new full name
 * @param avatarUrl   - User's new profile picture URL
 */
export const updateProfile = async (accessToken: string, name: string, avatarUrl: string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  // 1. Direct REST request to Supabase Auth GoTrue API to update metadata
  const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      data: {
        full_name: name,
        avatar_url: avatarUrl
      }
    })
  })

  const userData = await res.json()

  if (!res.ok) {
    console.error('Error updating user metadata in Supabase Auth:', userData.error || userData.msg || 'Unknown error')
    throw new Error(userData.error_description || userData.msg || userData.error || 'Failed to update user auth metadata')
  }

  // 2. Update public.users table name
  const { data: profileDataArray, error: profileError } = await supabase
    .from('users')
    .update({
      full_name: name
    })
    .eq('auth_id', userData.id)
    .select();

  const profileData = profileDataArray && profileDataArray.length > 0 ? profileDataArray[0] : null;

  if (profileError) {
    console.error('Error updating public.users profile name:', profileError.message)
  }

  return {
    user: userData,
    profile: profileData
  }
}
