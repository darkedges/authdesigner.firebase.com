import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { AuthFlow, AuthComponent, AuthComponentType } from '../types/auth';
import { ComponentLibrary } from './ComponentLibrary';
import { PropertiesPanel } from './PropertiesPanel';
import { FlowHeader } from './FlowHeader';
import { generateId } from '../utils/helpers';
import { FlowNode } from './FlowNode';

interface FlowBuilderProps {
  flow: AuthFlow;
  onFlowUpdate: (flow: AuthFlow) => void;
}

const nodeTypes = {
  custom: FlowNode,
};

export const FlowBuilder: React.FC<FlowBuilderProps> = ({ flow, onFlowUpdate }) => {
  const [selectedComponent, setSelectedComponent] = useState<AuthComponent | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<AuthComponentType | null>(null);

  const nodes: Node[] = flow.components.map(comp => ({
    id: comp.id,
    type: 'custom',
    position: comp.position,
    data: { component: comp, onUpdate: handleComponentUpdate, onDelete: handleComponentDelete, onSelect: setSelectedComponent, isSelected: selectedComponent?.id === comp.id},
  }));

  const edges: Edge[] = flow.connections.map(conn => ({
    id: conn.id,
    source: conn.sourceId,
    target: conn.targetId,
    
  }));

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    const updatedComponents = applyNodeChanges(changes, flow.components.map(c => ({...c, position: c.position}))).map(c => ({...c, position: c.position}));
    onFlowUpdate({ ...flow, components: updatedComponents });
  }, [flow.components, onFlowUpdate]);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    const updatedConnections = applyEdgeChanges(changes, flow.connections);
    onFlowUpdate({ ...flow, connections: updatedConnections });
  }, [flow.connections, onFlowUpdate]);

  const onConnect = useCallback((params: Connection) => {
    const newConnection = { ...params, id: generateId() };
    const updatedConnections = addEdge(newConnection, flow.connections);
    onFlowUpdate({ ...flow, connections: updatedConnections });
  }, [flow.connections, onFlowUpdate]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedComponent) return;

    const reactFlowBounds = e.currentTarget.getBoundingClientRect();
    const position = {
      x: e.clientX - reactFlowBounds.left,
      y: e.clientY - reactFlowBounds.top,
    };

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

    onFlowUpdate({ ...flow, components: [...flow.components, newComponent] });
    setDraggedComponent(null);
  }, [draggedComponent, flow, onFlowUpdate]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
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

  return (
    <div className="flex h-screen bg-gray-50">
      <ComponentLibrary
        onDragStart={setDraggedComponent}
        onDragEnd={() => setDraggedComponent(null)}
      />
      <div className="flex-1 flex flex-col">
        <FlowHeader flow={flow} onFlowUpdate={onFlowUpdate} />
        <div className="flex-1 flex" onDrop={handleDrop} onDragOver={handleDragOver}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
          {selectedComponent && (
            <PropertiesPanel
              component={selectedComponent}
              onUpdate={(updates) => handleComponentUpdate(selectedComponent.id, updates)}
              onClose={() => setSelectedComponent(null)}
              onDelete={() => handleComponentDelete(selectedComponent.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};