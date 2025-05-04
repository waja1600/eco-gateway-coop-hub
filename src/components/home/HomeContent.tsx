
import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { PortalButtons } from '@/components/PortalButtons';
import { PortalCarousel } from '@/components/PortalCarousel';
import { HotContracts } from '@/components/HotContracts';

export function HomeContent() {
  return (
    <>
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
    </>
  );
}
