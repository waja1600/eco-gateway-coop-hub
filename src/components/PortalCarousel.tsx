
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const portalDetails = [
  {
    id: 1,
    title: "Group Purchase Portal",
    description: "Collaborate with other businesses to make bulk purchases at discounted rates",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop",
    link: "/portals/group-purchase"
  },
  {
    id: 2,
    title: "Crowdfunding Portal",
    description: "Secure funding for your cooperative business through our network of ethical investors",
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=1740&auto=format&fit=crop",
    link: "/portals/crowdfunding"
  },
  {
    id: 3,
    title: "Freelancer Portal",
    description: "Connect with skilled freelancers or find work opportunities in the cooperative economy",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1740&auto=format&fit=crop",
    link: "/portals/freelancer"
  }
];

export function PortalCarousel() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const nextPortal = () => {
    setCurrent((current + 1) % portalDetails.length);
  };

  const prevPortal = () => {
    setCurrent((current - 1 + portalDetails.length) % portalDetails.length);
  };

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Explore Our Portals</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Learn more about our specialized portals designed to support the cooperative economy
            </p>
          </div>
        </div>
        
        <div className="relative mt-10 md:max-w-3xl lg:max-w-4xl mx-auto">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
            onClick={prevPortal}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {portalDetails.map((portal) => (
                <div 
                  key={portal.id} 
                  className="min-w-full px-4"
                >
                  <Card className="overflow-hidden">
                    <div className="h-60 overflow-hidden">
                      <img 
                        src={portal.image} 
                        alt={portal.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{portal.title}</CardTitle>
                      <CardDescription>{portal.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button 
                        className="w-full bg-coop-green hover:bg-coop-green-dark"
                        onClick={() => navigate(portal.link)}
                      >
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
            onClick={nextPortal}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <div className="flex justify-center mt-4 gap-2">
            {portalDetails.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className={`w-2 h-2 rounded-full p-0 ${
                  index === current ? 'bg-coop-green' : 'bg-muted'
                }`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
