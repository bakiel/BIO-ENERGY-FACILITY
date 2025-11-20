
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sun, Droplets, Sprout, Recycle, Factory, Zap, 
  Leaf, Wind, Activity, TrendingUp, ShieldCheck, 
  X, ChevronDown, ArrowDown
} from 'lucide-react';

interface SystemBlueprintProps {
  projectId?: string;
}

// --- SHARED CONFIGURATION ---
const C = {
  solar: '#F59E0B', water: '#0EA5E9', bio: '#854D0E',
  veg: '#22C55E', meat: '#EF4444', dairy: '#3B82F6',
  energy: '#F97316', money: '#10B981', carbon: '#64748B', grid: '#94A3B8'
};

const nodeConfig = {
  // ZONE 1: INPUTS
  solar: { label: "Solar Array", sub: "4.5 MW Capacity", icon: Sun, color: "amber", type: "input" },
  water: { label: "Water Hub", sub: "19ML Dam", icon: Droplets, color: "cyan", type: "input" },
  wildlife: { label: "Wildlife", sub: "Manure Source", icon: Leaf, color: "stone", type: "input" },
  // ZONE 2: FARMS
  farm_veg: { label: "Plan 1: Farm", sub: "Vegetables", icon: Sprout, color: "green", type: "farm" },
  compost: { label: "Compost Hub", sub: "Regeneration", icon: Recycle, color: "orange", type: "process" },
  farm_tree: { label: "Plan 2: Orchard", sub: "Agroforestry", icon: Leaf, color: "emerald", type: "farm" },
  farm_soy: { label: "Plan 1A: Soy", sub: "Feedstock", icon: Sprout, color: "lime", type: "farm" },
  // ZONE 3: FACTORIES
  p5_pharma: { label: "P5: Pharma", sub: "Nutraceuticals", icon: Activity, color: "cyan", type: "factory" },
  p3b_mush: { label: "P3B: Fungi", sub: "Medicinal", icon: Sprout, color: "purple", type: "factory" },
  p2_dairy: { label: "P2: Dairy", sub: "Plant Milk", icon: Factory, color: "blue", type: "factory" },
  p4_cheese: { label: "P4: Cheese", sub: "Artisan", icon: Factory, color: "yellow", type: "factory" },
  p3_meat: { label: "P3: Meat", sub: "Protein", icon: Factory, color: "red", type: "factory" },
  p6_energy: { label: "P6: Refinery", sub: "Bio-Energy", icon: Zap, color: "orange", type: "factory" },
  // ZONE 4: OUTPUTS
  out_food: { label: "Food Security", sub: "3.43M Meals", icon: ShieldCheck, color: "emerald", type: "output" },
  out_econ: { label: "Economy", sub: "R1.2B Revenue", icon: TrendingUp, color: "blue", type: "output" },
  out_climate: { label: "Climate", sub: "-19k T CO2e", icon: Wind, color: "teal", type: "output" },
};

