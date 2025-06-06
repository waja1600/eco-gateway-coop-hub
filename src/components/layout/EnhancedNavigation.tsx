
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Vote, 
  Shield, 
  Brain,
  Building,
  Scale,
  TrendingUp,
  Briefcase,
  Settings,
  ChevronRight,
  Home
} from 'lucide-react';

interface NavigationItem {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
  category: 'main' | 'specialized' | 'admin';
  color: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'gpo-dashboard',
    title: 'GPO Dashboard',
    titleAr: 'لوحة تحكم GPO',
    description: 'مركز التحكم الرئيسي للمجموعات والشراء الجماعي',
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: '/gpo-dashboard',
    category: 'main',
    color: 'bg-blue-500'
  },
  {
    id: 'smart-contracts',
    title: 'Smart Contracts',
    titleAr: 'العقود الذكية',
    description: 'إدارة العقود الذكية والبلوك تشين',
    icon: <FileText className="h-5 w-5" />,
    path: '/contracts/smart',
    badge: '3',
    category: 'main',
    color: 'bg-green-500'
  },
  {
    id: 'governance',
    title: 'Advanced Governance',
    titleAr: 'الحوكمة المتقدمة',
    description: 'نظام الحوكمة اللامركزي مع التصويت التربيعي',
    icon: <Vote className="h-5 w-5" />,
    path: '/governance/advanced',
    badge: '2',
    category: 'specialized',
    color: 'bg-purple-500'
  },
  {
    id: 'arbitration',
    title: 'ORDA Arbitration',
    titleAr: 'تحكيم ORDA',
    description: 'نظام التحكيم المتقدم مع الذكاء الاصطناعي',
    icon: <Scale className="h-5 w-5" />,
    path: '/arbitration/advanced',
    category: 'specialized',
    color: 'bg-red-500'
  },
  {
    id: 'supplier-portal',
    title: 'Supplier Portal',
    titleAr: 'بوابة الموردين',
    description: 'بوابة الموردين والشركات',
    icon: <Building className="h-5 w-5" />,
    path: '/portals/supplier',
    category: 'main',
    color: 'bg-orange-500'
  },
  {
    id: 'freelancer-portal',
    title: 'Freelancer Portal',
    titleAr: 'بوابة المستقلين',
    description: 'بوابة العمل الحر والخدمات المتخصصة',
    icon: <Briefcase className="h-5 w-5" />,
    path: '/portals/freelancer',
    category: 'main',
    color: 'bg-teal-500'
  },
  {
    id: 'system',
    title: 'System Management',
    titleAr: 'إدارة النظام',
    description: 'إعدادات النظام والمراقبة',
    icon: <Settings className="h-5 w-5" />,
    path: '/system',
    category: 'admin',
    color: 'bg-gray-500'
  }
];

export function EnhancedNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('main');

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const getFilteredItems = (category: string) => {
    return navigationItems.filter(item => item.category === category);
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-blue-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">التنقل الذكي</h2>
            <p className="text-gray-600">الوصول السريع لجميع أقسام المنصة</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            الرئيسية
          </Button>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="main" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              الأساسية
            </TabsTrigger>
            <TabsTrigger value="specialized" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              المتخصصة
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              الإدارية
            </TabsTrigger>
          </TabsList>

          {['main', 'specialized', 'admin'].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getFilteredItems(category).map((item) => (
                  <Card 
                    key={item.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                      isCurrentPath(item.path) 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg ${item.color} text-white`}>
                          {item.icon}
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <Badge variant="destructive" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                          {isCurrentPath(item.path) && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              نشط
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.titleAr}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {item.title}
                        </span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3">إجراءات سريعة</h3>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => navigate('/role-selection')}>
              تغيير الدور
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/gateways')}>
              البوابات
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/workspace')}>
              مساحة العمل
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/notifications')}>
              الإشعارات
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
