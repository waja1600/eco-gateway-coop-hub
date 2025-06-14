
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, AlertTriangle, CheckCircle, Clock, TrendingUp, 
  Shield, Users, DollarSign, FileText, Eye, Zap
} from 'lucide-react';

interface MCPIntegrationProps {
  groupId: string;
  context: 'group' | 'supplier' | 'freelancer' | 'arbitration' | 'investment';
}

interface MCPAnalysis {
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  legalWarnings: string[];
  trustMetrics: {
    compliance: number;
    reliability: number;
    financialStability: number;
  };
  realTimeAlerts: string[];
  contractAnalysis?: {
    clarity: number;
    completeness: number;
    riskFactors: string[];
  };
}

export function MCPIntegration({ groupId, context }: MCPIntegrationProps) {
  const [analysis, setAnalysis] = useState<MCPAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Mock MCP analysis based on context
  const generateMCPAnalysis = (): MCPAnalysis => {
    const contextData = {
      group: {
        score: 85,
        riskLevel: 'low' as const,
        recommendations: [
          'تحسين وضوح عقد التأسيس',
          'إضافة بنود الحوكمة',
          'تحديد آليات التصويت',
          'تفعيل مراقبة ESG'
        ],
        legalWarnings: [
          'تأكد من امتثال القوانين المحلية',
          'مراجعة بنود توزيع المسؤوليات'
        ]
      },
      supplier: {
        score: 92,
        riskLevel: 'low' as const,
        recommendations: [
          'تحسين وثائق الضمان',
          'إضافة شهادات الجودة',
          'تحديث ملف الشركة',
          'تفعيل التأمين التجاري'
        ],
        legalWarnings: [
          'تحديث رخصة العمل',
          'مراجعة شروط التسليم'
        ]
      },
      freelancer: {
        score: 78,
        riskLevel: 'medium' as const,
        recommendations: [
          'تطوير المهارات التقنية',
          'تحسين معرض الأعمال',
          'الحصول على شهادات',
          'تحسين التواصل'
        ],
        legalWarnings: [
          'توثيق الملكية الفكرية',
          'تحديد نطاق العمل بوضوح'
        ]
      },
      arbitration: {
        score: 88,
        riskLevel: 'low' as const,
        recommendations: [
          'جمع الأدلة الداعمة',
          'توثيق المراسلات',
          'تحديد الأضرار بدقة',
          'اختيار محكم متخصص'
        ],
        legalWarnings: [
          'احترام المواعيد القانونية',
          'تجنب التواصل المباشر'
        ]
      },
      investment: {
        score: 91,
        riskLevel: 'low' as const,
        recommendations: [
          'تحسين دراسة الجدوى',
          'إضافة خطة المخاطر',
          'تحديث التوقعات المالية',
          'تعزيز فريق الإدارة'
        ],
        legalWarnings: [
          'الالتزام بقوانين الاستثمار',
          'إفصاح كامل للمخاطر'
        ]
      }
    };

    const data = contextData[context];
    
    return {
      score: data.score,
      riskLevel: data.riskLevel,
      recommendations: data.recommendations,
      legalWarnings: data.legalWarnings,
      trustMetrics: {
        compliance: Math.random() * 40 + 60,
        reliability: Math.random() * 30 + 70,
        financialStability: Math.random() * 35 + 65
      },
      realTimeAlerts: [
        'تحديث جديد في القوانين المحلية',
        'فرصة استثمارية مناسبة متاحة',
        'تحذير من مخاطر السوق الحالية'
      ],
      contractAnalysis: {
        clarity: Math.random() * 30 + 70,
        completeness: Math.random() * 25 + 75,
        riskFactors: [
          'بنود غامضة في التسليم',
          'عدم تحديد آلية حل النزاعات',
          'نقص في تفاصيل الدفع'
        ]
      }
    };
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAnalysis(generateMCPAnalysis());
    setLastUpdate(new Date());
    setIsAnalyzing(false);
  };

  useEffect(() => {
    runAnalysis();
  }, [groupId, context]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getContextTitle = () => {
    const titles = {
      group: 'تحليل المجموعة',
      supplier: 'تقييم المورد',
      freelancer: 'تقييم المستقل',
      arbitration: 'تحليل النزاع',
      investment: 'تقييم الاستثمار'
    };
    return titles[context];
  };

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
            </div>
            <div>
              <CardTitle>محرك MCP</CardTitle>
              <CardDescription>جاري التحليل...</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Brain className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle>{getContextTitle()}</CardTitle>
              <CardDescription>
                آخر تحديث: {lastUpdate.toLocaleTimeString('ar-SA')}
              </CardDescription>
            </div>
          </div>
          <Button 
            onClick={runAnalysis}
            disabled={isAnalyzing}
            size="sm"
            variant="outline"
          >
            {isAnalyzing ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                يحلل...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                تحديث
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="metrics">المقاييس</TabsTrigger>
            <TabsTrigger value="recommendations">التوصيات</TabsTrigger>
            <TabsTrigger value="alerts">التنبيهات</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-3xl font-bold ${getScoreColor(analysis.score)} mb-2`}>
                  {analysis.score}%
                </div>
                <div className="text-sm text-gray-600">نقاط MCP</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Badge className={`${getRiskColor(analysis.riskLevel)} mb-2`}>
                  {analysis.riskLevel === 'low' ? 'مخاطر منخفضة' :
                   analysis.riskLevel === 'medium' ? 'مخاطر متوسطة' : 'مخاطر عالية'}
                </Badge>
                <div className="text-sm text-gray-600">مستوى المخاطر</div>
              </div>
            </div>

            {analysis.contractAnalysis && (
              <div className="space-y-3">
                <h4 className="font-semibold text-right">تحليل العقد:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">وضوح البنود</span>
                    <Progress value={analysis.contractAnalysis.clarity} className="w-1/2" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">اكتمال العقد</span>
                    <Progress value={analysis.contractAnalysis.completeness} className="w-1/2" />
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-right">مقاييس الثقة:</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">الامتثال</span>
                  <div className="flex items-center gap-2">
                    <Progress value={analysis.trustMetrics.compliance} className="w-24" />
                    <span className="text-sm font-medium">{Math.round(analysis.trustMetrics.compliance)}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">الموثوقية</span>
                  <div className="flex items-center gap-2">
                    <Progress value={analysis.trustMetrics.reliability} className="w-24" />
                    <span className="text-sm font-medium">{Math.round(analysis.trustMetrics.reliability)}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">الاستقرار المالي</span>
                  <div className="flex items-center gap-2">
                    <Progress value={analysis.trustMetrics.financialStability} className="w-24" />
                    <span className="text-sm font-medium">{Math.round(analysis.trustMetrics.financialStability)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-right flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                التوصيات المقترحة:
              </h4>
              <div className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-right">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {analysis.legalWarnings.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-right flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  تحذيرات قانونية:
                </h4>
                <div className="space-y-2">
                  {analysis.legalWarnings.map((warning, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                      <Shield className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-right">{warning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-right flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-600" />
                التنبيهات الفورية:
              </h4>
              <div className="space-y-2">
                {analysis.realTimeAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                    <Brain className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-right">{alert}</span>
                  </div>
                ))}
              </div>
            </div>

            {analysis.contractAnalysis && (
              <div className="space-y-3">
                <h4 className="font-semibold text-right">عوامل المخاطر في العقد:</h4>
                <div className="space-y-2">
                  {analysis.contractAnalysis.riskFactors.map((risk, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-right">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
