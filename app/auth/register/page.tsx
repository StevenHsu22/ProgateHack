'use client';

import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

export default function RegisterPage() {
  useEffect(() => {
    signIn('keycloak', {
      callbackUrl: '/user',
      prompt: 'create',
    });
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <p>登録ページにリダイレクトしています...</p>
    </div>
  );
}
