
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, Clock, CheckCircle, AlertTriangle, Users, 
  Brain, Shield, Vote, Package, DollarSign
} from 'lucide-react';

interface ContractStage {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending';
  description: string;
  timestamp?: string;
}

interface ContractWorkflowProps {
  contractId: string;
  type: 'supply' | 'service' | 'incorporation' | 'arbitration';
}

export function ContractWorkflow({ contractId, type }: ContractWorkflowProps) {
  const [currentStage, setCurrentStage] = useState(2);

  const workflowStages: ContractStage[] = [
    {
      id: 'initiation',
      name: 'بدء العقد',
      status: 'completed',
      description: 'تم إنشاء العقد وتحديد الأطراف',
      timestamp: '2024-01-15 10:30'
    },
    {
      id: 'negotiation',
      name: 'التفاوض',
      status: 'completed',
      description: '3 جولات تفاوض مع تحليل MCP',
      timestamp: '2024-01-16 14:20'
    },
    {
      id: 'voting',
      name: 'التصويت',
      status: 'active',
      description: 'تصويت الأعضاء على الموافقة',
      timestamp: ''
    },
    {
      id: 'signing',
      name: 'التوقيع',
      status: 'pending',
      description: 'توقيع رقمي وتوثيق IPFS',
      timestamp: ''
    },
    {
      id: 'execution',
      name: 'التنفيذ',
      status: 'pending',
      description: 'بدء تنفيذ بنود العقد',
      timestamp: ''
    },
    {
      id: 'completion',
      name: 'الإكمال',
      status: 'pending',
      description: 'إنهاء العقد وتقييم الأداء',
      timestamp: ''
    }
  ];

  const getStageIcon = (stage: ContractStage, index: number) => {
    if (stage.status === 'completed') {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    } else if (stage.status === 'active') {
      return <Clock className="h-5 w-5 text-blue-600 animate-pulse" />;
    } else {
      return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStageColor = (stage: ContractStage) => {
    switch (stage.status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'active': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const mockContractData = {
    title: 'عقد توريد أجهزة كمبيوتر',
    value: 45000,
    parties: ['مجموعة الشراء التقني', 'شركة الحاسوب المتقدم'],
    mcpScore: 88,
    riskLevel: 'منخفض',
    estimatedCompletion: '2024-02-15'
  };

  return (
    <div className="space-y-6">
      {/* Contract Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {mockContractData.title}
              </CardTitle>
              <CardDescription>العقد رقم: {contractId}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                ${mockContractData.value.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">قيمة العقد</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-purple-600" />
                <span className="font-medium">نقاط MCP</span>
              </div>
              <div className="text-xl font-bold text-purple-600">{mockContractData.mcpScore}%</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-medium">مستوى المخاطر</span>
              </div>
              <Badge className="bg-green-100 text-green-800">{mockContractData.riskLevel}</Badge>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="font-medium">الإكمال المتوقع</span>
              </div>
              <div className="text-sm font-medium">{mockContractData.estimatedCompletion}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Progress */}
      <Card>
        <CardHeader>
          <CardTitle>سير العمل</CardTitle>
          <CardDescription>تتبع مراحل العقد من البداية إلى النهاية</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>التقدم الإجمالي</span>
                <span>{Math.round((currentStage / workflowStages.length) * 100)}%</span>
              </div>
              <Progress value={(currentStage / workflowStages.length) * 100} className="h-2" />
            </div>

            {/* Stages */}
            <div className="space-y-4">
              {workflowStages.map((stage, index) => (
                <div key={stage.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    {getStageIcon(stage, index)}
                    {index < workflowStages.length - 1 && (
                      <div className={`w-px h-12 mt-2 ${
                        stage.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className={`p-4 rounded-lg border ${getStageColor(stage)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{stage.name}</h4>
                        {stage.timestamp && (
                          <span className="text-xs text-gray-500">{stage.timestamp}</span>
                        )}
                      </div>
                      <p className="text-sm">{stage.description}</p>
                      
                      {stage.status === 'active' && (
                        <div className="mt-3 flex gap-2">
                          <Button size="sm">عرض التفاصيل</Button>
                          <Button size="sm" variant="outline">إجراء عمل</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Stage Actions */}
      {workflowStages[currentStage] && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="h-5 w-5" />
              المرحلة الحالية: {workflowStages[currentStage].name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium mb-2">الإجراءات المطلوبة:</h5>
                <ul className="space-y-1 text-sm">
                  <li>• مراجعة بنود العقد النهائية</li>
                  <li>• التصويت على الموافقة (7 من 12 عضو صوتوا)</li>
                  <li>• انتظار موافقة باقي الأعضاء</li>
                </ul>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1">
                  <Vote className="h-4 w-4 mr-2" />
                  التصويت الآن
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  مراجعة العقد
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Parties and Stakeholders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            أطراف العقد
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockContractData.parties.map((party, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium">{party}</span>
                </div>
                <Badge variant="outline">
                  {index === 0 ? 'المشتري' : 'المورد'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
