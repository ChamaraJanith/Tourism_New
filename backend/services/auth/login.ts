import { supabase } from '../../supabase'

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
