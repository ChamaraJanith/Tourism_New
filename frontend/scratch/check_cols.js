const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://lmswnyyabrujrojdvpjb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtc3dueXlhYnJ1anJvamR2cGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMTE0ODksImV4cCI6MjA5Mzc4NzQ4OX0.fTTA99n9ePZ5Bah1vMh4di5v15AycHdAONO9CY1L45g';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  try {
    // Select one row from users to see its schema keys
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) {
      console.error('Error fetching users:', error.message);
      return;
    }
    console.log('User schema keys / record:', data);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

check();
