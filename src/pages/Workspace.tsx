
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout';
import { RoleSelector } from '@/components/gpo/RoleSelector';
import { MCPIntegration } from '@/components/services/MCPIntegration';
import { GroupCard } from '@/components/dashboard/GroupCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Package, User, Brain, TrendingUp, Target, Zap } from 'lucide-react';

const Workspace = () => {
  const { t } = useTranslation();
  const [currentRole, setCurrentRole] = useState<'member' | 'supplier' | 'freelancer'>('member');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  // Mock data for groups
  const mockGroups = [
    {
      id: 1,
      name: 'مجموعة الشراء التعاوني للتكنولوجيا',
      description: 'شراء جماعي لمعدات التكنولوجيا والبرمجيات للشركات الصغيرة',
      type: 'group' as const,
      memberCount: 12,
      category: 'التكنولوجيا',
      location: 'الرياض، السعودية',
      status: 'active' as const,
      lastActivity: 'منذ ساعتين',
      requestType: 'purchase' as const,
      votingStatus: 'open' as const,
      activeVotes: 2
    },
    {
      id: 2,
      name: 'مجموعة تسويق المنتجات الحرفية',
      description: 'تعاون في تسويق المنتجات الحرفية والتقليدية',
      type: 'group' as const,
      memberCount: 8,
      category: 'التسويق',
      location: 'دبي، الإمارات',
      status: 'active' as const,
      lastActivity: 'منذ 3 ساعات',
      requestType: 'marketing' as const,
      votingStatus: 'closed' as const,
      activeVotes: 0
    },
    {
      id: 3,
      name: 'طلب خدمات تطوير موقع إلكتروني',
      description: 'أبحث عن فريق تطوير لإنشاء موقع إلكتروني للتجارة الإلكترونية',
      type: 'solo' as const,
      memberCount: 1,
      category: 'تطوير الويب',
      location: 'القاهرة، مصر',
      status: 'pending' as const,
      lastActivity: 'منذ يوم',
      requestType: 'service' as const
    }
  ];

  return (
    <WorkspaceLayout 
      title="مساحة العمل الذكية" 
      subtitle="منصة متكاملة مع تقنيات الذكاء الاصطناعي وMCP"
    >
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-gray-600">المجموعات النشطة</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">89%</div>
                  <div className="text-sm text-gray-600">معدل النجاح</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Brain className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-gray-600">تحليلات MCP</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Target className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">156</div>
                  <div className="text-sm text-gray-600">الأهداف المحققة</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="groups">المجموعات</TabsTrigger>
            <TabsTrigger value="roles">الأدوار</TabsTrigger>
            <TabsTrigger value="mcp">تحليل MCP</TabsTrigger>
            <TabsTrigger value="workspace">مساحة العمل</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>المجموعات المتاحة</CardTitle>
                    <CardDescription>اكتشف المجموعات النشطة وانضم إليها</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockGroups.slice(0, 4).map(group => (
                        <GroupCard 
                          key={group.id} 
                          group={group} 
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      الإجراءات السريعة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" onClick={() => window.location.href = '/gateways'}>
                      تصفح البوابات
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => window.location.href = '/groups/create'}>
                      إنشاء مجموعة جديدة
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => window.location.href = '/contracts'}>
                      إدارة العقود
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => window.location.href = '/voting'}>
                      نظام التصويت
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>النشاط الأخير</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3 pb-3 border-b">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">انضمام عضو جديد</p>
                        <p className="text-xs text-gray-500">منذ دقيقتين</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pb-3 border-b">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">عرض جديد مقدم</p>
                        <p className="text-xs text-gray-500">منذ 15 دقيقة</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium">تحليل MCP مكتمل</p>
                        <p className="text-xs text-gray-500">منذ ساعة</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">إدارة المجموعات</h2>
                <p className="text-gray-600">عرض وإدارة جميع المجموعات المتاحة</p>
              </div>
              <Button onClick={() => window.location.href = '/gateways'}>
                إنشاء مجموعة جديدة
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockGroups.map(group => (
                <GroupCard 
                  key={group.id} 
                  group={group} 
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <RoleSelector 
              selectedRoles={selectedRoles}
              onRolesChange={setSelectedRoles}
              maxRoles={3}
            />
          </TabsContent>

          <TabsContent value="mcp" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MCPIntegration groupId="workspace" context="group" />
              <MCPIntegration groupId="workspace" context="supplier" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MCPIntegration groupId="workspace" context="freelancer" />
              <MCPIntegration groupId="workspace" context="arbitration" />
            </div>
          </TabsContent>

          <TabsContent value="workspace" className="space-y-6">
            {/* Role Switcher */}
            <Card>
              <CardHeader>
                <CardTitle>تبديل الدور</CardTitle>
                <CardDescription>غير دورك لعرض المحتوى المناسب</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => setCurrentRole('member')}
                    variant={currentRole === 'member' ? 'default' : 'outline'}
                    className="flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    عضو
                  </Button>
                  <Button
                    onClick={() => setCurrentRole('supplier')}
                    variant={currentRole === 'supplier' ? 'default' : 'outline'}
                    className="flex items-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    مورد
                  </Button>
                  <Button
                    onClick={() => setCurrentRole('freelancer')}
                    variant={currentRole === 'freelancer' ? 'default' : 'outline'}
                    className="flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    مستقل
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Role-specific Content */}
            {currentRole === 'member' && (
              <Card>
                <CardHeader>
                  <CardTitle>لوحة تحكم الأعضاء</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">إدارة مشاريعك والمشاركة في المجموعات</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">5</div>
                      <div className="text-sm text-blue-800">المجموعات المنضم إليها</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">12</div>
                      <div className="text-sm text-green-800">التصويتات المشاركة</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-2">89%</div>
                      <div className="text-sm text-purple-800">معدل النشاط</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentRole === 'supplier' && (
              <Card>
                <CardHeader>
                  <CardTitle>لوحة تحكم الموردين</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">إدارة عروضك ومقترحاتك</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-orange-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-2">8</div>
                      <div className="text-sm text-orange-800">العروض المقدمة</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">3</div>
                      <div className="text-sm text-green-800">العروض المقبولة</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">95%</div>
                      <div className="text-sm text-blue-800">تقييم الجودة</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentRole === 'freelancer' && (
              <Card>
                <CardHeader>
                  <CardTitle>لوحة تحكم المستقلين</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">إدارة مشاريعك والعقود</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-indigo-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-indigo-600 mb-2">6</div>
                      <div className="text-sm text-indigo-800">المشاريع النشطة</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">15</div>
                      <div className="text-sm text-green-800">المشاريع المكتملة</div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-600 mb-2">4.8</div>
                      <div className="text-sm text-yellow-800">التقييم العام</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </WorkspaceLayout>
  );
};

export default Workspace;
