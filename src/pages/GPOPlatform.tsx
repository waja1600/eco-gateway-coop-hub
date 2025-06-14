
import React from 'react';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { RoleSelector } from '@/components/gpo/RoleSelector';
import { GroupFormationPortal } from '@/components/gpo/GroupFormationPortal';
import { ProposalSubmissionPortal } from '@/components/gpo/ProposalSubmissionPortal';
import { GPODashboard } from '@/components/gpo/GPODashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building, Users, Briefcase, Scale, DollarSign, 
  Brain, Globe, Leaf, Shield 
} from 'lucide-react';

const platformFeatures = [
  {
    title: 'الشراء التعاوني',
    description: 'تجميع القوة الشرائية للحصول على أفضل الأسعار',
    icon: <Users className="h-6 w-6" />,
    color: 'bg-blue-500'
  },
  {
    title: 'التسويق التعاوني',
    description: 'حملات تسويقية مشتركة لزيادة التأثير',
    icon: <Building className="h-6 w-6" />,
    color: 'bg-green-500'
  },
  {
    title: 'تأسيس الشركات',
    description: 'خدمات قانونية متكاملة لتأسيس الشركات',
    icon: <Scale className="h-6 w-6" />,
    color: 'bg-purple-500'
  },
  {
    title: 'سوق الخدمات',
    description: 'موردين ومستقلين معتمدين عالمياً',
    icon: <Briefcase className="h-6 w-6" />,
    color: 'bg-orange-500'
  },
  {
    title: 'التمويل الجماعي',
    description: 'منصة استثمار للمشاريع الواعدة',
    icon: <DollarSign className="h-6 w-6" />,
    color: 'bg-indigo-500'
  },
  {
    title: 'التحكيم الذكي',
    description: 'نظام ORDA لحل النزاعات',
    icon: <Shield className="h-6 w-6" />,
    color: 'bg-red-500'
  }
];

export default function GPOPlatform() {
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Platform Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                منصة GPO الشاملة
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              منصة رقمية متكاملة للشراء التعاوني، التسويق المشترك، تأسيس الشركات، 
              والتمويل الجماعي مدعومة بالذكاء الاصطناعي والحوكمة اللامركزية
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Badge className="bg-green-100 text-green-800">
                <Leaf className="h-3 w-3 mr-1" />
                مشاريع ESG
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <Brain className="h-3 w-3 mr-1" />
                مدعوم بـ MCP
              </Badge>
              <Badge className="bg-purple-100 text-purple-800">
                <Shield className="h-3 w-3 mr-1" />
                أمان متقدم
              </Badge>
              <Badge className="bg-orange-100 text-orange-800">
                <Globe className="h-3 w-3 mr-1" />
                عالمي
              </Badge>
            </div>
          </div>

          {/* Platform Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${feature.color} text-white`}>
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Platform Interface */}
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
              <TabsTrigger value="groups">تكوين المجموعات</TabsTrigger>
              <TabsTrigger value="proposals">تقديم العروض</TabsTrigger>
              <TabsTrigger value="roles">إدارة الأدوار</TabsTrigger>
              <TabsTrigger value="marketplace">السوق</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <GPODashboard />
            </TabsContent>

            <TabsContent value="groups">
              <GroupFormationPortal />
            </TabsContent>

            <TabsContent value="proposals">
              <ProposalSubmissionPortal />
            </TabsContent>

            <TabsContent value="roles">
              <Card>
                <CardHeader>
                  <CardTitle>إدارة الأدوار والصلاحيات</CardTitle>
                  <CardDescription>
                    تحديد أدوارك في المنصة والصلاحيات المرتبطة بها
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RoleSelector 
                    selectedRoles={selectedRoles as any}
                    onRolesChange={setSelectedRoles as any}
                    maxRoles={3}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="marketplace">
              <Card>
                <CardHeader>
                  <CardTitle>سوق الخدمات المتكامل</CardTitle>
                  <CardDescription>
                    خدمات ثابتة بأسعار واضحة وتسليم مضمون
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="p-4 text-center">
                        <Scale className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-green-900">مراجعة العقد التأسيسي</h4>
                        <p className="text-sm text-green-700 mb-2">30 ريال - 24 ساعة</p>
                        <Badge className="bg-green-100 text-green-800 text-xs">شائع</Badge>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="p-4 text-center">
                        <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-blue-900">تقييم MCP متقدم</h4>
                        <p className="text-sm text-blue-700 mb-2">150 ريال - 48 ساعة</p>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">مميز</Badge>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-purple-200 bg-purple-50">
                      <CardContent className="p-4 text-center">
                        <Building className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-purple-900">استشارة قانونية</h4>
                        <p className="text-sm text-purple-700 mb-2">200 ريال - ساعة واحدة</p>
                        <Badge className="bg-purple-100 text-purple-800 text-xs">خبير</Badge>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Technical Architecture Info */}
          <Card className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-center">البنية التقنية المتقدمة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <h4 className="font-semibold text-gray-900">Frontend</h4>
                  <p className="text-sm text-gray-600">React + Tailwind</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Backend</h4>
                  <p className="text-sm text-gray-600">Supabase + JWT</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">التوثيق</h4>
                  <p className="text-sm text-gray-600">IPFS + ORDA</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">الذكاء الاصطناعي</h4>
                  <p className="text-sm text-gray-600">MCP Engine</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModernMainLayout>
  );
}
