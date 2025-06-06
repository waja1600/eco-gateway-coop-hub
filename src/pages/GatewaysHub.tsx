
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout';
import { GridBoxLayout } from '@/components/layout/GridBoxLayout';
import { ServiceCard } from '@/components/layout/ServiceCard';
import { BoxedContainer } from '@/components/layout/BoxedContainer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Megaphone, 
  Building, 
  Users, 
  Scale, 
  FileCheck,
  Globe,
  Shield,
  Award,
  TrendingUp,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react';

export default function GatewaysHub() {
  const navigate = useNavigate();

  const gateways = [
    {
      id: 'group-buying',
      title: 'بوابة الشراء الجماعي',
      description: 'منصة متطورة للشراء التعاوني مع ضمانات الجودة والامتثال الدولي WTO',
      icon: <ShoppingCart className="h-6 w-6" />,
      status: 'active' as const,
      usage: 87,
      users: 1245,
      rating: 4.8,
      features: [
        'خصومات تصل إلى 40%',
        'معايير التجارة العالمية WTO',
        'تأمين شامل على البضائع',
        'شحن مجاني للطلبات الكبيرة'
      ],
      onAction: () => navigate('/gateways/group-buying'),
      actionText: 'ابدأ الشراء الجماعي',
      variant: 'featured' as const
    },
    {
      id: 'cooperative-marketing',
      title: 'بوابة التسويق التعاوني',
      description: 'حملات تسويقية مشتركة بميزانيات موحدة ووصول عالمي للأسواق',
      icon: <Megaphone className="h-6 w-6" />,
      status: 'active' as const,
      usage: 73,
      users: 892,
      rating: 4.6,
      features: [
        'عائد استثمار مضاعف',
        'وصول لأسواق عالمية',
        'خبراء تسويق متخصصون',
        'تحليلات متقدمة للحملات'
      ],
      onAction: () => navigate('/gateways/cooperative-marketing'),
      actionText: 'انضم للحملة التسويقية',
      variant: 'premium' as const
    },
    {
      id: 'company-incorporation',
      title: 'بوابة تأسيس الشركات',
      description: 'تأسيس الشركات متعدد الجنسيات مع دعم قانوني متكامل وامتثال دولي',
      icon: <Building className="h-6 w-6" />,
      status: 'active' as const,
      usage: 65,
      users: 456,
      rating: 4.9,
      features: [
        'خبرة قانونية متخصصة',
        'سرعة في إجراءات التأسيس',
        'امتثال للقوانين الدولية',
        'دعم مستمر بعد التأسيس'
      ],
      onAction: () => navigate('/gateways/company-incorporation'),
      actionText: 'ابدأ تأسيس شركتك',
      variant: 'default' as const
    },
    {
      id: 'suppliers-freelancers',
      title: 'شبكة الموردين والمستقلين',
      description: 'منصة موثقة للعثور على أفضل الموردين والمستقلين المحترفين عالمياً',
      icon: <Users className="h-6 w-6" />,
      status: 'active' as const,
      usage: 91,
      users: 2340,
      rating: 4.7,
      features: [
        'تحقق من الهوية KYC',
        'تقييمات موثقة من العملاء',
        'نظام دفع آمن ومضمون',
        'ضمان جودة الخدمات'
      ],
      onAction: () => navigate('/gateways/suppliers-freelancers'),
      actionText: 'تصفح الشبكة',
      variant: 'default' as const
    },
    {
      id: 'commercial-arbitration',
      title: 'محكمة التحكيم التجاري (ORDA)',
      description: 'نظام تحكيم إلكتروني متطور لحل النزاعات التجارية بسرعة وعدالة',
      icon: <Scale className="h-6 w-6" />,
      status: 'active' as const,
      usage: 45,
      users: 178,
      rating: 4.9,
      features: [
        'محكمين خبراء معتمدين',
        'قرارات ملزمة قانونياً',
        'سرية تامة للإجراءات',
        'كفاءة في التكلفة والوقت'
      ],
      onAction: () => navigate('/gateways/commercial-arbitration'),
      actionText: 'طلب تحكيم تجاري',
      variant: 'default' as const
    },
    {
      id: 'contract-verification',
      title: 'نظام توثيق العقود',
      description: 'توثيق وإدارة العقود بتقنية البلوك تشين المتقدمة وتخزين IPFS',
      icon: <FileCheck className="h-6 w-6" />,
      status: 'active' as const,
      usage: 82,
      users: 1876,
      rating: 4.8,
      features: [
        'تقنية البلوك تشين المتقدمة',
        'تخزين آمن عبر IPFS',
        'توقيعات رقمية معتمدة',
        'مراقبة إصدارات العقود'
      ],
      onAction: () => navigate('/gateways/contract-verification'),
      actionText: 'وثق عقدك الآن',
      variant: 'default' as const
    }
  ];

  const platformHighlights = [
    {
      id: 'wto-compliance',
      title: 'الامتثال لمعايير WTO',
      description: 'متوافق مع قواعد منظمة التجارة العالمية',
      icon: <Shield className="h-6 w-6" />,
      content: (
        <div className="text-center space-y-4">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
          <div className="text-lg font-semibold">100% متوافق</div>
          <div className="text-sm text-gray-600">جميع المعاملات تتبع المعايير الدولية</div>
        </div>
      ),
      variant: 'glass' as const
    },
    {
      id: 'iso-certified',
      title: 'شهادة ISO للجودة',
      description: 'معتمد بأعلى معايير الجودة الدولية',
      icon: <Award className="h-6 w-6" />,
      content: (
        <div className="text-center space-y-4">
          <Star className="h-12 w-12 text-yellow-600 mx-auto" />
          <div className="text-lg font-semibold">ISO 9001:2015</div>
          <div className="text-sm text-gray-600">ضمان الجودة في جميع العمليات</div>
        </div>
      ),
      variant: 'elevated' as const
    },
    {
      id: 'gpo-standards',
      title: 'معايير GPO العالمية',
      description: 'أفضل ممارسات منظمات الشراء الجماعي',
      icon: <Globe className="h-6 w-6" />,
      content: (
        <div className="text-center space-y-4">
          <TrendingUp className="h-12 w-12 text-blue-600 mx-auto" />
          <div className="text-lg font-semibold">GPO معتمد</div>
          <div className="text-sm text-gray-600">أفضل الممارسات في الشراء التعاوني</div>
        </div>
      ),
      variant: 'gradient' as const
    }
  ];

  return (
    <WorkspaceLayout 
      title="مركز البوابات الذكية"
      subtitle="بوابة موحدة للخدمات التعاونية المتخصصة مع الامتثال الدولي"
    >
      {/* Hero Section */}
      <BoxedContainer variant="gradient" className="text-center p-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
          بوابات التعاون الذكية
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          اختر البوابة المناسبة لاحتياجاتك التجارية مع ضمان الامتثال للمعايير الدولية
          <br />
          WTO، ISO، وأفضل ممارسات منظمات الشراء الجماعي
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-base">
            <Shield className="h-4 w-4 mr-2" />
            WTO معتمد
          </Badge>
          <Badge className="bg-green-100 text-green-800 px-4 py-2 text-base">
            <Award className="h-4 w-4 mr-2" />
            ISO 9001:2015
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-base">
            <Star className="h-4 w-4 mr-2" />
            GPO معايير عالمية
          </Badge>
        </div>
        <Button 
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg"
          onClick={() => navigate('/register')}
        >
          ابدأ رحلتك التعاونية
          <Zap className="h-5 w-5 mr-2" />
        </Button>
      </BoxedContainer>

      {/* Platform Highlights */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          معايير الامتثال والجودة
        </h2>
        <GridBoxLayout 
          items={platformHighlights}
          columns={3}
          gap={6}
        />
      </div>

      {/* Gateway Services */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          البوابات المتخصصة
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {gateways.map((gateway) => (
            <ServiceCard key={gateway.id} {...gateway} />
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BoxedContainer 
          title="لماذا تختار منصتنا؟"
          description="المزايا التنافسية التي تجعلنا الخيار الأول"
          icon={<CheckCircle className="h-6 w-6" />}
          variant="glass"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>وفورات تصل إلى 40% في التكاليف</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>أمان وموثوقية بمعايير دولية</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>دعم عملاء 24/7 بلغات متعددة</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>شبكة عالمية من الشركاء الموثوقين</span>
            </div>
          </div>
        </BoxedContainer>

        <BoxedContainer 
          title="إحصائيات المنصة"
          description="أرقام تعكس نجاح المجتمع التعاوني"
          icon={<TrendingUp className="h-6 w-6" />}
          variant="elevated"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">7,200+</div>
              <div className="text-sm text-gray-600">عضو نشط</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$2.8M</div>
              <div className="text-sm text-gray-600">وفورات محققة</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">850+</div>
              <div className="text-sm text-gray-600">مجموعة نشطة</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">45</div>
              <div className="text-sm text-gray-600">دولة</div>
            </div>
          </div>
        </BoxedContainer>
      </div>
    </WorkspaceLayout>
  );
}
