
import React from 'react';
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout';
import { SmartContractDashboard } from '@/components/contracts/SmartContractDashboard';
import { ContractComparison } from '@/components/contracts/ContractComparison';
import { ContractManager } from '@/components/contracts/ContractManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SmartContractsHub() {
  return (
    <WorkspaceLayout 
      title="Smart Contracts Hub"
      subtitle="Blockchain-powered contract management with AI-driven optimization"
    >
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="comparison">Contract Comparison</TabsTrigger>
          <TabsTrigger value="manager">Contract Manager</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <SmartContractDashboard />
        </TabsContent>

        <TabsContent value="comparison">
          <ContractComparison groupId="test-group" contractType="purchase" />
        </TabsContent>

        <TabsContent value="manager">
          <ContractManager />
        </TabsContent>
      </Tabs>
    </WorkspaceLayout>
  );
}
