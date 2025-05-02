
import React from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export function PortalButtons() {
  const navigate = useNavigate();
  
  const portals = [
    { 
      title: 'Supplier',
      description: 'Access group purchase contracts and connect with buyers',
      path: '/portals/supplier',
      color: 'bg-coop-green hover:bg-coop-green-dark',
      icon: '🏭'
    },
    { 
      title: 'Funder',
      description: 'Discover verified companies for crowdfunding opportunities',
      path: '/portals/funder',
      color: 'bg-coop-blue hover:bg-coop-blue/90',
      icon: '💰'
    },
    { 
      title: 'Freelancer',
      description: 'Find active job opportunities and connect with clients',
      path: '/portals/freelancer',
      color: 'bg-coop-brown hover:bg-coop-brown/90',
      icon: '💼'
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Choose Your Portal</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Select the portal that best matches your needs in the cooperative ecosystem
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-10 mt-8">
          {portals.map((portal) => (
            <Card key={portal.title} className="flex flex-col h-full">
              <CardHeader>
                <div className="text-4xl mb-2">{portal.icon}</div>
                <CardTitle className="text-2xl">{portal.title}</CardTitle>
                <CardDescription>{portal.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <Button 
                  className={`w-full ${portal.color} text-white`}
                  onClick={() => navigate(portal.path)}
                >
                  Enter Portal
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
