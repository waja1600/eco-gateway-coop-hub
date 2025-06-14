
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Users, Building, Briefcase, Scale, DollarSign, Crown,
  CheckCircle, AlertTriangle, Leaf
} from 'lucide-react';
import { UserRole } from '@/types/gpo';

interface RoleSelectorProps {
  selectedRoles: UserRole[];
  onRolesChange: (roles: UserRole[]) => void;
  maxRoles?: number;
}

const roleDefinitions = [
  {
    role: 'founder' as UserRole,
    title: 'مؤسس',
    description: 'إنشاء وإدارة المجموعات والمشاريع',
    icon: <Crown className="h-6 w-6" />,
    color: 'bg-yellow-500',
    permissions: ['create_groups', 'manage_equity', 'assign_admins'],
    responsibilities: ['إنشاء المجموعات', 'توزيع الأسهم', 'تعيين المديرين']
  },
  {
    role: 'member' as UserRole,
    title: 'عضو',
    description: 'المشاركة في المجموعات والتصويت',
    icon: <Users className="h-6 w-6" />,
    color: 'bg-blue-500',
    permissions: ['join_groups', 'vote', 'view_contracts'],
    responsibilities: ['الانضمام للمجموعات', 'التصويت', 'مراجعة العقود']
  },
  {
    role: 'supplier' as UserRole,
    title: 'مورد',
    description: 'تقديم المنتجات والخدمات للمجموعات',
    icon: <Building className="h-6 w-6" />,
    color: 'bg-green-500',
    permissions: ['submit_proposals', 'negotiate_contracts', 'fulfill_orders'],
    responsibilities: ['تقديم العروض', 'التفاوض', 'تنفيذ الطلبات']
  },
  {
    role: 'freelancer' as UserRole,
    title: 'مستقل',
    description: 'تقديم الخدمات المتخصصة والاستشارات',
    icon: <Briefcase className="h-6 w-6" />,
    color: 'bg-purple-500',
    permissions: ['submit_proposals', 'provide_services', 'join_projects'],
    responsibilities: ['تقديم الخدمات', 'الاستشارات', 'المشاريع المتخصصة']
  },
  {
    role: 'investor' as UserRole,
    title: 'مستثمر',
    description: 'الاستثمار في المشاريع والحصول على عوائد',
    icon: <DollarSign className="h-6 w-6" />,
    color: 'bg-indigo-500',
    permissions: ['invest_in_projects', 'view_returns', 'receive_dividends'],
    responsibilities: ['الاستثمار', 'تتبع العوائد', 'استلام الأرباح']
  },
  {
    role: 'arbitrator' as UserRole,
    title: 'محكم',
    description: 'حل النزاعات وإصدار الأحكام',
    icon: <Scale className="h-6 w-6" />,
    color: 'bg-red-500',
    permissions: ['resolve_disputes', 'issue_verdicts', 'enforce_decisions'],
    responsibilities: ['حل النزاعات', 'إصدار الأحكام', 'تنفيذ القرارات']
  }
];

export function RoleSelector({ selectedRoles, onRolesChange, maxRoles = 3 }: RoleSelectorProps) {
  const [hoveredRole, setHoveredRole] = useState<UserRole | null>(null);

  const handleRoleToggle = (role: UserRole) => {
    if (selectedRoles.includes(role)) {
      onRolesChange(selectedRoles.filter(r => r !== role));
    } else if (selectedRoles.length < maxRoles) {
      onRolesChange([...selectedRoles, role]);
    }
  };

  const isRoleSelected = (role: UserRole) => selectedRoles.includes(role);
  const canSelectMore = selectedRoles.length < maxRoles;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          اختر أدوارك في المنصة
        </h3>
        <p className="text-gray-600">
          يمكنك اختيار حتى {maxRoles} أدوار ({selectedRoles.length}/{maxRoles} محدد)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roleDefinitions.map((roleDef) => {
          const isSelected = isRoleSelected(roleDef.role);
          const canSelect = canSelectMore || isSelected;
          
          return (
            <Card 
              key={roleDef.role}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : canSelect 
                    ? 'hover:shadow-lg hover:scale-105' 
                    : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={() => canSelect && handleRoleToggle(roleDef.role)}
              onMouseEnter={() => setHoveredRole(roleDef.role)}
              onMouseLeave={() => setHoveredRole(null)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${roleDef.color} text-white`}>
                      {roleDef.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{roleDef.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {roleDef.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    <Checkbox
                      checked={isSelected}
                      disabled={!canSelect}
                    />
                  </div>
                </div>
              </CardHeader>

              {(hoveredRole === roleDef.role || isSelected) && (
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">الصلاحيات:</h4>
                      <div className="flex flex-wrap gap-1">
                        {roleDef.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">المسؤوليات:</h4>
                      <ul className="space-y-1">
                        {roleDef.responsibilities.map((responsibility, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {selectedRoles.length > 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">الأدوار المحددة:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedRoles.map((role) => {
                const roleDef = roleDefinitions.find(r => r.role === role);
                return (
                  <Badge key={role} className="bg-green-100 text-green-800">
                    {roleDef?.title}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {!canSelectMore && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-800">
                وصلت للحد الأقصى من الأدوار ({maxRoles}). يمكنك إلغاء تحديد دور لاختيار آخر.
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
