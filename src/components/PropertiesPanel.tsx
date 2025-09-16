import React, { useState, useEffect } from 'react';
import { AuthComponent } from '../types/auth';

interface PropertiesPanelProps {
  component: AuthComponent;
  onUpdate: (updates: Partial<AuthComponent>) => void;
  onClose: () => void;
  onDelete: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ component, onUpdate, onClose, onDelete }) => {
  const [name, setName] = useState(component.name);
  const [description, setDescription] = useState(component.description);

  useEffect(() => {
    setName(component.name);
    setDescription(component.description);
  }, [component]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    onUpdate({ name, description });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col">
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Properties</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Component Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              onBlur={handleSave}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              onBlur={handleSave}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Add more editable properties here based on component type */}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={onDelete}
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete Component
        </button>
      </div>
    </div>
  );
};