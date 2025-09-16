import React, { useState, useRef } from 'react';
import { AuthComponent } from '../types/auth';
import * as Icons from 'lucide-react';
import { componentTemplates } from '../data/componentTemplates';

interface FlowNodeProps {
  component: AuthComponent;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onUpdate: (updates: Partial<AuthComponent>) => void;
  onDelete: () => void;
  onConnectionStart: (sourceId: string) => void;
}

export const FlowNode: React.FC<FlowNodeProps> = ({
  component,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onConnectionStart
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  const template = componentTemplates.find(t => t.type === component.type);
  const IconComponent = template ? Icons[template.icon as keyof typeof Icons] as React.ComponentType<any> : Icons.Square;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === nodeRef.current || nodeRef.current?.contains(e.target as Node)) {
      const rect = nodeRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && nodeRef.current) {
      const canvas = nodeRef.current.parentElement;
      if (canvas) {
        const canvasRect = canvas.getBoundingClientRect();
        const newPosition = {
          x: e.clientX - canvasRect.left - dragOffset.x,
          y: e.clientY - canvasRect.top - dragOffset.y
        };
        onUpdate({ position: newPosition });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const getNodeColor = () => {
    const type = component.type;
    if (['login-form', 'register-form', 'social-auth'].includes(type)) return 'blue';
    if (['mfa', 'email-verification', 'password-reset'].includes(type)) return 'purple';
    if (['conditional', 'custom-script', 'redirect'].includes(type)) return 'green';
    return 'gray';
  };

  const color = getNodeColor();

  return (
    <div
      ref={nodeRef}
      className={`absolute bg-white border-2 rounded-lg shadow-sm cursor-pointer transition-all ${
        isSelected ? `border-${color}-500 shadow-lg` : `border-gray-200 hover:border-${color}-300`
      } ${isDragging ? 'shadow-lg scale-105' : ''}`}
      style={{
        left: component.position.x,
        top: component.position.y,
        width: '240px'
      }}
      onClick={onSelect}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className={`p-4 border-b border-gray-100 bg-${color}-50 rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 bg-${color}-100 rounded-md`}>
              <IconComponent className={`w-4 h-4 text-${color}-600`} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{template?.name}</h3>
              <p className="text-xs text-gray-500">{component.name}</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Icons.X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-xs text-gray-600">{template?.description}</p>
        {Object.keys(component.config).length > 0 && (
          <div className="mt-2 space-y-1">
            {Object.entries(component.config).slice(0, 2).map(([key, value]) => (
              <div key={key} className="text-xs">
                <span className="text-gray-500">{key}:</span>
                <span className="text-gray-700 ml-1">
                  {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Connection Points */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
        <div className={`w-4 h-4 bg-${color}-500 rounded-full border-2 border-white`}></div>
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div className={`w-4 h-4 bg-${color}-500 rounded-full border-2 border-white`}></div>
      </div>
    </div>
  );
};