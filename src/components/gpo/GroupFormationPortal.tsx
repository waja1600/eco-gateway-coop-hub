
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Users, Building, DollarSign, Briefcase, Leaf, Globe, 
  FileText, Shield, Clock, CheckCircle, Upload, Plus
} from 'lucide-react';

interface GroupFormData {
  name: string;
  type: string;
  description: string;
  maxMembers: number;
  jurisdiction: string;
  isESGMarked: boolean;
  foundingAgreement: File | null;
  equityDistribution: Record<string, number>;
  votingThreshold: number;
}

const groupTypes = [
  {
    id: 'joint_purchase',
    name: 'شراء مشترك',
    description: 'تجميع القوة الشرائية للحصول على أسعار أفضل',
    icon: <Users className="h-5 w-5" />,
    color: 'bg-blue-500'
  },
  {
    id: 'collaborative_marketing',
    name: 'تسويق تعاوني',
    description: 'حملات تسويقية مشتركة لزيادة التأثير',
    icon: <Building className="h-5 w-5" />,
    color: 'bg-green-500'
  },
  {
    id: 'company_formation',
    name: 'تأسيس شركة',
    description: 'إنشاء كيان قانوني جديد بشراكة متعددة',
    icon: <FileText className="h-5 w-5" />,
    color: 'bg-purple-500'
  },
  {
    id: 'project_funding',
    name: 'تمويل مشروع',
    description: 'جمع التمويل لمشروع استثماري مشترك',
    icon: <DollarSign className="h-5 w-5" />,
    color: 'bg-orange-500'
  }
];

const jurisdictions = [
  'المملكة العربية السعودية',
  'الإمارات العربية المتحدة',
  'دولة الكويت',
  'دولة قطر',
  'مملكة البحرين',
  'سلطنة عمان',
  'جمهورية مصر العربية',
  'المملكة الأردنية الهاشمية',
  'الجمهورية اللبنانية',
  'دولة أخرى'
];

