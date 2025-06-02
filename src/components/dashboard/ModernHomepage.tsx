
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GroupCard } from './GroupCard';
import { CreateGroupModal } from './CreateGroupModal';
import { Plus, Search, Filter, Users, Briefcase, DollarSign } from 'lucide-react';

const mockGroups = [
  {
    id: 1,
    name: 'Tech Suppliers Collective',
    description: 'Group purchasing of technology equipment and software licenses for small businesses.',
    type: 'group' as const,
    memberCount: 15,
    category: 'Technology',
    location: 'New York, USA',
    status: 'active' as const,
    lastActivity: '2 hours ago',
  },
  {
    id: 2,
    name: 'Green Energy Project',
    description: 'Crowdfunding renewable energy solutions for rural communities.',
    type: 'group' as const,
    memberCount: 8,
    category: 'Energy',
    location: 'Berlin, Germany',
    status: 'pending' as const,
    lastActivity: '1 day ago',
  },
  {
    id: 3,
    name: 'Solo Web Developer',
    description: 'Independent web developer seeking freelance opportunities and collaboration.',
    type: 'solo' as const,
    memberCount: 1,
    category: 'Technology',
    location: 'Remote',
    status: 'active' as const,
    lastActivity: '30 minutes ago',
  },
];

export function ModernHomepage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState(mockGroups);

  const handleCreateGroup = (groupData: any) => {
    const newGroup = {
      id: groups.length + 1,
      ...groupData,
      memberCount: groupData.type === 'solo' ? 1 : 3,
      status: 'active' as const,
      lastActivity: 'Just now',
    };
    setGroups([newGroup, ...groups]);
  };

  const handleViewGroup = (groupId: number) => {
    console.log('Viewing group:', groupId);
    // Navigate to group detail page
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupsByType = {
    all: filteredGroups,
    purchase: filteredGroups.filter(g => g.category === 'Technology' || g.category === 'Manufacturing'),
    funding: filteredGroups.filter(g => g.category === 'Energy' || g.category === 'Finance'),
    freelancer: filteredGroups.filter(g => g.type === 'solo'),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Active Cooperative Groups
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join existing groups or create your own for collective purchasing, project funding, and freelance collaboration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Group
              </Button>
              
              <div className="flex gap-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{groups.filter(g => g.type === 'group').length} Groups</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{groups.filter(g => g.type === 'solo').length} Solo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search groups by name, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Group Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all" className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              All Groups
            </TabsTrigger>
            <TabsTrigger value="purchase" className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Purchase
            </TabsTrigger>
            <TabsTrigger value="funding" className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Funding
            </TabsTrigger>
            <TabsTrigger value="freelancer" className="flex items-center">
              <Briefcase className="h-4 w-4 mr-1" />
              Freelancer
            </TabsTrigger>
          </TabsList>

          {Object.entries(groupsByType).map(([tabKey, tabGroups]) => (
            <TabsContent key={tabKey} value={tabKey}>
              {tabGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tabGroups.map((group) => (
                    <GroupCard
                      key={group.id}
                      group={group}
                      onViewGroup={handleViewGroup}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No groups found matching your criteria.</p>
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    variant="outline"
                  >
                    Create the first group
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
}
