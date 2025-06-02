
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Star, MapPin, Clock, DollarSign, User, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Supplier {
  id: string;
  name: string;
  company: string;
  category: string;
  description: string;
  rating: number;
  location: string;
  hourlyRate?: number;
  projectRate?: number;
  availability: 'available' | 'busy' | 'unavailable';
  skills: string[];
  type: 'supplier' | 'freelancer';
  verified: boolean;
}

const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    company: 'GreenFarms Supply Co.',
    category: 'Agriculture & Food',
    description: 'Organic produce supplier with 10+ years experience in sustainable farming',
    rating: 4.8,
    location: 'Cairo, Egypt',
    projectRate: 5000,
    availability: 'available',
    skills: ['Organic Farming', 'Supply Chain', 'Quality Control'],
    type: 'supplier',
    verified: true
  },
  {
    id: '2',
    name: 'Sarah Mohamed',
    company: 'TechDesign Studio',
    category: 'Design & Technology',
    description: 'Full-stack developer and UI/UX designer specializing in web applications',
    rating: 4.9,
    location: 'Dubai, UAE',
    hourlyRate: 85,
    availability: 'available',
    skills: ['React', 'Node.js', 'UI/UX Design', 'Mobile Apps'],
    type: 'freelancer',
    verified: true
  },
  {
    id: '3',
    name: 'Hassan Al-Rashid',
    company: 'Solar Solutions MENA',
    category: 'Energy & Environment',
    description: 'Renewable energy equipment supplier and installation services',
    rating: 4.7,
    location: 'Riyadh, Saudi Arabia',
    projectRate: 15000,
    availability: 'busy',
    skills: ['Solar Installation', 'Energy Consulting', 'Project Management'],
    type: 'supplier',
    verified: true
  }
];

export function SuppliersFreelancersGateway() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = ['all', 'Agriculture & Food', 'Design & Technology', 'Energy & Environment', 'Manufacturing', 'Consulting'];
  const types = ['all', 'supplier', 'freelancer'];

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;
    const matchesType = selectedType === 'all' || supplier.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-50 text-green-700';
      case 'busy': return 'bg-yellow-50 text-yellow-700';
      case 'unavailable': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <Briefcase className="mx-auto h-16 w-16 text-orange-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Suppliers & Freelancers Gateway</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find trusted suppliers and skilled freelancers. Connect with verified professionals for your projects.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search by name, skills, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          {types.map(type => (
            <option key={type} value={type}>
              {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <Button className="bg-orange-600 hover:bg-orange-700">
          Join as Provider
        </Button>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse All</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="freelancers">Freelancers</TabsTrigger>
          <TabsTrigger value="my">My Connections</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map(supplier => (
              <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <User className="h-8 w-8 text-gray-400 bg-gray-100 rounded-full p-1" />
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {supplier.name}
                          {supplier.verified && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              Verified
                            </Badge>
                          )}
                        </CardTitle>
                        <p className="text-sm text-gray-600">{supplier.company}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getAvailabilityColor(supplier.availability)}>
                      {supplier.availability}
                    </Badge>
                  </div>
                  <CardDescription>{supplier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {renderStars(supplier.rating)}
                      <span className="ml-2 text-sm text-gray-600">({supplier.rating})</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {supplier.type}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{supplier.location}</span>
                    </div>
                    {supplier.hourlyRate && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>${supplier.hourlyRate}/hour</span>
                      </div>
                    )}
                    {supplier.projectRate && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>From ${supplier.projectRate}/project</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {supplier.skills.slice(0, 3).map(skill => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {supplier.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{supplier.skills.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      Contact
                    </Button>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.filter(s => s.type === 'supplier').map(supplier => (
              <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
                {/* Same card content as above */}
                <CardHeader>
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  <CardDescription>{supplier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="sm">Contact Supplier</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="freelancers" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.filter(s => s.type === 'freelancer').map(freelancer => (
              <Card key={freelancer.id} className="hover:shadow-lg transition-shadow">
                {/* Same card content as above */}
                <CardHeader>
                  <CardTitle className="text-lg">{freelancer.name}</CardTitle>
                  <CardDescription>{freelancer.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" size="sm">Hire Freelancer</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my" className="mt-6">
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">You haven't connected with any suppliers or freelancers yet.</p>
            <Button className="mt-4">Browse Providers</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
