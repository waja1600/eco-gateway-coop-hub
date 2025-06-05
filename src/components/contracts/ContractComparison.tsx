
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileText, TrendingUp, DollarSign, Clock, Shield, Check } from 'lucide-react';

interface ContractOption {
  id: string;
  title: string;
  provider: string;
  price: number;
  originalPrice: number;
  savingsPercent: number;
  deliveryTime: string;
  rating: number;
  compliance: string[];
  features: string[];
  riskLevel: 'low' | 'medium' | 'high';
  votes: number;
  totalVotes: number;
  ipfsHash: string;
}

interface ContractComparisonProps {
  groupId: string;
  contractType: string;
}

export function ContractComparison({ groupId, contractType }: ContractComparisonProps) {
  const [selectedContracts, setSelectedContracts] = useState<string[]>([]);
  const [votingActive, setVotingActive] = useState(true);

  const contractOptions: ContractOption[] = [
    {
      id: 'contract_1',
      title: 'Premium Enterprise License Package',
      provider: 'TechCorp Solutions',
      price: 45000,
      originalPrice: 60000,
      savingsPercent: 25,
      deliveryTime: '2-3 weeks',
      rating: 4.8,
      compliance: ['ISO 27001', 'SOC 2', 'GDPR'],
      features: ['24/7 Support', 'Advanced Analytics', 'Custom Integrations', 'Training Included'],
      riskLevel: 'low',
      votes: 18,
      totalVotes: 25,
      ipfsHash: 'QmXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    },
    {
      id: 'contract_2',
      title: 'Standard Business Package',
      provider: 'GlobalTech Inc',
      price: 35000,
      originalPrice: 45000,
      savingsPercent: 22,
      deliveryTime: '1-2 weeks',
      rating: 4.5,
      compliance: ['ISO 27001', 'SOC 2'],
      features: ['Business Hours Support', 'Standard Analytics', 'Basic Integrations'],
      riskLevel: 'medium',
      votes: 12,
      totalVotes: 25,
      ipfsHash: 'QmYYYYYYYYYYYYYYYYYYYYYYYYYYY'
    },
    {
      id: 'contract_3',
      title: 'Economy Starter Package',
      provider: 'BudgetSoft Ltd',
      price: 28000,
      originalPrice: 35000,
      savingsPercent: 20,
      deliveryTime: '3-4 weeks',
      rating: 4.2,
      compliance: ['Basic Security'],
      features: ['Email Support', 'Basic Features', 'Limited Integrations'],
      riskLevel: 'high',
      votes: 5,
      totalVotes: 25,
      ipfsHash: 'QmZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
    }
  ];

  const handleVote = (contractId: string) => {
    console.log(`Voting for contract: ${contractId}`);
    // In real implementation, this would interact with smart contracts
  };

  const handleCompare = () => {
    if (selectedContracts.length < 2) {
      alert('Please select at least 2 contracts to compare');
      return;
    }
    console.log('Comparing contracts:', selectedContracts);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-50 text-green-700';
      case 'medium': return 'bg-yellow-50 text-yellow-700';
      case 'high': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getVotePercentage = (votes: number, total: number) => {
    return total > 0 ? (votes / total) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">مقارنة العقود الذكية</h2>
        <p className="text-gray-600">اختر أفضل العقود للمجموعة بناءً على التصويت الجماعي</p>
      </div>

      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison">المقارنة</TabsTrigger>
          <TabsTrigger value="voting">التصويت</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">العقود المتاحة ({contractOptions.length})</h3>
            <Button 
              onClick={handleCompare}
              disabled={selectedContracts.length < 2}
              className="bg-blue-600 hover:bg-blue-700"
            >
              مقارنة المختارة ({selectedContracts.length})
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {contractOptions.map((contract) => (
              <Card 
                key={contract.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedContracts.includes(contract.id) ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => {
                  if (selectedContracts.includes(contract.id)) {
                    setSelectedContracts(prev => prev.filter(id => id !== contract.id));
                  } else {
                    setSelectedContracts(prev => [...prev, contract.id]);
                  }
                }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{contract.title}</CardTitle>
                      <CardDescription>{contract.provider}</CardDescription>
                    </div>
                    {selectedContracts.includes(contract.id) && (
                      <Check className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {contract.price.toLocaleString()} ريال
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      {contract.originalPrice.toLocaleString()} ريال
                    </div>
                    <Badge className="bg-green-50 text-green-700">
                      وفر {contract.savingsPercent}%
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">التسليم: {contract.deliveryTime}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gray-500" />
                      <Badge variant="outline" className={getRiskColor(contract.riskLevel)}>
                        مخاطر {contract.riskLevel === 'low' ? 'منخفضة' : 
                               contract.riskLevel === 'medium' ? 'متوسطة' : 'عالية'}
                      </Badge>
                    </div>

                    <div className="text-sm">
                      <div className="font-medium mb-1">معايير الامتثال:</div>
                      <div className="flex flex-wrap gap-1">
                        {contract.compliance.map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="font-medium mb-1">المميزات الرئيسية:</div>
                      <ul className="text-xs space-y-1">
                        {contract.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <Check className="h-3 w-3 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>نسبة التأييد</span>
                        <span>{Math.round(getVotePercentage(contract.votes, contract.totalVotes))}%</span>
                      </div>
                      <Progress 
                        value={getVotePercentage(contract.votes, contract.totalVotes)} 
                        className="h-2"
                      />
                      <div className="text-xs text-gray-500 text-center">
                        {contract.votes} من أصل {contract.totalVotes} صوت
                      </div>
                    </div>
                  </div>

                  {votingActive && (
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVote(contract.id);
                      }}
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      تأييد هذا العقد
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="voting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>نظام التصويت الذكي</CardTitle>
              <CardDescription>
                نظام تصويت لامركزي مبني على البلوك تشين لضمان الشفافية والعدالة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">25</div>
                  <div className="text-sm text-blue-700">إجمالي الأصوات</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">72%</div>
                  <div className="text-sm text-green-700">نسبة المشاركة</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">2 days</div>
                  <div className="text-sm text-purple-700">متبقي للتصويت</div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">قواعد التصويت</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• كل عضو له صوت واحد لكل عقد</li>
                  <li>• يتطلب النصاب 60% من الأعضاء للموافقة</li>
                  <li>• جميع الأصوات مسجلة على البلوك تشين</li>
                  <li>• لا يمكن تغيير الصوت بعد التسجيل</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="font-medium">إجمالي الوفورات</span>
              </div>
              <div className="text-2xl font-bold text-green-600">47,000 ريال</div>
              <div className="text-sm text-gray-600">مقارنة بالشراء الفردي</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="font-medium">متوسط التوفير</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">22.3%</div>
              <div className="text-sm text-gray-600">لكل عقد</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-purple-600" />
                <span className="font-medium">العقود المقيمة</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-gray-600">هذا الشهر</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-orange-600" />
                <span className="font-medium">معدل الامتثال</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">94%</div>
              <div className="text-sm text-gray-600">للمعايير الدولية</div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تحليل المخاطر والفوائد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">العقد الأعلى تقييماً</h4>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium">Premium Enterprise License Package</div>
                    <div className="text-sm text-gray-600">
                      نسبة تأييد 72% • مخاطر منخفضة • امتثال كامل للمعايير
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">توصيات الذكاء الاصطناعي</h4>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-800">
                      • يُنصح بالعقد الأول لضمان أفضل قيمة مقابل المال
                      <br />
                      • العقد يلبي جميع متطلبات المجموعة التقنية
                      <br />
                      • مستوى المخاطر منخفض مع ضمانات قوية
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
