
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileCheck, Upload, Download, Shield, Clock, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Contract {
  id: string;
  title: string;
  type: string;
  parties: string[];
  status: 'draft' | 'pending_signatures' | 'signed' | 'verified' | 'expired';
  created: string;
  ipfsHash?: string;
  version: number;
  signaturesCount: number;
  totalSignatures: number;
}

const mockContracts: Contract[] = [
  {
    id: '1',
    title: 'Software Development Agreement',
    type: 'Service Contract',
    parties: ['TechStart Inc', 'DevCorp Ltd'],
    status: 'signed',
    created: '2024-01-10',
    ipfsHash: 'QmX7Y8Z9...',
    version: 2,
    signaturesCount: 2,
    totalSignatures: 2
  },
  {
    id: '2',
    title: 'Supply Chain Partnership',
    type: 'Partnership Agreement',
    parties: ['GreenSupply Co', 'EcoManufacturing'],
    status: 'pending_signatures',
    created: '2024-01-15',
    version: 1,
    signaturesCount: 1,
    totalSignatures: 2
  }
];

const contractTemplates = [
  { name: 'Service Agreement', category: 'Services', description: 'Standard service provision contract' },
  { name: 'Supply Contract', category: 'Procurement', description: 'Goods supply and delivery terms' },
  { name: 'Partnership Agreement', category: 'Partnership', description: 'Business partnership structure' },
  { name: 'Employment Contract', category: 'HR', description: 'Employee terms and conditions' },
  { name: 'NDA Agreement', category: 'Legal', description: 'Non-disclosure agreement template' },
  { name: 'Licensing Agreement', category: 'IP', description: 'Intellectual property licensing' }
];

export function ContractVerificationGateway() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const contractTypes = ['all', 'Service Contract', 'Partnership Agreement', 'Supply Contract', 'Employment Contract'];

  const filteredContracts = mockContracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || contract.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-50 text-gray-700';
      case 'pending_signatures': return 'bg-yellow-50 text-yellow-700';
      case 'signed': return 'bg-blue-50 text-blue-700';
      case 'verified': return 'bg-green-50 text-green-700';
      case 'expired': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <FileCheck className="mx-auto h-16 w-16 text-indigo-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contract Verification & Documentation</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Verify, document, and manage contracts with blockchain-backed security and IPFS storage. 
          Use smart templates and digital signatures.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search contracts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {contractTypes.map(type => (
            <option key={type} value={type}>
              {type === 'all' ? 'All Contract Types' : type}
            </option>
          ))}
        </select>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Contract
        </Button>
        <Button variant="outline">
          New Contract
        </Button>
      </div>

      <Tabs defaultValue="contracts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contracts">My Contracts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="ipfs">IPFS Storage</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContracts.map(contract => (
              <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{contract.title}</CardTitle>
                    <Badge variant="outline" className={getStatusColor(contract.status)}>
                      {formatStatus(contract.status)}
                    </Badge>
                  </div>
                  <CardDescription>{contract.type}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-indigo-600">
                        v{contract.version}
                      </div>
                      <div className="text-sm text-gray-600">Version</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-indigo-600">
                        {contract.signaturesCount}/{contract.totalSignatures}
                      </div>
                      <div className="text-sm text-gray-600">Signatures</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Parties: {contract.parties.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Created: {contract.created}</span>
                    </div>
                    {contract.ipfsHash && (
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span className="truncate">IPFS: {contract.ipfsHash}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contractTemplates.map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-indigo-600" />
                    {template.name}
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="outline">{template.category}</Badge>
                    <span className="text-sm text-gray-500">Smart Template</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="verification" className="mt-6">
          <div className="text-center py-12">
            <Shield className="mx-auto h-16 w-16 text-indigo-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contract Verification System</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our verification system uses cryptographic signatures and IPFS storage 
              to ensure contract integrity and authenticity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Upload Contract</h3>
                <p className="text-sm text-gray-600">Upload your contract document for verification</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Verify & Sign</h3>
                <p className="text-sm text-gray-600">Digital signatures with cryptographic security</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">IPFS Storage</h3>
                <p className="text-sm text-gray-600">Immutable storage on distributed network</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ipfs" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>IPFS Storage Dashboard</CardTitle>
                <CardDescription>
                  Monitor your contracts stored on the InterPlanetary File System
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">256</div>
                    <div className="text-sm text-gray-600">Stored Contracts</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">45.2 MB</div>
                    <div className="text-sm text-gray-600">Total Storage</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">99.9%</div>
                    <div className="text-sm text-gray-600">Availability</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
