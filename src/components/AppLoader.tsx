
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Zap, Database, ShieldCheck, CheckCircle2, Server, Wifi, Activity, Lock } from 'lucide-react';

interface AppLoaderProps {
  onComplete: () => void;
}

const AppLoader: React.FC<AppLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    { text: "ESTABLISHING SECURE UPLINK...", icon: Wifi },
    { text: "LOADING MASTER PLAN ASSETS...", icon: Database },
    { text: "INITIALIZING CLIMATE MODELS...", icon: Server },
    { text: "VERIFYING RESILIENCE PROTOCOLS...", icon: ShieldCheck },
    { text: "SYSTEM READY", icon: CheckCircle2 }
  ];

  useEffect(() => {
    // Simulate loading progress with variable speed for realism
    let currentProgress = 0;
    const interval = setInterval(() => {
      
      let increment = Math.random() * 5;
      
      if (currentProgress < 30) increment = Math.random() * 8; // Initial burst
      else if (currentProgress > 80) increment = Math.random() * 15; // Final sprint
      
      currentProgress += increment;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setProgress(100);
      } else {
        setProgress(currentProgress);
      }

    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      // Map progress 0-100 to status index 0-4
      const index = Math.min(Math.floor((progress / 100) * statuses.length), statuses.length - 1);
      setStatusIndex(index);

      if (progress === 100) {
          const timer = setTimeout(onComplete, 800); // Short hold at 100%
          return () => clearTimeout(timer);
      }
  }, [progress, onComplete, statuses.length]);

  const CurrentIcon = statuses[statusIndex].icon;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden font-sans selection:bg-emerald-500/30">
       
       {/* Background Matrix Effect */}
       <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
       </div>
       
       {/* Ambient Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse"></div>

       <div className="relative z-10 flex flex-col items-center max-w-md w-full px-8">
           
           {/* Logo / Icon Container */}
           <motion.div 
                className="mb-12 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
           >
                {/* Rotating Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-emerald-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-dashed border-emerald-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                <div className="relative w-28 h-28 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center shadow-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"></div>
                    <img 
                        src="https://i.postimg.cc/9Fp8zz5K/UAEI-Icon.png" 
                        alt="Ubuntu Logo" 
                        className="w-full h-full object-cover relative z-10 opacity-90 p-2" 
                    />
                    {/* Scanning Line Effect */}
                    <motion.div 
                        className="absolute top-0 left-0 right-0 h-1 bg-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.8)] z-20"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </div>
           </motion.div>

           {/* Progress Bar Track */}
           <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-6 relative border border-slate-800">
               {/* Progress Bar Fill */}
               <motion.div 
                   className="h-full bg-emerald-500 relative"
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                   transition={{ ease: "easeOut" }}
               >
                   {/* Leading edge glow */}
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-4 bg-emerald-400 blur-md"></div>
               </motion.div>
           </div>

           {/* Status Text & Percent */}
           <div className="w-full flex justify-between items-center text-slate-300 font-mono text-xs">
                <div className="flex items-center gap-3">
                     {progress === 100 ? (
                         <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                     ) : (
                         <CurrentIcon className="w-4 h-4 text-emerald-500 animate-pulse" />
                     )}
                     <span className="tracking-widest font-bold text-emerald-400">
                         {statuses[statusIndex].text}
                     </span>
                </div>
                <span className="font-bold text-slate-500">
                    {Math.round(progress).toString().padStart(3, '0')}%
                </span>
           </div>
           
           {/* Footer Security Badge */}
           <div className="mt-16 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 opacity-60">
               <Lock className="w-3 h-3 text-slate-500" />
               <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                   UAEI Encrypted Connection
               </span>
           </div>

       </div>
    </div>
  );
};

export default AppLoader;
