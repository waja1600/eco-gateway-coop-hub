import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoleGuard, useRole } from '@/components/auth/RoleBasedAccess';
import { ArbitrationPanel } from '@/components/arbitration/ArbitrationPanel';
import { SmartContractSystem } from '@/components/contracts/SmartContractSystem';
import { FreelancerOffers } from '@/components/freelancer/FreelancerOffers';
import { SupplierOffers } from '@/components/supplier/SupplierOffers';
import { Users, FileText, Vote, Briefcase, Scale, Building, Calendar, DollarSign, Plus } from 'lucide-react';

interface GroupMember {
  id: string;
  name: string;
  email: string;
  role: 'founder' | 'member' | 'pending';
  joinedAt: string;
  avatar?: string;
}

interface GroupData {
  id: string;
  name: string;
  type: 'individual' | 'group';
  gateway: string;
  status: 'pending_review' | 'active' | 'completed' | 'cancelled';
  description: string;
  sector: string;
  country: string;
  created: string;
  targetParticipants: number;
  currentParticipants: number;
  members: GroupMember[];
}

// Mock data
const mockGroupData: GroupData = {
  id: '1',
  name: 'TechStart Software Development Coalition',
  type: 'group',
  gateway: 'group-buying',
  status: 'active',
  description: 'Collaborative group for bulk purchasing software licenses and development tools',
  sector: 'Technology',
  country: 'United States',
  created: '2024-01-15',
  targetParticipants: 8,
  currentParticipants: 5,
  members: [
    { id: '1', name: 'Ahmed Hassan', email: 'ahmed@techstart.com', role: 'founder', joinedAt: '2024-01-15' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@innovate.com', role: 'member', joinedAt: '2024-01-16' },
    { id: '3', name: 'Mike Chen', email: 'mike@devstudio.com', role: 'member', joinedAt: '2024-01-18' },
    { id: '4', name: 'Lisa Rodriguez', email: 'lisa@techflow.com', role: 'member', joinedAt: '2024-01-20' },
    { id: '5', name: 'David Kim', email: 'david@startup.com', role: 'pending', joinedAt: '2024-01-22' }
  ]
};

export default function GroupDetails() {
  const { groupId } = useParams<{ groupId: string }>();
  const { user, canManageGroup } = useRole();
  const [activeTab, setActiveTab] = useState('overview');
  const [groupData] = useState<GroupData>(mockGroupData);

  const canManage = canManageGroup(groupId || '');
  const isFounder = user?.id === '1'; // Mock check

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review': return 'bg-yellow-50 text-yellow-700';
      case 'active': return 'bg-green-50 text-green-700';
      case 'completed': return 'bg-blue-50 text-blue-700';
      case 'cancelled': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'founder': return 'bg-purple-50 text-purple-700';
      case 'member': return 'bg-blue-50 text-blue-700';
      case 'pending': return 'bg-yellow-50 text-yellow-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Group Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">{groupData.name}</CardTitle>
                  <CardDescription className="text-base mb-4">
                    {groupData.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={getStatusColor(groupData.status)}>
                      {formatStatus(groupData.status)}
                    </Badge>
                    <Badge variant="outline">{groupData.sector}</Badge>
                    <Badge variant="outline">{groupData.country}</Badge>
                    <Badge variant="outline" className="capitalize">{groupData.type} Contract</Badge>
                    {user && (
                      <Badge variant="outline" className={canManage ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"}>
                        {canManage ? 'Manager' : 'Member'}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-2">Progress</div>
                  <div className="text-2xl font-bold text-green-600">
                    {groupData.currentParticipants}/{groupData.targetParticipants}
                  </div>
                  <div className="text-sm text-gray-500">Members</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="mx-auto h-6 w-6 text-gray-600 mb-2" />
                  <div className="text-sm font-medium">Created</div>
                  <div className="text-lg font-bold">{groupData.created}</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Users className="mx-auto h-6 w-6 text-blue-600 mb-2" />
                  <div className="text-sm font-medium">Members</div>
                  <div className="text-lg font-bold text-blue-600">
                    {groupData.currentParticipants}
                  </div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Building className="mx-auto h-6 w-6 text-green-600 mb-2" />
                  <div className="text-sm font-medium">Gateway</div>
                  <div className="text-lg font-bold text-green-600 capitalize">
                    {groupData.gateway.replace('-', ' ')}
                  </div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <DollarSign className="mx-auto h-6 w-6 text-purple-600 mb-2" />
                  <div className="text-sm font-medium">Savings</div>
                  <div className="text-lg font-bold text-purple-600">$12,500</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Group Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="members" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Members
              </TabsTrigger>
              <TabsTrigger value="voting" className="flex items-center gap-1">
                <Vote className="h-4 w-4" />
                Voting
              </TabsTrigger>
              <TabsTrigger value="contracts" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Contracts
              </TabsTrigger>
              <TabsTrigger value="freelancers" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                Freelancers
              </TabsTrigger>
              <TabsTrigger value="suppliers" className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                Suppliers
              </TabsTrigger>
              <TabsTrigger value="arbitration" className="flex items-center gap-1">
                <Scale className="h-4 w-4" />
                Arbitration
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 pb-3 border-b">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">New member joined</p>
                            <p className="text-sm text-gray-600">David Kim requested to join the group</p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 pb-3 border-b">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">Contract updated</p>
                            <p className="text-sm text-gray-600">Software licensing agreement revised</p>
                            <p className="text-xs text-gray-500">1 day ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">Voting completed</p>
                            <p className="text-sm text-gray-600">Budget allocation proposal approved</p>
                            <p className="text-xs text-gray-500">3 days ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full">Invite Members</Button>
                      <Button variant="outline" className="w-full">Create Proposal</Button>
                      <Button variant="outline" className="w-full">Upload Document</Button>
                      <Button variant="outline" className="w-full">Request Arbitration</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Group Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Completion</span>
                        <span className="font-medium">62%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        3 of 5 milestones completed
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="members" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Group Members ({groupData.currentParticipants})</CardTitle>
                    <Button>Invite New Member</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupData.members.map(member => (
                      <Card key={member.id} className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={getRoleColor(member.role)}>
                                {member.role}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Joined {member.joinedAt}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="voting" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Group Voting</CardTitle>
                    <Button>Create New Proposal</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Vote className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">No active voting proposals at this time.</p>
                    <Button className="mt-4">Create First Proposal</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contracts" className="mt-6">
              <RoleGuard resource="contracts" action="read">
                <SmartContractSystem groupId={groupId || 'demo-group'} />
              </RoleGuard>
            </TabsContent>

            <TabsContent value="freelancers" className="mt-6">
              <RoleGuard resource="freelancers" action="read">
                <FreelancerOffers groupId={groupId || 'demo-group'} canManage={canManage} />
              </RoleGuard>
            </TabsContent>

            <TabsContent value="suppliers" className="mt-6">
              <RoleGuard resource="suppliers" action="read">
                <SupplierOffers groupId={groupId || 'demo-group'} canManage={canManage} />
              </RoleGuard>
            </TabsContent>

            <TabsContent value="arbitration" className="mt-6">
              <RoleGuard resource="arbitration" action="read">
                <ArbitrationPanel groupId={groupId || 'demo-group'} canRequestArbitration={canManage} />
              </RoleGuard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ModernMainLayout>
  );
}
