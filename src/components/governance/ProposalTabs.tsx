
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProposalCard } from "./ProposalCard";

interface Proposal {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  abstain: number;
  quorum: number; // Changed from optional to required
  deadline: string; // Changed from optional to required
  category: string;
  creator: string; // Changed from optional to required
  result?: string;
  date?: string;
}

interface ProposalTabsProps {
  activeProposals: Proposal[];
  pastProposals: Proposal[];
}

export const ProposalTabs: React.FC<ProposalTabsProps> = ({
  activeProposals,
  pastProposals
}) => {
  return (
    <Tabs defaultValue="active" className="w-full">
      <div className="flex justify-between items-center mb-8">
        <TabsList>
          <TabsTrigger value="active">المقترحات النشطة</TabsTrigger>
          <TabsTrigger value="past">المقترحات السابقة</TabsTrigger>
          <TabsTrigger value="my">مقترحاتي</TabsTrigger>
        </TabsList>
        <div className="flex gap-2">
          <Button variant="outline">تصفية</Button>
          <Button variant="outline">ترتيب</Button>
        </div>
      </div>
      
      <TabsContent value="active">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeProposals.map(proposal => (
            <ProposalCard key={proposal.id} proposal={proposal} isActive={true} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="past">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastProposals.map(proposal => (
            <ProposalCard key={proposal.id} proposal={proposal} isActive={false} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="my">
        <div className="text-center py-12">
          <p className="text-muted-foreground">قم بتسجيل الدخول لعرض مقترحاتك</p>
          <Button className="mt-4" onClick={() => window.location.href = '/login'}>تسجيل الدخول</Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};
