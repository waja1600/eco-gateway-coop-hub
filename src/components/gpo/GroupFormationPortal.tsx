
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Users, Building, DollarSign, TrendingUp, Leaf, FileText, 
  Globe, Crown, Shield, CheckCircle 
} from 'lucide-react';
import { GroupType } from '@/types/gpo';
import { useToast } from '@/hooks/use-toast';

interface GroupFormationData {
  name: string;
  type: GroupType;
  description: string;
  jurisdiction: string;
  maxMembers: number;
  votingThreshold: number;
  isESGMarked: boolean;
  foundingAgreement: 'upload' | 'mcp_template';
  adminMembers: string[];
  equityDistribution: Record<string, number>;
}

const groupTypes = [
  {
    type: 'joint_purchase' as GroupType,
    title: 'الشراء المشترك',
    description: 'تجميع المشتريات للحصول على أسعار أفضل',
    icon: <Users className="h-6 w-6" />,
    color: 'bg-blue-500',
    examples: ['شراء معدات مكتبية', 'تراخيص برمجيات', 'مستلزمات طبية']
  },
  {
    type: 'collaborative_marketing' as GroupType,
    title: 'التسويق التعاوني',
    description: 'تعاون تسويقي لزيادة الوصول والتأثير',
    icon: <TrendingUp className="h-6 w-6" />,
    color: 'bg-green-500',
    examples: ['حملات إعلانية مشتركة', 'معارض تجارية', 'منصات رقمية']
  },
  {
    type: 'company_formation' as GroupType,
    title: 'تأسيس الشركات',
    description: 'تأسيس شركة مشتركة بين عدة أطراف',
    icon: <Building className="h-6 w-6" />,
    color: 'bg-purple-500',
    examples: ['شركة تقنية', 'مشروع عقاري', 'شركة استثمارية']
  },
  {
    type: 'project_funding' as GroupType,
    title: 'تمويل المشاريع',
    description: 'جمع التمويل للمشاريع الجديدة',
    icon: <DollarSign className="h-6 w-6" />,
    color: 'bg-orange-500',
    examples: ['مشروع تقني ناشئ', 'مبادرة اجتماعية', 'منتج جديد']
  }
];

const jurisdictions = [
  'الولايات المتحدة - ديلاوير',
  'المملكة المتحدة',
  'الإمارات العربية المتحدة',
  'المملكة العربية السعودية',
  'سنغافورة',
  'هونغ كونغ',
  'استونيا الرقمية',
  'سويسرا'
];

