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
    // Generate custom_id (e.g., USER-SRI-000001)
    const prefix = (country ? country.substring(0, 3) : 'XXX').toUpperCase()
    
    // Find the latest user with this prefix to increment the number
    const { data: latestUsers } = await supabase
      .from('public_users')
      .select('custom_id')
      .like('custom_id', `USER-${prefix}-%`)
      .order('custom_id', { ascending: false })
      .limit(1)

    let nextSeq = 1;
    if (latestUsers && latestUsers.length > 0 && latestUsers[0].custom_id) {
      const parts = latestUsers[0].custom_id.split('-');
      if (parts.length === 3) {
        const num = parseInt(parts[2], 10);
        if (!isNaN(num)) nextSeq = num + 1;
      }
    }

    const paddedSeq = nextSeq.toString().padStart(6, '0');
    const customId = `USER-${prefix}-${paddedSeq}`;

    const { data: profileDataArray, error: profileError } = await supabase
      .from('public_users')
      .insert({
        auth_id: data.user.id,
        email: data.user.email,

        full_name: fullName,
        agreed_to_terms: agreedToTerms,
        nic,
        country,
        dob,
        contact_number: contactNumber,
        custom_id: customId // Generated ID goes here
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
