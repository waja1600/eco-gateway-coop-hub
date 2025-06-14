
import React from 'react';
import { Link } from 'react-router-dom';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, Megaphone, Building, Users, Scale, FileCheck, 
  TrendingUp, Brain, Globe, Leaf, Shield, Zap, DollarSign,
  MessageSquare, Vote, Package, Briefcase, Star, Clock
} from 'lucide-react';

const platformGateways = [
  {
    id: 'group-formation',
    title: 'تأسيس المجموعات',
    titleEn: 'Group Formation',
    description: 'شراء جماعي، تسويق تعاوني، تأسيس شركات، تمويل مشاريع',
    icon: Users,
    color: 'blue',
    path: '/gateways',
    examples: ['مجموعة تأسيس شركة ديلاوير - 4 مؤسسين', 'شراء جماعي أجهزة - 6 أعضاء'],
    features: ['عقود التأسيس', 'توزيع الحصص', 'شعار ESG', 'إدارة الأعضاء']
  },
  {
    id: 'proposals',
    title: 'تقديم العروض',
    titleEn: 'Proposals Submission',
    description: 'بوابة الموردين والمستقلين لتقديم العروض والخدمات',
    icon: Package,
    color: 'green',
    path: '/gpo-platform',
    examples: ['مورد يقدم عرض توريد أجهزة', 'مستقل يقدم خدمة تصميم'],
    features: ['3 جولات تفاوض', 'تقييم MCP', 'توقيع آلي', 'فوترة تلقائية']
  },
  {
    id: 'contracts',
    title: 'إدارة العقود',
    titleEn: 'Contract Management',
    description: 'توثيق العقود على IPFS وإدارة العمليات',
    icon: FileCheck,
    color: 'purple',
    path: '/contracts',
    examples: ['عقد خدمة تصميم شعار', 'عقد توريد معدات'],
    features: ['توثيق IPFS', 'أرشيف المجموعة', 'تتبع التنفيذ', 'إدارة المراجعات']
  },
  {
    id: 'voting',
    title: 'التصويت الذكي',
    titleEn: 'Smart Voting (SnapDAO)',
    description: 'نظام تصويت لامركزي لكل القرارات الجماعية',
    icon: Vote,
    color: 'orange',
    path: '/voting',
    examples: ['تصويت على قبول مورد', 'تعديل نسبة مساهم'],
    features: ['تصويت تربيعي', 'قرارات ملزمة', 'شفافية كاملة', 'حوكمة لامركزية']
  },
  {
    id: 'discussions',
    title: 'غرفة المناقشات',
    titleEn: 'Discussion Rooms (Loomio)',
    description: 'نقاشات جماعية مع مراقبة MCP للتحذيرات القانونية',
    icon: MessageSquare,
    color: 'teal',
    path: '/workspace',
    examples: ['نقاش تعديل بنود العقد', 'مناقشة استراتيجية التسويق'],
    features: ['مراقبة MCP', 'تحذيرات قانونية', 'ملفات مشتركة', 'جداول زمنية']
  },
  {
    id: 'investment',
    title: 'الاستثمار الجماعي',
    titleEn: 'Crowdinvesting',
    description: 'تمويل المشاريع من المستثمرين الخارجيين',
    icon: TrendingUp,
    color: 'indigo',
    path: '/gpo-platform',
    examples: ['مجموعة تسويق تطلب 5000$', 'استثمار في تقنية جديدة'],
    features: ['تقييم MCP', 'عقود IPFS', 'نسب الربح', 'شفافية مالية']
  },
  {
    id: 'recommendations',
    title: 'التوصيات الذكية',
    titleEn: 'AI Recommendations (MCP)',
    description: 'توصيات مخصصة للفرص والمشاريع المناسبة',
    icon: Brain,
    color: 'pink',
    path: '/workspace',
    examples: ['مستقل قانوني - فرصة خليجية', 'مجموعة تقنية مناسبة'],
    features: ['تحليل الملف الشخصي', 'مطابقة ذكية', 'فرص مخصصة', 'تنبيهات فورية']
  },
  {
    id: 'marketplace',
    title: 'سوق الخدمات',
    titleEn: 'Services Marketplace',
    description: 'خدمات ثابتة بأسعار واضحة وتسليم مضمون',
    icon: Briefcase,
    color: 'emerald',
    path: '/gpo-platform',
    examples: ['مراجعة عقد تأسيس - 30$ خلال 24 ساعة', 'استشارة قانونية - 200$'],
    features: ['أسعار ثابتة', 'توقيع آلي', 'دفع مباشر', 'ضمان التسليم']
  },
  {
    id: 'arbitration',
    title: 'التحكيم الذكي',
    titleEn: 'Smart Arbitration (ORDA)',
    description: 'حل النزاعات عبر محكمين خبراء مع توثيق رقمي',
    icon: Scale,
    color: 'red',
    path: '/arbitration',
    examples: ['نزاع مستحقات مستقل 100$', 'خلاف توريد معدات'],
    features: ['محكمين معتمدين', 'عملية رقمية', 'أحكام ملزمة', 'توثيق IPFS']
  }
];

