
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, ChevronRight, ChevronLeft, 
  Zap, Sprout, Droplets, Layers, TrendingUp, 
  CheckCircle2, ArrowRight, Mountain, Hammer, 
  Filter, ShieldCheck, Lock, Tractor
} from 'lucide-react';

// --- SCENE 1: THE ASSET ACQUISITION ---
const SceneAsset = () => (
  <div className="h-full flex flex-col justify-center items-center px-4 overflow-y-auto py-8 scrollbar-hide">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full items-center">
        
        {/* Left: The Deal */}
        <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3" />
                Investment Ready
            </div>
            <h3 className="text-3xl font-bold text-white">The Foundation Asset</h3>
            <p className="text-slate-400 leading-relaxed">
                Acquiring 445 hectares of premier title-deed land in Modimolle. 
                This isn't just dirt; it's a R57M going concern with R19M in existing infrastructure included at zero cost.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-xs uppercase font-bold">Land Cost</div>
                    <div className="text-2xl font-bold text-white">R26.88M</div>
                    <div className="text-emerald-500 text-xs">100% Land Bank Funded</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-xs uppercase font-bold">Included Assets</div>
                    <div className="text-2xl font-bold text-emerald-400">R19.05M</div>
                    <div className="text-slate-500 text-xs">Free Equity Day 1</div>
                </div>
            </div>
        </div>

        {/* Right: Visual Split */}
        <div className="relative h-80 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col sm:flex-row">
            {/* Cultivation Zone */}
            <motion.div 
                initial={{ flex: 0 }}
                animate={{ flex: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="bg-emerald-900/20 border-r border-emerald-500/30 relative group"
            >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <Sprout className="w-12 h-12 text-emerald-500 mb-2" />
                    <h4 className="text-emerald-400 font-bold uppercase tracking-widest">Cultivation</h4>
                    <p className="text-white font-bold text-2xl">220 Ha</p>
                    <div className="mt-4 space-y-1 text-xs text-emerald-300/70 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p>• 180ha Macadamias</p>
                        <p>• 40ha Veg Intensive</p>
                        <p>• 22ha Pecans (Overlap)</p>
                    </div>
                </div>
            </motion.div>

            {/* Wildlife Zone */}
            <motion.div 
                initial={{ flex: 0 }}
                animate={{ flex: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                className="bg-amber-900/20 relative group"
            >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <Mountain className="w-12 h-12 text-amber-500 mb-2" />
                    <h4 className="text-amber-400 font-bold uppercase tracking-widest">Wildlife</h4>
                    <p className="text-white font-bold text-2xl">220 Ha</p>
                    <div className="mt-4 space-y-1 text-amber-300/70 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p>• 700+ Game Animals</p>
                        <p>• 3,000T Manure/Yr</p>
                        <p>• Conservation Zone</p>
                    </div>
                </div>
            </motion.div>
            
            {/* Center Divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20 hidden sm:block">
                 <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-900 border border-slate-600 text-xs px-2 py-1 rounded text-white font-bold whitespace-nowrap">
                    50 / 50 Split
                 </div>
            </div>
        </div>
    </div>
  </div>
);

// --- SCENE 2: WATER MASTERY ---
const SceneWater = () => (
    <div className="h-full flex flex-col justify-center items-center px-4 overflow-y-auto py-8 scrollbar-hide">
        <div className="max-w-4xl w-full">
            <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">Hospital-Grade Water Security</h3>
                <p className="text-slate-400">9 Boreholes + 6-Stage Filtration + Magnetic Resonance = <span className="text-white font-bold">23% Yield Boost</span></p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 relative">
                {/* Source */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full md:w-48 p-4 bg-slate-900 rounded-xl border border-cyan-900/50 text-center"
                >
                    <div className="w-12 h-12 mx-auto bg-cyan-900/20 rounded-full flex items-center justify-center mb-2">
                        <Droplets className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="text-sm font-bold text-white">9 Boreholes</div>
                    <div className="text-xs text-slate-500">19,000 m³ Dam</div>
                </motion.div>

                <ArrowRight className="text-slate-600 hidden md:block" />

                {/* The Tech Stack */}
                <div className="flex-1 bg-slate-900/50 border border-slate-700 rounded-2xl p-6 relative overflow-hidden">
                     <div className="absolute inset-0 bg-cyan-500/5 animate-pulse"></div>
                     <div className="flex justify-between items-center relative z-10">
                         {[
                            { l: "Sediment", i: Filter },
                            { l: "Magnetic", i: Zap, h: true },
                            { l: "Reverse Osmosis", i: Layers },
                            { l: "UV Sterilisation", i: ShieldCheck }
                         ].map((step, idx) => (
                             <div key={idx} className="flex flex-col items-center gap-2">
                                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${step.h ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-slate-800 text-slate-400'}`}>
                                     <step.i className="w-5 h-5" />
                                 </div>
                                 <span className={`text-[10px] uppercase font-bold ${step.h ? 'text-cyan-400' : 'text-slate-500'}`}>{step.l}</span>
                             </div>
                         ))}
                     </div>
                     {/* Flow Line */}
                     <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -z-0"></div>
                </div>

                <ArrowRight className="text-slate-600 hidden md:block" />

                {/* Outcome */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full md:w-48 p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/50 text-center"
                >
                    <div className="w-12 h-12 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-2">
                        <Sprout className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div className="text-sm font-bold text-white">Premium Veg</div>
                    <div className="text-xs text-emerald-400">+23% Growth Rate</div>
                </motion.div>
            </div>
        </div>
    </div>
);

// --- SCENE 3: SOIL FACTORY (ROCK DUST) ---
const SceneRockDust = () => (
    <div className="h-full flex flex-col justify-center items-center px-4 overflow-y-auto py-8 scrollbar-hide">
        <div className="max-w-4xl w-full text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 border border-stone-600 text-stone-300 text-xs font-bold uppercase tracking-wider mb-8">
                <Mountain className="w-3 h-3" />
                Restoration Agriculture
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-12">The 500-Year Soil Capital Engine</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* Step 1 */}
                <motion.div 
                    className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col items-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="w-20 h-20 rounded-full bg-stone-900 border-4 border-stone-700 flex items-center justify-center mb-4">
                        <span className="text-2xl">🪨</span>
                    </div>
                    <h4 className="font-bold text-stone-300">Basalt Boulders</h4>
                    <p className="text-xs text-slate-500 mt-1">Inert Material</p>
                </motion.div>

                {/* Process */}
                <div className="relative h-32 md:h-auto flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-500/10 to-transparent md:bg-gradient-to-r"></div>
                    <div className="relative z-10 bg-slate-950 border border-slate-700 p-4 rounded-lg shadow-xl">
                         <div className="flex gap-3 text-stone-400">
                            <Hammer className="w-5 h-5 animate-bounce" />
                            <Zap className="w-5 h-5 animate-pulse text-yellow-500" />
                            <Filter className="w-5 h-5" />
                         </div>
                         <p className="text-[10px] font-bold uppercase text-center mt-2 text-slate-300">3-Stage Crush</p>
                    </div>
                    <div className="h-full w-0.5 bg-slate-700 md:w-full md:h-0.5 absolute z-0"></div>
                </div>

                {/* Step 3 */}
                <motion.div 
                    className="bg-gradient-to-b from-emerald-900/30 to-slate-900 border border-emerald-500/30 p-6 rounded-xl flex flex-col items-center shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="w-20 h-20 rounded-full bg-emerald-900/30 border-4 border-emerald-500 flex items-center justify-center mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50"></div>
                        <span className="text-xs font-bold text-emerald-400">{"<"}200µ</span>
                    </div>
                    <h4 className="font-bold text-emerald-400">Remineralized Soil</h4>
                    <p className="text-xs text-emerald-600 mt-1">50-500 Year Fertility</p>
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-12 grid grid-cols-2 gap-4 max-w-lg mx-auto"
            >
                <div className="bg-slate-800 p-3 rounded-lg">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Vegetable Brix</p>
                    <p className="text-xl font-bold text-white">4 <span className="text-slate-500 text-sm">→</span> <span className="text-emerald-400">10</span></p>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Price Premium</p>
                    <p className="text-xl font-bold text-emerald-400">+40%</p>
                </div>
            </motion.div>
        </div>
    </div>
);

// --- SCENE 4: ENERGY INDEPENDENCE ---
const SceneEnergy = () => (
    <div className="h-full flex flex-col justify-center items-center px-4 overflow-y-auto py-8 scrollbar-hide">
        <div className="max-w-4xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div className="space-y-6">
                     <h3 className="text-3xl font-bold text-amber-400">Complete Grid Immunity</h3>
                     <p className="text-slate-300">While competitors face Stage 8 load-shedding and diesel spikes, Plan 1 operates uninterrupted.</p>
                     
                     <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <div className="p-2 bg-amber-500/20 rounded text-amber-400"><Zap className="w-4 h-4" /></div>
                            <div>
                                <span className="block font-bold text-white">500 kVA Solar Array</span>
                                <span className="text-xs text-slate-500">490kW Peak Demand Covered</span>
                            </div>
                        </li>
                         <li className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded text-blue-400"><Layers className="w-4 h-4" /></div>
                            <div>
                                <span className="block font-bold text-white">2,000 kWh Battery</span>
                                <span className="text-xs text-slate-500">3-Day Full Autonomy</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/20 rounded text-emerald-400"><Tractor className="w-4 h-4" /></div>
                            <div>
                                <span className="block font-bold text-white">Bio-Diesel Fleet</span>
                                <span className="text-xs text-slate-500">Zero Fossil Fuel Cost</span>
                            </div>
                        </li>
                     </ul>
                 </div>

                 <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative overflow-hidden">
                     {/* Chart Bars */}
                     <div className="flex items-end gap-4 h-48 relative z-10">
                         <div className="w-1/2 flex flex-col justify-end gap-2">
                             <span className="text-center text-xs text-red-400 font-bold">Them</span>
                             <div className="h-[60%] w-full bg-red-900/30 rounded-t-lg border border-red-900/50 relative overflow-hidden">
                                 <div className="absolute inset-0 flex items-center justify-center text-red-500/50 font-bold -rotate-45">ESKOM</div>
                             </div>
                         </div>
                         <div className="w-1/2 flex flex-col justify-end gap-2">
                             <span className="text-center text-xs text-emerald-400 font-bold">Us</span>
                             <div className="h-[100%] w-full bg-emerald-500 rounded-t-lg shadow-[0_0_30px_rgba(16,185,129,0.4)] relative overflow-hidden">
                                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent"></div>
                                  <div className="absolute bottom-2 w-full text-center text-slate-900 font-bold text-sm">100%</div>
                             </div>
                         </div>
                     </div>
                     <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between text-sm">
                         <span className="text-slate-500">Annual Savings</span>
                         <span className="text-white font-bold">R 1.14 Million</span>
                     </div>
                 </div>
            </div>
        </div>
    </div>
);

// --- SCENE 5: FINANCIAL ENGINE ---
const SceneFinance = () => (
    <div className="h-full flex flex-col justify-center items-center px-4 overflow-y-auto py-8 scrollbar-hide">
        <div className="max-w-5xl w-full">
             <div className="text-center mb-8">
                 <div className="inline-block px-4 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-bold mb-4">
                    Year 1 Projections
                 </div>
                 <h2 className="text-4xl font-bold text-white mb-2">R 34,290,000</h2>
                 <p className="text-slate-400">Total Revenue Generated</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Revenue Card */}
                 <motion.div 
                    className="bg-slate-900 border border-emerald-500/30 p-6 rounded-2xl relative overflow-hidden"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                 >
                     <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={48} className="text-emerald-500" /></div>
                     <p className="text-slate-500 text-xs uppercase font-bold mb-1">Net Profit</p>
                     <p className="text-3xl font-bold text-white">R 22.0M</p>
                     <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-500 w-[64%]"></div>
                     </div>
                     <p className="text-xs text-emerald-400 mt-2 font-bold">64.1% Net Margin</p>
                 </motion.div>

                 {/* Debt Service */}
                 <motion.div 
                    className="bg-slate-900 border border-blue-500/30 p-6 rounded-2xl relative overflow-hidden"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                 >
                     <div className="absolute top-0 right-0 p-4 opacity-10"><Lock size={48} className="text-blue-500" /></div>
                     <p className="text-slate-500 text-xs uppercase font-bold mb-1">Bank Cover (DSCR)</p>
                     <p className="text-3xl font-bold text-white">3.48x</p>
                     <div className="flex items-center gap-2 mt-4">
                         <div className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-bold rounded">Target: 1.25x</div>
                         <span className="text-xs text-slate-400">Safe</span>
                     </div>
                 </motion.div>

                 {/* Employment */}
                 <motion.div 
                    className="bg-slate-900 border border-purple-500/30 p-6 rounded-2xl relative overflow-hidden"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                 >
                     <div className="absolute top-0 right-0 p-4 opacity-10"><Sprout size={48} className="text-purple-500" /></div>
                     <p className="text-slate-500 text-xs uppercase font-bold mb-1">Local Impact</p>
                     <p className="text-3xl font-bold text-white">85 Jobs</p>
                     <div className="grid grid-cols-2 gap-2 mt-4">
                         <div className="text-xs text-slate-400 border-l-2 border-purple-500 pl-2">
                             <span className="block font-bold text-white">R6.7M</span>
                             Wages
                         </div>
                         <div className="text-xs text-slate-400 border-l-2 border-purple-500 pl-2">
                             <span className="block font-bold text-white">370</span>
                             Indirect
                         </div>
                     </div>
                 </motion.div>
             </div>
        </div>
    </div>
);

const slides = [
  {
    id: 'asset',
    title: 'The Asset Acquisition',
    subtitle: '445 Hectares | R19M Included Assets',
    component: SceneAsset,
  },
  {
    id: 'water',
    title: 'Water Mastery',
    subtitle: 'Magnetic Filtration & 9 Boreholes',
    component: SceneWater,
  },
  {
    id: 'soil',
    title: 'The 500-Year Soil Factory',
    subtitle: 'Rock Dust Remineralization',
    component: SceneRockDust,
  },
  {
    id: 'energy',
    title: 'Energy Sovereignty',
    subtitle: '500kVA Solar & Grid Immunity',
    component: SceneEnergy,
  },
  {
    id: 'finance',
    title: 'The Financial Engine',
    subtitle: 'Year 1 Performance Metrics',
    component: SceneFinance,
  }
];

const Plan1Storyboard: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
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
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Header */}
        <div className="flex-none p-4 sm:p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex justify-between items-center z-10">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                        Plan 1: Core Farm
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

export default Plan1Storyboard;
