
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { PurchaseCard } from './PurchaseCard';
import { FundingCard } from './FundingCard';
import { HiringCard } from './HiringCard';
import { purchaseContracts, fundingCalls, hiringContracts } from '@/data/contractsData';

interface ContractsSectionProps {
  type: 'purchase' | 'funding' | 'hiring';
}

export const ContractsSection: React.FC<ContractsSectionProps> = ({ type }) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-4 p-4">
        {type === 'purchase' && purchaseContracts.map(contract => (
          <PurchaseCard key={contract.id} contract={contract} />
        ))}
        
        {type === 'funding' && fundingCalls.map(funding => (
          <FundingCard key={funding.id} funding={funding} />
        ))}
        
        {type === 'hiring' && hiringContracts.map(job => (
          <HiringCard key={job.id} job={job} />
        ))}
      </div>
    </ScrollArea>
  );
};
