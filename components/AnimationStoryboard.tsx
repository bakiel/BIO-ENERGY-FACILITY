
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, ChevronRight, ChevronLeft, 
  Zap, Leaf, Factory, Users, TrendingUp, ShieldCheck, 
  Recycle, Globe, Droplets, Layers, Scale, AlertTriangle, 
  CheckCircle2, ArrowRight, Sprout, Battery, Truck, DollarSign, 
  Umbrella, Lock, RefreshCw, LineChart, Thermometer, Activity, XCircle
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-slate-900/50 border border-slate-800 rounded-xl p-4 sm:p-6 backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

const Stat = ({ label, value, sub, color = "text-white", icon: Icon }: any) => (
  <div className="flex items-start gap-3">
    {Icon && <div className={`p-2 rounded-lg bg-slate-800 ${color.replace('text-', 'text-').replace('500', '400')}`}><Icon className="w-5 h-5" /></div>}
    <div>
      <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold mb-0.5">{label}</p>
      <p className={`text-xl sm:text-3xl font-bold ${color}`}>{value}</p>
      <p className="text-slate-400 text-xs mt-0.5">{sub}</p>
    </div>
  </div>
);

// --- SCENE 1: THE IMPOSSIBLE SCALE ---
const SceneScale = () => (
  <div className="h-full flex flex-col justify-center px-4 sm:px-12 max-w-5xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
       {/* Conventional */}
       <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 p-6 rounded-2xl opacity-50"
       >
          <div className="flex items-center gap-2 mb-6 opacity-70">
             <div className="w-3 h-3 rounded-full bg-slate-500"></div>
             <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm">Typical R400M Farm</h3>
          </div>
          <div className="space-y-6">
              <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-400"><span>Jobs</span><span>200-400</span></div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-600 w-[20%]"></div>
                  </div>
              </div>
              <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-400"><span>EBITDA Margin</span><span>30%</span></div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-600 w-[30%]"></div>
                  </div>
              </div>
              <div className="flex gap-2 mt-4">
                 <span className="px-2 py-1 rounded bg-red-900/20 text-red-400 text-xs border border-red-900/30">Eskom Dependent</span>
                 <span className="px-2 py-1 rounded bg-red-900/20 text-red-400 text-xs border border-red-900/30">Net Emitter</span>
              </div>
          </div>
       </motion.div>

       {/* Ubuntu */}
       <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-b from-slate-800 to-slate-900 border border-emerald-500/30 p-6 sm:p-8 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden"
       >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500"></div>
          <div className="flex items-center gap-2 mb-8">
             <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
             <h3 className="text-white font-bold uppercase tracking-widest text-sm">Ubuntu Restoration</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
             <Stat label="Total Jobs" value="1,365" sub="6x Multiplier" color="text-white" icon={Users} />
             <Stat label="EBITDA" value="65.2%" sub="2x Industry Avg" color="text-emerald-400" icon={TrendingUp} />
             <Stat label="Energy" value="100%" sub="Off-Grid" color="text-amber-400" icon={Zap} />
             <Stat label="Carbon" value="-19k T" sub="Net Negative" color="text-blue-400" icon={Leaf} />
          </div>
       </motion.div>
    </div>
  </div>
);

