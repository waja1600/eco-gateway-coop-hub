
import React from 'react';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
};

export default Register;
