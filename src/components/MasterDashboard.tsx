
import React from 'react';
import { projects, masterPlanStats } from '../data/projects';
import { Wallet, TrendingUp, ArrowRight, Factory, Sprout, MapPin, CheckCircle2, Leaf, Truck, ShieldCheck, Zap, AlertTriangle, Droplets, Layers, Wind } from 'lucide-react';
import AudioButton from './AudioButton';
import { voiceScripts } from '../data/voiceScripts';

interface MasterDashboardProps {
  onSelectProject: (projectId: string) => void;
  isPlaying: boolean;
  currentPlayingId: string | null;
  isLoadingAudio: boolean;
  fetchAndPlayAudio: (text: string, id: string, title: string) => void;
  pauseAudio: () => void;
}

const UbuntuLogo = ({ className }: { className?: string }) => (
  <div className={`relative flex items-center justify-center rounded-full overflow-hidden shadow-lg ${className}`}>
      <img src="https://i.postimg.cc/9Fp8zz5K/UAEI-Icon.png" alt="Ubuntu Restoration Farms" className="w-full h-full object-cover" />
  </div>
);

const MasterDashboard: React.FC<MasterDashboardProps> = ({ onSelectProject, isPlaying, currentPlayingId, isLoadingAudio, fetchAndPlayAudio, pauseAudio }) => {
  const masterIntro = voiceScripts.masterDashboard.intro;

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      
      {/* HERO SECTION */}
      <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2671&auto=format&fit=crop" 
                alt="Aerial Farm View" 
                className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900"></div>
        </div>

        <div className="relative z-10 p-6 md:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
                
                {/* Left Column: Narrative */}
                <div className="max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                        <CheckCircle2 className="w-4 h-4" /> Alignment Verified: Corrected Plan
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <UbuntuLogo className="h-16 w-16 md:h-20 md:w-20 flex-shrink-0 ring-4 ring-slate-800" />
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-1">
                                The Corrected Master Plan
                            </h1>
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg">
                                <span>South Africa's First Integrated Regenerative Food System</span>
                                <AudioButton
                                    id="masterDashboard-intro"
                                    title={masterIntro.title}
                                    text={masterIntro.text}
                                    isPlaying={isPlaying}
                                    currentPlayingId={currentPlayingId}
                                    isLoadingAudio={isLoadingAudio}
                                    fetchAndPlayAudio={fetchAndPlayAudio}
                                    pauseAudio={pauseAudio}
                                />
                            </div>
                        </div>
                    </div>

                    <p className="text-lg text-slate-300 leading-relaxed font-light border-l-4 border-emerald-500 pl-6 mb-8">
                        Transforming 645 hectares of Limpopo soil into a <strong className="text-white">R1.24 billion revenue engine</strong>. 
                        We solve the diesel crisis with bio-energy sovereignty, the unemployment crisis with 1,205 jobs, 
                        and the climate crisis by sequestering 19,085 tonnes of carbon annually.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                            <p className="text-slate-400 text-[10px] uppercase font-bold mb-1">Total Investment</p>
                            <p className="text-xl md:text-2xl font-bold text-white">{masterPlanStats.totalInvestment}</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                            <p className="text-slate-400 text-[10px] uppercase font-bold mb-1">Year 7 Revenue</p>
                            <p className="text-xl md:text-2xl font-bold text-emerald-400">{masterPlanStats.blendedROI}</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                            <p className="text-slate-400 text-[10px] uppercase font-bold mb-1">Job Creation</p>
                            <p className="text-xl md:text-2xl font-bold text-blue-400">{masterPlanStats.totalJobs}</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                            <p className="text-slate-400 text-[10px] uppercase font-bold mb-1">Carbon Impact</p>
                            <p className="text-xl md:text-2xl font-bold text-teal-400">{masterPlanStats.totalImpact}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* CRISIS RESILIENCE MATRIX */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up">
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <AlertTriangle className="text-amber-500 h-5 w-5" />
                      Crisis Resilience Scenarios: Survival Analysis
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">"When everything breaks, Ubuntu continues." - Anti-fragile design matrix.</p>
              </div>
              <div className="px-3 py-1 rounded bg-emerald-100 text-emerald-700 text-xs font-bold uppercase">Verified Resilience</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-slate-200">
               {/* Scenario 1: Drought */}
               <div className="p-6 hover:bg-slate-50 transition-colors group">
                   <div className="flex items-center gap-2 mb-3 text-sky-600 font-bold text-sm uppercase">
                       <Droplets className="w-4 h-4" /> Severe Drought
                   </div>
                   <div className="space-y-2 text-sm">
                       <div className="flex justify-between">
                           <span className="text-slate-500">Competitor:</span>
                           <span className="text-red-500 font-bold">-70% Revenue</span>
                       </div>
                       <div className="flex justify-between">
                           <span className="text-slate-500">Ubuntu:</span>
                           <span className="text-emerald-600 font-bold">-2% Impact</span>
                       </div>
                       <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                           <strong>Why:</strong> 9 Boreholes (197M L) + Biochar soil retention + 19ML Dam.
                       </div>
                   </div>
               </div>

               {/* Scenario 2: Diesel */}
               <div className="p-6 hover:bg-slate-50 transition-colors group">
                   <div className="flex items-center gap-2 mb-3 text-amber-600 font-bold text-sm uppercase">
                       <Truck className="w-4 h-4" /> Diesel Collapse
                   </div>
                   <div className="space-y-2 text-sm">
                       <div className="flex justify-between">
                           <span className="text-slate-500">Competitor:</span>
                           <span className="text-red-500 font-bold">-55% Revenue</span>
                       </div>
                       <div className="flex justify-between">
                           <span className="text-slate-500">Ubuntu:</span>
                           <span className="text-emerald-600 font-bold">+5% Gain</span>
                       </div>
                       <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                           <strong>Why:</strong> 3.45M L Bio-diesel production + own logistics fleet.
                       </div>
                   </div>
               </div>

               {/* Scenario 3: Grid */}
               <div className="p-6 hover:bg-slate-50 transition-colors group">
                   <div className="flex items-center gap-2 mb-3 text-purple-600 font-bold text-sm uppercase">
                       <Zap className="w-4 h-4" /> Grid Failure
                   </div>
                   <div className="space-y-2 text-sm">
                       <div className="flex justify-between">
                           <span className="text-slate-500">Competitor:</span>
                           <span className="text-red-500 font-bold">-62% Revenue</span>
                       </div>
                       <div className="flex justify-between">
                           <span className="text-slate-500">Ubuntu:</span>
                           <span className="text-emerald-600 font-bold">0% Impact</span>
                       </div>
                       <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                           <strong>Why:</strong> 4.9MW Solar (Plan 5) + Battery + Bio-diesel Backup.
                       </div>
                   </div>
               </div>

               {/* Scenario 4: Perfect Storm */}
               <div className="p-6 bg-slate-50/50 group">
                   <div className="flex items-center gap-2 mb-3 text-slate-700 font-bold text-sm uppercase">
                       <Layers className="w-4 h-4" /> Multi-Crisis
                   </div>
                   <div className="space-y-2 text-sm">
                       <div className="flex justify-between">
                           <span className="text-slate-500">Competitor:</span>
                           <span className="text-red-500 font-bold">-85% Collapse</span>
                       </div>
                       <div className="flex justify-between">
                           <span className="text-slate-500">Ubuntu:</span>
                           <span className="text-emerald-600 font-bold">+3% Growth</span>
                       </div>
                       <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                           <strong>Why:</strong> Total sovereignty. Operating as if external systems don't exist.
                       </div>
                   </div>
               </div>
          </div>
      </div>

      {/* PORTFOLIO SECTION */}
      <div>
        <div className="flex items-end justify-between mb-8">
             <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Project Portfolio</h2>
                <p className="text-slate-500">Select a component to view the detailed investment model.</p>
             </div>
             <div className="hidden md:block text-right">
                 <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Capital Req.</p>
                 <p className="text-xl font-bold text-emerald-600">R 438.48 M</p>
             </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <div 
                    key={project.id}
                    onClick={() => onSelectProject(project.id)}
                    className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col relative"
                >
                    <div className={`h-2 w-full ${project.color}`}></div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                                {project.type === 'Bio-Energy' && <Zap className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                                {project.type === 'Energy' && <Zap className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                                {project.type === 'Processing' && <Factory className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                                {project.type === 'Agriculture' && <Sprout className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                                {project.type === 'Agro-Forestry' && <Leaf className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                                {project.type === 'Biotech' && <Leaf className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                            </div>
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                                project.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                                project.status === 'Investment Ready' ? 'bg-emerald-100 text-emerald-700' :
                                'bg-slate-100 text-slate-600'
                            }`}>
                                {project.status}
                            </span>
                        </div>
                        
                        <h4 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors flex items-center">
                          {project.name}
                        </h4>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3 flex items-center gap-1">
                             <MapPin className="w-3 h-3" /> {project.location}
                        </p>
                        <p className="text-sm text-slate-600 mb-6 flex-1 leading-relaxed line-clamp-3">{project.shortDesc}</p>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                            <div>
                                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Investment</span>
                                <span className="text-lg font-bold text-slate-900">{project.investment}</span>
                            </div>
                            <div>
                                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Impact</span>
                                <span className="text-lg font-bold text-emerald-600">{project.jobs} Jobs</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wide group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                        <span>View Model</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* CAPITAL STRUCTURE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-slate-500" />
              Capital Structure (R438.48M)
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 text-sm">
               <div className="lg:col-span-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <div className="text-slate-500 font-bold uppercase text-xs mb-1">Land Bank</div>
                   <div className="text-xl font-bold text-slate-900">R 77.05M</div>
                   <div className="text-xs text-slate-400">17.6%</div>
               </div>
               <div className="lg:col-span-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <div className="text-slate-500 font-bold uppercase text-xs mb-1">IDC (Infra)</div>
                   <div className="text-xl font-bold text-slate-900">R 120.0M</div>
                   <div className="text-xs text-slate-400">27.4%</div>
               </div>
               <div className="lg:col-span-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <div className="text-slate-500 font-bold uppercase text-xs mb-1">NEF (Transf)</div>
                   <div className="text-xl font-bold text-slate-900">R 63.7M</div>
                   <div className="text-xs text-slate-400">14.5%</div>
               </div>
               <div className="lg:col-span-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <div className="text-slate-500 font-bold uppercase text-xs mb-1">Grants</div>
                   <div className="text-xl font-bold text-slate-900">R 92.3M</div>
                   <div className="text-xs text-slate-400">21.0%</div>
               </div>
               <div className="lg:col-span-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <div className="text-slate-500 font-bold uppercase text-xs mb-1">Working Cap</div>
                   <div className="text-xl font-bold text-slate-900">R 85.4M</div>
                   <div className="text-xs text-slate-400">19.5%</div>
               </div>
          </div>
      </div>
    </div>
  );
};

export default MasterDashboard;
