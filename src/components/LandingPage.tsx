
import React from 'react';
import { ArrowRight, Leaf, Zap, Users, TrendingUp, ShieldCheck, Factory, MapPin, Droplets, Layers, Battery, Truck, Coins, Globe, PlayCircle, Star, Box } from 'lucide-react';
import { voiceScripts } from '../data/voiceScripts';
import AudioButton from './AudioButton';

interface LandingPageProps {
  onEnter: (tab?: string) => void;
  isPlaying: boolean;
  currentPlayingId: string | null;
  isLoadingAudio: boolean;
  fetchAndPlayAudio: (text: string, id: string, title: string) => void;
  pauseAudio: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, isPlaying, currentPlayingId, isLoadingAudio, fetchAndPlayAudio, pauseAudio }) => {
  const heroIntro = voiceScripts.landingPage.heroIntro;
  const energyDive = voiceScripts.landingPage.energyDive;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 selection:text-emerald-900 animate-fade-in">
      
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center rounded-full overflow-hidden h-9 w-9 sm:h-10 sm:w-10 shadow-md border border-white/10 ring-1 ring-white/5">
                <img src="https://i.postimg.cc/9Fp8zz5K/UAEI-Icon.png" alt="Ubuntu Restoration Farms" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-white hidden sm:block">Ubuntu Restoration</span>
            <span className="font-bold text-lg tracking-tight text-white sm:hidden">Ubuntu</span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => onEnter('storyboard')}
              className="hidden md:flex items-center gap-2 text-slate-300 hover:text-emerald-400 font-medium px-4 py-2 transition-colors text-sm"
            >
              <PlayCircle className="w-4 h-4" />
              Presentation Mode
            </button>
            <button 
                onClick={() => onEnter('dashboard')}
                className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
            >
                Enter Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center bg-slate-950 overflow-hidden pt-20 lg:pt-0">
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2940&auto=format&fit=crop" 
                alt="South African Agriculture" 
                className="w-full h-full object-cover opacity-40 sm:opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950 lg:bg-gradient-to-r lg:from-slate-950 lg:via-slate-950/80 lg:to-slate-950/20"></div>
            {/* Abstract Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-0 w-full h-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Text Content */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md text-emerald-400 text-xs font-bold uppercase tracking-wider mb-8 shadow-lg animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Government Priority Alignment
                </div>
                
                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight animate-fade-in-up delay-100">
                    Solving <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">8 Crises</span><br className="hidden sm:block" /> with One System.
                    <div className="inline-block align-middle ml-3 lg:ml-4 transform translate-y-[-4px] sm:translate-y-[-8px]">
                         <AudioButton
                            id="landingPage-heroIntro"
                            title={heroIntro.title}
                            text={heroIntro.text}
                            isPlaying={isPlaying}
                            currentPlayingId={currentPlayingId}
                            isLoadingAudio={isLoadingAudio}
                            fetchAndPlayAudio={fetchAndPlayAudio}
                            pauseAudio={pauseAudio}
                        />
                    </div>
                </h1>
                
                {/* Subtext */}
                <div className="mb-10 max-w-2xl animate-fade-in-up delay-200">
                    <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light">
                        Ubuntu Restoration Farms is a <strong className="text-white font-semibold">R438M infrastructure investment</strong> that delivers simultaneous outcomes for Agriculture, Energy, Labour, and Trade.
                    </p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up delay-300 flex-wrap justify-center lg:justify-start">
                    <button 
                        onClick={() => onEnter('dashboard')}
                        className="group bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3 transform hover:-translate-y-1 w-full sm:w-auto"
                    >
                        View Investment Model
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* 3D BUTTON ADDED HERE AS REQUESTED */}
                    <button 
                        onClick={() => onEnter('model3d')}
                        className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 backdrop-blur-sm transform hover:-translate-y-1 w-full sm:w-auto"
                    >
                        <Box className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                        3D Digital Twin
                    </button>
                     
                    <button 
                        onClick={() => onEnter('storyboard')}
                        className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 backdrop-blur-sm transform hover:-translate-y-1 w-full sm:w-auto"
                    >
                        <PlayCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                        Interactive Story
                    </button>
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-12 pt-8 border-t border-white/10 w-full flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 text-slate-400 text-xs font-bold uppercase tracking-wider animate-fade-in-up delay-500">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        <span className="text-slate-300">Investment Ready</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-emerald-500" />
                        <span className="text-slate-300">Limpopo, SA</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-emerald-500" />
                        <span className="text-slate-300">SDG Aligned</span>
                    </div>
                </div>
            </div>

            {/* Visual Content - Responsive 3D Card Effect */}
            <div className="flex-1 w-full max-w-lg lg:max-w-xl relative animate-fade-in-left delay-300 hidden lg:block perspective-1000">
                {/* Decorative background blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/20 rounded-full blur-3xl opacity-40 animate-pulse pointer-events-none"></div>
                
                <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-2 overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] hover:-rotate-1">
                    
                    {/* Image Container */}
                    <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                        <img 
                            src="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2668&auto=format&fit=crop" 
                            alt="Modimolle Farm Asset"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90"></div>
                        
                        {/* Floating Tag */}
                        <div className="absolute top-4 left-4 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                            <p className="text-xs font-bold text-white">Listing T4772598</p>
                        </div>

                        {/* Title overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                             <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">Core Foundation Asset</p>
                             <div className="flex justify-between items-end">
                                 <h3 className="text-2xl font-bold text-white">Modimolle Farm</h3>
                                 <span className="bg-emerald-500 text-slate-900 text-xs font-bold px-2 py-1 rounded uppercase">Acquisition</span>
                             </div>
                        </div>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="p-6 grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors group">
                            <div className="flex items-center gap-2 mb-2">
                                <Coins className="w-4 h-4 text-amber-400" />
                                <p className="text-slate-400 text-[10px] uppercase font-bold">Valuation</p>
                            </div>
                            <p className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">R 57.1 M</p>
                        </div>
                        <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors group">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                                <p className="text-slate-400 text-[10px] uppercase font-bold">Annual Rev</p>
                            </div>
                            <p className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">R 1.2 B</p>
                        </div>
                         <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50 flex items-center justify-between group hover:bg-slate-800/60 transition-colors">
                             <div className="flex items-center gap-2">
                                <Layers className="w-4 h-4 text-blue-400" />
                                <span className="text-slate-300 text-xs font-bold">Extent</span>
                             </div>
                             <span className="text-white font-bold text-sm">445 ha</span>
                        </div>
                        <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/50 flex items-center justify-between group hover:bg-slate-800/60 transition-colors">
                             <div className="flex items-center gap-2">
                                <Droplets className="w-4 h-4 text-cyan-400" />
                                <span className="text-slate-300 text-xs font-bold">Water</span>
                             </div>
                             <span className="text-white font-bold text-sm">9 Boreholes</span>
                        </div>
                    </div>
                </div>
            </div>
            
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
            <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-1">
                <div className="w-1.5 h-2 bg-emerald-500 rounded-full"></div>
            </div>
        </div>
      </section>

      {/* 8 Priorities Grid */}
      <section className="py-16 sm:py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">Aligning Mandates with Returns</h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We address eight separate government crises with one integrated solution, turning national liabilities into profitable assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* 1. Food Security */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-lg hover:-translate-y-1 duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">1. Food Security</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">Feeding 3.43 million people annually.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">858 Tonnes</div>
                  <div className="text-xs font-bold uppercase text-slate-500">Protein / Year</div>
                </div>
            </div>

            {/* 2. Energy Security */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all hover:shadow-lg hover:-translate-y-1 duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-sm">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">2. Energy Sovereignty</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">Zero Eskom dependency. Zero diesel imports.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">100%</div>
                  <div className="text-xs font-bold uppercase text-slate-500">Solar + Bio-diesel</div>
                </div>
            </div>

            {/* 3. Unemployment */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all hover:shadow-lg hover:-translate-y-1 duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">3. Jobs & Inequality</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">More jobs than a coal mine in Limpopo.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">1,205 Jobs</div>
                  <div className="text-xs font-bold uppercase text-slate-500">Direct + Indirect</div>
                </div>
            </div>

            {/* 4. Climate Change */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 transition-all hover:shadow-lg hover:-translate-y-1 duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-sm">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">4. Climate Action</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">Sequestering more carbon than 2,730 cars emit.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">-19,085 T</div>
                  <div className="text-xs font-bold uppercase text-slate-500">CO₂e / Year</div>
                </div>
            </div>

             {/* 5. Export */}
             <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 transition-all hover:shadow-lg hover:-translate-y-1 duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">5. Export Growth</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">Premium value-add exports to EU Michelin markets.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">R 39.6M</div>
                  <div className="text-xs font-bold uppercase text-slate-500">Premium Export Rev</div>
                </div>
            </div>

             {/* 6. Rural Industry */}
             <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all hover:shadow-lg hover:-translate-y-1 duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                  <Factory className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">6. Rural Industry</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">Anchoring a new industrial cluster in Modimolle.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">R 391M</div>
                  <div className="text-xs font-bold uppercase text-slate-500">Manufacturing Infra</div>
                </div>
            </div>

             {/* 7. Water Security */}
             <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-300 transition-all hover:shadow-lg hover:-translate-y-1 duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4 group-hover:bg-cyan-600 group-hover:text-white transition-colors shadow-sm">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">7. Water Security</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">Drought-proof production. 429x better return per drop.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">+23%</div>
                  <div className="text-xs font-bold uppercase text-slate-500">Yield Efficiency</div>
                </div>
            </div>

             {/* 8. Soil Regeneration */}
             <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-lg hover:-translate-y-1 duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-sm">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">8. Soil Regeneration</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">Building fertility that lasts 500 years via Rock Dust.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">500 Yr</div>
                  <div className="text-xs font-bold uppercase text-slate-500">Soil Capital</div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Energy Sovereignty Deep Dive */}
      <section className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1473341304170-5799ca1f619c?q=80&w=2688&auto=format&fit=crop" 
                alt="Texture" 
                className="w-full h-full object-cover opacity-10 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
                <Battery className="w-4 h-4" />
                Challenge #2: Energy Security
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 flex items-center leading-tight">
                Complete Energy & Logistics Independence
                <div className="ml-3">
                    <AudioButton
                        id="landingPage-energyDive"
                        title={energyDive.title}
                        text={energyDive.text}
                        isPlaying={isPlaying}
                        currentPlayingId={currentPlayingId}
                        isLoadingAudio={isLoadingAudio}
                        fetchAndPlayAudio={fetchAndPlayAudio}
                        pauseAudio={pauseAudio}
                    />
                </div>
              </h2>
              <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed">
                South African agriculture is 100% dependent on imported diesel. When supply chains break, tractors stop. 
                <strong className="text-emerald-400 block mt-2"> We are changing that.</strong>
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 group p-4 rounded-xl transition-colors hover:bg-white/5 border border-transparent hover:border-emerald-500/20">
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-emerald-500/50 group-hover:bg-emerald-900/20 transition-all">
                    <Factory className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">Bio-Diesel Refinery (R35.3M)</h4>
                    <p className="text-sm sm:text-base text-slate-400 mt-1">Produces 3.45M Litres/Year of B100 (SANS 342) fuel. 3,000T Biochar byproduct.</p>
                  </div>
                </div>
                <div className="flex gap-4 group p-4 rounded-xl transition-colors hover:bg-white/5 border border-transparent hover:border-blue-500/20">
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-blue-500/50 group-hover:bg-blue-900/20 transition-all">
                    <Truck className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Integrated Logistics Fleet (R1.79M)</h4>
                    <p className="text-sm sm:text-base text-slate-400 mt-1">Carbon-neutral fleet fueled by our own bio-diesel. Zero fossil fuel exposure.</p>
                  </div>
                </div>
                <div className="flex gap-4 group p-4 rounded-xl transition-colors hover:bg-white/5 border border-transparent hover:border-amber-500/20">
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 border border-slate-700 group-hover:border-amber-500/50 group-hover:bg-amber-900/20 transition-all">
                    <TrendingUp className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors">Financial Performance</h4>
                    <p className="text-sm sm:text-base text-slate-400 mt-1">Year 3 Revenue: R89.8M. EBITDA: R72.6M (80.7% Margin). DSCR: 12.9x.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
                <div className="absolute inset-0 rounded-2xl overflow-hidden transform rotate-2 translate-x-4 translate-y-4 bg-emerald-900/20 border border-emerald-500/20"></div>
                
                <div className="bg-slate-900 rounded-2xl p-0 border border-slate-700 shadow-2xl relative overflow-hidden">
                    <div className="h-48 w-full relative">
                         <img 
                            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2942&auto=format&fit=crop" 
                            alt="Solar Energy" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
                        <div className="absolute bottom-4 left-6">
                            <div className="inline-flex items-center gap-2 px-2 py-1 bg-emerald-500 text-slate-900 rounded font-bold text-xs uppercase mb-1">
                                <Zap className="w-3 h-3" /> Live Metric
                            </div>
                            <h3 className="text-xl font-bold text-white">Strategic Outputs</h3>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8">
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
                                <div className="text-slate-400 text-[10px] uppercase font-bold mb-2">Bio-Diesel</div>
                                <div className="text-2xl sm:text-3xl font-bold text-emerald-400">3.45M</div>
                                <div className="text-xs text-slate-500">Litres / Year</div>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-colors">
                                <div className="text-slate-400 text-[10px] uppercase font-bold mb-2">Electricity</div>
                                <div className="text-2xl sm:text-3xl font-bold text-amber-400">272.5k</div>
                                <div className="text-xs text-slate-500">kWh / Year</div>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-white/30 transition-colors">
                                <div className="text-slate-400 text-[10px] uppercase font-bold mb-2">Biochar</div>
                                <div className="text-2xl sm:text-3xl font-bold text-white">3,000</div>
                                <div className="text-xs text-slate-500">Tonnes / Year</div>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-colors">
                                <div className="text-slate-400 text-[10px] uppercase font-bold mb-2">Carbon Impact</div>
                                <div className="text-2xl sm:text-3xl font-bold text-blue-400">-12,504</div>
                                <div className="text-xs text-slate-500">T CO₂e / Year</div>
                            </div>
                        </div>
                        <div className="mt-6 bg-emerald-950/30 border border-emerald-500/20 p-4 rounded-xl text-center">
                            <p className="text-sm text-emerald-200 italic font-medium">
                            "We solve the diesel import crisis while regenerating the soil."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Structure */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Investment Table */}
             <div className="lg:col-span-1 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 h-full hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <Coins className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Capital Structure</h3>
                </div>
                
                <div className="space-y-4">
                    {[
                        { name: "Land Bank", val: "R 77.05M", type: "Plan 1 (17.6%)" },
                        { name: "IDC", val: "R 120.0M", type: "Manuf. Infra (27.4%)" },
                        { name: "NEF", val: "R 63.7M", type: "Transformation (14.5%)" },
                        { name: "Grants", val: "R 92.3M", type: "Co-Funding (21.0%)" },
                        { name: "Working Capital", val: "R 85.4M", type: "Equity/Debt (19.5%)" },
                    ].map((row, i) => (
                        <div key={i} className="flex justify-between items-center pb-3 border-b border-slate-50 last:border-0">
                            <div>
                                <div className="text-sm font-bold text-slate-900">{row.name}</div>
                                <div className="text-xs text-slate-500">{row.type}</div>
                            </div>
                            <div className="font-bold text-slate-700">{row.val}</div>
                        </div>
                    ))}
                    <div className="pt-4 mt-4 border-t-2 border-slate-100 flex justify-between items-center">
                        <div className="font-bold text-slate-900">TOTAL CAPITAL</div>
                        <div className="font-bold text-xl text-emerald-600">R 438.48M</div>
                    </div>
                </div>
             </div>

             {/* Revenue Highlight */}
             <div className="lg:col-span-2 flex flex-col justify-center bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 h-full hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Year 7 Financial Horizon</h3>
                        <p className="text-sm text-slate-500">Consolidated revenue across Estate Operations and UAEI Platform.</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 text-center hover:border-emerald-200 transition-colors group">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">Total Revenue</div>
                        <div className="text-3xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">R 1.239B</div>
                        <div className="text-sm text-emerald-600 font-medium mt-1">Annually</div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 text-center hover:border-emerald-200 transition-colors group">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">EBITDA</div>
                        <div className="text-3xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">R 807.8M</div>
                        <div className="text-sm text-emerald-600 font-medium mt-1">65.2% Margin</div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 text-center hover:border-emerald-200 transition-colors group">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">Net Profit</div>
                        <div className="text-3xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">R 573.6M</div>
                        <div className="text-sm text-emerald-600 font-medium mt-1">46.3% After Tax</div>
                    </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg">
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-bold text-white">Ready to explore the details?</h4>
                        <p className="text-slate-400 text-sm mt-1">Access the interactive dashboards, 3D facility models, and detailed operational plans.</p>
                    </div>
                    <button 
                        onClick={() => onEnter('dashboard')}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/25 whitespace-nowrap flex items-center gap-2 w-full md:w-auto justify-center transform hover:-translate-y-0.5"
                    >
                        Enter Investment Portal
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200">
                     <img src="https://i.postimg.cc/9Fp8zz5K/UAEI-Icon.png" alt="Ubuntu Restoration Farms" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-slate-900">Ubuntu Restoration Farms</span>
            </div>
            <div className="text-slate-500 text-sm text-center md:text-right flex flex-col md:flex-row items-center gap-2">
                <span className="hidden md:inline">•</span>
                <span>© November 2025 Master Plan</span>
                <span className="hidden md:inline">•</span>
                <span>Confidential Government Proposal</span>
            </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
