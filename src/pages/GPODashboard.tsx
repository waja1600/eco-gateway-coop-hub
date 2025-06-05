
import React, { useState } from 'react';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Building, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  FileText,
  BarChart3,
  Activity,
  Settings,
  Bell,
  Globe,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

export default function GPODashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalGroups: 24,
    activeMembers: 156,
    totalSavings: 245000,
    completedDeals: 18,
    pendingProposals: 7,
    arbitrationCases: 2
  };

  const recentActivity = [
    { id: 1, type: 'group_created', title: 'مجموعة جديدة للشراء الجماعي', time: '2 ساعات', status: 'success' },
    { id: 2, type: 'proposal_voted', title: 'تم التصويت على اقتراح الموردين', time: '4 ساعات', status: 'info' },
    { id: 3, type: 'contract_signed', title: 'تم توقيع عقد مع مورد التكنولوجيا', time: '6 ساعات', status: 'success' },
    { id: 4, type: 'arbitration_filed', title: 'تم رفع قضية تحكيم جديدة', time: '1 يوم', status: 'warning' },
    { id: 5, type: 'member_joined', title: 'انضمام 3 أعضاء جدد', time: '2 أيام', status: 'info' }
  ];

  const topGroups = [
    { id: 1, name: 'مجموعة موردي التكنولوجيا', members: 15, savings: 45000, status: 'active' },
    { id: 2, name: 'مجموعة التسويق التعاوني', members: 12, savings: 32000, status: 'active' },
    { id: 3, name: 'شركة الطاقة المتجددة', members: 8, savings: 28000, status: 'pending' },
    { id: 4, name: 'مجموعة المستقلين', members: 20, savings: 18000, status: 'active' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info': return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                لوحة تحكم منصة GPO
              </h1>
              <p className="text-lg text-gray-600">
                إدارة شاملة للمجموعات التعاونية والتفاوض الذكي
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                الإشعارات
                <Badge variant="destructive" className="ml-1">3</Badge>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                الإعدادات
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي المجموعات</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalGroups}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+12%</span>
                  <span className="text-gray-600 ml-1">من الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">الأعضاء النشطين</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeMembers}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-full">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+8%</span>
                  <span className="text-gray-600 ml-1">من الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي الوفورات</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalSavings.toLocaleString()} ريال</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-full">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+25%</span>
                  <span className="text-gray-600 ml-1">من الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">الصفقات المكتملة</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.completedDeals}</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-full">
                    <CheckCircle className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600">+15%</span>
                  <span className="text-gray-600 ml-1">من الشهر الماضي</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="groups">المجموعات</TabsTrigger>
              <TabsTrigger value="analytics">التحليلات</TabsTrigger>
              <TabsTrigger value="compliance">الامتثال</TabsTrigger>
              <TabsTrigger value="reports">التقارير</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      النشاط الأخير
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          {getStatusIcon(activity.status)}
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-600">منذ {activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Performing Groups */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      أفضل المجموعات أداءً
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topGroups.map((group, index) => (
                        <div key={group.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{group.name}</p>
                              <p className="text-sm text-gray-600">{group.members} عضو</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">{group.savings.toLocaleString()} ريال</p>
                            <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                              {group.status === 'active' ? 'نشط' : 'معلق'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="groups" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>إدارة المجموعات</CardTitle>
                  <CardDescription>
                    جميع المجموعات النشطة في المنصة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">سيتم عرض قائمة مفصلة بجميع المجموعات هنا</p>
                    <Button>عرض جميع المجموعات</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>أداء المنصة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">معدل نجاح الصفقات</span>
                          <span className="text-sm text-gray-600">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">رضا الأعضاء</span>
                          <span className="text-sm text-gray-600">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">نمو الأعضاء الشهري</span>
                          <span className="text-sm text-gray-600">12%</span>
                        </div>
                        <Progress value={12} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>التوزيع الجغرافي</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Globe className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600">خريطة التوزيع الجغرافي للأعضاء</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    معايير الامتثال الدولية
                  </CardTitle>
                  <CardDescription>
                    التوافق مع معايير WTO, ISO, وأفضل الممارسات الدولية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold">WTO Compliance</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        متوافق مع قواعد منظمة التجارة العالمية
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold">ISO Standards</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        يتبع معايير الأيزو الدولية
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold">GPO Best Practices</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        أفضل ممارسات منظمات الشراء الجماعي
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    التقارير والإحصائيات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">تقارير مفصلة عن أداء المنصة</p>
                    <Button>إنشاء تقرير جديد</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ModernMainLayout>
  );
}
