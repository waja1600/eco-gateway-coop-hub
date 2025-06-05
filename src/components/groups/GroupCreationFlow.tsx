
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Building, Briefcase, ShoppingCart, Megaphone, Scale, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GroupCreationFlowProps {
  gatewayType: string;
  onSubmit: (data: any) => void;
}

export function GroupCreationFlow({ gatewayType, onSubmit }: GroupCreationFlowProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'group',
    gateway: gatewayType,
    sector: '',
    country: '',
    targetParticipants: 5,
    budget: '',
    timeline: '',
    requirements: '',
    legalFramework: '',
    jurisdiction: '',
    businessModel: '',
    complianceLevel: 'ISO',
    tradingStandards: 'WTO'
  });

  const gatewayConfig = {
    'group-buying': {
      title: 'مجموعة الشراء التعاوني',
      icon: ShoppingCart,
      color: 'blue',
      steps: ['الأساسيات', 'التفاصيل', 'المتطلبات', 'المراجعة']
    },
    'cooperative-marketing': {
      title: 'التسويق التعاوني',
      icon: Megaphone,
      color: 'purple',
      steps: ['الأساسيات', 'الحملة', 'الميزانية', 'المراجعة']
    },
    'company-incorporation': {
      title: 'تأسيس الشركات',
      icon: Building,
      color: 'green',
      steps: ['الأساسيات', 'المساهمون', 'القوانين', 'المراجعة']
    },
    'suppliers-freelancers': {
      title: 'الموردين والمستقلين',
      icon: Briefcase,
      color: 'orange',
      steps: ['الأساسيات', 'المتطلبات', 'المعايير', 'المراجعة']
    },
    'commercial-arbitration': {
      title: 'التحكيم التجاري',
      icon: Scale,
      color: 'red',
      steps: ['الأساسيات', 'النزاع', 'الإجراءات', 'المراجعة']
    }
  };

  const config = gatewayConfig[gatewayType as keyof typeof gatewayConfig] || gatewayConfig['group-buying'];
  const totalSteps = config.steps.length;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "تم إنشاء المجموعة بنجاح",
      description: "سيتم مراجعة طلبك وإشعارك بالنتيجة",
    });
    onSubmit(formData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم المجموعة *
              </label>
              <Input
                placeholder="اختر اسماً واضحاً ومعبراً"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وصف المجموعة *
              </label>
              <Textarea
                placeholder="اشرح الهدف من المجموعة والخدمات المطلوبة"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع المجموعة
                </label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">فردي</SelectItem>
                    <SelectItem value="group">جماعي</SelectItem>
                    <SelectItem value="corporate">شركات</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  القطاع
                </label>
                <Select value={formData.sector} onValueChange={(value) => setFormData({...formData, sector: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القطاع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">التكنولوجيا</SelectItem>
                    <SelectItem value="manufacturing">التصنيع</SelectItem>
                    <SelectItem value="healthcare">الصحة</SelectItem>
                    <SelectItem value="finance">المالية</SelectItem>
                    <SelectItem value="retail">التجارة</SelectItem>
                    <SelectItem value="education">التعليم</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الدولة
              </label>
              <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الدولة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saudi-arabia">السعودية</SelectItem>
                  <SelectItem value="uae">الإمارات</SelectItem>
                  <SelectItem value="egypt">مصر</SelectItem>
                  <SelectItem value="jordan">الأردن</SelectItem>
                  <SelectItem value="kuwait">الكويت</SelectItem>
                  <SelectItem value="qatar">قطر</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  عدد الأعضاء المستهدف
                </label>
                <Input
                  type="number"
                  placeholder="5"
                  value={formData.targetParticipants}
                  onChange={(e) => setFormData({...formData, targetParticipants: parseInt(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الميزانية المتوقعة
                </label>
                <Input
                  placeholder="10,000 ريال"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الجدول الزمني
              </label>
              <Input
                placeholder="3 أشهر"
                value={formData.timeline}
                onChange={(e) => setFormData({...formData, timeline: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                متطلبات العضوية
              </label>
              <Textarea
                placeholder="اذكر المتطلبات اللازمة للانضمام للمجموعة"
                value={formData.requirements}
                onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                className="min-h-[100px]"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الإطار القانوني
              </label>
              <Select value={formData.legalFramework} onValueChange={(value) => setFormData({...formData, legalFramework: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الإطار القانوني" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shariah">الشريعة الإسلامية</SelectItem>
                  <SelectItem value="civil">القانون المدني</SelectItem>
                  <SelectItem value="commercial">القانون التجاري</SelectItem>
                  <SelectItem value="international">القانون الدولي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاختصاص القضائي
              </label>
              <Select value={formData.jurisdiction} onValueChange={(value) => setFormData({...formData, jurisdiction: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المحكمة المختصة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">المحاكم المحلية</SelectItem>
                  <SelectItem value="commercial">المحاكم التجارية</SelectItem>
                  <SelectItem value="arbitration">التحكيم التجاري</SelectItem>
                  <SelectItem value="international">التحكيم الدولي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  مستوى الامتثال
                </label>
                <Select value={formData.complianceLevel} onValueChange={(value) => setFormData({...formData, complianceLevel: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ISO">معايير ISO</SelectItem>
                    <SelectItem value="WTO">معايير WTO</SelectItem>
                    <SelectItem value="OHSAS">معايير OHSAS</SelectItem>
                    <SelectItem value="HACCP">معايير HACCP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  معايير التجارة
                </label>
                <Select value={formData.tradingStandards} onValueChange={(value) => setFormData({...formData, tradingStandards: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WTO">منظمة التجارة العالمية</SelectItem>
                    <SelectItem value="UNIDO">منظمة التنمية الصناعية</SelectItem>
                    <SelectItem value="UNCTAD">مؤتمر التجارة والتنمية</SelectItem>
                    <SelectItem value="GATT">الاتفاقية العامة للتعريفات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">مراجعة بيانات المجموعة</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">الاسم:</span>
                  <p className="font-medium">{formData.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">النوع:</span>
                  <p className="font-medium">{formData.type}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">القطاع:</span>
                  <p className="font-medium">{formData.sector}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">الدولة:</span>
                  <p className="font-medium">{formData.country}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">عدد الأعضاء:</span>
                  <p className="font-medium">{formData.targetParticipants}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">الميزانية:</span>
                  <p className="font-medium">{formData.budget}</p>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-sm text-gray-500">الوصف:</span>
                <p className="font-medium">{formData.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline">{formData.complianceLevel}</Badge>
                <Badge variant="outline">{formData.tradingStandards}</Badge>
                <Badge variant="outline">{formData.legalFramework}</Badge>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">الخطوات التالية</span>
              </div>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• سيتم مراجعة طلبك خلال 24 ساعة</li>
                <li>• ستحصل على إشعار بحالة الموافقة</li>
                <li>• يمكنك دعوة الأعضاء بعد الموافقة</li>
                <li>• ستبدأ عملية التفاوض والتصويت</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-lg bg-${config.color}-50`}>
            <config.icon className={`h-8 w-8 text-${config.color}-600`} />
          </div>
          <div>
            <CardTitle className="text-xl">{config.title}</CardTitle>
            <CardDescription>إنشاء مجموعة جديدة للتعاون الذكي</CardDescription>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {config.steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                index + 1 <= currentStep 
                  ? `bg-${config.color}-600 text-white` 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm ${
                index + 1 <= currentStep ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step}
              </span>
              {index < config.steps.length - 1 && (
                <div className={`mx-4 h-0.5 w-12 ${
                  index + 1 < currentStep ? `bg-${config.color}-600` : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            السابق
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              className={`bg-${config.color}-600 hover:bg-${config.color}-700 flex items-center gap-2`}
            >
              التالي
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className={`bg-${config.color}-600 hover:bg-${config.color}-700 flex items-center gap-2`}
            >
              <CheckCircle className="h-4 w-4" />
              إنشاء المجموعة
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
