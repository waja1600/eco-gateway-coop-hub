import React, { useState } from 'react';
import { ModernDashboardLayout } from '@/components/layout/ModernDashboardLayout';
import { MCPIntegration } from '@/components/services/MCPIntegration';
import { ComprehensiveGPOSystem } from '@/components/gpo/ComprehensiveGPOSystem';
import { ContractWorkflow } from '@/components/contracts/ContractWorkflow';
import { EnhancedVotingSystem } from '@/components/voting/EnhancedVotingSystem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Briefcase, Users, FileText, Brain, Vote, MessageSquare, 
  TrendingUp, Activity, Bell, Settings, Plus, Search,
  Package, Scale, DollarSign, Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Workspace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const quickActions = [
    { 
      title: 'إنشاء مجموعة جديدة', 
      description: 'ابدأ مشروع تعاوني',
      icon: <Users className="h-5 w-5" />,
      action: () => navigate('/gateways/group-formation/create'),
      color: 'blue'
    },
    { 
      title: 'تقديم عرض', 
      description: 'قدم خدماتك أو منتجاتك',
      icon: <Package className="h-5 w-5" />,
      action: () => navigate('/gpo-platform'),
      color: 'green'
    },
    { 
      title: 'طلب تحكيم', 
      description: 'حل النزاعات قانونياً',
      icon: <Scale className="h-5 w-5" />,
      action: () => navigate('/arbitration'),
      color: 'orange'
    },
    { 
      title: 'بدء تصويت', 
      description: 'اتخذ قرار جماعي',
      icon: <Vote className="h-5 w-5" />,
      action: () => navigate('/voting'),
      color: 'purple'
    }
  ];

  const myGroups = [
    {
      id: '1',
      name: 'مجموعة الشراء التقني',
      type: 'group_buying',
      members: 12,
      status: 'active',
      progress: 75,
      lastActivity: 'منذ ساعتين'
    },
    {
      id: '2', 
      name: 'تأسيس شركة ديلاوير',
      type: 'incorporation',
      members: 4,
      status: 'active',
      progress: 45,
      lastActivity: 'منذ يوم'
    },
    {
      id: '3',
      name: 'حملة تسويقية مشتركة',
      type: 'marketing',
      members: 8,
      status: 'completed',
      progress: 100,
      lastActivity: 'منذ أسبوع'
    }
  ];

  const notifications = [
    { type: 'vote', message: 'تصويت جديد: موافقة على مورد الأجهزة', time: 'منذ 5 دقائق' },
    { type: 'contract', message: 'تم توقيع عقد التوريد بنجاح', time: 'منذ 30 دقيقة' },
    { type: 'mcp', message: 'تحذير MCP: مراجعة شروط العقد الجديد', time: 'منذ ساعة' },
    { type: 'group', message: 'عضو جديد انضم لمجموعة الشراء', time: 'منذ ساعتين' }
  ];

  return (
    <ModernDashboardLayout 
      title="مساحة العمل الذكية" 
      subtitle="مركز التحكم الشامل لجميع أنشطة GPO"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">مساحة العمل</h1>
            <p className="text-gray-600 mt-1">إدارة شاملة لجميع مشاريعك ونشاطاتك</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              بحث
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              التنبيهات
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              جديد
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-${action.color}-100 rounded-lg`}>
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{action.title}</h4>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </div>
                </div>
                <Button 
                  className="w-full mt-3" 
                  size="sm" 
                  onClick={action.action}
                  variant="outline"
                >
                  انتقال
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="groups">مجموعاتي</TabsTrigger>
            <TabsTrigger value="contracts">العقود</TabsTrigger>
            <TabsTrigger value="voting">التصويت</TabsTrigger>
            <TabsTrigger value="mcp">MCP</TabsTrigger>
            <TabsTrigger value="system">النظام</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* My Groups Summary */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      مجموعاتي ({myGroups.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {myGroups.map((group) => (
                        <div key={group.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold">{group.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{group.members} عضو</Badge>
                              <Badge className={group.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                                {group.status === 'active' ? 'نشط' : 'مكتمل'}
                              </Badge>
                              <span className="text-xs text-gray-500">{group.lastActivity}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{group.progress}%</div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => navigate(`/groups/${group.id}`)}
                            >
                              عرض
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    التنبيهات الأخيرة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map((notification, index) => (
                      <div key={index} className="p-3 border border-gray-100 rounded-lg">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myGroups.map((group) => (
                <Card key={group.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <CardDescription>{group.members} أعضاء</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">التقدم</span>
                        <span className="font-medium">{group.progress}%</span>
                      </div>
                      {/* ... keep existing code for progress bar and other group details */}
                      <Button 
                        className="w-full"
                        onClick={() => navigate(`/groups/${group.id}`)}
                      >
                        عرض التفاصيل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <ContractWorkflow contractId="contract-123" type="supply" />
          </TabsContent>

          <TabsContent value="voting" className="space-y-6">
            <EnhancedVotingSystem />
          </TabsContent>

          <TabsContent value="mcp" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MCPIntegration groupId="general" context="group" />
              <MCPIntegration groupId="general" context="investment" />
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <ComprehensiveGPOSystem />
          </TabsContent>
        </Tabs>
      </div>
    </ModernDashboardLayout>
  );
}
