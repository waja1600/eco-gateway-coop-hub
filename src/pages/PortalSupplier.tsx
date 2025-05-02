
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const supplierContracts = [
  {
    id: 1,
    title: "Organic Coffee Beans Purchase",
    description: "Bulk purchase of organic coffee beans direct from producers",
    minOrder: "$5,000",
    deadline: "2025-06-15",
    participants: 12,
    status: "Active"
  },
  {
    id: 2,
    title: "Sustainable Packaging Materials",
    description: "Joint purchase of eco-friendly packaging supplies",
    minOrder: "$3,500",
    deadline: "2025-05-30",
    participants: 8,
    status: "Active"
  },
  {
    id: 3,
    title: "Office Equipment Bulk Purchase",
    description: "Group buy for refurbished computers and office equipment",
    minOrder: "$8,000",
    deadline: "2025-06-10",
    participants: 15,
    status: "Active"
  },
  {
    id: 4,
    title: "Sustainable Textile Materials",
    description: "Collective purchase of organic and recycled textiles",
    minOrder: "$7,500",
    deadline: "2025-06-20",
    participants: 10,
    status: "Active"
  },
  {
    id: 5,
    title: "Renewable Energy Equipment",
    description: "Group purchase for solar panels and installation equipment",
    minOrder: "$15,000",
    deadline: "2025-07-15",
    participants: 7,
    status: "Active"
  },
  {
    id: 6,
    title: "Ethical Manufacturing Tools",
    description: "Joint purchase of equipment for fair-trade manufacturing",
    minOrder: "$12,000",
    deadline: "2025-07-01",
    participants: 9,
    status: "Active"
  }
];

const PortalSupplier = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
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
                {supplierContracts.map(contract => (
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
      </main>
      <Footer />
    </div>
  );
};

export default PortalSupplier;
