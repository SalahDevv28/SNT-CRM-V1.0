import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Helper function to get the current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  return user;
}

// Helper function to sign in
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

// Helper function to sign up
export async function signUp(
  email: string,
  password: string,
  userData: {
    first_name: string;
    last_name: string;
    role: 'agent' | 'broker' | 'admin';
    office_id?: string;
  }
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });

  if (error) {
    return { data: null, error };
  }

  if (error || !data.user) {
    return { data: null, error: error || new Error('Sign up failed') };
  }

  // Create user record in users table and return the full user
  const { data: userRecord, error: userError } = await supabase
    .from('users')
    .insert({
      id: data.user.id,
      email: email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      role: userData.role,
      office_id: userData.office_id,
      broker_id: null,
      phone: null,
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (userError) {
    // Rollback auth user if user creation fails
    await supabase.auth.admin.deleteUser(data.user.id);
    return { data: null, error: userError };
  }

  return { data: { user: userRecord }, error: null };
}

// Helper function to sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Helper function to reset password
export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
  });
  return { data, error };
}

// Helper function to update password
export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { data, error };
}