export function GroupFormationPortal() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<GroupFormationData>({
    name: '',
    type: 'joint_purchase',
    description: '',
    jurisdiction: '',
    maxMembers: 10,
    votingThreshold: 51,
    isESGMarked: false,
    foundingAgreement: 'mcp_template',
    adminMembers: [],
    equityDistribution: {}
  });

  const handleTypeSelect = (type: GroupType) => {
    setFormData({ ...formData, type });
  };

  const handleFormSubmit = () => {
    console.log('Creating group with data:', formData);
    
    toast({
      title: "تم إنشاء المجموعة بنجاح",
      description: `تم إنشاء مجموعة "${formData.name}" وهي جاهزة لاستقبال الأعضاء`,
    });

    // Reset form
    setFormData({
      name: '',
      type: 'joint_purchase',
      description: '',
      jurisdiction: '',
      maxMembers: 10,
      votingThreshold: 51,
      isESGMarked: false,
      foundingAgreement: 'mcp_template',
      adminMembers: [],
      equityDistribution: {}
    });
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                اختر نوع المجموعة
              </h2>
              <p className="text-gray-600">
                حدد نوع المجموعة التي تريد إنشاؤها
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groupTypes.map((type) => (
                <Card 
                  key={type.type}
                  className={`cursor-pointer transition-all duration-200 ${
                    formData.type === type.type 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:shadow-lg hover:scale-105'
                  }`}
                  onClick={() => handleTypeSelect(type.type)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-3 rounded-lg ${type.color} text-white`}>
                        {type.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{type.title}</CardTitle>
                        <CardDescription>{type.description}</CardDescription>
                      </div>
                      {formData.type === type.type && (
                        <CheckCircle className="h-6 w-6 text-green-600 ml-auto" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">أمثلة:</h4>
                      <div className="space-y-1">
                        {type.examples.map((example, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            <span>{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                تفاصيل المجموعة
              </h2>
              <p className="text-gray-600">
                أدخل التفاصيل الأساسية للمجموعة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم المجموعة *
                  </label>
                  <Input
                    placeholder="أدخل اسم المجموعة"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الولاية القضائية *
                  </label>
                  <Select value={formData.jurisdiction} onValueChange={(value) => setFormData({ ...formData, jurisdiction: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الولاية القضائية" />
                    </SelectTrigger>
                    <SelectContent>
                      {jurisdictions.map((jurisdiction) => (
                        <SelectItem key={jurisdiction} value={jurisdiction}>
                          {jurisdiction}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الحد الأقصى للأعضاء
                  </label>
                  <Input
                    type="number"
                    min="2"
                    max="1000"
                    value={formData.maxMembers}
                    onChange={(e) => setFormData({ ...formData, maxMembers: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عتبة التصويت (%)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.votingThreshold}
                    onChange={(e) => setFormData({ ...formData, votingThreshold: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وصف المجموعة *
                  </label>
                  <Textarea
                    placeholder="اشرح الهدف من المجموعة والأنشطة المخططة"
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Leaf className="h-6 w-6 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-900">مشروع ESG</h4>
                      <p className="text-sm text-green-700">
                        هل هذا مشروع صديق للبيئة أو ذو تأثير اجتماعي؟
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={formData.isESGMarked}
                    onCheckedChange={(checked) => setFormData({ ...formData, isESGMarked: checked })}
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-3">اتفاقية التأسيس</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="foundingAgreement"
                        value="mcp_template"
                        checked={formData.foundingAgreement === 'mcp_template'}
                        onChange={(e) => setFormData({ ...formData, foundingAgreement: e.target.value as any })}
                      />
                      <span className="text-sm text-blue-800">استخدام قالب MCP الذكي</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="foundingAgreement"
                        value="upload"
                        checked={formData.foundingAgreement === 'upload'}
                        onChange={(e) => setFormData({ ...formData, foundingAgreement: e.target.value as any })}
                      />
                      <span className="text-sm text-blue-800">رفع اتفاقية مخصصة</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                إعدادات الإدارة والحوكمة
              </h2>
              <p className="text-gray-600">
                حدد المديرين وتوزيع الأسهم
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-600" />
                    إدارة الأعضاء
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      أعضاء الإدارة
                    </label>
                    <Input
                      placeholder="البريد الإلكتروني للمدير"
                      // Add admin member functionality
                    />
                    <Button variant="outline" size="sm" className="mt-2">
                      إضافة مدير
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    إعدادات الحوكمة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p>• عتبة التصويت: {formData.votingThreshold}%</p>
                    <p>• الحد الأقصى للأعضاء: {formData.maxMembers}</p>
                    <p>• نوع المجموعة: {groupTypes.find(t => t.type === formData.type)?.title}</p>
                    {formData.isESGMarked && (
                      <p className="flex items-center gap-1 text-green-600">
                        <Leaf className="h-4 w-4" />
                        مشروع ESG معتمد
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">ملخص المجموعة</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">الاسم:</span>
                    <p className="font-medium">{formData.name || 'غير محدد'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">النوع:</span>
                    <p className="font-medium">{groupTypes.find(t => t.type === formData.type)?.title}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">الولاية القضائية:</span>
                    <p className="font-medium">{formData.jurisdiction || 'غير محدد'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">الأعضاء:</span>
                    <p className="font-medium">حتى {formData.maxMembers} عضو</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-8 rtl:space-x-reverse">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 mx-4 ${
                  step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <div className="text-sm text-gray-600">
            {step === 1 && 'نوع المجموعة'}
            {step === 2 && 'التفاصيل الأساسية'}
            {step === 3 && 'الإدارة والحوكمة'}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-8">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
        >
          السابق
        </Button>
        
        {step < 3 ? (
          <Button
            onClick={() => setStep(Math.min(3, step + 1))}
            disabled={
              (step === 1 && !formData.type) ||
              (step === 2 && (!formData.name || !formData.description || !formData.jurisdiction))
            }
          >
            التالي
          </Button>
        ) : (
          <Button
            onClick={handleFormSubmit}
            disabled={!formData.name || !formData.description || !formData.jurisdiction}
            className="bg-green-600 hover:bg-green-700"
          >
            إنشاء المجموعة
          </Button>
        )}
      </div>
    </div>
  );
}
