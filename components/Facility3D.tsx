
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, SoftShadows, Instance, Instances, Environment, Float, Line, Html, useCursor } from '@react-three/drei';
import { X, Info, Activity, Sprout, Factory, Clock, Calendar, Zap, Droplets, Truck, Recycle, Wind } from 'lucide-react';
import * as THREE from 'three';

interface Facility3DProps {
    projectId: string;
}

// --- Data Models ---

interface FacilityObjectInfo {
    id: string;
    name: string;
    type: string;
    description: string;
    capacity?: string;
    height?: number;
}

// Plan 6 Layout
const facilityDataPlan6: Record<string, FacilityObjectInfo> = {
    'feedstock': {
        id: 'feedstock',
        name: "Feedstock Reception",
        type: "Logistics & Pre-processing",
        description: "Receives diverse organic waste including municipal garden waste and agricultural residues. Sorts and stages materials for processing.",
        capacity: "30,997 Tonnes / Year",
        height: 3
    },
    'pelletizer': {
        id: 'pelletizer',
        name: "Pelletisation Plant",
        type: "Pre-Processing Unit",
        description: "Grinds, dries, and presses raw heterogeneous biomass into uniform 6-8mm pellets. This standardization is the key competitive advantage.",
        capacity: "2.5 Tonnes / Hour",
        height: 6
    },
    'reactor': {
        id: 'reactor',
        name: "Pyrolysis Reactor",
        type: "Core Processing Unit",
        description: "Continuous horizontal screw reactor operating at 500°C in an oxygen-free environment. Thermally decomposes pellets into bio-oil.",
        capacity: "2 Tonnes / Hour",
        height: 10
    },
    'refinery': {
        id: 'refinery',
        name: "Bio-Refinery Unit",
        type: "Post-Processing",
        description: "Features a 12-metre fractional distillation column and catalytic upgrading system. Refines crude bio-oil into SANS 1935 biodiesel.",
        capacity: "1,000 Litres / Hour",
        height: 8
    },
    'storage': {
        id: 'storage',
        name: "Storage Tank Farm",
        type: "Inventory Management",
        description: "Secure bunded storage area for finished bio-diesel ready for distribution and buffer storage for crude inputs.",
        capacity: "500,000 Litres Total",
        height: 8
    },
    'office': {
        id: 'office',
        name: "Operations Centre",
        type: "Admin & QC",
        description: "Houses the SCADA control room for 24/7 monitoring, the SANS 1935 quality control laboratory, and staff amenities.",
        capacity: "Supports 19 Staff",
        height: 4
    }
};

// Plan 5 Layout
const facilityDataPlan5: Record<string, FacilityObjectInfo> = {
    'greenhouse': {
        id: 'greenhouse',
        name: "High-Tech Greenhouse",
        type: "Cultivation Zone",
        description: "10,240m² multi-span polycarbonate structure. Precision climate control (18-22°C) and UV-B lighting induce stress response for max potency.",
        capacity: "10,240m² / 130T Yield",
        height: 5
    },
    'processing': {
        id: 'processing',
        name: "Processing Building",
        type: "Pharma Manufacturing",
        description: "2,500m² facility housing freeze dryers, cryo-mills, and ISO Class 7 cleanrooms for encapsulation. 24/7 operation.",
        capacity: "200kg/day Freeze Dry",
        height: 8
    },
    'solar': {
        id: 'solar',
        name: "4.5MW Solar Array",
        type: "Energy Source",
        description: "7,864 solar panels + 5.8MWh battery storage. Provides 100% off-grid power, ensuring zero contamination events.",
        capacity: "4,561 kWp / 5.8MWh",
        height: 1
    },
    'water': {
        id: 'water',
        name: "Water Treatment",
        type: "Utilities",
        description: "Shared borehole input with Ozone sterilization unit. Kills 99.99% of pathogens instantly.",
        capacity: "200,000 L/Month",
        height: 4
    }
};

// Plan 3B Layout (Medicinal Mushrooms)
const facilityDataPlan3b: Record<string, FacilityObjectInfo> = {
    'containers': {
        id: 'containers',
        name: "Smart Grow Containers",
        type: "Cultivation",
        description: "16x 40ft High-Cube insulated containers with automated HVAC, humidification, and CO2 control for precision fruiting.",
        capacity: "100T/Year",
        height: 3
    },
    'substrate': {
        id: 'substrate',
        name: "Substrate Prep Hall",
        type: "Pre-Processing",
        description: "Facility for chipping wood prunings, mixing with nutrients, bagging, and autoclave sterilization (2x units).",
        capacity: "14,400 Bags/Day",
        height: 6
    },
    'lab': {
        id: 'lab',
        name: "Cleanroom & Lab",
        type: "Inoculation",
        description: "ISO Class 5 HEPA-filtered laboratory for spawn propagation and sterile bag inoculation.",
        capacity: "Zero Contamination",
        height: 4
    },
    'processing': {
        id: 'processing',
        name: "Encapsulation Unit",
        type: "Manufacturing",
        description: "GMP facility with freeze-dryers, mills, and automated capsule filling lines for retail product creation.",
        capacity: "2M Bottles/Year",
        height: 5
    },
    'solar': {
        id: 'solar',
        name: "Solar Allocation",
        type: "Energy",
        description: "Dedicated 50kW allocation from central array to power HVAC and autoclaves.",
        capacity: "100% Renewable",
        height: 1
    }
};

// Plan 4 Layout (Cheese & Bees)
const facilityDataPlan4: Record<string, FacilityObjectInfo> = {
    'factory': {
        id: 'factory',
        name: "Artisan Creamery",
        type: "Production",
        description: "800m² purpose-built facility for fermentation, pressing, and hand-waxing. Food-grade epoxy floors and SS304 finishes.",
        capacity: "72,666 kg/Year",
        height: 6
    },
    'cave': {
        id: 'cave',
        name: "Ageing Caves",
        type: "Maturation",
        description: "Underground/insulated rooms maintained at 12-14°C and 75% humidity. Racking for 20,000 wheels (2-12 month inventory).",
        capacity: "20,000 Wheels",
        height: 4
    },
    'apiary': {
        id: 'apiary',
        name: "Flow Hive Apiary",
        type: "Pollination",
        description: "200 Flow Hives strategically placed near macadamia orchards. Provides +40% yield boost to Plan 2.",
        capacity: "22T Honey/Year",
        height: 2
    },
    'solar': {
        id: 'solar',
        name: "Solar + Battery",
        type: "Energy",
        description: "300kW Solar Array + 400kWh Battery. Critical for maintaining 24/7 climate control in ageing caves.",
        capacity: "100% Off-Grid",
        height: 1
    },
    'biodigester': {
        id: 'biodigester',
        name: "Biogas Unit",
        type: "Waste-to-Energy",
        description: "Converts nut pulp, shells, and wastewater into thermal energy for the boiler. Zero waste to landfill.",
        capacity: "11,760 m³ Gas",
        height: 3
    }
};

