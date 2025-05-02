
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const fundingProjects = [
  {
    id: 1,
    title: "Urban Agricultural Cooperative",
    description: "Support sustainable urban farming in low-income neighborhoods",
    currentAmount: 58000,
    goalAmount: 100000,
    backers: 72,
    deadline: "2025-07-15",
    category: "Agriculture"
  },
  {
    id: 2,
    title: "Worker-Owned Tech Startup",
    description: "Fund a cooperative software development company focused on social impact",
    currentAmount: 125000,
    goalAmount: 250000,
    backers: 183,
    deadline: "2025-08-30",
    category: "Technology"
  },
  {
    id: 3,
    title: "Artisan Craft Collective",
    description: "Help traditional craft workers form a cooperative to preserve heritage skills",
    currentAmount: 32000,
    goalAmount: 50000,
    backers: 128,
    deadline: "2025-06-10",
    category: "Crafts"
  },
  {
    id: 4,
    title: "Community Solar Project",
    description: "Fund a community-owned solar installation in rural areas",
    currentAmount: 78000,
    goalAmount: 150000,
    backers: 94,
    deadline: "2025-08-01",
    category: "Energy"
  },
  {
    id: 5,
    title: "Sustainable Fishing Cooperative",
    description: "Help local fishermen transition to sustainable practices",
    currentAmount: 42000,
    goalAmount: 90000,
    backers: 67,
    deadline: "2025-07-05",
    category: "Fisheries"
  },
  {
    id: 6,
    title: "Cooperative Childcare Center",
    description: "Support the launch of an affordable, worker-owned childcare facility",
    currentAmount: 65000,
    goalAmount: 120000,
    backers: 215,
    deadline: "2025-06-20",
    category: "Education"
  }
];

const PortalFunder = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-muted/50 to-muted py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Crowdfunding Portal</h1>
              <p className="text-muted-foreground md:text-xl">
                Invest in verified cooperative businesses and projects that align with your values
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button className="bg-coop-blue hover:bg-coop-blue/90">Become a Funder</Button>
                <Button variant="outline">Submit Your Project</Button>
              </div>
            </div>
          </div>
        </div>

        <section className="py-12 container px-4 md:px-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="ending">Ending Soon</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Sort</Button>
              </div>
            </div>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fundingProjects.map(project => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="h-48 bg-muted/50 flex items-center justify-center">
                      {/* Placeholder for project image */}
                      <div className="text-4xl opacity-30">🖼️</div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{project.title}</CardTitle>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {project.category}
                        </Badge>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">${project.currentAmount.toLocaleString()}</span>
                            <span className="text-muted-foreground">of ${project.goalAmount.toLocaleString()}</span>
                          </div>
                          <Progress value={(project.currentAmount / project.goalAmount) * 100} />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Backers</p>
                            <p className="font-medium">{project.backers}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Deadline</p>
                            <p className="font-medium">{project.deadline}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-coop-blue hover:bg-coop-blue/90">Fund This Project</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trending">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Sign in to view trending projects</p>
                <Button className="mt-4" onClick={() => window.location.href = '/login'}>Sign In</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="ending">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Sign in to view projects ending soon</p>
                <Button className="mt-4" onClick={() => window.location.href = '/login'}>Sign In</Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        <section className="bg-muted py-12">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Why Fund Cooperatives?</h2>
              <p className="text-muted-foreground">
                Your investment creates impact beyond financial returns
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-left">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Community Ownership</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Support businesses that distribute ownership and profits equitably among workers and community members.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sustainable Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Cooperatives typically prioritize environmental sustainability and ethical supply chains.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Stable Returns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Cooperatives often have greater longevity and stability compared to traditional businesses.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PortalFunder;
