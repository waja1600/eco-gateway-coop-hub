
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Scale, 
  FileText, 
  Clock, 
  Users, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  Gavel,
  Eye,
  Upload
} from 'lucide-react';

interface ArbitrationCase {
  id: string;
  title: string;
  type: 'commercial' | 'contract' | 'intellectual_property' | 'employment';
  status: 'filed' | 'under_review' | 'hearing' | 'decision_pending' | 'resolved';
  amount: number;
  parties: string[];
  arbitrator: string;
  filedDate: string;
  deadline: string;
  progress: number;
  evidenceCount: number;
}

const mockCases: ArbitrationCase[] = [
  {
    id: 'ARB-2024-001',
    title: 'Contract Dispute - Software License',
    type: 'contract',
    status: 'hearing',
    amount: 125000,
    parties: ['TechCorp Ltd', 'SoftwareSolutions Inc'],
    arbitrator: 'Dr. Sarah Ahmed',
    filedDate: '2024-01-15',
    deadline: '2024-02-28',
    progress: 65,
    evidenceCount: 12
  },
  {
    id: 'ARB-2024-002',
    title: 'Commercial Partnership Dispute',
    type: 'commercial',
    status: 'under_review',
    amount: 250000,
    parties: ['GlobalTrade LLC', 'Regional Partners'],
    arbitrator: 'Prof. Ahmed Hassan',
    filedDate: '2024-01-20',
    deadline: '2024-03-15',
    progress: 30,
    evidenceCount: 8
  }
];

