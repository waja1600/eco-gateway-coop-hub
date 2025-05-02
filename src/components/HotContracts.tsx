
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for each contract type
const purchaseContracts = [
  {
    id: 1,
    title: "Bulk Coffee Bean Purchase",
    description: "Join our cooperative purchase of fair trade coffee beans directly from farmers",
    members: 12,
    deadline: "2025-05-20",
    minAmount: "$5,000",
    status: "Active"
  },
  {
    id: 2,
    title: "Renewable Energy Equipment",
    description: "Group purchase of solar panels and equipment at wholesale prices",
    members: 8,
    deadline: "2025-06-15",
    minAmount: "$10,000",
    status: "Active"
  },
  {
    id: 3,
    title: "Organic Food Co-op Order",
    description: "Monthly bulk order of organic produce from local farmers",
    members: 24,
    deadline: "2025-05-10",
    minAmount: "$2,000",
    status: "Active"
  },
  {
    id: 4,
    title: "Ethical Manufacturing Materials",
    description: "Collaborative purchase of ethically sourced textiles and materials",
    members: 15,
    deadline: "2025-06-30",
    minAmount: "$8,000",
    status: "Active"
  }
];

const fundingCalls = [
  {
    id: 1,
    title: "Community Solar Project",
    description: "Fund a community-owned solar installation in rural areas",
    currentFunding: "$45,000",
    goal: "$120,000", 
    backers: 67,
    deadline: "2025-07-01",
    status: "Open"
  },
  {
    id: 2,
    title: "Cooperative Bakery Launch",
    description: "Support the launch of a worker-owned bakery in downtown",
    currentFunding: "$28,000",
    goal: "$50,000",
    backers: 43,
    deadline: "2025-06-15",
    status: "Open"
  },
  {
    id: 3,
    title: "Sustainable Fishing Cooperative",
    description: "Help local fishermen transition to sustainable practices",
    currentFunding: "$76,000",
    goal: "$100,000",
    backers: 91,
    deadline: "2025-08-20",
    status: "Open"
  },
  {
    id: 4,
    title: "Artisan Craft Collective",
    description: "Fund equipment and space for a craft cooperative",
    currentFunding: "$18,000",
    goal: "$40,000",
    backers: 32,
    deadline: "2025-05-30",
    status: "Open"
  }
];

const hiringContracts = [
  {
    id: 1,
    title: "Web Developer",
    description: "Full-stack developer for cooperative platform enhancements",
    duration: "3 months",
    rate: "$40-60/hr",
    location: "Remote",
    status: "Open"
  },
  {
    id: 2,
    title: "Sustainable Agriculture Consultant",
    description: "Expert to advise on sustainable farming practices for our cooperative",
    duration: "6 months",
    rate: "$80-100/hr",
    location: "Hybrid",
    status: "Open"
  },
  {
    id: 3,
    title: "Community Engagement Specialist",
    description: "Coordinate outreach and build community around our cooperative",
    duration: "Ongoing",
    rate: "$30-45/hr",
    location: "On-site",
    status: "Open"
  },
  {
    id: 4,
    title: "Financial Cooperative Advisor",
    description: "Provide guidance on cooperative financial structures and governance",
    duration: "4 months",
    rate: "$70-90/hr",
    location: "Remote",
    status: "Open"
  }
];

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
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex w-max space-x-4 p-4">
                {purchaseContracts.map((contract) => (
                  <Card key={contract.id} className="w-[350px] flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">{contract.title}</CardTitle>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          {contract.status}
                        </Badge>
                      </div>
                      <CardDescription>{contract.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Members</p>
                          <p className="font-medium">{contract.members}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Min. Amount</p>
                          <p className="font-medium">{contract.minAmount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Deadline</p>
                          <p className="font-medium">{contract.deadline}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-coop-green hover:bg-coop-green-dark">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="funding">
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex w-max space-x-4 p-4">
                {fundingCalls.map((funding) => (
                  <Card key={funding.id} className="w-[350px] flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">{funding.title}</CardTitle>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          {funding.status}
                        </Badge>
                      </div>
                      <CardDescription>{funding.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{funding.currentFunding}</span>
                          <span>{funding.goal}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className="bg-coop-blue h-2.5 rounded-full" 
                            style={{ width: `${(parseInt(funding.currentFunding.replace(/[^0-9]/g, '')) / parseInt(funding.goal.replace(/[^0-9]/g, ''))) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Backers</p>
                          <p className="font-medium">{funding.backers}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Deadline</p>
                          <p className="font-medium">{funding.deadline}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-coop-blue hover:bg-coop-blue/90">
                        Support Project
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="hiring">
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex w-max space-x-4 p-4">
                {hiringContracts.map((job) => (
                  <Card key={job.id} className="w-[350px] flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                          {job.status}
                        </Badge>
                      </div>
                      <CardDescription>{job.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium">{job.duration}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Rate</p>
                          <p className="font-medium">{job.rate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p className="font-medium">{job.location}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-coop-brown hover:bg-coop-brown/90">
                        Apply Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