// --- SCENE 2: THREE SOVEREIGNTIES ---
const SceneSovereignties = () => (
  <div className="h-full flex flex-col justify-center items-center px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
       {[
         { title: "Energy", icon: Zap, color: "amber", desc: "Sun + Waste = 100% Power", sub: "Zero Eskom" },
         { title: "Feedstock", icon: Sprout, color: "green", desc: "Estate Grown Inputs", sub: "Zero Supply Chain" },
         { title: "Logistics", icon: Truck, color: "blue", desc: "Own Bio-Fleet", sub: "Zero 3rd Party" }
       ].map((item, i) => (
         <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className={`bg-slate-900/50 border border-${item.color}-500/30 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-slate-800 transition-colors group`}
         >
             <div className={`w-16 h-16 rounded-full bg-${item.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-${item.color}-500/20`}>
                <item.icon className={`w-8 h-8 text-${item.color}-500`} />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">{item.title} Sovereignty</h3>
             <p className="text-slate-400 text-sm mb-4">{item.desc}</p>
             <div className={`px-3 py-1 rounded-full bg-${item.color}-900/30 text-${item.color}-400 text-xs font-bold border border-${item.color}-500/30`}>
                {item.sub}
             </div>
         </motion.div>
       ))}
    </div>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-12 flex items-center gap-2 text-slate-400 bg-slate-900 px-6 py-3 rounded-full border border-slate-800"
    >
       <Lock className="w-4 h-4 text-emerald-500" />
       <span className="text-sm">When crises hit, others stop. <span className="text-white font-bold">Ubuntu continues.</span></span>
    </motion.div>
  </div>
);

// --- SCENE 3: THE CIRCULAR CASCADE ---
const SceneCascade = () => {
    const flows = [
        { from: "Wildlife Manure", to: "Vegetables", val: "Compost", color: "amber" },
        { from: "Tree Prunings", to: "Mushrooms", val: "Substrate", color: "emerald" },
        { from: "Agri-Residue", to: "Bio-Diesel", val: "Fuel", color: "blue" },
    ];

    return (
        <div className="h-full flex flex-col justify-center items-center px-4">
            <div className="relative max-w-4xl w-full space-y-4">
                {flows.map((flow, i) => (
                    <motion.div 
                        key={i}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.3 }}
                        className="flex items-center gap-4"
                    >
                        <div className="w-40 text-right text-slate-400 text-sm font-medium">{flow.from}</div>
                        <div className="flex-1 h-12 bg-slate-900 border border-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center group">
                             <div className={`absolute inset-0 bg-gradient-to-r from-${flow.color}-900/20 to-transparent`}></div>
                             <motion.div 
                                className={`absolute left-0 h-0.5 bg-${flow.color}-500 w-full top-1/2`}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: i * 0.3 + 0.2, duration: 0.5 }}
                             ></motion.div>
                             <div className={`px-3 py-1 rounded bg-slate-950 border border-${flow.color}-500/30 text-${flow.color}-400 text-xs font-bold z-10`}>
                                {flow.val}
                             </div>
                        </div>
                        <div className="w-40 text-left text-white font-bold">{flow.to}</div>
                    </motion.div>
                ))}
            </div>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-12 text-center"
            >
                 <div className="inline-flex items-center gap-2 text-emerald-400 mb-2">
                    <RefreshCw className="w-5 h-5 animate-spin-slow" />
                    <span className="font-bold uppercase tracking-widest text-sm">Zero Waste System</span>
                 </div>
                 <p className="text-slate-500 text-sm">"Waste is a design failure, not a category."</p>
            </motion.div>
        </div>
    );
};

