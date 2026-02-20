import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createSupabaseClientWithCookies } from '@/lib/supabase';

export default async function HomePage() {
  const cookieStore = await cookies();
  
  const cookieString = cookieStore.getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');

  const supabase = createSupabaseClientWithCookies(cookieString);

  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect('/(protected)/dashboard');
  } else {
    redirect('/(auth)/login');
  }
}
