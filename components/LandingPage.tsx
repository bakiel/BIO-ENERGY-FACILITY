
import React from 'react';
import { ArrowRight, Leaf, Zap, Users, TrendingUp, ShieldCheck, Sprout, Globe, CheckCircle2, Anchor, Battery, Truck, Factory, MapPin, Expand, Droplets, Layers, FileText, Coins } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 selection:text-emerald-900 animate-fade-in">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center rounded-full overflow-hidden h-10 w-10 shadow-md">
                <img src="https://i.postimg.cc/9Fp8zz5K/UAEI-Icon.png" alt="Ubuntu Restoration Farms" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Ubuntu Restoration</span>
          </div>
          <button 
            onClick={onEnter}
            className="group flex items-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
          >
            Enter Portal
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2940&auto=format&fit=crop" 
                alt="South African Agriculture" 
                className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-8">
                    <Leaf className="w-4 h-4" />
                    The Convergence Opportunity
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                    How One <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">R438M Investment</span> Solves Eight Government Priorities Simultaneously.
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed mb-8 border-l-4 border-emerald-500 pl-6">
                    Government departments operate in silos. Ubuntu Restoration Farms represents a rare convergence point where infrastructure investment delivers outcomes for Agriculture, Energy, Labour, Environment, and Trade—<strong>simultaneously</strong>.
                </p>
                
                <div className="flex flex-wrap gap-4">
                    <button 
                        onClick={onEnter}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-emerald-500/25 flex items-center gap-3"
                    >
                        View Investment Model
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Property Specific Card */}
            <div className="bg-white/10 backdrop-blur-md p-0 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
                {/* Card Image */}
                <div className="h-48 w-full relative">
                    <img 
                        src="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2668&auto=format&fit=crop" 
                        alt="Modimolle Farm Lodge" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                     <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                            <MapPin className="h-3 w-3" /> Modimolle, Limpopo
                        </div>
                         <div className="text-white font-bold text-lg">Listing T4772598</div>
                    </div>
                </div>

                <div className="p-6 pt-4">
                     <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 text-xs rounded-lg font-bold shadow-lg transform">
                        Asset Foundation
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-300">Total Extent</span>
                            <span className="text-white font-bold text-xl">445 Hectares</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-300">Initial Infrastructure</span>
                            <span className="text-emerald-400 font-bold text-xl">R 24.5 Million</span>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div className="bg-slate-800/50 p-3 rounded-lg">
                                <div className="text-xs text-slate-400 uppercase mb-1">Food Security</div>
                                <div className="text-white font-bold">2,200 Pecan Trees</div>
                                <div className="text-[10px] text-emerald-400">Existing Orchard</div>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg">
                                <div className="text-xs text-slate-400 uppercase mb-1">Water Resilience</div>
                                <div className="text-white font-bold">19,000 m³ Dam</div>
                                <div className="text-[10px] text-emerald-400">9 Boreholes</div>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg">
                                <div className="text-xs text-slate-400 uppercase mb-1">Processing Hub</div>
                                <div className="text-white font-bold">170m² Cold Room</div>
                                <div className="text-[10px] text-emerald-400">Factory Shell Ready</div>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg">
                                <div className="text-xs text-slate-400 uppercase mb-1">Energy Start</div>
                                <div className="text-white font-bold">72 Solar Panels</div>
                                <div className="text-[10px] text-emerald-400">Grid-Tied Hybrid</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Priorities Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Aligning Mandates with Returns</h2>
            <p className="text-lg text-slate-600">
              We address eight separate government crises with one integrated solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Food Security */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">1. Food Security</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">Feeding 3.43 million people annually.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">858 Tonnes</div>
                  <div className="text-xs font-bold uppercase text-slate-400">Protein / Year</div>
                </div>
            </div>

            {/* 2. Energy Security */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">2. Energy Sovereignty</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">Zero Eskom dependency. Zero diesel imports.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">100%</div>
                  <div className="text-xs font-bold uppercase text-slate-400">Solar + Bio-diesel</div>
                </div>
            </div>

            {/* 3. Unemployment */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">3. Jobs & Inequality</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">More jobs than a coal mine in Limpopo.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">1,205 Jobs</div>
                  <div className="text-xs font-bold uppercase text-slate-400">Year 1-3 (Direct+Ind)</div>
                </div>
            </div>

            {/* 4. Climate Change */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">4. Climate Action</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">Sequestering more carbon than 2,730 cars emit.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">-19,085 T</div>
                  <div className="text-xs font-bold uppercase text-slate-400">CO₂e / Year</div>
                </div>
            </div>

             {/* 5. Export */}
             <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">5. Export Growth</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">Premium value-add exports to EU Michelin markets.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">R 39.6M</div>
                  <div className="text-xs font-bold uppercase text-slate-400">Premium Export Rev</div>
                </div>
            </div>

             {/* 6. Rural Industry */}
             <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Factory className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">6. Rural Industry</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">Anchoring a new industrial cluster in Modimolle.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">R 391M</div>
                  <div className="text-xs font-bold uppercase text-slate-400">Manufacturing Infra</div>
                </div>
            </div>

             {/* 7. Water Security */}
             <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">7. Water Security</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">Drought-proof production. 429x better return per drop.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">+23%</div>
                  <div className="text-xs font-bold uppercase text-slate-400">Yield Efficiency</div>
                </div>
            </div>

             {/* 8. Soil Regeneration */}
             <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">8. Soil Regeneration</h3>
                <p className="text-sm text-slate-600 mb-4 min-h-[40px]">Building fertility that lasts 500 years via Rock Dust.</p>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-2xl font-bold text-slate-900">50-500 Yr</div>
                  <div className="text-xs font-bold uppercase text-slate-400">Soil Capital</div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Energy Sovereignty Deep Dive */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1473341304170-5799ca1f619c?q=80&w=2688&auto=format&fit=crop" 
                alt="Texture" 
                className="w-full h-full object-cover opacity-10 mix-blend-overlay"
            />
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/30 rounded-full blur-[100px] translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900 border border-emerald-700 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Battery className="w-4 h-4" />
                Challenge #2: Energy Security
              </div>
              <h2 className="text-4xl font-bold mb-6">Complete Energy & Logistics Independence</h2>
              <p className="text-lg text-slate-300 mb-8">
                South African agriculture is 100% dependent on imported diesel. When supply chains break, tractors stop. 
                <strong className="text-emerald-400"> We are changing that.</strong>
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 border border-slate-700">
                    <Factory className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Bio-Diesel Refinery (R35.3M)</h4>
                    <p className="text-slate-400 mt-1">Produces 3.45M Litres/Year of B100 (SANS 342) fuel. 3,000T Biochar byproduct.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 border border-slate-700">
                    <Truck className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Integrated Logistics Fleet (R1.79M)</h4>
                    <p className="text-slate-400 mt-1">Carbon-neutral fleet fueled by our own bio-diesel. Zero fossil fuel exposure.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 border border-slate-700">
                    <TrendingUp className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Financial Performance</h4>
                    <p className="text-slate-400 mt-1">Year 3 Revenue: R89.8M. EBITDA: R72.6M (80.7% Margin). DSCR: 12.9x.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 rounded-2xl overflow-hidden transform rotate-2 translate-x-4 translate-y-4 bg-emerald-900/50"></div>
                
                <div className="bg-slate-800 rounded-2xl p-0 border border-slate-700 shadow-2xl relative overflow-hidden">
                    <div className="h-40 w-full relative">
                         <img 
                            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2942&auto=format&fit=crop" 
                            alt="Solar Energy" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/60"></div>
                        <h3 className="absolute bottom-4 left-6 text-lg font-bold text-white z-10">Strategic Outputs</h3>
                    </div>

                    <div className="p-8 pt-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-slate-900 p-4 rounded-lg">
                            <div className="text-slate-400 text-xs uppercase font-bold mb-2">Bio-Diesel</div>
                            <div className="text-3xl font-bold text-emerald-400">3.45M</div>
                            <div className="text-xs text-slate-500">Litres / Year</div>
                            </div>
                            <div className="bg-slate-900 p-4 rounded-lg">
                            <div className="text-slate-400 text-xs uppercase font-bold mb-2">Electricity</div>
                            <div className="text-3xl font-bold text-amber-400">272.5k</div>
                            <div className="text-xs text-slate-500">kWh / Year</div>
                            </div>
                            <div className="bg-slate-900 p-4 rounded-lg">
                            <div className="text-slate-400 text-xs uppercase font-bold mb-2">Biochar</div>
                            <div className="text-3xl font-bold text-white">3,000</div>
                            <div className="text-xs text-slate-500">Tonnes / Year</div>
                            </div>
                            <div className="bg-slate-900 p-4 rounded-lg">
                            <div className="text-slate-400 text-xs uppercase font-bold mb-2">Carbon Impact</div>
                            <div className="text-3xl font-bold text-blue-400">-12,504</div>
                            <div className="text-xs text-slate-500">T CO₂e / Year</div>
                            </div>
                        </div>
                        <div className="mt-6 bg-emerald-900/30 border border-emerald-500/30 p-4 rounded-lg">
                            <p className="text-sm text-emerald-200 text-center italic">
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
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Investment Table */}
             <div className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
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
                        { name: "Grants (DAFF/dtic)", val: "R 92.3M", type: "Co-Funding (21.0%)" },
                        { name: "Working Capital", val: "R 85.4M", type: "Equity/Debt (19.5%)" },
                    ].map((row, i) => (
                        <div key={i} className="flex justify-between items-center pb-3 border-b border-slate-100 last:border-0">
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
             <div className="lg:col-span-2 flex flex-col justify-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
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
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 text-center">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">Total Revenue</div>
                        <div className="text-3xl font-bold text-slate-900">R 1.239B</div>
                        <div className="text-sm text-green-600 font-medium mt-1">Annually</div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 text-center">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">EBITDA</div>
                        <div className="text-3xl font-bold text-slate-900">R 807.8M</div>
                        <div className="text-sm text-green-600 font-medium mt-1">65.2% Margin</div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 text-center">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">Net Profit</div>
                        <div className="text-3xl font-bold text-slate-900">R 573.6M</div>
                        <div className="text-sm text-green-600 font-medium mt-1">46.3% After Tax</div>
                    </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h4 className="text-lg font-bold">Ready to explore the details?</h4>
                        <p className="text-slate-400 text-sm">Access the interactive dashboards, 3D facility models, and detailed operational plans.</p>
                    </div>
                    <button 
                        onClick={onEnter}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-emerald-500/25 whitespace-nowrap flex items-center gap-2"
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
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full overflow-hidden">
                     <img src="https://i.postimg.cc/9Fp8zz5K/UAEI-Icon.png" alt="Ubuntu Restoration Farms" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-slate-900">Ubuntu Restoration Farms</span>
            </div>
            <div className="text-slate-500 text-sm">
                © November 2025 Master Plan. Confidential Government Proposal.
            </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
