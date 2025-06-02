
import React from 'react';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';

export default function NotificationsPortal() {
  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <NotificationCenter />
      </div>
    </ModernMainLayout>
  );
}
