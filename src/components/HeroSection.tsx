
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 md:py-32 overflow-hidden bg-gradient-to-b from-muted/50 to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Welcome to the Cooperative Economy Gateway
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join our platform connecting suppliers, funders, and freelancers to build a more collaborative and equitable economy.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                className="inline-flex h-10 items-center justify-center rounded-md bg-coop-green px-8 text-sm font-medium text-white shadow transition-colors hover:bg-coop-green-dark focus-visible:outline-none focus-visible:ring-1"
                onClick={() => navigate('/register')}
              >
                Join Now
              </Button>
              <Button
                variant="outline"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1"
                onClick={() => navigate('/learn-more')}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-muted md:h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop"
                alt="People collaborating"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
