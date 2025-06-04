
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface VotingProposal {
  id: string;
  title: string;
  description: string;
  type: 'simple' | 'multiple';
  options: string[];
  deadline: string;
  totalVotes: number;
  results: Record<string, number>;
  status: 'active' | 'closed';
  quorum: number;
  creator: string;
}

interface VotingSystemProps {
  proposals?: VotingProposal[];
  onVote?: (proposalId: string, choice: string, comment?: string) => void;
}

export function VotingSystem({ proposals = [], onVote }: VotingSystemProps) {
  const { t } = useTranslation();
  const [defaultProposals] = useState([
    { id: 1, title: 'Proposal 1', description: 'Description for Proposal 1', votes: { yes: 10, no: 5, abstain: 2 } },
    { id: 2, title: 'Proposal 2', description: 'Description for Proposal 2', votes: { yes: 7, no: 8, abstain: 1 } },
  ]);

  const displayProposals = proposals.length > 0 ? proposals : defaultProposals;

  const castVote = (proposalId: string | number, voteType: string) => {
    if (onVote) {
      onVote(String(proposalId), voteType);
    } else {
      // Default behavior for legacy proposals
      alert(`Voted ${voteType} for Proposal ${proposalId}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('voting.title')}</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('voting.proposals')}</h3>
        
        {displayProposals.map(proposal => (
          <Card key={proposal.id}>
            <CardHeader>
              <CardTitle>{proposal.title}</CardTitle>
              <CardDescription>{proposal.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* Handle new proposal format */}
              {proposal.options ? (
                <>
                  <div className="flex flex-wrap gap-2">
                    {proposal.options.map((option, index) => (
                      <Badge key={index} variant="secondary">
                        {option}: {proposal.results[option] || 0}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {proposal.options.map((option, index) => (
                      <Button 
                        key={index}
                        onClick={() => castVote(proposal.id, option)}
                        size="sm"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </>
              ) : (
                /* Handle legacy proposal format */
                <>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Yes: {proposal.votes?.yes}</Badge>
                    <Badge variant="secondary">No: {proposal.votes?.no}</Badge>
                    <Badge variant="secondary">Abstain: {proposal.votes?.abstain}</Badge>
                  </div>
                  <div className="flex justify-around">
                    <Button onClick={() => castVote(proposal.id, 'yes')}>{t('voting.yes')}</Button>
                    <Button onClick={() => castVote(proposal.id, 'no')}>{t('voting.no')}</Button>
                    <Button onClick={() => castVote(proposal.id, 'abstain')}>{t('voting.abstain')}</Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
