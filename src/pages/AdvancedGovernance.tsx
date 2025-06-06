
import React from 'react';
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout';
import { AdvancedGovernanceSystem } from '@/components/governance/AdvancedGovernanceSystem';

export default function AdvancedGovernance() {
  return (
    <WorkspaceLayout 
      title="Advanced Governance"
      subtitle="Decentralized governance with quadratic voting and AI-powered insights"
    >
      <AdvancedGovernanceSystem />
    </WorkspaceLayout>
  );
}
