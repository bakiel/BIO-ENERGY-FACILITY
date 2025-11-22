
import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  Text,
  Float
} from '@react-three/drei';
import * as THREE from 'three';
import { Clock } from 'lucide-react';

interface Facility3DProps {
    projectId: string;
}

// --- CONSTANTS ---
const ZONE_SPACING = 120; 

// --- UI COMPONENTS ---

const Label3D = ({ text, position, color = "white", size = 10, rotation = [-Math.PI / 2, 0, 0] }: { text: string, position: [number, number, number], color?: string, size?: number, rotation?: [number, number, number] }) => (
    <Text
        position={position}
        rotation={rotation}
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
    >
        {text.toUpperCase()}
    </Text>
);

// --- PLAN 6 ASSETS (BIO-ENERGY FACILITY) ---

const Plan6Scene = () => {
    const FeedstockZone = () => (
        <group position={[-60, 0, 0]}>
            {[...Array(5)].map((_, i) => (
                <mesh key={i} position={[i * 10 - 20, 1.5, (i % 2) * 8 - 4]} castShadow>
                    <coneGeometry args={[4, 3, 8]} />
                    <meshStandardMaterial color="#854d0e" roughness={1} />
                </mesh>
            ))}
            <mesh position={[0, 4, -20]} castShadow receiveShadow>
                <boxGeometry args={[30, 8, 15]} />
                <meshStandardMaterial color="#475569" />
            </mesh>
            <mesh position={[25, 2, -20]} rotation={[0, 0, -0.1]}>
                <boxGeometry args={[20, 1, 2]} />
                <meshStandardMaterial color="#334155" />
            </mesh>
            <Label3D text="Feedstock Intake" position={[0, 8, 10]} size={4} color="#fbbf24" />
        </group>
    );

    const ReactorZone = () => (
        <group position={[0, 0, 0]}>
            <mesh position={[0, 6, -20]} castShadow receiveShadow>
                <boxGeometry args={[40, 12, 25]} />
                <meshStandardMaterial color="#f1f5f9" metalness={0.2} roughness={0.5} />
            </mesh>
            <group position={[0, 4, 0]}>
                <mesh rotation={[0, 0, Math.PI/2]} position={[0, 2, 0]}>
                    <cylinderGeometry args={[2, 2, 20]} />
                    <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                </mesh>
                {[-8, 0, 8].map((x, i) => (
                    <mesh key={i} position={[x, -2, 0]}>
                        <boxGeometry args={[1, 4, 4]} />
                        <meshStandardMaterial color="#334155" />
                    </mesh>
                ))}
            </group>
            <QuadraticBezierLine start={[0, 6, 0]} end={[20, 8, 20]} mid={[10, 12, 5]} color="#ef4444" lineWidth={1.5} />
            <Label3D text="Continuous Pyrolysis" position={[0, 14, 0]} size={4} color="#ef4444" />
        </group>
    );

    const RefineryZone = () => (
        <group position={[50, 0, 0]}>
            <group position={[0, 0, 0]}>
                <mesh position={[0, 12, 0]} castShadow>
                    <cylinderGeometry args={[1.5, 1.5, 24]} />
                    <meshStandardMaterial color="#cbd5e1" metalness={0.6} roughness={0.2} />
                </mesh>
                <mesh position={[0, 12, 0]}>
                    <cylinderGeometry args={[2.5, 2.5, 20, 4, 4, true]} />
                    <meshStandardMaterial color="#64748b" wireframe />
                </mesh>
            </group>
            <mesh position={[15, 4, 0]} castShadow receiveShadow>
                <boxGeometry args={[20, 8, 20]} />
                <meshStandardMaterial color="#e2e8f0" />
            </mesh>
            <Label3D text="Refinery (SANS 1935)" position={[0, 26, 0]} size={4} color="#38bdf8" />
        </group>
    );

    const StorageZone = () => (
        <group position={[20, 0, 50]}>
            {[...Array(3)].map((_, i) => (
                <mesh key={i} position={[i * 15 - 15, 6, 0]} castShadow>
                    <cylinderGeometry args={[6, 6, 12, 32]} />
                    <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.2} />
                    <mesh position={[0, 0, 0]}>
                        <cylinderGeometry args={[6.05, 6.05, 2, 32]} />
                        <meshBasicMaterial color="#10b981" />
                    </mesh>
                </mesh>
            ))}
            <group position={[0, 0, 20]}>
                <mesh position={[0, 6, 0]}>
                    <boxGeometry args={[30, 1, 8]} />
                    <meshStandardMaterial color="#475569" />
                </mesh>
                {[-12, 12].map((x, i) => (
                    <mesh key={i} position={[x, 3, 0]}>
                        <boxGeometry args={[1, 6, 1]} />
                        <meshStandardMaterial color="#475569" />
                    </mesh>
                ))}
                <group position={[0, 1.5, 0]} rotation={[0, Math.PI/2, 0]}>
                     <mesh position={[0, 1.5, 0]} castShadow><boxGeometry args={[3, 3, 10]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
                     <mesh position={[0, 1, 6.5]}><boxGeometry args={[3, 2, 2]} /><meshStandardMaterial color="#10b981" /></mesh>
                </group>
            </group>
            <Label3D text="3.45M Litre Capacity" position={[0, 14, 0]} size={4} color="#10b981" />
        </group>
    );

    const BiocharZone = () => (
        <group position={[-40, 0, 40]}>
            <mesh position={[0, 3, 0]} castShadow receiveShadow>
                <boxGeometry args={[20, 6, 15]} />
                <meshStandardMaterial color="#334155" />
            </mesh>
            {[...Array(4)].map((_, i) => (
                <mesh key={i} position={[i * 4 - 6, 1, 10]}>
                    <boxGeometry args={[3, 2, 3]} />
                    <meshStandardMaterial color="#111827" />
                </mesh>
            ))}
            <Label3D text="Biochar (3000T)" position={[0, 8, 0]} size={3} color="#94a3b8" />
        </group>
    );

    return (
        <group>
            <ambientLight intensity={0.4} />
            <directionalLight position={[-50, 100, 50]} intensity={1.8} castShadow shadow-mapSize={[2048, 2048]} />
            <Environment preset="night" blur={0.6} background />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[250, 250]} />
                <meshStandardMaterial color="#0f172a" />
            </mesh>
            <gridHelper args={[250, 50, 0x1e293b, 0x020617]} position={[0, 0, 0]} />
            <FeedstockZone />
            <ReactorZone />
            <RefineryZone />
            <StorageZone />
            <BiocharZone />
            <QuadraticBezierLine start={[-40, 4, -20]} end={[-10, 6, -20]} mid={[-25, 8, -20]} color="#854d0e" lineWidth={2} dashed dashScale={2} />
            <QuadraticBezierLine start={[10, 6, -20]} end={[40, 10, 0]} mid={[25, 12, -10]} color="#38bdf8" lineWidth={3} />
            <QuadraticBezierLine start={[50, 4, 0]} end={[20, 10, 50]} mid={[40, 8, 30]} color="#10b981" lineWidth={3} />
            <QuadraticBezierLine start={[0, 4, 0]} end={[-40, 3, 40]} mid={[-20, 6, 20]} color="#1e293b" lineWidth={4} />
        </group>
    );
};

