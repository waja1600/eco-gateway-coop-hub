
import React from 'react';
import { ContractCard } from './ContractCard';

// واجهة خصائص عقد التوظيف
interface HiringContractProps {
  job: {
    id: number;
    title: string;
    description: string;
    duration: string;
    rate: string;
    location: string;
    status: string;
  };
}

export const HiringCard: React.FC<HiringContractProps> = ({ job }) => {
  return (
    <ContractCard
      title={job.title}
      description={job.description}
      status={job.status}
      badgeColor={{
        bg: "bg-gradient-to-r from-amber-100 to-amber-200",
        text: "text-amber-800",
        border: "border-amber-300"
      }}
      buttonColor="bg-gradient-to-r from-amber-500 to-amber-600"
      buttonHoverColor="hover:shadow-lg hover:from-amber-600 hover:to-amber-700"
      buttonText="Apply Now"
    >
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-amber-100 p-3 rounded-md shadow-inner border border-amber-200 transform transition-all hover:scale-105">
          <p className="text-muted-foreground text-xs font-medium">Duration</p>
          <p className="font-bold text-amber-800">{job.duration}</p>
        </div>
        <div className="bg-amber-100 p-3 rounded-md shadow-inner border border-amber-200 transform transition-all hover:scale-105">
          <p className="text-muted-foreground text-xs font-medium">Rate</p>
          <p className="font-bold text-amber-800">{job.rate}</p>
        </div>
        <div className="bg-amber-100 p-3 rounded-md col-span-2 shadow-inner border border-amber-200 transform transition-all hover:scale-105">
          <p className="text-muted-foreground text-xs font-medium">Location</p>
          <p className="font-bold text-amber-800">{job.location}</p>
        </div>
      </div>
    </ContractCard>
  );
};
