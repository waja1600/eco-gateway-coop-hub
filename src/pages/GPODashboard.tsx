
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRole } from '@/components/auth/RoleBasedAccess';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Building, 
  Briefcase, 
  Scale, 
  FileText, 
  Vote,
  Globe,
  TrendingUp,
  Shield,
  Award,
  Clock,
  DollarSign
} from 'lucide-react';

export default function GPODashboard() {
  const { t } = useTranslation();
  const { user } = useRole();
  const navigate = useNavigate();
  const [activeStats, setActiveStats] = useState({
    totalGroups: 24,
    activeNegotiations: 12,
    completedContracts: 156,
    totalSavings: 2500000,
    activeSuppliers: 89,
    verifiedFreelancers: 145,
    pendingArbitrations: 3
  });

  const gateways = [
    {
      id: 'group-buying',
      title: t('gateways.group_buying'),
      description: 'منصة الشراء التعاوني والتفاوض الجماعي مع الموردين',
      icon: Users,
      color: 'bg-blue-500',
      activeGroups: 8,
      path: '/gateways/group-buying'
    },
    {
      id: 'cooperative-marketing',
      title: t('gateways.cooperative_marketing'),
      description: 'التسويق التعاوني والحملات المشتركة',
      icon: TrendingUp,
      color: 'bg-green-500',
      activeGroups: 5,
      path: '/gateways/cooperative-marketing'
    },
    {
      id: 'company-incorporation',
      title: t('gateways.company_incorporation'),
      description: 'تأسيس الشركات والكيانات القانونية بالمشاركة',
      icon: Building,
      color: 'bg-purple-500',
      activeGroups: 3,
      path: '/gateways/company-incorporation'
    },
    {
      id: 'suppliers-freelancers',
      title: t('gateways.suppliers_freelancers'),
      description: 'منصة الموردين والمستقلين المعتمدين',
      icon: Briefcase,
      color: 'bg-orange-500',
      activeGroups: 6,
      path: '/gateways/suppliers-freelancers'
    },
    {
      id: 'contract-verification',
      title: t('gateways.contract_verification'),
      description: 'توثيق العقود وإدارة المستندات',
      icon: FileText,
      color: 'bg-indigo-500',
      activeGroups: 4,
      path: '/gateways/contract-verification'
    },
    {
      id: 'commercial-arbitration',
      title: t('gateways.commercial_arbitration'),
      description: 'نظام التحكيم التجاري والوساطة - ORDA',
      icon: Scale,
      color: 'bg-red-500',
      activeGroups: 2,
      path: '/arbitration'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'contract_signed',
      title: 'تم توقيع عقد شراء معدات IT',
      group: 'مجموعة الشركات التقنية',
      amount: '$45,000',
      time: '2 ساعات مضت'
    },
    {
      id: 2,
      type: 'arbitration_resolved',
      title: 'تم حل نزاع تجاري',
      group: 'شركة الطاقة المتجددة',
      amount: '$12,000',
      time: '4 ساعات مضت'
    },
    {
      id: 3,
      type: 'group_formed',
      title: 'تم تكوين مجموعة جديدة',
      group: 'مجموعة التسويق الرقمي',
      members: '8 أعضاء',
      time: '6 ساعات مضت'
    }
  ];

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              منصة GPO للتفاوض التعاوني الذكي
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              نظام متكامل للعمل الجماعي بين مجموعات الأعمال، الموردين، والمستقلين
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <Award className="h-3 w-3 mr-1" />
                معايير WTO
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <Shield className="h-3 w-3 mr-1" />
                مصدقة ISO
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                <Globe className="h-3 w-3 mr-1" />
                التجارة الدولية
              </Badge>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">إجمالي المجموعات</p>
                    <p className="text-3xl font-bold text-blue-600">{activeStats.totalGroups}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">التفاوضات النشطة</p>
                    <p className="text-3xl font-bold text-green-600">{activeStats.activeNegotiations}</p>
                  </div>
                  <Vote className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">العقود المكتملة</p>
                    <p className="text-3xl font-bold text-purple-600">{activeStats.completedContracts}</p>
                  </div>
                  <FileText className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">إجمالي الوفورات</p>
                    <p className="text-3xl font-bold text-orange-600">
                      ${activeStats.totalSavings.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="gateways" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="gateways">البوابات الرئيسية</TabsTrigger>
              <TabsTrigger value="activity">النشاط الحديث</TabsTrigger>
              <TabsTrigger value="analytics">التحليلات</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>

            <TabsContent value="gateways" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gateways.map((gateway) => {
                  const IconComponent = gateway.icon;
                  return (
                    <Card key={gateway.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-lg ${gateway.color} text-white`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <Badge variant="outline">
                            {gateway.activeGroups} مجموعة نشطة
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{gateway.title}</CardTitle>
                        <CardDescription>{gateway.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          className="w-full" 
                          onClick={() => navigate(gateway.path)}
                        >
                          دخول البوابة
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>النشاط الحديث</CardTitle>
                  <CardDescription>آخر الأنشطة في النظام</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.group}</p>
                          <div className="flex items-center gap-4 mt-2">
                            {activity.amount && (
                              <span className="text-sm font-medium text-green-600">{activity.amount}</span>
                            )}
                            {activity.members && (
                              <span className="text-sm font-medium text-blue-600">{activity.members}</span>
                            )}
                            <span className="text-xs text-gray-500">{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>إحصائيات الموردين</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>الموردين النشطين</span>
                        <span className="font-bold text-blue-600">{activeStats.activeSuppliers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>المستقلين المعتمدين</span>
                        <span className="font-bold text-green-600">{activeStats.verifiedFreelancers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>قضايا التحكيم المعلقة</span>
                        <span className="font-bold text-red-600">{activeStats.pendingArbitrations}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>الأداء الشهري</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <TrendingUp className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <p className="text-lg font-medium">نمو بنسبة 23%</p>
                      <p className="text-sm text-gray-600">مقارنة بالشهر الماضي</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات النظام</CardTitle>
                  <CardDescription>إدارة إعدادات منصة GPO</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    إدارة الأدوار والصلاحيات
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    إعدادات الأمان والخصوصية
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    معايير التجارة الدولية
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    إدارة القوالب والعقود
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ModernMainLayout>
  );
}
