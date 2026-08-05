import { supabase } from '../../supabase'

export const signUp = async (
  email: string,
  password: string,
  fullName: string,
  agreedToTerms: boolean,
  nic?: string,
  country?: string,
  dob?: string,
  contactNumber?: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        nic,
        country,
        dob,
        contact_number: contactNumber,
      },
    },
  })

  if (error) {
    console.error('Error signing up:', error.message)
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
        nic,
        country,
        dob,
        contact_number: contactNumber,
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
