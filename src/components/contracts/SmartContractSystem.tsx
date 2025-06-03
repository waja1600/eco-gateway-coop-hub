
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Download, Upload, Eye, Edit, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SmartContract {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'pending_signatures' | 'signed' | 'executed' | 'disputed';
  createdDate: Date;
  parties: string[];
  ipfsHash?: string;
  clauses: ContractClause[];
}

interface ContractClause {
  id: string;
  title: string;
  content: string;
  editable: boolean;
  required: boolean;
}

export function SmartContractSystem({ groupId }: { groupId: string }) {
  const [contracts, setContracts] = useState<SmartContract[]>([
    {
      id: 'contract_1',
      title: 'اتفاقية شراء جماعي',
      type: 'group_buying',
      status: 'pending_signatures',
      createdDate: new Date(2024, 11, 10),
      parties: ['أحمد محمد', 'سارة علي', 'محمد حسن'],
      clauses: [
        {
          id: 'clause_1',
          title: 'شروط الشراء',
          content: 'يوافق جميع الأطراف على شراء المنتجات المحددة بالكمية والسعر المتفق عليه.',
          editable: true,
          required: true
        },
        {
          id: 'clause_2',
          title: 'شروط الدفع',
          content: 'يتم الدفع خلال 30 يوم من تاريخ التوقيع على العقد.',
          editable: true,
          required: true
        }
      ]
    }
  ]);

  const [selectedContract, setSelectedContract] = useState<SmartContract | null>(null);
  const [editingClause, setEditingClause] = useState<string | null>(null);

  const contractTemplates = [
    { id: 'group_buying', name: 'عقد شراء جماعي', description: 'للمشتريات الجماعية والتعاونية' },
    { id: 'service_agreement', name: 'اتفاقية خدمات', description: 'لتقديم الخدمات المهنية' },
    { id: 'partnership', name: 'اتفاقية شراكة', description: 'للشراكات التجارية' },
    { id: 'supplier_contract', name: 'عقد مورد', description: 'للتعامل مع الموردين' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-50 text-gray-700';
      case 'pending_signatures': return 'bg-yellow-50 text-yellow-700';
      case 'signed': return 'bg-green-50 text-green-700';
      case 'executed': return 'bg-blue-50 text-blue-700';
      case 'disputed': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft': return 'مسودة';
      case 'pending_signatures': return 'في انتظار التوقيعات';
      case 'signed': return 'موقع';
      case 'executed': return 'منفذ';
      case 'disputed': return 'متنازع عليه';
      default: return status;
    }
  };

  const createNewContract = (templateId: string) => {
    const template = contractTemplates.find(t => t.id === templateId);
    if (!template) return;

    const newContract: SmartContract = {
      id: `contract_${Date.now()}`,
      title: `${template.name} جديد`,
      type: templateId,
      status: 'draft',
      createdDate: new Date(),
      parties: [],
      clauses: [
        {
          id: 'clause_1',
          title: 'البنود الأساسية',
          content: 'يرجى تحديد البنود الأساسية للعقد...',
          editable: true,
          required: true
        }
      ]
    };

    setContracts(prev => [...prev, newContract]);
    setSelectedContract(newContract);
  };

  const updateClause = (contractId: string, clauseId: string, newContent: string) => {
    setContracts(prev => prev.map(contract => 
      contract.id === contractId 
        ? {
            ...contract,
            clauses: contract.clauses.map(clause =>
              clause.id === clauseId ? { ...clause, content: newContent } : clause
            )
          }
        : contract
    ));
  };

  const exportToPDF = (contract: SmartContract) => {
    // Simulate PDF export
    console.log('Exporting contract to PDF:', contract.title);
    // In real implementation, this would generate and download a PDF
  };

  const uploadToIPFS = (contract: SmartContract) => {
    // Simulate IPFS upload
    console.log('Uploading contract to IPFS:', contract.title);
    const fakeHash = `Qm${Math.random().toString(36).substr(2, 44)}`;
    
    setContracts(prev => prev.map(c => 
      c.id === contract.id ? { ...c, ipfsHash: fakeHash } : c
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">نظام العقود الذكية</h2>
        <Button onClick={() => setSelectedContract(null)}>
          <FileText className="h-4 w-4 mr-2" />
          عقد جديد
        </Button>
      </div>

      <Tabs defaultValue="contracts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contracts">العقود</TabsTrigger>
          <TabsTrigger value="templates">القوالب</TabsTrigger>
          <TabsTrigger value="signatures">التوقيعات</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="mt-6">
          {selectedContract ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedContract.title}</CardTitle>
                    <CardDescription>
                      تم الإنشاء في {selectedContract.createdDate.toLocaleDateString('ar-SA')}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(selectedContract.status)}>
                      {getStatusText(selectedContract.status)}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedContract(null)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">بنود العقد</h4>
                  <div className="space-y-4">
                    {selectedContract.clauses.map((clause) => (
                      <div key={clause.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium">{clause.title}</h5>
                          {clause.editable && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingClause(clause.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        {editingClause === clause.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={clause.content}
                              onChange={(e) => updateClause(selectedContract.id, clause.id, e.target.value)}
                              className="min-h-[100px]"
                            />
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => setEditingClause(null)}
                              >
                                <Check className="h-4 w-4" />
                                حفظ
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setEditingClause(null)}
                              >
                                إلغاء
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600">{clause.content}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => exportToPDF(selectedContract)}>
                    <Download className="h-4 w-4 mr-2" />
                    تصدير PDF
                  </Button>
                  <Button variant="outline" onClick={() => uploadToIPFS(selectedContract)}>
                    <Upload className="h-4 w-4 mr-2" />
                    رفع إلى IPFS
                  </Button>
                  {selectedContract.ipfsHash && (
                    <Badge variant="outline" className="px-3 py-1">
                      IPFS: {selectedContract.ipfsHash.substring(0, 10)}...
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contracts.map((contract) => (
                <Card key={contract.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader onClick={() => setSelectedContract(contract)}>
                    <CardTitle className="text-lg">{contract.title}</CardTitle>
                    <CardDescription>{contract.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className={getStatusColor(contract.status)}>
                        {getStatusText(contract.status)}
                      </Badge>
                      <p className="text-sm text-gray-500">
                        {contract.createdDate.toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contractTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full"
                    onClick={() => createNewContract(template.id)}
                  >
                    استخدم هذا القالب
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="signatures" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>طلبات التوقيع</CardTitle>
              <CardDescription>العقود التي تنتظر توقيعك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">لا توجد عقود تنتظر توقيعك حالياً</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