export function AdvancedArbitrationSystem() {
  const [cases] = useState<ArbitrationCase[]>(mockCases);
  const [selectedTab, setSelectedTab] = useState('cases');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'filed': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'hearing': return 'bg-orange-100 text-orange-800';
      case 'decision_pending': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'commercial': return 'bg-blue-50 text-blue-700';
      case 'contract': return 'bg-green-50 text-green-700';
      case 'intellectual_property': return 'bg-purple-50 text-purple-700';
      case 'employment': return 'bg-orange-50 text-orange-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'filed': return 1;
      case 'under_review': return 2;
      case 'hearing': return 3;
      case 'decision_pending': return 4;
      case 'resolved': return 5;
      default: return 1;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Scale className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">ORDA - Online Dispute Resolution</CardTitle>
              <CardDescription className="text-amber-100">
                Advanced arbitration system with AI-powered case analysis
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Cases</p>
                <p className="text-2xl font-bold">{cases.filter(c => c.status !== 'resolved').length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">${cases.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}</p>
              </div>
              <Scale className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Resolution</p>
                <p className="text-2xl font-bold">14 days</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">96.8%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Arbitration Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cases">Active Cases</TabsTrigger>
          <TabsTrigger value="arbitrators">Arbitrators</TabsTrigger>
          <TabsTrigger value="file">File Dispute</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-6">
          {cases.map((arbitrationCase) => (
            <Card key={arbitrationCase.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">{arbitrationCase.title}</CardTitle>
                      <Badge className={getStatusColor(arbitrationCase.status)}>
                        {arbitrationCase.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={getTypeColor(arbitrationCase.type)}>
                        {arbitrationCase.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <CardDescription>
                      Case ID: {arbitrationCase.id} • Amount: ${arbitrationCase.amount.toLocaleString()}
                    </CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Case
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Case Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Case Progress</span>
                    <span>{arbitrationCase.progress}%</span>
                  </div>
                  <Progress value={arbitrationCase.progress} className="h-2" />
                  
                  {/* Progress Steps */}
                  <div className="grid grid-cols-5 gap-2 text-xs">
                    {['Filed', 'Review', 'Hearing', 'Decision', 'Resolved'].map((step, index) => (
                      <div key={step} className={`text-center p-2 rounded ${
                        getStatusStep(arbitrationCase.status) > index 
                          ? 'bg-green-100 text-green-800' 
                          : getStatusStep(arbitrationCase.status) === index + 1
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Case Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Arbitrator:</span>
                    <div className="font-medium">{arbitrationCase.arbitrator}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Filed Date:</span>
                    <div>{arbitrationCase.filedDate}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Deadline:</span>
                    <div>{arbitrationCase.deadline}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Evidence Files:</span>
                    <div>{arbitrationCase.evidenceCount} documents</div>
                  </div>
                </div>

                {/* Parties */}
                <div>
                  <div className="text-sm text-gray-600 mb-2">Parties Involved:</div>
                  <div className="flex gap-2">
                    {arbitrationCase.parties.map((party, index) => (
                      <Badge key={index} variant="outline">
                        {party}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Documents
                  </Button>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Evidence
                  </Button>
                  <Button size="sm" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Contact Arbitrator
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="arbitrators" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Dr. Sarah Ahmed',
                specialization: 'Commercial Law',
                experience: '15 years',
                cases: 127,
                rating: 4.9,
                languages: ['English', 'Arabic'],
                certifications: ['ICC', 'LCIA', 'DIAC']
              },
              {
                name: 'Prof. Ahmed Hassan',
                specialization: 'Contract Disputes',
                experience: '20 years',
                cases: 183,
                rating: 4.8,
                languages: ['Arabic', 'English', 'French'],
                certifications: ['ICC', 'AAA', 'SIAC']
              },
              {
                name: 'Dr. Fatima Al-Zahra',
                specialization: 'IP & Technology',
                experience: '12 years',
                cases: 89,
                rating: 4.9,
                languages: ['Arabic', 'English'],
                certifications: ['WIPO', 'ICC', 'LCIA']
              }
            ].map((arbitrator, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{arbitrator.name}</CardTitle>
                      <CardDescription>{arbitrator.specialization}</CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">{arbitrator.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Experience:</span>
                      <div className="font-medium">{arbitrator.experience}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Cases Resolved:</span>
                      <div className="font-medium">{arbitrator.cases}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">Languages:</div>
                    <div className="flex gap-1 flex-wrap">
                      {arbitrator.languages.map((lang, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">Certifications:</div>
                    <div className="flex gap-1 flex-wrap">
                      {arbitrator.certifications.map((cert, i) => (
                        <Badge key={i} className="text-xs bg-blue-100 text-blue-800">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">
                    Request Arbitrator
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="file" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>File New Dispute</CardTitle>
              <CardDescription>
                Submit a new arbitration case through our streamlined process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-32 flex-col gap-3 text-center">
                  <FileText className="h-8 w-8" />
                  <div>
                    <div className="font-medium">Contract Dispute</div>
                    <div className="text-xs opacity-75">Breach of contract issues</div>
                  </div>
                </Button>
                
                <Button className="h-32 flex-col gap-3 text-center" variant="outline">
                  <Users className="h-8 w-8" />
                  <div>
                    <div className="font-medium">Commercial Dispute</div>
                    <div className="text-xs opacity-75">Business partnership issues</div>
                  </div>
                </Button>
                
                <Button className="h-32 flex-col gap-3 text-center" variant="outline">
                  <Shield className="h-8 w-8" />
                  <div>
                    <div className="font-medium">IP Dispute</div>
                    <div className="text-xs opacity-75">Intellectual property claims</div>
                  </div>
                </Button>
                
                <Button className="h-32 flex-col gap-3 text-center" variant="outline">
                  <Gavel className="h-8 w-8" />
                  <div>
                    <div className="font-medium">Other Dispute</div>
                    <div className="text-xs opacity-75">Custom arbitration case</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filing Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Required Documents</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Contract or agreement in dispute
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Evidence of attempted resolution
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Statement of claim
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Supporting evidence
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Process Timeline</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Case Filing</span>
                      <span className="text-gray-600">Day 1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Initial Review</span>
                      <span className="text-gray-600">Day 1-3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Arbitrator Assignment</span>
                      <span className="text-gray-600">Day 4-5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Evidence Submission</span>
                      <span className="text-gray-600">Day 6-12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hearing & Decision</span>
                      <span className="text-gray-600">Day 13-21</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resolution Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Resolution Time</span>
                    <span className="font-bold">14.2 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Success Rate</span>
                    <span className="font-bold text-green-600">96.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Satisfaction</span>
                    <span className="font-bold text-blue-600">4.7/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cost Efficiency</span>
                    <span className="font-bold text-purple-600">78% vs traditional</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Contract Disputes</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20 h-2" />
                      <span className="text-sm">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Commercial Issues</span>
                    <div className="flex items-center gap-2">
                      <Progress value={30} className="w-20 h-2" />
                      <span className="text-sm">30%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>IP Disputes</span>
                    <div className="flex items-center gap-2">
                      <Progress value={15} className="w-20 h-2" />
                      <span className="text-sm">15%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Other</span>
                    <div className="flex items-center gap-2">
                      <Progress value={10} className="w-20 h-2" />
                      <span className="text-sm">10%</span>
                    </div>
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