// --- PLAN 5 ASSETS (HIGH-TECH GREENHOUSE & PHARMA) ---

const Plan5Scene = () => {
    const SolarField = () => (
        <group position={[-60, 0, 0]}>
            <Instances range={200}>
                <boxGeometry args={[0.2, 2, 0.2]} />
                <meshStandardMaterial color="#94a3b8" />
                {[...Array(20)].map((_, row) => 
                    [...Array(10)].map((_, col) => (
                        <Instance key={`post-${row}-${col}`} position={[(row * 5) - 50, 1, (col * 15) - 70]} />
                    ))
                )}
            </Instances>
            <Instances range={200}>
                <boxGeometry args={[4, 0.1, 12]} />
                <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.1} />
                {[...Array(20)].map((_, row) => 
                    [...Array(10)].map((_, col) => (
                        <Instance key={`panel-${row}-${col}`} position={[(row * 5) - 50, 2.5, (col * 15) - 70]} rotation={[0.2, 0, 0]} />
                    ))
                )}
            </Instances>
            <Label3D text="4.5 MWp Solar Array" position={[0, 10, -10]} size={6} color="#fbbf24" />
        </group>
    );

    const Greenhouse = () => (
        <group position={[40, 0, 0]}>
            <mesh position={[0, 0.1, 0]} rotation={[-Math.PI/2, 0, 0]}>
                <planeGeometry args={[60, 180]} />
                <meshStandardMaterial color="#ecfccb" />
            </mesh>
            {[...Array(6)].map((_, i) => (
                <group key={i} position={[(i * 10) - 25, 0, 0]}>
                    <mesh position={[0, 4, 0]} rotation={[Math.PI/2, 0, 0]}>
                        <cylinderGeometry args={[5, 5, 180, 3, 1, true, 0, Math.PI]} />
                        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.3} side={THREE.DoubleSide} roughness={0.1} />
                    </mesh>
                    <pointLight position={[0, 3, -60]} intensity={2} color="#d946ef" distance={40} />
                    <pointLight position={[0, 3, 0]} intensity={2} color="#d946ef" distance={40} />
                    <pointLight position={[0, 3, 60]} intensity={2} color="#d946ef" distance={40} />
                </group>
            ))}
            <Label3D text="10,240m² Bio-Secure" position={[0, 12, 0]} size={5} color="#a3e635" />
        </group>
    );

    const PharmaHub = () => (
        <group position={[40, 0, 110]}>
            <mesh position={[0, 5, 0]} castShadow receiveShadow>
                <boxGeometry args={[50, 10, 30]} />
                <meshStandardMaterial color="#f8fafc" metalness={0.2} roughness={0.2} />
            </mesh>
            {[...Array(6)].map((_, i) => (
                <mesh key={i} position={[(i%3)*10 - 10, 11, Math.floor(i/3)*10 - 5]}>
                    <boxGeometry args={[4, 2, 4]} />
                    <meshStandardMaterial color="#64748b" />
                </mesh>
            ))}
            <group position={[-30, 0, 5]}>
                <mesh position={[0, 6, 0]}>
                    <cylinderGeometry args={[2.5, 2.5, 12]} />
                    <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
                </mesh>
                <Label3D text="LN2" position={[0, 14, 0]} size={3} color="#38bdf8" />
            </group>
            <Label3D text="ISO 7 Pharma Facility" position={[0, 15, 18]} size={4} color="#38bdf8" />
        </group>
    );

    const BatteryPark = () => (
        <group position={[-20, 0, 100]}>
            {[...Array(4)].map((_, i) => (
                <mesh key={i} position={[i * 8 - 12, 2, 0]} castShadow>
                    <boxGeometry args={[6, 4, 12]} />
                    <meshStandardMaterial color="#0ea5e9" />
                </mesh>
            ))}
            <Label3D text="5.8 MWh Storage" position={[0, 6, 0]} size={3} color="#7dd3fc" />
        </group>
    );

    return (
        <group>
            <ambientLight intensity={0.4} />
            <directionalLight position={[-100, 120, -50]} intensity={2} castShadow shadow-mapSize={[2048, 2048]} />
            <Environment preset="city" blur={0.8} background />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[300, 400]} />
                <meshStandardMaterial color="#0f172a" />
            </mesh>
            <gridHelper args={[300, 60, 0x1e293b, 0x0f172a]} position={[0, 0, 0]} />
            <SolarField />
            <Greenhouse />
            <PharmaHub />
            <BatteryPark />
            <QuadraticBezierLine start={[-60, 1, 0]} end={[-20, 4, 100]} mid={[-80, 20, 50]} color="#fbbf24" lineWidth={3} dashed dashScale={2} />
            <QuadraticBezierLine start={[-10, 4, 100]} end={[10, 1, 0]} mid={[0, 10, 50]} color="#fbbf24" lineWidth={2} dashed dashScale={2} />
            <QuadraticBezierLine start={[-10, 4, 100]} end={[20, 5, 110]} mid={[5, 10, 105]} color="#ef4444" lineWidth={2} dashed dashScale={3} />
        </group>
    );
};

// --- PLAN 3B ASSETS (MEDICINAL MUSHROOMS) ---

