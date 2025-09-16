
import React from 'react';
import { Handle, Position } from 'reactflow';
import { AuthComponent } from '../types/auth';
import { componentTemplates } from '../data/componentTemplates';

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
  const template = componentTemplates[component.type];

  const Icon = template.icon;

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
            <Icon className="w-full h-full text-gray-600" />
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