
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
import { MCPIntegration } from '@/components/services/MCPIntegration';
import { Users, FileText, Vote, Briefcase, Scale, Building, Calendar, DollarSign, Plus, ArrowLeft, MessageSquare } from 'lucide-react';

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
  name: 'مجموعة الشراء التعاوني للتكنولوجيا',
  type: 'group',
  gateway: 'group-buying',
  status: 'active',
  description: 'مجموعة تعاونية لشراء معدات التكنولوجيا وتراخيص البرمجيات بأسعار مخفضة للشركات الصغيرة والمتوسطة',
  sector: 'التكنولوجيا',
  country: 'المملكة العربية السعودية',
  created: '2024-01-15',
  targetParticipants: 8,
  currentParticipants: 5,
  members: [
    { id: '1', name: 'أحمد حسن', email: 'ahmed@techstart.com', role: 'founder', joinedAt: '2024-01-15' },
    { id: '2', name: 'سارة محمد', email: 'sarah@innovate.com', role: 'member', joinedAt: '2024-01-16' },
    { id: '3', name: 'محمد علي', email: 'mike@devstudio.com', role: 'member', joinedAt: '2024-01-18' },
    { id: '4', name: 'فاطمة أحمد', email: 'lisa@techflow.com', role: 'member', joinedAt: '2024-01-20' },
    { id: '5', name: 'خالد عبدالله', email: 'david@startup.com', role: 'pending', joinedAt: '2024-01-22' }
  ]
};

