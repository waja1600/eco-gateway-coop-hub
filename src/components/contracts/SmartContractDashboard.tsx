
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileContract, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Globe,
  Building,
  Scale
} from 'lucide-react';

interface SmartContract {
  id: string;
  title: string;
  type: 'purchase' | 'marketing' | 'incorporation' | 'arbitration';
  status: 'active' | 'pending' | 'completed' | 'disputed';
  participants: number;
  value: number;
  progress: number;
  blockchainHash: string;
  createdAt: string;
  expiresAt: string;
}

const mockContracts: SmartContract[] = [
  {
    id: '1',
    title: 'Group Purchase - Tech Equipment',
    type: 'purchase',
    status: 'active',
    participants: 15,
    value: 250000,
    progress: 75,
    blockchainHash: '0x1234...abcd',
    createdAt: '2024-01-15',
    expiresAt: '2024-02-15'
  },
  {
    id: '2',
    title: 'Marketing Campaign - Green Energy',
    type: 'marketing',
    status: 'active',
    participants: 8,
    value: 150000,
    progress: 60,
    blockchainHash: '0x5678...efgh',
    createdAt: '2024-01-20',
    expiresAt: '2024-03-20'
  },
  {
    id: '3',
    title: 'Company Formation - Tech Startup',
    type: 'incorporation',
    status: 'pending',
    participants: 5,
    value: 100000,
    progress: 30,
    blockchainHash: '0x9abc...ijkl',
    createdAt: '2024-01-25',
    expiresAt: '2024-04-25'
  }
];

export function SmartContractDashboard() {
  const [contracts] = useState<SmartContract[]>(mockContracts);
  const [selectedTab, setSelectedTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'disputed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <DollarSign className="h-5 w-5" />;
      case 'marketing': return <TrendingUp className="h-5 w-5" />;
      case 'incorporation': return <Building className="h-5 w-5" />;
      case 'arbitration': return <Scale className="h-5 w-5" />;
      default: return <FileContract className="h-5 w-5" />;
    }
  };

  const totalValue = contracts.reduce((sum, contract) => sum + contract.value, 0);
  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const avgProgress = contracts.reduce((sum, contract) => sum + contract.progress, 0) / contracts.length;

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Smart Contracts Hub</CardTitle>
              <CardDescription className="text-blue-100">
                Blockchain-powered contract management system
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8" />
              <Badge className="bg-white text-blue-600">
                Ethereum Mainnet
              </Badge>
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
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Contracts</p>
                <p className="text-2xl font-bold">{activeContracts}</p>
              </div>
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold">{Math.round(avgProgress)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Participants</p>
                <p className="text-2xl font-bold">
                  {contracts.reduce((sum, c) => sum + c.participants, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contract Management Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active">Active Contracts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="deploy">Deploy New</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {contracts.map((contract) => (
              <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(contract.type)}
                      <div>
                        <CardTitle className="text-lg">{contract.title}</CardTitle>
                        <CardDescription>
                          {contract.participants} participants
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(contract.status)}>
                      {contract.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{contract.progress}%</span>
                  </div>
                  <Progress value={contract.progress} className="h-2" />
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Value:</span>
                      <span className="font-medium">${contract.value.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span>{contract.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expires:</span>
                      <span>{contract.expiresAt}</span>
                    </div>
                  </div>

                  <div className="p-2 bg-gray-50 rounded text-xs">
                    <span className="text-gray-600">Blockchain Hash:</span>
                    <br />
                    <span className="font-mono">{contract.blockchainHash}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Interact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Smart Contracts</CardTitle>
              <CardDescription>
                Contracts currently executing on the blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contracts.filter(c => c.status === 'active').map((contract) => (
                  <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getTypeIcon(contract.type)}
                      <div>
                        <h4 className="font-medium">{contract.title}</h4>
                        <p className="text-sm text-gray-600">
                          {contract.participants} participants • ${contract.value.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{contract.progress}%</div>
                        <Progress value={contract.progress} className="w-20 h-2" />
                      </div>
                      <Button size="sm">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Success Rate</span>
                    <span className="font-bold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avg Execution Time</span>
                    <span className="font-bold">3.2 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Gas Efficiency</span>
                    <span className="font-bold text-blue-600">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Ethereum Mainnet Connected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Gas Price: 15 Gwei</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Block Time: 12.5s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deploy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deploy New Smart Contract</CardTitle>
              <CardDescription>
                Create and deploy a new smart contract to the blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-24 flex-col gap-2">
                  <DollarSign className="h-6 w-6" />
                  <span>Purchase Contract</span>
                </Button>
                <Button className="h-24 flex-col gap-2" variant="outline">
                  <TrendingUp className="h-6 w-6" />
                  <span>Marketing Contract</span>
                </Button>
                <Button className="h-24 flex-col gap-2" variant="outline">
                  <Building className="h-6 w-6" />
                  <span>Incorporation Contract</span>
                </Button>
                <Button className="h-24 flex-col gap-2" variant="outline">
                  <Scale className="h-6 w-6" />
                  <span>Arbitration Contract</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
