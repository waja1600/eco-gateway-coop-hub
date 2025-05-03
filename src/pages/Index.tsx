
import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { PortalButtons } from '@/components/PortalButtons';
import { PortalCarousel } from '@/components/PortalCarousel';
import { HotContracts } from '@/components/HotContracts';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <div className="py-8 bg-gradient-to-b from-white to-slate-100">
          <PortalButtons />
        </div>
        <div className="py-8 bg-pattern-school">
          <PortalCarousel />
        </div>
        <div className="py-12 bg-gradient-to-b from-slate-100 to-white">
          <HotContracts />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
