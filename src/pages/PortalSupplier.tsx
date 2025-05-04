
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SupplierHero } from '@/components/supplier/SupplierHero';
import { ContractList } from '@/components/supplier/ContractList';
import { HowItWorks } from '@/components/supplier/HowItWorks';
import { supplierContracts } from '@/data/supplierContracts';

const PortalSupplier = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <SupplierHero />
        <ContractList contracts={supplierContracts} />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default PortalSupplier;
