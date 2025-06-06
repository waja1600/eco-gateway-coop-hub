
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Vote, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  BarChart3,
  FileText,
  Gavel
} from 'lucide-react';

interface Proposal {
  id: string;
  title: string;
  description: string;
  type: 'constitutional' | 'operational' | 'financial' | 'strategic';
  status: 'active' | 'passed' | 'rejected' | 'pending';
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
  quorum: number;
  deadline: string;
  proposer: string;
  requiredMajority: number;
}

interface DAOMember {
  id: string;
  address: string;
  votingPower: number;
  participation: number;
  reputation: number;
  delegatedTo?: string;
}

const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Increase Group Purchase Threshold',
    description: 'Proposal to increase minimum purchase threshold from $10,000 to $25,000 for better negotiation power',
    type: 'operational',
    status: 'active',
    votes: { for: 15420, against: 3240, abstain: 890 },
    quorum: 20000,
    deadline: '2024-02-15',
    proposer: '0x1234...abcd',
    requiredMajority: 60
  },
  {
    id: '2',
    title: 'Treasury Allocation for AI Development',
    description: 'Allocate 15% of treasury funds for AI contract optimization development',
    type: 'financial',
    status: 'active',
    votes: { for: 18750, against: 2100, abstain: 450 },
    quorum: 20000,
    deadline: '2024-02-20',
    proposer: '0x5678...efgh',
    requiredMajority: 66
  }
];

export function AdvancedGovernanceSystem() {
  const [proposals] = useState<Proposal[]>(mockProposals);
  const [selectedTab, setSelectedTab] = useState('proposals');

  const getTotalVotes = (proposal: Proposal) => {
    return proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
  };

  const getParticipationRate = (proposal: Proposal) => {
    return (getTotalVotes(proposal) / proposal.quorum) * 100;
  };

  const getApprovalRate = (proposal: Proposal) => {
    const total = proposal.votes.for + proposal.votes.against;
    return total > 0 ? (proposal.votes.for / total) * 100 : 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'passed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'constitutional': return 'bg-purple-100 text-purple-800';
      case 'operational': return 'bg-blue-100 text-blue-800';
      case 'financial': return 'bg-green-100 text-green-800';
      case 'strategic': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Gavel className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">Advanced Governance System</CardTitle>
              <CardDescription className="text-indigo-100">
                Decentralized governance with quadratic voting and delegation
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Proposals</p>
                <p className="text-2xl font-bold">{proposals.filter(p => p.status === 'active').length}</p>
              </div>
              <Vote className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Voters</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Participation Rate</p>
                <p className="text-2xl font-bold">73.5%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Governance Score</p>
                <p className="text-2xl font-bold">8.7/10</p>
              </div>
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Governance Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="proposals">Active Proposals</TabsTrigger>
          <TabsTrigger value="voting">Voting System</TabsTrigger>
          <TabsTrigger value="delegation">Delegation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="space-y-6">
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{proposal.title}</CardTitle>
                    <CardDescription className="mt-2">{proposal.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(proposal.status)}>
                      {proposal.status}
                    </Badge>
                    <Badge className={getTypeColor(proposal.type)}>
                      {proposal.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Voting Progress */}
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Participation</span>
                    <span>{getParticipationRate(proposal).toFixed(1)}% ({getTotalVotes(proposal).toLocaleString()} votes)</span>
                  </div>
                  <Progress value={getParticipationRate(proposal)} className="h-2" />
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="font-bold text-green-600">{proposal.votes.for.toLocaleString()}</div>
                      <div className="text-gray-600">For</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded">
                      <div className="font-bold text-red-600">{proposal.votes.against.toLocaleString()}</div>
                      <div className="text-gray-600">Against</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="font-bold text-gray-600">{proposal.votes.abstain.toLocaleString()}</div>
                      <div className="text-gray-600">Abstain</div>
                    </div>
                  </div>
                </div>

                {/* Proposal Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Proposer:</span>
                    <div className="font-mono text-xs">{proposal.proposer}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Deadline:</span>
                    <div>{proposal.deadline}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Required Majority:</span>
                    <div>{proposal.requiredMajority}%</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Current Approval:</span>
                    <div className={`font-medium ${getApprovalRate(proposal) >= proposal.requiredMajority ? 'text-green-600' : 'text-red-600'}`}>
                      {getApprovalRate(proposal).toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Voting Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Vote For
                  </Button>
                  <Button size="sm" variant="destructive">
                    Vote Against
                  </Button>
                  <Button size="sm" variant="outline">
                    Abstain
                  </Button>
                  <Button size="sm" variant="ghost">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="voting" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quadratic Voting System</CardTitle>
                <CardDescription>
                  Advanced voting mechanism for fair representation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">How Quadratic Voting Works</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Cost of votes increases quadratically</li>
                    <li>• 1 vote = 1 token, 2 votes = 4 tokens, 3 votes = 9 tokens</li>
                    <li>• Prevents plutocracy and encourages broad participation</li>
                    <li>• Voice credits are distributed fairly among all members</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Your Voice Credits:</span>
                    <span className="font-bold">100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Used This Cycle:</span>
                    <span>25</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available:</span>
                    <span className="font-bold text-green-600">75</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Voting Power Distribution</CardTitle>
                <CardDescription>
                  Current distribution of voting power across the DAO
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Members</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Delegated Votes</span>
                      <span>23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Reserved (Quorum)</span>
                      <span>10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="delegation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vote Delegation</CardTitle>
              <CardDescription>
                Delegate your voting power to trusted representatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Delegation Status</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    You have delegated 75% of your voting power to delegate address: 0x789a...bcde
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-3">Top Delegates</h4>
                    <div className="space-y-2">
                      {[
                        { address: '0x1234...abcd', power: '12.5%', votes: 847 },
                        { address: '0x5678...efgh', power: '8.3%', votes: 562 },
                        { address: '0x9abc...ijkl', power: '6.7%', votes: 451 }
                      ].map((delegate, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <div className="font-mono text-sm">{delegate.address}</div>
                            <div className="text-xs text-gray-600">{delegate.votes} votes cast</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{delegate.power}</div>
                            <Button size="sm" variant="outline" className="mt-1">
                              Delegate
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Your Delegation</h4>
                    <div className="space-y-4">
                      <div className="p-3 border rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Currently Delegated To:</span>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <div className="font-mono text-sm">0x789a...bcde</div>
                        <div className="text-xs text-gray-600">75% of voting power</div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          Change Delegate
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Revoke Delegation
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Governance Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Participation Rate</span>
                    <span className="font-bold text-green-600">73.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Proposal Success Rate</span>
                    <span className="font-bold">84.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Voting Period</span>
                    <span className="font-bold">7.3 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delegate Concentration</span>
                    <span className="font-bold text-yellow-600">23.4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: 'New proposal submitted', time: '2 hours ago', icon: FileText },
                    { action: 'Voting deadline reached', time: '5 hours ago', icon: Clock },
                    { action: 'Proposal #15 passed', time: '1 day ago', icon: CheckCircle },
                    { action: 'New delegate registered', time: '2 days ago', icon: Users }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-2">
                      <activity.icon className="h-4 w-4 text-gray-600" />
                      <div className="flex-1">
                        <div className="text-sm">{activity.action}</div>
                        <div className="text-xs text-gray-600">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