export function GroupFormationPortal() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<GroupFormData>({
    name: '',
    type: '',
    description: '',
    maxMembers: 5,
    jurisdiction: '',
    isESGMarked: false,
    foundingAgreement: null,
    equityDistribution: {},
    votingThreshold: 75
  });

  const [founders, setFounders] = useState([{ name: '', email: '', equity: 25 }]);

  const handleFormUpdate = (field: keyof GroupFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFounder = () => {
    setFounders(prev => [...prev, { name: '', email: '', equity: 0 }]);
  };

  const updateFounder = (index: number, field: string, value: string | number) => {
    setFounders(prev => prev.map((founder, i) => 
      i === index ? { ...founder, [field]: value } : founder
    ));
  };

  const removeFounder = (index: number) => {
    if (founders.length > 1) {
      setFounders(prev => prev.filter((_, i) => i !== index));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">اختيار نوع المجموعة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupTypes.map((type) => (
                  <Card 
                    key={type.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      formData.type === type.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => handleFormUpdate('type', type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${type.color} text-white`}>
                          {type.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{type.name}</h4>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="groupName">اسم المجموعة</Label>
                <Input
                  id="groupName"
                  value={formData.name}
                  onChange={(e) => handleFormUpdate('name', e.target.value)}
                  placeholder="أدخل اسم المجموعة"
                />
              </div>

              <div>
                <Label htmlFor="description">وصف المجموعة</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleFormUpdate('description', e.target.value)}
                  placeholder="اشرح أهداف وخطط المجموعة"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxMembers">الحد الأقصى للأعضاء</Label>
                  <Input
                    id="maxMembers"
                    type="number"
                    value={formData.maxMembers}
                    onChange={(e) => handleFormUpdate('maxMembers', parseInt(e.target.value))}
                    min={2}
                    max={100}
                  />
                </div>

                <div>
                  <Label htmlFor="jurisdiction">الاختصاص القانوني</Label>
                  <Select value={formData.jurisdiction} onValueChange={(value) => handleFormUpdate('jurisdiction', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الدولة" />
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
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="esg-mark"
                  checked={formData.isESGMarked}
                  onCheckedChange={(checked) => handleFormUpdate('isESGMarked', checked)}
                />
                <Label htmlFor="esg-mark" className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-green-600" />
                  مشروع ESG (صديق للبيئة ومسؤول اجتماعياً)
                </Label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">إدارة المؤسسين</h3>
              <div className="space-y-4">
                {founders.map((founder, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>الاسم الكامل</Label>
                          <Input
                            value={founder.name}
                            onChange={(e) => updateFounder(index, 'name', e.target.value)}
                            placeholder="اسم المؤسس"
                          />
                        </div>
                        <div>
                          <Label>البريد الإلكتروني</Label>
                          <Input
                            type="email"
                            value={founder.email}
                            onChange={(e) => updateFounder(index, 'email', e.target.value)}
                            placeholder="البريد الإلكتروني"
                          />
                        </div>
                        <div>
                          <Label>نسبة الملكية (%)</Label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              value={founder.equity}
                              onChange={(e) => updateFounder(index, 'equity', parseFloat(e.target.value))}
                              min={0}
                              max={100}
                            />
                            {founders.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeFounder(index)}
                              >
                                حذف
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button 
                  variant="outline" 
                  onClick={addFounder}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة مؤسس آخر
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="votingThreshold">عتبة التصويت المطلوبة (%)</Label>
              <div className="space-y-2">
                <Input
                  id="votingThreshold"
                  type="number"
                  value={formData.votingThreshold}
                  onChange={(e) => handleFormUpdate('votingThreshold', parseInt(e.target.value))}
                  min={51}
                  max={100}
                />
                <p className="text-sm text-gray-600">
                  النسبة المئوية المطلوبة لاتخاذ قرارات مهمة (الحد الأدنى 51%)
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">اتفاقية التأسيس</h3>
              
              <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium mb-2">رفع اتفاقية التأسيس</h4>
                    <p className="text-gray-600 mb-4">
                      ارفع وثيقة اتفاقية التأسيس أو استخدم نموذج MCP الذكي
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        رفع ملف PDF
                      </Button>
                      <Button variant="outline">
                        <Globe className="h-4 w-4 mr-2" />
                        استخدام نموذج MCP
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  معاينة تفاصيل المجموعة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">اسم المجموعة:</span>
                    <div className="font-medium">{formData.name || 'غير محدد'}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">نوع المجموعة:</span>
                    <div className="font-medium">
                      {groupTypes.find(t => t.id === formData.type)?.name || 'غير محدد'}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">عدد المؤسسين:</span>
                    <div className="font-medium">{founders.length}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">الحد الأقصى للأعضاء:</span>
                    <div className="font-medium">{formData.maxMembers}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">الاختصاص القانوني:</span>
                    <div className="font-medium">{formData.jurisdiction || 'غير محدد'}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">عتبة التصويت:</span>
                    <div className="font-medium">{formData.votingThreshold}%</div>
                  </div>
                </div>

                {formData.isESGMarked && (
                  <Badge className="bg-green-100 text-green-800">
                    <Leaf className="h-3 w-3 mr-1" />
                    مشروع ESG معتمد
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">إنشاء مجموعة جديدة</h2>
        <p className="text-gray-600">ابدأ رحلتك في التعاون والنمو المشترك</p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                </div>
                <div className="ml-2 text-sm">
                  {step === 1 && 'معلومات أساسية'}
                  {step === 2 && 'المؤسسون والحوكمة'}
                  {step === 3 && 'الاتفاقية والمراجعة'}
                </div>
                {step < 3 && (
                  <div className={`h-0.5 w-16 mx-4 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / 3) * 100} className="mt-4" />
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          السابق
        </Button>
        
        {currentStep < 3 ? (
          <Button 
            onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
            disabled={
              (currentStep === 1 && (!formData.name || !formData.type || !formData.jurisdiction)) ||
              (currentStep === 2 && founders.some(f => !f.name || !f.email))
            }
          >
            التالي
          </Button>
        ) : (
          <Button className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            إنشاء المجموعة
          </Button>
        )}
      </div>
    </div>
  );
}
