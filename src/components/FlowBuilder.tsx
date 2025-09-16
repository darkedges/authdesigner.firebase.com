import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  Node,
  NodeChange
} from 'reactflow';
import 'reactflow/dist/style.css';

import { AuthComponent, AuthComponentType, AuthFlow } from '../types/auth';
import { generateId } from '../utils/helpers';
import { ComponentLibrary } from './ComponentLibrary';
import { FlowHeader } from './FlowHeader';
import { FlowNode } from './FlowNode';
import { PropertiesPanel } from './PropertiesPanel';

interface FlowBuilderProps {
  flow: AuthFlow;
  onFlowUpdate: (flow: AuthFlow) => void;
}

// -- Mapping functions --

function toNode(comp: AuthComponent): Node {
  return {
    id: comp.id,
    type: 'custom',
    position: comp.position,
    data: {
      component: comp,
      // These handlers are injected at render time below
    },
  };
}

function fromNode(node: Node, oldComp: AuthComponent): AuthComponent {
  return {
    ...oldComp,
    position: node.position,
    // You may want to copy other fields if updated via node data
  };
}

function toEdge(conn: any): Edge {
  return {
    id: conn.id,
    source: conn.sourceId,
    target: conn.targetId,
  };
}

function fromEdge(edge: Edge): any {
  return {
    id: edge.id,
    sourceId: edge.source,
    targetId: edge.target,
  };
}

const nodeTypes = {
  custom: FlowNode,
};

export const FlowBuilder: React.FC<FlowBuilderProps> = ({ flow, onFlowUpdate }) => {
  const [selectedComponent, setSelectedComponent] = useState<AuthComponent | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<AuthComponentType | null>(null);

  // --- Component Update/Delete Handlers ---
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

  // --- React Flow Event Handlers ---
  const onNodesChange = useCallback((changes: NodeChange[]) => {
    const nodes = flow.components.map(toNode);
    const updatedNodes = applyNodeChanges(changes, nodes);
    const updatedComponents = updatedNodes.map(node =>
      fromNode(node, flow.components.find(c => c.id === node.id)!)
    );
    onFlowUpdate({ ...flow, components: updatedComponents });
  }, [flow.components, onFlowUpdate]);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    const edges = flow.connections.map(toEdge);
    const updatedEdges = applyEdgeChanges(changes, edges);
    const updatedConnections = updatedEdges.map(fromEdge);
    onFlowUpdate({ ...flow, connections: updatedConnections });
  }, [flow.connections, onFlowUpdate]);

const onConnect = useCallback((params: Connection) => {
  const newEdge: Edge = {
    id: generateId(),
    source: params.source ?? '',
    target: params.target ?? '',
    sourceHandle: params.sourceHandle,
    targetHandle: params.targetHandle,
  };
  const edges = flow.connections.map(toEdge);
  const updatedEdges = addEdge(newEdge, edges);
  const updatedConnections = updatedEdges.map(fromEdge);
  onFlowUpdate({ ...flow, connections: updatedConnections });
}, [flow.connections, onFlowUpdate]);
  // --- Drag and Drop Handlers ---
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
      data: {},
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

  // --- Map domain models to React Flow models for rendering ---
  const nodes: Node[] = flow.components.map(comp => ({
    id: comp.id,
    type: 'custom',
    position: comp.position,
    data: {
      component: comp,
      onUpdate: handleComponentUpdate,
      onDelete: handleComponentDelete,
      onSelect: setSelectedComponent,
      isSelected: selectedComponent?.id === comp.id,
    }
  }));

  const edges: Edge[] = flow.connections.map(toEdge);

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