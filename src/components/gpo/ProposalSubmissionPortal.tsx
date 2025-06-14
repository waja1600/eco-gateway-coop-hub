
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Search, Filter, Upload, Send, Clock, DollarSign, 
  Users, Building, FileText, CheckCircle, AlertCircle, 
  Star, Calendar, MapPin, Briefcase, TrendingUp
} from 'lucide-react';

interface Tender {
  id: string;
  title: string;
  groupName: string;
  type: 'supply' | 'services' | 'mixed';
  budget: number;
  deadline: string;
  location: string;
  groupSize: number;
  requirements: string[];
  status: 'open' | 'closing_soon' | 'evaluation';
  mcpScore?: number;
  urgency: 'low' | 'medium' | 'high';
}

interface Proposal {
  tenderId: string;
  title: string;
  description: string;
  pricing: Record<string, number>;
  deliverySchedule: string;
  attachments: File[];
  submitterType: 'supplier' | 'freelancer';
}

const mockTenders: Tender[] = [
  {
    id: 'tender-1',
    title: 'توريد أجهزة حاسوب لمجموعة الشراء التقني',
    groupName: 'مجموعة الشراء التقني',
    type: 'supply',
    budget: 150000,
    deadline: '2024-01-15',
    location: 'الرياض، المملكة العربية السعودية',
    groupSize: 12,
    requirements: ['جودة عالية', 'ضمان سنتين', 'تدريب فني'],
    status: 'open',
    mcpScore: 8.5,
    urgency: 'medium'
  },
  {
    id: 'tender-2',
    title: 'خدمات تصميم هوية بصرية للتسويق التعاوني',
    groupName: 'مجموعة التسويق الخليجي',
    type: 'services',
    budget: 75000,
    deadline: '2024-01-10',
    location: 'دولة الإمارات العربية المتحدة',
    groupSize: 8,
    requirements: ['خبرة 5 سنوات', 'أعمال سابقة', 'تسليم سريع'],
    status: 'closing_soon',
    mcpScore: 9.2,
    urgency: 'high'
  },
  {
    id: 'tender-3',
    title: 'خدمات قانونية لتأسيس شركة استثمارية',
    groupName: 'مجموعة المستثمرين الشباب',
    type: 'services',
    budget: 45000,
    deadline: '2024-01-20',
    location: 'دولة الكويت',
    groupSize: 5,
    requirements: ['خبرة في الشركات الاستثمارية', 'ترخيص قانوني', 'متابعة دورية'],
    status: 'evaluation',
    mcpScore: 7.8,
    urgency: 'low'
  }
];

