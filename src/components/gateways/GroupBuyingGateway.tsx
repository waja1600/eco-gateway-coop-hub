
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Users, Package, DollarSign, Calendar, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GroupBuyingItem {
  id: string;
  title: string;
  description: string;
  targetQuantity: number;
  currentParticipants: number;
  pricePerUnit: number;
  category: string;
  deadline: string;
  location: string;
  organizer: string;
  status: 'active' | 'completed' | 'cancelled';
}

const mockGroupBuys: GroupBuyingItem[] = [
  {
    id: '1',
    title: 'Organic Rice Bulk Purchase',
    description: 'Premium organic basmati rice direct from farms',
    targetQuantity: 100,
    currentParticipants: 67,
    pricePerUnit: 45,
    category: 'Food & Agriculture',
    deadline: '2025-07-15',
    location: 'Cairo, Egypt',
    organizer: 'Ahmed Hassan',
    status: 'active'
  },
  {
    id: '2',
    title: 'Solar Panel Group Buy',
    description: 'High-efficiency solar panels for residential use',
    targetQuantity: 50,
    currentParticipants: 32,
    pricePerUnit: 1200,
    category: 'Energy & Environment',
    deadline: '2025-08-01',
    location: 'Dubai, UAE',
    organizer: 'Sara Mohamed',
    status: 'active'
  }
];

export function GroupBuyingGateway() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Food & Agriculture', 'Energy & Environment', 'Technology', 'Home & Garden'];

  const filteredBuys = mockGroupBuys.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <ShoppingCart className="mx-auto h-16 w-16 text-blue-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Group Buying Gateway</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join forces with others to buy in bulk and save money. Create or join group purchases for better deals.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search group buys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Create Group Buy
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Purchases</TabsTrigger>
          <TabsTrigger value="my">My Purchases</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBuys.map(item => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {item.status}
                    </Badge>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {item.currentParticipants}/{item.targetQuantity} joined
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold">${item.pricePerUnit}</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(item.currentParticipants / item.targetQuantity) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{item.deadline}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      Join Purchase
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
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">You haven't joined any group purchases yet.</p>
            <Button className="mt-4">Browse Active Purchases</Button>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">No completed purchases to show.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
