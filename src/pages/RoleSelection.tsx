
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRole } from '@/components/auth/RoleBasedAccess';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Building, 
  Briefcase, 
  Scale, 
  Crown,
  Shield,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function RoleSelection() {
  const { t } = useTranslation();
  const { user, setUser } = useRole();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'group_founder',
      title: 'مؤسس مجموعة',
      description: 'إنشاء وإدارة مجموعات التفاوض التعاوني',
      icon: Crown,
      color: 'bg-purple-500',
      permissions: [
        'إنشاء مجموعات جديدة',
        'دعوة أعضاء جدد',
        'إدارة التصويت والقرارات',
        'التفاوض مع الموردين',
        'طلب خدمات التحكيم'
      ],
      requirements: [
        'التحقق من الهوية (KYC)',
        'ضمان مالي أولي',
        'خبرة في الأعمال'
      ]
    },
    {
      id: 'group_member',
      title: 'عضو مجموعة',
      description: 'المشاركة في مجموعات التفاوض والشراء التعاوني',
      icon: Users,
      color: 'bg-blue-500',
      permissions: [
        'الانضمام للمجموعات',
        'المشاركة في التصويت',
        'مناقشة العروض',
        'توقيع العقود',
        'طلب التحكيم'
      ],
      requirements: [
        'التحقق من الهوية (KYC)',
        'موافقة من مؤسس المجموعة'
      ]
    },
    {
      id: 'supplier',
      title: 'مورد معتمد',
      description: 'تقديم العروض والخدمات للمجموعات',
      icon: Building,
      color: 'bg-green-500',
      permissions: [
        'عرض المنتجات والخدمات',
        'تقديم عروض للمجموعات',
        'التفاوض مع المجموعات',
        'توقيع العقود',
        'الوصول لقاعدة بيانات المجموعات'
      ],
      requirements: [
        'التحقق من الشركة',
        'شهادات الجودة والمطابقة',
        'تقييم الأداء والمصداقية',
        'ضمان تنفيذ العقود'
      ]
    },
    {
      id: 'freelancer',
      title: 'مستقل معتمد',
      description: 'تقديم الخدمات المتخصصة للمجموعات',
      icon: Briefcase,
      color: 'bg-orange-500',
      permissions: [
        'تقديم خدمات متخصصة',
        'التقدم للمشاريع',
        'تلقي تقييمات العملاء',
        'توقيع عقود الخدمة',
        'الوصول لفرص العمل'
      ],
      requirements: [
        'اختبار المهارات (MCP Test)',
        'رفع شهادات الخبرة',
        'التحقق من الهوية',
        'نماذج من الأعمال السابقة'
      ]
    },
    {
      id: 'arbitrator',
      title: 'محكم معتمد',
      description: 'تقديم خدمات التحكيم والوساطة التجارية',
      icon: Scale,
      color: 'bg-red-500',
      permissions: [
        'النظر في قضايا التحكيم',
        'إصدار القرارات الملزمة',
        'الوساطة بين الأطراف',
        'توثيق القرارات',
        'إدارة جلسات التحكيم'
      ],
      requirements: [
        'شهادة محاماة أو تحكيم',
        'خبرة في التحكيم التجاري',
        'تدريب على أنظمة ORDA',
        'اعتماد من هيئات التحكيم'
      ]
    },
    {
      id: 'supervisor',
      title: 'مشرف النظام',
      description: 'إدارة ومراقبة عمليات المنصة',
      icon: Shield,
      color: 'bg-indigo-500',
      permissions: [
        'مراقبة جميع العمليات',
        'اعتماد المستخدمين الجدد',
        'إدارة النزاعات',
        'مراجعة العقود',
        'تحليل الأداء'
      ],
      requirements: [
        'خبرة إدارية متقدمة',
        'تدريب على أنظمة GPO',
        'شهادات الامتثال الدولي',
        'ترخيص من الإدارة العليا'
      ]
    }
  ];

  const handleRoleSelection = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleConfirmRole = () => {
    if (!selectedRole || !user) return;

    // Update user role
    const updatedUser = {
      ...user,
      role: selectedRole as any,
      permissions: roles.find(r => r.id === selectedRole)?.permissions.map((perm, index) => ({
        id: `${selectedRole}_${index}`,
        name: perm,
        resource: selectedRole,
        action: 'manage' as const
      })) || []
    };

    setUser(updatedUser);
    
    // Navigate to appropriate dashboard
    switch (selectedRole) {
      case 'group_founder':
      case 'group_member':
        navigate('/gpo-dashboard');
        break;
      case 'supplier':
        navigate('/portals/supplier');
        break;
      case 'freelancer':
        navigate('/portals/freelancer');
        break;
      case 'arbitrator':
        navigate('/arbitration');
        break;
      case 'supervisor':
        navigate('/system');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              اختيار دورك في منصة GPO
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              اختر الدور المناسب لك للبدء في استخدام منصة التفاوض التعاوني الذكي
            </p>
            {selectedRole && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 text-sm px-4 py-2">
                تم اختيار: {roles.find(r => r.id === selectedRole)?.title}
              </Badge>
            )}
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {roles.map((role) => {
              const IconComponent = role.icon;
              const isSelected = selectedRole === role.id;
              
              return (
                <Card 
                  key={role.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  }`}
                  onClick={() => handleRoleSelection(role.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${role.color} text-white`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      {isSelected && (
                        <CheckCircle className="h-6 w-6 text-blue-500" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">الصلاحيات:</h4>
                      <ul className="space-y-1">
                        {role.permissions.slice(0, 3).map((permission, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-center">
                            <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                            {permission}
                          </li>
                        ))}
                        {role.permissions.length > 3 && (
                          <li className="text-xs text-gray-500">
                            +{role.permissions.length - 3} صلاحيات أخرى
                          </li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">المتطلبات:</h4>
                      <ul className="space-y-1">
                        {role.requirements.slice(0, 2).map((requirement, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-center">
                            <div className="w-1 h-1 bg-orange-500 rounded-full mr-2"></div>
                            {requirement}
                          </li>
                        ))}
                        {role.requirements.length > 2 && (
                          <li className="text-xs text-gray-500">
                            +{role.requirements.length - 2} متطلبات أخرى
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Confirmation Section */}
          {selectedRole && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-blue-900 mb-2">
                      تأكيد اختيار الدور
                    </h3>
                    <p className="text-blue-700">
                      لقد اخترت دور "{roles.find(r => r.id === selectedRole)?.title}". 
                      يمكنك تغيير دورك لاحقاً من إعدادات الحساب.
                    </p>
                  </div>
                  <Button 
                    onClick={handleConfirmRole}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    تأكيد وبدء العمل
                    <ArrowRight className="h-4 w-4 mr-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help Section */}
          <Card className="mt-8 bg-gray-50">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                هل تحتاج مساعدة في الاختيار؟
              </h3>
              <p className="text-gray-600 mb-4">
                يمكنك التواصل مع فريق الدعم للحصول على استشارة مجانية حول الدور المناسب لك
              </p>
              <Button variant="outline">
                تواصل مع الدعم
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModernMainLayout>
  );
}
