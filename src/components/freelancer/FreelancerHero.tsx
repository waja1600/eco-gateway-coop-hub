
import React from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export function FreelancerHero() {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-gradient-to-b from-muted/50 to-muted py-8 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-5xl">Freelancer Portal</h1>
          <p className="text-muted-foreground text-sm md:text-xl">
            Find meaningful work with cooperative businesses and projects that share your values
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Button className="bg-coop-brown hover:bg-coop-brown/90 w-full sm:w-auto">Join as Freelancer</Button>
            <Button variant="outline" className="w-full sm:w-auto">Post a Job</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
