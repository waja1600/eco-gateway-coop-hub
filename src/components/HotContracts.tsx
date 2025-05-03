
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContractsSection } from './contracts/ContractsSection';

export function HotContracts() {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Hot Contracts</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Explore our most active opportunities across all portals
            </p>
          </div>
        </div>

        <Tabs defaultValue="purchase" className="mt-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="purchase">Purchase Contracts</TabsTrigger>
            <TabsTrigger value="funding">Funding Calls</TabsTrigger>
            <TabsTrigger value="hiring">Hiring Contracts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="purchase">
            <ContractsSection type="purchase" />
          </TabsContent>
          
          <TabsContent value="funding">
            <ContractsSection type="funding" />
          </TabsContent>
          
          <TabsContent value="hiring">
            <ContractsSection type="hiring" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