const Plan3BScene = () => {
    const FloatingCapsules = ({ count = 20, center = [0, 10, 0] }: any) => {
        const capsules = useMemo(() => {
            return new Array(count).fill(0).map(() => ({
                position: [
                    center[0] + (Math.random() - 0.5) * 10,
                    center[1] + (Math.random() - 0.5) * 5,
                    center[2] + (Math.random() - 0.5) * 10
                ],
                speed: 0.5 + Math.random(),
                rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0]
            }));
        }, [count, center]);

        return (
            <group>
                {capsules.map((c, i) => (
                    <Float key={i} speed={c.speed} rotationIntensity={2} floatIntensity={2}>
                        <mesh position={c.position as [number, number, number]} rotation={c.rotation as [number, number, number]}>
                            <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
                            <meshStandardMaterial color="#a855f7" emissive="#6b21a8" emissiveIntensity={0.2} />
                        </mesh>
                    </Float>
                ))}
            </group>
        );
    };

    const SmartContainer = ({ position, rotation = [0, 0, 0] }: any) => (
        <group position={position} rotation={rotation}>
            <mesh castShadow receiveShadow position={[0, 1.45, 0]}>
                <boxGeometry args={[12, 2.9, 2.5]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.1} />
            </mesh>
            <mesh position={[6.05, 1.45, 0]} rotation={[0, 0, 0]}>
                <planeGeometry args={[0.1, 2.8]} />
                <meshStandardMaterial color="#94a3b8" />
            </mesh>
            <mesh position={[-6.2, 2, 0]}>
                <boxGeometry args={[0.8, 1.5, 2]} />
                <meshStandardMaterial color="#334155" />
            </mesh>
            <mesh position={[6.1, 2.5, 0.8]}>
                <sphereGeometry args={[0.1]} />
                <meshBasicMaterial color="#10b981" toneMapped={false} />
            </mesh>
        </group>
    );

    return (
        <group>
            <ambientLight intensity={0.4} />
            <directionalLight position={[-50, 80, -50]} intensity={2} castShadow shadow-mapSize={[2048, 2048]} />
            <Environment preset="city" blur={0.8} background />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial color="#1e1b4b" />
            </mesh>
            <gridHelper args={[200, 40, 0x4c1d95, 0x312e81]} position={[0, 0, 0]} />
            <group position={[0, 0, 0]}>
                {[...Array(8)].map((_, i) => (
                    <React.Fragment key={i}>
                        <SmartContainer position={[-30 + (i * 8), 0, -10]} rotation={[0, Math.PI/2, 0]} />
                        <SmartContainer position={[-30 + (i * 8), 0, 10]} rotation={[0, -Math.PI/2, 0]} />
                    </React.Fragment>
                ))}
                <mesh position={[-2, 3.5, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
                    <planeGeometry args={[70, 12]} />
                    <meshStandardMaterial color="#334155" side={THREE.DoubleSide} opacity={0.8} transparent />
                </mesh>
                <Label3D text="16x Climate Units" position={[0, 5, 0]} size={3} color="#c084fc" />
            </group>
            <group position={[-50, 0, 40]}>
                {[...Array(3)].map((_, i) => (
                    <mesh key={i} position={[i * 8 - 8, 1.5, 0]} castShadow>
                        <coneGeometry args={[3, 3, 16]} />
                        <meshStandardMaterial color="#a16207" roughness={1} />
                    </mesh>
                ))}
                <group position={[0, 0, -15]}>
                    <mesh position={[-4, 2, 0]} rotation={[0, 0, -Math.PI/2]} castShadow>
                        <cylinderGeometry args={[1.5, 1.5, 6, 16]} />
                        <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
                    </mesh>
                    <mesh position={[4, 2, 0]} rotation={[0, 0, -Math.PI/2]} castShadow>
                        <cylinderGeometry args={[1.5, 1.5, 6, 16]} />
                        <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
                    </mesh>
                </group>
                <Label3D text="Substrate Prep" position={[0, 6, 0]} size={3} color="#fbbf24" />
            </group>
            <group position={[50, 0, 0]}>
                <mesh position={[0, 4, 0]} castShadow receiveShadow>
                    <boxGeometry args={[25, 8, 30]} />
                    <meshStandardMaterial color="#f8fafc" />
                </mesh>
                <mesh position={[-12.6, 3, 0]} rotation={[0, -Math.PI/2, 0]}>
                    <planeGeometry args={[20, 4]} />
                    <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.0} opacity={0.7} transparent />
                </mesh>
                <mesh position={[0, 8.5, 5]}>
                    <boxGeometry args={[8, 1, 4]} />
                    <meshStandardMaterial color="#64748b" />
                </mesh>
                <FloatingCapsules count={15} center={[0, 12, 0]} />
                <Label3D text="Pharma Grade Lab" position={[0, 10, 15]} size={3} color="#38bdf8" />
            </group>
            <QuadraticBezierLine start={[-50, 2, 25]} end={[-30, 2, 10]} mid={[-40, 8, 15]} color="#a16207" lineWidth={2} dashed dashScale={3} />
            <QuadraticBezierLine start={[30, 2, 0]} end={[40, 4, 0]} mid={[35, 8, 0]} color="#a855f7" lineWidth={2} dashed dashScale={3} />
        </group>
    );
};

// --- PLAN 4 ASSETS (ARTISAN CHEESE & BEES) ---

const Plan4Scene = () => {
    const Bees = ({ count = 50, range = 20, center = [0, 5, 0] }: any) => {
        const bees = useMemo(() => {
            return new Array(count).fill(0).map(() => ({
                position: [
                    center[0] + (Math.random() - 0.5) * range,
                    center[1] + (Math.random() - 0.5) * (range / 2),
                    center[2] + (Math.random() - 0.5) * range
                ],
                speed: 0.5 + Math.random(),
                offset: Math.random() * 100
            }));
        }, [count, range, center]);

        return (
            <group>
                {bees.map((bee, i) => (
                    <Float key={i} speed={bee.speed} rotationIntensity={2} floatIntensity={2} floatingRange={[0, 2]}>
                        <mesh position={bee.position as [number, number, number]}>
                            <sphereGeometry args={[0.15, 4, 4]} />
                            <meshBasicMaterial color="#facc15" />
                        </mesh>
                    </Float>
                ))}
            </group>
        );
    };

    const HiveBox = ({ position }: { position: [number, number, number] }) => (
        <group position={position}>
            <mesh position={[0, 0.5, 0]} castShadow>
                <boxGeometry args={[0.8, 1, 0.8]} />
                <meshStandardMaterial color="#78350f" />
            </mesh>
            <mesh position={[0, 1.4, 0]} castShadow>
                <boxGeometry args={[1, 0.8, 1.2]} />
                <meshStandardMaterial color="#fef08a" />
            </mesh>
            <mesh position={[0, 2.2, 0]} castShadow>
                <boxGeometry args={[1, 0.8, 1.2]} />
                <meshStandardMaterial color="#facc15" />
            </mesh>
            <mesh position={[0, 2.8, 0]} rotation={[0, 0, 0]} castShadow>
                <coneGeometry args={[1, 0.5, 4]} rotation={[0, Math.PI/4, 0]} />
                <meshStandardMaterial color="#a16207" />
            </mesh>
        </group>
    );

    return (
        <group>
            <ambientLight intensity={0.6} />
            <directionalLight position={[-50, 80, 50]} intensity={1.8} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0005} />
            <Environment preset="park" blur={0.6} background />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial color="#3f6212" />
            </mesh>
            <gridHelper args={[200, 40, 0x1a2e05, 0x365314]} position={[0, 0, 0]} />
            <group position={[0, 0, 0]}>
                <mesh position={[0, 4, 0]} castShadow receiveShadow>
                    <boxGeometry args={[25, 8, 20]} />
                    <meshStandardMaterial color="#f8fafc" />
                </mesh>
                <Label3D text="Verdeoro Artisan Cheese" position={[0, 10, 12]} size={2} color="#facc15" />
                <group position={[20, 0, 0]}>
                    <mesh position={[0, 0, 0]} castShadow receiveShadow>
                        <sphereGeometry args={[18, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshStandardMaterial color="#4d7c0f" />
                    </mesh>
                    <mesh position={[-12, 2, 0]} rotation={[0, 0, 0]}>
                        <boxGeometry args={[8, 4, 6]} />
                        <meshStandardMaterial color="#334155" />
                    </mesh>
                    <mesh position={[-16, 2, 0]} rotation={[0, 0, 0]}>
                        <planeGeometry args={[4, 3]} />
                        <meshStandardMaterial color="#0f172a" />
                    </mesh>
                    <Label3D text="Ageing Caves (12°C)" position={[0, 20, 0]} size={3} color="#fbbf24" />
                </group>
                <group position={[-25, 1, 10]}>
                    {[0, 1].map(i => (
                        <mesh key={i} position={[0, 0, i * 6]} rotation={[-0.2, 0, 0]} castShadow>
                            <boxGeometry args={[15, 0.2, 4]} />
                            <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.1} />
                        </mesh>
                    ))}
                    <Label3D text="300kW Solar" position={[0, 5, 0]} size={2} color="#60a5fa" />
                </group>
            </group>
            <group position={[50, 0, 40]}>
                {[...Array(5)].map((_, i) => (
                    <group key={i} position={[(i%3)*8 - 8, 0, Math.floor(i/3)*10]}>
                        <HiveBox position={[0, 0, 0]} />
                    </group>
                ))}
                <Bees count={100} range={20} center={[0, 5, 0]} />
                <Label3D text="Flow Hive Apiary" position={[0, 8, 0]} size={3} color="#f59e0b" />
            </group>
            <group position={[-40, 0, -30]}>
                <Instances range={40}>
                    <cylinderGeometry args={[0.3, 0.5, 2, 5]} />
                    <meshStandardMaterial color="#3e2723" />
                    {[...Array(5)].map((_, r) => 
                        [...Array(5)].map((_, c) => (
                            <Instance key={`trunk-${r}-${c}`} position={[(r*8)-20, 1, (c*8)-20]} />
                        ))
                    )}
                </Instances>
                <Instances range={40}>
                    <icosahedronGeometry args={[2, 0]} />
                    <meshStandardMaterial color="#15803d" />
                    {[...Array(5)].map((_, r) => 
                        [...Array(5)].map((_, c) => (
                            <Instance key={`leaves-${r}-${c}`} position={[(r*8)-20, 3, (c*8)-20]} />
                        ))
                    )}
                </Instances>
                <Bees count={50} range={30} center={[0, 4, 0]} />
                <Label3D text="Macadamia Pollination" position={[0, 10, 0]} size={3} color="#86efac" />
            </group>
            <QuadraticBezierLine start={[50, 3, 40]} end={[-40, 3, -30]} mid={[0, 15, 0]} color="#facc15" lineWidth={1} dashed dashScale={2} />
            <QuadraticBezierLine start={[50, 3, 40]} end={[-20, 3, -20]} mid={[10, 10, 10]} color="#facc15" lineWidth={1} dashed dashScale={2} />
        </group>
    );
};

