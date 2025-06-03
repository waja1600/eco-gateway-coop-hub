
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProposalCard } from './ProposalCard';

interface Proposal {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  abstain: number;
  quorum: number;
  deadline: string;
  category: string;
  creator: string;
  result?: string;
  date?: string;
}

interface ProposalsListProps {
  activeProposals: Proposal[];
  pastProposals: Proposal[];
}

export const ProposalsList: React.FC<ProposalsListProps> = ({
  activeProposals,
  pastProposals
}) => {
  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="active">المقترحات النشطة ({activeProposals.length})</TabsTrigger>
        <TabsTrigger value="past">المقترحات السابقة ({pastProposals.length})</TabsTrigger>
      </TabsList>
      
      <TabsContent value="active" className="space-y-4 mt-6">
        {activeProposals.length > 0 ? (
          <div className="grid gap-4">
            {activeProposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد مقترحات نشطة حالياً
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="past" className="space-y-4 mt-6">
        {pastProposals.length > 0 ? (
          <div className="grid gap-4">
            {pastProposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} isPast />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد مقترحات سابقة
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
