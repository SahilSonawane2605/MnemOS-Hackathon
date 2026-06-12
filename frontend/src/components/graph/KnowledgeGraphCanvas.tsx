import React, { useState, useRef, type MouseEvent, type WheelEvent } from 'react';
import { GraphControls } from './GraphControls';
import { Card } from '../common/Card';
import { Cpu, Star, Link2, FileText } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  level: number;
  confidence: number;
  skillsImpact: string;
  memories: string[];
  connections: string[];
}

interface Link {
  source: string;
  target: string;
}

export const KnowledgeGraphCanvas: React.FC = () => {
  // SVG Canvas scale/offset states
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Node Drag states
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  
  // Tooltip details
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Nodes data structure
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: 'n-devops',
      label: 'DevOps',
      x: 250,
      y: 250,
      level: 78,
      confidence: 89,
      skillsImpact: '+5 DevOps',
      memories: ['Kubernetes Basics & Pod Lifecycles', 'ServiceAccount RBAC policy configs'],
      connections: ['Docker', 'Kubernetes', 'AWS', 'Cloud Architecture'],
    },
    {
      id: 'n-docker',
      label: 'Docker',
      x: 100,
      y: 130,
      level: 94,
      confidence: 94,
      skillsImpact: '+4 Cloud Computing',
      memories: ['Docker Networking Deep Dive (bridge/host/overlay)'],
      connections: ['DevOps', 'Kubernetes', 'Cloud Architecture'],
    },
    {
      id: 'n-k8s',
      label: 'Kubernetes',
      x: 400,
      y: 130,
      level: 85,
      confidence: 89,
      skillsImpact: '+5 DevOps',
      memories: ['Configure Pod Liveness/Readiness spec sheets'],
      connections: ['DevOps', 'Docker'],
    },
    {
      id: 'n-aws',
      label: 'AWS',
      x: 400,
      y: 370,
      level: 91,
      confidence: 91,
      skillsImpact: '+3 Cloud Computing',
      memories: ['ECS Fargate Task Definitions & ALBs'],
      connections: ['DevOps', 'Cloud Architecture'],
    },
    {
      id: 'n-cloud',
      label: 'Cloud Architecture',
      x: 100,
      y: 370,
      level: 82,
      confidence: 90,
      skillsImpact: '+4 Cloud Computing',
      memories: ['AWS serverless deployments and VPC setups'],
      connections: ['DevOps', 'Docker', 'AWS'],
    },
  ]);

  // Node connection paths
  const links: Link[] = [
    { source: 'n-docker', target: 'n-devops' },
    { source: 'n-k8s', target: 'n-devops' },
    { source: 'n-aws', target: 'n-devops' },
    { source: 'n-cloud', target: 'n-devops' },
    { source: 'n-k8s', target: 'n-docker' },
    { source: 'n-aws', target: 'n-cloud' },
    { source: 'n-docker', target: 'n-cloud' },
  ];

  // Zoom actions
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Zoom on wheel event
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Drag Canvas background to PAN
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof SVGElement && e.target.classList.contains('node-handle')) {
      return; // Handled by node drag
    }
    setIsPanning(true);
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (draggedNodeId) {
      // Dragging node
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        // Adjust coordinate offset mapping based on zoom and pan
        const x = (e.clientX - rect.left - pan.x) / zoom;
        const y = (e.clientY - rect.top - pan.y) / zoom;
        
        setNodes((prev) =>
          prev.map((n) => (n.id === draggedNodeId ? { ...n, x, y } : n))
        );
      }
    } else if (isPanning) {
      // Panning background
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggedNodeId(null);
  };

  const startDragNode = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setDraggedNodeId(id);
  };

  return (
    <div className="relative w-full h-[540px] bg-[#050505] rounded-3xl border border-white/10 overflow-hidden flex select-none">
      
      {/* Interactive canvas box */}
      <div
        ref={containerRef}
        className={`w-full h-full relative ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <svg className="w-full h-full">
          <defs>
            {/* Grid Pattern that translates with pan/zoom */}
            <pattern
              id="graphGrid"
              width={40 * zoom}
              height={40 * zoom}
              patternUnits="userSpaceOnUse"
              x={pan.x}
              y={pan.y}
            >
              <path
                d={`M ${40 * zoom} 0 L 0 0 0 ${40 * zoom}`}
                fill="none"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="100%" height="100%" fill="url(#graphGrid)" />

          {/* Render Vector Edges */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {links.map((link, idx) => {
              const sourceNode = nodes.find((n) => n.id === link.source);
              const targetNode = nodes.find((n) => n.id === link.target);

              if (!sourceNode || !targetNode) return null;

              return (
                <line
                  key={idx}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="rgba(124, 244, 255, 0.2)"
                  strokeWidth="2.5"
                  className="hover:stroke-[#7CF4FF] transition-colors"
                />
              );
            })}
          </g>

          {/* Render Nodes */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {nodes.map((node) => {
              const isHovered = hoveredNode?.id === node.id;
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Glowing halo */}
                  <circle
                    r={28}
                    fill="rgba(124,244,255,0.05)"
                    className={`transition-all duration-300 ${isHovered ? 'scale-125 opacity-100' : 'opacity-0'}`}
                  />
                  
                  {/* Node handle circle */}
                  <circle
                    r={20}
                    fill="#090909"
                    stroke={isHovered ? '#D7FF00' : '#7CF4FF'}
                    strokeWidth="2"
                    className="node-handle drop-shadow-[0_0_8px_rgba(124,244,255,0.3)] transition-colors"
                    onMouseDown={(e) => startDragNode(node.id, e)}
                  />
                  
                  {/* Topic Label text */}
                  <text
                    y="36"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                    fontFamily="monospace"
                    className="font-bold pointer-events-none fill-neutral-300 tracking-wider"
                  >
                    {node.label}
                  </text>
                  
                  <text
                    y="3"
                    textAnchor="middle"
                    fill="#7CF4FF"
                    fontSize="9"
                    fontFamily="monospace"
                    className="pointer-events-none fill-neutral-500 font-bold"
                  >
                    {node.level}%
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Floating details overlay on hover */}
        {hoveredNode && (
          <div
            className="absolute top-6 right-6 w-80 z-20 pointer-events-none animate-fadeIn select-none"
          >
            <Card
              glowColor="primary"
              className="p-5 border-[#D7FF00]/30 bg-neutral-950/90 shadow-[0_0_30px_rgba(0,0,0,0.6)] space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-3.5 h-3.5 text-[#D7FF00]" />
                  <span className="font-mono text-sm font-bold text-white">{hoveredNode.label}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-[#7CF4FF]/20 text-[9px] text-[#7CF4FF] font-mono">
                  {hoveredNode.skillsImpact}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2 bg-neutral-900 border border-white/5 rounded-lg">
                  <span className="text-neutral-500 block mb-0.5">MASTERY</span>
                  <span className="text-white font-semibold flex items-center">
                    <Star className="w-3 h-3 text-[#D7FF00] mr-1 shrink-0 fill-[#D7FF00]" />
                    {hoveredNode.level}%
                  </span>
                </div>
                <div className="p-2 bg-neutral-900 border border-white/5 rounded-lg">
                  <span className="text-neutral-500 block mb-0.5">CONFIDENCE</span>
                  <span className="text-white font-semibold">{hoveredNode.confidence}%</span>
                </div>
              </div>

              {/* Related Memories */}
              <div className="space-y-1.5">
                <span className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <FileText className="w-3 h-3" />
                  <span>Synthesized Memories</span>
                </span>
                <ul className="space-y-1">
                  {hoveredNode.memories.map((m, i) => (
                    <li key={i} className="text-[10px] text-neutral-300 font-sans leading-relaxed border-l border-white/10 pl-2">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connected Concepts */}
              <div className="space-y-1.5">
                <span className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider flex items-center space-x-1">
                  <Link2 className="w-3 h-3" />
                  <span>Connected Concepts</span>
                </span>
                <div className="flex flex-wrap gap-1">
                  {hoveredNode.connections.map((c, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-neutral-900 border border-white/5 text-[9px] text-neutral-400 font-mono">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
        
        {/* Controls HUD */}
        <GraphControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};
