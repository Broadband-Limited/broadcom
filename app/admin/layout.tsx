import { createServer } from '@/lib/supabase/server';
import { UserMenu } from './components/UserMenu';
import { LogoutButton } from './components/LogoutButton';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  let user = null;

  try {
    const supabase = await createServer();
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();
    user = currentUser;
  } catch (error) {
    console.error('Error fetching user:', error);
  }

  return (
    <>
      <div className='fixed top-18 right-4 z-50'>
        {user ? (
          <UserMenu userEmail={user.email || undefined} />
        ) : (
          <LogoutButton variant="default" />
        )}
      </div>

      {children}
    </>
  );
}
