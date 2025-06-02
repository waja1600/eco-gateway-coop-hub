
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Download, Eye, Edit, Share } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Contract {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'review' | 'active' | 'completed' | 'disputed';
  parties: string[];
  createdDate: string;
  lastModified: string;
  description: string;
  ipfsHash?: string;
  version: number;
}

interface ContractTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  template: string;
}

const mockContracts: Contract[] = [
  {
    id: '1',
    title: 'Group Buying Agreement - Organic Rice',
    type: 'Group Purchase',
    status: 'active',
    parties: ['Ahmed Hassan', 'Sara Ali', 'Mohamed Ibrahim'],
    createdDate: '2025-05-01',
    lastModified: '2025-05-15',
    description: 'Contract for bulk purchase of organic rice with quality specifications',
    ipfsHash: 'QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    version: 2
  },
  {
    id: '2',
    title: 'Marketing Campaign Partnership',
    type: 'Marketing Cooperation',
    status: 'review',
    parties: ['GreenTech LLC', 'EcoSolutions Inc'],
    createdDate: '2025-05-10',
    lastModified: '2025-05-20',
    description: 'Joint marketing campaign for sustainable products',
    version: 1
  }
];

const mockTemplates: ContractTemplate[] = [
  {
    id: '1',
    name: 'Group Purchase Agreement',
    category: 'Group Buying',
    description: 'Standard template for group purchasing contracts',
    template: `GROUP PURCHASE AGREEMENT

1. PARTIES
This agreement is made between the following parties:
{PARTY_NAMES}

2. PRODUCT SPECIFICATION
Product: {PRODUCT_NAME}
Quantity: {QUANTITY}
Quality Standards: {QUALITY_STANDARDS}

3. PRICING
Unit Price: {UNIT_PRICE}
Total Amount: {TOTAL_AMOUNT}

4. DELIVERY
Delivery Date: {DELIVERY_DATE}
Delivery Location: {DELIVERY_LOCATION}

5. PAYMENT TERMS
{PAYMENT_TERMS}

6. DISPUTE RESOLUTION
{DISPUTE_RESOLUTION}`
  }
];

export function ContractManager() {
  const [contracts] = useState<Contract[]>(mockContracts);
  const [templates] = useState<ContractTemplate[]>(mockTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [contractForm, setContractForm] = useState({
    title: '',
    description: '',
    parties: '',
    content: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-50 text-gray-700';
      case 'review': return 'bg-yellow-50 text-yellow-700';
      case 'active': return 'bg-green-50 text-green-700';
      case 'completed': return 'bg-blue-50 text-blue-700';
      case 'disputed': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const handleTemplateSelect = (template: ContractTemplate) => {
    setSelectedTemplate(template);
    setContractForm(prev => ({
      ...prev,
      content: template.template
    }));
  };

  const handleIPFSUpload = (contractId: string) => {
    // Mock IPFS upload
    console.log(`Uploading contract ${contractId} to IPFS...`);
    // In real implementation, this would upload to IPFS and return hash
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <FileText className="mx-auto h-12 w-12 text-purple-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contract Manager</h2>
        <p className="text-gray-600">Create, manage, and store contracts on IPFS</p>
      </div>

      <Tabs defaultValue="contracts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contracts">My Contracts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          {contracts.map(contract => (
            <Card key={contract.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{contract.title}</CardTitle>
                    <CardDescription>{contract.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className={getStatusColor(contract.status)}>
                    {contract.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-500">Type</Label>
                    <p>{contract.type}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Parties</Label>
                    <p>{contract.parties.length} parties</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Created</Label>
                    <p>{contract.createdDate}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Version</Label>
                    <p>v{contract.version}</p>
                  </div>
                </div>

                {contract.ipfsHash && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Label className="text-blue-700 font-medium">IPFS Hash</Label>
                    <p className="text-sm text-blue-600 font-mono break-all">{contract.ipfsHash}</p>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  {!contract.ipfsHash && (
                    <Button 
                      size="sm" 
                      onClick={() => handleIPFSUpload(contract.id)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      Upload to IPFS
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map(template => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="mb-4">{template.category}</Badge>
                  <Button 
                    className="w-full" 
                    onClick={() => handleTemplateSelect(template)}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Contract</CardTitle>
              <CardDescription>
                Create a new contract from scratch or use a template
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Contract Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter contract title..."
                    value={contractForm.title}
                    onChange={(e) => setContractForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parties">Parties (comma-separated)</Label>
                  <Input
                    id="parties"
                    placeholder="Party 1, Party 2, Party 3..."
                    value={contractForm.parties}
                    onChange={(e) => setContractForm(prev => ({ ...prev, parties: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of the contract..."
                  value={contractForm.description}
                  onChange={(e) => setContractForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Contract Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter contract content or select a template..."
                  className="min-h-[300px] font-mono text-sm"
                  value={contractForm.content}
                  onChange={(e) => setContractForm(prev => ({ ...prev, content: e.target.value }))}
                />
              </div>

              <div className="flex gap-2">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Save as Draft
                </Button>
                <Button variant="outline">
                  Send for Review
                </Button>
                <Button variant="outline">
                  Upload to IPFS
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
