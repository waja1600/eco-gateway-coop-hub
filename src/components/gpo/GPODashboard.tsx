
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { MCPIntegration } from '@/components/services/MCPIntegration';
import { 
  Users, TrendingUp, DollarSign, Clock, CheckCircle, AlertTriangle,
  Building, Package, Vote, MessageSquare, Scale, Brain, Zap,
  Globe, Shield, Leaf, Star, Target, Activity
} from 'lucide-react';

interface DashboardStats {
  totalGroups: number;
  activeContracts: number;
  pendingVotes: number;
  revenueThisMonth: number;
  userGrowth: number;
  contractCompletionRate: number;
  averageNegotiationTime: number;
  mcpSystemHealth: number;
}

interface RecentActivity {
  id: string;
  type: 'group_created' | 'proposal_submitted' | 'vote_completed' | 'contract_signed';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'warning';
}

const mockStats: DashboardStats = {
  totalGroups: 156,
  activeContracts: 89,
  pendingVotes: 12,
  revenueThisMonth: 45600,
  userGrowth: 23.5,
  contractCompletionRate: 94.2,
  averageNegotiationTime: 2.3,
  mcpSystemHealth: 98.7
};

const mockActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'group_created',
    title: 'تأسيس مجموعة جديدة',
    description: 'مجموعة شراء تكنولوجيا - 6 أعضاء',
    timestamp: 'منذ 5 دقائق',
    status: 'success'
  },
  {
    id: '2',
    type: 'proposal_submitted',
    title: 'عرض جديد مقدم',
    description: 'مورد يقدم عرض توريد معدات',
    timestamp: 'منذ 15 دقيقة',
    status: 'pending'
  },
  {
    id: '3',
    type: 'vote_completed',
    title: 'تصويت مكتمل',
    description: 'قبول عرض مستقل تصميم',
    timestamp: 'منذ 30 دقيقة',
    status: 'success'
  },
  {
    id: '4',
    type: 'contract_signed',
    title: 'توقيع عقد',
    description: 'عقد تأسيس شركة محدودة',
    timestamp: 'منذ ساعة',
    status: 'success'
  }
];

export function GPODashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'group_created': return <Users className="h-4 w-4" />;
      case 'proposal_submitted': return <Package className="h-4 w-4" />;
      case 'vote_completed': return <Vote className="h-4 w-4" />;
      case 'contract_signed': return <CheckCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'warning': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم GPO</h1>
          <p className="text-gray-600">إدارة شاملة للمنصة التعاونية</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-100 text-green-800">
            <Brain className="h-3 w-3 mr-1" />
            MCP نشط
          </Badge>
          <Button size="sm">
            <Zap className="h-4 w-4 mr-2" />
            تحديث البيانات
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المجموعات النشطة</p>
                <p className="text-3xl font-bold text-blue-600">{mockStats.totalGroups}</p>
                <p className="text-sm text-green-600">+{mockStats.userGrowth}% نمو</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">العقود النشطة</p>
                <p className="text-3xl font-bold text-green-600">{mockStats.activeContracts}</p>
                <p className="text-sm text-green-600">{mockStats.contractCompletionRate}% مكتملة</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الإيرادات الشهرية</p>
                <p className="text-3xl font-bold text-purple-600">${mockStats.revenueThisMonth.toLocaleString()}</p>
                <p className="text-sm text-purple-600">+15% عن الشهر السابق</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">صحة نظام MCP</p>
                <p className="text-3xl font-bold text-orange-600">{mockStats.mcpSystemHealth}%</p>
                <p className="text-sm text-orange-600">متوسط وقت التحليل: {mockStats.averageNegotiationTime}د</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-full">
                <Brain className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="groups">المجموعات</TabsTrigger>
          <TabsTrigger value="contracts">العقود</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="system">النظام</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity Feed */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    النشاط الأخير
                  </CardTitle>
                  <CardDescription>آخر الأحداث في المنصة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg">
                        <div className={`p-2 rounded-full ${getActivityColor(activity.status)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-right">{activity.title}</h4>
                          <p className="text-sm text-gray-600 text-right">{activity.description}</p>
                          <p className="text-xs text-gray-500 text-right">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & MCP */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    إجراءات سريعة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Building className="h-4 w-4 mr-2" />
                    إنشاء مجموعة
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Package className="h-4 w-4 mr-2" />
                    استعراض العروض
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Vote className="h-4 w-4 mr-2" />
                    إجراء تصويت
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Scale className="h-4 w-4 mr-2" />
                    طلب تحكيم
                  </Button>
                </CardContent>
              </Card>

              <MCPIntegration groupId="dashboard" context="group" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Groups by Type */}
            <Card>
              <CardHeader>
                <CardTitle>توزيع المجموعات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">شراء جماعي</span>
                    <div className="flex items-center gap-2">
                      <Progress value={65} className="w-20" />
                      <span className="text-sm font-medium">65</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">تسويق تعاوني</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20" />
                      <span className="text-sm font-medium">45</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">تأسيس شركات</span>
                    <div className="flex items-center gap-2">
                      <Progress value={32} className="w-20" />
                      <span className="text-sm font-medium">32</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">مشاريع استثمارية</span>
                    <div className="flex items-center gap-2">
                      <Progress value={14} className="w-20" />
                      <span className="text-sm font-medium">14</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ESG Groups */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  مجموعات ESG
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-600">42</div>
                  <p className="text-sm text-gray-600">مشروع مستدام</p>
                  <Badge className="bg-green-100 text-green-800">
                    27% من إجمالي المجموعات
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Global Reach */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  الانتشار العالمي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">الشرق الأوسط</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">أوروبا</span>
                    <span className="text-sm font-medium">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">آسيا</span>
                    <span className="text-sm font-medium">14%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">89</div>
                <div className="text-sm text-gray-600">عقود نشطة</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">156</div>
                <div className="text-sm text-gray-600">عقود مكتملة</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-2">12</div>
                <div className="text-sm text-gray-600">في التفاوض</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">3</div>
                <div className="text-sm text-gray-600">نزاعات</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>أداء المنصة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">معدل نجاح المشاريع</span>
                    <div className="flex items-center gap-2">
                      <Progress value={94.2} className="w-20" />
                      <span className="text-sm font-medium">94.2%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">رضا المستخدمين</span>
                    <div className="flex items-center gap-2">
                      <Progress value={88.7} className="w-20" />
                      <span className="text-sm font-medium">88.7%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">كفاءة التفاوض</span>
                    <div className="flex items-center gap-2">
                      <Progress value={76.3} className="w-20" />
                      <span className="text-sm font-medium">76.3%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تحليل MCP</CardTitle>
              </CardHeader>
              <CardContent>
                <MCPIntegration groupId="analytics" context="investment" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  أمان النظام
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">حالة IPFS</span>
                    <Badge className="bg-green-100 text-green-800">متصل</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">تشفير البيانات</span>
                    <Badge className="bg-green-100 text-green-800">نشط</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">النسخ الاحتياطي</span>
                    <Badge className="bg-green-100 text-green-800">محدث</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  محرك MCP
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">معدل الاستجابة</span>
                    <span className="text-sm font-medium">1.2 ثانية</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">دقة التحليل</span>
                    <span className="text-sm font-medium">96.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">الحالة</span>
                    <Badge className="bg-green-100 text-green-800">مثلى</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  إحصائيات الأداء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">وقت التشغيل</span>
                    <span className="text-sm font-medium">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">معالجة الطلبات</span>
                    <span className="text-sm font-medium">1,234/دقيقة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">استخدام الذاكرة</span>
                    <span className="text-sm font-medium">68%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
