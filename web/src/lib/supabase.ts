import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.REDWOOD_ENV_SUPABASE_CLIENT,
  process.env.REDWOOD_ENV_SUPABASE_KEY
)

export const bucketBase =
  'https://gsayikulzhojcaoudxww.supabase.co/storage/v1/object/public/';
