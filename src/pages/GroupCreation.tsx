
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { GroupCreationFlow } from '@/components/groups/GroupCreationFlow';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Megaphone, Building, Briefcase, Scale, FileCheck, Globe } from 'lucide-react';

export default function GroupCreation() {
  const { gatewayId } = useParams<{ gatewayId: string }>();
  const navigate = useNavigate();

  const handleGroupSubmit = (formData: any) => {
    console.log('Group created:', formData);
    // Here you would typically send the data to your backend
    // For now, we'll simulate success and redirect to group details
    setTimeout(() => {
      const newGroupId = 'group-' + Date.now();
      navigate(`/groups/${newGroupId}`);
    }, 2000);
  };

  const getGatewayInfo = () => {
    switch (gatewayId) {
      case 'group-buying':
        return {
          title: 'إنشاء مجموعة شراء تعاوني',
          titleEn: 'Group Buying Cooperative',
          description: 'قم بإنشاء مجموعة للشراء الجماعي والحصول على أفضل الأسعار والخصومات',
          icon: ShoppingCart,
          color: 'blue',
          features: ['خصومات جماعية', 'ضمان الجودة', 'شحن مشترك', 'تفاوض جماعي'],
          standards: ['WTO Trade Standards', 'ISO 9001 Quality', 'GPO Best Practices']
        };
      case 'cooperative-marketing':
        return {
          title: 'إنشاء مجموعة تسويق تعاوني',
          titleEn: 'Cooperative Marketing Group',
          description: 'اجمع الميزانيات التسويقية والخبرات للوصول لجمهور أوسع',
          icon: Megaphone,
          color: 'purple',
          features: ['ميزانيات مشتركة', 'خبرات متخصصة', 'وصول أوسع', 'كفاءة التكلفة'],
          standards: ['Digital Marketing Standards', 'Brand Protection', 'ROI Optimization']
        };
      case 'company-incorporation':
        return {
          title: 'إنشاء مجموعة تأسيس شركات',
          titleEn: 'Company Incorporation Group',
          description: 'تعاون في تأسيس الشركات وتقاسم التكاليف والخبرات القانونية',
          icon: Building,
          color: 'green',
          features: ['خبرة قانونية', 'تقاسم التكاليف', 'دعم الامتثال', 'توثيق متكامل'],
          standards: ['Corporate Governance', 'Legal Compliance', 'International Law']
        };
      case 'suppliers-freelancers':
        return {
          title: 'إنشاء مجموعة موردين ومستقلين',
          titleEn: 'Suppliers & Freelancers Network',
          description: 'ابحث عن موردين موثوقين ومستقلين ماهرين لمشاريعك',
          icon: Briefcase,
          color: 'orange',
          features: ['ملفات موثقة', 'نظام تقييم', 'دفع آمن', 'شبكة عالمية'],
          standards: ['Professional Verification', 'Quality Assurance', 'Payment Security']
        };
      case 'commercial-arbitration':
        return {
          title: 'إنشاء طلب تحكيم تجاري',
          titleEn: 'Commercial Arbitration Request',
          description: 'حل النزاعات التجارية من خلال التحكيم الإلكتروني السريع والعادل',
          icon: Scale,
          color: 'red',
          features: ['محكمين خبراء', 'عملية رقمية', 'قرارات ملزمة', 'فعالة التكلفة'],
          standards: ['UNCITRAL Rules', 'Online Dispute Resolution', 'International Arbitration']
        };
      case 'contract-verification':
        return {
          title: 'إنشاء نظام توثيق عقود',
          titleEn: 'Contract Verification System',
          description: 'وثق وادر العقود مع أمان البلوك تشين وتخزين IPFS',
          icon: FileCheck,
          color: 'indigo',
          features: ['تخزين IPFS', 'توقيعات رقمية', 'قوالب ذكية', 'مراقبة الإصدارات'],
          standards: ['Digital Signatures', 'Blockchain Security', 'Document Management']
        };
      default:
        return {
          title: 'إنشاء مجموعة جديدة',
          titleEn: 'Create New Group',
          description: 'قم بإنشاء مجموعة تعاونية جديدة',
          icon: Globe,
          color: 'gray',
          features: [],
          standards: []
        };
    }
  };

  const gatewayInfo = getGatewayInfo();
  const IconComponent = gatewayInfo.icon;

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className={`p-4 bg-${gatewayInfo.color}-50 rounded-2xl`}>
                <IconComponent className={`h-12 w-12 text-${gatewayInfo.color}-600`} />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {gatewayInfo.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              {gatewayInfo.description}
            </p>

            {/* Standards & Compliance */}
            <div className="flex justify-center gap-2 mb-6">
              {gatewayInfo.standards.map((standard, index) => (
                <Badge key={index} variant="outline" className={`bg-${gatewayInfo.color}-50 text-${gatewayInfo.color}-700`}>
                  {standard}
                </Badge>
              ))}
            </div>
          </div>

          {/* Features Overview */}
          {gatewayInfo.features.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-center">المزايا الرئيسية</CardTitle>
                <CardDescription className="text-center">
                  ما ستحصل عليه من خلال هذه البوابة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {gatewayInfo.features.map((feature, index) => (
                    <div key={index} className={`p-4 bg-${gatewayInfo.color}-50 rounded-lg text-center`}>
                      <div className={`w-2 h-2 bg-${gatewayInfo.color}-600 rounded-full mx-auto mb-2`} />
                      <span className={`text-${gatewayInfo.color}-900 font-medium`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Creation Flow */}
          <GroupCreationFlow 
            gatewayType={gatewayId || ''}
            onSubmit={handleGroupSubmit}
          />

          {/* Additional Information */}
          <Card className="mt-8 bg-gray-50">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">WTO</div>
                  <p className="text-sm text-gray-600">معايير منظمة التجارة العالمية</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 mb-2">ISO</div>
                  <p className="text-sm text-gray-600">شهادات الجودة الدولية</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">GPO</div>
                  <p className="text-sm text-gray-600">أفضل ممارسات الشراء التعاوني</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModernMainLayout>
  );
}
