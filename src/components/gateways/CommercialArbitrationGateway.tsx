
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, Clock, DollarSign, Users, FileText, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ArbitrationCase {
  id: string;
  title: string;
  description: string;
  amount: number;
  parties: string[];
  arbitrator: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'appealed';
  filed: string;
  deadline: string;
  category: string;
}

const mockCases: ArbitrationCase[] = [
  {
    id: '1',
    title: 'Supply Contract Dispute',
    description: 'Disagreement over delivery terms and quality standards',
    amount: 75000,
    parties: ['TechCorp Ltd', 'ComponentSupply Inc'],
    arbitrator: 'Dr. Sarah Johnson',
    status: 'in_progress',
    filed: '2024-01-15',
    deadline: '2024-02-15',
    category: 'Commercial Contract'
  },
  {
    id: '2', 
    title: 'Partnership Dissolution',
    description: 'Asset division and liability allocation dispute',
    amount: 120000,
    parties: ['GreenTech Partners', 'Innovation Labs'],
    arbitrator: 'Prof. Michael Chen',
    status: 'pending',
    filed: '2024-01-20',
    deadline: '2024-02-20',
    category: 'Partnership'
  }
];

const arbitrationSteps = [
  'Case Filing & Payment',
  'Arbitrator Selection', 
  'Evidence Submission',
  'Hearing Schedule',
  'Decision & Award',
  'Enforcement'
];

export function CommercialArbitrationGateway() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Commercial Contract', 'Partnership', 'Employment', 'IP Dispute', 'International Trade'];

  const filteredCases = mockCases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || case_.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700';
      case 'in_progress': return 'bg-blue-50 text-blue-700';
      case 'resolved': return 'bg-green-50 text-green-700';
      case 'appealed': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <Scale className="mx-auto h-16 w-16 text-red-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Commercial Arbitration (ORDA)</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Resolve business disputes through online arbitration. Fast, fair, and cost-effective solutions with expert arbitrators.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search arbitration cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
        <Button className="bg-red-600 hover:bg-red-700">
          File New Case
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Cases</TabsTrigger>
          <TabsTrigger value="my">My Cases</TabsTrigger>
          <TabsTrigger value="arbitrators">Arbitrators</TabsTrigger>
          <TabsTrigger value="process">Process Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.map(case_ => (
              <Card key={case_.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{case_.title}</CardTitle>
                    <Badge variant="outline" className={getStatusColor(case_.status)}>
                      {formatStatus(case_.status)}
                    </Badge>
                  </div>
                  <CardDescription>{case_.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-red-600">
                        ${case_.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Dispute Amount</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-red-600">
                        {case_.parties.length}
                      </div>
                      <div className="text-sm text-gray-600">Parties</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Arbitrator: {case_.arbitrator}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Filed: {case_.filed}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>{case_.category}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my" className="mt-6">
          <div className="text-center py-12">
            <Scale className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">You haven't filed any arbitration cases yet.</p>
            <Button className="mt-4">File Your First Case</Button>
          </div>
        </TabsContent>

        <TabsContent value="arbitrators" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Dr. Sarah Johnson', 'Prof. Michael Chen', 'Ms. Emily Rodriguez'].map(arbitrator => (
              <Card key={arbitrator} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    {arbitrator}
                  </CardTitle>
                  <CardDescription>
                    Certified Commercial Arbitrator with 15+ years experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>Cases Resolved: 150+</span>
                    <span>Rating: 4.9/5</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="process" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {arbitrationSteps.map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-lg mb-4">
                    {index + 1}
                  </div>
                  <CardTitle className="text-lg">{step}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Step {index + 1} in the arbitration process
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
