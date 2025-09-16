import React from 'react';
import { AuthComponentType } from '../types/auth';
import { componentTemplates } from '../data/componentTemplates';
import * as Icons from 'lucide-react';

interface ComponentLibraryProps {
  onDragStart: (type: AuthComponentType) => void;
  onDragEnd: () => void;
}

export const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ 
  onDragStart, 
  onDragEnd 
}) => {
  const handleDragStart = (e: React.DragEvent, type: AuthComponentType) => {
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart(type);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Components</h2>
        <p className="text-sm text-gray-600 mt-1">Drag components to the canvas</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Authentication</h3>
          <div className="space-y-2">
            {componentTemplates.filter(template => 
              ['login-form', 'register-form', 'social-auth'].includes(template.type)
            ).map(template => {
              const IconComponent = Icons[template.icon as keyof typeof Icons] as React.ComponentType<any>;
              
              return (
                <div
                  key={template.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, template.type)}
                  onDragEnd={onDragEnd}
                  className="p-3 border border-gray-200 rounded-lg cursor-grab hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <IconComponent className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{template.name}</p>
                      <p className="text-xs text-gray-500">{template.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Verification</h3>
          <div className="space-y-2">
            {componentTemplates.filter(template => 
              ['mfa', 'email-verification', 'password-reset'].includes(template.type)
            ).map(template => {
              const IconComponent = Icons[template.icon as keyof typeof Icons] as React.ComponentType<any>;
              
              return (
                <div
                  key={template.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, template.type)}
                  onDragEnd={onDragEnd}
                  className="p-3 border border-gray-200 rounded-lg cursor-grab hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-purple-50 rounded-md">
                      <IconComponent className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{template.name}</p>
                      <p className="text-xs text-gray-500">{template.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Logic & Navigation</h3>
          <div className="space-y-2">
            {componentTemplates.filter(template => 
              ['conditional', 'custom-script', 'redirect'].includes(template.type)
            ).map(template => {
              const IconComponent = Icons[template.icon as keyof typeof Icons] as React.ComponentType<any>;
              
              return (
                <div
                  key={template.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, template.type)}
                  onDragEnd={onDragEnd}
                  className="p-3 border border-gray-200 rounded-lg cursor-grab hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-50 rounded-md">
                      <IconComponent className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{template.name}</p>
                      <p className="text-xs text-gray-500">{template.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};