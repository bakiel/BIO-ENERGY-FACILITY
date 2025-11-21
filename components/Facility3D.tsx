
import React, { useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Instance, 
  Instances, 
  Environment, 
  Html, 
  useCursor, 
  Cloud, 
  Stars,
  QuadraticBezierLine,
  Sparkles
} from '@react-three/drei';
import * as THREE from 'three';
import { projects } from '../data/projects';
import { X } from 'lucide-react';

interface Facility3DProps {
    projectId: string;
}

interface FacilityProps {
    selected: boolean;
    onSelect: () => void;
}

// --- CONSTANTS & GRID MATH ---
const ZONE_SPACING = 120; // Spacing between zones
const SPEED_FACTOR = 0.1; // Very slow, cinematic animation
const Y_GROUND = -2.0;    // Ground level lowered to prevent z-fighting
const Y_PLATE = 0.6;      // Raised base plates to ensure separation
const Y_MARKING = 1.2;    // Markings/Geometry sitting well above plates

// --- 1. UTILITY COMPONENTS ---

// Info Card Overlay
const InfoCard = ({ id, onClose }: { id: string, onClose: () => void }) => {
    const project = projects.find(p => p.id === id);
    if (!project) return null;

    return (
        <Html position={[0, 40, 0]} center zIndexRange={[100, 0]} distanceFactor={120}>
            <div 
                className="w-64 bg-slate-900/95 text-white p-4 rounded-xl border border-slate-600 shadow-2xl backdrop-blur-md flex flex-col gap-2 cursor-default text-left animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${project.color.replace('bg-', 'bg-')}`}></div>
                        <span className="text-[10px] font-bold uppercase text-slate-400">{project.type}</span>
                    </div>
                    <button 
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="text-slate-400 hover:text-white transition-colors rounded-full p-1 hover:bg-slate-800"
                    >
                        <X size={14} />
                    </button>
                </div>
                <h3 className="text-lg font-bold leading-tight">{project.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{project.shortDesc}</p>
                
                <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-800">
                    <div>
                        <span className="text-[9px] uppercase font-bold text-slate-500">Investment</span>
                        <div className="text-sm font-bold text-emerald-400">{project.investment}</div>
                    </div>
                     <div>
                        <span className="text-[9px] uppercase font-bold text-slate-500">Jobs</span>
                        <div className="text-sm font-bold text-blue-400">{project.jobs}</div>
                    </div>
                </div>
            </div>
            <div className="w-px h-8 bg-slate-600 mx-auto"></div>
            <div className="w-2 h-2 bg-white rounded-full mx-auto"></div>
        </Html>
    );
}

// A visual base plate for each facility to demarcate space
const ZonePlate = ({ size = [80, 80], color = "#1e293b" }) => (
    <group position={[0, Y_PLATE, 0]}>
        {/* Base Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[size[0], size[1]]} />
            <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
        {/* Blueprint Grid Border - Raised slightly relative to plate to prevent z-fighting */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
            <ringGeometry args={[size[0]/2 - 1, size[0]/2, 4]} />
            <meshBasicMaterial color="#ffffff" opacity={0.15} transparent />
        </mesh>
        {/* Corner Markers */}
        <group>
             {[-1, 1].map(x => [-1, 1].map(z => (
                 <mesh key={`${x}-${z}`} position={[x * (size[0]/2), 0.5, z * (size[1]/2)]}>
                     <boxGeometry args={[2, 1, 2]} />
                     <meshStandardMaterial color="#475569" />
                 </mesh>
             )))}
        </group>
    </group>
);

// Animated Flow Line (Slowed Down)
const ResourceFlow = ({ start, end, color, label, speed = 1 }: { start: [number, number, number], end: [number, number, number], color: string, label?: string, speed?: number }) => {
    const [pct, setPct] = useState(0);
    const curve = useMemo(() => {
        const midX = (start[0] + end[0]) / 2;
        const midZ = (start[2] + end[2]) / 2;
        const height = 40; // Higher arc
        return new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(...start),
            new THREE.Vector3(midX, height, midZ),
            new THREE.Vector3(...end)
        );
    }, [start, end]);

    useFrame((state, delta) => {
        setPct((p) => (p + delta * 0.1 * speed * SPEED_FACTOR) % 1);
    });

    const point = curve.getPoint(pct);

    return (
        <group>
            <QuadraticBezierLine 
                start={start} 
                end={end} 
                mid={[(start[0] + end[0]) / 2, 40, (start[2] + end[2]) / 2]} 
                color={color} 
                lineWidth={2} 
                dashed 
                dashScale={2} 
                gapSize={2}
                opacity={0.3} 
                transparent 
            />
            <mesh position={point}>
                <sphereGeometry args={[1, 8, 8]} />
                <meshBasicMaterial color={color} toneMapped={false} />
                <pointLight color={color} intensity={2} distance={20} />
            </mesh>
            {label && pct > 0.4 && pct < 0.6 && (
                <Html position={point} center distanceFactor={150} zIndexRange={[100, 0]}>
                     <div className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/80 backdrop-blur px-2 py-1 rounded border border-white/10 whitespace-nowrap shadow-xl" style={{ borderLeft: `2px solid ${color}` }}>
                        {label}
                     </div>
                </Html>
            )}
        </group>
    );
};

// --- 2. FACILITY COMPONENTS (Strict Grid Alignment) ---

// Plan 1: Center (0,0)
const FacilityPlan1 = ({ selected, onSelect }: FacilityProps) => (
    <group position={[0, 0, 0]} onClick={(e) => { e.stopPropagation(); onSelect(); }} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
        <ZonePlate size={[90, 90]} color="#064e3b" /> 
        
        {/* Central Hub */}
        <mesh position={[0, 4, 0]} castShadow>
             <boxGeometry args={[16, 8, 12]} />
             <meshStandardMaterial color="#f1f5f9" />
        </mesh>
        
        {/* Pivots - Static geometry, rotating subtle indicator */}
        <PivotSystem position={[-30, 0, -30]} radius={15} active delay={0} />
        <PivotSystem position={[30, 0, 30]} radius={15} active delay={2} />
        <PivotSystem position={[-30, 0, 30]} radius={15} active delay={1} />
        <PivotSystem position={[30, 0, -30]} radius={15} active delay={3} />

        {!selected && <LabelTag label="Plan 1: Core Farm" sub="445 Ha Center" color="#10b981" position={[0, 18, 0]} />}
        {selected && <InfoCard id="plan1" onClose={onSelect} />}
    </group>
);

// Plan 2: Left (-ZONE_SPACING, 0)
const FacilityPlan2 = ({ selected, onSelect }: FacilityProps) => (
    <group position={[-ZONE_SPACING, 0, 0]} onClick={(e) => { e.stopPropagation(); onSelect(); }} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
        <ZonePlate size={[80, 100]} color="#14532d" />
        
        {/* Dairy Building */}
        <mesh position={[-15, 4, 30]} castShadow>
            <boxGeometry args={[20, 8, 12]} />
            <meshStandardMaterial color="#78716c" roughness={0.9} />
        </mesh>
        
        {/* Tree Rows */}
        <TreeRows position={[10, 0, -10]} rows={6} length={70} spacing={10} />
        
        {!selected && <LabelTag label="Plan 2: Agroforestry" sub="Macs & Dairy" color="#16a34a" position={[0, 20, 0]} />}
        {selected && <InfoCard id="plan2" onClose={onSelect} />}
    </group>
);

// Plan 1A: Front Left (-ZONE_SPACING, ZONE_SPACING)
const FacilityPlan1A = ({ selected, onSelect }: FacilityProps) => (
    <group position={[-ZONE_SPACING, 0, ZONE_SPACING]} onClick={(e) => { e.stopPropagation(); onSelect(); }} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
        <ZonePlate size={[80, 80]} color="#713f12" />
        
        {/* Soybean Fields */}
        <group position={[0, Y_MARKING, 0]}>
            <mesh rotation={[-Math.PI/2, 0, 0]} receiveShadow>
                <planeGeometry args={[70, 70]} />
                <meshStandardMaterial color="#ca8a04" roughness={1} />
            </mesh>
            <gridHelper args={[70, 14, 0x422006, 0x422006]} position={[0, 0.1, 0]} />
        </group>

        {!selected && <LabelTag label="Plan 1A: Soy" sub="200 Ha Feedstock" color="#facc15" position={[0, 10, 0]} />}
        {selected && <InfoCard id="plan1" onClose={onSelect} />}
    </group>
);

// Plan 3: Right (ZONE_SPACING, 0)
const FacilityPlan3 = ({ selected, onSelect }: FacilityProps) => (
    <group position={[ZONE_SPACING, 0, 0]} onClick={(e) => { e.stopPropagation(); onSelect(); }} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
        <ZonePlate size={[80, 80]} color="#1e293b" />
        
        {/* Factory */}
        <mesh position={[0, 6, 0]} castShadow>
            <boxGeometry args={[30, 12, 50]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.5} />
        </mesh>
        {/* Glass Front */}
        <mesh position={[0, 6, 25.1]}>
            <planeGeometry args={[24, 8]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.1} />
        </mesh>
        
        {!selected && <LabelTag label="Plan 3: Meat Factory" sub="Export Hub" color="#f59e0b" position={[0, 22, 0]} />}
        {selected && <InfoCard id="plan3" onClose={onSelect} />}
    </group>
);

// Plan 6: Front Right (ZONE_SPACING, ZONE_SPACING)
const FacilityPlan6 = ({ selected, onSelect }: FacilityProps) => (
    <group position={[ZONE_SPACING, 0, ZONE_SPACING]} onClick={(e) => { e.stopPropagation(); onSelect(); }} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
        <ZonePlate size={[80, 80]} color="#334155" />
        
        {/* Refinery Tanks */}
        <group position={[-15, 0, -15]}>
             <mesh position={[0, 8, 0]} castShadow>
                <cylinderGeometry args={[8, 8, 16, 32]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.7} />
            </mesh>
            <mesh position={[20, 8, 0]} castShadow>
                <cylinderGeometry args={[8, 8, 16, 32]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.7} />
            </mesh>
        </group>
        
        {/* Steam */}
        <Cloud position={[20, 20, -20]} opacity={0.3} speed={0.1} width={10} segments={4} color="#ffffff" />

        {!selected && <LabelTag label="Plan 6: Refinery" sub="Bio-Energy" color="#ef4444" position={[0, 25, 0]} />}
        {selected && <InfoCard id="plan6" onClose={onSelect} />}
    </group>
);

// Plan 3B: Back Right (ZONE_SPACING, -ZONE_SPACING)
const FacilityPlan3B = ({ selected, onSelect }: FacilityProps) => (
    <group position={[ZONE_SPACING, 0, -ZONE_SPACING]} onClick={(e) => { e.stopPropagation(); onSelect(); }} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
        <ZonePlate size={[70, 70]} color="#312e81" />
        
        {/* Domes */}
        <mesh position={[-12, 4, 0]} castShadow>
            <icosahedronGeometry args={[8, 1]} />
            <meshStandardMaterial color="#e0e7ff" flatShading opacity={0.9} transparent />
            <pointLight color="#a855f7" intensity={3} distance={15} />
        </mesh>
        <mesh position={[12, 4, 12]} castShadow>
            <icosahedronGeometry args={[6, 1]} />
            <meshStandardMaterial color="#e0e7ff" flatShading opacity={0.9} transparent />
        </mesh>

        {!selected && <LabelTag label="Plan 3B: Mushrooms" sub="Biotech Domes" color="#9333ea" position={[0, 15, 0]} />}
        {selected && <InfoCard id="plan3b" onClose={onSelect} />}
    </group>
);

// Plan 4: Far Back Center (0, -ZONE_SPACING)
const FacilityPlan4 = ({ selected, onSelect }: FacilityProps) => (
    <group position={[0, 0, -ZONE_SPACING]} onClick={(e) => { e.stopPropagation(); onSelect(); }} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
        <ZonePlate size={[60, 60]} color="#451a03" />
        
        {/* Hill/Cave */}
        <mesh position={[0, 0, 0]} scale={[1, 0.5, 1]} castShadow>
            <sphereGeometry args={[25, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial color="#57534e" />
        </mesh>
        {/* Entrance */}
        <mesh position={[0, 3, 20]}>
            <boxGeometry args={[10, 8, 12]} />
            <meshStandardMaterial color="#1c1917" />
        </mesh>

        {!selected && <LabelTag label="Plan 4: Cheese Caves" sub="Natural Aging" color="#eab308" position={[0, 18, 0]} />}
        {selected && <InfoCard id="plan4" onClose={onSelect} />}
    </group>
);

// Plan 5: Back Left (-ZONE_SPACING, -ZONE_SPACING)
const FacilityPlan5 = ({ selected, onSelect }: FacilityProps) => (
    <group position={[-ZONE_SPACING, 0, -ZONE_SPACING]} onClick={(e) => { e.stopPropagation(); onSelect(); }} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
        <ZonePlate size={[90, 90]} color="#0e7490" /> {/* Cyan-700 */}

        {/* Solar Rows */}
        <group position={[0, 2, 0]}>
            {[-20, -5, 10, 25].map((z, i) => (
                <mesh key={i} position={[0, 0, z]} rotation={[-Math.PI / 6, 0, 0]} castShadow>
                    <boxGeometry args={[60, 0.5, 10]} />
                    <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.9} />
                </mesh>
            ))}
        </group>

        {/* Greenhouse / Tech Building */}
        <group position={[25, 4, -20]}>
             <mesh castShadow>
                 <boxGeometry args={[15, 6, 20]} />
                 <meshStandardMaterial color="#e2e8f0" transparent opacity={0.7} />
             </mesh>
             {/* Internal glow */}
             <pointLight color="#06b6d4" intensity={2} distance={15} />
        </group>

        {!selected && <LabelTag label="Plan 5: Estate Solar" sub="4.9MW Microgrid" color="#06b6d4" position={[0, 15, 0]} />}
        {selected && <InfoCard id="plan5" onClose={onSelect} />}
    </group>
);

// --- 3. ANIMATED ELEMENTS ---

const PivotSystem = ({ position, radius = 12, active = true, delay = 0 }: any) => {
    const ref = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (ref.current && active) ref.current.rotation.y += delta * 0.2 * SPEED_FACTOR;
    });

    return (
        <group position={position}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, Y_MARKING, 0]}>
                <circleGeometry args={[radius, 32]} />
                <meshStandardMaterial color="#15803d" />
            </mesh>
            <group ref={ref} rotation={[0, delay, 0]} position={[0, Y_MARKING + 0.5, 0]}>
                <mesh position={[radius/2, 0.5, 0]}>
                    <boxGeometry args={[radius, 0.2, 0.2]} />
                    <meshStandardMaterial color="#cbd5e1" />
                </mesh>
                {active && (
                     <Sparkles position={[radius/2, 0, 0]} scale={[radius, 1, 1]} count={5} speed={0.2} color="#a5f3fc" />
                )}
            </group>
        </group>
    );
};

