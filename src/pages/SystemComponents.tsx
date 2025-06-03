
import React from 'react';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MCPAgent } from '@/components/mcp/MCPAgent';
import { BillingSystem } from '@/components/billing/BillingSystem';
import { SmartContractSystem } from '@/components/contracts/SmartContractSystem';
import { IPFSFileManager } from '@/components/storage/IPFSFileManager';

export default function SystemComponents() {
  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              مكونات النظام
            </h1>
            <p className="text-lg text-gray-600">
              جميع أنظمة وأدوات المنصة في مكان واحد
            </p>
          </div>

          <Tabs defaultValue="mcp" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="mcp">وكيل MCP</TabsTrigger>
              <TabsTrigger value="billing">نظام الفواتير</TabsTrigger>
              <TabsTrigger value="contracts">العقود الذكية</TabsTrigger>
              <TabsTrigger value="storage">إدارة الملفات</TabsTrigger>
            </TabsList>

            <TabsContent value="mcp" className="mt-6">
              <MCPAgent 
                agentId="gpo-assistant" 
                agentName="مساعد GPO الذكي"
                groupId="demo-group"
              />
            </TabsContent>

            <TabsContent value="billing" className="mt-6">
              <BillingSystem />
            </TabsContent>

            <TabsContent value="contracts" className="mt-6">
              <SmartContractSystem groupId="demo-group" />
            </TabsContent>

            <TabsContent value="storage" className="mt-6">
              <IPFSFileManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ModernMainLayout>
  );
}
