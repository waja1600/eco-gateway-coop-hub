
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Building, DollarSign, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function GroupJoin() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    motivation: '',
    experience: '',
    expectedContribution: '',
    contactInfo: ''
  });

  // Mock group data
  const groupData = {
    id: groupId,
    name: 'مجموعة موردي التكنولوجيا',
    description: 'شراء جماعي لمعدات التكنولوجيا وتراخيص البرمجيات للشركات الصغيرة',
    type: 'group',
    category: 'التكنولوجيا',
    memberCount: 15,
    maxMembers: 50,
    status: 'active',
    requirements: [
      'خبرة في مجال التكنولوجيا لمدة سنتين على الأقل',
      'شركة مسجلة أو عمل حر موثق',
      'القدرة على المساهمة في القرارات الجماعية'
    ],
    benefits: [
      'خصومات جماعية تصل إلى 30%',
      'وصول حصري للموردين المعتمدين',
      'دعم فني مشترك',
      'شبكة تواصل مهنية'
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "تم إرسال طلب الانضمام",
      description: "سيتم مراجعة طلبك من قبل إدارة المجموعة",
    });

    setIsSubmitting(false);
    navigate(`/groups/${groupId}`);
  };

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              الانضمام إلى المجموعة
            </h1>
            <p className="text-lg text-gray-600">
              املأ النموذج التالي لطلب الانضمام إلى المجموعة
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Group Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    معلومات المجموعة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{groupData.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{groupData.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{groupData.category}</Badge>
                    <Badge className="bg-green-50 text-green-700">{groupData.status}</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{groupData.memberCount}/{groupData.maxMembers} عضو</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    المتطلبات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {groupData.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    المزايا
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {groupData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>نموذج طلب الانضمام</CardTitle>
                  <CardDescription>
                    يرجى ملء جميع الحقول المطلوبة بدقة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        دافع الانضمام *
                      </label>
                      <Textarea
                        placeholder="اشرح سبب رغبتك في الانضمام إلى هذه المجموعة"
                        value={formData.motivation}
                        onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        خبرتك في المجال *
                      </label>
                      <Textarea
                        placeholder="صف خبرتك في مجال التكنولوجيا والشراء الجماعي"
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        مساهمتك المتوقعة *
                      </label>
                      <Textarea
                        placeholder="كيف يمكنك المساهمة في نجاح المجموعة؟"
                        value={formData.expectedContribution}
                        onChange={(e) => setFormData({...formData, expectedContribution: e.target.value})}
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        معلومات التواصل *
                      </label>
                      <Input
                        placeholder="البريد الإلكتروني أو رقم الهاتف"
                        value={formData.contactInfo}
                        onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
                        required
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'جاري الإرسال...' : 'إرسال طلب الانضمام'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(`/groups/${groupId}`)}
                      >
                        إلغاء
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ModernMainLayout>
  );
}
