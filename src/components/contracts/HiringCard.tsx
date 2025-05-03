
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
        bg: "bg-gradient-to-r from-amber-50 to-amber-100",
        text: "text-amber-800",
        border: "border-amber-200"
      }}
      buttonColor="bg-gradient-to-r from-coop-brown to-coop-brown/90"
      buttonHoverColor="hover:shadow-lg hover:from-coop-brown/90 hover:to-coop-brown"
      buttonText="Apply Now"
    >
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-amber-50/50 p-2 rounded-md">
          <p className="text-muted-foreground text-xs">Duration</p>
          <p className="font-medium">{job.duration}</p>
        </div>
        <div className="bg-amber-50/50 p-2 rounded-md">
          <p className="text-muted-foreground text-xs">Rate</p>
          <p className="font-medium">{job.rate}</p>
        </div>
        <div className="bg-amber-50/50 p-2 rounded-md col-span-2">
          <p className="text-muted-foreground text-xs">Location</p>
          <p className="font-medium">{job.location}</p>
        </div>
      </div>
    </ContractCard>
  );
};
