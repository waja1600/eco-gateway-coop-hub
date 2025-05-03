
import React from 'react';
import { ContractCard } from './ContractCard';

// واجهة خصائص عقد الشراء
interface PurchaseContractProps {
  contract: {
    id: number;
    title: string;
    description: string;
    members: number;
    deadline: string;
    minAmount: string;
    status: string;
  };
}

export const PurchaseCard: React.FC<PurchaseContractProps> = ({ contract }) => {
  return (
    <ContractCard
      title={contract.title}
      description={contract.description}
      status={contract.status}
      badgeColor={{
        bg: "bg-gradient-to-r from-green-50 to-green-100",
        text: "text-green-800",
        border: "border-green-200"
      }}
      buttonColor="bg-gradient-to-r from-coop-green to-coop-green-dark"
      buttonHoverColor="hover:shadow-lg hover:from-coop-green-dark hover:to-coop-green"
      buttonText="View Details"
    >
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-green-50/50 p-2 rounded-md">
          <p className="text-muted-foreground text-xs">Members</p>
          <p className="font-medium">{contract.members}</p>
        </div>
        <div className="bg-green-50/50 p-2 rounded-md">
          <p className="text-muted-foreground text-xs">Min. Amount</p>
          <p className="font-medium">{contract.minAmount}</p>
        </div>
        <div className="bg-green-50/50 p-2 rounded-md col-span-2">
          <p className="text-muted-foreground text-xs">Deadline</p>
          <p className="font-medium">{contract.deadline}</p>
        </div>
      </div>
    </ContractCard>
  );
};
