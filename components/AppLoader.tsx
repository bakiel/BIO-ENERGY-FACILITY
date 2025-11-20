
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Zap, Database, ShieldCheck, CheckCircle2, Server, Wifi, Activity } from 'lucide-react';

interface AppLoaderProps {
  onComplete: () => void;
}

const AppLoader: React.FC<AppLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    { text: "Establishing Secure Connection...", icon: Wifi },
    { text: "Loading Master Plan Assets...", icon: Database },
    { text: "Initializing Climate Models...", icon: Server },
    { text: "Verifying Data Integrity...", icon: ShieldCheck },
    { text: "System Ready", icon: CheckCircle2 }
  ];

  useEffect(() => {
    // Simulate loading progress
    // Start fast, slow down in middle, fast at end
    let currentProgress = 0;
    const interval = setInterval(() => {
      
      let increment = Math.random() * 5;
      
      if (currentProgress < 30) increment = Math.random() * 10; // Initial burst
      else if (currentProgress > 80) increment = Math.random() * 15; // Final sprint
      
      currentProgress += increment;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setProgress(100);
      } else {
        setProgress(currentProgress);
      }

    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      // Map progress 0-100 to status index 0-4
      const index = Math.min(Math.floor((progress / 100) * statuses.length), statuses.length - 1);
      setStatusIndex(index);

      if (progress === 100) {
          const timer = setTimeout(onComplete, 1200); // Hold at 100% for a moment
          return () => clearTimeout(timer);
      }
  }, [progress, onComplete, statuses.length]);

  const CurrentIcon = statuses[statusIndex].icon;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden font-sans">
       
       {/* Animated Background Grid */}
       <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
       </div>
       
       {/* Ambient Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>

       <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-8">
           
           {/* Logo Container */}
           <motion.div 
                className="mb-16 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
           >
                {/* Ripple Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-emerald-500/30 rounded-full animate-[ping_3s_linear_infinite]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-emerald-500/10 rounded-full animate-[ping_3s_linear_infinite_1s]"></div>

                <div className="relative w-24 h-24 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center shadow-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"></div>
                    <img 
                        src="https://i.postimg.cc/9Fp8zz5K/UAEI-Icon.png" 
                        alt="Ubuntu Logo" 
                        className="w-full h-full object-cover relative z-10 opacity-90" 
                    />
                    {/* Scanning Line */}
                    <motion.div 
                        className="absolute top-0 left-0 right-0 h-1 bg-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.8)] z-20"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
           </motion.div>

           {/* Status Indicator */}
           <div className="w-full flex justify-between items-end mb-2">
               <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                   <Activity className="w-3 h-3 animate-pulse" />
                   System Initialization
               </span>
               <span className="text-xs font-mono text-slate-400">{Math.round(progress)}%</span>
           </div>

           {/* Progress Bar Track */}
           <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-8 relative">
               {/* Progress Bar Fill */}
               <motion.div 
                   className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 relative"
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                   transition={{ ease: "easeOut" }}
               >
                   {/* Leading edge glow */}
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full blur-[2px] shadow-[0_0_10px_#fff]"></div>
               </motion.div>
           </div>

           {/* Dynamic Text */}
           <div className="h-10 flex items-center justify-center gap-3 text-slate-300 font-medium text-sm">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={statusIndex}
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2"
                    >
                         {progress === 100 ? (
                             <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                         ) : (
                             <div className="relative">
                                <CurrentIcon className="w-4 h-4 text-slate-400" />
                                <div className="absolute inset-0 bg-emerald-400/20 blur-sm rounded-full animate-pulse"></div>
                             </div>
                         )}
                         <span className={progress === 100 ? "text-emerald-400 font-bold" : "text-slate-300"}>
                             {statuses[statusIndex].text}
                         </span>
                    </motion.div>
                </AnimatePresence>
           </div>
           
           <div className="mt-12 text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">
               Powered by UAEI Infrastructure
           </div>

       </div>
    </div>
  );
};

export default AppLoader;
    