// --- PLAN 3 ASSETS (PROTEIN FACTORY) ---

const Plan3Scene = () => {
    const SmokeParticle = ({ position, delay }: { position: [number, number, number], delay: number }) => (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} floatingRange={[0, 5]}>
            <mesh position={position} scale={[1, 1, 1]}>
                <sphereGeometry args={[0.5, 8, 8]} />
                <meshStandardMaterial color="#9ca3af" transparent opacity={0.4} />
            </mesh>
        </Float>
    );

    return (
        <group>
            <ambientLight intensity={0.5} />
            <directionalLight position={[50, 80, -50]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
            <Environment preset="city" blur={0.7} background />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial color="#1c1917" />
            </mesh>
            <gridHelper args={[200, 40, 0x44403c, 0x292524]} position={[0, 0, 0]} />
            <group position={[0, 0, 0]}>
                <group>
                    <mesh position={[0, 6, 0]} castShadow receiveShadow>
                        <boxGeometry args={[40, 12, 60]} />
                        <meshStandardMaterial color="#f1f5f9" metalness={0.2} roughness={0.2} />
                    </mesh>
                    <Label3D text="Processing Hall" position={[0, 13, 0]} size={4} color="#38bdf8" />
                </group>
                <group position={[30, 0, 10]}>
                    <mesh position={[0, 5, 0]} castShadow receiveShadow>
                        <boxGeometry args={[20, 10, 30]} />
                        <meshStandardMaterial color="#78350f" metalness={0.1} roughness={0.8} />
                    </mesh>
                    {[...Array(3)].map((_, i) => (
                        <group key={i} position={[0, 10, i * 8 - 8]}>
                            <mesh>
                                <cylinderGeometry args={[1, 1.5, 4]} />
                                <meshStandardMaterial color="#44403c" />
                            </mesh>
                            <SmokeParticle position={[0, 3, 0]} delay={i} />
                            <SmokeParticle position={[0.5, 5, 0.5]} delay={i + 0.5} />
                        </group>
                    ))}
                    <Label3D text="Smokehouse" position={[12, 8, 0]} size={3} color="#fb923c" />
                </group>
                <group position={[-30, 0, 10]}>
                    {[...Array(2)].map((_, i) => (
                        <group key={i} position={[0, 0, i * 15 - 7.5]}>
                            <mesh position={[0, 8, 0]} castShadow>
                                <cylinderGeometry args={[5, 5, 16, 32]} />
                                <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
                            </mesh>
                            <mesh position={[0, 16, 0]}>
                                <sphereGeometry args={[5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                                <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
                            </mesh>
                        </group>
                    ))}
                    <Label3D text="Fermentation" position={[-8, 12, 0]} size={3} color="#facc15" />
                </group>
                <group position={[0, 0, -45]}>
                    <mesh position={[0, 5, 0]} castShadow receiveShadow>
                        <boxGeometry args={[60, 10, 30]} />
                        <meshStandardMaterial color="#e2e8f0" />
                    </mesh>
                    <mesh position={[0, 10.1, 0]} rotation={[-Math.PI/2, 0, 0]}>
                        <planeGeometry args={[50, 20]} />
                        <meshStandardMaterial color="#0f172a" />
                    </mesh>
                    <Label3D text="Retort & Dispatch" position={[0, 11, 0]} size={5} color="#ef4444" />
                    {[...Array(4)].map((_, i) => (
                        <mesh key={i} position={[i * 12 - 18, 2, 15.1]}>
                            <boxGeometry args={[8, 4, 1]} />
                            <meshStandardMaterial color="#334155" />
                        </mesh>
                    ))}
                </group>
                <group position={[15, 0, -65]} rotation={[0, Math.PI, 0]}>
                     <mesh position={[0, 2, 0]} castShadow><boxGeometry args={[3.5, 4, 10]} /><meshStandardMaterial color="white" /></mesh>
                     <mesh position={[0, 1, 6]}><boxGeometry args={[3.5, 2, 2]} /><meshStandardMaterial color="#94a3b8" /></mesh>
                </group>
            </group>
        </group>
    );
};

// --- PLAN 2 ASSETS (DAIRY & AGROFORESTRY) ---

const DairyFactoryBuilding = () => (
    <group>
        <mesh position={[0, 4, 0]} castShadow receiveShadow>
            <boxGeometry args={[30, 8, 20]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.3} roughness={0.2} />
        </mesh>
        <mesh position={[18, 3, 0]} castShadow receiveShadow>
            <boxGeometry args={[10, 6, 15]} />
            <meshStandardMaterial color="#e2e8f0" />
        </mesh>
        <mesh position={[-18, 3, 0]} castShadow receiveShadow>
            <boxGeometry args={[10, 6, 15]} />
            <meshStandardMaterial color="#cbd5e1" />
        </mesh>
        <mesh position={[-18, 7, 0]}>
             <boxGeometry args={[8, 1, 4]} />
             <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.5} />
        </mesh>
        {[1, -1].map((side, i) => (
            <group key={i} position={[side * 10, 0, 14]}>
                <mesh position={[0, 6, 0]} castShadow>
                    <cylinderGeometry args={[3, 3, 12, 32]} />
                    <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[0, 12, 0]}>
                    <sphereGeometry args={[3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                </mesh>
            </group>
        ))}
        <mesh position={[0, 1, -12]}>
            <boxGeometry args={[20, 2, 4]} />
            <meshStandardMaterial color="#475569" />
        </mesh>
        <Label3D text="Dairy Factory" position={[0, 12, 0]} size={4} color="#38bdf8" />
    </group>
);

const AgroforestryBlock = ({ position, year }: { position: [number, number, number], year: number }) => {
    const treeScale = 0.3 + (Math.min(year, 10) / 10) * 1.2; 
    const soyCount = year <= 3 ? 300 : (year <= 6 ? 150 : 0);

    return (
        <group position={position}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
                <planeGeometry args={[50, 80]} />
                <meshStandardMaterial color="#14532d" />
            </mesh>
            <Instances range={60}>
                <cylinderGeometry args={[0.4 * treeScale, 0.6 * treeScale, 2.5 * treeScale, 5]} />
                <meshStandardMaterial color="#3e2723" />
                {[...Array(6)].map((_, r) => 
                    [...Array(10)].map((_, c) => (
                        <Instance 
                            key={`trunk-${r}-${c}`} 
                            position={[(r*8) - 20, 1.25 * treeScale, (c*7) - 32]} 
                        />
                    ))
                )}
            </Instances>
            <Instances range={60}>
                <icosahedronGeometry args={[2.2 * treeScale, 0]} />
                <meshStandardMaterial color="#15803d" />
                {[...Array(6)].map((_, r) => 
                    [...Array(10)].map((_, c) => (
                        <Instance 
                            key={`leaves-${r}-${c}`} 
                            position={[(r*8) - 20, 3.5 * treeScale, (c*7) - 32]} 
                            scale={[1, 0.8, 1]} 
                        />
                    ))
                )}
            </Instances>
            {soyCount > 0 && (
                <Instances range={soyCount}>
                    <coneGeometry args={[0.3, 0.8, 4]} />
                    <meshStandardMaterial color="#84cc16" />
                    {[...Array(5)].map((_, r) => 
                        [...Array(20)].map((_, c) => (
                            [0,1,2].map((offset) => (
                                <Instance 
                                    key={`soy-${r}-${c}-${offset}`} 
                                    position={[
                                        (r*8) - 16 + (offset * 0.8),
                                        0.4, 
                                        (c*3.5) - 32
                                    ]} 
                                    scale={[1, Math.random() * 0.5 + 0.8, 1]}
                                />
                            ))
                        ))
                    )}
                </Instances>
            )}
        </group>
    )
}

const Plan2Scene = ({ year }: { year: number }) => {
    return (
        <group>
            <ambientLight intensity={0.6} />
            <directionalLight position={[-50, 100, 50]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0005} />
            <Environment preset="forest" blur={0.6} background />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[300, 300]} />
                <meshStandardMaterial color="#052e16" />
            </mesh>
            <gridHelper args={[300, 30, 0x14532d, 0x064e3b]} position={[0, 0, 0]} />
            <group position={[0, 0, 40]}>
                <DairyFactoryBuilding />
                <group position={[10, 1.5, -20]} rotation={[0, Math.PI, 0]}>
                    <mesh position={[0, 1, 0]} castShadow><boxGeometry args={[2.5, 2.5, 6]} /><meshStandardMaterial color="white" /></mesh>
                    <mesh position={[0, 0.5, 3.5]}><boxGeometry args={[2.5, 1.5, 1.5]} /><meshStandardMaterial color="#e2e8f0" /></mesh>
                    <Label3D text="Cold Chain" position={[0, 4, 0]} size={2} color="#94a3b8" />
                </group>
            </group>
            <group position={[-60, 0, -20]}>
                <AgroforestryBlock position={[0, 0, 0]} year={year} />
                <Label3D text="Block A: Macadamia + Soy" position={[0, 8, 0]} size={4} color="#86efac" />
            </group>
            <group position={[60, 0, -20]}>
                <AgroforestryBlock position={[0, 0, 0]} year={year} />
                <Label3D text="Block B: Macadamia + Soy" position={[0, 8, 0]} size={4} color="#86efac" />
            </group>
            <group position={[0, 0, -100]}>
                <AgroforestryBlock position={[0, 0, 0]} year={year} />
            </group>
            <QuadraticBezierLine start={[0, 0.5, 40]} end={[-60, 0.5, -20]} mid={[-30, 5, 10]} color="#0ea5e9" lineWidth={2} dashed dashScale={4} />
            <QuadraticBezierLine start={[0, 0.5, 40]} end={[60, 0.5, -20]} mid={[30, 5, 10]} color="#0ea5e9" lineWidth={2} dashed dashScale={4} />
        </group>
    );
};

// --- PLAN 1 ASSETS (Existing) ---

const SolarPanelRow = ({ position, rotation = [0, 0, 0] }: any) => (
    <group position={position} rotation={rotation}>
        <mesh position={[0, 1, 0]} rotation={[-0.5, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[24, 0.2, 4]} />
            <meshStandardMaterial color="#2563eb" metalness={0.6} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.5, 1]}>
            <cylinderGeometry args={[0.1, 0.1, 1.5]} />
            <meshStandardMaterial color="#94a3b8" />
        </mesh>
        <mesh position={[0, 0.2, -1]}>
            <cylinderGeometry args={[0.1, 0.1, 1]} />
            <meshStandardMaterial color="#94a3b8" />
        </mesh>
    </group>
);

