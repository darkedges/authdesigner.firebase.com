import React, { useState } from 'react';
import { AuthFlow } from '../types/auth';
import * as Icons from 'lucide-react';

interface FlowHeaderProps {
  flow: AuthFlow;
  onFlowUpdate: (flow: AuthFlow) => void;
}

export const FlowHeader: React.FC<FlowHeaderProps> = ({ flow, onFlowUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [flowName, setFlowName] = useState(flow.name);

  const handleNameSave = () => {
    onFlowUpdate({ ...flow, name: flowName });
    setIsEditing(false);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(flow, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${flow.name.toLowerCase().replace(/\s+/g, '-')}-flow.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveFragment = () => {
    const fragmentFlow = { ...flow, isFragment: true };
    onFlowUpdate(fragmentFlow);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
                onBlur={handleNameSave}
                onKeyPress={(e) => e.key === 'Enter' && handleNameSave()}
                className="text-xl font-semibold border border-gray-300 rounded px-2 py-1"
                autoFocus
              />
              <button
                onClick={handleNameSave}
                className="text-green-600 hover:text-green-800"
              >
                <Icons.Check className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold text-gray-900">{flow.name}</h1>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icons.Edit2 className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {flow.isFragment && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
              Fragment
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Icons.Zap className="w-4 h-4" />
            <span>{flow.components.length} components</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSaveFragment}
              className="px-3 py-1 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors"
            >
              <Icons.Archive className="w-4 h-4 mr-1 inline" />
              Save as Fragment
            </button>
            
            <button
              onClick={handleExport}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Icons.Download className="w-4 h-4 mr-1 inline" />
              Export
            </button>
            
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
              <Icons.Play className="w-4 h-4 mr-1 inline" />
              Test Flow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};