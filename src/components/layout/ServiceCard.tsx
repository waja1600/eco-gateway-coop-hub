
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  Star, 
  Users, 
  Activity,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  status: 'active' | 'pending' | 'completed' | 'maintenance';
  usage?: number;
  users?: number;
  rating?: number;
  features: string[];
  onAction?: () => void;
  actionText?: string;
  variant?: 'default' | 'premium' | 'featured';
}

export function ServiceCard({
  title,
  description,
  icon,
  status,
  usage,
  users,
  rating,
  features,
  onAction,
  actionText = 'الوصول للخدمة',
  variant = 'default'
}: ServiceCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'maintenance': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'active': return 'نشط';
      case 'pending': return 'في الانتظار';
      case 'completed': return 'مكتمل';
      case 'maintenance': return 'صيانة';
      default: return 'غير محدد';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'premium':
        return 'bg-gradient-to-br from-purple-50 to-indigo-100 border-2 border-purple-200 shadow-xl';
      case 'featured':
        return 'bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-200 shadow-xl ring-2 ring-blue-300';
      default:
        return 'bg-white border border-gray-200 shadow-lg';
    }
  };

  return (
    <Card className={`${getVariantStyles()} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <div className="text-white">{icon}</div>
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-800">{title}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {usage !== undefined && (
            <div className="text-center">
              <div className="text-lg font-bold text-gray-800">{usage}%</div>
              <div className="text-xs text-gray-600">الاستخدام</div>
              <Progress value={usage} className="mt-1 h-2" />
            </div>
          )}
          {users !== undefined && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-lg font-bold text-gray-800">{users}</span>
              </div>
              <div className="text-xs text-gray-600">المستخدمين</div>
            </div>
          )}
          {rating !== undefined && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-lg font-bold text-gray-800">{rating}</span>
              </div>
              <div className="text-xs text-gray-600">التقييم</div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">المميزات:</div>
          <div className="space-y-1">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span>{feature}</span>
              </div>
            ))}
            {features.length > 3 && (
              <div className="text-xs text-gray-500">
                +{features.length - 3} مميزات أخرى
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button 
          onClick={onAction}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
        >
          <span>{actionText}</span>
          <ArrowRight className="h-4 w-4 mr-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
