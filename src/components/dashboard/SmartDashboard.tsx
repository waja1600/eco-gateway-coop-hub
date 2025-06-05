
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  FileText, 
  Shield, 
  Vote, 
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

interface SmartDashboardProps {
  userRole: string;
  groupId?: string;
}

export function SmartDashboard({ userRole, groupId }: SmartDashboardProps) {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  const metrics: DashboardMetric[] = [
    {
      id: 'total_savings',
      title: 'إجمالي الوفورات',
      value: '245,000 ريال',
      change: 12.5,
      changeType: 'increase',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'green'
    },
    {
      id: 'active_contracts',
      title: 'العقود النشطة',
      value: 18,
      change: 3,
      changeType: 'increase',
      icon: <FileText className="h-5 w-5" />,
      color: 'blue'
    },
    {
      id: 'group_members',
      title: 'أعضاء المجموعة',
      value: 156,
      change: 8,
      changeType: 'increase',
      icon: <Users className="h-5 w-5" />,
      color: 'purple'
    },
    {
      id: 'governance_score',
      title: 'نقاط الحوكمة',
      value: 95,
      change: -2,
      changeType: 'decrease',
      icon: <Shield className="h-5 w-5" />,
      color: 'orange'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'contract',
      title: 'تم إبرام عقد جديد للبرمجيات',
      description: 'عقد شراء جماعي لتراخيص Microsoft Office',
      timestamp: 'منذ ساعتين',
      status: 'completed',
      amount: '45,000 ريال'
    },
    {
      id: 2,
      type: 'voting',
      title: 'تصويت نشط على مقترح التمويل',
      description: 'مقترح زيادة ميزانية التسويق للربع القادم',
      timestamp: 'منذ 4 ساعات',
      status: 'active',
      votes: '12/20'
    },
    {
      id: 3,
      type: 'arbitration',
      title: 'طلب تحكيم في النزاع #AR-2024-003',
      description: 'نزاع حول جودة المنتجات المسلمة',
      timestamp: 'منذ يوم',
      status: 'pending',
      priority: 'high'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'مراجعة عقد الموردين الجدد',
      dueDate: '2024-12-10',
      priority: 'high',
      category: 'contracts'
    },
    {
      id: 2,
      title: 'التصويت على مقترح الميزانية',
      dueDate: '2024-12-08',
      priority: 'medium',
      category: 'governance'
    },
    {
      id: 3,
      title: 'تحديث معلومات الملف الشخصي',
      dueDate: '2024-12-15',
      priority: 'low',
      category: 'profile'
    }
  ];

  const getMetricColor = (color: string) => {
    const colors = {
      green: 'text-green-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'increase': return 'text-green-600';
      case 'decrease': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'active': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700';
      case 'medium': return 'bg-yellow-50 text-yellow-700';
      case 'low': return 'bg-green-50 text-green-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">لوحة التحكم الذكية</h1>
          <p className="text-gray-600">نظرة شاملة على أنشطتك ومقاييس الأداء</p>
        </div>
        
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(period)}
            >
              {period === '7d' ? '7 أيام' : period === '30d' ? '30 يوم' : '90 يوم'}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-sm ${getChangeColor(metric.changeType)}`}>
                      {metric.changeType === 'increase' ? '+' : ''}
                      {metric.change}%
                    </span>
                    <span className="text-xs text-gray-500 mr-1">هذا الشهر</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${getMetricColor(metric.color)}`}>
                  {metric.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>النشاطات الأخيرة</CardTitle>
              <CardDescription>آخر التحديثات والأنشطة في المنصة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>{activity.timestamp}</span>
                        {activity.amount && <span className="font-medium text-green-600">{activity.amount}</span>}
                        {activity.votes && <span>{activity.votes} أصوات</span>}
                        {activity.priority && (
                          <Badge variant="outline" className={getPriorityColor(activity.priority)}>
                            {activity.priority === 'high' ? 'عالي' : 'متوسط'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>المهام القادمة</CardTitle>
              <CardDescription>المهام والمواعيد المهمة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <Badge variant="outline" className={getPriorityColor(task.priority)}>
                        {task.priority === 'high' ? 'عالي' : 
                         task.priority === 'medium' ? 'متوسط' : 'منخفض'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>استحقاق: {task.dueDate}</span>
                      <span className="capitalize">{task.category}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4" variant="outline" size="sm">
                عرض جميع المهام
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
          <CardDescription>الإجراءات الأكثر استخداماً</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <FileText className="h-5 w-5" />
              <span className="text-sm">إنشاء عقد</span>
            </Button>
            
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Vote className="h-5 w-5" />
              <span className="text-sm">إنشاء مقترح</span>
            </Button>
            
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <Users className="h-5 w-5" />
              <span className="text-sm">دعوة أعضاء</span>
            </Button>
            
            <Button className="h-20 flex flex-col gap-2" variant="outline">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm">عرض التقارير</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>تحليل الأداء</CardTitle>
          <CardDescription>رسم بياني لمؤشرات الأداء الرئيسية</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">سيتم عرض الرسوم البيانية التفاعلية هنا</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
