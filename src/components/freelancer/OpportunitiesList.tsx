
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OpportunityCard, Opportunity } from './OpportunityCard';

interface OpportunitiesListProps {
  opportunities: Opportunity[];
}

export function OpportunitiesList({ opportunities }: OpportunitiesListProps) {
  return (
    <section className="py-12 container px-4 md:px-6">
      <div className="mb-8">
        <div className="relative">
          <Input
            placeholder="Search opportunities..."
            className="pl-10 pr-4 py-2 w-full md:w-1/2"
          />
          <span className="absolute left-3 top-2.5">🔍</span>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-8">
          <TabsList>
            <TabsTrigger value="all">All Opportunities</TabsTrigger>
            <TabsTrigger value="remote">Remote Only</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </div>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map(opportunity => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="remote">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Sign in to filter remote opportunities</p>
            <Button className="mt-4" onClick={() => window.location.href = '/login'}>Sign In</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Sign in to view saved jobs</p>
            <Button className="mt-4" onClick={() => window.location.href = '/login'}>Sign In</Button>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
