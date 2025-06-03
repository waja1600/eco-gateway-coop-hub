
import React from 'react';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Megaphone, Building, Briefcase, Users, TrendingUp, Globe, Star, Scale, FileCheck } from 'lucide-react';

const gateways = [
  {
    id: 'group-buying',
    title: 'Group Buying Gateway',
    description: 'Join forces with others to buy in bulk and save money. Create or join group purchases for better deals.',
    icon: ShoppingCart,
    color: 'blue',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    features: ['Bulk Discounts', 'Quality Assurance', 'Shared Shipping', 'Group Negotiation'],
    stats: { active: 24, participants: 450, savings: '35%' }
  },
  {
    id: 'cooperative-marketing',
    title: 'Cooperative Marketing Gateway',
    description: 'Pool marketing budgets and expertise to reach wider audiences. Create powerful joint campaigns.',
    icon: Megaphone,
    color: 'purple',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    features: ['Shared Budgets', 'Expert Resources', 'Wider Reach', 'Cost Efficiency'],
    stats: { active: 12, participants: 89, reach: '2M+' }
  },
  {
    id: 'company-incorporation',
    title: 'Company Incorporation Gateway',
    description: 'Collaborate to incorporate businesses together. Share costs, expertise, and legal resources.',
    icon: Building,
    color: 'green',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    borderColor: 'border-green-200',
    features: ['Legal Expertise', 'Cost Sharing', 'Compliance Support', 'Documentation'],
    stats: { active: 8, participants: 34, completed: 15 }
  },
  {
    id: 'suppliers-freelancers',
    title: 'Suppliers & Freelancers Gateway',
    description: 'Find trusted suppliers and skilled freelancers. Connect with verified professionals for your projects.',
    icon: Briefcase,
    color: 'orange',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    borderColor: 'border-orange-200',
    features: ['Verified Profiles', 'Rating System', 'Secure Payments', 'Global Network'],
    stats: { active: 156, suppliers: 89, freelancers: 67 }
  },
  {
    id: 'commercial-arbitration',
    title: 'Commercial Arbitration (ORDA)',
    description: 'Resolve business disputes through online arbitration. Fast, fair, and cost-effective solutions.',
    icon: Scale,
    color: 'red',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    borderColor: 'border-red-200',
    features: ['Expert Arbitrators', 'Digital Process', 'Binding Decisions', 'Cost Effective'],
    stats: { active: 15, resolved: 124, satisfaction: '96%' }
  },
  {
    id: 'contract-verification',
    title: 'Contract Verification & Documentation',
    description: 'Verify, document, and manage contracts with blockchain-backed security and IPFS storage.',
    icon: FileCheck,
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    borderColor: 'border-indigo-200',
    features: ['IPFS Storage', 'Digital Signatures', 'Smart Templates', 'Version Control'],
    stats: { active: 42, verified: 256, templates: 18 }
  }
];

export default function GatewaysHub() {
  const navigate = useNavigate();

  const handleGatewayClick = (gatewayId: string) => {
    navigate(`/gateways/${gatewayId}`);
  };

  return (
    <ModernMainLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container px-4 md:px-6">
            <Globe className="mx-auto h-16 w-16 text-blue-600 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              GPO Smart Platform - Cooperative Gateways Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Complete ecosystem for group purchasing, marketing cooperation, business incorporation, 
              arbitration services, and professional networking.
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>2,500+ Active Members</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>$5.2M+ in Savings</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>4.9/5 Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gateways Grid */}
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gateways.map((gateway) => {
              const Icon = gateway.icon;
              return (
                <Card 
                  key={gateway.id} 
                  className={`hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${gateway.bgColor} ${gateway.borderColor} border-2`}
                  onClick={() => handleGatewayClick(gateway.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${gateway.bgColor}`}>
                        <Icon className={`h-8 w-8 ${gateway.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{gateway.title}</CardTitle>
                        <CardDescription className="text-base">
                          {gateway.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {gateway.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className={`w-1.5 h-1.5 rounded-full ${gateway.iconColor.replace('text-', 'bg-')}`}></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Quick Stats</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(gateway.stats).map(([key, value], index) => (
                          <div key={index} className="text-center">
                            <div className={`text-lg font-bold ${gateway.iconColor}`}>
                              {value}
                            </div>
                            <div className="text-xs text-gray-500 capitalize">
                              {key.replace('_', ' ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className={`w-full ${gateway.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                                          gateway.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                                          gateway.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                                          gateway.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                                          gateway.color === 'red' ? 'bg-red-600 hover:bg-red-700' :
                                          'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGatewayClick(gateway.id);
                      }}
                    >
                      Start Now
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-50 py-12">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of businesses already leveraging our cooperative platform 
              for group purchasing, marketing, incorporation, and dispute resolution.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => navigate('/register')}>
                Get Started Today
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/governance')}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModernMainLayout>
  );
}