// Plan 2 Layout
const facilityDataPlan2: Record<string, FacilityObjectInfo> = {
    'orchard': {
        id: 'orchard',
        name: "Macadamia Orchard",
        type: "Agroforestry",
        description: "180 Hectares of Macadamia trees intercropped with Soybeans. Trees create microclimate reducing evaporation by 20%.",
        capacity: "36,000 Trees",
        height: 4
    },
    'factory': {
        id: 'factory',
        name: "Dairy Factory",
        type: "Processing",
        description: "Main processing hall with wet milling, homogenisation (40MPa) and UHT sterilisation equipment.",
        capacity: "2,000 L/Hour",
        height: 7
    },
    'coldstore': {
        id: 'coldstore',
        name: "Cold Storage",
        type: "Logistics",
        description: "-20°C to +4°C multi-chamber cold storage for fresh yoghurt, cheese and ice cream.",
        capacity: "250m² / 500 Pallets",
        height: 6
    },
    'warehouse': {
        id: 'warehouse',
        name: "Dry Warehouse",
        type: "Storage",
        description: "Ambient storage for UHT milk cartons and packaging materials.",
        capacity: "300m²",
        height: 6
    },
    'water': {
        id: 'water',
        name: "Water Tanks",
        type: "Utilities",
        description: "Backup water storage for irrigation peaks and processing washdown.",
        capacity: "100,000 Litres",
        height: 5
    }
};

// Plan 3 Layout (Meat Factory)
const facilityDataPlan3: Record<string, FacilityObjectInfo> = {
    'production': {
        id: 'production',
        name: "Main Production Hall",
        type: "Manufacturing",
        description: "Houses the 4 HMMA Extruders, Seitan Mixers, and Butcher lines. Segregated high-care zones.",
        capacity: "3.4 Tonnes / Day",
        height: 8
    },
    'smokehouse': {
        id: 'smokehouse',
        name: "Smokehouse Unit",
        type: "Curing",
        description: "Real wood smoke chambers (Applewood/Oak). 2-8 hour cycles for Boerewors, Bacon, and Ribs.",
        capacity: "830kg / Day",
        height: 6
    },
    'retort': {
        id: 'retort',
        name: "Retort Facility",
        type: "Sterilization",
        description: "Autoclave room for institutional pouch processing. 121°C sterilization.",
        capacity: "1,800 Packs / Hr",
        height: 7
    },
    'yeast': {
        id: 'yeast',
        name: "Yeast Fermentation",
        type: "Biotech",
        description: "Dedicated bio-reactors for nutritional yeast production. Fortified B-Vitamin output.",
        capacity: "35.5T / Year",
        height: 9
    },
    'logistics': {
        id: 'logistics',
        name: "Dispatch & Ambient Store",
        type: "Warehousing",
        description: "Storage for Retort Pouches (Ambient) and Cold Storage for Fresh Retail products.",
        capacity: "400m² Area",
        height: 6
    }
};

// Plan 1 Layout (The Farm)
const facilityDataPlan1: Record<string, FacilityObjectInfo> = {
    'solar': {
        id: 'solar',
        name: "500kVA Solar Array",
        type: "Energy",
        description: "Ground mounted solar array providing off-grid power to the entire farm cluster.",
        capacity: "490 kWp",
        height: 1
    },
    'water': {
        id: 'water',
        name: "Water Hub",
        type: "Utilities",
        description: "19ML Dam + 319KL Underground Tanks + RO/Magnetic Filtration plant.",
        capacity: "Drought Proof",
        height: 2
    },
    'compost': {
        id: 'compost',
        name: "Compost Yard",
        type: "Regeneration",
        description: "Aerobic windrows for EM-1 compost and Rock Dust crushing facility.",
        capacity: "2,300T / Year",
        height: 3
    },
    'packhouse': {
        id: 'packhouse',
        name: "Packhouse & Cold Store",
        type: "Processing",
        description: "Grading, washing, and cooling facility for fresh vegetable harvest.",
        capacity: "2,000m²",
        height: 6
    },
    'cultivation': {
        id: 'cultivation',
        name: "Vegetable Fields",
        type: "Agriculture",
        description: "40ha intensive vegetable production (Spinach, Tomatoes, Peppers).",
        capacity: "1,149T / Year",
        height: 1
    }
};

// --- 3D Components ---

