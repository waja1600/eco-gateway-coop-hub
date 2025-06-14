
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, Users, DollarSign, TrendingUp, AlertTriangle,
  CheckCircle, Clock, FileText, Vote, Brain, Leaf, Globe
} from 'lucide-react';
import { Dashboard } from '@/types/gpo';

const mockDashboardData: Dashboard = {
  totalGroups: 156,
  activeContracts: 89,
  pendingVotes: 23,
  revenueThisMonth: 2847650,
  userGrowth: 15.2,
  contractCompletionRate: 94.7,
  averageNegotiationTime: 4.2,
  topPerformingCategories: ['التكنولوجيا', 'التسويق', 'الخدمات المهنية'],
  mcpSystemHealth: 98.5
};

const recentActivities = [
  {
    id: '1',
    type: 'group_created',
    title: 'تم إنشاء مجموعة جديدة',
    description: 'مجموعة شراء المعدات الطبية',
    timestamp: 'منذ 5 دقائق',
    icon: <Users className="h-4 w-4" />,
    color: 'text-blue-600'
  },
  {
    id: '2',
    type: 'contract_signed',
    title: 'تم توقيع عقد',
    description: 'عقد توريد أجهزة حاسوب - 50,000 ريال',
    timestamp: 'منذ 15 دقيقة',
    icon: <FileText className="h-4 w-4" />,
    color: 'text-green-600'
  },
  {
    id: '3',
    type: 'vote_completed',
    title: 'اكتمل التصويت',
    description: 'موافقة على عرض شركة التقنية المتقدمة',
    timestamp: 'منذ 30 دقيقة',
    icon: <Vote className="h-4 w-4" />,
    color: 'text-purple-600'
  },
  {
    id: '4',
    type: 'esg_project',
    title: 'مشروع ESG جديد',
    description: 'مشروع الطاقة المتجددة حصل على التمويل',
    timestamp: 'منذ ساعة',
    icon: <Leaf className="h-4 w-4" />,
    color: 'text-green-600'
  }
];

const contractStatuses = [
  { status: 'active', count: 45, label: 'نشط', color: 'bg-green-500' },
  { status: 'negotiating', count: 28, label: 'تفاوض', color: 'bg-yellow-500' },
  { status: 'pending', count: 16, label: 'معلق', color: 'bg-orange-500' },
  { status: 'completed', count: 234, label: 'مكتمل', color: 'bg-blue-500' }
];

export function GPODashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            لوحة تحكم GPO الرئيسية
          </h1>
          <p className="text-lg text-gray-600">
            مراقبة وإدارة جميع أنشطة المنصة
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            تصدير التقرير
          </Button>
          <Button variant="outline" size="sm">
            الإعدادات
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المجموعات</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardData.totalGroups}</div>
            <p className="text-xs text-muted-foreground">
              +{mockDashboardData.userGrowth}% من الشهر الماضي
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">العقود النشطة</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardData.activeContracts}</div>
            <p className="text-xs text-muted-foreground">
              معدل إتمام {mockDashboardData.contractCompletionRate}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الإيرادات الشهرية</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDashboardData.revenueThisMonth.toLocaleString()} ريال
            </div>
            <p className="text-xs text-muted-foreground">
              +12.5% من الشهر الماضي
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">صحة نظام MCP</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockDashboardData.mcpSystemHealth}%
            </div>
            <p className="text-xs text-muted-foreground">
              جميع الأنظمة تعمل بكفاءة
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="contracts">العقود</TabsTrigger>
          <TabsTrigger value="groups">المجموعات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="system">النظام</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>الأنشطة الأخيرة</CardTitle>
                  <CardDescription>
                    آخر الأحداث والتحديثات في المنصة
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>التصويتات المعلقة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {mockDashboardData.pendingVotes}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      تصويت في انتظار اتخاذ قرار
                    </div>
                    <Button size="sm" className="w-full">
                      مراجعة التصويتات
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الفئات الأكثر نشاطاً</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockDashboardData.topPerformingCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{category}</span>
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {contractStatuses.map((status) => (
              <Card key={status.status}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${status.color}`} />
                    <div>
                      <div className="font-semibold">{status.count}</div>
                      <div className="text-sm text-gray-600">{status.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>إدارة العقود</CardTitle>
              <CardDescription>
                مراقبة ومتابعة جميع العقود في المنصة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">متوسط وقت التفاوض</h4>
                    <p className="text-sm text-gray-600">
                      {mockDashboardData.averageNegotiationTime} أيام
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>• عقود IPFS مؤرشفة: 100%</div>
                  <div>• تقييم MCP متاح: 95%</div>
                  <div>• دعم متعدد اللغات: متاح</div>
                  <div>• تكامل مع Paddle: نشط</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إحصائيات المجموعات</CardTitle>
              <CardDescription>
                تحليل أداء وتوزيع المجموعات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">85</div>
                  <div className="text-sm text-blue-700">مجموعات شراء مشترك</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">34</div>
                  <div className="text-sm text-green-700">مجموعات تسويق تعاوني</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">23</div>
                  <div className="text-sm text-purple-700">مجموعات تأسيس شركات</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليلات متقدمة</CardTitle>
              <CardDescription>
                رؤى عميقة حول أداء المنصة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">الأداء المالي</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>رسوم المنصة</span>
                      <span className="font-medium">142,500 ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span>رسوم KYC</span>
                      <span className="font-medium">28,750 ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span>رسوم التأسيس</span>
                      <span className="font-medium">95,200 ريال</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">مؤشرات الجودة</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>رضا المستخدمين</span>
                      <span className="font-medium text-green-600">4.8/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>معدل إتمام العقود</span>
                      <span className="font-medium text-green-600">94.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>وقت الاستجابة</span>
                      <span className="font-medium text-green-600">< 2 ساعة</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  نظام MCP
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>حالة النظام</span>
                  <Badge className="bg-green-100 text-green-800">نشط</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>دقة التحليل</span>
                  <span className="font-medium">98.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>وقت الاستجابة</span>
                  <span className="font-medium">< 1s</span>
                </div>
                <Button size="sm" className="w-full">
                  تحديث النماذج
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  الأنظمة المتكاملة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'IPFS', status: 'متصل', color: 'text-green-600' },
                  { name: 'SnapDAO', status: 'متصل', color: 'text-green-600' },
                  { name: 'Loomio', status: 'متصل', color: 'text-green-600' },
                  { name: 'Paddle', status: 'متصل', color: 'text-green-600' },
                  { name: 'Zulip', status: 'متصل', color: 'text-green-600' }
                ].map((system) => (
                  <div key={system.name} className="flex items-center justify-between">
                    <span className="text-sm">{system.name}</span>
                    <span className={`text-xs font-medium ${system.color}`}>
                      {system.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
