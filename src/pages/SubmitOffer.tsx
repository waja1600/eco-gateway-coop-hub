
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, DollarSign, Clock, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SubmitOffer() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    deliveryTime: '',
    terms: '',
    portfolio: ''
  });

  // Mock group data
  const groupData = {
    id: groupId,
    name: 'مطور ويب مستقل',
    description: 'مطور ويب مستقل يبحث عن فرص العمل الحر والتعاون',
    type: 'solo',
    category: 'التكنولوجيا',
    budget: '5000 - 10000 ريال',
    deadline: '30 يوم'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "تم إرسال العرض بنجاح",
      description: "سيتم مراجعة عرضك من قبل العميل",
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
              تقديم عرض
            </h1>
            <p className="text-lg text-gray-600">
              قدم عرضك المهني للمشروع المطلوب
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    تفاصيل المشروع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{groupData.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{groupData.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{groupData.category}</Badge>
                    <Badge className="bg-green-50 text-green-700">{groupData.type}</Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">الميزانية:</span>
                      <span>{groupData.budget}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="font-medium">المدة:</span>
                      <span>{groupData.deadline}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">نصائح للعرض الناجح</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>اكتب وصفاً واضحاً ومفصلاً</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>حدد سعراً تنافسياً ومناسباً</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>أرفق أعمالك السابقة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>كن واقعياً في تحديد المدة</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Offer Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>نموذج تقديم العرض</CardTitle>
                  <CardDescription>
                    املأ جميع البيانات المطلوبة لتقديم عرضك
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        عنوان العرض *
                      </label>
                      <Input
                        placeholder="عنوان مختصر وجذاب لعرضك"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        وصف العرض *
                      </label>
                      <Textarea
                        placeholder="اشرح بالتفصيل كيف ستنجز المشروع والخدمات التي ستقدمها"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          السعر المطلوب (ريال) *
                        </label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          مدة التسليم (بالأيام) *
                        </label>
                        <Input
                          type="number"
                          placeholder="7"
                          value={formData.deliveryTime}
                          onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الشروط والأحكام
                      </label>
                      <Textarea
                        placeholder="اذكر أي شروط خاصة أو ملاحظات مهمة"
                        value={formData.terms}
                        onChange={(e) => setFormData({...formData, terms: e.target.value})}
                        className="min-h-[80px]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رابط أعمالك السابقة
                      </label>
                      <Input
                        type="url"
                        placeholder="https://your-portfolio.com"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                      />
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">رفع الملفات</h3>
                      <p className="text-gray-500 mb-4">ارفع نماذج من أعمالك أو ملفات توضيحية</p>
                      <Button type="button" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        اختيار الملفات
                      </Button>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'جاري الإرسال...' : 'إرسال العرض'}
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
