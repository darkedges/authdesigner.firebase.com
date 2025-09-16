"use client"
import * as Icons from 'lucide-react';
import { useState } from 'react';
import { FlowBuilder } from '../components/FlowBuilder';
import { AuthFlow } from '../types/auth';
import { generateId } from '../utils/helpers';

const initialFlow: AuthFlow = {
  id: generateId(),
  name: 'New Authentication Flow',
  description: 'A custom authentication flow',
  components: [],
  connections: [],
  startComponentId: '',
  isFragment: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

function App() {
  const [currentFlow, setCurrentFlow] = useState<AuthFlow>(initialFlow);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleFlowUpdate = (flow: AuthFlow) => {
    setCurrentFlow({ ...flow, updatedAt: new Date().toISOString() });
  };

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Icons.Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              No-Code Authentication Builder
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Design custom authentication flows with drag-and-drop components. 
              Create reusable fragments and build sophisticated user journeys without writing code.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Icons.MousePointer className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Drag & Drop</h3>
              <p className="text-gray-600">
                Visually design authentication flows by dragging components onto the canvas
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <Icons.Puzzle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reusable Fragments</h3>
              <p className="text-gray-600">
                Create and save common authentication patterns as reusable components
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <Icons.Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Production Ready</h3>
              <p className="text-gray-600">
                Export your flows and integrate them into your applications
              </p>
            </div>
          </div>

          <button
            onClick={handleGetStarted}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <Icons.ArrowRight className="w-5 h-5 mr-2" />
            Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden">
      <FlowBuilder flow={currentFlow} onFlowUpdate={handleFlowUpdate} />
    </div>
  );
}

export default App;