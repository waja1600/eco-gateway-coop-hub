
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
        bg: "bg-amber-100",
        text: "text-amber-800",
        border: "border-amber-200"
      }}
      buttonColor="bg-coop-brown"
      buttonHoverColor="hover:bg-coop-brown/90"
      buttonText="Apply Now"
    >
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">Duration</p>
          <p className="font-medium">{job.duration}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Rate</p>
          <p className="font-medium">{job.rate}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Location</p>
          <p className="font-medium">{job.location}</p>
        </div>
      </div>
    </ContractCard>
  );
};
