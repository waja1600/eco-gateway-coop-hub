
import React, { ReactNode } from 'react';
import { BoxedContainer } from './BoxedContainer';
import { cn } from '@/lib/utils';

interface GridItem {
  id: string;
  title?: string;
  description?: string;
  icon?: ReactNode;
  badge?: string;
  content: ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass' | 'elevated';
  span?: 1 | 2 | 3 | 4;
}

interface GridBoxLayoutProps {
  items: GridItem[];
  columns?: 1 | 2 | 3 | 4;
  gap?: 4 | 6 | 8;
  className?: string;
}

export function GridBoxLayout({ 
  items, 
  columns = 3, 
  gap = 6, 
  className = '' 
}: GridBoxLayoutProps) {
  const getGridCols = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const getGapSize = () => {
    switch (gap) {
      case 4: return 'gap-4';
      case 6: return 'gap-6';
      case 8: return 'gap-8';
      default: return 'gap-6';
    }
  };

  const getSpanClass = (span?: number) => {
    switch (span) {
      case 2: return 'md:col-span-2';
      case 3: return 'md:col-span-2 lg:col-span-3';
      case 4: return 'md:col-span-2 lg:col-span-3 xl:col-span-4';
      default: return '';
    }
  };

  return (
    <div className={cn(
      'grid',
      getGridCols(),
      getGapSize(),
      className
    )}>
      {items.map((item) => (
        <div key={item.id} className={getSpanClass(item.span)}>
          <BoxedContainer
            title={item.title}
            description={item.description}
            icon={item.icon}
            badge={item.badge}
            variant={item.variant}
            className={item.className}
          >
            {item.content}
          </BoxedContainer>
        </div>
      ))}
    </div>
  );
}
