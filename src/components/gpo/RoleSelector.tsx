
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Shield, TrendingUp, Briefcase, Building, Check, User } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  permissions: string[];
  requirements: string[];
  benefits: string[];
  stakingRequired: number;
  governanceWeight: number;
  icon: React.ReactNode;
  color: string;
  currentHolders: number;
  maxHolders: number;
}

interface RoleSelectorProps {
  selectedRoles?: string[];
  onRolesChange?: (roles: string[]) => void;
  maxRoles?: number;
}

export function RoleSelector({ selectedRoles = [], onRolesChange, maxRoles = 1 }: RoleSelectorProps) {
  const [selected, setSelected] = useState<string[]>(selectedRoles);
  const userStake = 1500;
  const userReputation = 85;

  const roles: Role[] = [
    {
      id: 'member',
      name: 'Member',
      nameAr: 'عضو',
      description: 'Basic membership with voting rights',
      descriptionAr: 'عضوية أساسية مع حقوق التصويت',
      permissions: ['vote', 'propose_basic', 'join_groups', 'access_contracts'],
      requirements: ['Account verification', 'Minimum 30 days activity'],
      benefits: ['1x voting power', 'Access to all groups', 'Standard support'],
      stakingRequired: 100,
      governanceWeight: 1.0,
      icon: <User className="h-6 w-6" />,
      color: 'blue',
      currentHolders: 245,
      maxHolders: 1000
    },
    {
      id: 'premium_member',
      name: 'Premium Member',
      nameAr: 'عضو مميز',
      description: 'Enhanced membership with additional benefits',
      descriptionAr: 'عضوية محسنة مع مزايا إضافية',
      permissions: ['vote', 'propose_advanced', 'create_groups', 'priority_support'],
      requirements: ['6 months membership', 'Minimum reputation score 75'],
      benefits: ['1.5x voting power', 'Create unlimited groups', 'Priority support', 'Reduced fees'],
      stakingRequired: 500,
      governanceWeight: 1.5,
      icon: <Users className="h-6 w-6" />,
      color: 'purple',
      currentHolders: 89,
      maxHolders: 200
    },
    {
      id: 'validator',
      name: 'Validator',
      nameAr: 'مصدق',
      description: 'Governance validator with contract verification rights',
      descriptionAr: 'مصدق حوكمة مع حقوق التحقق من العقود',
      permissions: ['validate_contracts', 'dispute_resolution', 'governance_proposals'],
      requirements: ['Technical expertise', 'Community reputation 90+', '1 year membership'],
      benefits: ['2x voting power', 'Validation rewards', 'VIP support', 'Fee sharing'],
      stakingRequired: 2000,
      governanceWeight: 2.0,
      icon: <Shield className="h-6 w-6" />,
      color: 'green',
      currentHolders: 24,
      maxHolders: 50
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      nameAr: 'مؤسسي',
      description: 'Corporate membership for organizations',
      descriptionAr: 'عضوية مؤسسية للشركات والمنظمات',
      permissions: ['bulk_operations', 'api_access', 'custom_integrations', 'dedicated_support'],
      requirements: ['Corporate verification', 'Legal entity registration'],
      benefits: ['Multi-user accounts', 'API access', 'Custom solutions', 'Dedicated manager'],
      stakingRequired: 10000,
      governanceWeight: 5.0,
      icon: <Building className="h-6 w-6" />,
      color: 'orange',
      currentHolders: 12,
      maxHolders: 25
    }
  ];

  const getRoleColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-green-600',
      orange: 'text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const canSelectRole = (role: Role) => {
    if (role.stakingRequired > userStake) return false;
    if (role.id === 'validator' && userReputation < 90) return false;
    if (role.currentHolders >= role.maxHolders) return false;
    return true;
  };

  const handleRoleSelect = (roleId: string) => {
    let newSelected = [...selected];
    
    if (newSelected.includes(roleId)) {
      newSelected = newSelected.filter(id => id !== roleId);
    } else {
      if (maxRoles === 1) {
        newSelected = [roleId];
      } else if (newSelected.length < maxRoles) {
        newSelected.push(roleId);
      }
    }
    
    setSelected(newSelected);
    onRolesChange?.(newSelected);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">اختيار الدور</h2>
        <p className="text-gray-600">اختر دورك في المنصة لتحديد صلاحياتك ومزاياك</p>
        {maxRoles > 1 && (
          <p className="text-sm text-gray-500 mt-2">
            يمكنك اختيار حتى {maxRoles} أدوار ({selected.length}/{maxRoles})
          </p>
        )}
      </div>

      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roles">الأدوار المتاحة</TabsTrigger>
          <TabsTrigger value="comparison">المقارنة</TabsTrigger>
          <TabsTrigger value="requirements">المتطلبات</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => {
              const isSelected = selected.includes(role.id);
              const canSelect = canSelectRole(role);

              return (
                <Card 
                  key={role.id} 
                  className={`transition-all duration-200 hover:shadow-lg cursor-pointer ${
                    isSelected ? 'ring-2 ring-blue-500' : ''
                  } ${!canSelect ? 'opacity-60' : ''}`}
                  onClick={() => canSelect && handleRoleSelect(role.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getRoleColor(role.color)}`}>
                          <span className={getIconColor(role.color)}>{role.icon}</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{role.nameAr}</CardTitle>
                          <CardDescription>{role.descriptionAr}</CardDescription>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="h-6 w-6 text-blue-500" />
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">الرهان المطلوب:</span>
                        <div className="font-bold">{role.stakingRequired.toLocaleString()} رمز</div>
                      </div>
                      <div>
                        <span className="text-gray-500">قوة التصويت:</span>
                        <div className="font-bold">{role.governanceWeight}x</div>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-500 block mb-2">التوفر:</span>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(role.currentHolders / role.maxHolders) * 100} 
                          className="flex-1 h-2"
                        />
                        <span className="text-sm text-gray-600">
                          {role.currentHolders}/{role.maxHolders}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm font-medium mb-2 block">الصلاحيات:</span>
                      <div className="space-y-1">
                        {role.permissions.slice(0, 3).map((permission, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Check className="h-3 w-3 text-green-600" />
                            <span>{permission}</span>
                          </div>
                        ))}
                        {role.permissions.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{role.permissions.length - 3} صلاحيات أخرى
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm font-medium mb-2 block">المزايا:</span>
                      <div className="space-y-1">
                        {role.benefits.slice(0, 2).map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <TrendingUp className="h-3 w-3 text-blue-600" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {!canSelect && (
                      <div className="p-3 bg-red-50 rounded-lg">
                        <div className="text-sm text-red-700 font-medium mb-1">غير متاح:</div>
                        <div className="text-xs text-red-600">
                          {role.stakingRequired > userStake && `يتطلب ${role.stakingRequired} رمز (لديك ${userStake})`}
                          {role.id === 'validator' && userReputation < 90 && 'يتطلب نقاط سمعة 90+'}
                          {role.currentHolders >= role.maxHolders && 'تم الوصول للحد الأقصى'}
                        </div>
                      </div>
                    )}

                    <Button 
                      className="w-full"
                      disabled={!canSelect}
                      variant={isSelected ? "default" : "outline"}
                    >
                      {isSelected ? 'مختار' : 
                       canSelect ? 'اختيار هذا الدور' : 'غير متاح'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>مقارنة الأدوار</CardTitle>
              <CardDescription>مقارنة مفصلة بين جميع الأدوار المتاحة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-2">الدور</th>
                      <th className="text-center p-2">الرهان المطلوب</th>
                      <th className="text-center p-2">قوة التصويت</th>
                      <th className="text-center p-2">إنشاء مجموعات</th>
                      <th className="text-center p-2">التحقق من العقود</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role) => (
                      <tr key={role.id} className="border-b">
                        <td className="p-2 font-medium">{role.nameAr}</td>
                        <td className="text-center p-2">{role.stakingRequired.toLocaleString()}</td>
                        <td className="text-center p-2">{role.governanceWeight}x</td>
                        <td className="text-center p-2">
                          {role.permissions.includes('create_groups') ? '✓' : '✗'}
                        </td>
                        <td className="text-center p-2">
                          {role.permissions.includes('validate_contracts') ? '✓' : '✗'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>حالتك الحالية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>الرصيد المتاح:</span>
                  <span className="font-bold">{userStake.toLocaleString()} رمز</span>
                </div>
                <div className="flex justify-between">
                  <span>نقاط السمعة:</span>
                  <span className="font-bold">{userReputation}/100</span>
                </div>
                <div className="flex justify-between">
                  <span>الأدوار المختارة:</span>
                  <span className="font-bold">{selected.length}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>كيفية الترقية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium mb-1">لترقية دورك:</div>
                  <ul className="space-y-1 text-gray-600">
                    <li>• زيد رصيدك من الرموز المميزة</li>
                    <li>• احصل على نقاط سمعة أعلى</li>
                    <li>• شارك بفعالية في المجتمع</li>
                    <li>• اكمل متطلبات الدور المطلوب</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
