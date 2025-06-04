import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Users, Package, User } from 'lucide-react';

const Workspace = () => {
  const { t } = useTranslation();
  const [currentRole, setCurrentRole] = useState<'member' | 'supplier' | 'freelancer'>('member');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('workspace.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('workspace.role_switch')}
          </p>
        </div>

        {/* Role Switcher */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('workspace.role_switch')}</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => setCurrentRole('member')}
              variant={currentRole === 'member' ? 'default' : 'outline'}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              {t('workspace.member')}
            </Button>
            <Button
              onClick={() => setCurrentRole('supplier')}
              variant={currentRole === 'supplier' ? 'default' : 'outline'}
              className="flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              {t('workspace.supplier')}
            </Button>
            <Button
              onClick={() => setCurrentRole('freelancer')}
              variant={currentRole === 'freelancer' ? 'default' : 'outline'}
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              {t('workspace.freelancer')}
            </Button>
          </div>
        </div>

        {/* Role-specific Content */}
        {currentRole === 'member' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{t('workspace.dashboard')}</h2>
            <p className="text-gray-600">{t('workspace.projects')}</p>
          </div>
        )}

        {currentRole === 'supplier' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{t('workspace.dashboard')}</h2>
            <p className="text-gray-600">{t('workspace.proposals')}</p>
          </div>
        )}

        {currentRole === 'freelancer' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">{t('workspace.dashboard')}</h2>
            <p className="text-gray-600">{t('workspace.contracts')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
