'use client';

export default function GoogleLoginButton() {
    const handleGoogleLogin = () => {
      window.location.href = 'http://localhost:8080/auth/google';
    };
  
    return (
      <button onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    );
  }