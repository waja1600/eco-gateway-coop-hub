
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Package, FileText, Vote, MessageSquare, TrendingUp, 
  Brain, Briefcase, Scale, DollarSign, Shield, Leaf, Star,
  Clock, CheckCircle, AlertTriangle, Activity, Globe
} from 'lucide-react';

interface SystemStats {
  activeGroups: number;
  activeContracts: number;
  pendingVotes: number;
  mcpScore: number;
  successRate: number;
  totalVolume: number;
}

export function ComprehensiveGPOSystem() {
  const [activeTab, setActiveTab] = useState('overview');

  const systemStats: SystemStats = {
    activeGroups: 42,
    activeContracts: 18,
    pendingVotes: 7,
    mcpScore: 92,
    successRate: 94,
    totalVolume: 2450000
  };

  const recentActivities = [
    { type: 'group', title: 'مجموعة جديدة: شراء معدات طبية', time: 'منذ 10 دقائق', status: 'success' },
    { type: 'contract', title: 'توقيع عقد توريد أجهزة كمبيوتر', time: 'منذ 25 دقيقة', status: 'success' },
    { type: 'vote', title: 'تصويت على قبول مورد جديد', time: 'منذ ساعة', status: 'pending' },
    { type: 'arbitration', title: 'حل نزاع تأخير تسليم', time: 'منذ ساعتين', status: 'resolved' }
  ];

  const gatewayMetrics = [
    { name: 'تأسيس المجموعات', active: 12, total: 15, efficiency: 85 },
    { name: 'تقديم العروض', active: 8, total: 12, efficiency: 92 },
    { name: 'إدارة العقود', active: 18, total: 20, efficiency: 88 },
    { name: 'التصويت الذكي', active: 7, total: 10, efficiency: 95 },
    { name: 'غرفة المناقشات', active: 25, total: 30, efficiency: 78 },
    { name: 'الاستثمار الجماعي', active: 5, total: 8, efficiency: 90 },
    { name: 'التوصيات الذكية', active: 30, total: 35, efficiency: 96 },
    { name: 'سوق الخدمات', active: 15, total: 18, efficiency: 89 },
    { name: 'التحكيم الذكي', active: 3, total: 5, efficiency: 85 }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'group': return <Users className="h-4 w-4 text-blue-600" />;
      case 'contract': return <FileText className="h-4 w-4 text-green-600" />;
      case 'vote': return <Vote className="h-4 w-4 text-purple-600" />;
      case 'arbitration': return <Scale className="h-4 w-4 text-orange-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-blue-100 text-blue-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المجموعات النشطة</p>
                <p className="text-2xl font-bold text-blue-600">{systemStats.activeGroups}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">العقود الجارية</p>
                <p className="text-2xl font-bold text-green-600">{systemStats.activeContracts}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">التصويت المعلق</p>
                <p className="text-2xl font-bold text-purple-600">{systemStats.pendingVotes}</p>
              </div>
              <Vote className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">نقاط MCP</p>
                <p className="text-2xl font-bold text-orange-600">{systemStats.mcpScore}%</p>
              </div>
              <Brain className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">معدل النجاح</p>
                <p className="text-2xl font-bold text-teal-600">{systemStats.successRate}%</p>
              </div>
              <Star className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي الحجم</p>
                <p className="text-2xl font-bold text-indigo-600">${(systemStats.totalVolume / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="gateways">البوابات</TabsTrigger>
          <TabsTrigger value="activities">النشاطات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  النشاط الأخير
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="font-medium text-right">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <Badge className={getStatusBadge(activity.status)}>
                        {activity.status === 'success' ? 'مكتمل' : 
                         activity.status === 'pending' ? 'معلق' : 'محلول'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  حالة النظام
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">أداء MCP</span>
                  <div className="flex items-center gap-2">
                    <Progress value={92} className="w-24" />
                    <span className="text-sm font-medium">92%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">شبكة IPFS</span>
                  <div className="flex items-center gap-2">
                    <Progress value={98} className="w-24" />
                    <span className="text-sm font-medium">98%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">قاعدة البيانات</span>
                  <div className="flex items-center gap-2">
                    <Progress value={95} className="w-24" />
                    <span className="text-sm font-medium">95%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">نظام الدفع</span>
                  <div className="flex items-center gap-2">
                    <Progress value={100} className="w-24" />
                    <span className="text-sm font-medium">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="gateways" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gatewayMetrics.map((gateway, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{gateway.name}</CardTitle>
                  <CardDescription>
                    {gateway.active} نشط من أصل {gateway.total}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>معدل الكفاءة</span>
                      <span className="font-medium">{gateway.efficiency}%</span>
                    </div>
                    <Progress value={gateway.efficiency} />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>نشط: {gateway.active}</span>
                      <span>إجمالي: {gateway.total}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>النشاطات حسب النوع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span>تأسيس المجموعات</span>
                    </div>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-green-600" />
                      <span>تقديم العروض</span>
                    </div>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Vote className="h-4 w-4 text-purple-600" />
                      <span>التصويت</span>
                    </div>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-orange-600" />
                      <span>التحكيم</span>
                    </div>
                    <span className="font-medium">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الأداء الأسبوعي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">+15%</div>
                    <div className="text-sm text-gray-600">زيادة في النشاط</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">8.5/10</div>
                    <div className="text-sm text-gray-600">تقييم المستخدمين</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">2.3s</div>
                    <div className="text-sm text-gray-600">متوسط زمن الاستجابة</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  تحليلات MCP المتقدمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">التوصيات الناجحة</span>
                    </div>
                    <Progress value={88} className="mb-2" />
                    <span className="text-sm text-gray-600">88% معدل قبول التوصيات</span>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">التحذيرات القانونية</span>
                    </div>
                    <Progress value={12} className="mb-2" />
                    <span className="text-sm text-gray-600">12% من المعاملات تحتاج مراجعة</span>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-medium">تحسن الأداء</span>
                    </div>
                    <Progress value={95} className="mb-2" />
                    <span className="text-sm text-gray-600">95% تحسن في سرعة المعالجة</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  النشاط العالمي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>السعودية</span>
                    <div className="flex items-center gap-2">
                      <Progress value={75} className="w-20" />
                      <span className="text-sm">35%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>الإمارات</span>
                    <div className="flex items-center gap-2">
                      <Progress value={60} className="w-20" />
                      <span className="text-sm">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>مصر</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20" />
                      <span className="text-sm">20%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>دول أخرى</span>
                    <div className="flex items-center gap-2">
                      <Progress value={30} className="w-20" />
                      <span className="text-sm">20%</span>
                    </div>
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