const workflowSteps = [
  {
    step: 1,
    title: 'تأسيس المجموعة',
    description: 'تحديد النوع والأهداف وإضافة الأعضاء',
    icon: Users,
    color: 'blue'
  },
  {
    step: 2,
    title: 'دعوة العروض',
    description: 'نشر المناقصة واستقبال عروض الموردين',
    icon: Package,
    color: 'green'
  },
  {
    step: 3,
    title: 'التفاوض والتقييم',
    description: 'MCP يدير 3 جولات تفاوض تلقائية',
    icon: Brain,
    color: 'purple'
  },
  {
    step: 4,
    title: 'التصويت والموافقة',
    description: 'تصويت الأعضاء على أفضل عرض',
    icon: Vote,
    color: 'orange'
  },
  {
    step: 5,
    title: 'التوقيع والتنفيذ',
    description: 'توقيع العقد وبدء التنفيذ مع التتبع',
    icon: FileCheck,
    color: 'teal'
  },
  {
    step: 6,
    title: 'الدفع والتقييم',
    description: 'دفع المستحقات وتقييم الأداء',
    icon: Star,
    color: 'yellow'
  }
];

const systemFeatures = [
  {
    title: 'واجهة متقدمة',
    description: 'React + Tailwind',
    icon: Globe,
    color: 'blue'
  },
  {
    title: 'خلفية قوية',
    description: 'Supabase + JWT',
    icon: Shield,
    color: 'green'
  },
  {
    title: 'توثيق آمن',
    description: 'IPFS + ORDA',
    icon: FileCheck,
    color: 'purple'
  },
  {
    title: 'ذكاء اصطناعي',
    description: 'MCP Engine',
    icon: Brain,
    color: 'orange'
  },
  {
    title: 'مراسلات متقدمة',
    description: 'Loomio + Zulip',
    icon: MessageSquare,
    color: 'teal'
  },
  {
    title: 'دفع آمن',
    description: 'Paddle Integration',
    icon: DollarSign,
    color: 'indigo'
  }
];

export default function ModernIndex() {
  return (
    <ModernMainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        {/* Hero Section */}
        <section className="container px-4 py-16 mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <Globe className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            منصة GPO الموحدة
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            بنية رقمية متكاملة للشراء التعاوني، التسويق المشترك، تأسيس الشركات، والتمويل الجماعي
            <br />
            مدعومة بالذكاء الاصطناعي والحوكمة اللامركزية
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
              <Leaf className="w-4 h-4 mr-2" />
              مشاريع ESG معتمدة
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
              <Brain className="w-4 h-4 mr-2" />
              مدعوم بـ MCP
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              أمان IPFS
            </Badge>
            <Badge className="bg-orange-100 text-orange-800 text-lg px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              منصة عالمية
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3">
              <Link to="/gpo-platform">ابدأ الآن</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link to="/workspace">مساحة العمل</Link>
            </Button>
          </div>
        </section>

        {/* Workflow Steps */}
        <section className="container px-4 py-16 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              سير العمل المتكامل
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              من التأسيس إلى التنفيذ - رحلة شاملة مع الذكاء الاصطناعي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workflowSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-${step.color}-100 text-${step.color}-600 rounded-full`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className={`w-8 h-8 bg-${step.color}-600 text-white rounded-full flex items-center justify-center font-bold`}>
                        {step.step}
                      </div>
                    </div>
                    <CardTitle className="text-right">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-right">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Platform Gateways */}
        <section className="container px-4 py-16 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              البوابات التخصصية
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              تسع بوابات متكاملة لتغطية جميع احتياجات الأعمال التعاونية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformGateways.map((gateway, index) => {
              const IconComponent = gateway.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-4 bg-${gateway.color}-100 rounded-xl group-hover:bg-${gateway.color}-200 transition-colors`}>
                        <IconComponent className={`w-8 h-8 text-${gateway.color}-600`} />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {gateway.titleEn}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-right">{gateway.title}</CardTitle>
                    <CardDescription className="text-right">
                      {gateway.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2 text-right">أمثلة تطبيقية:</h4>
                      <div className="space-y-1">
                        {gateway.examples.map((example, idx) => (
                          <div key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-right">{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2 text-right">المزايا الرئيسية:</h4>
                      <div className="flex flex-wrap gap-1">
                        {gateway.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button asChild className="w-full" variant="outline">
                      <Link to={gateway.path}>
                        الوصول للبوابة
                        <Zap className="w-4 h-4 mr-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Technical Architecture */}
        <section className="container px-4 py-16 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              البنية التقنية المتقدمة
            </h2>
            <p className="text-lg text-gray-600">
              تقنيات حديثة لضمان الأمان والكفاءة والتوسع
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`mx-auto p-4 bg-${feature.color}-100 rounded-xl w-fit`}>
                      <IconComponent className={`w-8 h-8 text-${feature.color}-600`} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container px-4 py-16 mx-auto text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ابدأ رحلتك في التعاون الذكي
              </h2>
              <p className="text-xl mb-8 opacity-90">
                انضم إلى آلاف المؤسسين والموردين والمستقلين في منصة GPO
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                  <Link to="/register">إنشاء حساب مجاني</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600">
                  <Link to="/gpo-platform">استكشف المنصة</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Statistics */}
        <section className="container px-4 py-16 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">مجموعة نشطة</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">معدل النجاح</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">دعم MCP</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">دولة مدعومة</div>
            </div>
          </div>
        </section>
      </div>
    </ModernMainLayout>
  );
}