// --- SCENE 4: VALUE MULTIPLICATION ---
const SceneValue = () => (
    <div className="h-full flex flex-col justify-center items-center px-4">
        <div className="flex items-center gap-4 md:gap-12 relative">
             {/* Stage 1 */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
             >
                 <div className="w-24 h-24 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 mx-auto">
                     <Leaf className="w-10 h-10 text-slate-500" />
                 </div>
                 <p className="text-slate-500 text-xs uppercase font-bold">Raw Nut</p>
                 <p className="text-2xl font-bold text-slate-400">R180<span className="text-xs text-slate-600">/kg</span></p>
             </motion.div>

             <ArrowRight className="w-8 h-8 text-slate-700" />

             {/* Stage 2 */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center relative"
             >
                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-500 text-slate-900 text-xs font-bold px-2 py-1 rounded">
                    +567% Value Add
                 </div>
                 <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 shadow-[0_0_40px_rgba(245,158,11,0.4)] flex items-center justify-center mb-4 mx-auto z-10 relative">
                     <Factory className="w-14 h-14 text-white" />
                 </div>
                 <p className="text-amber-400 text-xs uppercase font-bold">Aged Cheese</p>
                 <p className="text-4xl font-bold text-white">R1,200<span className="text-xs text-slate-400">/kg</span></p>
             </motion.div>
        </div>
        <div className="mt-12 bg-slate-900 border border-slate-800 p-4 rounded-lg text-center max-w-md">
            <p className="text-sm text-slate-300">Vertical integration isn't optional. Capturing <span className="text-emerald-400 font-bold">R147.9M</span> in additional value.</p>
        </div>
    </div>
);

// --- SCENE 5: CARBON REVERSAL ---
const SceneCarbon = () => (
    <div className="h-full flex flex-col justify-center items-center px-4">
        <div className="grid grid-cols-2 gap-8 md:gap-16 w-full max-w-4xl">
            <div className="text-center opacity-50">
                <h3 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-6">Conventional Farm</h3>
                <div className="space-y-2">
                    {['Fertilizer', 'Diesel', 'Soil Loss'].map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: -20, opacity: 1 }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                            className="flex justify-center"
                        >
                            <div className="flex items-center gap-2 text-red-500/50 font-bold">
                                <ArrowRight className="-rotate-90 w-4 h-4" /> {item}
                            </div>
                        </motion.div>
                    ))}
                </div>
                <p className="mt-8 text-xl font-bold text-red-400">+4,500 T</p>
                <p className="text-xs text-slate-500">Emitted / Year</p>
            </div>

            <div className="text-center bg-slate-900/50 rounded-2xl border border-emerald-500/20 p-6">
                <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6">Ubuntu Model</h3>
                 <div className="space-y-2">
                    {['Trees (-9k)', 'Biochar (-7.5k)', 'Bio-Diesel (-4k)'].map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 10, opacity: 1 }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                            className="flex justify-center"
                        >
                            <div className="flex items-center gap-2 text-emerald-400 font-bold">
                                <ArrowRight className="rotate-90 w-4 h-4" /> {item}
                            </div>
                        </motion.div>
                    ))}
                </div>
                <p className="mt-8 text-3xl font-bold text-white">-19,085 T</p>
                <p className="text-xs text-emerald-400 font-bold">Sequestered / Year</p>
            </div>
        </div>
    </div>
);

