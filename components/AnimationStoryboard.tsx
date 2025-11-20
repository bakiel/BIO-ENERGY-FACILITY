
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, ChevronRight, ChevronLeft, 
  Zap, Leaf, Factory, Users, TrendingUp, ShieldCheck, 
  Recycle, Globe, Droplets, ArrowRight, Sprout, Truck, 
  Lock, RefreshCw, AlertTriangle, XCircle, CheckCircle2,
  Home, Bus, GraduationCap, Stethoscope, ShoppingBag, Building,
  Activity, Thermometer
} from 'lucide-react';

// --- SHARED CONSTANTS ---

const COLORS: Record<string, string> = {
    slate: '#64748b', gray: '#6b7280', zinc: '#71717a', neutral: '#737373', stone: '#78716c',
    red: '#ef4444', orange: '#f97316', amber: '#f59e0b', yellow: '#eab308', lime: '#84cc16',
    green: '#22c55e', emerald: '#10b981', teal: '#14b8a6', cyan: '#06b6d4', sky: '#0ea5e9',
    blue: '#3b82f6', indigo: '#6366f1', violet: '#8b5cf6', purple: '#a855f7', fuchsia: '#d946ef',
    pink: '#ec4899', rose: '#f43f5e'
};

const getColor = (name: string) => COLORS[name] || '#cbd5e1';

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
  <div className="h-full flex flex-col justify-center px-4 sm:px-12 max-w-5xl mx-auto overflow-y-auto py-8 scrollbar-hide">
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
  <div className="h-full flex flex-col justify-center items-center px-4 overflow-y-auto py-8 scrollbar-hide">
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
        <div className="h-full flex flex-col justify-center items-center px-4 overflow-y-auto py-8 scrollbar-hide">
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
    <div className="h-full flex flex-col justify-center items-center px-4 py-8 overflow-y-auto scrollbar-hide min-h-0">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative my-auto">
             {/* Stage 1 */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-6 rounded-xl bg-slate-900/50 border border-slate-800 w-64"
             >
                 <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 mx-auto">
                     <Leaf className="w-6 h-6 md:w-8 md:h-8 text-slate-500" />
                 </div>
                 <p className="text-slate-500 text-xs uppercase font-bold mb-1">Raw Nut</p>
                 <p className="text-xl md:text-2xl font-bold text-slate-400">R180<span className="text-xs text-slate-600">/kg</span></p>
                 <p className="text-xs text-slate-600 mt-2">Commodity Trap</p>
             </motion.div>

             <div className="flex flex-col items-center gap-2">
                <ArrowRight className="w-6 h-6 text-slate-600 rotate-90 lg:rotate-0" />
                <span className="text-[10px] uppercase font-bold text-slate-600">Processing</span>
             </div>

             {/* Stage 2 */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center relative p-8 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-amber-500/30 shadow-xl w-64 lg:w-72"
             >
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                    +567% Value Add
                 </div>
                 <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 shadow-[0_0_40px_rgba(245,158,11,0.4)] flex items-center justify-center mb-4 mx-auto z-10 relative">
                     <Factory className="w-8 h-8 md:w-10 md:h-10 text-white" />
                 </div>
                 <p className="text-amber-400 text-xs uppercase font-bold mb-1">Aged Cheese</p>
                 <p className="text-3xl md:text-4xl font-bold text-white">R1,200<span className="text-xs text-slate-400">/kg</span></p>
                 <p className="text-xs text-slate-400 mt-2">Premium Product</p>
             </motion.div>
        </div>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-8 lg:mt-12 bg-slate-900 border border-slate-800 p-4 rounded-lg text-center max-w-md flex-shrink-0"
        >
            <p className="text-sm text-slate-300">Vertical integration isn't optional. Capturing <span className="text-emerald-400 font-bold">R147.9M</span> in additional value.</p>
        </motion.div>
    </div>
);

// --- SCENE 5: CARBON REVERSAL ---
const SceneCarbon = () => (
    <div className="h-full flex flex-col justify-center items-center px-4 overflow-y-auto py-8 scrollbar-hide">
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
    <div className="h-full flex flex-col justify-center items-center px-8 max-w-4xl mx-auto overflow-y-auto py-8 scrollbar-hide">
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
        <div className="h-full flex flex-col justify-center items-center px-4 overflow-y-auto py-8 scrollbar-hide">
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

// --- SCENE 8: EMPLOYMENT MULTIPLIER (FIXED COLORS) ---
const SceneEmployment = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep(prev => (prev + 1) % 3);
        }, 4000); 
        return () => clearInterval(interval);
    }, []);

    const categories = [
        { label: "Housing", icon: Home, val: "R2.2k", angle: 0, color: "blue" },
        { label: "Food", icon: ShoppingBag, val: "R1.8k", angle: 60, color: "emerald" },
        { label: "Transport", icon: Bus, val: "R1.2k", angle: 120, color: "amber" },
        { label: "Education", icon: GraduationCap, val: "R900", angle: 180, color: "purple" },
        { label: "Health", icon: Stethoscope, val: "R750", angle: 240, color: "red" },
        { label: "Retail", icon: Building, val: "R520", angle: 300, color: "cyan" }
    ];

    return (
        <div className="flex flex-col h-full w-full overflow-hidden bg-slate-950">
            {/* 1. Top Phase Indicator (Compact) */}
            <div className="flex-none h-12 flex items-center justify-center z-20 relative mt-2">
                <div className="flex items-center bg-slate-900 p-1 rounded-full border border-slate-800 shadow-lg">
                    {[0, 1, 2].map(i => (
                        <div key={i} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${step === i ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>
                            {i === 0 ? 'Wage' : i === 1 ? 'Spend' : 'Impact'}
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Main Visualization (Responsive Fit) */}
            <div className="flex-1 min-h-0 relative flex items-center justify-center p-4">
                 {/* Responsive Container: Shrinks to fit height or width */}
                 <div className="relative h-full max-h-[400px] w-full max-w-[400px] aspect-square flex items-center justify-center">
                     
                     {/* Central Worker */}
                     <motion.div 
                        className="absolute z-20 w-[25%] h-[25%] bg-slate-900 rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)] border-4 border-slate-800"
                        animate={{ 
                            scale: step === 0 ? 1.2 : 1, 
                            borderColor: step === 0 ? '#10b981' : '#1e293b'
                        }}
                     >
                         <Users className="w-1/3 h-1/3 text-white mb-1" />
                         <div className="text-center">
                             <span className="text-[8px] font-bold text-slate-400 uppercase block">Wage</span>
                             <span className="text-xs md:text-sm font-bold text-emerald-400 leading-none block">R7.3k</span>
                         </div>
                     </motion.div>
                     
                     {/* Satellites */}
                     {categories.map((cat, i) => {
                         const angle = cat.angle;
                         const radius = 38; 
                         const hexColor = getColor(cat.color);
                         
                         return (
                            <motion.div
                                key={i}
                                className={`absolute w-[18%] h-[18%] rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center z-10 shadow-xl`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ 
                                    opacity: step >= 1 ? 1 : 0, 
                                    scale: step >= 1 ? 1 : 0,
                                    // Using explicit hex colors instead of vars to prevent parsing errors
                                    borderColor: step >= 1 ? hexColor : '#334155',
                                    left: step >= 1 ? `${50 + radius * Math.cos(angle * Math.PI / 180)}%` : '50%',
                                    top: step >= 1 ? `${50 + radius * Math.sin(angle * Math.PI / 180)}%` : '50%',
                                    x: '-50%',
                                    y: '-50%'
                                }}
                                transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                            >
                                 <cat.icon className={`w-[30%] h-[30%] text-${cat.color}-400 mb-0.5`} />
                                 <span className={`text-[6px] font-bold text-${cat.color}-200 uppercase`}>{cat.label}</span>
                            </motion.div>
                         );
                     })}
                     
                     {/* Ripple Effect */}
                     <AnimatePresence>
                        {step === 2 && (
                            <motion.div 
                                initial={{ scale: 0.3, opacity: 0 }}
                                animate={{ scale: [0.4, 1.2], opacity: [0.6, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                                className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full border border-emerald-500/40 z-0 pointer-events-none"
                            />
                        )}
                     </AnimatePresence>
                </div>
            </div>
            
            {/* 3. Footer Stats (Fixed Height) */}
            <div className="flex-none bg-slate-900/90 border-t border-slate-800 p-3 z-20">
                <div className="grid grid-cols-3 gap-2 md:gap-8 max-w-4xl mx-auto">
                    <div className="text-center">
                        <p className="text-slate-500 text-[10px] uppercase font-bold">Direct Wages</p>
                        <p className="text-lg font-bold text-white">R 50.3M</p>
                    </div>
                    <div className="text-center border-x border-slate-700 px-2">
                         <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Total Impact</p>
                         <p className="text-xl font-bold text-emerald-400">R 224.8 M</p>
                    </div>
                     <div className="text-center">
                        <p className="text-slate-500 text-[10px] uppercase font-bold">Multiplier</p>
                        <p className="text-lg font-bold text-blue-400">2.80x</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SCENE 9: EIGHT MANDATES (REFINED) ---
const SceneMandates = () => {
    const [activeMandate, setActiveMandate] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const mandates = [
        { l: "Agriculture", i: Sprout, c: "green", metric: "3.4M Fed", sub: "Food Security", desc: "Smallholder support & regenerative soil capital." },
        { l: "Energy", i: Zap, c: "amber", metric: "1.2M kWh", sub: "Renewables", desc: "Decentralized generation & grid independence." },
        { l: "Employment", i: Users, c: "blue", metric: "1,365 Jobs", sub: "Rural Dev", desc: "64% Wage premium in priority Limpopo zone." },
        { l: "Environment", i: Leaf, c: "emerald", metric: "-19k T CO₂", sub: "Net Zero", desc: "Carbon negative operations assisting national goals." },
        { l: "Trade", i: Globe, c: "purple", metric: "R39M Exp", sub: "BoT", desc: "High-value finished goods vs raw commodity export." },
        { l: "Water", i: Droplets, c: "cyan", metric: "429x Eff", sub: "Resource", desc: "Revenue per litre vs conventional farming." },
        { l: "Land Reform", i: CheckCircle2, c: "stone", metric: "100% Black", sub: "Ownership", desc: "Commercial scale success on restituted land." },
        { l: "Climate", i: Thermometer, c: "red", metric: "Negative", sub: "Transition", desc: "Proving green economy viability." }
    ];

    useEffect(() => {
        let interval: any;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setActiveMandate(prev => (prev + 1) % mandates.length);
            }, 3500);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, mandates.length]);

    const active = mandates[activeMandate];

    return (
        <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden bg-slate-950 relative">
             
             {/* GRAPHIC SIDE (LEFT/TOP) */}
             <div className="flex-1 relative flex items-center justify-center min-h-[300px] p-4 lg:p-8 overflow-hidden">
                 
                 {/* Background Ring */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                     <div className="w-[70%] aspect-square rounded-full border border-slate-500"></div>
                     <div className="absolute w-[40%] aspect-square rounded-full border border-slate-600"></div>
                 </div>

                 {/* Main Interactive Graph */}
                 <div className="relative w-full h-full max-h-[400px] max-w-[400px] aspect-square flex items-center justify-center">
                     
                     {/* Central Hub */}
                     <div className="absolute z-20 w-[28%] h-[28%] bg-slate-900 rounded-full flex flex-col items-center justify-center shadow-2xl border-2 border-slate-700 z-30 transition-all duration-300">
                         <div className={`absolute -inset-2 bg-emerald-500/10 rounded-full ${isAutoPlaying ? 'animate-pulse' : ''}`}></div>
                         <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeMandate}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                                className="text-center z-10 w-full px-1 flex flex-col items-center"
                            >
                                <div className={`p-1.5 rounded-full bg-${active.c}-900/30 mb-1 border border-${active.c}-500/20`}>
                                    <active.i className={`w-4 h-4 text-${active.c}-400`} />
                                </div>
                                <div className="text-[8px] font-bold text-white leading-tight">{active.l}</div>
                            </motion.div>
                         </AnimatePresence>
                     </div>

                     {/* Nodes */}
                     {mandates.map((m, i) => {
                         const angle = (i * 360) / 8 - 90; 
                         const isActive = i === activeMandate;
                         const radius = 42; // Percentage
                         
                         return (
                             <React.Fragment key={i}>
                                 {/* SVG Line Connector */}
                                 <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                                     <line 
                                        x1="50%" y1="50%" 
                                        x2={`${50 + radius * Math.cos(angle * Math.PI / 180)}%`}
                                        y2={`${50 + radius * Math.sin(angle * Math.PI / 180)}%`}
                                        // Use Hex color to be safe
                                        stroke={isActive ? getColor(m.c) : '#334155'}
                                        strokeWidth={isActive ? 2 : 1}
                                        strokeOpacity={isActive ? 0.6 : 0.2}
                                        strokeDasharray={isActive ? "0" : "4 4"}
                                        className="transition-all duration-500"
                                     />
                                 </svg>

                                 {/* Node */}
                                 <button
                                    onClick={() => { setIsAutoPlaying(false); setActiveMandate(i); }}
                                    className={`
                                        absolute w-[14%] h-[14%] rounded-full flex items-center justify-center z-20 border transition-all duration-500
                                        ${isActive 
                                            ? `bg-slate-900 border-${m.c}-500 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)] z-30` 
                                            : 'bg-slate-900 border-slate-700 text-slate-600 hover:border-slate-500 hover:text-slate-400 hover:scale-105'
                                        }
                                    `}
                                    style={{ 
                                        left: `${50 + radius * Math.cos(angle * Math.PI / 180)}%`, 
                                        top: `${50 + radius * Math.sin(angle * Math.PI / 180)}%`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                 >
                                     <m.i className={`w-[50%] h-[50%]`} />
                                 </button>
                             </React.Fragment>
                         );
                     })}
                 </div>
             </div>
             
             {/* INFO SIDE (RIGHT/BOTTOM) */}
             <div className="flex-none lg:w-80 bg-slate-900 lg:border-l border-t lg:border-t-0 border-slate-800 p-6 flex flex-col justify-center z-30 shadow-2xl">
                 
                 <div className="mb-6">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700 mb-4 shadow-sm">
                        <Activity className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Priority {activeMandate + 1}/8</span>
                    </div>
                    
                    <AnimatePresence mode='wait'>
                        <motion.div 
                            key={activeMandate}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className={`text-2xl font-bold text-${active.c}-400 mb-1`}>{active.l}</h3>
                            <div className="text-lg text-white font-bold mb-4">{active.metric} <span className="text-sm font-normal text-slate-500">| {active.sub}</span></div>
                            
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 shadow-inner">
                                <p className="text-slate-300 text-sm leading-relaxed font-medium">{active.desc}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                 </div>

                 {/* Mini Grid for quick selection */}
                 <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-800">
                     {mandates.map((m, i) => (
                         <button 
                            key={i}
                            onClick={() => { setIsAutoPlaying(false); setActiveMandate(i); }}
                            className={`
                                h-10 rounded-lg flex items-center justify-center transition-all
                                ${i === activeMandate 
                                    ? `bg-${m.c}-500/20 border border-${m.c}-500/50 text-${m.c}-400 ring-1 ring-${m.c}-500/50` 
                                    : 'bg-slate-800 border border-slate-700 text-slate-500 hover:bg-slate-700'
                                }
                            `}
                            title={m.l}
                         >
                             <m.i className="w-4 h-4" />
                         </button>
                     ))}
                 </div>
             </div>
        </div>
    );
};

// --- SCENE 10: DEMONSTRATION EFFECT ---
const SceneDemo = () => (
    <div className="h-full flex flex-col justify-center items-center px-4 overflow-y-auto py-8 scrollbar-hide">
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
    <div className="flex flex-col h-[85vh] min-h-[600px] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 animate-fade-in relative">
        
        {/* Background Grid Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Header */}
        <div className="flex-none p-4 sm:p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex justify-between items-center z-10">
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
        <div className="flex-1 relative overflow-hidden bg-slate-950 z-0 min-h-0">
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
        <div className="flex-none bg-slate-900 border-t border-slate-800 p-4 z-10 hidden sm:block">
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
