
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Scale, Clock, FileText, User, AlertCircle } from 'lucide-react';

interface ArbitrationCase {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'cancelled';
  requestedBy: string;
  arbitrator?: string;
  createdAt: string;
  resolvedAt?: string;
  disputeAmount: number;
  documents: string[];
}

interface ArbitrationPanelProps {
  groupId: string;
  canRequestArbitration: boolean;
}

const mockCases: ArbitrationCase[] = [
  {
    id: '1',
    title: 'Payment Dispute',
    description: 'Disagreement over milestone payment terms',
    status: 'in_progress',
    requestedBy: 'Ahmed Hassan',
    arbitrator: 'Dr. Sarah Johnson',
    createdAt: '2024-01-15',
    disputeAmount: 5000,
    documents: ['contract.pdf', 'payment_proof.pdf']
  }
];

export function ArbitrationPanel({ groupId, canRequestArbitration }: ArbitrationPanelProps) {
  const [cases, setCases] = useState<ArbitrationCase[]>(mockCases);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [newCase, setNewCase] = useState({
    title: '',
    description: '',
    disputeAmount: 0
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700';
      case 'in_progress': return 'bg-blue-50 text-blue-700';
      case 'resolved': return 'bg-green-50 text-green-700';
      case 'cancelled': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleSubmitRequest = () => {
    if (!newCase.title || !newCase.description) return;

    const arbitrationCase: ArbitrationCase = {
      id: Date.now().toString(),
      ...newCase,
      status: 'pending',
      requestedBy: 'Current User',
      createdAt: new Date().toISOString().split('T')[0],
      documents: []
    };

    setCases([...cases, arbitrationCase]);
    setNewCase({ title: '', description: '', disputeAmount: 0 });
    setShowRequestForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Commercial Arbitration (ORDA)</h2>
          <p className="text-gray-600">Resolve disputes through our online arbitration system</p>
        </div>
        {canRequestArbitration && (
          <Button 
            onClick={() => setShowRequestForm(true)}
            className="bg-red-600 hover:bg-red-700"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Request Arbitration
          </Button>
        )}
      </div>

      {/* Request Form */}
      {showRequestForm && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">Request Arbitration</CardTitle>
            <CardDescription>
              Please provide details about the dispute you want to resolve
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dispute Title
              </label>
              <Input
                placeholder="Brief description of the dispute"
                value={newCase.title}
                onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Detailed Description
              </label>
              <Textarea
                placeholder="Provide detailed information about the dispute, including timeline and evidence"
                value={newCase.description}
                onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                rows={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dispute Amount ($)
              </label>
              <Input
                type="number"
                placeholder="0"
                value={newCase.disputeAmount}
                onChange={(e) => setNewCase({ ...newCase, disputeAmount: Number(e.target.value) })}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSubmitRequest}>
                Submit Request
              </Button>
              <Button variant="outline" onClick={() => setShowRequestForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Cases */}
      <div className="grid grid-cols-1 gap-6">
        {cases.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Scale className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">No arbitration cases active.</p>
              <p className="text-sm text-gray-500 mb-4">
                Request arbitration if you have disputes that need resolution
              </p>
            </CardContent>
          </Card>
        ) : (
          cases.map(case_ => (
            <Card key={case_.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{case_.title}</CardTitle>
                    <CardDescription>{case_.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className={getStatusColor(case_.status)}>
                    {formatStatus(case_.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">
                      ${case_.disputeAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Amount</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">
                      {case_.documents.length}
                    </div>
                    <div className="text-sm text-gray-600">Documents</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="mx-auto h-5 w-5 text-gray-600 mb-1" />
                    <div className="text-sm text-gray-600">{case_.createdAt}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <User className="mx-auto h-5 w-5 text-gray-600 mb-1" />
                    <div className="text-sm text-gray-600">
                      {case_.arbitrator || 'Pending Assignment'}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Requested by: {case_.requestedBy}</span>
                  </div>
                  {case_.arbitrator && (
                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4" />
                      <span>Arbitrator: {case_.arbitrator}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Documents: {case_.documents.join(', ') || 'None uploaded'}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Upload Document
                  </Button>
                  {case_.status === 'in_progress' && (
                    <Button size="sm" variant="outline">
                      Schedule Hearing
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
