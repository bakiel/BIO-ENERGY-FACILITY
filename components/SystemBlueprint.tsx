
import React, { useState, useEffect } from 'react';
import { 
  Sun, Droplets, Sprout, Recycle, Factory, Zap, 
  Leaf, Wind, Activity, TrendingUp, ShieldCheck, 
  ChevronDown, CheckCircle2, AlertCircle
} from 'lucide-react';

interface SystemBlueprintProps {
  projectId?: string;
  onNodeSelect?: (nodeId: string | null) => void;
  selectedNodeId?: string | null;
}

// --- SHARED CONFIGURATION ---
const C = {
  solar: '#F59E0B', water: '#0EA5E9', bio: '#854D0E',
  veg: '#22C55E', meat: '#EF4444', dairy: '#3B82F6',
  energy: '#F97316', money: '#10B981', carbon: '#64748B', grid: '#94A3B8'
};

export const nodeConfig = {
  // ZONE 1: INPUTS
  solar: { label: "Solar Array", sub: "4.9 MW Capacity", icon: Sun, color: "amber", type: "input", desc: "Off-grid power generation" },
  water: { label: "Water Hub", sub: "19ML Dam", icon: Droplets, color: "cyan", type: "input", desc: "Magnetic filtration system" },
  wildlife: { label: "Wildlife", sub: "Manure Source", icon: Leaf, color: "stone", type: "input", desc: "Organic nutrient input" },
  // ZONE 2: FARMS
  farm_veg: { label: "Plan 1: Farm", sub: "Vegetables", icon: Sprout, color: "green", type: "farm", desc: "Intensive horticulture" },
  compost: { label: "Compost Hub", sub: "Regeneration", icon: Recycle, color: "orange", type: "process", desc: "Aerobic fermentation" },
  farm_tree: { label: "Plan 2: Orchard", sub: "Agroforestry", icon: Leaf, color: "emerald", type: "farm", desc: "Macadamia & Soy intercrop" },
  farm_soy: { label: "Plan 1A: Soy", sub: "Feedstock", icon: Sprout, color: "lime", type: "farm", desc: "High-protein feedstock" },
  // ZONE 3: FACTORIES
  p5_solar: { label: "P5: Solar Array", sub: "Estate Energy", icon: Zap, color: "cyan", type: "factory", desc: "Distributed solar power" },
  p3b_mush: { label: "P3B: Fungi", sub: "Medicinal", icon: Sprout, color: "purple", type: "factory", desc: "Climate controlled grow units" },
  p2_dairy: { label: "P2: Dairy", sub: "Plant Milk", icon: Factory, color: "blue", type: "factory", desc: "Ultra-High Temp processing" },
  p4_cheese: { label: "P4: Cheese", sub: "Artisan", icon: Factory, color: "yellow", type: "factory", desc: "Cave ageing facility" },
  p3_meat: { label: "P3: Meat", sub: "Protein", icon: Factory, color: "red", type: "factory", desc: "Extrusion & Retort canning" },
  p6_energy: { label: "P6: Refinery", sub: "Bio-Energy", icon: Zap, color: "orange", type: "factory", desc: "Pyrolysis reactor" },
  // ZONE 4: OUTPUTS
  out_food: { label: "Food Security", sub: "3.43M Meals", icon: ShieldCheck, color: "emerald", type: "output", desc: "National nutrition impact" },
  out_econ: { label: "Economy", sub: "R1.2B Revenue", icon: TrendingUp, color: "blue", type: "output", desc: "Fiscal contribution" },
  out_climate: { label: "Climate", sub: "-19k T CO2e", icon: Wind, color: "teal", type: "output", desc: "Carbon sequestration" },
};

