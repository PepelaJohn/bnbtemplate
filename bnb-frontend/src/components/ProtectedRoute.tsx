'use client'
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <p className="text-lg font-medium text-gray-700">Loading content...</p>
    </div>
  </div>
);

const AccessDenied = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="max-w-md p-8 mx-auto bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="mb-4 text-xl font-semibold text-center text-gray-800">Access Denied</h2>
      <p className="text-center text-gray-600">{message}</p>
      <div className="mt-6 text-center">
        <button 
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Return to Home
        </button>
      </div>
    </div>
  </div>
);

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  superAdminOnly?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  adminOnly = false,
  superAdminOnly = false,
  redirectTo = '/login'
}: ProtectedRouteProps) => {
  const { user, loading, isAuthenticated, isAdmin, isSuperAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Give a small delay to prevent flash of loading state for quick authentications
    const redirectTimer = setTimeout(() => {
      if (!loading) {
        if (!isAuthenticated) {
          router.push(redirectTo);
        } else if (adminOnly && !isAdmin) {
          router.push('/');
        } else if (superAdminOnly && !isSuperAdmin) {
          router.push('/');
        }
      }
    }, 300);

    return () => clearTimeout(redirectTimer);
  }, [loading, isAuthenticated, isAdmin, isSuperAdmin, router, adminOnly, superAdminOnly, redirectTo]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <AccessDenied message="Please log in to access this page." />;
  }

  if (adminOnly && !isAdmin) {
    return <AccessDenied message="You need administrator privileges to access this page." />;
  }

  if (superAdminOnly && !isSuperAdmin) {
    return <AccessDenied message="You need super administrator privileges to access this page." />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;