const LodgeBuilding = () => (
    <group>
        <mesh position={[0, 3, 0]} castShadow receiveShadow>
            <boxGeometry args={[16, 6, 10]} />
            <meshStandardMaterial color="#f1f5f9" />
        </mesh>
        <mesh position={[0, 7.5, 0]} rotation={[0, Math.PI/4, 0]} castShadow>
            <coneGeometry args={[11, 4, 4]} />
            <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0, 0.5, 8]} receiveShadow>
            <boxGeometry args={[18, 1, 6]} />
            <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[15, 0.1, 5]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[10, 6]} />
            <meshStandardMaterial color="#06b6d4" metalness={0.1} roughness={0.1} />
        </mesh>
        <Label3D text="Main Lodge" position={[0, 12, 0]} size={3} color="#cbd5e1" />
    </group>
);

const RockCrusher = () => (
    <group>
        <mesh position={[-4, 4, 0]} castShadow>
            <coneGeometry args={[3, 4, 4, 1, true]} rotation={[Math.PI, 0, 0]} />
            <meshStandardMaterial color="#64748b" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-4, 2, 0]}>
            <boxGeometry args={[4, 4, 4]} />
            <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[2, 2, 0]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[10, 0.5, 2]} />
            <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[8, 1.5, 0]}>
            <coneGeometry args={[5, 3, 16]} />
            <meshStandardMaterial color="#a8a29e" />
        </mesh>
        <Label3D text="Rock Dust" position={[0, 8, 0]} size={3} color="#a8a29e" />
    </group>
);

const WaterDam = () => (
    <group>
        <mesh position={[0, 0.2, 0]} rotation={[-Math.PI/2, 0, 0]}>
            <circleGeometry args={[18, 32]} />
            <meshStandardMaterial color="#0ea5e9" roughness={0.0} metalness={0.1} opacity={0.8} transparent />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
            <ringGeometry args={[18, 22, 32]} />
            <meshStandardMaterial color="#78350f" />
        </mesh>
        <Label3D text="19ML Dam" position={[0, 5, 0]} size={4} color="#7dd3fc" />
    </group>
);