// --- CONNECTIONS DATA ---
const connections = [
    { id: 'f1', src: 'water', tgt: 'farm_tree', color: C.water, speed: 3 },
    { id: 'f2', src: 'water', tgt: 'farm_veg', color: C.water, speed: 4 },
    { id: 'f3', src: 'water', tgt: 'farm_soy', color: C.water, speed: 4 },
    { id: 'f4', src: 'solar', tgt: 'p5_solar', color: C.solar, speed: 2 },
    { id: 'f5', src: 'solar', tgt: 'p6_energy', color: C.solar, speed: 2 },
    { id: 'f6', src: 'wildlife', tgt: 'compost', color: C.bio, speed: 8 },
    { id: 'f7', src: 'compost', tgt: 'farm_veg', color: C.bio, speed: 6 },
    { id: 'f8', src: 'farm_veg', tgt: 'p5_solar', color: C.veg, speed: 4 },
    { id: 'f9', src: 'farm_tree', tgt: 'p3b_mush', color: C.bio, speed: 5 },
    { id: 'f10', src: 'farm_tree', tgt: 'p2_dairy', color: C.veg, speed: 4 },
    { id: 'f11', src: 'farm_tree', tgt: 'p4_cheese', color: C.veg, speed: 4 },
    { id: 'f12', src: 'farm_soy', tgt: 'p3_meat', color: C.veg, speed: 4 },
    { id: 'f13', src: 'farm_tree', tgt: 'p6_energy', color: C.carbon, speed: 5 },
    { id: 'f14', src: 'p6_energy', tgt: 'solar', color: C.energy, speed: 2.5 }, // Circular
    { id: 'f15', src: 'p6_energy', tgt: 'farm_tree', color: '#1F2937', speed: 7 },
    { id: 'f16', src: 'p2_dairy', tgt: 'out_food', color: C.money, speed: 3 },
    { id: 'f17', src: 'p3_meat', tgt: 'out_food', color: C.money, speed: 3 },
    { id: 'f18', src: 'p4_cheese', tgt: 'out_econ', color: C.money, speed: 2.5 },
    { id: 'f19', src: 'p5_solar', tgt: 'out_econ', color: C.money, speed: 2.5 },
    { id: 'f20', src: 'p6_energy', tgt: 'out_climate', color: C.carbon, speed: 6 },
];

