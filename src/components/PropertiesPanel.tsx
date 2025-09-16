import React, { useState } from 'react';
import { AuthComponent, AuthComponentType } from '../types/auth';
import * as Icons from 'lucide-react';

interface PropertiesPanelProps {
  component: AuthComponent;
  onUpdate: (updates: Partial<AuthComponent>) => void;
  onClose: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  component,
  onUpdate,
  onClose
}) => {
  const [config, setConfig] = useState(component.config);

  const handleConfigChange = (key: string, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    onUpdate({ config: newConfig });
  };

  const handleNameChange = (name: string) => {
    onUpdate({ name });
  };

  const renderConfigFields = () => {
    switch (component.type) {
      case AuthComponentType.LOGIN_FORM:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Fields
              </label>
              <div className="space-y-2">
                {['email', 'username', 'password'].map(field => (
                  <label key={field} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.fields?.includes(field) || false}
                      onChange={(e) => {
                        const fields = config.fields || [];
                        if (e.target.checked) {
                          handleConfigChange('fields', [...fields, field]);
                        } else {
                          handleConfigChange('fields', fields.filter((f: string) => f !== field));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{field}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.validation || false}
                  onChange={(e) => handleConfigChange('validation', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Enable Validation</span>
              </label>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.rememberMe || false}
                  onChange={(e) => handleConfigChange('rememberMe', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Remember Me Option</span>
              </label>
            </div>
          </div>
        );

      case AuthComponentType.SOCIAL_AUTH:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Providers
              </label>
              <div className="space-y-2">
                {['google', 'github', 'facebook', 'twitter'].map(provider => (
                  <label key={provider} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={config.providers?.includes(provider) || false}
                      onChange={(e) => {
                        const providers = config.providers || [];
                        if (e.target.checked) {
                          handleConfigChange('providers', [...providers, provider]);
                        } else {
                          handleConfigChange('providers', providers.filter((p: string) => p !== provider));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{provider}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case AuthComponentType.CONDITIONAL:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition
              </label>
              <input
                type="text"
                value={config.condition || ''}
                onChange={(e) => handleConfigChange('condition', e.target.value)}
                placeholder="e.g., user.isVerified"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                True Label
              </label>
              <input
                type="text"
                value={config.trueLabel || ''}
                onChange={(e) => handleConfigChange('trueLabel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                False Label
              </label>
              <input
                type="text"
                value={config.falseLabel || ''}
                onChange={(e) => handleConfigChange('falseLabel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );

      case AuthComponentType.REDIRECT:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL
              </label>
              <input
                type="text"
                value={config.url || ''}
                onChange={(e) => handleConfigChange('url', e.target.value)}
                placeholder="e.g., /dashboard"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.external || false}
                  onChange={(e) => handleConfigChange('external', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">External URL</span>
              </label>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-sm text-gray-500">
            No configuration options available for this component type.
          </div>
        );
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Component Name
          </label>
          <input
            type="text"
            value={component.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={component.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Configuration</h3>
          {renderConfigFields()}
        </div>
      </div>
    </div>
  );
};