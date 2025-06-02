
import React from 'react';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { ModernHomepage } from '@/components/dashboard/ModernHomepage';

export default function ModernIndex() {
  return (
    <ModernMainLayout>
      <ModernHomepage />
    </ModernMainLayout>
  );
}
