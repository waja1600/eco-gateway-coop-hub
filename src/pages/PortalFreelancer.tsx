
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { FreelancerHero } from '@/components/freelancer/FreelancerHero';
import { OpportunitiesList } from '@/components/freelancer/OpportunitiesList';
import { BenefitsSection } from '@/components/freelancer/BenefitsSection';
import { hiringOpportunities } from '@/data/freelancerOpportunities';

const PortalFreelancer = () => {
  return (
    <MainLayout>
      <FreelancerHero />
      <OpportunitiesList opportunities={hiringOpportunities} />
      <BenefitsSection />
    </MainLayout>
  );
};

export default PortalFreelancer;
