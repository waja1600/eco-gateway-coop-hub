
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';

const hiringOpportunities = [
  {
    id: 1,
    title: "Full Stack Web Developer",
    description: "Build features for a cooperative platform connecting sustainable businesses",
    client: "Digital Cooperative Alliance",
    rate: "$40-60/hr",
    duration: "3-6 months",
    location: "Remote",
    skills: ["React", "Node.js", "MongoDB", "TypeScript"]
  },
  {
    id: 2,
    title: "Sustainable Business Consultant",
    description: "Help cooperatives optimize their operations for environmental and social impact",
    client: "Green Business Network",
    rate: "$75-90/hr",
    duration: "6-12 months",
    location: "Hybrid",
    skills: ["Business Strategy", "ESG", "Impact Assessment", "Sustainability"]
  },
  {
    id: 3,
    title: "Graphic Designer for Co-op Branding",
    description: "Create branding and marketing materials for a worker-owned manufacturing cooperative",
    client: "Artisan Makers Collective",
    rate: "Fixed $4,500",
    duration: "1-2 months",
    location: "Remote",
    skills: ["Branding", "Illustration", "Adobe Creative Suite", "Print Design"]
  },
  {
    id: 4,
    title: "Community Engagement Specialist",
    description: "Help build and nurture community around a food cooperative network",
    client: "Urban Food Coalition",
    rate: "$30-45/hr",
    duration: "Ongoing",
    location: "On-site",
    skills: ["Event Planning", "Social Media", "Community Building", "Marketing"]
  },
  {
    id: 5,
    title: "Cooperative Finance Specialist",
    description: "Help set up financial systems for a new housing cooperative",
    client: "Community Housing Initiative",
    rate: "$60-80/hr",
    duration: "2-3 months",
    location: "Remote",
    skills: ["Accounting", "Cooperative Finance", "QuickBooks", "Financial Planning"]
  },
  {
    id: 6,
    title: "Renewable Energy Technical Writer",
    description: "Create technical documentation for community-owned solar projects",
    client: "Solar Cooperative Network",
    rate: "$35-50/hr",
    duration: "3 months",
    location: "Remote",
    skills: ["Technical Writing", "Renewable Energy", "Documentation", "Research"]
  }
];

const PortalFreelancer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-muted/50 to-muted py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Freelancer Portal</h1>
              <p className="text-muted-foreground md:text-xl">
                Find meaningful work with cooperative businesses and projects that share your values
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button className="bg-coop-brown hover:bg-coop-brown/90">Join as Freelancer</Button>
                <Button variant="outline">Post a Job</Button>
              </div>
            </div>
          </div>
        </div>

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
                {hiringOpportunities.map(job => (
                  <Card key={job.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{job.title}</CardTitle>
                        <Badge className={
                          job.location === 'Remote' ? 'bg-green-100 text-green-800 border-green-200' :
                          job.location === 'Hybrid' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          'bg-amber-100 text-amber-800 border-amber-200'
                        }>
                          {job.location}
                        </Badge>
                      </div>
                      <CardDescription>{job.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Rate</p>
                            <p className="font-medium">{job.rate}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Duration</p>
                            <p className="font-medium">{job.duration}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-muted-foreground">Client</p>
                            <p className="font-medium">{job.client}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground text-sm mb-2">Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {job.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="bg-muted">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full flex gap-2">
                        <Button className="flex-1 bg-coop-brown hover:bg-coop-brown/90">Apply Now</Button>
                        <Button variant="outline" className="px-3">
                          ❤️
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
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
      </main>
      <Footer />
    </div>
  );
};

export default PortalFreelancer;