export function ProposalSubmissionPortal() {
  const [activeTab, setActiveTab] = useState('tenders');
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [proposal, setProposal] = useState<Proposal>({
    tenderId: '',
    title: '',
    description: '',
    pricing: {},
    deliverySchedule: '',
    attachments: [],
    submitterType: 'supplier'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'closing_soon': return 'bg-orange-100 text-orange-800';
      case 'evaluation': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'مفتوح';
      case 'closing_soon': return 'قريب الإغلاق';
      case 'evaluation': return 'قيد التقييم';
      default: return status;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredTenders = mockTenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.groupName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || tender.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleSubmitProposal = () => {
    if (!selectedTender) return;
    
    console.log('Submitting proposal:', {
      tender: selectedTender,
      proposal
    });
    
    // Reset form
    setProposal({
      tenderId: '',
      title: '',
      description: '',
      pricing: {},
      deliverySchedule: '',
      attachments: [],
      submitterType: 'supplier'
    });
    setSelectedTender(null);
    setActiveTab('tenders');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">منصة تقديم العروض</h2>
        <p className="text-gray-600">اعثر على الفرص المناسبة وقدم عروضك المتميزة</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tenders">المناقصات المتاحة</TabsTrigger>
          <TabsTrigger value="submit">تقديم عرض</TabsTrigger>
          <TabsTrigger value="my-proposals">عروضي</TabsTrigger>
        </TabsList>

        <TabsContent value="tenders" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="البحث في المناقصات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="نوع المناقصة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأنواع</SelectItem>
                      <SelectItem value="supply">توريد</SelectItem>
                      <SelectItem value="services">خدمات</SelectItem>
                      <SelectItem value="mixed">مختلط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tenders List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredTenders.map((tender) => (
              <Card key={tender.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{tender.title}</CardTitle>
                        <Badge className={getStatusColor(tender.status)}>
                          {getStatusText(tender.status)}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {tender.groupName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {tender.groupSize} أعضاء
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {tender.location}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {tender.budget.toLocaleString()} ريال
                      </div>
                      {tender.mcpScore && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="h-3 w-3 text-yellow-500" />
                          MCP Score: {tender.mcpScore}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">المتطلبات:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tender.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        ينتهي: {tender.deadline}
                      </span>
                      <span className={`flex items-center gap-1 ${getUrgencyColor(tender.urgency)}`}>
                        <Clock className="h-4 w-4" />
                        {tender.urgency === 'high' ? 'عاجل' : 
                         tender.urgency === 'medium' ? 'متوسط' : 'غير عاجل'}
                      </span>
                    </div>
                    
                    <Button
                      onClick={() => {
                        setSelectedTender(tender);
                        setProposal(prev => ({ ...prev, tenderId: tender.id }));
                        setActiveTab('submit');
                      }}
                      disabled={tender.status === 'evaluation'}
                    >
                      {tender.status === 'evaluation' ? 'قيد التقييم' : 'تقديم عرض'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submit" className="space-y-6">
          {selectedTender ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tender Details */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">تفاصيل المناقصة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium">{selectedTender.title}</h4>
                    <p className="text-sm text-gray-600">{selectedTender.groupName}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>الميزانية:</span>
                      <span className="font-medium">{selectedTender.budget.toLocaleString()} ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الموقع:</span>
                      <span className="font-medium">{selectedTender.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>عدد الأعضاء:</span>
                      <span className="font-medium">{selectedTender.groupSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الموعد النهائي:</span>
                      <span className="font-medium">{selectedTender.deadline}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">المتطلبات:</h5>
                    <ul className="space-y-1 text-sm">
                      {selectedTender.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Proposal Form */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>تقديم العرض</CardTitle>
                  <CardDescription>
                    املأ النموذج بعناية لتقديم عرض متميز
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="submitterType">نوع مقدم العرض</Label>
                    <Select value={proposal.submitterType} onValueChange={(value: 'supplier' | 'freelancer') => 
                      setProposal(prev => ({ ...prev, submitterType: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supplier">مورد</SelectItem>
                        <SelectItem value="freelancer">مستقل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="proposalTitle">عنوان العرض</Label>
                    <Input
                      id="proposalTitle"
                      value={proposal.title}
                      onChange={(e) => setProposal(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="عنوان مختصر وواضح لعرضك"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">وصف العرض التفصيلي</Label>
                    <Textarea
                      id="description"
                      value={proposal.description}
                      onChange={(e) => setProposal(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="اشرح خدماتك أو منتجاتك والقيمة المضافة التي تقدمها"
                      rows={6}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="totalPrice">السعر الإجمالي (ريال)</Label>
                      <Input
                        id="totalPrice"
                        type="number"
                        value={proposal.pricing.total || ''}
                        onChange={(e) => setProposal(prev => ({
                          ...prev,
                          pricing: { ...prev.pricing, total: parseFloat(e.target.value) }
                        }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliverySchedule">جدول التسليم</Label>
                      <Input
                        id="deliverySchedule"
                        value={proposal.deliverySchedule}
                        onChange={(e) => setProposal(prev => ({ ...prev, deliverySchedule: e.target.value }))}
                        placeholder="مثال: 14 يوم عمل"
                      />
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <Label>المرفقات</Label>
                    <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            ارفع نماذج من أعمالك، شهادات، أو ملفات تقنية
                          </p>
                          <Button variant="outline" size="sm">
                            اختيار الملفات
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedTender(null);
                        setActiveTab('tenders');
                      }}
                      className="flex-1"
                    >
                      إلغاء
                    </Button>
                    <Button 
                      onClick={handleSubmitProposal}
                      className="flex-1"
                      disabled={!proposal.title || !proposal.description || !proposal.pricing.total}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      إرسال العرض
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">اختر مناقصة لتقديم عرض</h3>
                <p className="text-gray-600 mb-4">
                  يجب اختيار مناقصة من القائمة المتاحة أولاً
                </p>
                <Button onClick={() => setActiveTab('tenders')}>
                  تصفح المناقصات
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="my-proposals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>عروضي المقدمة</CardTitle>
              <CardDescription>
                تتبع حالة عروضك والتفاوضات الجارية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">لا توجد عروض مقدمة</h3>
                <p className="text-gray-600 mb-4">
                  ابدأ بتقديم عروضك للمناقصات المتاحة
                </p>
                <Button onClick={() => setActiveTab('tenders')}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  استكشف الفرص
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
