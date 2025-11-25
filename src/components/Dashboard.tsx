
import React from 'react';
import { TrendingUp, Zap, Wallet, BarChart3, CheckCircle2, AlertTriangle, Box, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import AudioButton from './AudioButton';
import { voiceScripts } from '../data/voiceScripts';
import { projects } from '../data/projects';

interface DashboardProps {
  setActiveTab: (tabId: string) => void;
  projectId: string;
  isPlaying: boolean;
  currentPlayingId: string | null;
  isLoadingAudio: boolean;
  fetchAndPlayAudio: (text: string, id: string, title: string) => void;
  pauseAudio: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveTab, projectId, isPlaying, currentPlayingId, isLoadingAudio, fetchAndPlayAudio, pauseAudio }) => {
  
  // Plan 1 Data (The Farm) - Corrected R57.05M
  const plan1Data = {
    investment: { total: '57.05M', loan: '100%', grant: '0%' },
    revenue: { year3: '34.3M', margin: '71.5%' },
    jobs: { total: '185', subtext: '(Year 1-3 Avg)' },
    dscr: { value: '3.48x', subtext: 'Min required: 1.25x' },
    chartData: [
      { name: 'Year 1', revenue: 34.3, profit: 24.5 },
      { name: 'Year 2', revenue: 45.2, profit: 31.4 },
      { name: 'Year 3', revenue: 52.1, profit: 36.8 },
      { name: 'Year 4', revenue: 58.5, profit: 41.2 },
      { name: 'Year 5', revenue: 64.2, profit: 45.0 },
    ],
    phases: [
      { title: 'Phase 1: Acquisition', time: 'Month 1-3', desc: 'Secure 445ha property. Take over existing pecan orchards and infrastructure.', status: 'current' },
      { title: 'Phase 2: Agritech Install', time: 'Month 3-6', desc: 'Install 500kVA Solar, Rock Dust Crusher, and Water Filtration systems.', status: 'future' },
      { title: 'Phase 3: Full Production', time: 'Year 1+', desc: 'Vegetable harvest, Composting scale-up, and Plan 2/3 feedstock supply.', status: 'future' }
    ],
    risks: [
      { label: 'Base Case', roi: '3.48x', subtext: 'DSCR', color: 'text-emerald-400' },
      { label: 'Drought Risk', roi: '-2%', subtext: 'Rev Impact (Low)', color: 'text-emerald-400' },
      { label: 'Market Price', roi: 'Hedged', subtext: 'Pre-sold Contracts', color: 'text-emerald-400' }
    ]
  };

  // Plan 2 Data (Agroforestry Dairy) - Corrected R77M
  const plan2Data = {
    investment: { total: '77.0M', loan: '64%', grant: '36%' },
    revenue: { year3: '95.2M', margin: '72.0%' },
    jobs: { total: '62', subtext: 'Year 1-3 Avg' },
    dscr: { value: '16.6x', subtext: 'Year 7 (Min 1.25x)' },
    chartData: [
      { name: 'Year 1', revenue: 40.8, profit: 20.4 },
      { name: 'Year 2', revenue: 67.6, profit: 37.1 },
      { name: 'Year 3', revenue: 95.2, profit: 68.5 },
      { name: 'Year 5', revenue: 125.1, profit: 75.0 },
      { name: 'Year 7', revenue: 196.8, profit: 105.4 },
    ],
    phases: [
      { title: 'Phase 1: Establishment', time: 'Years 1-3', desc: '36k Trees planted. Soy dairy production at full capacity (270T soy).', status: 'current' },
      { title: 'Phase 2: Transition', time: 'Years 4-6', desc: 'Orchards mature. Dairy transitions from Soy to Macadamia base.', status: 'future' },
      { title: 'Phase 3: Maturity', time: 'Year 7+', desc: 'Full Macadamia production + Premium Dairy export markets.', status: 'future' }
    ],
    risks: [
      { label: 'Base Case', roi: '16.6x', subtext: 'DSCR (Year 7)', color: 'text-emerald-400' },
      { label: 'Climate Risk', roi: '-20%', subtext: 'Water Use (Agroforestry)', color: 'text-emerald-400' },
      { label: 'Market Shift', roi: 'Hedged', subtext: 'Dual Commodity', color: 'text-emerald-400' }
    ]
  };

  // Plan 3 Data (Meat Factory) - Corrected R66M
  const plan3Data = {
    investment: { total: '66.0M', loan: '70%', grant: '30%' },
    revenue: { year3: '114.9M', margin: '40.2%' },
    jobs: { total: '98', subtext: 'Year 1-3 Avg' },
    dscr: { value: '8.5x', subtext: 'Govt Contracts Locked' },
    chartData: [
      { name: 'Year 1', revenue: 57.5, profit: 23.1 },
      { name: 'Year 2', revenue: 86.2, profit: 34.7 },
      { name: 'Year 3', revenue: 114.9, profit: 46.2 },
      { name: 'Year 4', revenue: 126.4, profit: 50.8 },
      { name: 'Year 5', revenue: 137.9, profit: 55.4 },
    ],
    phases: [
      { title: 'Phase 1: Construction', time: 'Month 1-8', desc: 'Build facility, install Seitan line and Retort autoclaves.', status: 'current' },
      { title: 'Phase 2: Commissioning', time: 'Month 9-12', desc: 'Certifications (HACCP, FSSC 22000). Retail launch.', status: 'future' },
      { title: 'Phase 3: Institutional', time: 'Year 2+', desc: 'Fulfill Gov tenders (Prisons, Schools). Optional UAEI integration.', status: 'future' }
    ],
    risks: [
      { label: 'Base Case', roi: '8.5x', subtext: 'DSCR', color: 'text-emerald-400' },
      { label: 'Retail Lag', roi: '4.2x', subtext: 'Institutions Cover Debt', color: 'text-emerald-400' },
      { label: 'Input Cost', roi: 'Stable', subtext: 'Plan 1 Supply', color: 'text-emerald-400' }
    ]
  };

  // Plan 3B Data (Medicinal Mushrooms) - Corrected R38M
  const plan3bData = {
    investment: { total: '38.0M', loan: '70%', grant: '30%' },
    revenue: { year3: '30.8M', margin: '40.0%' },
    jobs: { total: '47', subtext: 'Year 1-3 Avg' },
    dscr: { value: '2.41x', subtext: 'IRR 24.3%' },
    chartData: [
      { name: 'Year 1', revenue: 15.4, profit: 2.6 },
      { name: 'Year 2', revenue: 23.1, profit: 7.4 },
      { name: 'Year 3', revenue: 30.8, profit: 12.2 },
      { name: 'Year 4', revenue: 33.9, profit: 14.3 },
      { name: 'Year 5', revenue: 36.9, profit: 16.3 },
    ],
    phases: [
      { title: 'Phase 1: Pre-Construction', time: 'Month 1-3', desc: 'Site prep, ordering climate-controlled containers, securing certifications.', status: 'current' },
      { title: 'Phase 2: Installation', time: 'Month 4-6', desc: 'Commissioning of containers, substrate line setup, and lab installation.', status: 'future' },
      { title: 'Phase 3: Commercial', time: 'Month 7+', desc: 'Full production ramp-up. Export launch to USA/EU and domestic retail.', status: 'future' }
    ],
    risks: [
      { label: 'Base Case', roi: '24.3%', subtext: 'IRR (10-Yr)', color: 'text-emerald-400' },
      { label: 'Contamination', roi: 'Low', subtext: 'Autoclave Mitigated', color: 'text-emerald-400' },
      { label: 'Market Conc.', roi: 'Diversified', subtext: 'Export/Retail Split', color: 'text-emerald-400' }
    ]
  };

  // Plan 4 Data (Artisan Cheese) - Corrected R55M
  const plan4Data = {
    investment: { total: '55.0M', loan: '70%', grant: '30%' },
    revenue: { year3: '39.6M', margin: '34.5%' },
    jobs: { total: '53', subtext: 'Year 1-3 Avg' },
    dscr: { value: '3.99x', subtext: 'Year 7 (Full Maturity)' },
    chartData: [
      { name: 'Year 1', revenue: 4.9, profit: -12.8 },
      { name: 'Year 3', revenue: 30.2, profit: 4.1 },
      { name: 'Year 5', revenue: 34.6, profit: 10.4 },
      { name: 'Year 6', revenue: 35.3, profit: 12.9 },
      { name: 'Year 7', revenue: 39.6, profit: 13.7 },
    ],
    phases: [
      { title: 'Phase 1: Build & Bees', time: 'Year 1', desc: 'Construct caves, establish Apiary. Inventory build-up (ageing).', status: 'current' },
      { title: 'Phase 2: Market Entry', time: 'Year 2-3', desc: 'Export certifications. First EU/USA shipments. Breakeven Year 3.', status: 'future' },
      { title: 'Phase 3: Estate Supply', time: 'Year 6', desc: 'Plan 2 Macadamias reach 100% supply capability. COGS drops 98%.', status: 'future' }
    ],
    risks: [
      { label: 'Base Case', roi: '3.99x', subtext: 'DSCR (Year 7)', color: 'text-emerald-400' },
      { label: 'Export Risk', roi: 'Hedged', subtext: 'Waxed = Shelf Stable', color: 'text-emerald-400' },
      { label: 'Input Cost', roi: 'R3/kg', subtext: 'Estate Supply (Locked)', color: 'text-emerald-400' }
    ]
  };

  // Plan 5 Data (Estate Solar) - CORRECTED to Solar Array
  const plan5Data = {
    investment: { total: '38.0M', loan: 'NEF', grant: 'Grants' },
    revenue: { year3: '60.4M', margin: '95%' },
    jobs: { total: '18', subtext: 'Tech & Maintenance' },
    dscr: { value: 'N/A', subtext: 'Cost Saving Model' },
    chartData: [
      { name: 'Year 1', revenue: 15.0, profit: 14.0 },
      { name: 'Year 2', revenue: 35.0, profit: 33.0 },
      { name: 'Year 3', revenue: 60.4, profit: 57.0 },
      { name: 'Year 4', revenue: 60.4, profit: 57.0 },
      { name: 'Year 5', revenue: 60.4, profit: 57.0 },
    ],
    phases: [
      { title: 'Phase 1: Procurement', time: 'Months 1-3', desc: 'Import panels and inverters. Site preparation for 4.9MW array.', status: 'current' },
      { title: 'Phase 2: Installation', time: 'Months 4-6', desc: 'Rooftop and ground-mount arrays installed across all facilities.', status: 'future' },
      { title: 'Phase 3: Independence', time: 'Month 7+', desc: 'Full micro-grid commissioning. Eskom disconnection possible.', status: 'future' }
    ],
    risks: [
      { label: 'Efficiency', roi: '99%', subtext: 'System Uptime', color: 'text-emerald-400' },
      { label: 'Grid Fail', roi: '0%', subtext: 'Impact (Battery)', color: 'text-emerald-400' },
      { label: 'Savings', roi: 'R60M+', subtext: 'Annual Value', color: 'text-emerald-400' }
    ]
  };

  // Plan 6 Data (Bio-Energy) - Corrected R40M
  const plan6Data = {
    investment: { total: '40.0M', loan: '70%', grant: '30%' },
    revenue: { year3: '89.8M', margin: '80.7%' },
    jobs: { total: '19', subtext: 'Direct (Y1-3)' },
    dscr: { value: '12.9x', subtext: 'Min required: 1.25x' },
    chartData: [
      { name: 'Year 1', revenue: 35.0, profit: 15.0 },
      { name: 'Year 2', revenue: 65.0, profit: 45.0 },
      { name: 'Year 3', revenue: 89.8, profit: 72.6 },
      { name: 'Year 4', revenue: 89.8, profit: 72.6 },
      { name: 'Year 5', revenue: 89.8, profit: 72.6 },
    ],
    phases: [
      { title: 'Phase 1: Energy Independence', time: 'Year 1-2', desc: 'Establish bio-diesel refinery and carbon-neutral logistics fleet.', status: 'current' },
      { title: 'Phase 2: Vertical Integration', time: 'Years 2-4', desc: '200ha dedicated production to secure feedstock at cost.', status: 'future' },
      { title: 'Phase 3: National Scale', time: 'Years 5+', desc: 'Blueprint for agricultural energy sovereignty across SA.', status: 'future' }
    ],
    risks: [
      { label: 'Base Case', roi: '290%', subtext: 'ROI', color: 'text-emerald-400' },
      { label: 'Crisis Mode', roi: '+5%', subtext: 'Revenue Gain', color: 'text-emerald-400' },
      { label: 'Diesel Shortage', roi: 'Profit', subtext: 'Market Premium', color: 'text-emerald-400' }
    ]
  };

  let data = plan6Data;
  if (projectId === 'plan1') data = plan1Data;
  if (projectId === 'plan2') data = plan2Data;
  if (projectId === 'plan3') data = plan3Data;
  if (projectId === 'plan3b') data = plan3bData;
  if (projectId === 'plan4') data = plan4Data;
  if (projectId === 'plan5') data = plan5Data;
  
  const getThemeColor = () => {
      if (projectId === 'plan5') return 'cyan';
      if (projectId === 'plan2') return 'green';
      if (projectId === 'plan3') return 'amber';
      if (projectId === 'plan3b') return 'purple';
      if (projectId === 'plan4') return 'yellow';
      if (projectId === 'plan1') return 'emerald';
      return 'emerald';
  }
  
  const themeColor = getThemeColor();
  const fillColor = projectId === 'plan5' ? '#06b6d4' : (projectId === 'plan4' ? '#eab308' : (projectId === 'plan3' ? '#f59e0b' : (projectId === 'plan2' ? '#16a34a' : (projectId === 'plan3b' ? '#9333ea' : '#10b981'))));

  // Get voice script for the current project
  const currentProject = projects.find(p => p.id === projectId);
  const projectVoiceScript = currentProject?.voiceScriptKey ? voiceScripts[currentProject.voiceScriptKey] : undefined;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 flex items-center">
                Total Investment
                {projectVoiceScript?.investment && (
                  <AudioButton
                    id={`${projectId}-investment`}
                    title={projectVoiceScript.investment.title}
                    text={projectVoiceScript.investment.text}
                    isPlaying={isPlaying}
                    currentPlayingId={currentPlayingId}
                    isLoadingAudio={isLoadingAudio}
                    fetchAndPlayAudio={fetchAndPlayAudio}
                    pauseAudio={pauseAudio}
                  />
                )}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">R {data.investment.total}</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Wallet className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500 flex gap-2">
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{data.investment.loan} Debt</span>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">{data.investment.grant} Grant</span>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 flex items-center">
                {projectId === 'plan1' ? 'Year 1 Revenue' : (projectId === 'plan2' || projectId === 'plan4' ? 'Year 7 Revenue' : (projectId === 'plan5' ? 'Annual Savings' : 'Year 3 Revenue'))}
                {projectVoiceScript?.revenue && (
                  <AudioButton
                    id={`${projectId}-revenue`}
                    title={projectVoiceScript.revenue.title}
                    text={projectVoiceScript.revenue.text}
                    isPlaying={isPlaying}
                    currentPlayingId={currentPlayingId}
                    isLoadingAudio={isLoadingAudio}
                    fetchAndPlayAudio={fetchAndPlayAudio}
                    pauseAudio={pauseAudio}
                  />
                )}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">R {projectId === 'plan1' ? data.chartData[0].revenue : (projectId === 'plan4' ? data.chartData[4].revenue : data.revenue.year3)}</h3>
            </div>
            <div className={`p-2 bg-${themeColor}-50 rounded-lg`}>
              <TrendingUp className={`h-5 w-5 text-${themeColor}-600`} />
            </div>
          </div>
          <div className={`mt-4 flex items-center text-sm text-${themeColor}-600 font-medium`}>
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>{data.revenue.margin} {projectId === 'plan2' ? 'Margin (Soy)' : (projectId === 'plan4' ? 'Net Margin' : (projectId === 'plan5' ? 'Energy Savings' : 'EBITDA Margin'))}</span>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 flex items-center">
                Jobs / Impact
                {projectVoiceScript?.jobs && (
                  <AudioButton
                    id={`${projectId}-jobs`}
                    title={projectVoiceScript.jobs.title}
                    text={projectVoiceScript.jobs.text}
                    isPlaying={isPlaying}
                    currentPlayingId={currentPlayingId}
                    isLoadingAudio={isLoadingAudio}
                    fetchAndPlayAudio={fetchAndPlayAudio}
                    pauseAudio={pauseAudio}
                  />
                )}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">{data.jobs.total}</h3>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg">
              <Zap className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            {data.jobs.subtext}
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 flex items-center">
                DSCR Coverage
                {projectVoiceScript?.dscr && (
                  <AudioButton
                    id={`${projectId}-dscr`}
                    title={projectVoiceScript.dscr.title}
                    text={projectVoiceScript.dscr.text}
                    isPlaying={isPlaying}
                    currentPlayingId={currentPlayingId}
                    isLoadingAudio={isLoadingAudio}
                    fetchAndPlayAudio={fetchAndPlayAudio}
                    pauseAudio={pauseAudio}
                  />
                )}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">{data.dscr.value}</h3>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            {data.dscr.subtext}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Financial Performance Forecast</h3>
          <div className="h-64 md:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R${value}M`} width={45} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`R ${value}M`, '']}
                />
                <Bar dataKey="revenue" name={projectId === 'plan5' ? 'Savings' : 'Revenue'} fill={fillColor} radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="profit" name="Net Profit/EBITDA" fill="#0f172a" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Strategic Vision</h3>
          <div className="flex-1 space-y-6">
            {data.phases.map((phase, idx) => (
                 <div key={idx} className={`relative pl-6 border-l-2 ${idx === 0 ? `border-${themeColor}-200` : 'border-slate-200'}`}>
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${idx === 0 ? `bg-${themeColor}-500` : 'bg-slate-300'} ring-4 ring-white`}></div>
                    <h4 className="font-bold text-slate-900 text-sm md:text-base">{phase.title}</h4>
                    <p className="text-xs md:text-sm text-slate-600 mt-1">{phase.time}</p>
                    <p className="text-xs text-slate-500 mt-1">{phase.desc}</p>
                </div>
            ))}
          </div>

          <button 
            onClick={() => setActiveTab('model3d')}
            className="mt-6 w-full py-3 bg-slate-900 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-center gap-2 transition-all group shadow-sm hover:shadow-md text-sm md:text-base"
          >
            <Box className="w-4 h-4" />
            <span className="font-medium">Explore 3D Facility Model</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-4 md:p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-amber-400 h-6 w-6" />
          <h3 className="text-lg font-bold flex items-center">
            Risk & Resilience Stress Test
            {projectVoiceScript?.risks && (
                  <AudioButton
                    id={`${projectId}-risks`}
                    title={projectVoiceScript.risks.title}
                    text={projectVoiceScript.risks.text}
                    isPlaying={isPlaying}
                    currentPlayingId={currentPlayingId}
                    isLoadingAudio={isLoadingAudio}
                    fetchAndPlayAudio={fetchAndPlayAudio}
                    pauseAudio={pauseAudio}
                  />
                )}
          </h3>
        </div>
        <p className="text-slate-300 mb-6 max-w-3xl text-sm md:text-base">
          {projectId === 'plan5' 
            ? "The Estate Solar plan provides 100% operational uptime regardless of grid status. While competitors face spoilage and downtime during load-shedding, Ubuntu maintains full capacity, effectively gaining market share during crises."
            : projectId === 'plan3b'
               ? "Our 3-5 year first-mover advantage in SA Lion's Mane production builds an insurmountable brand moat before competitors can exit organic conversion. Diversified export/retail channels mitigate market concentration."
            : projectId === 'plan2' 
               ? "Our dual-commodity model (Soy & Macadamias) hedges against market volatility. The 180ha Agroforestry system creates a microclimate reducing water needs by 20%, making it highly climate resilient."
               : projectId === 'plan3'
               ? "Diversified revenue streams (Retail, Institutional, Export) provide extreme resilience. Institutional contracts (Prisons/Hospitals) cover 100% of debt service, making the retail upside purely profit."
               : projectId === 'plan4'
               ? "Patient capital model accommodates the cheese ageing period. Risk is mitigated by waxed shelf-stability (no cold chain required) and extreme margin expansion once estate-grown macadamias come online."
               : projectId === 'plan1'
               ? "With 9 boreholes and 19KL dam capacity, the farm is drought-proof. Pre-sold NSNP contracts and retail offtake agreements lock in revenue. 500kVA Solar eliminates energy cost risk."
               : "The facility maintains operational viability even under severe market stress. Our debt service coverage ratio (DSCR) provides an extraordinary safety buffer."
          }
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.risks.map((risk, i) => (
                <div key={i} className="bg-slate-800 p-4 rounded-lg">
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">{risk.label}</p>
                    <div className="flex justify-between items-end">
                    <span className={`text-xl md:text-2xl font-bold ${risk.color}`}>{risk.roi}</span>
                    <span className="text-xs md:text-sm text-slate-400">{risk.subtext}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
