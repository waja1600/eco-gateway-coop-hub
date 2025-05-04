
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

export function BenefitsSection() {
  const isMobile = useIsMobile();
  
  return (
    <section className="bg-muted py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">Why Work With Cooperatives?</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Join projects that align with your values and contribute to a more equitable economy
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-6 md:mt-8">
            <Card>
              <CardHeader className="pb-2 md:pb-3">
                <CardTitle className="text-base md:text-lg">Benefits for Freelancers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs sm:text-sm">
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green shrink-0">✓</span>
                  <p className="text-muted-foreground">Fair rates and respectful client relationships</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green shrink-0">✓</span>
                  <p className="text-muted-foreground">Work on projects with positive social and environmental impact</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green shrink-0">✓</span>
                  <p className="text-muted-foreground">Opportunity to join cooperative networks and build long-term relationships</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green shrink-0">✓</span>
                  <p className="text-muted-foreground">Potential path to membership in worker cooperatives</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2 md:pb-3">
                <CardTitle className="text-base md:text-lg">Our Commitments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs sm:text-sm">
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green shrink-0">✓</span>
                  <p className="text-muted-foreground">Verified cooperative businesses and ethical employers</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green shrink-0">✓</span>
                  <p className="text-muted-foreground">Transparent rates and project details</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green shrink-0">✓</span>
                  <p className="text-muted-foreground">Secure payment processing and dispute resolution</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green shrink-0">✓</span>
                  <p className="text-muted-foreground">Community of like-minded professionals</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
