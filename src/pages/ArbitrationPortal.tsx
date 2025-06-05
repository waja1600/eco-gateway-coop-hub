
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRole } from '@/components/auth/RoleBasedAccess';
import { 
  Scale, 
  FileText, 
  Clock, 
  User, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Upload,
  Calendar,
  Gavel,
  Shield
} from 'lucide-react';

interface ArbitrationCase {
  id: string;
  title: string;
  caseNumber: string;
  type: 'commercial' | 'contract' | 'payment' | 'service';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  filedBy: string;
  respondent: string;
  amount: number;
  filedDate: string;
  deadline: string;
  arbitrator?: string;
  description: string;
}

export default function ArbitrationPortal() {
  const { t } = useTranslation();
  const { user, hasPermission } = useRole();
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewCaseForm, setShowNewCaseForm] = useState(false);

  const [cases] = useState<ArbitrationCase[]>([
    {
      id: '1',
      title: 'نزاع حول تأخير التسليم',
      caseNumber: 'ARB-2024-001',
      type: 'contract',
      status: 'in_progress',
      priority: 'high',
      filedBy: 'شركة التقنية المتقدمة',
      respondent: 'مؤسسة الامدادات الصناعية',
      amount: 50000,
      filedDate: '2024-01-15',
      deadline: '2024-02-15',
      arbitrator: 'د. أحمد محمد',
      description: 'نزاع حول تأخير تسليم معدات IT لمدة 3 أسابيع عن الموعد المحدد'
    },
    {
      id: '2',
      title: 'خلاف في جودة المنتجات',
      caseNumber: 'ARB-2024-002',
      type: 'commercial',
      status: 'open',
      priority: 'medium',
      filedBy: 'مجموعة المطاعم الكبرى',
      respondent: 'مصنع الأغذية الطازجة',
      amount: 25000,
      filedDate: '2024-01-20',
      deadline: '2024-02-20',
      description: 'عدم مطابقة المنتجات المورّدة للمواصفات المتفق عليها'
    }
  ]);

  const [newCase, setNewCase] = useState({
    title: '',
    type: 'commercial' as const,
    respondent: '',
    amount: 0,
    description: '',
    evidence: [] as File[]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-50 text-blue-700';
      case 'in_progress': return 'bg-yellow-50 text-yellow-700';
      case 'resolved': return 'bg-green-50 text-green-700';
      case 'closed': return 'bg-gray-50 text-gray-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-50 text-red-700';
      case 'high': return 'bg-orange-50 text-orange-700';
      case 'medium': return 'bg-yellow-50 text-yellow-700';
      case 'low': return 'bg-green-50 text-green-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <AlertTriangle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleFileUpload = (files: FileList) => {
    setNewCase(prev => ({
      ...prev,
      evidence: [...prev.evidence, ...Array.from(files)]
    }));
  };

  const submitNewCase = () => {
    if (!newCase.title || !newCase.respondent || !newCase.description) return;
    
    // Generate case number
    const caseNumber = `ARB-2024-${String(cases.length + 1).padStart(3, '0')}`;
    
    console.log('New arbitration case submitted:', {
      ...newCase,
      caseNumber,
      filedBy: user?.name || 'المستخدم الحالي',
      filedDate: new Date().toISOString().split('T')[0],
      status: 'open',
      priority: 'medium'
    });

    setShowNewCaseForm(false);
    setNewCase({
      title: '',
      type: 'commercial',
      respondent: '',
      amount: 0,
      description: '',
      evidence: []
    });
  };

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              نظام التحكيم التجاري - ORDA
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              منصة متكاملة لحل النزاعات التجارية والوساطة القانونية
            </p>
            <div className="flex justify-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <Shield className="h-3 w-3 mr-1" />
                معتمد دولياً
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <Gavel className="h-3 w-3 mr-1" />
                قرارات ملزمة
              </Badge>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Scale className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{cases.length}</p>
                <p className="text-sm text-gray-600">إجمالي القضايا</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-600">
                  {cases.filter(c => c.status === 'in_progress').length}
                </p>
                <p className="text-sm text-gray-600">قيد النظر</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">
                  {cases.filter(c => c.status === 'resolved').length}
                </p>
                <p className="text-sm text-gray-600">محلولة</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-600">
                  {cases.filter(c => c.priority === 'urgent' || c.priority === 'high').length}
                </p>
                <p className="text-sm text-gray-600">عاجلة</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="cases">القضايا</TabsTrigger>
              <TabsTrigger value="new-case">قضية جديدة</TabsTrigger>
              <TabsTrigger value="arbitrators">المحكمين</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>القضايا الحديثة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cases.slice(0, 3).map((case_) => (
                        <div key={case_.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{case_.title}</h4>
                            <Badge variant="outline" className={getStatusColor(case_.status)}>
                              {getStatusIcon(case_.status)}
                              <span className="mr-1">
                                {case_.status === 'open' ? 'مفتوحة' :
                                 case_.status === 'in_progress' ? 'قيد النظر' :
                                 case_.status === 'resolved' ? 'محلولة' : 'مغلقة'}
                              </span>
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{case_.caseNumber}</p>
                          <p className="text-sm text-gray-700">{case_.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>إحصائيات الأداء</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>معدل الحل</span>
                        <span className="font-bold text-green-600">85%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>متوسط وقت الحل</span>
                        <span className="font-bold text-blue-600">21 يوم</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>رضا العملاء</span>
                        <span className="font-bold text-purple-600">4.7/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cases" className="mt-6">
              <div className="space-y-6">
                {cases.map((case_) => (
                  <Card key={case_.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{case_.title}</CardTitle>
                          <CardDescription>{case_.caseNumber}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getStatusColor(case_.status)}>
                            {getStatusIcon(case_.status)}
                            <span className="mr-1">
                              {case_.status === 'open' ? 'مفتوحة' :
                               case_.status === 'in_progress' ? 'قيد النظر' :
                               case_.status === 'resolved' ? 'محلولة' : 'مغلقة'}
                            </span>
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(case_.priority)}>
                            {case_.priority === 'urgent' ? 'عاجل' :
                             case_.priority === 'high' ? 'عالي' :
                             case_.priority === 'medium' ? 'متوسط' : 'منخفض'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">مقدم الطلب</p>
                          <p className="font-medium">{case_.filedBy}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">المدعى عليه</p>
                          <p className="font-medium">{case_.respondent}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">قيمة النزاع</p>
                          <p className="font-medium">${case_.amount.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{case_.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>تاريخ التقديم: {case_.filedDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>الموعد النهائي: {case_.deadline}</span>
                          </div>
                          {case_.arbitrator && (
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>المحكم: {case_.arbitrator}</span>
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new-case" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>تقديم طلب تحكيم جديد</CardTitle>
                  <CardDescription>
                    املأ النموذج التالي لتقديم طلب تحكيم تجاري
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        عنوان النزاع
                      </label>
                      <Input
                        placeholder="أدخل عنوان واضح للنزاع"
                        value={newCase.title}
                        onChange={(e) => setNewCase(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نوع النزاع
                      </label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={newCase.type}
                        onChange={(e) => setNewCase(prev => ({ ...prev, type: e.target.value as any }))}
                      >
                        <option value="commercial">نزاع تجاري</option>
                        <option value="contract">نزاع تعاقدي</option>
                        <option value="payment">نزاع دفع</option>
                        <option value="service">نزاع خدمة</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الطرف الآخر
                      </label>
                      <Input
                        placeholder="اسم الشركة أو الشخص"
                        value={newCase.respondent}
                        onChange={(e) => setNewCase(prev => ({ ...prev, respondent: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        قيمة النزاع ($)
                      </label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={newCase.amount}
                        onChange={(e) => setNewCase(prev => ({ ...prev, amount: Number(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      وصف النزاع
                    </label>
                    <Textarea
                      placeholder="اشرح تفاصيل النزاع والأدلة المتاحة..."
                      rows={6}
                      value={newCase.description}
                      onChange={(e) => setNewCase(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الأدلة والمستندات
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">اسحب الملفات هنا أو انقر للاختيار</p>
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                      />
                    </div>
                    {newCase.evidence.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          تم رفع {newCase.evidence.length} ملف
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={submitNewCase} className="bg-blue-600 hover:bg-blue-700">
                      تقديم طلب التحكيم
                    </Button>
                    <Button variant="outline">
                      حفظ كمسودة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="arbitrators" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">د. أحمد محمد</h3>
                    <p className="text-sm text-gray-600 mb-4">خبير تحكيم تجاري - 15 سنة خبرة</p>
                    <div className="flex justify-center gap-2 mb-4">
                      <Badge variant="outline">ISO معتمد</Badge>
                      <Badge variant="outline">WTO مختص</Badge>
                    </div>
                    <p className="text-xs text-gray-500">نسبة نجاح: 92%</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">د. فاطمة علي</h3>
                    <p className="text-sm text-gray-600 mb-4">محكم دولي - 12 سنة خبرة</p>
                    <div className="flex justify-center gap-2 mb-4">
                      <Badge variant="outline">دولي معتمد</Badge>
                      <Badge variant="outline">عقود تجارية</Badge>
                    </div>
                    <p className="text-xs text-gray-500">نسبة نجاح: 89%</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">د. محمد سالم</h3>
                    <p className="text-sm text-gray-600 mb-4">مختص نزاعات مالية - 18 سنة خبرة</p>
                    <div className="flex justify-center gap-2 mb-4">
                      <Badge variant="outline">نزاعات مالية</Badge>
                      <Badge variant="outline">بنوك معتمد</Badge>
                    </div>
                    <p className="text-xs text-gray-500">نسبة نجاح: 95%</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ModernMainLayout>
  );
}
