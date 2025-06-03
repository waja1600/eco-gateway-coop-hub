
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { GroupCreationFlow } from '@/components/groups/GroupCreationFlow';

export default function GroupCreation() {
  const { gatewayId } = useParams<{ gatewayId: string }>();
  const navigate = useNavigate();

  const handleGroupSubmit = (formData: any) => {
    console.log('Group created:', formData);
    // Here you would typically send the data to your backend
    // For now, we'll simulate success and redirect to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const getGatewayTitle = () => {
    switch (gatewayId) {
      case 'group-buying': return 'Group Buying';
      case 'cooperative-marketing': return 'Cooperative Marketing';
      case 'company-incorporation': return 'Company Incorporation';
      case 'suppliers-freelancers': return 'Suppliers & Freelancers';
      case 'commercial-arbitration': return 'Commercial Arbitration';
      case 'contract-verification': return 'Contract Verification';
      default: return 'Unknown Gateway';
    }
  };

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New {getGatewayTitle()} Group
            </h1>
            <p className="text-lg text-gray-600">
              Set up your collaborative project and start working together
            </p>
          </div>

          <GroupCreationFlow 
            gatewayType={gatewayId || ''}
            onSubmit={handleGroupSubmit}
          />
        </div>
      </div>
    </ModernMainLayout>
  );
}
