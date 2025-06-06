import React from 'react';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { EnhancedNavigation } from '@/components/layout/EnhancedNavigation';
import { GridBoxLayout } from '@/components/layout/GridBoxLayout';
import { ServiceCard } from '@/components/layout/ServiceCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Building, 
  Briefcase, 
  Scale, 
  FileText, 
  Vote,
  Shield,
  TrendingUp,
  Globe,
  Zap,
  Brain,
  CheckCircle
} from 'lucide-react';

export default function ModernIndex() {
  const navigate = useNavigate();

  const heroServices = [
    {
      id: 'gpo-platform',
      title: 'منصة الشراء الجماعي الذكي',
      description: 'تطبيق مبادئ WTO و ISO في التفاوض التعاوني',
      icon: <Users className="h-8 w-8" />,
      variant: 'gradient' as const,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">12,500+</div>
            <div className="text-sm text-gray-600">مجموعة نشطة</div>
          </div>
          <Button 
            className="w-full" 
            onClick={() => navigate('/gpo-dashboard')}
          >
            ابدأ الآن
          </Button>
        </div>
      )
    },
    {
      id: 'smart-contracts',
      title: 'العقود الذكية',
      description: 'نظام العقود المدعوم بالبلوك تشين',
      icon: <FileText className="h-8 w-8" />,
      variant: 'glass' as const,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">98.5%</div>
            <div className="text-sm text-gray-600">معدل النجاح</div>
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/contracts/smart')}
          >
            استكشف
          </Button>
        </div>
      )
    },
    {
      id: 'ai-governance',
      title: 'الحوكمة الذكية',
      description: 'نظام الحوكمة المدعوم بالذكاء الاصطناعي',
      icon: <Brain className="h-8 w-8" />,
      variant: 'elevated' as const,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">24/7</div>
            <div className="text-sm text-gray-600">تشغيل مستمر</div>
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/governance/advanced')}
          >
            تعرف أكثر
          </Button>
        </div>
      )
    }
  ];

  const platformFeatures = [
    {
      id: 'arbitration',
      title: 'تحكيم ORDA',
      description: 'نظام التحكيم المتقدم للنزاعات التجارية',
      icon: <Scale className="h-6 w-6" />,
      variant: 'glass' as const,
      content: (
        <div className="text-center">
          <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600">97% معدل الحل</div>
        </div>
      )
    },
    {
      id: 'suppliers',
      title: 'شبكة الموردين',
      description: 'موردين معتمدين عالمياً',
      icon: <Building className="h-6 w-6" />,
      variant: 'elevated' as const,
      content: (
        <div className="text-center">
          <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600">150+ دولة</div>
        </div>
      )
    },
    {
      id: 'freelancers',
      title: 'منصة المستقلين',
      description: 'خدمات متخصصة عالية الجودة',
      icon: <Briefcase className="h-6 w-6" />,
      variant: 'gradient' as const,
      content: (
        <div className="text-center">
          <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600">نمو مستمر</div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'الأمان المتقدم',
      description: 'حماية متعددة الطبقات',
      icon: <Shield className="h-6 w-6" />,
      variant: 'glass' as const,
      content: (
        <div className="text-center">
          <Shield className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <div className="text-sm text-gray-600">حماية 360°</div>
        </div>
      )
    }
  ];

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                منصة التفاوض التعاوني الذكي
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                نظام شامل للشراء الجماعي، التمويل التعاوني، والخدمات المتخصصة مع الذكاء الاصطناعي المتقدم
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg"
                onClick={() => navigate('/register')}
              >
                <Zap className="h-5 w-5 mr-2" />
                ابدأ مجاناً
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg"
                onClick={() => navigate('/gateways')}
              >
                استكشف البوابات
              </Button>
            </div>
          </div>

          {/* Hero Services */}
          <GridBoxLayout 
            items={heroServices}
            columns={3}
            gap={8}
          />

          {/* Enhanced Navigation */}
          <div>
            <EnhancedNavigation />
          </div>

          {/* Platform Features */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ميزات المنصة المتقدمة
              </h2>
              <p className="text-lg text-gray-600">
                تقنيات متطورة لضمان أفضل تجربة تعاونية
              </p>
            </div>
            
            <GridBoxLayout 
              items={platformFeatures}
              columns={4}
              gap={6}
            />
          </div>

          {/* Statistics */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">500K+</div>
                <div className="text-gray-600">مستخدم نشط</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">$2.5B</div>
                <div className="text-gray-600">قيمة المعاملات</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
                <div className="text-gray-600">دولة</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
                <div className="text-gray-600">وقت التشغيل</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold">
              انضم إلى ثورة التفاوض التعاوني
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              ابدأ رحلتك مع منصة شاملة تجمع بين التكنولوجيا المتقدمة والتفاوض الذكي
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4"
                onClick={() => navigate('/register')}
              >
                إنشاء حساب جديد
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4"
                onClick={() => navigate('/login')}
              >
                تسجيل الدخول
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModernMainLayout>
  );
}
