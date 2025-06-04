
import React, { useState } from 'react';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MCPAgent } from '@/components/mcp/MCPAgent';
import { VotingSystem } from '@/components/voting/VotingSystem';
import { ArbitrationPanel } from '@/components/arbitration/ArbitrationPanel';
import { useRole } from '@/components/auth/RoleBasedAccess';
import { 
  Users, 
  Vote, 
  Briefcase, 
  Building, 
  Scale, 
  Bot, 
  Settings,
  Truck,
  UserCheck
} from 'lucide-react';

const mockVotingProposals = [
  {
    id: '1',
    title: 'اختيار مورد المعدات التقنية',
    description: 'التصويت على أفضل مورد لتوريد المعدات التقنية للمجموعة',
    type: 'simple' as const,
    options: ['TechSupply Co', 'Digital Solutions', 'Innovation Tech'],
    deadline: '2024-02-15',
    totalVotes: 8,
    results: { 'TechSupply Co': 5, 'Digital Solutions': 2, 'Innovation Tech': 1 },
    status: 'active' as const,
    quorum: 10,
    creator: 'أحمد حسن'
  },
  {
    id: '2', 
    title: 'اختيار مطور مستقل',
    description: 'اختيار مطور مستقل لتطوير موقع المجموعة',
    type: 'simple' as const,
    options: ['محمد علي', 'سارة أحمد', 'عمر محمود'],
    deadline: '2024-02-20',
    totalVotes: 6,
    results: { 'محمد علي': 3, 'سارة أحمد': 2, 'عمر محمود': 1 },
    status: 'active' as const,
    quorum: 8,
    creator: 'ليلى محمد'
  }
];

export default function Workspace() {
  const { user } = useRole();
  const [activeRole, setActiveRole] = useState<'member' | 'supplier' | 'freelancer'>('member');

  const handleVote = (proposalId: string, choice: string, comment?: string) => {
    console.log('تم التصويت:', { proposalId, choice, comment });
    // Here you would implement the actual voting logic
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'member': return 'bg-blue-50 text-blue-700';
      case 'supplier': return 'bg-green-50 text-green-700';
      case 'freelancer': return 'bg-purple-50 text-purple-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'member': return <Users className="h-4 w-4" />;
      case 'supplier': return <Truck className="h-4 w-4" />;
      case 'freelancer': return <UserCheck className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">مساحة العمل</h1>
              <p className="text-gray-600">إدارة مجموعاتك ومشاريعك التعاونية</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">الدور النشط:</span>
                <div className="flex gap-1">
                  {(['member', 'supplier', 'freelancer'] as const).map((role) => (
                    <Button
                      key={role}
                      size="sm"
                      variant={activeRole === role ? "default" : "outline"}
                      onClick={() => setActiveRole(role)}
                      className={activeRole === role ? getRoleBadgeColor(role) : ''}
                    >
                      {getRoleIcon(role)}
                      {role === 'member' ? 'عضو' : role === 'supplier' ? 'مورد' : 'مستقل'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Role Indicator */}
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={getRoleBadgeColor(activeRole)}>
                    {getRoleIcon(activeRole)}
                    {activeRole === 'member' ? 'عضو في المجموعة' : 
                     activeRole === 'supplier' ? 'مورد خدمات' : 'مستقل محترف'}
                  </Badge>
                  <span className="text-gray-600">
                    {activeRole === 'member' ? 'يمكنك التصويت والمشاركة في القرارات' :
                     activeRole === 'supplier' ? 'يمكنك تقديم عروض للمجموعات' :
                     'يمكنك تقديم خدماتك للمجموعات'}
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  إعدادات الدور
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                نظرة عامة
              </TabsTrigger>
              <TabsTrigger value="voting" className="flex items-center gap-1">
                <Vote className="h-4 w-4" />
                التصويت
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                المشاريع
              </TabsTrigger>
              <TabsTrigger value="arbitration" className="flex items-center gap-1">
                <Scale className="h-4 w-4" />
                التحكيم
              </TabsTrigger>
              <TabsTrigger value="mcp" className="flex items-center gap-1">
                <Bot className="h-4 w-4" />
                MCP Agent
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                التحليلات
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">المجموعات النشطة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <p className="text-xs text-gray-500">+2 هذا الشهر</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">التصويتات المفتوحة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">5</div>
                    <p className="text-xs text-gray-500">تحتاج لصوتك</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">العقود المكتملة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">28</div>
                    <p className="text-xs text-gray-500">بنجاح 100%</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">الوفورات المحققة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">$45,200</div>
                    <p className="text-xs text-gray-500">العام الحالي</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>النشاطات الأخيرة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 pb-3 border-b">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">تصويت جديد: اختيار مورد المعدات</p>
                        <p className="text-sm text-gray-600">مجموعة التقنية التعاونية</p>
                        <p className="text-xs text-gray-500">منذ ساعتين</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pb-3 border-b">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">تم قبول عرض مستقل</p>
                        <p className="text-sm text-gray-600">مشروع تطوير الموقع</p>
                        <p className="text-xs text-gray-500">أمس</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">عقد تم توقيعه</p>
                        <p className="text-sm text-gray-600">توريد معدات المكاتب</p>
                        <p className="text-xs text-gray-500">منذ 3 أيام</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>المجموعات المقترحة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">مجموعة التسويق الرقمي</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        تجمع للتسويق المشترك للشركات الناشئة
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">8 أعضاء</Badge>
                        <Button size="sm">انضم</Button>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">شراء جماعي للمواد الخام</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        توفير في تكاليف المواد الخام للمصانع
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">15 عضو</Badge>
                        <Button size="sm">انضم</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="voting" className="mt-6">
              <VotingSystem proposals={mockVotingProposals} onVote={handleVote} />
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Project cards would go here */}
                <Card>
                  <CardHeader>
                    <CardTitle>مشروع التقنية التعاونية</CardTitle>
                    <CardDescription>شراء جماعي للمعدات التقنية</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>التقدم</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Badge variant="outline">نشط</Badge>
                      <Badge variant="outline">5 أعضاء</Badge>
                    </div>
                    <Button className="w-full mt-4">عرض التفاصيل</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="arbitration" className="mt-6">
              <ArbitrationPanel 
                groupId="workspace-group" 
                canRequestArbitration={user?.role === 'admin' || user?.role === 'supervisor'} 
              />
            </TabsContent>

            <TabsContent value="mcp" className="mt-6">
              <div className="max-w-4xl mx-auto">
                <MCPAgent 
                  agentId="workspace-mcp-001"
                  agentName="مساعد مساحة العمل الذكي"
                  groupId="workspace"
                />
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>إحصائيات الأداء</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>معدل نجاح المشاريع</span>
                        <span className="font-bold text-green-600">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>متوسط وقت التسليم</span>
                        <span className="font-bold">12 يوم</span>
                      </div>
                      <div className="flex justify-between">
                        <span>تقييم الجودة</span>
                        <span className="font-bold text-blue-600">4.8/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>الوفورات المالية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">$45,200</div>
                      <p className="text-gray-600">إجمالي الوفورات هذا العام</p>
                      <div className="mt-4 text-sm text-gray-500">
                        متوسط وفورات 23% لكل مشروع
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ModernMainLayout>
  );
}
