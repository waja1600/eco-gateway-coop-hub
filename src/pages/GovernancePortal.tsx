
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { GovernanceHero } from '@/components/governance/HeroSection';
import { StatsCards } from '@/components/governance/StatsCards';
import { ProposalTabs } from '@/components/governance/ProposalTabs';
import { HowItWorks } from '@/components/governance/HowItWorks';
import { activeProposals, pastProposals } from '@/components/governance/ProposalData';

const GovernancePortal = () => {
  const navigate = useNavigate();

  const handleViewProposal = (id: number) => {
    navigate(`/governance/proposals/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <GovernanceHero />

        {/* Stats Section */}
        <section className="py-12 container px-4 md:px-6">
          <StatsCards 
            activeProposals={activeProposals.length} 
            participatingMembers={128} 
            implementedProposals={27} 
          />

          {/* Proposals Tabs */}
          <ProposalTabs 
            activeProposals={activeProposals}
            pastProposals={pastProposals}
          />
        </section>
        
        {/* How It Works Section */}
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default GovernancePortal;
