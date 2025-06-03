
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, DollarSign, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  status: 'active' | 'cancelled' | 'past_due';
  nextBilling: Date;
  features: string[];
}

interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'overdue';
  date: Date;
  description: string;
}

export function BillingSystem() {
  const [currentSubscription, setCurrentSubscription] = useState<Subscription>({
    id: 'sub_1',
    name: 'Professional Plan',
    price: 29.99,
    currency: 'USD',
    interval: 'monthly',
    status: 'active',
    nextBilling: new Date(2025, 0, 15),
    features: ['Unlimited Groups', 'Advanced Analytics', 'Priority Support', 'Contract Templates']
  });

  const [invoices] = useState<Invoice[]>([
    {
      id: 'inv_001',
      amount: 29.99,
      currency: 'USD',
      status: 'paid',
      date: new Date(2024, 11, 15),
      description: 'Professional Plan - December 2024'
    },
    {
      id: 'inv_002',
      amount: 29.99,
      currency: 'USD',
      status: 'paid',
      date: new Date(2024, 10, 15),
      description: 'Professional Plan - November 2024'
    }
  ]);

  const availablePlans = [
    {
      name: 'Basic',
      price: 9.99,
      currency: 'USD',
      interval: 'monthly',
      features: ['Up to 5 Groups', 'Basic Support', 'Standard Templates']
    },
    {
      name: 'Professional',
      price: 29.99,
      currency: 'USD',
      interval: 'monthly',
      features: ['Unlimited Groups', 'Advanced Analytics', 'Priority Support', 'Contract Templates']
    },
    {
      name: 'Enterprise',
      price: 99.99,
      currency: 'USD',
      interval: 'monthly',
      features: ['Everything in Pro', 'Custom Integrations', 'Dedicated Support', 'White Label']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700';
      case 'paid': return 'bg-green-50 text-green-700';
      case 'cancelled': return 'bg-red-50 text-red-700';
      case 'pending': return 'bg-yellow-50 text-yellow-700';
      case 'overdue': return 'bg-red-50 text-red-700';
      case 'past_due': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <CreditCard className="mx-auto h-12 w-12 text-blue-600 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">نظام الفواتير والاشتراكات</h1>
        <p className="text-gray-600">إدارة اشتراكاتك والفواتير</p>
      </div>

      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subscription">الاشتراك الحالي</TabsTrigger>
          <TabsTrigger value="invoices">الفواتير</TabsTrigger>
          <TabsTrigger value="plans">الخطط المتاحة</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>اشتراكك الحالي</span>
                <Badge variant="outline" className={getStatusColor(currentSubscription.status)}>
                  {currentSubscription.status === 'active' ? 'نشط' : 'ملغي'}
                </Badge>
              </CardTitle>
              <CardDescription>تفاصيل خطة الاشتراك الخاصة بك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">اسم الخطة</p>
                  <p className="font-semibold">{currentSubscription.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">السعر</p>
                  <p className="font-semibold">
                    ${currentSubscription.price}/{currentSubscription.interval === 'monthly' ? 'شهرياً' : 'سنوياً'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">الفاتورة التالية</p>
                  <p className="font-semibold">{currentSubscription.nextBilling.toLocaleDateString('ar-SA')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">العملة</p>
                  <p className="font-semibold">{currentSubscription.currency}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">المميزات المتضمنة</p>
                <div className="space-y-1">
                  {currentSubscription.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">تغيير الخطة</Button>
                <Button variant="outline">إدارة الدفع</Button>
                <Button variant="destructive">إلغاء الاشتراك</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>سجل الفواتير</CardTitle>
              <CardDescription>جميع فواتيرك السابقة والحالية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{invoice.description}</p>
                        <p className="text-sm text-gray-600">{invoice.date.toLocaleDateString('ar-SA')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold">${invoice.amount}</p>
                        <Badge variant="outline" className={getStatusColor(invoice.status)}>
                          {invoice.status === 'paid' ? 'مدفوع' : 'معلق'}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        تحميل
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((plan, index) => (
              <Card key={index} className={plan.name === currentSubscription.name ? 'ring-2 ring-blue-500' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {plan.name}
                    {plan.name === currentSubscription.name && (
                      <Badge>خطتك الحالية</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold">${plan.price}</span>
                    /{plan.interval === 'monthly' ? 'شهر' : 'سنة'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full" 
                    variant={plan.name === currentSubscription.name ? "outline" : "default"}
                    disabled={plan.name === currentSubscription.name}
                  >
                    {plan.name === currentSubscription.name ? 'خطتك الحالية' : 'اختر هذه الخطة'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
