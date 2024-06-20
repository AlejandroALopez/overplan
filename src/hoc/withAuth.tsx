'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTokensFromCookies, isTokenExpired, refreshAccessToken } from '@/lib/utils/auth';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const WithAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const { token, refreshToken } = getTokensFromCookies();

        if (!token || !refreshToken) {
          router.replace('/auth/login'); // Redirect to login page if tokens are missing
          return;
        }

        if (isTokenExpired(token)) {
          // Try to refresh the token
          const newToken = await refreshAccessToken(refreshToken);
          if (!newToken) {
            router.replace('/auth/login'); // Redirect to login if refreshing token fails
            return;
          }
        }

        setIsAuthenticated(true); // Token is valid or successfully refreshed
      };

      checkAuth();
    }, [router]);

    if (!isAuthenticated) {
      return null; // Render nothing or a loading spinner while checking authentication
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;