// --- SCENE 6: SOIL TIME MACHINE ---
const SceneSoil = () => (
    <div className="h-full flex flex-col justify-center items-center px-8 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-white mb-8">Soil Fertility Timeline</h3>
        <div className="w-full space-y-8">
             <div>
                 <div className="flex justify-between text-xs text-slate-400 mb-2 uppercase font-bold">
                     <span>Conventional (Mining)</span>
                     <span className="text-red-400">Depletion</span>
                 </div>
                 <div className="h-4 bg-slate-800 rounded-full overflow-hidden flex">
                     <motion.div 
                        initial={{ width: '100%' }}
                        animate={{ width: '0%' }}
                        transition={{ duration: 4, ease: "linear" }}
                        className="h-full bg-gradient-to-r from-slate-600 to-red-900"
                     />
                 </div>
             </div>

             <div>
                 <div className="flex justify-between text-xs text-slate-400 mb-2 uppercase font-bold">
                     <span>Ubuntu (Banking)</span>
                     <span className="text-emerald-400">500 Year Capital</span>
                 </div>
                 <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative">
                     <motion.div 
                        initial={{ width: '10%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4, ease: "linear" }}
                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                     />
                 </div>
             </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-12 w-full">
             <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-center">
                 <div className="text-xs text-slate-500 uppercase">Input</div>
                 <div className="text-lg font-bold text-white">Rock Dust</div>
             </div>
             <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-center">
                 <div className="text-xs text-slate-500 uppercase">Effect</div>
                 <div className="text-lg font-bold text-emerald-400">Remineralize</div>
             </div>
             <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-center">
                 <div className="text-xs text-slate-500 uppercase">Outcome</div>
                 <div className="text-lg font-bold text-white">Legacy</div>
             </div>
        </div>
    </div>
);

// --- SCENE 7: CRISIS IMMUNITY ---
const SceneCrisis = () => {
    const [crisis, setCrisis] = useState(0);
    const crises = [
        { name: "Diesel Shortage", impact: "Logistics Halt", ubuntu: "Bio-Fleet Running" },
        { name: "Stage 8 Loadshedding", impact: "Cold Chain Fail", ubuntu: "100% Solar Uptime" },
        { name: "Fertilizer Spike", impact: "Margin Collapse", ubuntu: "Zero Exposure" }
    ];

    useEffect(() => {
        const timer = setInterval(() => setCrisis(c => (c + 1) % 3), 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-full flex flex-col justify-center items-center px-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-2 inline-flex items-center gap-2 mb-8">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span className="text-amber-500 font-bold uppercase tracking-widest text-sm">Stress Test Scenario: {crises[crisis].name}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-12 w-full max-w-4xl">
                {/* Them */}
                <div className="bg-slate-900/50 border border-red-900/30 p-8 rounded-2xl text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-900/5 animate-pulse"></div>
                    <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-red-400 font-bold uppercase text-sm mb-2">Conventional</h3>
                    <p className="text-2xl font-bold text-white">{crises[crisis].impact}</p>
                    <p className="text-xs text-slate-500 mt-2">Operations Halted</p>
                </div>

                {/* Us */}
                <div className="bg-emerald-900/10 border border-emerald-500/30 p-8 rounded-2xl text-center relative overflow-hidden">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-emerald-400 font-bold uppercase text-sm mb-2">Ubuntu Model</h3>
                    <p className="text-2xl font-bold text-white">{crises[crisis].ubuntu}</p>
                    <p className="text-xs text-emerald-500/70 mt-2">Business as Usual</p>
                </div>
            </div>
        </div>
    );
};

// --- SCENE 8: EMPLOYMENT MULTIPLIER ---
const SceneEmployment = () => (
    <div className="h-full flex flex-col justify-center items-center px-4 relative">
        <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
             {/* Center */}
             <motion.div 
                className="absolute z-10 w-24 h-24 bg-emerald-600 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-slate-900"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
             >
                 <Users className="w-8 h-8 text-white mb-1" />
                 <span className="text-[10px] font-bold text-white uppercase">Ubuntu</span>
             </motion.div>
             
             {/* Satellites */}
             {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                 <motion.div
                    key={i}
                    className="absolute w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700"
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ 
                        opacity: 1, 
                        x: Math.cos(deg * Math.PI / 180) * 140, 
                        y: Math.sin(deg * Math.PI / 180) * 140 
                    }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                 >
                     <DollarSign className="w-6 h-6 text-emerald-400" />
                 </motion.div>
             ))}

             {/* Ripple */}
             <motion.div 
                className="absolute inset-0 rounded-full border border-emerald-500/20"
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2 }}
             />
        </div>
        <div className="text-center mt-8">
            <p className="text-2xl font-bold text-white">R 224.8 Million</p>
            <p className="text-slate-400 text-sm">Annual Community Economic Injection</p>
        </div>
    </div>
);

