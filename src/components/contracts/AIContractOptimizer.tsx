
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  BarChart3,
  Shield,
  Clock
} from 'lucide-react';

interface OptimizationSuggestion {
  id: string;
  type: 'cost' | 'risk' | 'timeline' | 'compliance';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  savings?: number;
  implementation: string;
}

interface ContractAnalysis {
  score: number;
  suggestions: OptimizationSuggestion[];
  riskLevel: 'low' | 'medium' | 'high';
  estimatedSavings: number;
  complianceScore: number;
}

export function AIContractOptimizer() {
  const [contractText, setContractText] = useState('');
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockAnalysis: ContractAnalysis = {
    score: 87,
    riskLevel: 'low',
    estimatedSavings: 15000,
    complianceScore: 94,
    suggestions: [
      {
        id: '1',
        type: 'cost',
        title: 'Optimize Delivery Terms',
        description: 'Consolidate delivery schedules to reduce shipping costs by 12%',
        impact: 'high',
        savings: 8500,
        implementation: 'Modify clause 4.2 to specify bulk delivery windows'
      },
      {
        id: '2',
        type: 'risk',
        title: 'Add Force Majeure Protection',
        description: 'Include comprehensive force majeure clause to protect against unforeseen events',
        impact: 'medium',
        implementation: 'Add standard force majeure clause after section 7'
      },
      {
        id: '3',
        type: 'compliance',
        title: 'Update Data Protection Terms',
        description: 'Ensure GDPR compliance with updated data handling provisions',
        impact: 'high',
        implementation: 'Replace section 12 with GDPR-compliant data processing terms'
      },
      {
        id: '4',
        type: 'timeline',
        title: 'Streamline Approval Process',
        description: 'Reduce approval timeline from 14 to 7 days with parallel review process',
        impact: 'medium',
        implementation: 'Modify approval workflow in section 6.1'
      }
    ]
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cost': return <TrendingUp className="h-4 w-4" />;
      case 'risk': return <Shield className="h-4 w-4" />;
      case 'timeline': return <Clock className="h-4 w-4" />;
      case 'compliance': return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">AI Contract Optimizer</CardTitle>
              <CardDescription className="text-purple-100">
                Advanced AI analysis for contract optimization and risk assessment
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Contract Analysis Input</CardTitle>
            <CardDescription>
              Paste your contract text or upload a document for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your contract text here for AI analysis..."
              value={contractText}
              onChange={(e) => setContractText(e.target.value)}
              className="min-h-[300px]"
            />
            <div className="flex gap-2">
              <Button 
                onClick={handleAnalyze}
                disabled={!contractText || isAnalyzing}
                className="flex-1"
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Analyze Contract
                  </>
                )}
              </Button>
              <Button variant="outline">
                Upload Document
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              AI-powered insights and optimization recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="flex items-center justify-center h-[300px]">
                <div className="text-center space-y-4">
                  <Brain className="h-12 w-12 mx-auto text-purple-600 animate-pulse" />
                  <div>
                    <p className="font-medium">AI Analysis in Progress</p>
                    <p className="text-sm text-gray-600">
                      Analyzing contract terms, risks, and optimization opportunities...
                    </p>
                  </div>
                  <Progress value={65} className="w-48 mx-auto" />
                </div>
              </div>
            ) : analysis ? (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{analysis.score}</div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{analysis.complianceScore}%</div>
                    <div className="text-sm text-gray-600">Compliance</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      ${analysis.estimatedSavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Est. Savings</div>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Risk Level</span>
                    <Badge className={`${getRiskColor(analysis.riskLevel)} bg-transparent border`}>
                      {analysis.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <Progress 
                    value={analysis.riskLevel === 'low' ? 25 : analysis.riskLevel === 'medium' ? 60 : 90} 
                    className="h-2"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter contract text to begin analysis</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Optimization Suggestions */}
      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Optimization Suggestions</CardTitle>
            <CardDescription>
              AI-generated recommendations to improve your contract
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.suggestions.map((suggestion) => (
                <div key={suggestion.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(suggestion.type)}
                      <div>
                        <h4 className="font-medium">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getImpactColor(suggestion.impact)}>
                        {suggestion.impact} impact
                      </Badge>
                      {suggestion.savings && (
                        <Badge variant="outline" className="text-green-700">
                          ${suggestion.savings.toLocaleString()} saved
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <strong>Implementation:</strong> {suggestion.implementation}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      Apply Suggestion
                    </Button>
                    <Button size="sm" variant="ghost">
                      More Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI Market Insights</CardTitle>
          <CardDescription>
            Real-time market data and industry benchmarks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <BarChart3 className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold">23%</div>
              <div className="text-sm text-gray-600">Market Avg Savings</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Clock className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold">5.2 days</div>
              <div className="text-sm text-gray-600">Avg Processing Time</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Shield className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <div className="text-2xl font-bold">97.8%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
