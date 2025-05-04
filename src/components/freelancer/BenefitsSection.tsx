
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function BenefitsSection() {
  return (
    <section className="bg-muted py-12">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Why Work With Cooperatives?</h2>
          <p className="text-muted-foreground">
            Join projects that align with your values and contribute to a more equitable economy
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Benefits for Freelancers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green">✓</span>
                  <p className="text-muted-foreground text-sm">Fair rates and respectful client relationships</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green">✓</span>
                  <p className="text-muted-foreground text-sm">Work on projects with positive social and environmental impact</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green">✓</span>
                  <p className="text-muted-foreground text-sm">Opportunity to join cooperative networks and build long-term relationships</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green">✓</span>
                  <p className="text-muted-foreground text-sm">Potential path to membership in worker cooperatives</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Our Commitments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green">✓</span>
                  <p className="text-muted-foreground text-sm">Verified cooperative businesses and ethical employers</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green">✓</span>
                  <p className="text-muted-foreground text-sm">Transparent rates and project details</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green">✓</span>
                  <p className="text-muted-foreground text-sm">Secure payment processing and dispute resolution</p>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-coop-green">✓</span>
                  <p className="text-muted-foreground text-sm">Community of like-minded professionals</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
