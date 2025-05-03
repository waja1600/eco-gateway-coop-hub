
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
        bg: "bg-gradient-to-r from-emerald-100 to-emerald-200",
        text: "text-emerald-800",
        border: "border-emerald-300"
      }}
      buttonColor="bg-gradient-to-r from-emerald-500 to-emerald-600"
      buttonHoverColor="hover:shadow-lg hover:from-emerald-600 hover:to-emerald-700"
      buttonText="View Details"
    >
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-emerald-100 p-3 rounded-md shadow-inner border border-emerald-200 transform transition-all hover:scale-105">
          <p className="text-muted-foreground text-xs font-medium">Members</p>
          <p className="font-bold text-emerald-800">{contract.members}</p>
        </div>
        <div className="bg-emerald-100 p-3 rounded-md shadow-inner border border-emerald-200 transform transition-all hover:scale-105">
          <p className="text-muted-foreground text-xs font-medium">Min. Amount</p>
          <p className="font-bold text-emerald-800">{contract.minAmount}</p>
        </div>
        <div className="bg-emerald-100 p-3 rounded-md col-span-2 shadow-inner border border-emerald-200 transform transition-all hover:scale-105">
          <p className="text-muted-foreground text-xs font-medium">Deadline</p>
          <p className="font-bold text-emerald-800">{contract.deadline}</p>
        </div>
      </div>
    </ContractCard>
  );
};
