
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Megaphone, Users, TrendingUp, Target, Calendar, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MarketingCampaign {
  id: string;
  title: string;
  description: string;
  budget: number;
  currentFunding: number;
  targetAudience: string;
  duration: string;
  expectedReach: string;
  participants: number;
  category: string;
  status: 'active' | 'funded' | 'running' | 'completed';
}

const mockCampaigns: MarketingCampaign[] = [
  {
    id: '1',
    title: 'Sustainable Fashion Co-op Campaign',
    description: 'Joint marketing campaign for eco-friendly fashion brands',
    budget: 50000,
    currentFunding: 35000,
    targetAudience: 'Eco-conscious consumers 25-45',
    duration: '3 months',
    expectedReach: '500K+',
    participants: 12,
    category: 'Fashion & Lifestyle',
    status: 'active'
  },
  {
    id: '2',
    title: 'Local Organic Food Coalition',
    description: 'Promote local organic food producers collectively',
    budget: 30000,
    currentFunding: 28000,
    targetAudience: 'Health-conscious families',
    duration: '2 months',
    expectedReach: '200K+',
    participants: 8,
    category: 'Food & Agriculture',
    status: 'funded'
  }
];

export function CooperativeMarketingGateway() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Fashion & Lifestyle', 'Food & Agriculture', 'Technology', 'Health & Wellness'];

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-50 text-blue-700';
      case 'funded': return 'bg-green-50 text-green-700';
      case 'running': return 'bg-yellow-50 text-yellow-700';
      case 'completed': return 'bg-gray-50 text-gray-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <Megaphone className="mx-auto h-16 w-16 text-purple-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cooperative Marketing Gateway</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Pool marketing budgets and expertise to reach wider audiences. Create powerful joint campaigns.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search marketing campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Create Campaign
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Campaigns</TabsTrigger>
          <TabsTrigger value="my">My Campaigns</TabsTrigger>
          <TabsTrigger value="running">Running</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map(campaign => (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{campaign.title}</CardTitle>
                    <Badge variant="outline" className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <CardDescription>{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        ${campaign.currentFunding.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        of ${campaign.budget.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {campaign.participants}
                      </div>
                      <div className="text-sm text-gray-600">participants</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${(campaign.currentFunding / campaign.budget) * 100}%` }}
                    ></div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span>{campaign.targetAudience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{campaign.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>Expected reach: {campaign.expectedReach}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      Join Campaign
                    </Button>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my" className="mt-6">
          <div className="text-center py-12">
            <Megaphone className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">You haven't created any marketing campaigns yet.</p>
            <Button className="mt-4">Create Your First Campaign</Button>
          </div>
        </TabsContent>

        <TabsContent value="running" className="mt-6">
          <div className="text-center py-12">
            <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">No campaigns currently running.</p>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="text-center py-12">
            <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">No completed campaigns to show.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
