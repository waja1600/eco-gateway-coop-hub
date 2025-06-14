
// GPO Platform Types and Interfaces
export type UserRole = 'admin' | 'founder' | 'member' | 'investor' | 'supplier' | 'freelancer' | 'arbitrator';

export type GroupType = 'joint_purchase' | 'collaborative_marketing' | 'company_formation' | 'project_funding';

export type ContractType = 'supply' | 'services' | 'company_formation' | 'arbitration' | 'investment';

export type ProposalStatus = 'draft' | 'submitted' | 'negotiating' | 'accepted' | 'rejected' | 'contract_signed';

export type VotingStatus = 'pending' | 'active' | 'closed' | 'executed';

export type ArbitrationStatus = 'filed' | 'assigned' | 'hearing' | 'verdict' | 'enforced';

export interface GPOUser {
  id: string;
  email: string;
  fullName: string;
  roles: UserRole[];
  kycStatus: 'pending' | 'verified' | 'rejected';
  trustScore: number;
  performanceScore: number;
  isESGCertified: boolean;
  createdAt: string;
}

export interface GPOGroup {
  id: string;
  name: string;
  type: GroupType;
  description: string;
  founderId: string;
  adminMembers: string[];
  maxMembers: number;
  currentMembers: number;
  isESGMarked: boolean;
  foundingAgreementIPFS?: string;
  status: 'forming' | 'active' | 'investment_mode' | 'completed' | 'dissolved';
  jurisdiction: string;
  equityDistribution?: Record<string, number>;
  votingThreshold: number;
  createdAt: string;
}

export interface MCPAnalysis {
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  legalWarnings: string[];
  trustMetrics: {
    compliance: number;
    reliability: number;
    financialStability: number;
  };
}

export interface ContractDetails {
  id: string;
  groupId: string;
  type: ContractType;
  parties: string[];
  terms: Record<string, any>;
  ipfsHash: string;
  status: 'draft' | 'negotiating' | 'signed' | 'executed' | 'disputed';
  negotiationRounds: number;
  maxNegotiationRounds: number;
  mcpAnalysis?: MCPAnalysis;
  createdAt: string;
  signedAt?: string;
}

export interface ProposalSubmission {
  id: string;
  groupId: string;
  submitterId: string;
  submitterType: 'supplier' | 'freelancer';
  title: string;
  description: string;
  pricing: Record<string, number>;
  deliverySchedule: string;
  attachments: string[];
  status: ProposalStatus;
  negotiationHistory: NegotiationRound[];
  mcpScore?: number;
  submittedAt: string;
}

export interface NegotiationRound {
  round: number;
  proposedChanges: Record<string, any>;
  response: string;
  timestamp: string;
  initiatedBy: 'group' | 'supplier' | 'freelancer';
}

export interface VotingProposal {
  id: string;
  groupId: string;
  type: 'accept_proposal' | 'replace_admin' | 'modify_contract' | 'equity_change' | 'dissolve_group';
  title: string;
  description: string;
  options: string[];
  requiredMajority: number;
  deadline: string;
  status: VotingStatus;
  votes: Vote[];
  createdBy: string;
  createdAt: string;
}

export interface Vote {
  userId: string;
  option: string;
  weight: number;
  timestamp: string;
  reason?: string;
}

export interface InvestmentOpportunity {
  id: string;
  groupId: string;
  targetAmount: number;
  currentAmount: number;
  minimumInvestment: number;
  expectedReturns: string;
  revenueSharePercentage: number;
  mcpInvestmentScore: number;
  timeline: string;
  riskProfile: 'low' | 'medium' | 'high';
  isESGCompliant: boolean;
  investors: Investor[];
  status: 'open' | 'funded' | 'closed';
}

export interface Investor {
  userId: string;
  amount: number;
  sharePercentage: number;
  investmentDate: string;
  ipfsContractHash: string;
}

export interface MarketplaceService {
  id: string;
  title: string;
  description: string;
  price: number;
  deliveryTime: string;
  providerId: string;
  category: string;
  features: string[];
  isAutoContract: boolean;
  rating: number;
  completedOrders: number;
}

export interface ArbitrationCase {
  id: string;
  disputeAmount: number;
  plaintiff: string;
  defendant: string;
  contractId: string;
  description: string;
  evidence: string[];
  arbitratorId?: string;
  status: ArbitrationStatus;
  hearingDate?: string;
  verdict?: string;
  enforcementDetails?: string;
  filedAt: string;
}

export interface Dashboard {
  totalGroups: number;
  activeContracts: number;
  pendingVotes: number;
  revenueThisMonth: number;
  userGrowth: number;
  contractCompletionRate: number;
  averageNegotiationTime: number;
  topPerformingCategories: string[];
  mcpSystemHealth: number;
}