const TreeRows = ({ position, rows = 5, length = 40, spacing = 8 }: any) => {
    const treeData = useMemo(() => {
        const data = [];
        for (let r = 0; r < rows; r++) {
            for (let z = 0; z < length; z+=8) { 
                const x = (r * spacing) - ((rows * spacing) / 2);
                const zPos = z - (length / 2);
                data.push({ position: [x, 0, zPos], scale: 0.8 + Math.random() * 0.4 });
            }
        }
        return data;
    }, [rows, length, spacing]);

    return (
        <group position={position}>
            <Instances range={500}>
                <cylinderGeometry args={[0.4, 0.6, 2]} />
                <meshStandardMaterial color="#3f2c22" />
                {treeData.map((data, i) => (
                    <Instance key={`trunk-${i}`} position={[data.position[0], 1, data.position[2]] as any} />
                ))}
            </Instances>
            <Instances range={500}>
                <dodecahedronGeometry args={[2.5, 0]} />
                <meshStandardMaterial color="#15803d" />
                {treeData.map((data, i) => (
                    <Instance key={`canopy-${i}`} position={[data.position[0], 3, data.position[2]] as any} scale={data.scale} />
                ))}
            </Instances>
        </group>
    );
};

const LabelTag = ({ label, sub, color, position }: any) => {
    const [hovered, setHover] = useState(false);
    useCursor(hovered);
    return (
        <Html position={position} center distanceFactor={150} zIndexRange={[50, 0]}>
            <div 
                onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)}
                className={`flex flex-col items-center transition-transform duration-300 pointer-events-none ${hovered ? 'scale-110 z-50' : 'scale-100 opacity-80'}`}
            >
                <div className="bg-slate-900/90 text-white px-3 py-1.5 rounded-lg border border-slate-700 shadow-xl backdrop-blur-md flex flex-col items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: color }}></div>
                        <span className="font-bold text-xs whitespace-nowrap">{label}</span>
                    </div>
                    {hovered && <span className="text-[8px] uppercase text-slate-400 mt-1">{sub}</span>}
                </div>
                <div className="w-px h-8 bg-gradient-to-b from-slate-700 to-transparent"></div>
            </div>
        </Html>
    )
}

