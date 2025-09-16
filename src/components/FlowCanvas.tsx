import React, { forwardRef } from 'react';
import { AuthFlow, AuthComponent, Connection } from '../types/auth';
import { FlowNode } from './FlowNode';
import { ConnectionLine } from './ConnectionLine';

interface FlowCanvasProps {
  flow: AuthFlow;
  selectedComponent: AuthComponent | null;
  onComponentSelect: (component: AuthComponent | null) => void;
  onComponentUpdate: (componentId: string, updates: Partial<AuthComponent>) => void;
  onComponentDelete: (componentId: string) => void;
  onConnectionCreate: (connection: Connection) => void;
  onDrop: (e: React.DragEvent, position: { x: number; y: number }) => void;
  isDragging: boolean;
}

export const FlowCanvas = forwardRef<HTMLDivElement, FlowCanvasProps>(({
  flow,
  selectedComponent,
  onComponentSelect,
  onComponentUpdate,
  onComponentDelete,
  onConnectionCreate,
  onDrop,
  isDragging
}, ref) => {
  const handleDrop = (e: React.DragEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    onDrop(e, position);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      className={`flex-1 relative overflow-hidden bg-gray-50 ${
        isDragging ? 'bg-blue-50' : ''
      } transition-colors`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => onComponentSelect(null)}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Connection Lines */}
      {flow.connections.map(connection => (
        <ConnectionLine
          key={connection.id}
          connection={connection}
          components={flow.components}
        />
      ))}

      {/* Components */}
      {flow.components.map(component => (
        <FlowNode
          key={component.id}
          component={component}
          isSelected={selectedComponent?.id === component.id}
          onSelect={(e) => {
            e.stopPropagation();
            onComponentSelect(component);
          }}
          onUpdate={(updates) => onComponentUpdate(component.id, updates)}
          onDelete={() => onComponentDelete(component.id)}
          onConnectionStart={(sourceId) => {
            // Handle connection creation logic
          }}
        />
      ))}

      {/* Empty State */}
      {flow.components.length === 0 && !isDragging && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building Your Flow</h3>
            <p className="text-gray-500">Drag components from the sidebar to create your authentication journey</p>
          </div>
        </div>
      )}

      {/* Drop Indicator */}
      {isDragging && (
        <div className="absolute inset-0 border-2 border-dashed border-blue-300 rounded-lg pointer-events-none" />
      )}
    </div>
  );
});

FlowCanvas.displayName = 'FlowCanvas';