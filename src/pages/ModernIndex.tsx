
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout';
import { GridBoxLayout } from '@/components/layout/GridBoxLayout';
import { ServiceCard } from '@/components/layout/ServiceCard';
import { BoxedContainer } from '@/components/layout/BoxedContainer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ShoppingCart, 
  Megaphone, 
  Building, 
  Users, 
  Scale, 
  FileCheck,
  Globe,
  TrendingUp,
  BarChart3,
  Vote,
  Handshake,
  Shield,
  Zap,
  Award,
  Target,
  Briefcase,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Plus
} from 'lucide-react';

export default function ModernIndex() {
  const navigate = useNavigate();

  // Main Gateway Services
  const gatewayServices = [
    {
      id: 'group-buying',
      title: 'بوابة الشراء الجماعي',
      description: 'منصة متطورة للشراء التعاوني مع ضمانات الجودة والامتثال الدولي',
      icon: <ShoppingCart className="h-6 w-6" />,
      status: 'active' as const,
      usage: 87,
      users: 245,
      rating: 4.8,
      features: ['خصومات تصل إلى 40%', 'معايير WTO', 'تأمين شامل', 'شحن مجاني'],
      onAction: () => navigate('/gateways/group-buying'),
      actionText: 'ابدأ الشراء الجماعي',
      variant: 'featured' as const
    },
    {
      id: 'cooperative-marketing',
      title: 'بوابة التسويق التعاوني',
      description: 'حملات تسويقية مشتركة بميزانيات موحدة ووصول عالمي',
      icon: <Megaphone className="h-6 w-6" />,
      status: 'active' as const,
      usage: 73,
      users: 189,
      rating: 4.6,
      features: ['ROI مضاعف', 'وصول عالمي', 'خبراء متخصصون', 'تحليلات متقدمة'],
      onAction: () => navigate('/gateways/cooperative-marketing'),
      actionText: 'انضم للحملة',
      variant: 'premium' as const
    },
    {
      id: 'company-incorporation',
      title: 'بوابة تأسيس الشركات',
      description: 'تأسيس الشركات متعدد الجنسيات مع دعم قانوني متكامل',
      icon: <Building className="h-6 w-6" />,
      status: 'active' as const,
      usage: 65,
      users: 98,
      rating: 4.9,
      features: ['خبرة قانونية', 'سرعة التأسيس', 'امتثال دولي', 'دعم مستمر'],
      onAction: () => navigate('/gateways/company-incorporation'),
      actionText: 'ابدأ التأسيس',
      variant: 'default' as const
    },
    {
      id: 'suppliers-freelancers',
      title: 'شبكة الموردين والمستقلين',
      description: 'منصة موثقة للعثور على أفضل الموردين والمستقلين المحترفين',
      icon: <Users className="h-6 w-6" />,
      status: 'active' as const,
      usage: 91,
      users: 567,
      rating: 4.7,
      features: ['تحقق KYC', 'تقييمات موثقة', 'دفع آمن', 'ضمان الجودة'],
      onAction: () => navigate('/gateways/suppliers-freelancers'),
      actionText: 'تصفح الشبكة',
      variant: 'default' as const
    },
    {
      id: 'commercial-arbitration',
      title: 'محكمة التحكيم التجاري (ORDA)',
      description: 'نظام تحكيم إلكتروني متطور لحل النزاعات التجارية',
      icon: <Scale className="h-6 w-6" />,
      status: 'active' as const,
      usage: 45,
      users: 78,
      rating: 4.9,
      features: ['محكمين خبراء', 'قرارات ملزمة', 'سرية تامة', 'كفاءة التكلفة'],
      onAction: () => navigate('/gateways/commercial-arbitration'),
      actionText: 'طلب تحكيم',
      variant: 'default' as const
    },
    {
      id: 'contract-verification',
      title: 'نظام توثيق العقود',
      description: 'توثيق وإدارة العقود بتقنية البلوك تشين وIPFS',
      icon: <FileCheck className="h-6 w-6" />,
      status: 'active' as const,
      usage: 82,
      users: 234,
      rating: 4.8,
      features: ['بلوك تشين', 'تخزين IPFS', 'توقيعات رقمية', 'مراقبة الإصدارات'],
      onAction: () => navigate('/gateways/contract-verification'),
      actionText: 'وثق عقدك',
      variant: 'default' as const
    }
  ];

  // Platform Statistics
  const platformStats = [
    {
      id: 'total-groups',
      title: 'إجمالي المجموعات النشطة',
      description: 'مجموعات تعاونية فعالة عبر جميع البوابات',
      icon: <Users className="h-6 w-6" />,
      content: (
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">1,247</div>
          <div className="text-sm text-gray-600">+23% من الشهر الماضي</div>
          <Progress value={78} className="h-2" />
        </div>
      ),
      variant: 'gradient' as const
    },
    {
      id: 'total-savings',
      title: 'إجمالي الوفورات المحققة',
      description: 'وفورات مالية حققتها المنصة للأعضاء',
      icon: <DollarSign className="h-6 w-6" />,
      content: (
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-green-600">$2.8M</div>
          <div className="text-sm text-gray-600">متوسط الوفر 35%</div>
          <div className="flex justify-center">
            <Badge className="bg-green-100 text-green-800">+45% نمو</Badge>
          </div>
        </div>
      ),
      variant: 'glass' as const
    },
    {
      id: 'global-reach',
      title: 'الانتشار العالمي',
      description: 'دول وأقاليم تستخدم المنصة',
      icon: <Globe className="h-6 w-6" />,
      content: (
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-purple-600">85</div>
          <div className="text-sm text-gray-600">دولة ومنطقة</div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {['🇸🇦', '🇦🇪', '🇪🇬', '🇺🇸'].map((flag, i) => (
              <div key={i} className="text-2xl">{flag}</div>
            ))}
          </div>
        </div>
      ),
      variant: 'elevated' as const
    },
    {
      id: 'compliance-score',
      title: 'معدل الامتثال',
      description: 'امتثال للمعايير الدولية والمحلية',
      icon: <Shield className="h-6 w-6" />,
      content: (
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-indigo-600">98.7%</div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>WTO</span><CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex justify-between text-xs">
              <span>ISO</span><CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex justify-between text-xs">
              <span>GPO</span><CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </div>
      ),
      variant: 'default' as const
    }
  ];

  // Quick Actions
  const quickActions = [
    {
      id: 'create-group',
      title: 'إنشاء مجموعة جديدة',
      description: 'ابدأ مجموعتك التعاونية الآن',
      icon: <Plus className="h-6 w-6" />,
      content: (
        <div className="space-y-4">
          <Button className="w-full" onClick={() => navigate('/gateways')}>
            <Play className="h-4 w-4 mr-2" />
            اختر نوع المجموعة
          </Button>
          <div className="text-xs text-gray-600 text-center">
            أكثر من 6 أنواع مختلفة متاحة
          </div>
        </div>
      )
    },
    {
      id: 'join-groups',
      title: 'انضم لمجموعة موجودة',
      description: 'تصفح المجموعات النشطة',
      icon: <Users className="h-6 w-6" />,
      content: (
        <div className="space-y-4">
          <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>
            <Briefcase className="h-4 w-4 mr-2" />
            تصفح المجموعات
          </Button>
          <div className="text-xs text-gray-600 text-center">
            247 مجموعة نشطة متاحة الآن
          </div>
        </div>
      )
    },
    {
      id: 'governance',
      title: 'المشاركة في الحوكمة',
      description: 'صوت على القرارات المهمة',
      icon: <Vote className="h-6 w-6" />,
      content: (
        <div className="space-y-4">
          <Button variant="outline" className="w-full" onClick={() => navigate('/governance')}>
            <Vote className="h-4 w-4 mr-2" />
            مقترحات التصويت
          </Button>
          <div className="flex justify-between text-xs">
            <span>مقترحات نشطة</span>
            <Badge variant="outline">7</Badge>
          </div>
        </div>
      )
    }
  ];

  return (
    <WorkspaceLayout 
      title="منصة التعاون الذكي GPO"
      subtitle="بوابة موحدة للشراء الجماعي والتعاون التجاري العالمي"
    >
      {/* Hero Section */}
      <div className="text-center mb-12">
        <BoxedContainer variant="gradient" className="p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
              مستقبل التجارة التعاونية
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              منصة متكاملة للشراء الجماعي والتعاون التجاري مع الامتثال للمعايير الدولية
              <br />
              WTO، ISO، وأفضل ممارسات منظمات الشراء الجماعي العالمية
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                معتمد WTO
              </Badge>
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                <Award className="h-4 w-4 mr-2" />
                شهادة ISO
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                GPO معتمد
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/gateways')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg"
              >
                استكشف البوابات
                <ArrowRight className="h-5 w-5 mr-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/register')}
                className="px-8 py-4 text-lg border-2"
              >
                انضم مجاناً
                <Zap className="h-5 w-5 mr-2" />
              </Button>
            </div>
          </div>
        </BoxedContainer>
      </div>

      {/* Platform Statistics */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          إحصائيات المنصة المباشرة
        </h2>
        <GridBoxLayout 
          items={platformStats}
          columns={4}
          gap={6}
        />
      </div>

      {/* Main Gateway Services */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          البوابات الذكية المتخصصة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gatewayServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          إجراءات سريعة
        </h2>
        <GridBoxLayout 
          items={quickActions}
          columns={3}
          gap={6}
        />
      </div>

      {/* Success Stories Section */}
      <BoxedContainer 
        title="قصص نجاح ملهمة"
        description="شاهد كيف غيرت منصتنا حياة الآلاف من التجار والشركات"
        icon={<Target className="h-6 w-6" />}
        variant="glass"
        className="mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">40%</div>
            <div className="text-gray-600">متوسط الوفورات</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">15 يوم</div>
            <div className="text-gray-600">متوسط إتمام الصفقات</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">99.8%</div>
            <div className="text-gray-600">معدل رضا العملاء</div>
          </div>
        </div>
      </BoxedContainer>

      {/* Call to Action */}
      <BoxedContainer variant="gradient" className="text-center p-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ابدأ رحلتك التعاونية اليوم
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          انضم إلى آلاف الشركات والتجار الذين يوفرون المال ويحققون النجاح من خلال منصتنا
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4 text-lg"
          >
            سجل الآن مجاناً
            <ArrowRight className="h-5 w-5 mr-2" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate('/gateways')}
            className="px-8 py-4 text-lg border-2"
          >
            جولة تفاعلية
            <Play className="h-5 w-5 mr-2" />
          </Button>
        </div>
      </BoxedContainer>
    </WorkspaceLayout>
  );
}
