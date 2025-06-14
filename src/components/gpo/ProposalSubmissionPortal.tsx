
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, DollarSign, Clock, Upload, MessageCircle, 
  CheckCircle, AlertTriangle, TrendingUp, Brain
} from 'lucide-react';
import { MCPIntegration } from '@/components/services/MCPIntegration';
import { useToast } from '@/hooks/use-toast';

interface ActiveTender {
  id: string;
  groupId: string;
  groupName: string;
  type: 'supply' | 'service';
  title: string;
  description: string;
  budget: number;
  deadline: string;
  requirements: string[];
  members: number;
  status: 'open' | 'negotiating' | 'closed';
}

const mockTenders: ActiveTender[] = [
  {
    id: '1',
    groupId: 'group-1',
    groupName: 'مجموعة موردي التكنولوجيا',
    type: 'supply',
    title: 'توريد أجهزة حاسوب للمكاتب',
    description: 'نحتاج 50 جهاز حاسوب مكتبي بمواصفات عالية لشركات المجموعة',
    budget: 75000,
    deadline: '2024-02-15',
    requirements: ['ضمان سنتين', 'التسليم خلال شهر', 'دعم فني محلي'],
    members: 12,
    status: 'open'
  },
  {
    id: '2',
    groupId: 'group-2',
    groupName: 'مشروع التسويق الرقمي',
    type: 'service',
    title: 'خدمات التسويق الرقمي',
    description: 'نبحث عن وكالة تسويق رقمي لإدارة الحملات الإعلانية',
    budget: 25000,
    deadline: '2024-02-20',
    requirements: ['خبرة 5 سنوات', 'نتائج سابقة مثبتة', 'تقارير شهرية'],
    members: 8,
    status: 'open'
  }
];

