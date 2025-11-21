
import React, { useState, useMemo } from 'react';
import { Factory, Activity, ArrowRight, Gauge, Thermometer, Scale, Zap, Clock, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import SystemBlueprint, { nodeConfig } from './SystemBlueprint';

interface SystemLogicProps {
    projectId: string;
}

// --- MOCK DATA FOR NODE INSPECTOR ---
const nodeDetails: Record<string, any> = {
    solar: {
        inputs: [{ label: "Solar Irradiance", val: "1000 W/m²" }, { label: "Panel Area", val: "2.5 Ha" }],
        process: { desc: "Photovoltaic Conversion", eff: "22%" },
        outputs: [{ label: "DC Power", val: "4.9 MWp" }, { label: "AC Grid Feed", val: "4.5 MW" }],
        kpi: { temp: "45°C", load: "85%", status: "Optimal" }
    },
    water: {
        inputs: [{ label: "Rainfall", val: "650mm/yr" }, { label: "Boreholes", val: "9 Units" }],
        process: { desc: "Magnetic Filtration", eff: "99.9%" },
        outputs: [{ label: "Irrigation", val: "19ML Dam" }, { label: "Potable", val: "20k L/day" }],
        kpi: { temp: "18°C", load: "45%", status: "Filling" }
    },
    wildlife: {
        inputs: [{ label: "Biomass", val: "Native Grass" }],
        process: { desc: "Natural Grazing", eff: "100%" },
        outputs: [{ label: "Manure", val: "3000 T/yr" }, { label: "Tourism", val: "R2.5M/yr" }],
        kpi: { temp: "Ambient", load: "N/A", status: "Active" }
    },
    farm_veg: {
        inputs: [{ label: "Water", val: "319 KL" }, { label: "Compost", val: "2300 T" }],
        process: { desc: "Intensive Horticulture", eff: "R20.5M Rev" },
        outputs: [{ label: "Vegetables", val: "1149 T" }, { label: "Residue", val: "150 T" }],
        kpi: { temp: "24°C", load: "92%", status: "Harvest" }
    },
    compost: {
        inputs: [{ label: "Manure", val: "3000 T" }, { label: "Chips", val: "250 T" }],
        process: { desc: "Aerobic Fermentation", eff: "6 Weeks" },
        outputs: [{ label: "Humus", val: "2300 T" }, { label: "CO2 Seq", val: "Permanent" }],
        kpi: { temp: "65°C", load: "100%", status: "Cooking" }
    },
    farm_tree: {
        inputs: [{ label: "Trees", val: "36,000" }, { label: "Land", val: "180 Ha" }],
        process: { desc: "Photosynthesis", eff: "High" },
        outputs: [{ label: "Macadamias", val: "288 T" }, { label: "Prunings", val: "250 T" }],
        kpi: { temp: "Ambient", load: "Year 4", status: "Growing" }
    },
    farm_soy: {
        inputs: [{ label: "Seed", val: "Non-GMO" }, { label: "Inoculant", val: "Rhizobium" }],
        process: { desc: "Nitrogen Fixation", eff: "+N Soil" },
        outputs: [{ label: "Soybeans", val: "270 T" }, { label: "Stover", val: "Biomass" }],
        kpi: { temp: "Ambient", load: "Summer", status: "Mature" }
    },
    p5_solar: {
        inputs: [{ label: "Sunlight", val: "Peak" }, { label: "Grid", val: "Disconnected" }],
        process: { desc: "Energy Distribution", eff: "99.9% Uptime" },
        outputs: [{ label: "Electricity", val: "9.05M kWh" }, { label: "Savings", val: "R60M/yr" }],
        kpi: { temp: "35°C", load: "100%", status: "Powering" }
    },
    p3b_mush: {
        inputs: [{ label: "Substrate", val: "Wood Chips" }, { label: "Spores", val: "Lion's Mane" }],
        process: { desc: "Controlled Fruiting", eff: "14 Days" },
        outputs: [{ label: "Mushrooms", val: "100 T" }, { label: "Spent Substrate", val: "Compost" }],
        kpi: { temp: "18°C", load: "95%", status: "Fruiting" }
    },
    p2_dairy: {
        inputs: [{ label: "Raw Nuts/Soy", val: "Estate" }, { label: "Water", val: "Filtered" }],
        process: { desc: "Colloid Milling", eff: "2000 L/hr" },
        outputs: [{ label: "Plant Milk", val: "2M Liters" }, { label: "Okara", val: "Feed" }],
        kpi: { temp: "4°C", load: "80%", status: "Processing" }
    },
    p4_cheese: {
        inputs: [{ label: "Nut Milk", val: "Fermented" }, { label: "Cultures", val: "Vegan" }],
        process: { desc: "Cave Ageing", eff: "6 Months" },
        outputs: [{ label: "Aged Cheese", val: "20k Wheels" }, { label: "Wax", val: "Sealed" }],
        kpi: { temp: "12°C", load: "Full", status: "Ageing" }
    },
    p3_meat: {
        inputs: [{ label: "Protein", val: "Gluten/Soy" }, { label: "Flavor", val: "Smoke" }],
        process: { desc: "HMMA Extrusion", eff: "1 T/day" },
        outputs: [{ label: "Plant Meat", val: "858 T" }, { label: "Retort", val: "Shelf Stable" }],
        kpi: { temp: "140°C", load: "85%", status: "Running" }
    },
    p6_energy: {
        inputs: [{ label: "Biomass", val: "Diverse" }, { label: "Heat", val: "Recycled" }],
        process: { desc: "Fast Pyrolysis", eff: "80% Yield" },
        outputs: [{ label: "Bio-Diesel", val: "3.45M L" }, { label: "Biochar", val: "3000 T" }],
        kpi: { temp: "500°C", load: "98%", status: "Nominal" }
    },
    out_food: {
        inputs: [{ label: "Production", val: "All Units" }],
        process: { desc: "Distribution", eff: "National" },
        outputs: [{ label: "Meals", val: "3.43 Million" }, { label: "Nutrition", val: "High" }],
        kpi: { temp: "N/A", load: "High", status: "Secure" }
    },
    out_econ: {
        inputs: [{ label: "Sales", val: "Global" }],
        process: { desc: "Wealth Creation", eff: "65% Margin" },
        outputs: [{ label: "Revenue", val: "R1.2 Billion" }, { label: "Jobs", val: "1,205" }],
        kpi: { temp: "Hot", load: "Growing", status: "Positive" }
    },
    out_climate: {
        inputs: [{ label: "Emissions", val: "Avoided" }],
        process: { desc: "Sequestration", eff: "Net Neg" },
        outputs: [{ label: "Carbon", val: "-19,085 T" }, { label: "Soil", val: "Restored" }],
        kpi: { temp: "Cool", load: "Max", status: "Green" }
    }
};

const NodeDetailPanel = ({ nodeId }: { nodeId: string | null }) => {
    if (!nodeId) {
        return (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                <Activity className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm font-bold uppercase tracking-widest">Select a System Node to Inspect</p>
            </div>
        );
    }

    const config = nodeConfig[nodeId as keyof typeof nodeConfig];
    const details = nodeDetails[nodeId] || { inputs: [], outputs: [], process: { desc: "Processing", eff: "Normal" }, kpi: { temp: "-", load: "-", status: "-" } };

    return (
        <div className="bg-slate-900 text-white rounded-xl overflow-hidden shadow-xl border border-slate-700 animate-fade-in-up">
            {/* Header */}
            <div className={`bg-gradient-to-r from-${config.color}-900 to-slate-900 p-4 border-b border-slate-700 flex justify-between items-center`}>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${config.color}-500/20 border border-${config.color}-500/50 text-${config.color}-400`}>
                        {React.createElement(config.icon, { size: 24 })}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold leading-none">{config.label}</h3>
                        <p className={`text-xs font-bold uppercase tracking-wider text-${config.color}-400 mt-1`}>{config.type} Node // {config.sub}</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-[10px] uppercase text-slate-400 font-bold">System Status</div>
                        <div className="text-emerald-400 font-bold flex items-center justify-end gap-1">
                            <CheckCircle2 size={14} /> ONLINE
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-700">
                
                {/* Column 1: Input Stream */}
                <div className="p-6 space-y-4">
                    <h4 className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                        <ArrowRight className="w-3 h-3" /> Input Stream
                    </h4>
                    <div className="space-y-3">
                        {details.inputs.map((input: any, i: number) => (
                            <div key={i} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                <span className="text-sm text-slate-300">{input.label}</span>
                                <span className="font-mono text-sm font-bold text-white">{input.val}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column 2: Transformation Logic */}
                <div className="p-6 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 shadow-[0_0_15px_#10b981]"></div>
                    
                    <div className="text-center space-y-2">
                        <div className="inline-block p-3 rounded-full bg-slate-800 border border-slate-600 mb-2">
                            <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                        </div>
                        <h4 className="text-lg font-bold">{details.process.desc}</h4>
                        <p className="text-slate-400 text-sm">Active Transformation</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-slate-800 p-2 rounded border border-slate-700">
                            <div className="text-[10px] uppercase text-slate-500 font-bold mb-1">Temp</div>
                            <div className="font-mono font-bold text-emerald-400">{details.kpi.temp}</div>
                        </div>
                        <div className="bg-slate-800 p-2 rounded border border-slate-700">
                            <div className="text-[10px] uppercase text-slate-500 font-bold mb-1">Load</div>
                            <div className="font-mono font-bold text-blue-400">{details.kpi.load}</div>
                        </div>
                        <div className="bg-slate-800 p-2 rounded border border-slate-700">
                            <div className="text-[10px] uppercase text-slate-500 font-bold mb-1">Eff</div>
                            <div className="font-mono font-bold text-amber-400">{details.process.eff}</div>
                        </div>
                    </div>
                </div>

                {/* Column 3: Output Value */}
                <div className="p-6 space-y-4">
                    <h4 className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2 justify-end">
                        Output Value <Scale className="w-3 h-3" />
                    </h4>
                    <div className="space-y-3">
                        {details.outputs.map((output: any, i: number) => (
                            <div key={i} className="text-right">
                                <div className="text-2xl font-bold text-white">{output.val}</div>
                                <div className="text-xs uppercase font-bold text-emerald-500">{output.label}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700 flex justify-end items-center gap-2 text-xs text-slate-400">
                        <Clock className="w-3 h-3" /> Real-time telemetry
                    </div>
                </div>

            </div>
        </div>
    );
};

const SystemLogic: React.FC<SystemLogicProps> = ({ projectId }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const getPlanTitle = () => {
      if (projectId === 'plan5') return 'Plan 5: Estate Solar';
      if (projectId === 'plan4') return 'Plan 4: Artisan Cheese & Bees';
      if (projectId === 'plan3') return 'Plan 3: Plant Meat Factory';
      if (projectId === 'plan3b') return 'Plan 3B: Medicinal Mushrooms';
      if (projectId === 'plan2') return 'Plan 2: Agroforestry Dairy';
      if (projectId === 'plan1') return 'Plan 1: Core Farm';
      if (projectId === 'master') return 'Master System Integration';
      return 'Plan 6: Energy Independence';
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 ${projectId === 'plan5' ? 'bg-cyan-100' : (projectId === 'plan3b' ? 'bg-purple-100' : (projectId === 'plan4' ? 'bg-yellow-100' : (projectId === 'plan3' ? 'bg-amber-100' : (projectId === 'plan2' ? 'bg-green-100' : (projectId === 'plan1' ? 'bg-emerald-100' : 'bg-emerald-100')))))} rounded-lg`}>
                <Factory className={`h-6 w-6 ${projectId === 'plan5' ? 'text-cyan-700' : (projectId === 'plan3b' ? 'text-purple-700' : (projectId === 'plan4' ? 'text-yellow-700' : (projectId === 'plan3' ? 'text-amber-700' : (projectId === 'plan2' ? 'text-green-700' : (projectId === 'plan1' ? 'text-emerald-700' : 'text-emerald-700')))))}`} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-900">{getPlanTitle()}</h2>
                <p className="text-slate-500">Interactive System Architecture</p>
            </div>
      </div>

      {/* PART 1: VISUAL BLUEPRINT */}
      <div className="w-full shadow-2xl rounded-xl overflow-hidden border border-slate-200 bg-slate-950">
         <SystemBlueprint 
            projectId={projectId} 
            onNodeSelect={setSelectedNode}
            selectedNodeId={selectedNode}
         />
      </div>

      {/* PART 2: DYNAMIC NODE INSPECTOR */}
      <div id="node-inspector" className="scroll-mt-24">
          <NodeDetailPanel nodeId={selectedNode} />
      </div>
    </div>
  );
};

export default SystemLogic;
