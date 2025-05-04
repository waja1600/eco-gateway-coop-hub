
import React from 'react';

export const HowItWorks = () => {
  return (
    <section className="bg-muted py-12">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">How It Works</h2>
          <p className="text-muted-foreground">
            Our group purchasing portal connects businesses to create bulk orders with greater negotiating power
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-left">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-coop-green/20 p-4 mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Join a Contract</h3>
              <p className="text-muted-foreground text-center">
                Browse available contracts and join those that match your needs
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-coop-green/20 p-4 mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Collective Negotiation</h3>
              <p className="text-muted-foreground text-center">
                As more members join, our platform negotiates better terms with suppliers
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-coop-green/20 p-4 mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Fulfill & Save</h3>
              <p className="text-muted-foreground text-center">
                When the contract closes, make your payment and receive goods at the discounted rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
