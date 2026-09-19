import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY are required. Add them to your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function testDbConnection() {
  const response = await fetch(`${supabaseUrl}/rest/v1/services?select=id&limit=1`, {
    headers: { apikey: supabaseKey },
  });

  if (response.status === 401 || response.status === 403) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || `Supabase rejected the API key (${response.status})`);
  }
}

export default supabase;