const LabelCard = ({ position, text, subtext, color = "emerald" }: any) => {
  return (
    <Html position={position} center distanceFactor={20} occlude>
         <div className="pointer-events-none select-none group">
            <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
                {/* Card Body */}
                <div className="bg-slate-900/95 backdrop-blur-md p-3 rounded-lg border border-slate-700 shadow-2xl min-w-[140px] text-center relative z-10">
                    <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 text-${color}-400`}>
                        {subtext || 'Facility'}
                    </div>
                    <div className="text-sm font-bold text-white leading-tight whitespace-nowrap">
                        {text}
                    </div>
                </div>
                
                {/* Connector Line */}
                <div className="h-6 w-0.5 bg-slate-500/50 mt-0"></div>
                
                {/* Anchor Dot */}
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
            </div>
        </div>
    </Html>
  )
}

const Label = ({ position, text, subtext, color }: any) => <LabelCard position={position} text={text} subtext={subtext} color={color} />;

interface InteractiveProps {
    id: string;
    position: any;
    color: string;
    label?: string;
    subtext?: string;
    opacity?: number;
    onSelect: (id: string) => void;
    isSelected: boolean;
}

const Building = ({ id, position, args, color, label, subtext, opacity = 1, onSelect, isSelected }: InteractiveProps & { args: any }) => {
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    const handleClick = (e: any) => {
        e.stopPropagation();
        onSelect(id);
    };

    const displayColor = isSelected ? '#10b981' : (hovered ? '#34d399' : color);

    return (
        <group position={position} onClick={handleClick}>
            <mesh 
                position={[0, args[1] / 2, 0]} 
                castShadow 
                receiveShadow
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <boxGeometry args={args} />
                <meshStandardMaterial color={displayColor} transparent opacity={opacity} />
            </mesh>
            {label && <LabelCard position={[0, args[1] + 2, 0]} text={label} subtext={subtext} color={isSelected ? 'emerald' : 'slate'} />}
        </group>
    );
};

const Tank = ({ id, position, height, radius, color, label, subtext, onSelect, isSelected }: InteractiveProps & { height: number, radius: number }) => {
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    const handleClick = (e: any) => {
        e.stopPropagation();
        onSelect(id);
    };

    const displayColor = isSelected ? '#10b981' : (hovered ? '#34d399' : color);

    return (
        <group position={position} onClick={handleClick}>
            <mesh 
                position={[0, height / 2, 0]} 
                castShadow 
                receiveShadow
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <cylinderGeometry args={[radius, radius, height, 32]} />
                <meshStandardMaterial color={displayColor} />
            </mesh>
            {label && <LabelCard position={[0, height + 2, 0]} text={label} subtext={subtext} color={isSelected ? 'emerald' : 'slate'} />}
        </group>
    );
};

const Pile = ({ id, position, color, onSelect, isSelected }: InteractiveProps) => {
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    const handleClick = (e: any) => {
        e.stopPropagation();
        onSelect(id);
    };
    
    const displayColor = isSelected ? '#10b981' : (hovered ? '#34d399' : color);

    return (
        <mesh 
            position={position} 
            castShadow 
            receiveShadow 
            rotation={[0, Math.random() * Math.PI, 0]}
            onClick={handleClick}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <coneGeometry args={[3, 2.5, 16]} />
            <meshStandardMaterial color={displayColor} />
        </mesh>
    )
}

const SelectionIndicator = ({ targetPosition, targetHeight }: { targetPosition: [number, number, number], targetHeight: number }) => {
    // Removed bouncing animation for static stability
    return (
        <group position={[targetPosition[0], targetPosition[1] + targetHeight + 4, targetPosition[2]]}>
             <mesh rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[1.5, 3, 8]} />
                <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} />
            </mesh>
        </group>
    );
};

// --- DYNAMIC FLOW COMPONENT ---

interface FlowProps {
    start: [number, number, number];
    end: [number, number, number];
    color: string;
    label: string;
    details: {
        volume: string;
        value: string;
        icon: any;
    };
    arcHeight?: number;
}

const FlowLine = ({ start, end, color, label, details, arcHeight = 15 }: FlowProps) => {
    const [hovered, setHover] = useState(false);
    useCursor(hovered);
    const ref = useRef<any>(null);
    const Icon = details.icon;

    // Create Curve
    const curve = useMemo(() => {
        const midX = (start[0] + end[0]) / 2;
        const midZ = (start[2] + end[2]) / 2;
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(...start),
            new THREE.Vector3(midX, arcHeight, midZ),
            new THREE.Vector3(...end)
        ]);
    }, [start, end, arcHeight]);
    
    const points = useMemo(() => curve.getPoints(40), [curve]);

    // Animate flow
    useFrame((state) => {
        if (ref.current) {
            ref.current.material.dashOffset -= 0.01;
        }
    });

    return (
        <group 
            onPointerOver={(e) => { e.stopPropagation(); setHover(true); }} 
            onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
        >
            {/* Visible Flow Line */}
            <Line 
                ref={ref}
                points={points} 
                color={hovered ? '#ffffff' : color} 
                lineWidth={hovered ? 5 : 3} 
                dashed
                dashScale={2}
                dashSize={2}
                gapSize={1}
                opacity={hovered ? 1 : 0.6}
                transparent
            />

            {/* Interactive Invisible Hit Box (Thicker) */}
             <Line 
                points={points} 
                color="transparent" 
                lineWidth={20} 
                opacity={0}
                transparent
            />

            {/* Info Card on Hover */}
            {hovered && (
                <Html position={[
                    (start[0] + end[0]) / 2,
                    arcHeight + 2,
                    (start[2] + end[2]) / 2
                ]} center>
                    <div className="bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-lg shadow-2xl border border-slate-600 min-w-[180px] animate-fade-in pointer-events-none">
                        <div className="flex items-center gap-2 border-b border-slate-700 pb-2 mb-2">
                            <div className="p-1.5 bg-slate-800 rounded-md">
                                <Icon className="w-3 h-3 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Flow Type</p>
                                <p className="text-sm font-bold leading-none">{label}</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400">Volume:</span>
                                <span className="font-mono font-medium">{details.volume}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400">Value:</span>
                                <span className="font-mono font-medium text-emerald-400">{details.value}</span>
                            </div>
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
};

// --- SPECIAL PLAN 2: AGROFORESTRY EVOLUTION SCENE ---

const AgroforestryEvolutionScene = ({ year }: { year: number }) => {
    // Logic based on year
    const treeScale = 0.3 + (year * 0.25); // Year 1: 0.55, Year 7: ~2.0
    const canopySize = 0.5 + (year * 0.5);
    const treeHeight = 1 + (year * 0.8);
    
    const soyDensity = year <= 3 ? 1 : (year <= 5 ? 0.4 : 0);
    
    const rowSpacing = 8;
    const treeSpacing = 6;
    const numRows = 5;
    const treesPerRow = 8;

    const treePositions = useMemo(() => {
        const pos = [];
        for (let r = 0; r < numRows; r++) {
            for (let t = 0; t < treesPerRow; t++) {
                pos.push({
                    position: [(r * rowSpacing) - (numRows * rowSpacing / 2) + 4, 0, (t * treeSpacing) - (treesPerRow * treeSpacing / 2) + 3],
                    rotation: Math.random() * Math.PI
                });
            }
        }
        return pos;
    }, []);

    const soyPositions = useMemo(() => {
        const pos = [];
        // Create rows of soy between tree rows
        for (let r = 0; r < numRows - 1; r++) {
            // 3 lines of soy between trees
            for(let line = 1; line <= 3; line++) {
                const offset = (rowSpacing / 4) * line;
                for (let s = 0; s < 30; s++) {
                    // Jitter position
                    const jitterX = (Math.random() - 0.5) * 0.5;
                    const jitterZ = (Math.random() - 0.5) * 0.5;
                    pos.push([
                        (r * rowSpacing) - (numRows * rowSpacing / 2) + 4 + offset + jitterX,
                        0,
                        (s * 1.5) - 22 + jitterZ
                    ]);
                }
            }
        }
        // Shuffle for uniform density reduction
        for (let i = pos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pos[i], pos[j]] = [pos[j], pos[i]];
        }
        return pos;
    }, []);

    return (
        <group>
             <ambientLight intensity={0.6} />
             <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
             
             {/* Ground */}
             <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                 <planeGeometry args={[100, 100]} />
                 <meshStandardMaterial color="#f0fdf4" />
             </mesh>
             
             {/* Trees */}
             {treePositions.map((t, i) => (
                 <group key={i} position={t.position as any} rotation={[0, t.rotation, 0]}>
                     {/* Trunk */}
                     <mesh position={[0, treeHeight/2, 0]} castShadow>
                         <cylinderGeometry args={[0.2 * treeScale, 0.3 * treeScale, treeHeight, 8]} />
                         <meshStandardMaterial color="#78350f" />
                     </mesh>
                     {/* Canopy */}
                     <mesh position={[0, treeHeight, 0]} castShadow>
                         <dodecahedronGeometry args={[canopySize, 0]} />
                         <meshStandardMaterial color="#16a34a" />
                     </mesh>
                 </group>
             ))}

             {/* Soybeans */}
             {soyDensity > 0 && (
                 <Instances range={Math.floor(soyPositions.length * soyDensity)}>
                     <coneGeometry args={[0.3, 0.6, 5]} />
                     <meshStandardMaterial color="#84cc16" />
                     {soyPositions.map((pos, i) => (
                         <Instance key={i} position={pos as any} />
                     ))}
                 </Instances>
             )}
             
             {/* Labels */}
             <LabelCard position={[0, 12, 0]} text={`Year ${year}`} subtext={year >= 7 ? 'Canopy Closure' : 'Growth Phase'} color="slate" />
        </group>
    )
};

// --- MASTER SCENE COMPONENT ---
const MasterScene = ({ onSelect }: { onSelect: (id: string | null) => void }) => {
    // Coordinates
    const P1_CENTER = [0, 0, 0] as [number, number, number];
    const P6_ENERGY = [-30, 0, 30] as [number, number, number];
    const P5_PHARMA = [-35, 0, -20] as [number, number, number];
    const P3_MEAT = [30, 0, 10] as [number, number, number];
    const P2_ORCHARD = [0, 0, -40] as [number, number, number];
    const P4_CHEESE = [35, 0, -25] as [number, number, number];
    const P3B_MUSHROOMS = [-10, 0, 30] as [number, number, number];

    return (
        <group onPointerMissed={() => onSelect(null)}>
             <ambientLight intensity={0.7} />
             <directionalLight position={[50, 80, 40]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
            
             {/* Vast Terrain */}
             <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial color="#ecfccb" />
             </mesh>

             {/* --- PLAN 1: THE HUB (Center) --- */}
             <group position={P1_CENTER}>
                <LabelCard position={[0, 12, 0]} text="Core Farm" subtext="Plan 1" color="emerald" />
                <Building id="p1_packhouse" position={[0, 0, 0]} args={[15, 5, 20]} color="#f8fafc" onSelect={() => {}} isSelected={false} />
                <Building id="p1_solar" position={[15, 0, 0]} args={[10, 0.5, 20]} color="#1e293b" onSelect={() => {}} isSelected={false} label="Solar Array" />
                <Tank id="p1_water" position={[-12, 0, 0]} height={3} radius={3} color="#0ea5e9" onSelect={() => {}} isSelected={false} label="Water Hub" />
                {/* Fields */}
                <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.1, -15]}>
                    <planeGeometry args={[30, 10]} />
                    <meshStandardMaterial color="#16a34a" />
                </mesh>
             </group>

             {/* --- PLAN 6: ENERGY (South West) --- */}
             <group position={P6_ENERGY}>
                <LabelCard position={[0, 10, 0]} text="Bio-Energy" subtext="Plan 6" color="emerald" />
                <Building id="p6_reactor" position={[0, 0, 0]} args={[10, 8, 10]} color="#334155" onSelect={() => {}} isSelected={false} />
                <Tank id="p6_tank" position={[8, 0, 0]} height={6} radius={2.5} color="#e2e8f0" onSelect={() => {}} isSelected={false} />
                <Pile id="p6_feedstock" position={[-8, 1, 0]} color="#d97706" onSelect={() => {}} isSelected={false} />
             </group>

             {/* --- PLAN 5: PHARMA (North West) --- */}
             <group position={P5_PHARMA}>
                 <LabelCard position={[0, 8, 0]} text="Pharma" subtext="Plan 5" color="cyan" />
                 <Building id="p5_greenhouse" position={[0, 0, 0]} args={[20, 4, 15]} color="#a7f3d0" opacity={0.7} onSelect={() => {}} isSelected={false} />
             </group>

             {/* --- PLAN 3: MEAT FACTORY (East) --- */}
             <group position={P3_MEAT}>
                 <LabelCard position={[0, 10, 0]} text="Plant Meat" subtext="Plan 3" color="amber" />
                 <Building id="p3_factory" position={[0, 0, 0]} args={[15, 6, 25]} color="#e2e8f0" onSelect={() => {}} isSelected={false} />
                 <Tank id="p3_yeast" position={[-10, 0, 5]} height={7} radius={2} color="#fbbf24" onSelect={() => {}} isSelected={false} />
             </group>

             {/* --- PLAN 2: AGROFORESTRY (North) --- */}
             <group position={P2_ORCHARD}>
                 <LabelCard position={[0, 8, 0]} text="Agroforestry" subtext="Plan 2" color="green" />
                 {/* Better Trees */}
                 {Array.from({length: 5}).map((_, r) => 
                    Array.from({length: 4}).map((_, c) => (
                         <group key={`${r}-${c}`} position={[r*8 - 16, 0, c*8 - 12]}>
                            <mesh position={[0, 1, 0]}>
                                <cylinderGeometry args={[0.2, 0.3, 2, 6]} />
                                <meshStandardMaterial color="#78350f" />
                            </mesh>
                            <mesh position={[0, 2.5, 0]}>
                                <dodecahedronGeometry args={[1.2, 0]} />
                                <meshStandardMaterial color="#16a34a" />
                            </mesh>
                         </group>
                    ))
                 )}
                 <Building id="p2_dairy" position={[0, 0, 15]} args={[10, 4, 10]} color="#f1f5f9" onSelect={() => {}} isSelected={false} label="Dairy" />
             </group>

             {/* --- PLAN 4: CHEESE (North East) --- */}
             <group position={P4_CHEESE}>
                <LabelCard position={[0, 8, 0]} text="Cheese" subtext="Plan 4" color="yellow" />
                <Building id="p4_cave" position={[0, 0, 0]} args={[15, 3, 10]} color="#78716c" onSelect={() => {}} isSelected={false} />
                <group position={[-15, 0, 0]}>
                    <Building id="p4_bees" position={[0, 0, 0]} args={[5, 1, 10]} color="#d97706" onSelect={() => {}} isSelected={false} label="Hives" />
                </group>
             </group>

             {/* --- PLAN 3B: MUSHROOMS (South) --- */}
             <group position={P3B_MUSHROOMS}>
                 <LabelCard position={[0, 6, 0]} text="Mushrooms" subtext="Plan 3B" color="purple" />
                 <Building id="p3b_containers" position={[0, 0, 0]} args={[12, 3, 8]} color="#d8b4fe" onSelect={() => {}} isSelected={false} />
             </group>


             {/* --- SYSTEMIC FLOW LINES --- */}
             
             {/* 1. SOY FLOW: Farm (P1) -> Meat (P3) */}
             <FlowLine 
                start={[0, 2, 0]} 
                end={[30, 2, 10]} 
                color="#16a34a" 
                label="Soy Feedstock" 
                details={{ volume: "150 T/Year", value: "R 1.5M Saved", icon: Sprout }} 
                arcHeight={12}
             />

             {/* 2. WASTE FLOW: Orchard (P2) -> Energy (P6) */}
             <FlowLine 
                start={[0, 2, -40]} 
                end={[-30, 2, 30]} 
                color="#854d0e" 
                label="Biomass (Shells)" 
                details={{ volume: "145 T/Year", value: "Zero Cost", icon: Recycle }} 
                arcHeight={25}
             />

             {/* 3. WASTE FLOW: Orchard (P2) -> Mushrooms (P3B) */}
             <FlowLine 
                start={[0, 2, -40]} 
                end={[-10, 2, 30]} 
                color="#a16207" 
                label="Wood Prunings" 
                details={{ volume: "250 T/Year", value: "Substrate", icon: Recycle }} 
                arcHeight={20}
             />

             {/* 4. ENERGY FLOW: Energy (P6) -> Pharma (P5) */}
             <FlowLine 
                start={[-30, 8, 30]} 
                end={[-35, 4, -20]} 
                color="#fbbf24" 
                label="Backup Power" 
                details={{ volume: "100% Off-Grid", value: "Crit. Uptime", icon: Zap }} 
                arcHeight={18}
             />

             {/* 5. INPUT FLOW: Orchard (P2) -> Cheese (P4) */}
             <FlowLine 
                start={[0, 4, -40]} 
                end={[35, 3, -25]} 
                color="#22c55e" 
                label="Macadamias" 
                details={{ volume: "145 T/Year", value: "@ R3/kg Cost", icon: Truck }} 
                arcHeight={10}
             />

             {/* 6. ECO SERVICE: Bees (P4) -> Orchard (P2) */}
             <FlowLine 
                start={[20, 2, -25]} 
                end={[5, 2, -40]} 
                color="#f472b6" 
                label="Pollination" 
                details={{ volume: "+40% Yield", value: "R 14.0M Val", icon: Wind }} 
                arcHeight={8}
             />

             {/* 7. REGENERATION: Energy (P6) -> Farm (P1) */}
             <FlowLine 
                start={[-30, 2, 30]} 
                end={[0, 2, 0]} 
                color="#334155" 
                label="Biochar" 
                details={{ volume: "3,000 T/Year", value: "Soil Health", icon: Sprout }} 
                arcHeight={15}
             />

             {/* 8. WATER: Hub (P1) -> Orchard (P2) */}
             <FlowLine 
                start={[-12, 2, 0]} 
                end={[0, 2, -40]} 
                color="#0ea5e9" 
                label="Water" 
                details={{ volume: "Irrigation", value: "Shared Res", icon: Droplets }} 
                arcHeight={8}
             />

        </group>
    )
}


const Scene = ({ selectedId, onSelect, projectId, viewMode, timelineYear }: { selectedId: string | null, onSelect: (id: string | null) => void, projectId: string, viewMode: 'layout' | 'evolution', timelineYear: number }) => {
    
    // --- MASTER SCENE ---
    if (projectId === 'master') {
        return <MasterScene onSelect={onSelect} />;
    }

    // --- PLAN 5 SCENE (Greenhouse) ---
    if (projectId === 'plan5') {
         return (
             <group onPointerMissed={() => onSelect(null)}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[50, 50, 25]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]}>
                    <orthographicCamera attach="shadow-camera" args={[-50, 50, -50, 50, 0.1, 200]} />
                </directionalLight>

                {/* Ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#f0fdf4" />
                </mesh>

                {/* Solar Array (Large flat area) */}
                 <Building 
                    id="solar"
                    position={[-20, 0, 0]} 
                    args={[20, 0.5, 40]} 
                    color="#1e293b" 
                    label="Solar Array"
                    subtext="4.5 MW"
                    onSelect={onSelect}
                    isSelected={selectedId === 'solar'} 
                />

                {/* Greenhouse (Transparent-ish) */}
                <Building 
                    id="greenhouse"
                    position={[10, 0, -10]} 
                    args={[30, 6, 20]} 
                    color="#a7f3d0" 
                    opacity={0.6}
                    label="Greenhouse"
                    subtext="10,240m²"
                    onSelect={onSelect}
                    isSelected={selectedId === 'greenhouse'} 
                />

                 {/* Processing Building */}
                <Building 
                    id="processing"
                    position={[10, 0, 15]} 
                    args={[20, 8, 15]} 
                    color="#f8fafc" 
                    label="Pharma Plant"
                    subtext="GMP Facility"
                    onSelect={onSelect}
                    isSelected={selectedId === 'processing'} 
                />

                {/* Water Tanks */}
                 <Tank id="water" position={[25, 0, 15]} height={6} radius={2} color="#38bdf8" onSelect={onSelect} isSelected={selectedId === 'water'} label="H2O" />

                {/* Indicator */}
                {selectedId && facilityDataPlan5[selectedId] && (
                    <SelectionIndicator targetPosition={
                        selectedId === 'solar' ? [-20, 0, 0] :
                        selectedId === 'greenhouse' ? [10, 0, -10] :
                        selectedId === 'processing' ? [10, 0, 15] :
                        [25, 0, 15]
                    } targetHeight={facilityDataPlan5[selectedId].height || 5} />
                )}
             </group>
         )
    }

    // --- PLAN 3B SCENE (Medicinal Mushrooms) ---
    if (projectId === 'plan3b') {
        return (
            <group onPointerMissed={() => onSelect(null)}>
               <ambientLight intensity={0.8} />
               <directionalLight position={[50, 50, 25]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]}>
                   <orthographicCamera attach="shadow-camera" args={[-50, 50, -50, 50, 0.1, 200]} />
               </directionalLight>

               <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                   <planeGeometry args={[100, 100]} />
                   <meshStandardMaterial color="#f3e8ff" />
               </mesh>

               {/* Substrate Building */}
               <Building 
                   id="substrate"
                   position={[-25, 0, 0]} 
                   args={[20, 6, 30]} 
                   color="#e2e8f0" 
                   label="Substrate Prep"
                   subtext="Sterilization"
                   onSelect={onSelect}
                   isSelected={selectedId === 'substrate'} 
               />

               {/* Containers (Grid of 4x4 = 16) */}
               <group position={[10, 0, 0]}>
                   <Instances range={16}>
                       <boxGeometry args={[4, 3, 12]} />
                       <meshStandardMaterial color="#d8b4fe" />
                       {Array.from({length: 4}).map((_, row) => (
                           Array.from({length: 4}).map((_, col) => (
                               <Instance 
                                   key={`${row}-${col}`} 
                                   position={[row * 6 - 10, 1.5, col * 14 - 20]} 
                                   onClick={(e) => { e.stopPropagation(); onSelect('containers'); }}
                                   color={selectedId === 'containers' ? '#10b981' : '#d8b4fe'}
                               />
                           ))
                       ))}
                   </Instances>
                   <LabelCard position={[0, 5, 0]} text="Smart Containers" subtext="16 Units" color="purple" />
               </group>

               {/* Processing/Cleanroom */}
               <Building 
                   id="lab"
                   position={[-20, 0, 25]} 
                   args={[20, 4, 15]} 
                   color="#ffffff" 
                   label="Cleanroom Lab"
                   subtext="ISO 5"
                   onSelect={onSelect}
                   isSelected={selectedId === 'lab'} 
               />
               
               <Building 
                   id="processing"
                   position={[-5, 0, 25]} 
                   args={[10, 5, 15]} 
                   color="#f5d0fe" 
                   label="Processing"
                   subtext="Encapsulation"
                   onSelect={onSelect}
                   isSelected={selectedId === 'processing'} 
               />

               {/* Solar */}
               <Building 
                   id="solar"
                   position={[30, 0, 0]} 
                   args={[10, 0.5, 40]} 
                   color="#1e293b" 
                   label="Solar"
                   subtext="50kW"
                   onSelect={onSelect}
                   isSelected={selectedId === 'solar'} 
               />

               {selectedId && facilityDataPlan3b[selectedId] && (
                   <SelectionIndicator targetPosition={
                       selectedId === 'substrate' ? [-25, 0, 0] :
                       selectedId === 'lab' ? [-20, 0, 25] :
                       selectedId === 'processing' ? [-5, 0, 25] :
                       selectedId === 'solar' ? [30, 0, 0] :
                       [10, 0, 0]
                   } targetHeight={facilityDataPlan3b[selectedId].height || 5} />
               )}
            </group>
        )
    }

    // --- PLAN 4 SCENE (Cheese & Bees) ---
    if (projectId === 'plan4') {
        return (
            <group onPointerMissed={() => onSelect(null)}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[50, 50, 25]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]}>
                    <orthographicCamera attach="shadow-camera" args={[-50, 50, -50, 50, 0.1, 200]} />
                </directionalLight>

                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#fefce8" />
                </mesh>

                {/* Main Creamery */}
                <Building 
                    id="factory"
                    position={[0, 0, 5]} 
                    args={[25, 6, 20]} 
                    color="#fef3c7" 
                    label="Creamery"
                    subtext="Processing"
                    onSelect={onSelect}
                    isSelected={selectedId === 'factory'} 
                />

                {/* Ageing Caves (Partially buried look) */}
                <Building 
                    id="cave"
                    position={[15, 0, -10]} 
                    args={[30, 4, 15]} 
                    color="#78716c" 
                    label="Ageing Caves"
                    subtext="Maturation"
                    onSelect={onSelect}
                    isSelected={selectedId === 'cave'} 
                />

                {/* Apiary (Bee Hives) */}
                <group position={[-20, 0, 0]}>
                     <Building 
                        id="apiary"
                        position={[0, 0, 0]} 
                        args={[10, 1, 30]} 
                        color="#f59e0b" 
                        label="Flow Hives"
                        subtext="Pollination"
                        onSelect={onSelect}
                        isSelected={selectedId === 'apiary'} 
                    />
                    {/* Small boxes for hives */}
                     <Instances range={20}>
                         <boxGeometry args={[1, 1, 1]} />
                         <meshStandardMaterial color="#d97706" />
                         {Array.from({length: 20}).map((_, i) => (
                             <Instance key={i} position={[Math.sin(i)*3, 1, (i*1.2)-10]} />
                         ))}
                     </Instances>
                </group>

                {/* Solar */}
                 <Building 
                    id="solar"
                    position={[15, 0, 15]} 
                    args={[20, 0.5, 10]} 
                    color="#1e293b" 
                    label="Solar"
                    subtext="300kW"
                    onSelect={onSelect}
                    isSelected={selectedId === 'solar'} 
                />

                {/* Biodigester */}
                <Tank id="biodigester" position={[-10, 0, -15]} height={5} radius={3} color="#713f12" onSelect={onSelect} isSelected={selectedId === 'biodigester'} label="Biogas" subtext="Waste-to-Energy" />

                {selectedId && facilityDataPlan4[selectedId] && (
                   <SelectionIndicator targetPosition={
                       selectedId === 'factory' ? [0, 0, 5] :
                       selectedId === 'cave' ? [15, 0, -10] :
                       selectedId === 'apiary' ? [-20, 0, 0] :
                       selectedId === 'solar' ? [15, 0, 15] :
                       [-10, 0, -15]
                   } targetHeight={facilityDataPlan4[selectedId].height || 5} />
               )}

            </group>
        )
    }

    // --- PLAN 3 SCENE (Meat Factory) ---
    if (projectId === 'plan3') {
        return (
            <group onPointerMissed={() => onSelect(null)}>
               <ambientLight intensity={0.8} />
               <directionalLight position={[50, 50, 25]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]}>
                   <orthographicCamera attach="shadow-camera" args={[-50, 50, -50, 50, 0.1, 200]} />
               </directionalLight>

               <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                   <planeGeometry args={[100, 100]} />
                   <meshStandardMaterial color="#f0fdf4" />
               </mesh>

               <Building 
                   id="production"
                   position={[0, 0, -10]} 
                   args={[30, 8, 20]} 
                   color="#e2e8f0" 
                   label="Production Hall"
                   subtext="Manufacturing"
                   onSelect={onSelect}
                   isSelected={selectedId === 'production'} 
               />

               <Building 
                   id="smokehouse"
                   position={[-20, 0, -5]} 
                   args={[10, 6, 10]} 
                   color="#b45309" 
                   label="Smokehouse"
                   subtext="Curing"
                   onSelect={onSelect}
                   isSelected={selectedId === 'smokehouse'} 
               />

               <Building 
                   id="retort"
                   position={[20, 0, -5]} 
                   args={[10, 7, 10]} 
                   color="#475569" 
                   label="Retort"
                   subtext="Sterilization"
                   onSelect={onSelect}
                   isSelected={selectedId === 'retort'} 
               />

                <Tank id="yeast" position={[-20, 0, 10]} height={9} radius={3} color="#fbbf24" onSelect={onSelect} isSelected={selectedId === 'yeast'} label="Yeast" subtext="Biotech" />
                <Tank id="yeast" position={[-12, 0, 10]} height={9} radius={3} color="#fbbf24" onSelect={onSelect} isSelected={selectedId === 'yeast'} />

               <Building 
                   id="logistics"
                   position={[10, 0, 15]} 
                   args={[25, 6, 15]} 
                   color="#94a3b8" 
                   label="Dispatch"
                   subtext="Warehousing"
                   onSelect={onSelect}
                   isSelected={selectedId === 'logistics'} 
               />

               {selectedId && facilityDataPlan3[selectedId] && (
                   <SelectionIndicator targetPosition={
                       selectedId === 'production' ? [0, 0, -10] :
                       selectedId === 'smokehouse' ? [-20, 0, -5] :
                       selectedId === 'retort' ? [20, 0, -5] :
                       selectedId === 'yeast' ? [-20, 0, 10] :
                       [10, 0, 15]
                   } targetHeight={facilityDataPlan3[selectedId].height || 5} />
               )}
            </group>
        )
    }

    // --- PLAN 1 SCENE (Farm) ---
    if (projectId === 'plan1') {
        return (
            <group onPointerMissed={() => onSelect(null)}>
               <ambientLight intensity={0.8} />
               <directionalLight position={[50, 50, 25]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]}>
                   <orthographicCamera attach="shadow-camera" args={[-50, 50, -50, 50, 0.1, 200]} />
               </directionalLight>

               <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                   <planeGeometry args={[100, 100]} />
                   <meshStandardMaterial color="#ecfccb" />
               </mesh>

               {/* Solar Array */}
               <Building 
                   id="solar"
                   position={[-25, 0, -25]} 
                   args={[30, 0.5, 20]} 
                   color="#1e293b" 
                   label="500kVA Solar"
                   subtext="Energy"
                   onSelect={onSelect}
                   isSelected={selectedId === 'solar'} 
               />

               {/* Packhouse */}
               <Building 
                   id="packhouse"
                   position={[0, 0, 0]} 
                   args={[20, 6, 30]} 
                   color="#f8fafc" 
                   label="Packhouse"
                   subtext="Processing"
                   onSelect={onSelect}
                   isSelected={selectedId === 'packhouse'} 
               />

               {/* Compost */}
               <group position={[25, 0, -10]}>
                    <Pile id="compost" position={[-3, 0, 0]} color="#78350f" onSelect={onSelect} isSelected={selectedId === 'compost'} />
                    <Pile id="compost" position={[3, 0, 0]} color="#78350f" onSelect={onSelect} isSelected={selectedId === 'compost'} />
                    <LabelCard position={[0, 4, 0]} text="Compost" subtext="Regeneration" color="amber" />
               </group>

               {/* Water */}
               <group position={[-20, 0, 15]}>
                    <Tank id="water" position={[0, 0, 0]} height={2} radius={5} color="#0ea5e9" onSelect={onSelect} isSelected={selectedId === 'water'} label="Water" subtext="Hub" />
               </group>

                {/* Fields */}
                <group position={[15, 0, 20]}>
                    <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.1, 0]}>
                        <planeGeometry args={[30, 20]} />
                        <meshStandardMaterial color="#16a34a" />
                    </mesh>
                    <Building 
                        id="cultivation"
                        position={[0, 0, 0]} 
                        args={[30, 0.2, 20]} 
                        color="#16a34a" 
                        opacity={0}
                        label="Fields"
                        subtext="Vegetables"
                        onSelect={onSelect}
                        isSelected={selectedId === 'cultivation'} 
                    />
                </group>


               {selectedId && facilityDataPlan1[selectedId] && (
                   <SelectionIndicator targetPosition={
                       selectedId === 'solar' ? [-25, 0, -25] :
                       selectedId === 'packhouse' ? [0, 0, 0] :
                       selectedId === 'compost' ? [25, 0, -10] :
                       selectedId === 'water' ? [-20, 0, 15] :
                       [15, 0, 20]
                   } targetHeight={facilityDataPlan1[selectedId].height || 5} />
               )}
            </group>
        )
    }

    // --- PLAN 2 SCENE (Agroforestry) ---
    if (projectId === 'plan2') {
        if (viewMode === 'evolution') {
            return <AgroforestryEvolutionScene year={timelineYear} />;
        }

        return (
            <group onPointerMissed={() => onSelect(null)}>
               <ambientLight intensity={0.8} />
               <directionalLight position={[50, 50, 25]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]}>
                   <orthographicCamera attach="shadow-camera" args={[-50, 50, -50, 50, 0.1, 200]} />
               </directionalLight>

               {/* Ground */}
               <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                   <planeGeometry args={[100, 100]} />
                   <meshStandardMaterial color="#f0fdf4" />
               </mesh>

                {/* Orchard Rows (Abstract representation) */}
                <group position={[-15, 0, -10]}>
                    <Building 
                       id="orchard"
                       position={[0, 0, 0]} 
                       args={[35, 4, 30]} 
                       color="#15803d" 
                       label="Macadamia Orchard"
                       subtext="Agroforestry"
                       onSelect={onSelect}
                       isSelected={selectedId === 'orchard'} 
                   />
                   {/* Trees details */}
                   <mesh position={[0, 2.1, 0]} rotation={[-Math.PI/2, 0, 0]}>
                       <planeGeometry args={[33, 28]} />
                       <meshStandardMaterial color="#22c55e" />
                   </mesh>
                </group>

                {/* Factory */}
                <Building 
                   id="factory"
                   position={[15, 0, 0]} 
                   args={[15, 7, 20]} 
                   color="#e2e8f0" 
                   label="Dairy Plant"
                   subtext="Processing"
                   onSelect={onSelect}
                   isSelected={selectedId === 'factory'} 
               />

               {/* Cold Store */}
               <Building 
                   id="coldstore"
                   position={[15, 0, 15]} 
                   args={[12, 6, 8]} 
                   color="#94a3b8" 
                   label="Cold Chain"
                   subtext="Logistics"
                   onSelect={onSelect}
                   isSelected={selectedId === 'coldstore'} 
               />

               {/* Water Tank */}
                <Tank id="water" position={[25, 0, -5]} height={5} radius={2} color="#38bdf8" onSelect={onSelect} isSelected={selectedId === 'water'} label="H2O" subtext="Utilities" />

                {/* Dry Warehouse */}
                <Building 
                   id="warehouse"
                   position={[25, 0, 5]} 
                   args={[8, 6, 10]} 
                   color="#cbd5e1" 
                   label="Warehouse"
                   subtext="Storage"
                   onSelect={onSelect}
                   isSelected={selectedId === 'warehouse'} 
               />

               {/* Indicator */}
               {selectedId && facilityDataPlan2[selectedId] && (
                   <SelectionIndicator targetPosition={
                       selectedId === 'orchard' ? [-15, 0, -10] :
                       selectedId === 'factory' ? [15, 0, 0] :
                       selectedId === 'coldstore' ? [15, 0, 15] :
                       selectedId === 'warehouse' ? [25, 0, 5] :
                       [25, 0, -5]
                   } targetHeight={facilityDataPlan2[selectedId].height || 5} />
               )}
            </group>
        )
   }

    // --- PLAN 6 SCENE (Bio-Energy) ---
    // Default to Plan 6 layout
    return (
        <group onPointerMissed={() => onSelect(null)}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[50, 50, 25]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]}>
                <orthographicCamera attach="shadow-camera" args={[-50, 50, -50, 50, 0.1, 200]} />
            </directionalLight>

            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#f0fdf4" />
            </mesh>
            
            {/* 1. Feedstock Area (Left) */}
            <group position={[-20, 0, 0]}>
                <Pile id="feedstock" position={[-2, 1.25, -2]} color="#d97706" onSelect={onSelect} isSelected={selectedId === 'feedstock'} />
                <Pile id="feedstock" position={[2, 1.25, 2]} color="#16a34a" onSelect={onSelect} isSelected={selectedId === 'feedstock'} />
                <LabelCard position={[0, 5, 0]} text="Feedstock" subtext="Inputs" color="amber" />
            </group>

            {/* 2. Pelletizing */}
            <Building 
                id="pelletizer"
                position={[-10, 0, -10]} 
                args={[8, 6, 10]} 
                color="#94a3b8" 
                label="Pelletisation"
                subtext="Processing"
                onSelect={onSelect}
                isSelected={selectedId === 'pelletizer'} 
            />

            {/* 3. Reactor */}
            <Building 
                id="reactor"
                position={[5, 0, 0]} 
                args={[15, 10, 20]} 
                color="#334155" 
                label="Reactor" 
                subtext="Pyrolysis"
                onSelect={onSelect}
                isSelected={selectedId === 'reactor'}
            />
            
            {/* 4. Refinery */}
            <Building 
                id="refinery"
                position={[5, 0, 12]} 
                args={[10, 8, 8]} 
                color="#475569" 
                label="Refinery" 
                subtext="Distillation"
                onSelect={onSelect}
                isSelected={selectedId === 'refinery'}
            />

            {/* 5. Storage */}
            <group position={[20, 0, 0]}>
                <Tank id="storage" position={[-4, 0, -5]} height={8} radius={2.5} color="#e2e8f0" onSelect={onSelect} isSelected={selectedId === 'storage'} />
                <Tank id="storage" position={[4, 0, -5]} height={8} radius={2.5} color="#e2e8f0" onSelect={onSelect} isSelected={selectedId === 'storage'} />
                <LabelCard position={[0, 10, 0]} text="Storage" subtext="Output" color="slate" />
            </group>

            <Building id="office" position={[18, 0, 15]} args={[8, 4, 6]} color="#f1f5f9" label="Office" subtext="Control" onSelect={onSelect} isSelected={selectedId === 'office'} />

             {/* Selection Indicator */}
            {selectedId && facilityDataPlan6[selectedId] && (
                <SelectionIndicator targetPosition={
                        selectedId === 'feedstock' ? [-20, 0, 0] :
                        selectedId === 'pelletizer' ? [-10, 0, -10] :
                        selectedId === 'reactor' ? [5, 0, 0] :
                        selectedId === 'refinery' ? [5, 0, 12] :
                        selectedId === 'storage' ? [20, 0, 0] :
                        [18, 0, 15]
                } targetHeight={facilityDataPlan6[selectedId].height || 5} />
            )}

        </group>
    );
};

const Facility3D: React.FC<Facility3DProps> = ({ projectId }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'layout' | 'evolution'>('layout');
    const [timelineYear, setTimelineYear] = useState(1);
    
    // Data lookup based on project
    let data: Record<string, FacilityObjectInfo> = facilityDataPlan6;
    if (projectId === 'plan5') data = facilityDataPlan5;
    if (projectId === 'plan3b') data = facilityDataPlan3b;
    if (projectId === 'plan4') data = facilityDataPlan4;
    if (projectId === 'plan2') data = facilityDataPlan2;
    if (projectId === 'plan3') data = facilityDataPlan3;
    if (projectId === 'plan1') data = facilityDataPlan1;
    // For master, we don't show the detail panel, just the overall view
    if (projectId === 'master') data = {};

    const activeItem = selectedId ? data[selectedId] : null;

    return (
        <div className="h-[600px] bg-slate-900 rounded-xl overflow-hidden relative animate-fade-in">
            {/* Overlay UI */}
            <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md p-4 rounded-lg border border-slate-700 max-w-xs">
                <h3 className="text-white font-bold flex items-center gap-2">
                    <Info className="w-4 h-4 text-emerald-400" />
                    {projectId === 'master' ? 'Master Cluster Visualization' : (projectId === 'plan2' && viewMode === 'evolution' ? 'Planting System Evolution' : 'Facility Explorer')}
                </h3>
                <p className="text-slate-300 text-xs mt-1">
                    {projectId === 'master'
                        ? 'A realtime digital twin of the entire Ubuntu Restoration Farms ecosystem. Hover over the coloured flow lines to view the specific circular economy loops connecting the facilities.'
                        : (projectId === 'plan2' && viewMode === 'evolution' 
                        ? 'Visualize the 7-year timeline of tree growth and soybean intercropping dynamics.'
                        : 'Click on highlighted facility components to view technical specifications.')
                    }
                </p>
                
                {/* Plan 2 Specific Controls */}
                {projectId === 'plan2' && (
                    <div className="mt-4 space-y-3">
                        <div className="flex bg-slate-800 p-1 rounded-lg">
                            <button 
                                onClick={() => setViewMode('layout')}
                                className={`flex-1 py-1 px-2 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1 ${viewMode === 'layout' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                            >
                                <Factory className="w-3 h-3" /> Layout
                            </button>
                            <button 
                                onClick={() => setViewMode('evolution')}
                                className={`flex-1 py-1 px-2 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1 ${viewMode === 'evolution' ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/50 animate-pulse' : 'text-slate-400 hover:text-white'}`}
                            >
                                <Sprout className="w-3 h-3" /> Growth
                            </button>
                        </div>

                        {viewMode === 'evolution' && (
                            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                                <div className="flex justify-between items-center mb-2 text-xs text-white font-bold">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-emerald-400" /> Timeline</span>
                                    <span>Year {timelineYear}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="1" 
                                    max="7" 
                                    step="1" 
                                    value={timelineYear} 
                                    onChange={(e) => setTimelineYear(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-slate-400">
                                    <span>Establishment</span>
                                    <span>Production</span>
                                    <span>Maturity</span>
                                </div>
                                <div className="mt-3 pt-3 border-t border-slate-700 grid grid-cols-2 gap-2">
                                    <div className="text-center">
                                        <div className="text-[10px] text-slate-400">Soy Density</div>
                                        <div className={`text-xs font-bold ${timelineYear <= 3 ? 'text-green-400' : (timelineYear <= 5 ? 'text-yellow-400' : 'text-red-400')}`}>
                                            {timelineYear <= 3 ? '100%' : (timelineYear <= 5 ? '40%' : '0%')}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[10px] text-slate-400">Tree Yield</div>
                                        <div className="text-xs font-bold text-emerald-400">
                                            {timelineYear < 4 ? '0%' : (timelineYear < 6 ? '35%' : '100%')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                 {/* Master View Legend */}
                {projectId === 'master' && (
                    <div className="mt-4 space-y-2 text-[10px]">
                         <div className="flex items-center gap-2">
                             <div className="w-8 h-0.5 bg-yellow-400 border border-yellow-400"></div>
                             <span className="text-slate-300">Energy Flow</span>
                         </div>
                         <div className="flex items-center gap-2">
                             <div className="w-8 h-0.5 bg-green-600 border border-green-600"></div>
                             <span className="text-slate-300">Feedstock/Supply</span>
                         </div>
                         <div className="flex items-center gap-2">
                             <div className="w-8 h-0.5 bg-amber-700 border border-amber-700"></div>
                             <span className="text-slate-300">Biomass/Waste Loop</span>
                         </div>
                         <div className="flex items-center gap-2">
                             <div className="w-8 h-0.5 bg-slate-600 border border-slate-600"></div>
                             <span className="text-slate-300">Regeneration Loop</span>
                         </div>
                    </div>
                )}
            </div>

            {/* Selected Item Detail Panel (Only in Layout Mode and NOT Master) */}
            {activeItem && viewMode === 'layout' && projectId !== 'master' && (
                <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-10 bg-white/95 backdrop-blur shadow-xl rounded-lg p-4 border border-slate-200 animate-slide-up">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                             <span className="text-xs font-bold uppercase text-emerald-600">{activeItem.type}</span>
                             <h4 className="text-lg font-bold text-slate-900">{activeItem.name}</h4>
                        </div>
                        <button onClick={() => setSelectedId(null)} className="text-slate-400 hover:text-slate-600">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{activeItem.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                        <div>
                            <span className="text-xs text-slate-400 block">Capacity/Spec</span>
                            <span className="text-sm font-bold text-slate-800">{activeItem.capacity}</span>
                        </div>
                        <div className="flex items-end">
                            <div className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-medium flex items-center gap-1">
                                <Activity className="w-3 h-3" /> Live
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Canvas shadows camera={{ position: projectId === 'master' ? [40, 25, 40] : [40, 40, 40], fov: 45 }}>
                <color attach="background" args={['#f0f9ff']} />
                <fog attach="fog" args={['#f0f9ff', 60, 150]} />
                
                {/* Controls */}
                <OrbitControls 
                    makeDefault 
                    autoRotate={false}
                    autoRotateSpeed={0.5}
                    minPolarAngle={0} 
                    maxPolarAngle={Math.PI / 2.2}
                    maxDistance={projectId === 'master' ? 180 : 100}
                    minDistance={20}
                />

                {/* Soft Shadows */}
                <SoftShadows size={25} focus={0} samples={10} />

                {/* The Scene Content */}
                <Scene 
                    selectedId={selectedId} 
                    onSelect={setSelectedId} 
                    projectId={projectId} 
                    viewMode={viewMode} 
                    timelineYear={timelineYear} 
                />
                
                {/* Grid Helper */}
                <gridHelper args={[200, 40, '#cbd5e1', '#e2e8f0']} position={[0, 0, 0]} />
            </Canvas>
        </div>
    );
};

export default Facility3D;
