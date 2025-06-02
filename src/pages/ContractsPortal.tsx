
import React from 'react';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { ContractManager } from '@/components/contracts/ContractManager';

export default function ContractsPortal() {
  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <ContractManager />
      </div>
    </ModernMainLayout>
  );
}
