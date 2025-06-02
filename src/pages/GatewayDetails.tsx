
import React from 'react';
import { useParams } from 'react-router-dom';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { GroupBuyingGateway } from '@/components/gateways/GroupBuyingGateway';
import { CooperativeMarketingGateway } from '@/components/gateways/CooperativeMarketingGateway';
import { CompanyIncorporationGateway } from '@/components/gateways/CompanyIncorporationGateway';
import { SuppliersFreelancersGateway } from '@/components/gateways/SuppliersFreelancersGateway';

export default function GatewayDetails() {
  const { gatewayId } = useParams<{ gatewayId: string }>();

  const renderGateway = () => {
    switch (gatewayId) {
      case 'group-buying':
        return <GroupBuyingGateway />;
      case 'cooperative-marketing':
        return <CooperativeMarketingGateway />;
      case 'company-incorporation':
        return <CompanyIncorporationGateway />;
      case 'suppliers-freelancers':
        return <SuppliersFreelancersGateway />;
      default:
        return (
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Gateway Not Found</h1>
            <p className="text-gray-600">The requested gateway could not be found.</p>
          </div>
        );
    }
  };

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        {renderGateway()}
      </div>
    </ModernMainLayout>
  );
}