// --- MOBILE SYSTEM STREAM COMPONENT (NEW) ---
const MobileSystemStream = () => {
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    // Group nodes for the vertical feed
    const timelineGroups = [
        {
            title: "Natural Capital",
            color: "blue",
            nodes: ['solar', 'water', 'wildlife']
        },
        {
            title: "Regenerative Agriculture",
            color: "green",
            nodes: ['farm_veg', 'compost', 'farm_tree', 'farm_soy']
        },
        {
            title: "Industrial Processing",
            color: "amber",
            nodes: ['p5_pharma', 'p3b_mush', 'p2_dairy', 'p3_meat', 'p6_energy']
        },
        {
            title: "System Outputs",
            color: "emerald",
            nodes: ['out_food', 'out_econ', 'out_climate']
        }
    ];

    return (
        <div className="w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative pb-12">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Live System Feed</span>
                </div>
                <Activity className="w-4 h-4 text-emerald-500" />
            </div>

            {/* The Vertical Stream */}
            <div className="relative p-4 sm:p-6">
                {/* The "Spine" Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-amber-500 opacity-30"></div>
                
                {/* Animated Particle on Spine */}
                <div className="absolute left-[30px] w-1.5 h-8 bg-emerald-400 rounded-full blur-[2px] animate-[drop_3s_linear_infinite]"></div>

                <style>{`
                    @keyframes drop {
                        0% { top: 0; opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { top: 100%; opacity: 0; }
                    }
                `}</style>

                <div className="space-y-12 relative z-10">
                    {timelineGroups.map((group, gIdx) => (
                        <div key={gIdx} className="relative">
                            {/* Group Title */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-8 h-8 rounded-full bg-slate-900 border-2 border-${group.color}-500 flex items-center justify-center z-10 relative`}>
                                    <span className={`text-${group.color}-400 font-bold text-xs`}>{gIdx + 1}</span>
                                </div>
                                <h3 className={`text-${group.color}-400 font-bold uppercase text-xs tracking-widest`}>{group.title}</h3>
                            </div>

                            {/* Cards */}
                            <div className="space-y-4 pl-12">
                                {group.nodes.map((nodeKey) => {
                                    const node = nodeConfig[nodeKey as keyof typeof nodeConfig];
                                    const isExpanded = expandedCard === nodeKey;
                                    
                                    return (
                                        <div 
                                            key={nodeKey}
                                            onClick={() => setExpandedCard(isExpanded ? null : nodeKey)}
                                            className={`
                                                relative bg-slate-900 border transition-all duration-300 rounded-xl overflow-hidden
                                                ${isExpanded 
                                                    ? `border-${node.color}-500 shadow-[0_0_30px_rgba(0,0,0,0.5)] scale-[1.02]` 
                                                    : 'border-slate-800 hover:border-slate-700'
                                                }
                                            `}
                                        >
                                            {/* Connector Line from Spine */}
                                            <div className="absolute top-6 -left-4 w-4 h-0.5 bg-slate-700"></div>

                                            {/* Card Header */}
                                            <div className="p-4 flex items-center gap-4">
                                                <div className={`p-3 rounded-lg bg-${node.color}-500/10 text-${node.color}-400`}>
                                                    {React.createElement(node.icon, { size: 20 })}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-white font-bold text-sm">{node.label}</h4>
                                                    <p className="text-slate-500 text-xs uppercase font-bold">{node.sub}</p>
                                                </div>
                                                <ChevronDown 
                                                    className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                                                />
                                            </div>

                                            {/* Expanded Telemetry */}
                                            {isExpanded && (
                                                <div className="px-4 pb-4 pt-0 animate-fade-in">
                                                    <div className="h-px w-full bg-slate-800 mb-3"></div>
                                                    <TelemetryCard data={node} color={node.color} mobile={true} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             
             {/* Bottom Fade */}
             <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-20"></div>
        </div>
    );
};


// --- DESKTOP HUD COMPONENT (EXISTING) ---
const DesktopSystemHUD = () => {
    const [activeNode, setActiveNode] = useState<string | null>(null);
    const [scannerPos, setScannerPos] = useState(0);

    // Animate Scanner
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
        p5_pharma: { x: 300, y: 1350 }, p3b_mush: { x: 750, y: 1350 }, p2_dairy: { x: 1200, y: 1350 },
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

    // --- CONNECTIONS ---
    const connections = [
        { id: 'f1', src: 'water', tgt: 'farm_tree', color: C.water, speed: 3 },
        { id: 'f2', src: 'water', tgt: 'farm_veg', color: C.water, speed: 4 },
        { id: 'f3', src: 'water', tgt: 'farm_soy', color: C.water, speed: 4 },
        { id: 'f4', src: 'solar', tgt: 'p5_pharma', color: C.solar, speed: 2 },
        { id: 'f5', src: 'solar', tgt: 'p6_energy', color: C.solar, speed: 2 },
        { id: 'f6', src: 'wildlife', tgt: 'compost', color: C.bio, speed: 8 },
        { id: 'f7', src: 'compost', tgt: 'farm_veg', color: C.bio, speed: 6 },
        { id: 'f8', src: 'farm_veg', tgt: 'p5_pharma', color: C.veg, speed: 4 },
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
        { id: 'f19', src: 'p5_pharma', tgt: 'out_econ', color: C.money, speed: 2.5 },
        { id: 'f20', src: 'p6_energy', tgt: 'out_climate', color: C.carbon, speed: 6 },
    ];

    const isRelated = (src: string, tgt: string) => {
        if (!activeNode) return true;
        return src === activeNode || tgt === activeNode;
    };

    const ActiveNodeData = activeNode ? nodeConfig[activeNode as keyof typeof nodeConfig] : null;

    return (
        <div className="w-full bg-slate-900 relative overflow-hidden rounded-xl select-none group border border-slate-700 shadow-2xl">
            <style>{`
                @keyframes pulse-glow {
                0%, 100% { filter: drop-shadow(0 0 2px rgba(255,255,255,0.5)); }
                50% { filter: drop-shadow(0 0 8px rgba(255,255,255,0.9)); }
                }
                .scan-line-v { box-shadow: 0 0 15px rgba(16, 185, 129, 0.5); height: 100%; width: 2px; }
            `}</style>

            <div className={`absolute top-4 right-4 z-30 transition-all duration-300 ${activeNode ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                {ActiveNodeData && (
                    <div className="bg-slate-800/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-slate-600 min-w-[280px]">
                        <TelemetryCard data={ActiveNodeData} color={ActiveNodeData.color} />
                    </div>
                )}
            </div>

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
                
                <line x1="0" y1="500" x2="3000" y2="500" stroke={C.grid} strokeWidth="2" strokeOpacity="0.1" strokeDasharray="10,10" />
                <line x1="0" y1="1600" x2="3000" y2="1600" stroke={C.grid} strokeWidth="2" strokeOpacity="0.1" strokeDasharray="10,10" />
                <text x="60" y="100" fontSize="48" fontWeight="900" fill="#38BDF8" opacity="0.2" style={{textTransform: 'uppercase', letterSpacing: '0.1em'}}>Zone 1: Natural Capital</text>
                <text x="60" y="580" fontSize="48" fontWeight="900" fill="#4ADE80" opacity="0.2" style={{textTransform: 'uppercase', letterSpacing: '0.1em'}}>Zone 2: Production</text>
                <text x="60" y="1680" fontSize="48" fontWeight="900" fill="#FBBF24" opacity="0.2" style={{textTransform: 'uppercase', letterSpacing: '0.1em'}}>Zone 3: Market & Impact</text>

                <g fill="none" strokeLinecap="round">
                    {connections.map(conn => {
                        const related = isRelated(conn.src, conn.tgt);
                        const path = getLinkPath(conn.src, conn.tgt);
                        
                        return (
                            <g key={conn.id} opacity={related ? 1 : 0.1} transition="opacity 0.3s">
                                <path d={path} stroke={conn.color} strokeWidth={related ? 2 : 1} strokeOpacity={0.15} />
                                {related && <path id={conn.id} d={path} stroke={conn.color} strokeWidth={4} strokeOpacity={0.1} />}
                                {related && (
                                    <circle r={8} fill={conn.color} filter="url(#glow)">
                                        <animateMotion dur={`${conn.speed}s`} repeatCount="indefinite" calcMode="linear" keyPoints="0;1" keyTimes="0;1">
                                            <mpath href={`#${conn.id}`} />
                                        </animateMotion>
                                    </circle>
                                )}
                            </g>
                        );
                    })}
                </g>

                {Object.entries(nodeConfig).map(([key, node]) => {
                    const p = pos[key as keyof typeof pos];
                    const isActive = activeNode === key;
                    const isDimmed = activeNode && activeNode !== key;

                    return (
                        <g 
                            key={key} 
                            transform={`translate(${p.x}, ${p.y})`} 
                            onMouseEnter={() => setActiveNode(key)}
                            onMouseLeave={() => setActiveNode(null)}
                            style={{ cursor: 'pointer' }}
                            opacity={isDimmed ? 0.3 : 1}
                        >
                            {isActive && (
                                <g className="origin-center animate-[spin_10s_linear_infinite]">
                                    <circle r="130" fill="none" stroke={C.money} strokeWidth="2" strokeDasharray="20,10" opacity="0.5" />
                                    <circle r="140" fill="none" stroke={C.money} strokeWidth="1" opacity="0.3" />
                                </g>
                            )}

                            <foreignObject x="-150" y="-80" width="300" height="160">
                                <div className={`
                                    w-full h-full flex flex-col items-center justify-center p-4 rounded-2xl 
                                    transition-all duration-300 ease-out
                                    ${isActive 
                                        ? 'scale-110 bg-slate-800 border-2 border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)] z-50' 
                                        : 'scale-100 bg-slate-900/80 backdrop-blur-sm border border-slate-700 shadow-lg'
                                    }
                                `}>
                                    <div className={`
                                        relative w-14 h-14 rounded-2xl flex items-center justify-center mb-3
                                        bg-gradient-to-br from-${node.color}-900 to-slate-900 border border-${node.color}-700/50
                                        text-${node.color}-400
                                        transition-transform duration-500 ${isActive ? 'rotate-[360deg] scale-110' : ''}
                                    `}>
                                        {React.createElement(node.icon, { size: 28, strokeWidth: 1.5 })}
                                    </div>

                                    <div className="text-center pointer-events-none">
                                        <h3 className="font-bold text-white text-lg leading-none mb-1.5">{node.label}</h3>
                                        <p className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                                            {node.sub}
                                        </p>
                                    </div>
                                </div>
                            </foreignObject>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

// --- MAIN WRAPPER COMPONENT ---
const SystemBlueprint: React.FC<SystemBlueprintProps> = ({ projectId }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileSystemStream /> : <DesktopSystemHUD />;
};

// Shared Telemetry Card Sub-component
const TelemetryCard = ({ data, color, mobile = false }: { data: any, color: string, mobile?: boolean }) => (
    <div className="w-full">
        {!mobile && (
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-700">
                <div className={`p-2.5 rounded-lg bg-${color}-900/50 text-${color}-400 border border-${color}-500/30`}>
                    {React.createElement(data.icon, { size: 20 })}
                </div>
                <div>
                    <h4 className="font-bold text-white">{data.label}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-900/30 border border-emerald-500/20">
                        {data.type} Node
                    </span>
                </div>
            </div>
        )}
        <div className={`grid ${mobile ? 'grid-cols-2 gap-4' : 'space-y-2'}`}>
            <div className={mobile ? 'bg-slate-800 p-2 rounded border border-slate-700' : ''}>
                <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-slate-400 text-xs">Throughput</span>
                    {!mobile && <span className="font-mono font-bold text-emerald-300">{data.sub}</span>}
                </div>
                {mobile && <div className="font-mono font-bold text-emerald-300 text-sm">{data.sub}</div>}
            </div>
            
            <div className={mobile ? 'bg-slate-800 p-2 rounded border border-slate-700' : ''}>
                <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-slate-400 text-xs">Efficiency</span>
                    {!mobile && (
                         <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[98%] shadow-[0_0_10px_#10b981]"></div>
                            </div>
                            <span className="text-xs font-bold text-emerald-400">98%</span>
                        </div>
                    )}
                </div>
                {mobile && <span className="text-xs font-bold text-emerald-400 block">98% Optimal</span>}
            </div>
        </div>
    </div>
);

export default SystemBlueprint;
