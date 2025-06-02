
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Users, FileText, Globe, Calendar, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface IncorporationProject {
  id: string;
  companyName: string;
  businessType: string;
  jurisdiction: string;
  founders: number;
  description: string;
  estimatedCost: number;
  timeline: string;
  status: 'planning' | 'funding' | 'legal_review' | 'incorporation' | 'completed';
  completedSteps: number;
  totalSteps: number;
}

const mockProjects: IncorporationProject[] = [
  {
    id: '1',
    companyName: 'GreenTech Innovations LLC',
    businessType: 'Technology Startup',
    jurisdiction: 'Delaware, USA',
    founders: 3,
    description: 'Sustainable technology solutions for smart cities',
    estimatedCost: 15000,
    timeline: '6-8 weeks',
    status: 'legal_review',
    completedSteps: 4,
    totalSteps: 7
  },
  {
    id: '2',
    companyName: 'AgriCoop Holdings',
    businessType: 'Agricultural Cooperative',
    jurisdiction: 'Ontario, Canada',
    founders: 8,
    description: 'Farmer-owned cooperative for sustainable agriculture',
    estimatedCost: 25000,
    timeline: '10-12 weeks',
    status: 'planning',
    completedSteps: 2,
    totalSteps: 8
  }
];

const incorporationSteps = [
  'Business Plan Review',
  'Legal Structure Selection',
  'Name Reservation',
  'Documentation Preparation',
  'Legal Review',
  'Filing & Registration',
  'Compliance Setup'
];

export function CompanyIncorporationGateway() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const businessTypes = ['all', 'Technology Startup', 'Agricultural Cooperative', 'Social Enterprise', 'Manufacturing'];

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || project.businessType === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-50 text-blue-700';
      case 'funding': return 'bg-yellow-50 text-yellow-700';
      case 'legal_review': return 'bg-purple-50 text-purple-700';
      case 'incorporation': return 'bg-orange-50 text-orange-700';
      case 'completed': return 'bg-green-50 text-green-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <Building className="mx-auto h-16 w-16 text-green-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Incorporation Gateway</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Collaborate to incorporate businesses together. Share costs, expertise, and legal resources.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search incorporation projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          {businessTypes.map(type => (
            <option key={type} value={type}>
              {type === 'all' ? 'All Business Types' : type}
            </option>
          ))}
        </select>
        <Button className="bg-green-600 hover:bg-green-700">
          Start Incorporation
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="my">My Projects</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{project.companyName}</CardTitle>
                    <Badge variant="outline" className={getStatusColor(project.status)}>
                      {formatStatus(project.status)}
                    </Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        ${project.estimatedCost.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Est. Cost</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        {project.founders}
                      </div>
                      <div className="text-sm text-gray-600">Founders</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.completedSteps}/{project.totalSteps} steps</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(project.completedSteps / project.totalSteps) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>{project.businessType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>{project.jurisdiction}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{project.timeline}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      Join Project
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
            <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">You haven't joined any incorporation projects yet.</p>
            <Button className="mt-4">Start Your First Project</Button>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessTypes.slice(1).map(type => (
              <Card key={type} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    {type}
                  </CardTitle>
                  <CardDescription>
                    Pre-configured template for {type.toLowerCase()} incorporation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="text-center py-12">
            <CheckCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">No completed incorporations to show.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
