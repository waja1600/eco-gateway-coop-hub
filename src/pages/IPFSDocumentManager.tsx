
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Upload, 
  Download, 
  Shield, 
  Hash,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';

interface IPFSDocument {
  id: string;
  name: string;
  type: 'contract' | 'agreement' | 'certificate' | 'evidence' | 'proposal';
  hash: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  status: 'pending' | 'verified' | 'signed' | 'expired';
  groupId?: string;
  signers?: string[];
  version: number;
  description: string;
}

export default function IPFSDocumentManager() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('documents');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [documents] = useState<IPFSDocument[]>([
    {
      id: '1',
      name: 'عقد شراء معدات IT.pdf',
      type: 'contract',
      hash: 'QmX7VK8ZJc2K5XHGZJz4RqP9hYf3NvKLpWxJ2HGfRt5cA8',
      size: 2048576,
      uploadedBy: 'أحمد محمد',
      uploadedAt: '2024-01-15T10:30:00Z',
      status: 'signed',
      groupId: 'group-1',
      signers: ['أحمد محمد', 'شركة التقنية المتقدمة', 'مؤسسة الامدادات'],
      version: 1,
      description: 'عقد شراء معدات حاسوبية لمجموعة الشركات التقنية'
    },
    {
      id: '2',
      name: 'اتفاقية تأسيس شركة.pdf',
      type: 'agreement',
      hash: 'QmY8WL9ZKd3L6YIHAKa5SrQ0iZg4OwLqXyK3IJGgSu6dB9',
      size: 1536000,
      uploadedBy: 'فاطمة علي',
      uploadedAt: '2024-01-20T14:15:00Z',
      status: 'pending',
      groupId: 'group-2',
      signers: ['فاطمة علي', 'محمد سالم'],
      version: 2,
      description: 'اتفاقية تأسيس شركة للطاقة المتجددة'
    },
    {
      id: '3',
      name: 'شهادة اعتماد ISO.pdf',
      type: 'certificate',
      hash: 'QmZ9XM0AKe4M7ZJIBLb6TsR1jAh5PxMrYzL4KJHhTv7eC0',
      size: 512000,
      uploadedBy: 'مكتب الاعتماد',
      uploadedAt: '2024-01-10T09:00:00Z',
      status: 'verified',
      version: 1,
      description: 'شهادة اعتماد ISO للجودة والمطابقة'
    }
  ]);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || doc.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700';
      case 'verified': return 'bg-blue-50 text-blue-700';
      case 'signed': return 'bg-green-50 text-green-700';
      case 'expired': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'verified': return <CheckCircle className="h-4 w-4" />;
      case 'signed': return <CheckCircle className="h-4 w-4" />;
      case 'expired': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'contract': return 'عقد';
      case 'agreement': return 'اتفاقية';
      case 'certificate': return 'شهادة';
      case 'evidence': return 'دليل';
      case 'proposal': return 'عرض';
      default: return 'مستند';
    }
  };

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              مدير المستندات اللامركزية - IPFS
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              نظام آمن ولامركزي لإدارة وتوثيق العقود والمستندات
            </p>
            <div className="flex justify-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <Shield className="h-3 w-3 mr-1" />
                مشفر ومحمي
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <Hash className="h-3 w-3 mr-1" />
                IPFS Hash
              </Badge>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{documents.length}</p>
                <p className="text-sm text-gray-600">إجمالي المستندات</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">
                  {documents.filter(d => d.status === 'signed').length}
                </p>
                <p className="text-sm text-gray-600">موقعة</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-600">
                  {documents.filter(d => d.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-600">في الانتظار</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">
                  {documents.filter(d => d.status === 'verified').length}
                </p>
                <p className="text-sm text-gray-600">معتمدة</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="documents">المستندات</TabsTrigger>
              <TabsTrigger value="upload">رفع جديد</TabsTrigger>
              <TabsTrigger value="verify">التحقق</TabsTrigger>
              <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="mt-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="البحث في المستندات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">جميع الأنواع</option>
                    <option value="contract">عقود</option>
                    <option value="agreement">اتفاقيات</option>
                    <option value="certificate">شهادات</option>
                    <option value="evidence">أدلة</option>
                    <option value="proposal">عروض</option>
                  </select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Documents List */}
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <FileText className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg mb-1">{doc.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>رفع بواسطة: {doc.uploadedBy}</span>
                              <span>التاريخ: {formatDate(doc.uploadedAt)}</span>
                              <span>الحجم: {formatFileSize(doc.size)}</span>
                              <span>الإصدار: {doc.version}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getStatusColor(doc.status)}>
                            {getStatusIcon(doc.status)}
                            <span className="mr-1">
                              {doc.status === 'pending' ? 'في الانتظار' :
                               doc.status === 'verified' ? 'معتمد' :
                               doc.status === 'signed' ? 'موقع' : 'منتهي الصلاحية'}
                            </span>
                          </Badge>
                          <Badge variant="outline">
                            {getTypeLabel(doc.type)}
                          </Badge>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Hash className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">IPFS Hash:</span>
                        </div>
                        <code className="text-xs text-gray-700 bg-white px-2 py-1 rounded break-all">
                          {doc.hash}
                        </code>
                      </div>

                      {doc.signers && doc.signers.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium">الموقعين:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {doc.signers.map((signer, index) => (
                              <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                                {signer}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          تحميل
                        </Button>
                        <Button size="sm" variant="outline">
                          عرض التفاصيل
                        </Button>
                        {doc.status === 'pending' && (
                          <Button size="sm">
                            توقيع
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upload" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>رفع مستند جديد</CardTitle>
                  <CardDescription>
                    ارفع المستندات إلى IPFS للحفظ الآمن واللامركزي
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      اسحب الملفات هنا أو انقر للاختيار
                    </h3>
                    <p className="text-gray-600 mb-4">
                      يدعم PDF, DOC, DOCX, PNG, JPG (حد أقصى 10MB)
                    </p>
                    <Button>
                      اختيار الملفات
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نوع المستند
                      </label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="contract">عقد</option>
                        <option value="agreement">اتفاقية</option>
                        <option value="certificate">شهادة</option>
                        <option value="evidence">دليل</option>
                        <option value="proposal">عرض</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المجموعة المرتبطة
                      </label>
                      <select className="w-full p-2 border rounded-md">
                        <option value="">اختيار المجموعة</option>
                        <option value="group-1">مجموعة الشركات التقنية</option>
                        <option value="group-2">مجموعة الطاقة المتجددة</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      وصف المستند
                    </label>
                    <Input placeholder="أدخل وصفاً مختصراً للمستند" />
                  </div>

                  <div className="flex gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      رفع إلى IPFS
                    </Button>
                    <Button variant="outline">
                      حفظ كمسودة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="verify" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>التحقق من المستندات</CardTitle>
                  <CardDescription>
                    تحقق من صحة وسلامة المستندات المرفوعة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      نظام التحقق الآلي
                    </h3>
                    <p className="text-gray-600 mb-4">
                      يتم التحقق من جميع المستندات تلقائياً باستخدام التشفير والتوقيع الرقمي
                    </p>
                    <Button>
                      تشغيل التحقق اليدوي
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>إحصائيات الاستخدام</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>معدل التوقيع اليومي</span>
                        <span className="font-bold text-blue-600">85%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>متوسط حجم الملف</span>
                        <span className="font-bold text-green-600">1.2 MB</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>وقت المعالجة</span>
                        <span className="font-bold text-purple-600">3.2 ثانية</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>التوزيع حسب النوع</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>عقود</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-sm">75%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>اتفاقيات</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div className="w-1/2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-sm">50%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>شهادات</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div className="w-1/4 h-2 bg-purple-500 rounded-full"></div>
                          </div>
                          <span className="text-sm">25%</span>
                        </div>
                      </div>
                    </div>
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
