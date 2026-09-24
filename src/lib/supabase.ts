import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 20
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * SQL Schema for Supabase provisioning if the user sets up their project:
 * 
 * -- profiles
 * create table if not exists profiles (
 *   id uuid references auth.users on delete cascade primary key,
 *   name text not null,
 *   username text unique not null,
 *   bio text default '',
 *   avatar_url text default '',
 *   direction text,
 *   direction_virtue text,
 *   points integer default 850,
 *   streak integer default 4,
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * 
 * -- Enable RLS
 * alter table profiles enable row level security;
 * create policy "Public profiles are viewable by everyone." on profiles for select using (true);
 * create policy "Users can update own profile." on profiles for update using (auth.uid() = id);
 * 
 * -- daily_answers, challenges, challenge_progress, achievements, stories, community_posts, etc.
 */
