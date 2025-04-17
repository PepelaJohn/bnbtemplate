import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false, superAdminOnly = false }: { 
  children: React.ReactNode;
  adminOnly?: boolean;
  superAdminOnly?: boolean;
}) => {
  const { user, loading, isAuthenticated, isAdmin, isSuperAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      router.push('/login');
    } else if (!loading && isAuthenticated()) {
      if (adminOnly && !isAdmin()) {
        router.push('/');
      } else if (superAdminOnly && !isSuperAdmin()) {
        router.push('/');
      }
    }
  }, [loading, user, router]);

  if (loading || !isAuthenticated() || (adminOnly && !isAdmin()) || (superAdminOnly && !isSuperAdmin())) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;