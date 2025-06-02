
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Vote, Users, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface VotingProposal {
  id: string;
  title: string;
  description: string;
  type: 'simple' | 'multiple' | 'ranked';
  options: string[];
  deadline: string;
  totalVotes: number;
  results: { [key: string]: number };
  status: 'active' | 'completed' | 'cancelled';
  quorum: number;
  creator: string;
}

interface VotingSystemProps {
  proposals: VotingProposal[];
  onVote?: (proposalId: string, choice: string, comment?: string) => void;
}

export function VotingSystem({ proposals, onVote }: VotingSystemProps) {
  const [selectedVotes, setSelectedVotes] = useState<{ [key: string]: string }>({});
  const [comments, setComments] = useState<{ [key: string]: string }>({});

  const handleVoteSubmission = (proposalId: string) => {
    const choice = selectedVotes[proposalId];
    const comment = comments[proposalId];
    
    if (choice && onVote) {
      onVote(proposalId, choice, comment);
      // Clear the vote after submission
      setSelectedVotes(prev => ({ ...prev, [proposalId]: '' }));
      setComments(prev => ({ ...prev, [proposalId]: '' }));
    }
  };

  const getQuorumProgress = (proposal: VotingProposal) => {
    return (proposal.totalVotes / proposal.quorum) * 100;
  };

  const getTopChoice = (proposal: VotingProposal) => {
    const maxVotes = Math.max(...Object.values(proposal.results));
    return Object.keys(proposal.results).find(key => proposal.results[key] === maxVotes);
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <Vote className="mx-auto h-12 w-12 text-blue-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Voting System</h2>
        <p className="text-gray-600">Participate in democratic decision-making</p>
      </div>

      <div className="grid gap-6">
        {proposals.map(proposal => (
          <Card key={proposal.id} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{proposal.title}</CardTitle>
                  <CardDescription className="mt-2">{proposal.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge 
                    variant="outline" 
                    className={proposal.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}
                  >
                    {proposal.status}
                  </Badge>
                  <Badge variant="outline">{proposal.type} choice</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quorum Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Participation: {proposal.totalVotes}/{proposal.quorum}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Deadline: {proposal.deadline}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min(getQuorumProgress(proposal), 100)}%` }}
                  ></div>
                </div>
                {getQuorumProgress(proposal) < 100 && (
                  <p className="text-sm text-amber-600 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Need {proposal.quorum - proposal.totalVotes} more votes to reach quorum
                  </p>
                )}
              </div>

              {/* Voting Options */}
              {proposal.status === 'active' && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <Label className="text-lg font-medium">Cast Your Vote</Label>
                  <RadioGroup
                    value={selectedVotes[proposal.id] || ''}
                    onValueChange={(value) => setSelectedVotes(prev => ({ ...prev, [proposal.id]: value }))}
                  >
                    {proposal.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`${proposal.id}-${index}`} />
                        <Label htmlFor={`${proposal.id}-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`comment-${proposal.id}`}>Comment (Optional)</Label>
                    <Textarea
                      id={`comment-${proposal.id}`}
                      placeholder="Add a comment to explain your vote..."
                      value={comments[proposal.id] || ''}
                      onChange={(e) => setComments(prev => ({ ...prev, [proposal.id]: e.target.value }))}
                    />
                  </div>
                  
                  <Button
                    onClick={() => handleVoteSubmission(proposal.id)}
                    disabled={!selectedVotes[proposal.id]}
                    className="w-full"
                  >
                    Submit Vote
                  </Button>
                </div>
              )}

              {/* Results */}
              <div className="space-y-4">
                <Label className="text-lg font-medium">Current Results</Label>
                {proposal.options.map((option, index) => {
                  const votes = proposal.results[option] || 0;
                  const percentage = proposal.totalVotes > 0 ? (votes / proposal.totalVotes) * 100 : 0;
                  const isWinning = option === getTopChoice(proposal);
                  
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          {option}
                          {isWinning && proposal.status === 'completed' && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </span>
                        <span className="text-sm text-gray-600">
                          {votes} votes ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isWinning ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Proposal Info */}
              <div className="pt-4 border-t text-sm text-gray-600">
                <p>Created by: {proposal.creator}</p>
                <p>Proposal ID: {proposal.id}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
