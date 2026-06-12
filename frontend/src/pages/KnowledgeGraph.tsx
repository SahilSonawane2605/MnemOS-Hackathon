import React from 'react';
import { KnowledgeGraphCanvas } from '../components/graph/KnowledgeGraphCanvas';

export const KnowledgeGraph: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Page header */}
      <div className="space-y-1 select-none">
        <h2 className="text-xl font-bold text-white font-mono">INTELLIGENCE NETWORK</h2>
        <p className="text-xs text-neutral-400 font-sans">
          MnemOS maps the connections between the topics you study. Drag nodes to restructure, and hover to view aggregated learning histories.
        </p>
      </div>

      {/* Interactive canvas grid */}
      <div className="w-full">
        <KnowledgeGraphCanvas />
      </div>

    </div>
  );
};
export default KnowledgeGraph;
