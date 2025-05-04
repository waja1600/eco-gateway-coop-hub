
import React from 'react';
import { Button } from "@/components/ui/button";

export const SupplierHero = () => {
  return (
    <div className="bg-gradient-to-b from-muted/50 to-muted py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Group Purchase Portal</h1>
          <p className="text-muted-foreground md:text-xl">
            Join collective purchasing contracts to access better pricing and strengthen sustainable supply chains
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button className="bg-coop-green hover:bg-coop-green-dark">Join as Supplier</Button>
            <Button variant="outline">Create Purchase Contract</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
