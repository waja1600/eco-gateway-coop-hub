
import React, { ReactNode } from 'react';
import { EnhancedHeaderBar } from '@/components/layout/EnhancedHeaderBar';
import { ModernNavbar } from '@/components/layout/ModernNavbar';
import { Footer } from '@/components/Footer';

interface ModernMainLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ModernMainLayout({ children, className = "" }: ModernMainLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 ${className}`}>
      <EnhancedHeaderBar />
      <ModernNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
