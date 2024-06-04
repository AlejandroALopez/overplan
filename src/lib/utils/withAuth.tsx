'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const WithAuth: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.replace('/login'); // Redirect to login page if token is missing
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;