// --- SCENE 9: EIGHT MANDATES ---
const SceneMandates = () => {
    const mandates = [
        { l: "Food", i: ShieldCheck, c: "emerald" },
        { l: "Energy", i: Zap, c: "amber" },
        { l: "Jobs", i: Users, c: "blue" },
        { l: "Climate", i: Leaf, c: "green" },
        { l: "Trade", i: Globe, c: "purple" },
        { l: "Water", i: Droplets, c: "cyan" },
        { l: "Land", i: Sprout, c: "stone" },
        { l: "Growth", i: LineChart, c: "indigo" }
    ];

    return (
        <div className="h-full flex flex-col justify-center items-center px-4 relative">
             <div className="relative w-full max-w-md aspect-square">
                 {/* Center Logo */}
                 <div className="absolute inset-0 flex items-center justify-center z-20">
                     <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                        <img src="https://i.postimg.cc/9Fp8zz5K/UAEI-Icon.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
                     </div>
                 </div>

                 {/* Mandates */}
                 {mandates.map((m, i) => {
                     const angle = (i * 360) / 8;
                     const rad = angle * (Math.PI / 180);
                     const x = 50 + 35 * Math.cos(rad);
                     const y = 50 + 35 * Math.sin(rad);
                     
                     return (
                         <motion.div
                            key={i}
                            className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center z-10"
                            style={{ left: `${x}%`, top: `${y}%` }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                         >
                             <m.i className={`w-5 h-5 text-${m.c}-400`} />
                             
                             {/* Line to center */}
                             <svg className="absolute top-1/2 left-1/2 w-[200px] h-[2px] -z-10" style={{ 
                                 transform: `rotate(${angle + 180}deg)`, 
                                 transformOrigin: '0 0' 
                             }}>
                                 <motion.rect 
                                    width="100" height="2" fill={`var(--${m.c}-500)`} 
                                    initial={{ width: 0 }}
                                    animate={{ width: 80 }}
                                    transition={{ delay: 0.8 + (i * 0.1), duration: 0.5 }}
                                 />
                             </svg>
                         </motion.div>
                     );
                 })}
             </div>
             <p className="mt-4 text-slate-400 text-sm">8 Government Priorities. <span className="text-white font-bold">Zero Trade-offs.</span></p>
        </div>
    );
};

// --- SCENE 10: DEMONSTRATION EFFECT ---
const SceneDemo = () => (
    <div className="h-full flex flex-col justify-center items-center px-4">
        <div className="grid grid-cols-3 gap-8 mb-12 w-full max-w-3xl text-center">
             <div className="space-y-4 opacity-40">
                 <div className="w-16 h-16 mx-auto bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
                     <Factory className="w-8 h-8 text-slate-500" />
                 </div>
                 <div className="text-xs uppercase font-bold text-slate-500">Phase 1</div>
                 <div className="font-bold text-white">Proof of Concept</div>
             </div>
             
             <div className="space-y-4">
                 <div className="w-20 h-20 mx-auto bg-emerald-900/20 rounded-xl flex items-center justify-center border border-emerald-500 animate-pulse">
                     <div className="grid grid-cols-2 gap-1">
                        {[1,2,3,4].map(n => <Factory key={n} className="w-3 h-3 text-emerald-400" />)}
                     </div>
                 </div>
                 <div className="text-xs uppercase font-bold text-emerald-400">Phase 2</div>
                 <div className="font-bold text-white">Regional Hub</div>
             </div>

             <div className="space-y-4 opacity-60">
                 <div className="w-16 h-16 mx-auto bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 overflow-hidden relative">
                     <div className="grid grid-cols-4 gap-0.5 opacity-50">
                        {[...Array(16)].map((_,n) => <div key={n} className="w-1 h-1 bg-slate-400 rounded-full"></div>)}
                     </div>
                 </div>
                 <div className="text-xs uppercase font-bold text-slate-500">Phase 3</div>
                 <div className="font-bold text-white">Sector Change</div>
             </div>
        </div>
        <div className="bg-gradient-to-r from-emerald-900/50 to-slate-900 p-6 rounded-xl border border-emerald-500/20 max-w-2xl w-full text-center">
             <p className="text-lg sm:text-xl text-slate-200 font-light italic">
                "Ubuntu isn't just a farm. It's sector transformation infrastructure."
             </p>
        </div>
    </div>
);

const slides = [
  {
    id: 'scale',
    title: 'The Impossible Scale',
    subtitle: 'Redefining what R438M can achieve',
    component: SceneScale,
  },
  {
    id: 'sovereignty',
    title: 'The Three Sovereignties',
    subtitle: 'Complete independence from external shocks',
    component: SceneSovereignties,
  },
  {
    id: 'cascade',
    title: 'The Circular Cascade',
    subtitle: 'Where waste becomes revenue',
    component: SceneCascade,
  },
  {
    id: 'value',
    title: 'Value Multiplication',
    subtitle: 'Capturing the full value chain',
    component: SceneValue,
  },
  {
    id: 'carbon',
    title: 'The Carbon Reversal',
    subtitle: 'From emitter to sink',
    component: SceneCarbon,
  },
  {
    id: 'soil',
    title: 'The Soil Time Machine',
    subtitle: 'Banking capital for 500 years',
    component: SceneSoil,
  },
  {
    id: 'crisis',
    title: 'Crisis Immunity',
    subtitle: 'Anti-fragile by design',
    component: SceneCrisis,
  },
  {
    id: 'employment',
    title: 'Employment Multiplier',
    subtitle: 'Transforming entire communities',
    component: SceneEmployment,
  },
  {
    id: 'mandates',
    title: 'Eight Mandates Convergence',
    subtitle: 'Solving government priorities simultaneously',
    component: SceneMandates,
  },
  {
    id: 'demo',
    title: 'The Demonstration Effect',
    subtitle: 'Catalyzing sector-wide transformation',
    component: SceneDemo,
  }
];

const AnimationStoryboard: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000); // 6 Seconds per slide
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const CurrentComponent = slides[currentSlide].component;

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 animate-fade-in relative">
        
        {/* Background Grid Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex justify-between items-center z-10">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                        Visual Moment {currentSlide + 1} / {slides.length}
                    </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{slides[currentSlide].title}</h2>
                <p className="text-slate-400 text-xs sm:text-sm">{slides[currentSlide].subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`p-3 rounded-full transition-all duration-300 ${isPlaying ? 'bg-emerald-500 text-slate-900 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'}`}
                >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
            </div>
        </div>

        {/* Stage */}
        <div className="flex-1 relative overflow-hidden bg-slate-950 z-0">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="h-full w-full"
                >
                    <CurrentComponent />
                </motion.div>
            </AnimatePresence>

            {/* Side Navigation Areas */}
            <div className="absolute inset-y-0 left-0 w-16 sm:w-24 flex items-center justify-start pl-2 sm:pl-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button onClick={prevSlide} className="p-2 rounded-full bg-slate-800/80 text-white backdrop-blur-sm hover:bg-emerald-500 hover:text-slate-900 transition-all transform hover:scale-110 shadow-lg border border-slate-700">
                    <ChevronLeft className="w-6 h-6" />
                </button>
            </div>
            <div className="absolute inset-y-0 right-0 w-16 sm:w-24 flex items-center justify-end pr-2 sm:pr-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button onClick={nextSlide} className="p-2 rounded-full bg-slate-800/80 text-white backdrop-blur-sm hover:bg-emerald-500 hover:text-slate-900 transition-all transform hover:scale-110 shadow-lg border border-slate-700">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>

        {/* Footer / Timeline */}
        <div className="bg-slate-900 border-t border-slate-800 p-4 z-10">
             {/* Progress Bar */}
             <div className="h-1 bg-slate-800 w-full rounded-full overflow-hidden mb-4">
                <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            {/* Dot Navigation */}
            <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                {slides.map((slide, idx) => (
                    <button
                        key={slide.id}
                        onClick={() => setCurrentSlide(idx)}
                        className={`
                            group relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-300
                            ${currentSlide === idx 
                                ? 'bg-emerald-500 text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-110' 
                                : 'bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-slate-300 border border-slate-700'
                            }
                        `}
                    >
                        {idx + 1}
                        {/* Tooltip */}
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700 z-50">
                            {slide.title}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
};

export default AnimationStoryboard;
