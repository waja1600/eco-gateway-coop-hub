
import React from 'react';
import { ContractCard } from './ContractCard';

// واجهة خصائص دعوة التمويل
interface FundingCallProps {
  funding: {
    id: number;
    title: string;
    description: string;
    currentFunding: string;
    goal: string;
    backers: number;
    deadline: string;
    status: string;
  };
}

export const FundingCard: React.FC<FundingCallProps> = ({ funding }) => {
  // حساب نسبة التمويل للعرض في شريط التقدم
  const fundingPercentage = () => {
    const current = parseInt(funding.currentFunding.replace(/[^0-9]/g, ''));
    const goal = parseInt(funding.goal.replace(/[^0-9]/g, ''));
    return (current / goal) * 100;
  };

  return (
    <ContractCard
      title={funding.title}
      description={funding.description}
      status={funding.status}
      badgeColor={{
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200"
      }}
      buttonColor="bg-coop-blue"
      buttonHoverColor="hover:bg-coop-blue/90"
      buttonText="Support Project"
    >
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span>{funding.currentFunding}</span>
          <span>{funding.goal}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div 
            className="bg-coop-blue h-2.5 rounded-full" 
            style={{ width: `${fundingPercentage()}%` }}
          ></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">Backers</p>
          <p className="font-medium">{funding.backers}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Deadline</p>
          <p className="font-medium">{funding.deadline}</p>
        </div>
      </div>
    </ContractCard>
  );
};