const Plan1Scene = () => {
    return (
        <group>
            <ambientLight intensity={0.7} />
            <directionalLight position={[100, 100, 50]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0005} />
            <Environment preset="park" blur={0.5} background />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-60, 0, 0]} receiveShadow>
                <planeGeometry args={[140, 300]} />
                <meshStandardMaterial color="#1a4228" />
            </mesh>
            <Label3D text="Cultivation Zone (220ha)" position={[-60, 0.5, 120]} size={8} color="#86efac" />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[100, 0, 0]} receiveShadow>
                <planeGeometry args={[160, 300]} />
                <meshStandardMaterial color="#5d4037" />
            </mesh>
            <Label3D text="Wildlife Zone (220ha)" position={[100, 0.5, 120]} size={8} color="#fdba74" />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[15, 0.05, 0]} receiveShadow>
                <planeGeometry args={[10, 300]} />
                <meshStandardMaterial color="#334155" />
            </mesh>
            <group position={[-30, 0.1, -80]}>
                <Label3D text="Intensive Veg" position={[0, 5, -40]} size={5} color="#4ade80" />
                {[...Array(12)].map((_, i) => (
                    <mesh key={i} position={[i * -6, 0, 0]} rotation={[-Math.PI/2, 0, 0]}>
                        <planeGeometry args={[3, 80]} />
                        <meshStandardMaterial color="#22c55e" />
                    </mesh>
                ))}
            </group>
            <group position={[-70, 0, 60]}>
                <Instances range={200}>
                    <cylinderGeometry args={[0.3, 0.5, 3, 5]} />
                    <meshStandardMaterial color="#3e2723" />
                    {[...Array(10)].map((_, r) => 
                        [...Array(8)].map((_, c) => (
                            <Instance key={`trunk-${r}-${c}`} position={[(r*12) - 50, 1.5, (c*12) - 40]} />
                        ))
                    )}
                </Instances>
                <Instances range={200}>
                    <dodecahedronGeometry args={[2.5, 0]} />
                    <meshStandardMaterial color="#166534" />
                    {[...Array(10)].map((_, r) => 
                        [...Array(8)].map((_, c) => (
                            <Instance key={`leaves-${r}-${c}`} position={[(r*12) - 50, 4, (c*12) - 40]} />
                        ))
                    )}
                </Instances>
                <Label3D text="Macadamia + Soy" position={[0, 8, 0]} size={6} color="#bbf7d0" />
            </group>
            <group position={[40, 0, -100]}>
                <LodgeBuilding />
            </group>
            <group position={[60, 0, -40]}>
                {[0, 1, 2, 3].map(i => (
                    <SolarPanelRow key={i} position={[0, 0, i * 6]} />
                ))}
                <Label3D text="500kVA Solar" position={[0, 5, -8]} size={4} color="#fbbf24" />
            </group>
            <group position={[40, 0, 20]}>
                <RockCrusher />
            </group>
            <group position={[-80, 0, -10]}>
                <WaterDam />
            </group>
            <group position={[100, 0, 0]}>
                <Instances range={50}>
                    <coneGeometry args={[1.5, 3, 7]} />
                    <meshStandardMaterial color="#65a30d" />
                    {[...Array(30)].map((_, i) => (
                        <Instance 
                            key={i} 
                            position={[(Math.random() * 60) + 10, 1.5, Math.random() * 250 - 125]} 
                            scale={0.8 + Math.random() * 0.5} 
                        />
                    ))}
                </Instances>
                {[...Array(5)].map((_, i) => (
                    <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <group position={[Math.random() * 60, 3, Math.random() * 200 - 100]}>
                            <mesh>
                                <sphereGeometry args={[1.5, 16, 16]} />
                                <meshStandardMaterial color="#d97706" />
                            </mesh>
                        </group>
                    </Float>
                ))}
            </group>
            <QuadraticBezierLine start={[-80, 0.5, -10]} end={[-30, 0.5, -80]} mid={[-50, 5, -40]} color="#0ea5e9" lineWidth={2} dashed dashScale={4} opacity={0.6} transparent />
            <QuadraticBezierLine start={[-80, 0.5, -10]} end={[-70, 0.5, 60]} mid={[-75, 5, 20]} color="#0ea5e9" lineWidth={2} dashed dashScale={4} opacity={0.6} transparent />
            {[
                [-110, 0, -120], [-50, 0, -130], [0, 0, -110],
                [-120, 0, 20], [-90, 0, 80], [20, 0, 120],
                [80, 0, 140], [120, 0, -60], [150, 0, 50]
            ].map((pos, i) => (
                <group key={i} position={pos as [number, number, number]}>
                    <mesh position={[0, 1, 0]}>
                        <cylinderGeometry args={[0.5, 0.5, 2]} />
                        <meshStandardMaterial color="#0284c7" />
                    </mesh>
                    <mesh position={[0, 2.5, 0]}>
                        <sphereGeometry args={[0.8]} />
                        <meshStandardMaterial color="#38bdf8" />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

// --- MASTER SCENE REBUILD ---

const EstateTerrain = () => (
  <group position={[0, -0.5, 0]}>
    {/* Core Farm Base (South) - Green - Z: 0 to 400 */}
    <mesh position={[0, 0, 200]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[500, 400]} />
        <meshStandardMaterial color="#064e3b" roughness={0.9} />
    </mesh>
    
    {/* Expansion Base (North) - Brown - Z: -200 to 0 */}
    <mesh position={[0, 0, -100]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[500, 200]} />
        <meshStandardMaterial color="#713f12" roughness={0.9} />
    </mesh>
    
    {/* Industrial Hub Pad (Center) */}
    <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[90, 64]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
    </mesh>
    
    {/* Main Arterial Road */}
    <mesh position={[0, 0.2, 50]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 700]} />
        <meshStandardMaterial color="#334155" />
    </mesh>
  </group>
);

const MiniFactory = ({ color, scale = 1 }: { color: string, scale?: number }) => (
    <group scale={scale}>
        <mesh position={[0, 5, 0]} castShadow>
            <boxGeometry args={[20, 10, 30]} />
            <meshStandardMaterial color={color} />
        </mesh>
        <mesh position={[0, 10, 0]} castShadow>
            <boxGeometry args={[15, 2, 25]} />
            <meshStandardMaterial color="#334155" />
        </mesh>
    </group>
);

const MiniSilos = ({ color, count = 2 }: { color: string, count?: number }) => (
    <group>
        {[...Array(count)].map((_, i) => (
            <mesh key={i} position={[i*12 - (count*6)+6, 8, 0]} castShadow>
                <cylinderGeometry args={[4, 4, 16]} />
                <meshStandardMaterial color={color} />
            </mesh>
        ))}
    </group>
);

const MiniSolar = () => (
    <group>
        {[...Array(3)].map((_, i) => (
            <mesh key={i} position={[0, 1, i*10 - 10]} rotation={[-0.2, 0, 0]}>
                <boxGeometry args={[30, 0.5, 8]} />
                <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.1} />
            </mesh>
        ))}
    </group>
);

const MiniTrees = ({ color }: { color: string }) => (
    <Instances range={20}>
        <coneGeometry args={[3, 8, 8]} />
        <meshStandardMaterial color={color} />
        {[...Array(4)].map((_, r) => 
            [...Array(5)].map((_, c) => (
                <Instance key={`${r}-${c}`} position={[r*15 - 30, 4, c*15 - 30]} />
            ))
        )}
    </Instances>
);

// New Interactive Zone Component
const InteractiveZone = ({ 
    name, 
    stats, 
    position, 
    children, 
    color = "white" 
}: { 
    name: string; 
    stats: { label: string; value: string }[]; 
    position: [number, number, number]; 
    children?: React.ReactNode; 
    color?: string;
}) => {
    const [hovered, setHovered] = useState(false);
    
    // Scale effect on hover
    const scale = hovered ? 1.05 : 1;

    return (
        <group 
            position={position} 
            scale={[scale, scale, scale]}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }} 
            onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
        >
            {children}
            
            {/* Always visible label, slightly elevated */}
            {!hovered && (
                <Html position={[0, 20, 0]} center distanceFactor={200} style={{pointerEvents: 'none'}}>
                    <div className="px-2 py-1 rounded bg-black/50 backdrop-blur-sm border border-white/20 text-white text-[8px] font-bold uppercase tracking-widest whitespace-nowrap">
                        {name}
                    </div>
                </Html>
            )}

            {/* Expanded Info Card on Hover */}
            {hovered && (
                <Html position={[0, 40, 0]} center distanceFactor={120} zIndexRange={[100, 0]}>
                    <div className="bg-slate-900/95 backdrop-blur-xl p-4 rounded-xl border border-slate-600 shadow-2xl w-64 text-left transform transition-all">
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700">
                            <h3 className="text-base font-bold" style={{ color: color }}>{name}</h3>
                            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }}></div>
                        </div>
                        <div className="space-y-2">
                            {stats.map((s, i) => (
                                <div key={i} className="flex justify-between text-xs">
                                    <span className="text-slate-400 font-bold uppercase">{s.label}</span>
                                    <span className="text-white font-bold font-mono">{s.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 text-[9px] text-slate-500 uppercase tracking-wider font-bold text-center border-t border-slate-800 pt-2">
                            Click to Explore
                        </div>
                    </div>
                </Html>
            )}
        </group>
    )
}

const MasterScene = () => {
    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[-100, 200, 100]} intensity={1.5} castShadow shadow-bias={-0.0005} shadow-mapSize={[2048, 2048]} />
            <Environment preset="city" blur={0.8} background />
            <Stars radius={300} depth={50} count={2000} factor={4} saturation={0} fade />
            
            {/* Lowered floor to avoid clipping */}
            <group position={[0, -2, 0]}>
                <EstateTerrain />
            </group>

            {/* PLAN 1: CORE FARM (South Section) */}
            <InteractiveZone 
                name="Core Farm (Plan 1)" 
                color="#4ade80"
                position={[100, 0, 200]}
                stats={[
                    { label: 'Area', value: '445 Ha' },
                    { label: 'Investment', value: 'R 57.1M' },
                    { label: 'Revenue', value: 'R 49.0M' },
                    { label: 'Jobs', value: '185' }
                ]}
            >
                <MiniTrees color="#166534" />
                <group position={[40, 0, 0]}>
                    <mesh position={[0, 4, 0]}><boxGeometry args={[15, 8, 15]} /><meshStandardMaterial color="#f1f5f9" /></mesh> 
                </group>
            </InteractiveZone>

            {/* PLAN 1A: EXPANSION (North Section) */}
            <InteractiveZone 
                name="Soy Expansion (Plan 1A)"
                color="#facc15" 
                position={[-100, 0, -100]}
                stats={[
                    { label: 'Area', value: '200 Ha' },
                    { label: 'Crop', value: 'Soybeans' },
                    { label: 'Output', value: '500 Tonnes' },
                    { label: 'Feedstock', value: '100% Local' }
                ]}
            >
                <Instances range={100}>
                    <sphereGeometry args={[2, 4, 4]} />
                    <meshStandardMaterial color="#eab308" />
                    {[...Array(10)].map((_, r) => 
                        [...Array(10)].map((_, c) => (
                            <Instance key={`${r}-${c}`} position={[r*10 - 50, 1, c*10 - 50]} />
                        ))
                    )}
                </Instances>
            </InteractiveZone>

            {/* PLAN 2: DAIRY & ORCHARD (South-West Section) */}
            <InteractiveZone 
                name="Agroforestry (Plan 2)"
                color="#22c55e" 
                position={[-100, 0, 200]}
                stats={[
                    { label: 'Trees', value: '36,000' },
                    { label: 'Dairy', value: '2M Litres' },
                    { label: 'Carbon', value: '-9,000 T' },
                    { label: 'DSCR', value: '16.6x' }
                ]}
            >
                <MiniTrees color="#15803d" />
                <group position={[0, 0, 40]}>
                    <MiniFactory color="#f8fafc" scale={0.8} />
                </group>
            </InteractiveZone>

            {/* --- INDUSTRIAL CLUSTER (Center Hub) --- */}
            
            {/* Plan 3: Meat */}
            <InteractiveZone 
                name="Meat Factory (Plan 3)" 
                color="#f87171"
                position={[-50, 0, -20]}
                stats={[
                    { label: 'Capacity', value: '858 T' },
                    { label: 'Products', value: '17 SKUs' },
                    { label: 'Revenue', value: 'R 115M' },
                    { label: 'Tech', value: 'Retort / HMMA' }
                ]}
            >
                <MiniFactory color="#cbd5e1" />
            </InteractiveZone>

            {/* Plan 6: Energy */}
            <InteractiveZone 
                name="Bio-Energy (Plan 6)" 
                color="#fbbf24"
                position={[50, 0, -20]}
                stats={[
                    { label: 'Bio-Diesel', value: '3.45M L' },
                    { label: 'Biochar', value: '3,000 T' },
                    { label: 'Revenue', value: 'R 89.8M' },
                    { label: 'Independence', value: '100%' }
                ]}
            >
                <MiniSilos color="#cbd5e1" />
                <group position={[0, 0, 20]}><MiniSilos color="#94a3b8" /></group>
            </InteractiveZone>

            {/* Plan 4: Cheese */}
            <InteractiveZone 
                name="Artisan Cheese (Plan 4)" 
                color="#facc15"
                position={[-50, 0, 40]}
                stats={[
                    { label: 'Production', value: '72 Tonnes' },
                    { label: 'Apiary', value: '200 Hives' },
                    { label: 'Export', value: 'EU / UK' },
                    { label: 'Margin', value: '34.5%' }
                ]}
            >
                <mesh position={[0, 3, 0]} castShadow><cylinderGeometry args={[10, 10, 6]} /><meshStandardMaterial color="#fef08a" /></mesh>
            </InteractiveZone>

            {/* Plan 3B: Mushrooms */}
            <InteractiveZone 
                name="Medicinal Fungi (Plan 3B)" 
                color="#a855f7"
                position={[50, 0, 40]}
                stats={[
                    { label: 'Species', value: "Lion's Mane" },
                    { label: 'Units', value: '16x Climate' },
                    { label: 'Revenue', value: 'R 30.8M' },
                    { label: 'IRR', value: '24.3%' }
                ]}
            >
                <group>
                    {[...Array(4)].map((_, i) => (
                        <mesh key={i} position={[i*8-12, 3, 0]} castShadow><boxGeometry args={[6, 6, 12]} /><meshStandardMaterial color="#3b82f6" /></mesh>
                    ))}
                </group>
            </InteractiveZone>

            {/* Plan 5: Solar & Pharma */}
            <InteractiveZone 
                name="Solar & Pharma (Plan 5)" 
                color="#06b6d4"
                position={[0, 0, 80]}
                stats={[
                    { label: 'Solar', value: '4.9 MW' },
                    { label: 'Savings', value: 'R 60M/yr' },
                    { label: 'Pharma', value: 'Sulforaphane' },
                    { label: 'Greenhouse', value: '10,240 m²' }
                ]}
            >
                <MiniSolar />
            </InteractiveZone>

            <Html position={[0, -1, 350]} center>
                <div className="bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full border border-white/10 text-white text-xs font-bold uppercase tracking-widest pointer-events-none whitespace-nowrap">
                    Estate Digital Twin - 645 Hectares
                </div>
            </Html>
        </>
    );
}

