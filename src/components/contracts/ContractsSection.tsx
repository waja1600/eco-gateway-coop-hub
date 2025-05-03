
import React, { useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { PurchaseCard } from './PurchaseCard';
import { FundingCard } from './FundingCard';
import { HiringCard } from './HiringCard';
import { purchaseContracts, fundingCalls, hiringContracts } from '@/data/contractsData';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContractsSectionProps {
  type: 'purchase' | 'funding' | 'hiring';
}

export const ContractsSection: React.FC<ContractsSectionProps> = ({ type }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
        <Button 
          onClick={scrollLeft} 
          size="icon" 
          variant="outline" 
          className="rounded-full shadow-md bg-white/80 backdrop-blur-sm"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="w-full rounded-lg">
        <div 
          ref={scrollRef}
          className="flex w-max space-x-6 p-6 overflow-x-auto scrollbar-none"
        >
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
      
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
        <Button 
          onClick={scrollRight} 
          size="icon" 
          variant="outline" 
          className="rounded-full shadow-md bg-white/80 backdrop-blur-sm"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