export function ProposalSubmissionPortal() {
  const { toast } = useToast();
  const [selectedTender, setSelectedTender] = useState<ActiveTender | null>(null);
  const [currentTab, setCurrentTab] = useState('browse');
  const [proposalData, setProposalData] = useState({
    title: '',
    description: '',
    pricing: '',
    deliveryTime: '',
    terms: '',
    attachments: []
  });
  const [negotiationRound, setNegotiationRound] = useState(1);

  const handleSubmitProposal = () => {
    if (!selectedTender) return;

    console.log('Submitting proposal for tender:', selectedTender.id);
    console.log('Proposal data:', proposalData);

    toast({
      title: "تم تقديم العرض بنجاح",
      description: "سيتم مراجعة عرضك من قبل المجموعة والرد خلال 48 ساعة",
    });

    // Reset form
    setProposalData({
      title: '',
      description: '',
      pricing: '',
      deliveryTime: '',
      terms: '',
      attachments: []
    });
    setSelectedTender(null);
    setCurrentTab('browse');
  };

  const getTenderStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-50 text-green-700';
      case 'negotiating': return 'bg-yellow-50 text-yellow-700';
      case 'closed': return 'bg-gray-50 text-gray-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const renderTenderCard = (tender: ActiveTender) => (
    <Card key={tender.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{tender.title}</CardTitle>
            <CardDescription className="mt-1">
              {tender.groupName} • {tender.members} أعضاء
            </CardDescription>
          </div>
          <Badge variant="outline" className={getTenderStatusColor(tender.status)}>
            {tender.status === 'open' && 'مفتوح'}
            {tender.status === 'negotiating' && 'تفاوض'}
            {tender.status === 'closed' && 'مغلق'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{tender.description}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {tender.budget.toLocaleString()} ريال
            </div>
            <div className="text-sm text-gray-600">الميزانية</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">
              {new Date(tender.deadline).toLocaleDateString('ar')}
            </div>
            <div className="text-sm text-gray-600">آخر موعد</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {tender.type === 'supply' ? 'توريد' : 'خدمة'}
            </div>
            <div className="text-sm text-gray-600">نوع المناقصة</div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">المتطلبات:</h4>
          <div className="space-y-1">
            {tender.requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setSelectedTender(tender);
              setCurrentTab('submit');
            }}
            className="flex-1"
            disabled={tender.status !== 'open'}
          >
            تقديم عرض
          </Button>
          <Button variant="outline" onClick={() => console.log('View details:', tender.id)}>
            التفاصيل
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          بوابة تقديم العروض
        </h1>
        <p className="text-lg text-gray-600">
          اعرض خدماتك ومنتجاتك على المجموعات النشطة
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">تصفح المناقصات</TabsTrigger>
          <TabsTrigger value="submit">تقديم عرض</TabsTrigger>
          <TabsTrigger value="negotiations">التفاوض</TabsTrigger>
          <TabsTrigger value="my-proposals">عروضي</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              المناقصات النشطة ({mockTenders.filter(t => t.status === 'open').length})
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                تصفية
              </Button>
              <Button variant="outline" size="sm">
                ترتيب
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockTenders.map(renderTenderCard)}
          </div>
        </TabsContent>

        <TabsContent value="submit" className="space-y-6">
          {selectedTender ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tender Details */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>تفاصيل المناقصة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedTender.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{selectedTender.description}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span>الميزانية: {selectedTender.budget.toLocaleString()} ريال</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span>آخر موعد: {new Date(selectedTender.deadline).toLocaleDateString('ar')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* MCP Analysis */}
                <div className="mt-6">
                  <MCPIntegration 
                    groupId={selectedTender.groupId} 
                    context={selectedTender.type === 'supply' ? 'supplier' : 'freelancer'} 
                  />
                </div>
              </div>

              {/* Proposal Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>تقديم عرضك</CardTitle>
                    <CardDescription>
                      أدخل تفاصيل عرضك للمناقصة
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        عنوان العرض *
                      </label>
                      <Input
                        placeholder="عنوان مختصر وجذاب"
                        value={proposalData.title}
                        onChange={(e) => setProposalData({...proposalData, title: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        وصف العرض *
                      </label>
                      <Textarea
                        placeholder="اشرح كيف ستلبي متطلبات المناقصة"
                        rows={4}
                        value={proposalData.description}
                        onChange={(e) => setProposalData({...proposalData, description: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          السعر المقترح (ريال) *
                        </label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={proposalData.pricing}
                          onChange={(e) => setProposalData({...proposalData, pricing: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          مدة التسليم *
                        </label>
                        <Input
                          placeholder="مثل: 30 يوم"
                          value={proposalData.deliveryTime}
                          onChange={(e) => setProposalData({...proposalData, deliveryTime: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الشروط والأحكام
                      </label>
                      <Textarea
                        placeholder="شروط خاصة، ضمانات، أو ملاحظات مهمة"
                        rows={3}
                        value={proposalData.terms}
                        onChange={(e) => setProposalData({...proposalData, terms: e.target.value})}
                      />
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">رفع المرفقات</h3>
                      <p className="text-gray-500 mb-4">نماذج أعمال، شهادات، أو مستندات داعمة</p>
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        اختيار الملفات
                      </Button>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">معلومات التفاوض</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
                        <div>• حتى 3 جولات تفاوض رسمية</div>
                        <div>• جولة إضافية اختيارية</div>
                        <div>• إدارة بواسطة MCP الذكي</div>
                        <div>• عقد آلي عند القبول</div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button onClick={handleSubmitProposal} className="flex-1">
                        تقديم العرض
                      </Button>
                      <Button variant="outline" onClick={() => setSelectedTender(null)}>
                        إلغاء
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">اختر مناقصة من قائمة المناقصات النشطة لتقديم عرضك</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setCurrentTab('browse')}
                >
                  تصفح المناقصات
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="negotiations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                التفاوض النشط
              </CardTitle>
              <CardDescription>
                إدارة جولات التفاوض مع المجموعات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-yellow-900">
                      توريد أجهزة حاسوب - الجولة {negotiationRound}/3
                    </h4>
                    <p className="text-sm text-yellow-700">
                      طلبت المجموعة تعديل السعر وشروط الضمان
                    </p>
                  </div>
                  <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                    الرد على التفاوض
                  </Button>
                </div>

                <div className="text-center py-8 text-gray-500">
                  لا توجد مفاوضات أخرى نشطة
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-proposals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>عروضي المقدمة</CardTitle>
              <CardDescription>
                تتبع حالة جميع العروض التي قدمتها
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-blue-700">عروض مقدمة</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">2</div>
                    <div className="text-sm text-yellow-700">قيد التفاوض</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">1</div>
                    <div className="text-sm text-green-700">مقبولة</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <div className="text-sm text-red-700">مرفوضة</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-gray-500 text-center">
                    سيتم عرض تفاصيل العروض هنا
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
