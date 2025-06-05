
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  FileText, 
  CreditCard, 
  BarChart3,
  Download,
  Upload,
  Sync
} from 'lucide-react';

interface ERPIntegrationProps {
  groupId: string;
}

export function ERPIntegration({ groupId }: ERPIntegrationProps) {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  const financialData = {
    totalBudget: 50000,
    spent: 32000,
    remaining: 18000,
    savingsAchieved: 12500,
    transactions: [
      { id: '1', description: 'دفعة أولى - موردي البرمجيات', amount: 15000, date: '2024-01-15', status: 'completed' },
      { id: '2', description: 'رسوم التحكيم', amount: 2000, date: '2024-01-18', status: 'pending' },
      { id: '3', description: 'مستحقات المستقلين', amount: 8000, date: '2024-01-20', status: 'completed' }
    ],
    subscriptions: [
      { service: 'منصة GPO', amount: 299, period: 'شهري', nextPayment: '2024-02-01' },
      { service: 'خدمات التحكيم', amount: 150, period: 'شهري', nextPayment: '2024-02-15' },
      { service: 'تخزين IPFS', amount: 50, period: 'شهري', nextPayment: '2024-02-10' }
    ]
  };

  const handleSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Calculator className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <CardTitle>تكامل ERP المحاسبي</CardTitle>
              <CardDescription>
                إدارة المالية والمحاسبة المتقدمة للمجموعة
              </CardDescription>
            </div>
          </div>
          <Button 
            onClick={handleSync}
            disabled={syncStatus === 'syncing'}
            variant="outline"
            size="sm"
          >
            <Sync className={`h-4 w-4 mr-2 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            مزامنة البيانات
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="transactions">المعاملات</TabsTrigger>
            <TabsTrigger value="subscriptions">الاشتراكات</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">إجمالي الميزانية</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {financialData.totalBudget.toLocaleString()} ريال
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-red-600" />
                  <span className="font-medium">المنصرف</span>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {financialData.spent.toLocaleString()} ريال
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <span className="font-medium">المتبقي</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {financialData.remaining.toLocaleString()} ريال
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">الوفورات</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {financialData.savingsAchieved.toLocaleString()} ريال
                </div>
              </Card>
            </div>

            {/* Budget Progress */}
            <Card className="p-4">
              <h4 className="font-medium mb-4">تقدم الميزانية</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>المنصرف: {financialData.spent.toLocaleString()} ريال</span>
                  <span>{Math.round((financialData.spent / financialData.totalBudget) * 100)}%</span>
                </div>
                <Progress 
                  value={(financialData.spent / financialData.totalBudget) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-gray-600">
                  متبقي: {financialData.remaining.toLocaleString()} ريال من إجمالي {financialData.totalBudget.toLocaleString()} ريال
                </div>
              </div>
            </Card>

            {/* Savings Analysis */}
            <Card className="p-4 bg-green-50">
              <h4 className="font-medium text-green-900 mb-2">تحليل الوفورات</h4>
              <p className="text-green-800 text-sm mb-3">
                تم توفير {financialData.savingsAchieved.toLocaleString()} ريال ({Math.round((financialData.savingsAchieved / financialData.totalBudget) * 100)}%) 
                من خلال التفاوض الجماعي والشراء التعاوني.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-700">خصومات الكمية:</span>
                  <div className="font-bold">8,500 ريال</div>
                </div>
                <div>
                  <span className="text-green-700">رسوم مشتركة:</span>
                  <div className="font-bold">4,000 ريال</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">سجل المعاملات</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  تصدير
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  استيراد
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {financialData.transactions.map((transaction) => (
                <Card key={transaction.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{transaction.description}</h5>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        {transaction.amount.toLocaleString()} ريال
                      </div>
                      <Badge 
                        variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                        className={transaction.status === 'completed' ? 'bg-green-50 text-green-700' : ''}
                      >
                        {transaction.status === 'completed' ? 'مكتمل' : 'معلق'}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4">
            <h4 className="font-medium">إدارة الاشتراكات</h4>
            <div className="space-y-3">
              {financialData.subscriptions.map((sub, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium">{sub.service}</h5>
                      <p className="text-sm text-gray-600">الدفعة التالية: {sub.nextPayment}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{sub.amount} ريال</div>
                      <div className="text-sm text-gray-600">{sub.period}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-blue-50">
              <h5 className="font-medium text-blue-900 mb-2">إجمالي الاشتراكات الشهرية</h5>
              <div className="text-2xl font-bold text-blue-600">
                {financialData.subscriptions.reduce((sum, sub) => sum + sub.amount, 0)} ريال/شهر
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">التقارير المالية</h4>
              <Button className="bg-green-600 hover:bg-green-700">
                <FileText className="h-4 w-4 mr-2" />
                إنشاء تقرير جديد
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <h5 className="font-medium">تقرير الإنفاق الشهري</h5>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  تحليل مفصل للمصروفات والإيرادات خلال الشهر الحالي
                </p>
                <Button variant="outline" size="sm">
                  عرض التقرير
                </Button>
              </Card>

              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <h5 className="font-medium">تقرير الوفورات</h5>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  تحليل الوفورات المحققة من خلال الشراء التعاوني
                </p>
                <Button variant="outline" size="sm">
                  عرض التقرير
                </Button>
              </Card>

              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                  <h5 className="font-medium">تقرير التدفق النقدي</h5>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  متابعة التدفقات النقدية الداخلة والخارجة
                </p>
                <Button variant="outline" size="sm">
                  عرض التقرير
                </Button>
              </Card>

              <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <Calculator className="h-6 w-6 text-orange-600" />
                  <h5 className="font-medium">تقرير الميزانية</h5>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  مقارنة الإنفاق الفعلي مع الميزانية المخططة
                </p>
                <Button variant="outline" size="sm">
                  عرض التقرير
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
