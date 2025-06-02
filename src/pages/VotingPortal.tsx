
import React from 'react';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { VotingSystem } from '@/components/voting/VotingSystem';
import { useToast } from '@/components/ui/use-toast';

const mockVotingProposals = [
  {
    id: '1',
    title: 'Adopt New Group Buying Platform',
    description: 'Should we integrate with the new blockchain-based group buying platform for better transparency and security?',
    type: 'simple' as const,
    options: ['Yes, adopt the new platform', 'No, keep current system', 'Need more information'],
    deadline: '2025-07-01',
    totalVotes: 45,
    results: { 'Yes, adopt the new platform': 28, 'No, keep current system': 12, 'Need more information': 5 },
    status: 'active' as const,
    quorum: 60,
    creator: 'Ahmed Hassan'
  },
  {
    id: '2',
    title: 'Marketing Budget Allocation',
    description: 'How should we allocate the cooperative marketing budget for Q3?',
    type: 'multiple' as const,
    options: ['Digital Marketing (40%)', 'Print Media (20%)', 'Events & Trade Shows (30%)', 'Influencer Partnerships (10%)'],
    deadline: '2025-06-15',
    totalVotes: 23,
    results: { 'Digital Marketing (40%)': 15, 'Print Media (20%)': 3, 'Events & Trade Shows (30%)': 8, 'Influencer Partnerships (10%)': 7 },
    status: 'active' as const,
    quorum: 40,
    creator: 'Sara Mohamed'
  }
];

export default function VotingPortal() {
  const { toast } = useToast();

  const handleVote = (proposalId: string, choice: string, comment?: string) => {
    toast({
      title: "Vote Submitted",
      description: `Your vote "${choice}" has been recorded for proposal ${proposalId}`,
    });
    
    // In a real app, this would submit to Loomio/Snapshot.js
    console.log('Vote submitted:', { proposalId, choice, comment });
  };

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <VotingSystem 
          proposals={mockVotingProposals}
          onVote={handleVote}
        />
      </div>
    </ModernMainLayout>
  );
}