// --- MAIN EXPORT ---

const Facility3D: React.FC<Facility3DProps> = ({ projectId }) => {
    const isPlan1 = projectId === 'plan1';
    const isPlan2 = projectId === 'plan2';
    const isPlan3 = projectId === 'plan3';
    const isPlan3b = projectId === 'plan3b';
    const isPlan4 = projectId === 'plan4';
    const isPlan5 = projectId === 'plan5';
    const isPlan6 = projectId === 'plan6';
    const [plan2Year, setPlan2Year] = useState(1);

    const getCameraPos = () => {
        if (isPlan1) return [-100, 80, 100];
        if (isPlan2) return [0, 60, 120];
        if (isPlan3) return [50, 50, 80]; 
        if (isPlan3b) return [0, 40, 80];
        if (isPlan4) return [0, 40, 100];
        if (isPlan5) return [-100, 60, 120];
        if (isPlan6) return [0, 50, 100];
        return [-150, 200, 300]; // Master view high angle
    };

    const getTitle = () => {
        if (isPlan1) return 'Modimolle Farm Digital Twin';
        if (isPlan2) return 'Agroforestry Dairy System';
        if (isPlan3) return 'Plant Protein Factory';
        if (isPlan3b) return 'Medicinal Mushroom Facility';
        if (isPlan4) return 'Artisan Cheese & Apiary';
        if (isPlan5) return 'High-Tech Pharma & Solar';
        if (isPlan6) return 'Bio-Energy Refinery';
        return '645 Ha Estate Master Plan';
    };

    const getSubtitle = () => {
        if (isPlan1) return '445 Hectare Asset Visualization';
        if (isPlan2) return '180 Ha Integrated Production';
        if (isPlan3) return 'Complete Manufacturing Hub (10 Ha)';
        if (isPlan3b) return '16x Climate Container Array';
        if (isPlan4) return '72T Cheese + 200 Hive System';
        if (isPlan5) return '100% Energy Independence + 10,240m² Greenhouse';
        if (isPlan6) return 'Continuous Pyrolysis + 3.45M Litre Output';
        return 'Integrated Industrial Cluster & Agricultural Zones';
    };

    return (
        <div className="w-full h-[600px] bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800 relative group">
            
            <div className="absolute top-0 left-0 w-full p-6 z-10 bg-gradient-to-b from-slate-950/90 to-transparent pointer-events-none">
                <h3 className="text-white font-bold text-2xl drop-shadow-md flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${isPlan6 ? 'bg-emerald-500' : (isPlan5 ? 'bg-cyan-500' : (isPlan4 ? 'bg-yellow-500' : (isPlan3b ? 'bg-purple-500' : (isPlan3 ? 'bg-amber-500' : (isPlan2 ? 'bg-emerald-400' : (isPlan1 ? 'bg-emerald-500' : 'bg-blue-500'))))))}`}></div>
                    {getTitle()}
                </h3>
                <p className="text-slate-400 text-xs font-bold tracking-[0.2em] mt-1 ml-6 uppercase">
                    {getSubtitle()}
                </p>
            </div>

            {isPlan2 && (
                <>
                    <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2 pointer-events-none">
                         <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded backdrop-blur border border-white/10">
                             <div className="w-3 h-3 bg-emerald-600 rounded-full"></div><span className="text-[10px] text-white font-bold uppercase">Macadamia</span>
                         </div>
                         <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded backdrop-blur border border-white/10">
                             <div className="w-3 h-3 bg-lime-500 rounded-full"></div><span className="text-[10px] text-white font-bold uppercase">Soy Intercrop</span>
                         </div>
                         <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded backdrop-blur border border-white/10">
                             <div className="w-3 h-3 bg-slate-300 rounded-full"></div><span className="text-[10px] text-white font-bold uppercase">Processing</span>
                         </div>
                    </div>

                    <div className="absolute bottom-6 right-6 z-20 bg-slate-900/80 backdrop-blur border border-slate-700 p-4 rounded-xl w-64">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                                <Clock className="w-3 h-3" />
                                Growth Timeline
                            </div>
                            <span className="text-white font-bold text-sm">Year {plan2Year}</span>
                        </div>
                        <input 
                            type="range" 
                            min="1" 
                            max="10" 
                            step="1"
                            value={plan2Year}
                            onChange={(e) => setPlan2Year(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                        <div className="flex justify-between text-[9px] text-slate-500 mt-2 font-bold uppercase">
                            <span>Establishment</span>
                            <span>Transition</span>
                            <span>Maturity</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 text-center leading-tight">
                            {plan2Year <= 3 ? 'Full Soy Production (270T)' : (plan2Year <= 6 ? 'Soy Reducing, Canopy Growing' : 'Canopy Closed, Full Nut Yield')}
                        </p>
                    </div>
                </>
            )}

            <Canvas shadows camera={{ position: getCameraPos() as [number, number, number], fov: 35 }}>
                {isPlan6 ? <Plan6Scene /> : (isPlan5 ? <Plan5Scene /> : (isPlan4 ? <Plan4Scene /> : (isPlan3b ? <Plan3BScene /> : (isPlan3 ? <Plan3Scene /> : (isPlan2 ? <Plan2Scene year={plan2Year} /> : (isPlan1 ? <Plan1Scene /> : <MasterScene />))))))}
                <OrbitControls 
                    enablePan={true}
                    enableZoom={true}
                    maxPolarAngle={Math.PI / 2.1}
                    maxDistance={500}
                    minDistance={20}
                    autoRotate={!isPlan1 && !isPlan2 && !isPlan3 && !isPlan3b && !isPlan4 && !isPlan5 && !isPlan6} 
                    autoRotateSpeed={0.2}
                />
            </Canvas>

            <div className="absolute bottom-6 right-6 pointer-events-none opacity-50">
                 {!isPlan2 && !isPlan3 && !isPlan3b && !isPlan4 && !isPlan5 && !isPlan6 && (
                     <div className="text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                        Live Render
                     </div>
                 )}
            </div>
        </div>
    );
};

export default Facility3D;
