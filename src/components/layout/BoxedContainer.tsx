
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BoxedContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  icon?: ReactNode;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  variant?: 'default' | 'gradient' | 'glass' | 'elevated';
}

export function BoxedContainer({
  children,
  title,
  description,
  icon,
  badge,
  badgeVariant = 'default',
  className = '',
  headerClassName = '',
  contentClassName = '',
  variant = 'default'
}: BoxedContainerProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-white via-blue-50 to-indigo-50 border-2 border-blue-200 shadow-xl';
      case 'glass':
        return 'bg-white/80 backdrop-blur-md border border-white/30 shadow-2xl';
      case 'elevated':
        return 'bg-white shadow-2xl border-2 border-gray-100 hover:shadow-3xl transition-all duration-300';
      default:
        return 'bg-white shadow-lg border border-gray-200';
    }
  };

  return (
    <Card className={cn(
      getVariantStyles(),
      'transition-all duration-300 hover:shadow-xl',
      className
    )}>
      {(title || description || icon || badge) && (
        <CardHeader className={cn('pb-4', headerClassName)}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md">
                  <div className="text-white">{icon}</div>
                </div>
              )}
              <div>
                {title && (
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {title}
                  </CardTitle>
                )}
                {description && (
                  <CardDescription className="mt-1 text-gray-600">
                    {description}
                  </CardDescription>
                )}
              </div>
            </div>
            {badge && (
              <Badge variant={badgeVariant} className="shadow-sm">
                {badge}
              </Badge>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent className={cn('space-y-6', contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
