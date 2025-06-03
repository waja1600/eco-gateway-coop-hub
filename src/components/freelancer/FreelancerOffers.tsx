
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, Star, Clock, DollarSign, Briefcase } from 'lucide-react';

interface FreelancerOffer {
  id: string;
  freelancerName: string;
  title: string;
  description: string;
  proposedRate: number;
  estimatedDays: number;
  rating: number;
  completedProjects: number;
  skills: string[];
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: string;
}

interface FreelancerOffersProps {
  groupId: string;
  canManage: boolean;
}

const mockOffers: FreelancerOffer[] = [
  {
    id: '1',
    freelancerName: 'Sarah Johnson',
    title: 'Full-Stack Developer',
    description: 'I can help develop the platform features with React and Node.js experience',
    proposedRate: 75,
    estimatedDays: 14,
    rating: 4.9,
    completedProjects: 23,
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    status: 'pending',
    submittedAt: '2024-01-15'
  },
  {
    id: '2',
    freelancerName: 'Ahmed Hassan',
    title: 'UI/UX Designer',
    description: 'Specialized in creating modern, user-friendly interfaces for business platforms',
    proposedRate: 60,
    estimatedDays: 10,
    rating: 4.8,
    completedProjects: 18,
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    status: 'pending',
    submittedAt: '2024-01-16'
  }
];

export function FreelancerOffers({ groupId, canManage }: FreelancerOffersProps) {
  const [offers, setOffers] = useState<FreelancerOffer[]>(mockOffers);
  const [showOpportunityForm, setShowOpportunityForm] = useState(false);
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    description: '',
    budget: 0,
    deadline: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700';
      case 'accepted': return 'bg-green-50 text-green-700';
      case 'rejected': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const handleAcceptOffer = (offerId: string) => {
    setOffers(offers.map(offer => 
      offer.id === offerId ? { ...offer, status: 'accepted' } : offer
    ));
  };

  const handleRejectOffer = (offerId: string) => {
    setOffers(offers.map(offer => 
      offer.id === offerId ? { ...offer, status: 'rejected' } : offer
    ));
  };

  const handlePostOpportunity = () => {
    if (!newOpportunity.title || !newOpportunity.description) return;
    
    // In real app, this would create a new opportunity posting
    console.log('New opportunity posted:', newOpportunity);
    setNewOpportunity({ title: '', description: '', budget: 0, deadline: '' });
    setShowOpportunityForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Freelancer Offers</h2>
          <p className="text-gray-600">Review and manage freelancer proposals for your group</p>
        </div>
        {canManage && (
          <Button 
            onClick={() => setShowOpportunityForm(true)}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Post Opportunity
          </Button>
        )}
      </div>

      {/* Post Opportunity Form */}
      {showOpportunityForm && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-700">Post New Opportunity</CardTitle>
            <CardDescription>
              Create a job posting to attract qualified freelancers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <Input
                placeholder="e.g., Frontend Developer, Content Writer"
                value={newOpportunity.title}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <Textarea
                placeholder="Describe the work, requirements, and expectations"
                value={newOpportunity.description}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, description: e.target.value })}
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget ($)
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newOpportunity.budget}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, budget: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline
                </label>
                <Input
                  type="date"
                  value={newOpportunity.deadline}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, deadline: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handlePostOpportunity}>
                Post Opportunity
              </Button>
              <Button variant="outline" onClick={() => setShowOpportunityForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Freelancer Offers */}
      <div className="grid grid-cols-1 gap-6">
        {offers.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">No freelancer offers submitted yet.</p>
              <p className="text-sm text-gray-500 mb-4">
                Post opportunities to attract qualified freelancers
              </p>
            </CardContent>
          </Card>
        ) : (
          offers.map(offer => (
            <Card key={offer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-medium">
                      {offer.freelancerName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{offer.freelancerName}</CardTitle>
                      <CardDescription>{offer.title}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(offer.status)}>
                    {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{offer.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      ${offer.proposedRate}/hr
                    </div>
                    <div className="text-sm text-gray-600">Rate</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      {offer.estimatedDays}
                    </div>
                    <div className="text-sm text-gray-600">Days</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-lg font-bold text-orange-600">
                        {offer.rating}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      {offer.completedProjects}
                    </div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {offer.skills.map(skill => (
                      <Badge key={skill} variant="outline" className="bg-orange-50 text-orange-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  Submitted on {offer.submittedAt}
                </div>

                {canManage && offer.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleAcceptOffer(offer.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRejectOffer(offer.id)}
                    >
                      Reject
                    </Button>
                    <Button size="sm" variant="outline">
                      Message
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
