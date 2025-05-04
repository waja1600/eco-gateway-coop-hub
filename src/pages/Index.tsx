
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { HomeContent } from '@/components/home/HomeContent';

const Index = () => {
  return (
    <MainLayout className="bg-slate-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]">
      <HomeContent />
    </MainLayout>
  );
};

export default Index;
