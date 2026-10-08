import { createClient } from '@supabase/supabase-js';  
const supabase = createClient('https://lmswnyyabrujrojdvpjb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtc3dueXlhYnJ1anJvamR2cGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMTE0ODksImV4cCI6MjA5Mzc4NzQ4OX0.fTTA99n9ePZ5Bah1vMh4di5v15AycHdAONO9CY1L45g');  
async function test() { const { data, error } = await supabase.from('itinerary_requests').select('*').order('created_at', { ascending: false }); if (error) console.error('Error:', error.message); else console.log('Data:', data.length); } test();  
