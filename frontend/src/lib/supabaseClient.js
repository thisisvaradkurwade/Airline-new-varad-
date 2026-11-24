import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Supabase is optional for local UI development. The Express API remains
// the primary data path for authentication, flights, seats and bookings.
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

export async function testConnection() {
  if (!supabase) {
    console.info('Supabase is not configured; continuing with the Express API.')
    return { success: false, skipped: true, error: 'Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY.' }
  }

  const { data, error } = await supabase
    .from('test_connection')
    .select('*')

  if (error) {
    console.error('Supabase connection check:', error.message)
    return { success: false, error: error.message }
  }

  console.log('Supabase connection successful:', data)
  return { success: true, data }
}
