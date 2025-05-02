
import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { PortalButtons } from '@/components/PortalButtons';
import { PortalCarousel } from '@/components/PortalCarousel';
import { HotContracts } from '@/components/HotContracts';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <PortalButtons />
        <PortalCarousel />
        <HotContracts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
