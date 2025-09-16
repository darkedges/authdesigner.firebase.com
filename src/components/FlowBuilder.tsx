import React, { useState, useCallback, useRef } from 'react';
import { AuthFlow, AuthComponent, Connection, AuthComponentType } from '../types/auth';
import { ComponentLibrary } from './ComponentLibrary';
import { FlowCanvas } from './FlowCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import { FlowHeader } from './FlowHeader';
import { generateId } from '../utils/helpers';

interface FlowBuilderProps {
  flow: AuthFlow;
  onFlowUpdate: (flow: AuthFlow) => void;
}

export const FlowBuilder: React.FC<FlowBuilderProps> = ({ flow, onFlowUpdate }) => {
  const [selectedComponent, setSelectedComponent] = useState<AuthComponent | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<AuthComponentType | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrop = useCallback((e: React.DragEvent, position: { x: number; y: number }) => {
    e.preventDefault();
    if (!draggedComponent) return;

    const newComponent: AuthComponent = {
      id: generateId(),
      type: draggedComponent,
      name: `${draggedComponent.replace('-', ' ')} ${flow.components.length + 1}`,
      description: '',
      icon: '',
      config: {},
      position,
      connections: []
    };

    const updatedFlow = {
      ...flow,
      components: [...flow.components, newComponent]
    };

    onFlowUpdate(updatedFlow);
    setDraggedComponent(null);
  }, [draggedComponent, flow, onFlowUpdate]);

  const handleComponentUpdate = useCallback((componentId: string, updates: Partial<AuthComponent>) => {
    const updatedFlow = {
      ...flow,
      components: flow.components.map(comp => 
        comp.id === componentId ? { ...comp, ...updates } : comp
      )
    };
    onFlowUpdate(updatedFlow);
  }, [flow, onFlowUpdate]);

  const handleComponentDelete = useCallback((componentId: string) => {
    const updatedFlow = {
      ...flow,
      components: flow.components.filter(comp => comp.id !== componentId),
      connections: flow.connections.filter(conn => 
        conn.sourceId !== componentId && conn.targetId !== componentId
      )
    };
    onFlowUpdate(updatedFlow);
    if (selectedComponent?.id === componentId) {
      setSelectedComponent(null);
    }
  }, [flow, onFlowUpdate, selectedComponent]);

  const handleConnectionCreate = useCallback((connection: Connection) => {
    const updatedFlow = {
      ...flow,
      connections: [...flow.connections, connection]
    };
    onFlowUpdate(updatedFlow);
  }, [flow, onFlowUpdate]);

  return (
    <div className="flex h-screen bg-gray-50">
      <ComponentLibrary 
        onDragStart={setDraggedComponent}
        onDragEnd={() => setDraggedComponent(null)}
      />
      
      <div className="flex-1 flex flex-col">
        <FlowHeader flow={flow} onFlowUpdate={onFlowUpdate} />
        
        <div className="flex-1 flex">
          <FlowCanvas
            ref={canvasRef}
            flow={flow}
            selectedComponent={selectedComponent}
            onComponentSelect={setSelectedComponent}
            onComponentUpdate={handleComponentUpdate}
            onComponentDelete={handleComponentDelete}
            onConnectionCreate={handleConnectionCreate}
            onDrop={handleDrop}
            isDragging={!!draggedComponent}
          />
          
          {selectedComponent && (
            <PropertiesPanel
              component={selectedComponent}
              onUpdate={(updates) => handleComponentUpdate(selectedComponent.id, updates)}
              onClose={() => setSelectedComponent(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};