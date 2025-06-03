
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Settings, Crown } from 'lucide-react';

export type UserRole = 'admin' | 'supervisor' | 'user' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  groups: string[];
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

interface RoleContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  hasPermission: (resource: string, action: string) => boolean;
  canAccessGateway: (gatewayId: string) => boolean;
  canManageGroup: (groupId: string) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed@gpo.com',
    role: 'admin',
    permissions: [
      { id: '1', name: 'Manage All Gateways', resource: 'gateways', action: 'manage' },
      { id: '2', name: 'Create Groups', resource: 'groups', action: 'create' },
      { id: '3', name: 'Manage Arbitration', resource: 'arbitration', action: 'manage' },
      { id: '4', name: 'Manage Contracts', resource: 'contracts', action: 'manage' }
    ],
    groups: ['group-1', 'group-2']
  });

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false;
    
    if (user.role === 'admin') return true;
    
    return user.permissions.some(
      p => p.resource === resource && (p.action === action || p.action === 'manage')
    );
  };

  const canAccessGateway = (gatewayId: string): boolean => {
    if (!user) return false;
    
    if (user.role === 'admin' || user.role === 'supervisor') return true;
    
    // Users can access all gateways but with limited actions
    return true;
  };

  const canManageGroup = (groupId: string): boolean => {
    if (!user) return false;
    
    if (user.role === 'admin') return true;
    
    return user.groups.includes(groupId);
  };

  return (
    <RoleContext.Provider value={{
      user,
      setUser,
      hasPermission,
      canAccessGateway,
      canManageGroup
    }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

export function RoleGuard({ 
  resource, 
  action, 
  children, 
  fallback 
}: { 
  resource: string; 
  action: string; 
  children: ReactNode; 
  fallback?: ReactNode;
}) {
  const { hasPermission } = useRole();
  
  if (!hasPermission(resource, action)) {
    return fallback || (
      <Card className="text-center py-8">
        <CardHeader>
          <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <CardTitle>Access Restricted</CardTitle>
          <CardDescription>
            You don't have permission to access this resource.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return <>{children}</>;
}

export function UserProfileCard() {
  const { user } = useRole();
  
  if (!user) return null;

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'supervisor': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'user': return <Users className="h-4 w-4 text-green-600" />;
      default: return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-yellow-50 text-yellow-700';
      case 'supervisor': return 'bg-blue-50 text-blue-700';
      case 'user': return 'bg-green-50 text-green-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
          <Badge variant="outline" className={getRoleColor(user.role)}>
            <div className="flex items-center gap-1">
              {getRoleIcon(user.role)}
              {user.role.toUpperCase()}
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Permissions</h4>
            <div className="grid grid-cols-1 gap-2">
              {user.permissions.map(permission => (
                <div key={permission.id} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span>{permission.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Groups</h4>
            <div className="text-sm text-gray-600">
              Member of {user.groups.length} group(s)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
