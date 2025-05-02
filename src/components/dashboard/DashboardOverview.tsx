
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardOverview() {
  // Mock data for the dashboard overview
  const userStats = {
    activeContracts: 3,
    pendingApprovals: 1,
    totalSpending: '$12,450',
    kycStatus: 'Verified',
  };
  
  const recentActivity = [
    { id: 1, type: 'Contract', action: 'Joined Solar Panel Bulk Purchase', date: '2025-05-01', status: 'Active' },
    { id: 2, type: 'KYC', action: 'Document Verification Completed', date: '2025-04-28', status: 'Completed' },
    { id: 3, type: 'Payment', action: 'Invoice #INV-2023-042 Paid', date: '2025-04-25', status: 'Completed' },
    { id: 4, type: 'Contract', action: 'Application to Farming Equipment Purchase', date: '2025-04-22', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export Data</Button>
          <Button className="bg-coop-green hover:bg-coop-green-dark">New Contract</Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.activeContracts}</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">Requires action</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalSpending}</div>
            <p className="text-xs text-muted-foreground">Year to date</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">KYC Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <span>✅</span>
              <span>{userStats.kycStatus}</span>
            </div>
            <p className="text-xs text-muted-foreground">All documents approved</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions with the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex items-start gap-2">
                    <div className="rounded-md bg-muted p-2">
                      {activity.type === 'Contract' ? '📝' : 
                       activity.type === 'KYC' ? '👤' : '💸'}
                    </div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                  <Badge className={
                    activity.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' :
                    activity.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    'bg-blue-100 text-blue-800 border-blue-200'
                  }>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>KYC Completion</CardTitle>
            <CardDescription>Track your verification progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Identity Verification</p>
                  <p className="text-sm font-medium">100%</p>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Address Proof</p>
                  <p className="text-sm font-medium">100%</p>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Business Documents</p>
                  <p className="text-sm font-medium">100%</p>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="rounded-lg bg-muted p-4 mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-lg">✓</span>
                  <p className="font-medium">Fully Verified</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">All your documents have been verified. You have full access to all platform features.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Contract Recommendations</CardTitle>
          <CardDescription>Based on your profile and activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="purchase">
            <TabsList className="mb-4">
              <TabsTrigger value="purchase">Group Purchase</TabsTrigger>
              <TabsTrigger value="funding">Funding</TabsTrigger>
              <TabsTrigger value="freelance">Freelance</TabsTrigger>
            </TabsList>
            <TabsContent value="purchase" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Office Equipment Bulk Order</CardTitle>
                    <Badge className="bg-green-100 text-green-800 border-green-200 mt-2">12 Members</Badge>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Joint purchase of computers and equipment at 30% discount from retail.</p>
                    <Button className="w-full mt-4 bg-coop-green hover:bg-coop-green-dark">View Details</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Sustainable Packaging Materials</CardTitle>
                    <Badge className="bg-green-100 text-green-800 border-green-200 mt-2">8 Members</Badge>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Eco-friendly packaging supplies at wholesale pricing via group purchase.</p>
                    <Button className="w-full mt-4 bg-coop-green hover:bg-coop-green-dark">View Details</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Shared Logistics Network</CardTitle>
                    <Badge className="bg-green-100 text-green-800 border-green-200 mt-2">15 Members</Badge>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Joint contract for shipping and logistics services with volume discounts.</p>
                    <Button className="w-full mt-4 bg-coop-green hover:bg-coop-green-dark">View Details</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="funding" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Urban Agricultural Cooperative</CardTitle>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="font-medium">$28,000</span>
                      <span className="text-muted-foreground">of $50,000</span>
                    </div>
                    <Progress value={56} className="h-1 mt-1" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Supporting urban farming initiatives in underserved communities.</p>
                    <Button className="w-full mt-4 bg-coop-blue hover:bg-coop-blue/90">Support Project</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Renewable Energy Co-op</CardTitle>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="font-medium">$85,000</span>
                      <span className="text-muted-foreground">of $120,000</span>
                    </div>
                    <Progress value={70} className="h-1 mt-1" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Community-owned renewable energy production and distribution.</p>
                    <Button className="w-full mt-4 bg-coop-blue hover:bg-coop-blue/90">Support Project</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="freelance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Cooperative Marketing Strategy</CardTitle>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200 mt-2">Fixed Price</Badge>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Develop marketing plan for cooperative businesses network.</p>
                    <Button className="w-full mt-4 bg-coop-brown hover:bg-coop-brown/90">Apply Now</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Sustainable Supply Chain Consultant</CardTitle>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200 mt-2">Hourly</Badge>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Help cooperatives optimize their supply chains for sustainability.</p>
                    <Button className="w-full mt-4 bg-coop-brown hover:bg-coop-brown/90">Apply Now</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