export default function GroupDetails() {
  const { groupId } = useParams<{ groupId: string }>();
  const { user, canManageGroup } = useRole();
  const [activeTab, setActiveTab] = useState('overview');
  const [groupData] = useState<GroupData>(mockGroupData);

  const canManage = canManageGroup(groupId || '');
  const isFounder = user?.id === '1'; // Mock check

  console.log('GroupDetails rendered for group:', groupId);

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
    const statusMap = {
      'pending_review': 'قيد المراجعة',
      'active': 'نشط',
      'completed': 'مكتمل',
      'cancelled': 'ملغي'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'founder': return 'bg-purple-50 text-purple-700';
      case 'member': return 'bg-blue-50 text-blue-700';
      case 'pending': return 'bg-yellow-50 text-yellow-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const handleJoinGroup = () => {
    console.log('Join group clicked for group:', groupId);
    window.location.href = `/groups/${groupId}/join`;
  };

  const handleBackToGroups = () => {
    console.log('Back to groups clicked');
    window.location.href = '/workspace';
  };

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Back Button */}
          <Button 
            variant="outline" 
            onClick={handleBackToGroups}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة للمجموعات
          </Button>

          {/* Group Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2 text-right">{groupData.name}</CardTitle>
                  <CardDescription className="text-base mb-4 text-right">
                    {groupData.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className={getStatusColor(groupData.status)}>
                      {formatStatus(groupData.status)}
                    </Badge>
                    <Badge variant="outline">{groupData.sector}</Badge>
                    <Badge variant="outline">{groupData.country}</Badge>
                    <Badge variant="outline" className="capitalize">{groupData.type === 'group' ? 'مجموعة' : 'فردي'}</Badge>
                    {user && (
                      <Badge variant="outline" className={canManage ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700"}>
                        {canManage ? 'مدير' : 'عضو'}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">التقدم</div>
                  <div className="text-2xl font-bold text-green-600">
                    {groupData.currentParticipants}/{groupData.targetParticipants}
                  </div>
                  <div className="text-sm text-gray-500">أعضاء</div>
                  <Button 
                    className="mt-3 bg-blue-600 hover:bg-blue-700" 
                    onClick={handleJoinGroup}
                  >
                    انضمام للمجموعة
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="mx-auto h-6 w-6 text-gray-600 mb-2" />
                  <div className="text-sm font-medium">تاريخ الإنشاء</div>
                  <div className="text-lg font-bold">{groupData.created}</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Users className="mx-auto h-6 w-6 text-blue-600 mb-2" />
                  <div className="text-sm font-medium">الأعضاء</div>
                  <div className="text-lg font-bold text-blue-600">
                    {groupData.currentParticipants}
                  </div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Building className="mx-auto h-6 w-6 text-green-600 mb-2" />
                  <div className="text-sm font-medium">البوابة</div>
                  <div className="text-lg font-bold text-green-600 capitalize">
                    {groupData.gateway.replace('-', ' ')}
                  </div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <DollarSign className="mx-auto h-6 w-6 text-purple-600 mb-2" />
                  <div className="text-sm font-medium">التوفير</div>
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
                نظرة عامة
              </TabsTrigger>
              <TabsTrigger value="members" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                الأعضاء
              </TabsTrigger>
              <TabsTrigger value="voting" className="flex items-center gap-1">
                <Vote className="h-4 w-4" />
                التصويت
              </TabsTrigger>
              <TabsTrigger value="contracts" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                العقود
              </TabsTrigger>
              <TabsTrigger value="freelancers" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                المستقلون
              </TabsTrigger>
              <TabsTrigger value="suppliers" className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                الموردون
              </TabsTrigger>
              <TabsTrigger value="arbitration" className="flex items-center gap-1">
                <Scale className="h-4 w-4" />
                التحكيم
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>النشاط الأخير</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 pb-3 border-b">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <div className="text-right">
                            <p className="font-medium">عضو جديد انضم</p>
                            <p className="text-sm text-gray-600">خالد عبدالله طلب الانضمام للمجموعة</p>
                            <p className="text-xs text-gray-500">منذ ساعتين</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 pb-3 border-b">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                          <div className="text-right">
                            <p className="font-medium">تحديث العقد</p>
                            <p className="text-sm text-gray-600">تم تعديل اتفاقية ترخيص البرمجيات</p>
                            <p className="text-xs text-gray-500">منذ يوم واحد</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                          <div className="text-right">
                            <p className="font-medium">اكتمال التصويت</p>
                            <p className="text-sm text-gray-600">تم الموافقة على اقتراح تخصيص الميزانية</p>
                            <p className="text-xs text-gray-500">منذ 3 أيام</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* MCP Integration */}
                  <MCPIntegration groupId={groupId || 'demo-group'} context="group" />
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>الإجراءات السريعة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full" onClick={handleJoinGroup}>
                        انضمام للمجموعة
                      </Button>
                      <Button variant="outline" className="w-full">
                        دعوة أعضاء
                      </Button>
                      <Button variant="outline" className="w-full">
                        إنشاء اقتراح
                      </Button>
                      <Button variant="outline" className="w-full">
                        رفع مستند
                      </Button>
                      <Button variant="outline" className="w-full">
                        طلب تحكيم
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>إحصائيات المجموعة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">الإنجاز</span>
                        <span className="font-medium">62%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                      <div className="text-xs text-gray-500 text-center">
                        3 من 5 مراحل مكتملة
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
                    <CardTitle>أعضاء المجموعة ({groupData.currentParticipants})</CardTitle>
                    <Button>دعوة عضو جديد</Button>
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
                          <div className="flex-1 text-right">
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.email}</p>
                            <div className="flex items-center gap-2 mt-1 justify-end">
                              <Badge variant="outline" className={getRoleColor(member.role)}>
                                {member.role === 'founder' ? 'مؤسس' : 
                                 member.role === 'member' ? 'عضو' : 'معلق'}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                انضم {member.joinedAt}
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
                    <CardTitle>نظام التصويت</CardTitle>
                    <Button>إنشاء اقتراح جديد</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Vote className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">لا توجد اقتراحات تصويت نشطة في الوقت الحالي.</p>
                    <Button className="mt-4">إنشاء أول اقتراح</Button>
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