// --- MOBILE SYSTEM STREAM ---
const MobileSystemStream = ({ onSelect, selectedId }: { onSelect: (id: string) => void, selectedId: string | null }) => {
    // Group nodes for the vertical feed
    const timelineGroups = [
        { title: "Natural Capital", color: "blue", nodes: ['solar', 'water', 'wildlife'] },
        { title: "Regenerative Agriculture", color: "green", nodes: ['farm_veg', 'compost', 'farm_tree', 'farm_soy'] },
        { title: "Industrial Processing", color: "amber", nodes: ['p5_solar', 'p3b_mush', 'p2_dairy', 'p3_meat', 'p6_energy'] },
        { title: "System Outputs", color: "emerald", nodes: ['out_food', 'out_econ', 'out_climate'] }
    ];

    return (
        <div className="w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative pb-8">
            <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Live System Feed</span>
                </div>
                <Activity className="w-4 h-4 text-emerald-500" />
            </div>

            <div className="relative p-4">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-amber-500 opacity-30"></div>
                
                <div className="space-y-8 relative z-10">
                    {timelineGroups.map((group, gIdx) => (
                        <div key={gIdx} className="relative">
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-8 h-8 rounded-full bg-slate-900 border-2 border-${group.color}-500 flex items-center justify-center z-10 relative`}>
                                    <span className={`text-${group.color}-400 font-bold text-xs`}>{gIdx + 1}</span>
                                </div>
                                <h3 className={`text-${group.color}-400 font-bold uppercase text-xs tracking-widest`}>{group.title}</h3>
                            </div>

                            <div className="space-y-3 pl-12">
                                {group.nodes.map((nodeKey) => {
                                    const node = nodeConfig[nodeKey as keyof typeof nodeConfig];
                                    const isActive = selectedId === nodeKey;
                                    
                                    return (
                                        <div 
                                            key={nodeKey}
                                            onClick={() => onSelect(nodeKey)}
                                            className={`
                                                relative bg-slate-900 border transition-all duration-300 rounded-xl overflow-hidden cursor-pointer
                                                ${isActive 
                                                    ? `border-${node.color}-500 bg-slate-800 shadow-lg` 
                                                    : 'border-slate-800 hover:border-slate-700'
                                                }
                                            `}
                                        >
                                            <div className="absolute top-1/2 -left-4 w-4 h-0.5 bg-slate-700"></div>
                                            <div className="p-3 flex items-center gap-3">
                                                <div className={`p-2 rounded-lg bg-${node.color}-500/10 text-${node.color}-400`}>
                                                    {React.createElement(node.icon, { size: 18 })}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-300'}`}>{node.label}</h4>
                                                    <p className="text-slate-500 text-[10px] uppercase font-bold">{node.sub}</p>
                                                </div>
                                                {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- DESKTOP HUD COMPONENT ---
const DesktopSystemHUD = ({ onSelect, selectedId }: { onSelect: (id: string | null) => void, selectedId: string | null }) => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [scannerPos, setScannerPos] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setScannerPos(prev => (prev + 5) % 3000); 
        }, 20);
        return () => clearInterval(interval);
    }, []);

    const DIMENSIONS = { w: 3000, h: 2000 };
    
    const pos = {
        solar: { x: 300, y: 300 }, water: { x: 1500, y: 300 }, wildlife: { x: 2700, y: 300 },
        farm_veg: { x: 400, y: 850 }, compost: { x: 900, y: 650 }, farm_tree: { x: 1500, y: 850 }, farm_soy: { x: 2600, y: 850 },
        p5_solar: { x: 300, y: 1350 }, p3b_mush: { x: 750, y: 1350 }, p2_dairy: { x: 1200, y: 1350 },
        p4_cheese: { x: 1650, y: 1350 }, p3_meat: { x: 2100, y: 1350 }, p6_energy: { x: 2700, y: 1350 },
        out_food: { x: 600, y: 1800 }, out_econ: { x: 1500, y: 1800 }, out_climate: { x: 2400, y: 1800 },
    };

    const getLinkPath = (src: string, tgt: string) => {
        const s = pos[src as keyof typeof pos];
        const t = pos[tgt as keyof typeof pos];
        const midX = (s.x + t.x) / 2;
        const yOffset = Math.abs(s.x - t.x) > 1000 ? (s.y > 1000 ? 200 : -200) : 0; 
        return `M ${s.x} ${s.y} Q ${midX} ${s.y + yOffset} ${t.x} ${t.y}`;
    };

    const isRelated = (src: string, tgt: string) => {
        const active = hoveredNode || selectedId;
        if (!active) return true;
        return src === active || tgt === active;
    };

    return (
        <div 
            className="w-full bg-slate-900 relative overflow-hidden rounded-xl select-none group border border-slate-700 shadow-2xl"
            onClick={() => onSelect(null)} // Clicking background deselects
        >
            <style>{`
                .scan-line-v { box-shadow: 0 0 15px rgba(16, 185, 129, 0.5); height: 100%; width: 2px; }
                @keyframes flow-dash { to { stroke-dashoffset: -20; } }
                .flow-line { animation: flow-dash 1s linear infinite; }
            `}</style>

            <div className="absolute bg-emerald-500/30 z-10 pointer-events-none scan-line-v" style={{ left: scannerPos, top: 0 }}></div>

            <svg viewBox={`0 0 ${DIMENSIONS.w} ${DIMENSIONS.h}`} className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <pattern id="tech-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M 100 0 L 0 0 0 100" fill="none" stroke={C.grid} strokeWidth="0.5" strokeOpacity="0.2" />
                        <rect x="98" y="98" width="2" height="2" fill={C.grid} fillOpacity="0.4" />
                    </pattern>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                <rect x="0" y="0" width={DIMENSIONS.w} height={DIMENSIONS.h} fill="#020617" />
                <rect x="0" y="0" width={DIMENSIONS.w} height={DIMENSIONS.h} fill="url(#tech-grid)" />
                
                {/* Zone Dividers */}
                <line x1="0" y1="500" x2="3000" y2="500" stroke={C.grid} strokeWidth="2" strokeOpacity="0.1" strokeDasharray="10,10" />
                <line x1="0" y1="1600" x2="3000" y2="1600" stroke={C.grid} strokeWidth="2" strokeOpacity="0.1" strokeDasharray="10,10" />
                <text x="60" y="100" fontSize="48" fontWeight="900" fill="#38BDF8" opacity="0.2" style={{textTransform: 'uppercase', letterSpacing: '0.1em'}}>Zone 1: Natural Capital</text>
                <text x="60" y="580" fontSize="48" fontWeight="900" fill="#4ADE80" opacity="0.2" style={{textTransform: 'uppercase', letterSpacing: '0.1em'}}>Zone 2: Production</text>
                <text x="60" y="1680" fontSize="48" fontWeight="900" fill="#FBBF24" opacity="0.2" style={{textTransform: 'uppercase', letterSpacing: '0.1em'}}>Zone 3: Market & Impact</text>

                {/* Connections */}
                <g fill="none" strokeLinecap="round">
                    {connections.map(conn => {
                        const related = isRelated(conn.src, conn.tgt);
                        const path = getLinkPath(conn.src, conn.tgt);
                        
                        return (
                            <g key={conn.id} opacity={related ? 1 : 0.1} transition="opacity 0.3s">
                                {/* Base Line */}
                                <path d={path} stroke={conn.color} strokeWidth={related ? 3 : 1} strokeOpacity={0.15} />
                                
                                {/* Animated Flow Line (Only when related) */}
                                {related && (
                                    <path 
                                        d={path} 
                                        stroke={conn.color} 
                                        strokeWidth={2} 
                                        strokeOpacity={0.8}
                                        strokeDasharray="10, 10"
                                        className="flow-line"
                                    />
                                )}
                                
                                {/* Moving Particle */}
                                {related && (
                                    <circle r={8} fill={conn.color} filter="url(#glow)">
                                        <animateMotion dur={`${conn.speed}s`} repeatCount="indefinite" calcMode="linear" keyPoints="0;1" keyTimes="0;1">
                                            <mpath href={`#${conn.id}_path`} />
                                        </animateMotion>
                                    </circle>
                                )}
                                {/* Invisible path for motion guide */}
                                <path id={`${conn.id}_path`} d={path} stroke="none" fill="none" />
                            </g>
                        );
                    })}
                </g>

                {/* Nodes */}
                {Object.entries(nodeConfig).map(([key, node]) => {
                    const p = pos[key as keyof typeof pos];
                    const isActive = selectedId === key;
                    const isHovered = hoveredNode === key;
                    const isDimmed = (selectedId && selectedId !== key) || (hoveredNode && hoveredNode !== key);

                    return (
                        <g 
                            key={key} 
                            transform={`translate(${p.x}, ${p.y})`} 
                            onMouseEnter={() => setHoveredNode(key)}
                            onMouseLeave={() => setHoveredNode(null)}
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect(isActive ? null : key);
                            }}
                            style={{ cursor: 'pointer' }}
                            opacity={isDimmed && !isActive ? 0.4 : 1}
                        >
                            {/* Selection Ring */}
                            {isActive && (
                                <g className="origin-center animate-[spin_10s_linear_infinite]">
                                    <circle r="160" fill="none" stroke={C.money} strokeWidth="2" strokeDasharray="20,10" opacity="0.6" />
                                    <circle r="170" fill="none" stroke={C.money} strokeWidth="1" opacity="0.3" />
                                </g>
                            )}
                            
                            {/* Pulse Ring on Hover */}
                            {(isHovered && !isActive) && (
                                <circle r="160" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.2" className="animate-ping" />
                            )}

                            <foreignObject x="-150" y="-80" width="300" height="160">
                                <div className={`
                                    w-full h-full flex flex-col items-center justify-center p-4 rounded-2xl 
                                    transition-all duration-300 ease-out
                                    ${isActive 
                                        ? `scale-110 bg-slate-800 border-2 border-${node.color}-500 shadow-[0_0_50px_rgba(255,255,255,0.1)]` 
                                        : isHovered
                                            ? 'scale-105 bg-slate-800/90 border border-slate-500'
                                            : 'scale-100 bg-slate-900/80 backdrop-blur-sm border border-slate-700'
                                    }
                                `}>
                                    <div className={`
                                        relative w-14 h-14 rounded-2xl flex items-center justify-center mb-3
                                        bg-gradient-to-br from-${node.color}-900 to-slate-900 border border-${node.color}-700/50
                                        text-${node.color}-400
                                        transition-transform duration-500 ${isActive ? 'rotate-[360deg] scale-110' : ''}
                                    `}>
                                        {React.createElement(node.icon, { size: 28, strokeWidth: 1.5 })}
                                        
                                        {/* Active Indicator Dot */}
                                        {isActive && (
                                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                                                <CheckCircle2 size={10} className="text-slate-900" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-center pointer-events-none">
                                        <h3 className={`font-bold text-lg leading-none mb-1.5 ${isActive ? 'text-white' : 'text-slate-200'}`}>{node.label}</h3>
                                        <p className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? `text-${node.color}-400` : 'text-slate-500'}`}>
                                            {node.sub}
                                        </p>
                                    </div>
                                </div>
                            </foreignObject>
                        </g>
                    );
                })}
            </svg>
            
            {/* Helper Text */}
            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-2 pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs text-slate-400 font-mono">SYSTEM LIVE // CLICK NODES TO INSPECT</span>
            </div>
        </div>
    );
}

// --- MAIN WRAPPER COMPONENT ---
const SystemBlueprint: React.FC<SystemBlueprintProps> = ({ onNodeSelect, selectedNodeId }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSelect = (id: string | null) => {
      if (onNodeSelect) onNodeSelect(id);
  };

  return isMobile 
    ? <MobileSystemStream onSelect={handleSelect} selectedId={selectedNodeId} /> 
    : <DesktopSystemHUD onSelect={handleSelect} selectedId={selectedNodeId} />;
};

export default SystemBlueprint;
