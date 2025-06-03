
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Users, User, Upload, ArrowRight, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GroupFormData {
  type: 'individual' | 'group';
  name: string;
  country: string;
  sector: string;
  purpose: string;
  targetParticipants: number;
  description: string;
  rqfFile?: File;
}

interface GroupCreationFlowProps {
  gatewayType: string;
  onSubmit: (data: GroupFormData) => void;
}

const countries = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Canada', 
  'Australia', 'Japan', 'South Korea', 'Singapore', 'UAE', 'Egypt', 'Saudi Arabia'
];

const sectors = [
  'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail',
  'Education', 'Energy', 'Transportation', 'Real Estate', 'Agriculture'
];

export function GroupCreationFlow({ gatewayType, onSubmit }: GroupCreationFlowProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<GroupFormData>({
    type: 'group',
    name: '',
    country: '',
    sector: '',
    purpose: '',
    targetParticipants: 3,
    description: ''
  });
  const { toast } = useToast();

  const handleTypeSelection = (type: 'individual' | 'group') => {
    setFormData({ ...formData, type });
    setStep(2);
  };

  const handleInputChange = (field: keyof GroupFormData, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, rqfFile: file });
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name || !formData.country || !formData.sector || !formData.purpose) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.type === 'group' && formData.targetParticipants < 3) {
      toast({
        title: "Invalid Group Size",
        description: "Group contracts require a minimum of 3 members.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
    setStep(4);
    
    toast({
      title: "Group Created Successfully",
      description: "Your group has been sent for review and will appear in your dashboard shortly.",
    });
  };

  if (step === 1) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Contract Type</h2>
          <p className="text-gray-600">Select whether you want to create an individual or group contract</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-300"
            onClick={() => handleTypeSelection('individual')}
          >
            <CardHeader className="text-center">
              <User className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Individual Contract</CardTitle>
              <CardDescription>
                Create a contract for individual use. Perfect for personal projects or single-entity needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge variant="outline" className="mb-4">Single User</Badge>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Immediate processing</li>
                  <li>• Lower fees</li>
                  <li>• Quick setup</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-300"
            onClick={() => handleTypeSelection('group')}
          >
            <CardHeader className="text-center">
              <Users className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Group Contract</CardTitle>
              <CardDescription>
                Create a collaborative contract for multiple parties. Minimum 3 members required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge variant="outline" className="mb-4">3+ Members</Badge>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Shared costs & benefits</li>
                  <li>• Voting mechanisms</li>
                  <li>• Collaborative features</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Group Information</h2>
          <p className="text-gray-600">Provide details about your {formData.type} contract</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {formData.type === 'group' ? <Users className="h-5 w-5" /> : <User className="h-5 w-5" />}
              {formData.type === 'group' ? 'Group' : 'Individual'} Contract Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contract Name *
                </label>
                <Input
                  placeholder="Enter contract name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sector *
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.sector}
                  onChange={(e) => handleInputChange('sector', e.target.value)}
                >
                  <option value="">Select Sector</option>
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>
              {formData.type === 'group' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Participants
                  </label>
                  <Input
                    type="number"
                    min="3"
                    placeholder="Minimum 3 for groups"
                    value={formData.targetParticipants}
                    onChange={(e) => handleInputChange('targetParticipants', parseInt(e.target.value) || 3)}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purpose *
              </label>
              <Input
                placeholder="Brief purpose of this contract"
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                placeholder="Detailed description of the contract objectives and requirements"
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                RQF or Supporting Documents (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload RQF or other supporting documents</p>
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                />
                <label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:text-blue-700">
                  Choose File
                </label>
                {formData.rqfFile && (
                  <p className="text-sm text-green-600 mt-2">
                    File selected: {formData.rqfFile.name}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button onClick={() => setStep(3)}>
            Review & Submit
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Contract</h2>
          <p className="text-gray-600">Please review the information before submission</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contract Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Type</label>
                <p className="font-medium capitalize">{formData.type} Contract</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Name</label>
                <p className="font-medium">{formData.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Country</label>
                <p className="font-medium">{formData.country}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Sector</label>
                <p className="font-medium">{formData.sector}</p>
              </div>
              {formData.type === 'group' && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Target Participants</label>
                  <p className="font-medium">{formData.targetParticipants} members</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500">Purpose</label>
                <p className="font-medium">{formData.purpose}</p>
              </div>
            </div>
            
            {formData.description && (
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="font-medium">{formData.description}</p>
              </div>
            )}

            {formData.rqfFile && (
              <div>
                <label className="text-sm font-medium text-gray-500">Attached File</label>
                <p className="font-medium">{formData.rqfFile.name}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(2)}>
            Back to Edit
          </Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Submit Contract
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <CheckCircle className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Contract Submitted Successfully!</h2>
        <p className="text-gray-600">
          Your {formData.type} contract has been sent for review. You will receive a notification 
          once it's approved and it will appear in your dashboard with a "Pending Review" status.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Next Steps:</strong> Our team will review your contract within 24-48 hours. 
            You'll be notified via email when it's ready to proceed.
          </p>
        </div>
        <Button onClick={() => window.location.href = '/dashboard'} className="w-full">
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return null;
}
