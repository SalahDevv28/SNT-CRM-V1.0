import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export default async function HomePage() {
  const cookieStore = await cookies();
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const cookieString = cookieStore.getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Cookie: cookieString,
      },
    },
  });

  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
