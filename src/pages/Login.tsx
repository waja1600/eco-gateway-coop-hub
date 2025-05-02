
import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
};

export default Login;
