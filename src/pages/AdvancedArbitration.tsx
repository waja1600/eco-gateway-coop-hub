
import React from 'react';
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout';
import { AdvancedArbitrationSystem } from '@/components/arbitration/AdvancedArbitrationSystem';

export default function AdvancedArbitration() {
  return (
    <WorkspaceLayout 
      title="ORDA - Online Dispute Resolution"
      subtitle="Advanced arbitration system with AI-powered case management"
    >
      <AdvancedArbitrationSystem />
    </WorkspaceLayout>
  );
}
