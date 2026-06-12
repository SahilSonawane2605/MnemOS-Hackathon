import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, HelpCircle } from 'lucide-react';

interface GraphControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export const GraphControls: React.FC<GraphControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset
}) => {
  return (
    <div className="absolute bottom-6 left-6 flex items-center space-x-3 bg-neutral-950/80 border border-white/10 rounded-xl p-2 backdrop-blur-md select-none z-10">
      {/* Zoom / Pan buttons */}
      <button
        onClick={onZoomIn}
        className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        title="Zoom In"
      >
        <ZoomIn className="w-4 h-4" />
      </button>
      <button
        onClick={onZoomOut}
        className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        title="Zoom Out"
      >
        <ZoomOut className="w-4 h-4" />
      </button>
      <button
        onClick={onReset}
        className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        title="Reset Canvas Position"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      <div className="h-4 w-[1px] bg-white/10" />

      {/* Interactive Legend */}
      <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono pr-2">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>DRAG NODES • HOVER TO EXPLORE DETAILED MEMORIES</span>
      </div>
    </div>
  );
};
