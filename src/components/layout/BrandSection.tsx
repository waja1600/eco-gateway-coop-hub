
import React from 'react';
import { Building2 } from 'lucide-react';

export function BrandSection() {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <Building2 className="h-8 w-8 text-blue-600" />
        <div className="ml-2">
          <h1 className="text-xl font-bold text-slate-900">Global Business Cooperative</h1>
          <p className="text-xs text-slate-500 hidden sm:block">International Trade Standards Organization</p>
        </div>
      </div>
    </div>
  );
}