// --- 4. MASTER SCENE ASSEMBLY ---

const MasterScene = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const handleSelect = (id: string) => setSelectedId(prev => prev === id ? null : id);

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-100, 150, 100]} intensity={1.5} castShadow shadow-bias={-0.0005} />
            <Environment preset="sunset" blur={0.8} background />
            <Stars radius={300} depth={50} count={3000} factor={4} saturation={0} fade />

            {/* GROUND GRID - Lowered to prevent z-fighting */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, Y_GROUND, 0]} receiveShadow onClick={() => setSelectedId(null)}>
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial color="#0f172a" roughness={0.9} />
            </mesh>
            <gridHelper args={[1000, 50, 0x334155, 0x1e293b]} position={[0, Y_GROUND + 0.1, 0]} />

            {/* FACILITIES */}
            <FacilityPlan1 selected={selectedId === 'plan1'} onSelect={() => handleSelect('plan1')} />
            <FacilityPlan2 selected={selectedId === 'plan2'} onSelect={() => handleSelect('plan2')} />
            <FacilityPlan1A selected={selectedId === 'plan1a'} onSelect={() => handleSelect('plan1a')} />
            <FacilityPlan3 selected={selectedId === 'plan3'} onSelect={() => handleSelect('plan3')} />
            <FacilityPlan6 selected={selectedId === 'plan6'} onSelect={() => handleSelect('plan6')} />
            <FacilityPlan3B selected={selectedId === 'plan3b'} onSelect={() => handleSelect('plan3b')} />
            <FacilityPlan4 selected={selectedId === 'plan4'} onSelect={() => handleSelect('plan4')} />
            <FacilityPlan5 selected={selectedId === 'plan5'} onSelect={() => handleSelect('plan5')} />

            {/* FLOW LINES - Reduced opacity for less distraction */}
            {/* Soy (1A) -> Factory (3) */}
            <ResourceFlow start={[-ZONE_SPACING, 5, ZONE_SPACING]} end={[ZONE_SPACING, 10, 0]} color="#facc15" label="Soy Feedstock" />
            
            {/* Refinery (6) -> All */}
            <ResourceFlow start={[ZONE_SPACING, 10, ZONE_SPACING]} end={[0, 5, 0]} color="#06b6d4" label="Fuel" speed={0.8} />
            <ResourceFlow start={[ZONE_SPACING, 10, ZONE_SPACING]} end={[-ZONE_SPACING, 5, 0]} color="#06b6d4" />
            
            {/* Waste (2) -> Mushrooms (3B) */}
            <ResourceFlow start={[-ZONE_SPACING, 5, 0]} end={[ZONE_SPACING, 5, -ZONE_SPACING]} color="#854d0e" label="Biomass" speed={0.5} />

            {/* Solar (5) -> Grid */}
            <ResourceFlow start={[-ZONE_SPACING, 10, -ZONE_SPACING]} end={[0, 15, 0]} color="#f59e0b" label="Solar Power" speed={1.5} />
        </>
    );
}

