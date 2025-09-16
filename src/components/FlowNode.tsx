
import { Code, ExternalLink, GitBranch, Key, LogIn, Mail, Shield, UserPlus, Users } from 'lucide-react';
import React from 'react';
import { Handle, Position } from 'reactflow';
import { componentTemplates } from '../data/componentTemplates';
import { AuthComponent } from '../types/auth';

const iconMap: { [key: string]: React.ElementType } = {
  LogIn,
  UserPlus,
  Users,
  Shield,
  Mail,
  Key,
  GitBranch,
  Code,
  ExternalLink,
};

interface FlowNodeProps {
  data: {
    component: AuthComponent;
    onUpdate: (id: string, updates: Partial<AuthComponent>) => void;
    onDelete: (id: string) => void;
    onSelect: (component: AuthComponent) => void;
    isSelected: boolean;
  };
}

export const FlowNode: React.FC<FlowNodeProps> = ({ data }) => {
  const { component, onSelect, isSelected } = data;
  const template = componentTemplates.find(t => t.type === component.type);

  if (!template) {
    // Handle the case where the template is not found
    return (
      <div className="w-48 bg-red-100 border-2 border-red-500 rounded-lg shadow-lg">
        <div className="p-4">
          <h3 className="text-md font-semibold text-red-800">Error</h3>
          <p className="text-sm text-red-600">Component template not found.</p>
        </div>
      </div>
    );
  }

  const Icon = iconMap[template.icon];

  return (
    <div
      onClick={() => onSelect(component)}
      className={`w-48 bg-white border-2 rounded-lg shadow-lg cursor-pointer transition-all duration-150 ease-in-out ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 mr-3">
            {Icon && <Icon className="w-full h-full text-gray-600" />}
          </div>
          <h3 className="text-md font-semibold text-gray-800">{component.name}</h3>
        </div>
        <p className="text-sm text-gray-600">{template.description}</p>
      </div>
      
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-blue-500" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-green-500" />
    </div>
  );
};
