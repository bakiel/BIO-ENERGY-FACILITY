import React from 'react';
import { projects, masterPlanStats } from '../data/projects';
import { Map, Users, Wallet, TrendingUp, ArrowRight, Factory, Sprout, Droplets, Sun, Beaker, Layout, MapPin, CheckCircle2 } from 'lucide-react';
import Facility3D from './Facility3D';
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
    <div className="space-y-8 animate-fade-in">
      {/* Master Stats Header */}
      <div className="bg-slate-900 rounded-2xl p-4 md:p-8 text-white relative overflow-hidden shadow-xl group">
        <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" 
                alt="Farm Panorama" 
                className="w-full h-full object-cover opacity-20 group-hover:opacity-25 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/50"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="max-w-3xl">
                <div className="flex items-center gap-3 md:gap-5 mb-6">
                    <UbuntuLogo className="h-16 w-16 md:h-20 md:w-20 flex-shrink-0" />
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight flex items-center">
                          Ubuntu Restoration Farms
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
                        </h2>
                        <p className="text-emerald-400 font-bold text-sm md:text-lg">South Africa's First Integrated Regenerative Food System</p>
                    </div>
                </div>
                
                <p className="text-slate-300 text-sm md:text-lg leading-relaxed mb-6 border-l-4 border-emerald-500/50 pl-4">
                    A 21-Year Vision Becoming Reality. Transforming 645 hectares of Limpopo soil into a <span className="text-white font-bold">R1.239 billion annual revenue</span> engine with complete energy and logistics independence.
                </p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-4 md:p-5 rounded-xl border border-white/10 w-full lg:min-w-[260px] lg:w-auto shadow-lg">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase mb-3 tracking-wider">
                    <MapPin className="h-4 w-4" /> Host Property Spec
                </div>
                <p className="text-white font-bold text-lg md:text-xl mb-1">Modimolle, Limpopo</p>
                <div className="mt-3 space-y-2 text-xs md:text-sm text-slate-300">
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400"/> 445ha Premier Farm</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400"/> 22ha Pecan Trees</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400"/> 9 Boreholes & 14ha Pivot</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400"/> 5-Bed Lodge & Cold Rooms</p>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-slate-800">
            <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
                    <Wallet className="h-3 w-3 md:h-4 md:w-4" /> Total Investment
                </div>
                <div className="text-xl md:text-2xl font-bold text-white">{masterPlanStats.totalInvestment}</div>
            </div>
            <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
                    <Users className="h-3 w-3 md:h-4 md:w-4" /> Total Jobs Impact
                </div>
                <div className="text-xl md:text-2xl font-bold text-blue-400">{masterPlanStats.totalJobs}</div>
            </div>
            <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
                    <TrendingUp className="h-3 w-3 md:h-4 md:w-4" /> Year 7 Revenue
                </div>
                <div className="text-xl md::text-2xl font-bold text-emerald-400">{masterPlanStats.blendedROI}</div>
            </div>
            <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase mb-1">
                    <Layout className="h-3 w-3 md:h-4 md:w-4" /> Systems
                </div>
                <div className="text-lg md:text-xl font-bold text-white">7 Integrated Plans</div>
            </div>
          </div>
        </div>
      </div>

      {/* Master 3D Visualization */}
      <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-200">
        <Facility3D projectId="master" />
      </div>

      {/* Project Grid */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Factory className="w-5 h-5 text-slate-500" />
            Master Plan Components
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <div 
                    key={project.id}
                    onClick={() => onSelectProject(project.id)}
                    className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col relative"
                >
                    <div className={`h-1.5 w-full ${project.color}`}></div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                                {project.type === 'Bio-Energy' && <Factory className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                                {project.type === 'Energy' && <Sun className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                                {project.type === 'Logistics' && <TruckIcon className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                                {project.type === 'Processing' && <Factory className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                                {project.type === 'Technology' && <Droplets className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                                {project.type === 'Agriculture' && <Sprout className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                                {project.type === 'Agro-Forestry' && <Sprout className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                                {project.type === 'Biotech' && <Beaker className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                                {project.type === 'Nutraceuticals' && <Beaker className="h-6 w-6 text-slate-600 group-hover:text-emerald-600" />}
                            </div>
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
                                project.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                                project.status === 'Investment Ready' ? 'bg-emerald-100 text-emerald-700' :
                                'bg-slate-100 text-slate-600'
                            }`}>
                                {project.status}
                            </span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors flex items-center">
                          {project.name}
                          {project.voiceScriptKey && voiceScripts.masterDashboard[project.voiceScriptKey] && (
                            <AudioButton
                              id={`masterDashboard-${project.voiceScriptKey}`}
                              title={voiceScripts.masterDashboard[project.voiceScriptKey].title}
                              text={voiceScripts.masterDashboard[project.voiceScriptKey].text}
                              isPlaying={isPlaying}
                              currentPlayingId={currentPlayingId}
                              isLoadingAudio={isLoadingAudio}
                              fetchAndPlayAudio={fetchAndPlayAudio}
                              pauseAudio={pauseAudio}
                            />
                          )}
                        </h4>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">{project.location}</p>
                        <p className="text-sm text-slate-600 mb-6 flex-1 leading-relaxed line-clamp-3">{project.shortDesc}</p>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                            <div>
                                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Investment</span>
                                <span className="text-sm font-bold text-slate-900">{project.investment}</span>
                            </div>
                            <div>
                                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Direct Jobs</span>
                                <span className="text-sm font-bold text-emerald-600">{project.jobs}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wide group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                        <span>View Plan Details</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// Helper icon
const TruckIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 17h4V5H2v12h3" />
        <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" />
        <circle cx="7.5" cy="17.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
);

export default MasterDashboard;