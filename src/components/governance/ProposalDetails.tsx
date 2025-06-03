
import React from 'react';
import { ProposalHeader } from './ProposalHeader';
import { ProposalInfo } from './ProposalInfo';
import { VotingStats } from './VotingStats';
import { ProposalTabs, UserVote } from './ProposalTabs';
import { VotingSection } from './VotingSection';

export interface ProposalDetailsProps {
  proposal: {
    id: number;
    title: string;
    description: string;
    detailedDescription?: string;
    category: string;
    status: 'نشط' | 'تمت الموافقة' | 'تم الرفض' | 'مغلق';
    creator: string;
    createdAt: string;
    deadline: string;
    votesFor: number;
    votesAgainst: number;
    abstain: number;
    quorum: number;
    documents?: { title: string; url: string }[];
    updates?: { date: string; content: string }[];
    votes?: UserVote[];
  };
  onBack: () => void;
  onVote?: (vote: 'مع' | 'ضد' | 'امتناع', comment?: string) => void;
}

export { UserVote };

export const ProposalDetails = ({ proposal, onBack, onVote }: ProposalDetailsProps) => {
  const [comment, setComment] = React.useState("");
  
  const handleVote = (vote: 'مع' | 'ضد' | 'امتناع') => {
    if (onVote) {
      onVote(vote, comment);
      setComment("");
    }
  };

  return (
    <div className="space-y-6">
      <ProposalHeader status={proposal.status} onBack={onBack} />
      
      <ProposalInfo
        title={proposal.title}
        creator={proposal.creator}
        createdAt={proposal.createdAt}
        deadline={proposal.deadline}
        category={proposal.category}
      />
      
      <VotingStats
        votesFor={proposal.votesFor}
        votesAgainst={proposal.votesAgainst}
        abstain={proposal.abstain}
        quorum={proposal.quorum}
      />
      
      <ProposalTabs
        description={proposal.description}
        detailedDescription={proposal.detailedDescription}
        votes={proposal.votes}
        documents={proposal.documents}
        updates={proposal.updates}
      />
      
      <VotingSection
        status={proposal.status}
        comment={comment}
        setComment={setComment}
        onVote={handleVote}
      />
    </div>
  );
};
