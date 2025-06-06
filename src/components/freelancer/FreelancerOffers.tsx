
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, Star, Clock, DollarSign, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FreelancerOffer {
  id: string;
  freelancerName: string;
  title: string;
  description: string;
  proposedRate: number;
  estimatedDays: number;
  rating: number;
  completedProjects: number;
  skills: string[];
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: string;
}

interface FreelancerOffersProps {
  groupId: string;
  canManage: boolean;
}

const mockOffers: FreelancerOffer[] = [
  {
    id: '1',
    freelancerName: 'Sarah Johnson',
    title: 'مطور Full-Stack',
    description: 'يمكنني مساعدتك في تطوير ميزات المنصة باستخدام React و Node.js',
    proposedRate: 75,
    estimatedDays: 14,
    rating: 4.9,
    completedProjects: 23,
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    status: 'pending',
    submittedAt: '2024-01-15'
  },
  {
    id: '2',
    freelancerName: 'Ahmed Hassan',
    title: 'مصمم UI/UX',
    description: 'متخصص في إنشاء واجهات حديثة وسهلة الاستخدام للمنصات التجارية',
    proposedRate: 60,
    estimatedDays: 10,
    rating: 4.8,
    completedProjects: 18,
    skills: ['Figma', 'Adobe XD', 'بحث المستخدمين', 'النماذج الأولية'],
    status: 'pending',
    submittedAt: '2024-01-16'
  }
];

export function FreelancerOffers({ groupId, canManage }: FreelancerOffersProps) {
  const [offers, setOffers] = useState<FreelancerOffer[]>(mockOffers);
  const [showOpportunityForm, setShowOpportunityForm] = useState(false);
  const { toast } = useToast();
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    description: '',
    budget: 0,
    deadline: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700';
      case 'accepted': return 'bg-green-50 text-green-700';
      case 'rejected': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const handleAcceptOffer = (offerId: string) => {
    console.log('Accepting freelancer offer:', offerId);
    setOffers(offers.map(offer => 
      offer.id === offerId ? { ...offer, status: 'accepted' as const } : offer
    ));
    toast({
      title: "تم قبول العرض",
      description: "تم قبول عرض المستقل بنجاح",
    });
  };

  const handleRejectOffer = (offerId: string) => {
    console.log('Rejecting freelancer offer:', offerId);
    setOffers(offers.map(offer => 
      offer.id === offerId ? { ...offer, status: 'rejected' as const } : offer
    ));
    toast({
      title: "تم رفض العرض",
      description: "تم رفض عرض المستقل",
    });
  };

  const handlePostOpportunity = () => {
    console.log('Creating new opportunity:', newOpportunity);
    if (!newOpportunity.title || !newOpportunity.description) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "تم نشر الفرصة",
      description: "تم نشر الفرصة لجذب المستقلين المؤهلين",
    });
    
    setNewOpportunity({ title: '', description: '', budget: 0, deadline: '' });
    setShowOpportunityForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">عروض المستقلين</h2>
          <p className="text-gray-600">مراجعة وإدارة عروض المستقلين لمجموعتك</p>
        </div>
        {canManage && (
          <Button 
            onClick={() => setShowOpportunityForm(true)}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            نشر فرصة
          </Button>
        )}
      </div>

      {/* Post Opportunity Form */}
      {showOpportunityForm && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-700">نشر فرصة جديدة</CardTitle>
            <CardDescription>
              إنشاء إعلان وظيفي لجذب المستقلين المؤهلين
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                عنوان الوظيفة
              </label>
              <Input
                placeholder="مثل: مطور Frontend، كاتب محتوى"
                value={newOpportunity.title}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وصف الوظيفة
              </label>
              <Textarea
                placeholder="اوصف العمل، المتطلبات، والتوقعات"
                value={newOpportunity.description}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, description: e.target.value })}
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الميزانية (ريال)
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newOpportunity.budget}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, budget: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الموعد النهائي
                </label>
                <Input
                  type="date"
                  value={newOpportunity.deadline}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, deadline: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handlePostOpportunity}>
                نشر الفرصة
              </Button>
              <Button variant="outline" onClick={() => setShowOpportunityForm(false)}>
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Freelancer Offers */}
      <div className="grid grid-cols-1 gap-6">
        {offers.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">لم يتم تقديم عروض من المستقلين بعد.</p>
              <p className="text-sm text-gray-500 mb-4">
                انشر فرص عمل لجذب المستقلين المؤهلين
              </p>
            </CardContent>
          </Card>
        ) : (
          offers.map(offer => (
            <Card key={offer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-medium">
                      {offer.freelancerName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{offer.freelancerName}</CardTitle>
                      <CardDescription>{offer.title}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(offer.status)}>
                    {offer.status === 'pending' ? 'معلق' : 
                     offer.status === 'accepted' ? 'مقبول' : 'مرفوض'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{offer.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      {offer.proposedRate} ريال/ساعة
                    </div>
                    <div className="text-sm text-gray-600">المعدل</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      {offer.estimatedDays}
                    </div>
                    <div className="text-sm text-gray-600">أيام</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-lg font-bold text-orange-600">
                        {offer.rating}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">التقييم</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">
                      {offer.completedProjects}
                    </div>
                    <div className="text-sm text-gray-600">مشاريع</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">المهارات</h4>
                  <div className="flex flex-wrap gap-2">
                    {offer.skills.map(skill => (
                      <Badge key={skill} variant="outline" className="bg-orange-50 text-orange-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  تم التقديم في {offer.submittedAt}
                </div>

                {canManage && offer.status === 'pending' && (
                  <div className="flex gap-2">
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
                      onClick={() => handleRejectOffer(offer.id)}
                    >
                      رفض
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => console.log('Message freelancer:', offer.id)}
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
