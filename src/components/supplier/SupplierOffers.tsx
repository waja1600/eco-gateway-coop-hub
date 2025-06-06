
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Building, Package, DollarSign, Truck, Star, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SupplierOffer {
  id: string;
  supplierName: string;
  company: string;
  productService: string;
  description: string;
  unitPrice: number;
  minOrder: number;
  deliveryTime: string;
  rating: number;
  certifications: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'negotiating';
  submittedAt: string;
  documents: string[];
}

interface SupplierOffersProps {
  groupId: string;
  canManage: boolean;
}

const mockOffers: SupplierOffer[] = [
  {
    id: '1',
    supplierName: 'Mohamed Ali',
    company: 'TechSupply Solutions',
    productService: 'Cloud Infrastructure Services',
    description: 'Enterprise-grade cloud hosting and infrastructure management services',
    unitPrice: 299,
    minOrder: 12,
    deliveryTime: '2-3 business days',
    rating: 4.8,
    certifications: ['ISO 27001', 'SOC 2', 'AWS Partner'],
    status: 'pending',
    submittedAt: '2024-01-15',
    documents: ['service_catalog.pdf', 'pricing_sheet.pdf']
  },
  {
    id: '2',
    supplierName: 'Lisa Chen',
    company: 'Global Office Supplies',
    productService: 'Office Equipment & Supplies',
    description: 'Complete office setup including furniture, computers, and supplies',
    unitPrice: 1500,
    minOrder: 5,
    deliveryTime: '5-7 business days',
    rating: 4.6,
    certifications: ['ISO 9001', 'Green Business Certified'],
    status: 'negotiating',
    submittedAt: '2024-01-14',
    documents: ['product_catalog.pdf']
  }
];

export function SupplierOffers({ groupId, canManage }: SupplierOffersProps) {
  const [offers, setOffers] = useState<SupplierOffer[]>(mockOffers);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const { toast } = useToast();
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    budget: 0,
    quantity: 0,
    deadline: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700';
      case 'accepted': return 'bg-green-50 text-green-700';
      case 'rejected': return 'bg-red-50 text-red-700';
      case 'negotiating': return 'bg-blue-50 text-blue-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const handleAcceptOffer = (offerId: string) => {
    console.log('Accepting offer:', offerId);
    setOffers(offers.map(offer => 
      offer.id === offerId ? { ...offer, status: 'accepted' as const } : offer
    ));
    toast({
      title: "تم قبول العرض",
      description: "تم قبول عرض المورد بنجاح",
    });
  };

  const handleRejectOffer = (offerId: string) => {
    console.log('Rejecting offer:', offerId);
    setOffers(offers.map(offer => 
      offer.id === offerId ? { ...offer, status: 'rejected' as const } : offer
    ));
    toast({
      title: "تم رفض العرض",
      description: "تم رفض عرض المورد",
    });
  };

  const handleNegotiate = (offerId: string) => {
    console.log('Starting negotiation for offer:', offerId);
    setOffers(offers.map(offer => 
      offer.id === offerId ? { ...offer, status: 'negotiating' as const } : offer
    ));
    toast({
      title: "بدء التفاوض",
      description: "تم بدء التفاوض مع المورد",
    });
  };

  const handleRequestProposal = () => {
    console.log('Creating new RFP:', newRequest);
    if (!newRequest.title || !newRequest.description) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "تم إرسال طلب العروض",
      description: "تم إرسال طلب العروض للموردين المؤهلين",
    });
    
    setNewRequest({ title: '', description: '', budget: 0, quantity: 0, deadline: '' });
    setShowRequestForm(false);
  };

  const handleDownloadDocument = (docName: string) => {
    console.log('Downloading document:', docName);
    toast({
      title: "تحميل المستند",
      description: `جاري تحميل ${docName}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">عروض الموردين</h2>
          <p className="text-gray-600">مراجعة وإدارة عروض الموردين لاحتياجات الشراء الجماعي</p>
        </div>
        {canManage && (
          <Button 
            onClick={() => setShowRequestForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Package className="h-4 w-4 mr-2" />
            طلب عروض
          </Button>
        )}
      </div>

      {/* Request Proposal Form */}
      {showRequestForm && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-700">طلب عروض أسعار (RFP)</CardTitle>
            <CardDescription>
              إنشاء طلب مفصل للحصول على عروض من موردين مؤهلين
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                عنوان المنتج/الخدمة
              </label>
              <Input
                placeholder="مثل: أثاث مكتبي، تراخيص برمجيات"
                value={newRequest.title}
                onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المتطلبات التفصيلية
              </label>
              <Textarea
                placeholder="اوصف المواصفات، متطلبات الجودة، توقعات التسليم"
                value={newRequest.description}
                onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الميزانية (ريال)
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newRequest.budget}
                  onChange={(e) => setNewRequest({ ...newRequest, budget: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الكمية
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newRequest.quantity}
                  onChange={(e) => setNewRequest({ ...newRequest, quantity: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الموعد النهائي
                </label>
                <Input
                  type="date"
                  value={newRequest.deadline}
                  onChange={(e) => setNewRequest({ ...newRequest, deadline: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleRequestProposal}>
                إرسال طلب العروض
              </Button>
              <Button variant="outline" onClick={() => setShowRequestForm(false)}>
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Supplier Offers */}
      <div className="grid grid-cols-1 gap-6">
        {offers.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">لم يتم استلام عروض من الموردين بعد.</p>
              <p className="text-sm text-gray-500 mb-4">
                اطلب عروض أسعار للحصول على عروض تنافسية من الموردين
              </p>
            </CardContent>
          </Card>
        ) : (
          offers.map(offer => (
            <Card key={offer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">
                      <Building className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{offer.supplierName}</CardTitle>
                      <CardDescription>{offer.company}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(offer.status)}>
                    {offer.status === 'pending' ? 'معلق' : 
                     offer.status === 'accepted' ? 'مقبول' :
                     offer.status === 'rejected' ? 'مرفوض' : 'قيد التفاوض'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">{offer.productService}</h4>
                  <p className="text-gray-700">{offer.description}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {offer.unitPrice} ريال
                    </div>
                    <div className="text-sm text-gray-600">سعر الوحدة</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {offer.minOrder}
                    </div>
                    <div className="text-sm text-gray-600">الحد الأدنى</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Truck className="mx-auto h-5 w-5 text-gray-600 mb-1" />
                    <div className="text-sm text-gray-600">{offer.deliveryTime}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-lg font-bold text-blue-600">
                        {offer.rating}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">التقييم</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">الشهادات</h4>
                  <div className="flex flex-wrap gap-2">
                    {offer.certifications.map(cert => (
                      <Badge key={cert} variant="outline" className="bg-blue-50 text-blue-700">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">المستندات</h4>
                  <div className="flex flex-wrap gap-2">
                    {offer.documents.map(doc => (
                      <Button 
                        key={doc} 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleDownloadDocument(doc)}
                      >
                        <FileText className="h-3 w-3" />
                        {doc}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  تم التقديم في {offer.submittedAt}
                </div>

                {canManage && (
                  <div className="flex gap-2">
                    {offer.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => handleAcceptOffer(offer.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          قبول
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleNegotiate(offer.id)}
                        >
                          تفاوض
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectOffer(offer.id)}
                        >
                          رفض
                        </Button>
                      </>
                    )}
                    {offer.status === 'negotiating' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => console.log('Continue negotiation for:', offer.id)}
                      >
                        متابعة التفاوض
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => console.log('Message supplier:', offer.id)}
                    >
                      مراسلة
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
