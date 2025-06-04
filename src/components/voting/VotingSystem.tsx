import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function VotingSystem() {
  const { t } = useTranslation();
  const [proposals, setProposals] = useState([
    { id: 1, title: 'Proposal 1', description: 'Description for Proposal 1', votes: { yes: 10, no: 5, abstain: 2 } },
    { id: 2, title: 'Proposal 2', description: 'Description for Proposal 2', votes: { yes: 7, no: 8, abstain: 1 } },
  ]);

  const castVote = (proposalId: number, voteType: string) => {
    // Logic to cast vote
    alert(`Voted ${voteType} for Proposal ${proposalId}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{t('voting.title')}</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('voting.proposals')}</h3>
        
        {proposals.map(proposal => (
          <Card key={proposal.id}>
            <CardHeader>
              <CardTitle>{proposal.title}</CardTitle>
              <CardDescription>{proposal.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Yes: {proposal.votes.yes}</Badge>
                <Badge variant="secondary">No: {proposal.votes.no}</Badge>
                <Badge variant="secondary">Abstain: {proposal.votes.abstain}</Badge>
              </div>
              <div className="flex justify-around">
                <Button onClick={() => castVote(proposal.id, 'yes')}>{t('voting.yes')}</Button>
                <Button onClick={() => castVote(proposal.id, 'no')}>{t('voting.no')}</Button>
                <Button onClick={() => castVote(proposal.id, 'abstain')}>{t('voting.abstain')}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
