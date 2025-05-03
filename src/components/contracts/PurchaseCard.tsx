
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
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200"
      }}
      buttonColor="bg-coop-green"
      buttonHoverColor="hover:bg-coop-green-dark"
      buttonText="View Details"
    >
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">Members</p>
          <p className="font-medium">{contract.members}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Min. Amount</p>
          <p className="font-medium">{contract.minAmount}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Deadline</p>
          <p className="font-medium">{contract.deadline}</p>
        </div>
      </div>
    </ContractCard>
  );
};
