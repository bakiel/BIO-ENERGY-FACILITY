
import React from 'react';
import SystemBlueprint from './SystemBlueprint';
import { Info, MousePointer2 } from 'lucide-react';

const AnimationStoryboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="bg-slate-900 rounded-xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <Info className="text-emerald-400 h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold">System Architecture Blueprint</h3>
                    <p className="text-slate-400 text-sm">Live schematic of material, energy, and value flows.</p>
                </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
                <MousePointer2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                Hover Nodes for Telemetry
            </div>
        </div>
        <p className="text-slate-300 max-w-4xl leading-relaxed text-sm md:text-base">
          This interactive blueprint visualizes the <strong>circular economy</strong> of Ubuntu Restoration Farms. 
          Unlike traditional linear agriculture, our system creates zero waste. Every output from one facility becomes a value-added input for another.
          <br/><br/>
          <span className="text-emerald-400">Key Integration Points:</span> Solar Energy (Yellow) powers all units. Water (Blue) is recycled. Organic Waste (Brown) becomes Compost or Energy. Bio-Refinery (P6) closes the loop by turning waste into Fuel (Orange) and Biochar (Black).
        </p>
      </div>

      {/* The Blueprint serves as the Storyboard content */}
      <div className="w-full shadow-2xl rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
        <SystemBlueprint projectId="master" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mb-3"></div>
            <h4 className="font-bold text-slate-900 mb-2">Circular Design</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
                Eliminating the concept of waste. Manure becomes compost, shells become biochar, and wastewater fertilizes crops.
            </p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
             <div className="w-3 h-3 rounded-full bg-amber-500 mb-3"></div>
            <h4 className="font-bold text-slate-900 mb-2">Energy Sovereignty</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
                100% off-grid operation via 4.5MW Solar Array and Plan 6 Bio-Diesel Refinery. Immune to load-shedding.
            </p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
             <div className="w-3 h-3 rounded-full bg-blue-500 mb-3"></div>
            <h4 className="font-bold text-slate-900 mb-2">Economic Multiplier</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
                Processing on-site retains 100% of the value chain, generating R1.2B in revenue and feeding 3.4M people.
            </p>
         </div>
      </div>
    </div>
  );
};

export default AnimationStoryboard;