const Facility3D: React.FC<Facility3DProps> = ({ projectId }) => {
    return (
        <div className="w-full h-[600px] bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800 relative group">
            
            <div className="absolute top-0 left-0 w-full p-6 z-10 bg-gradient-to-b from-slate-950/90 to-transparent pointer-events-none">
                <h3 className="text-white font-bold text-2xl drop-shadow-md flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    Estate Digital Twin
                </h3>
                <p className="text-emerald-400/80 text-xs font-bold tracking-[0.2em] mt-1 ml-6 uppercase">
                    Spatial Blueprint • Click to Inspect
                </p>
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2 pointer-events-none">
                 <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded backdrop-blur border border-white/10">
                     <div className="w-4 h-0.5 bg-yellow-400"></div><span className="text-[10px] text-white font-bold uppercase">Feedstock</span>
                 </div>
                 <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded backdrop-blur border border-white/10">
                     <div className="w-4 h-0.5 bg-cyan-400"></div><span className="text-[10px] text-white font-bold uppercase">Energy</span>
                 </div>
            </div>

            <Canvas shadows camera={{ position: [-180, 150, 180], fov: 35 }}>
                <MasterScene />
                <OrbitControls 
                    enablePan={true}
                    enableZoom={true}
                    maxPolarAngle={Math.PI / 2.2} // Don't go below ground
                    maxDistance={400}
                    minDistance={50}
                    autoRotate={true}
                    autoRotateSpeed={0.3} // Gentle rotation
                />
            </Canvas>

            <div className="absolute bottom-6 right-6 pointer-events-none opacity-50">
                 <div className="text-white text-[10px] font-bold uppercase tracking-widest">
                    Interactive 3D Model
                 </div>
            </div>
        </div>
    );
};

export default Facility3D;
