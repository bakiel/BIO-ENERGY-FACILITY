
import React from 'react';
import { Users, Sprout, Droplets, Car, Heart, Sun, ShieldCheck, Trees, Utensils, Box, Recycle } from 'lucide-react';

interface ImpactProps {
    projectId: string;
}

const Impact: React.FC<ImpactProps> = ({ projectId }) => {
  
  const getGradient = () => {
      if (projectId === 'plan5') return 'from-cyan-900 to-slate-900';
      if (projectId === 'plan3b') return 'from-purple-900 to-slate-900';
      if (projectId === 'plan4') return 'from-yellow-900 to-slate-900';
      if (projectId === 'plan3') return 'from-amber-900 to-slate-900';
      if (projectId === 'plan2') return 'from-green-900 to-slate-900';
      if (projectId === 'plan1') return 'from-emerald-900 to-slate-900';
      return 'from-emerald-900 to-slate-900';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className={`bg-gradient-to-r ${getGradient()} rounded-2xl p-8 text-white`}>
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Double Bottom Line</h2>
          <p className="text-emerald-100 text-lg">
            {projectId === 'plan5'
                ? "Plan 5 is the backbone of our anti-fragility. By installing 4.9MW of solar capacity across the estate, we eliminate grid dependency, lower operating costs by R60M annually, and ensure zero production downtime."
                : projectId === 'plan3b'
                ? "Plan 3B is a health revolution. We are substituting R8.5B of imports with SA's first commercial medicinal mushrooms, supporting national cognitive health while valorizing agricultural waste into premium medicine."
                : projectId === 'plan4'
                ? "Plan 4 proves luxury can be regenerative. By eliminating the cold chain through traditional waxing, we cut carbon emissions by 88% while our bees provide R14M in pollination services to the macadamia ecosystem."
                : projectId === 'plan3'
                ? "Plan 3 transforms plant protein into a tool for social equity. By leveraging government tenders and retort technology, we deliver shelf-stable nutrition to schools and hospitals while creating 263 local jobs."
                : projectId === 'plan2'
                ? "Plan 2 is the ultimate regenerative model. By integrating macadamia trees with soy crops and dairy processing, we create a system that sequesters carbon, saves water, and creates high-value manufacturing jobs."
                : projectId === 'plan1'
                ? "Plan 1 is the foundation. We are proving that regenerative agriculture is more profitable than extractive farming. By remineralizing the soil, we secure food production for 500 years."
                : "Ubuntu Energy Independence is not just an infrastructure project; it is a mechanism for rural transformation and climate action. We solve the diesel import crisis while regenerating the soil."
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Job Creation */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="mx-auto bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="text-blue-600 h-6 w-6" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">{projectId === 'plan5' ? '18' : (projectId === 'plan3b' ? '47' : (projectId === 'plan4' ? '53' : (projectId === 'plan3' ? '98' : (projectId === 'plan2' ? '62' : (projectId === 'plan1' ? '185' : (projectId === 'master' ? '1,205' : '19'))))))}</h3>
            <p className="text-sm font-bold text-slate-600 uppercase tracking-wider mt-1">Direct Jobs</p>
            <p className="text-xs text-slate-400 mt-2">{projectId === 'plan5' ? 'Tech & Maintenance' : 'Local Employment'}</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs text-emerald-600 font-bold">{projectId === 'plan5' ? 'R114k Avg' : (projectId === 'plan3b' ? 'R82k Avg' : (projectId === 'plan4' ? 'R85k Avg' : (projectId === 'plan3' ? 'R86k Avg' : (projectId === 'plan2' ? 'R90k Avg' : (projectId === 'plan1' ? 'R81k Avg' : 'R244k Avg')))))}</span>
                <span className="text-xs text-slate-400 block">Annual Salary</span>
            </div>
        </div>

        {/* Environment / Health */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="mx-auto bg-emerald-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                {projectId === 'plan5' ? <Sun className="text-amber-500 h-6 w-6" /> : (projectId === 'plan3b' ? <Heart className="text-purple-500 h-6 w-6" /> : (projectId === 'plan4' ? <Box className="text-yellow-500 h-6 w-6" /> : (projectId === 'plan3' ? <Utensils className="text-orange-500 h-6 w-6" /> : (projectId === 'plan2' ? <Trees className="text-green-600 h-6 w-6" /> : <Sprout className="text-emerald-600 h-6 w-6" />))))}
            </div>
            <h3 className="text-3xl font-bold text-slate-900">{projectId === 'plan5' ? '-5,200' : (projectId === 'plan3b' ? '550T' : (projectId === 'plan4' ? '-88%' : (projectId === 'plan3' ? '3.4M' : (projectId === 'plan2' ? '-9,000' : (projectId === 'plan1' ? '500' : (projectId === 'master' ? '-19,085' : '-12.5k'))))))}</h3>
            <p className="text-sm font-bold text-slate-600 uppercase tracking-wider mt-1">{projectId === 'plan5' ? 'T CO₂e/Year' : (projectId === 'plan3b' ? 'Waste Recycled' : (projectId === 'plan4' ? 'Export Carbon' : (projectId === 'plan3' ? 'Meals/Year' : (projectId === 'plan2' ? 'T CO₂e/Year' : (projectId === 'plan1' ? 'Years Fertility' : 'T CO₂e/Year')))))}</p>
            <p className="text-xs text-slate-400 mt-2">{projectId === 'plan5' ? 'Grid Offset' : (projectId === 'plan3b' ? 'From Plan 1 Prunings' : (projectId === 'plan4' ? 'Vs Refrigerated Freight' : (projectId === 'plan3' ? 'Affordable Protein Access' : (projectId === 'plan2' ? 'Sequestration' : (projectId === 'plan1' ? 'Rock Dust Remineralization' : 'Avoided Emissions')))))}</p>
             <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-1">
                {projectId === 'plan5' ? <ShieldCheck className="h-3 w-3 text-slate-400" /> : (projectId === 'plan3b' ? <Recycle className="h-3 w-3 text-slate-400" /> : <Car className="h-3 w-3 text-slate-400" />)}
                <span className="text-xs text-slate-500">{projectId === 'plan5' ? 'Zero Coal Power' : (projectId === 'plan3b' ? 'R550k Compost Value' : (projectId === 'plan4' ? 'No Cold Chain Needed' : (projectId === 'plan3' ? 'Govt Tender Support' : (projectId === 'plan2' ? 'Carbon Sink' : (projectId === 'plan1' ? 'Soil Capital Created' : '= 2,730 Cars Removed')))))}</span>
            </div>
        </div>

        {/* Energy / Water */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="mx-auto bg-cyan-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                {projectId === 'plan5' ? <Sun className="text-amber-500 h-6 w-6" /> : (projectId === 'plan3b' ? <Droplets className="text-blue-500 h-6 w-6" /> : <Droplets className="text-cyan-600 h-6 w-6" />)}
            </div>
            <h3 className="text-3xl font-bold text-slate-900">{projectId === 'plan5' ? '100%' : (projectId === 'plan3b' ? '-90%' : (projectId === 'plan4' ? '400kWh' : (projectId === 'plan3' ? 'Zero' : (projectId === 'plan2' ? '-20%' : (projectId === 'plan1' ? '+23%' : (projectId === 'master' ? '100%' : '+53ML'))))))}</h3>
            <p className="text-sm font-bold text-slate-600 uppercase tracking-wider mt-1">{projectId === 'plan5' ? 'Energy Indep.' : (projectId === 'plan3b' ? 'Water Use' : (projectId === 'plan4' ? 'Battery Storage' : (projectId === 'plan3' ? 'Cold Chain' : (projectId === 'plan2' ? 'Water Savings' : (projectId === 'plan1' ? 'Yield Boost' : 'Energy Indep.')))))}</p>
            <p className="text-xs text-slate-400 mt-2">{projectId === 'plan5' ? '4.9MW Solar Array' : (projectId === 'plan3b' ? 'Vs Field Farming' : (projectId === 'plan4' ? 'Cave Climate Control' : (projectId === 'plan3' ? 'Retort Tech (Ambient)' : (projectId === 'plan2' ? 'Microclimate Effect' : (projectId === 'plan1' ? 'Magnetic Filtration' : 'Biochar Soil Retention')))))}</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">{projectId === 'plan5' ? 'R60M Annual Savings' : (projectId === 'plan3b' ? 'Closed Loop System' : (projectId === 'plan4' ? 'R626k Energy Savings' : (projectId === 'plan3' ? 'Energy Efficient Logistics' : (projectId === 'plan2' ? 'Vs Monoculture' : (projectId === 'plan1' ? 'Drought Proofing' : 'Offsets plant usage 2.5x')))))}</span>
            </div>
        </div>

        {/* Economic Value */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="mx-auto bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="text-purple-600 h-6 w-6" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">{projectId === 'plan5' ? 'R 60.4M' : (projectId === 'plan3b' ? 'R 8.5B' : (projectId === 'plan4' ? 'R 14M' : (projectId === 'plan3' ? 'R 52.8M' : (projectId === 'plan2' ? 'R 110M' : (projectId === 'plan1' ? 'R 42.5M' : (projectId === 'master' ? 'R 1.24B' : 'R 192M'))))))}</h3>
            <p className="text-sm font-bold text-slate-600 uppercase tracking-wider mt-1">{projectId === 'plan4' ? 'Eco-Service' : (projectId === 'plan3b' ? 'Total TAM' : (projectId === 'master' ? 'Total Rev' : 'Local Econ Impact'))}</p>
            <p className="text-xs text-slate-400 mt-2">{projectId === 'plan4' ? 'Pollination Value' : (projectId === 'plan3b' ? 'Import Substitution' : (projectId === 'master' ? 'Year 7 Forecast' : 'Multiplier Effect'))}</p>
            <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">{projectId === 'plan4' ? '+40% Macadamia Yield' : (projectId === 'plan3b' ? 'Replacing Imports' : (projectId === 'master' ? 'Includes UAEI' : 'Modimolle Region'))}</span>
            </div>
        </div>
      </div>

      {/* B-BBEE Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">B-BBEE & Transformation (Level 1 Projected)</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-slate-50 rounded border border-slate-100">
                <span className="block text-slate-500 mb-1">Target: Women</span>
                <span className="font-bold text-slate-900">30%</span>
            </div>
             <div className="p-3 bg-slate-50 rounded border border-slate-100">
                <span className="block text-slate-500 mb-1">Target: Youth</span>
                <span className="font-bold text-slate-900">45%</span>
            </div>
             <div className="p-3 bg-slate-50 rounded border border-slate-100">
                <span className="block text-slate-500 mb-1">Skills Development</span>
                <span className="font-bold text-slate-900">R1.2M/Yr</span>
            </div>
             <div className="p-3 bg-slate-50 rounded border border-slate-100">
                <span className="block text-slate-500 mb-1">Local Procurement</span>
                <span className="font-bold text-slate-900">70%</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
