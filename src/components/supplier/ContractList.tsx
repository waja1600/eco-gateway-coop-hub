
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Contract {
  id: number;
  title: string;
  description: string;
  minOrder: string;
  deadline: string;
  participants: number;
  status: string;
}

interface ContractListProps {
  contracts: Contract[];
}

export const ContractList = ({ contracts }: ContractListProps) => {
  return (
    <section className="py-12 container px-4 md:px-6">
      <Tabs defaultValue="active" className="w-full">
        <div className="flex justify-between items-center mb-8">
          <TabsList>
            <TabsTrigger value="active">Active Contracts</TabsTrigger>
            <TabsTrigger value="past">Past Contracts</TabsTrigger>
            <TabsTrigger value="my">My Contracts</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </div>
        
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contracts.map(contract => (
              <Card key={contract.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{contract.title}</CardTitle>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {contract.status}
                    </Badge>
                  </div>
                  <CardDescription>{contract.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Minimum Order</p>
                      <p className="font-medium">{contract.minOrder}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Deadline</p>
                      <p className="font-medium">{contract.deadline}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Participants</p>
                      <p className="font-medium">{contract.participants}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-coop-green hover:bg-coop-green-dark">Join Contract</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Sign in to view past contracts</p>
            <Button className="mt-4" onClick={() => window.location.href = '/login'}>Sign In</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="my">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Sign in to view your contracts</p>
            <Button className="mt-4" onClick={() => window.location.href = '/login'}>Sign In</Button>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};
