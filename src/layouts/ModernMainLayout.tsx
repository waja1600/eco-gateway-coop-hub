
import React, { ReactNode } from 'react';
import { UnifiedHeaderBar } from '@/components/layout/UnifiedHeaderBar';
import { UnifiedNavbar } from '@/components/layout/UnifiedNavbar';
import { Footer } from '@/components/Footer';

interface ModernMainLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ModernMainLayout({ children, className = "" }: ModernMainLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 ${className}`}>
      <UnifiedHeaderBar />
      <UnifiedNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
