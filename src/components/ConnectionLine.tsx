import React from 'react';
import { Connection, AuthComponent } from '../types/auth';

interface ConnectionLineProps {
  connection: Connection;
  components: AuthComponent[];
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({ connection, components }) => {
  const sourceComponent = components.find(c => c.id === connection.sourceId);
  const targetComponent = components.find(c => c.id === connection.targetId);

  if (!sourceComponent || !targetComponent) return null;

  const sourcePos = {
    x: sourceComponent.position.x + 120, // Center of node (240px width / 2)
    y: sourceComponent.position.y + 100   // Bottom of node
  };

  const targetPos = {
    x: targetComponent.position.x + 120,
    y: targetComponent.position.y
  };

  const midY = sourcePos.y + (targetPos.y - sourcePos.y) / 2;

  const pathData = `
    M ${sourcePos.x} ${sourcePos.y}
    C ${sourcePos.x} ${midY}
      ${targetPos.x} ${midY}
      ${targetPos.x} ${targetPos.y}
  `;

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#6b7280"
          />
        </marker>
      </defs>
      <path
        d={pathData}
        stroke="#6b7280"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
        className="hover:stroke-blue-500 transition-colors"
      />
      {connection.label && (
        <text
          x={sourcePos.x + (targetPos.x - sourcePos.x) / 2}
          y={midY - 5}
          textAnchor="middle"
          className="text-xs fill-gray-600 bg-white"
        >
          {connection.label}
        </text>
      )}
    </svg>
  );
};