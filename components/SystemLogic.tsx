
import React from 'react';
import { Factory, Truck, Sprout, Recycle, Zap, TrendingUp, Sprout as SproutIcon, ShieldCheck, Pill, Beaker, Box, ChefHat, Flame, Package, Layers, Scale, Trees } from 'lucide-react';
import SystemBlueprint from './SystemBlueprint';

interface SystemLogicProps {
    projectId: string;
}

const SystemLogic: React.FC<SystemLogicProps> = ({ projectId }) => {
  
  const getPlanTitle = () => {
      if (projectId === 'plan5') return 'Plan 5: High-Tech Pharma';
      if (projectId === 'plan4') return 'Plan 4: Artisan Cheese & Bees';
      if (projectId === 'plan3') return 'Plan 3: Plant Meat Factory';
      if (projectId === 'plan3b') return 'Plan 3B: Medicinal Mushrooms';
      if (projectId === 'plan2') return 'Plan 2: Agroforestry Dairy';
      if (projectId === 'plan1') return 'Plan 1: Core Farm';
      if (projectId === 'master') return 'Master System Integration';
      return 'Plan 6: Energy Independence';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 ${projectId === 'plan5' ? 'bg-cyan-100' : (projectId === 'plan3b' ? 'bg-purple-100' : (projectId === 'plan4' ? 'bg-yellow-100' : (projectId === 'plan3' ? 'bg-amber-100' : (projectId === 'plan2' ? 'bg-green-100' : (projectId === 'plan1' ? 'bg-emerald-100' : 'bg-emerald-100')))))} rounded-lg`}>
                <Factory className={`h-6 w-6 ${projectId === 'plan5' ? 'text-cyan-700' : (projectId === 'plan3b' ? 'text-purple-700' : (projectId === 'plan4' ? 'text-yellow-700' : (projectId === 'plan3' ? 'text-amber-700' : (projectId === 'plan2' ? 'text-green-700' : (projectId === 'plan1' ? 'text-emerald-700' : 'text-emerald-700')))))}`} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-900">{getPlanTitle()}</h2>
                <p className="text-slate-500">Core Business Logic & System Design</p>
            </div>
      </div>

      {/* PART 1: VISUAL BLUEPRINT */}
      <div className="w-full shadow-lg rounded-xl overflow-hidden border border-slate-200">
         <SystemBlueprint projectId={projectId} />
      </div>

      {/* PART 2: DETAILED SPECS */}
      {projectId !== 'master' && (
        <div className="space-y-6">
          {/* Input Flow */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Truck className="h-4 w-4 text-slate-500" />
                  Input Flow Analysis
              </h3>
              
              {projectId === 'plan5' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                       <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-amber-600 uppercase mb-1">Energy (Solar)</div>
                          <div className="font-bold text-slate-900">100% Indep.</div>
                          <div className="text-xs text-slate-500 mt-2">4,561 kWp PV + Battery. Zero Eskom cost.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-blue-600 uppercase mb-1">Water</div>
                          <div className="font-bold text-slate-900">200k L/Mo</div>
                          <div className="text-xs text-slate-500 mt-2">Shared boreholes from Plan 1.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-emerald-600 uppercase mb-1">Seeds (Import)</div>
                          <div className="font-bold text-slate-900">R1.2M / Yr</div>
                          <div className="text-xs text-slate-500 mt-2">High-glucoraphanin hybrid variants.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-purple-600 uppercase mb-1">Substrate</div>
                          <div className="font-bold text-slate-900">Plan 3 Recyc.</div>
                          <div className="text-xs text-slate-500 mt-2">Compost from other farm units.</div>
                      </div>
                  </div>
              ) : projectId === 'plan3b' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                       <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-green-600 uppercase mb-1">Wood Chips</div>
                          <div className="font-bold text-slate-900">250T/Yr</div>
                          <div className="text-xs text-slate-500 mt-2">From Plan 1 prunings. Zero cost.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-amber-600 uppercase mb-1">Energy</div>
                          <div className="font-bold text-slate-900">50kW Solar</div>
                          <div className="text-xs text-slate-500 mt-2">Allocated from central array.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-blue-600 uppercase mb-1">Spawn</div>
                          <div className="font-bold text-slate-900">In-House</div>
                          <div className="text-xs text-slate-500 mt-2">Lab propagation from mother cultures.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-purple-600 uppercase mb-1">Capsules</div>
                          <div className="font-bold text-slate-900">Vegan HPMC</div>
                          <div className="text-xs text-slate-500 mt-2">Imported bulk for encapsulation.</div>
                      </div>
                  </div>
              ) : projectId === 'plan4' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                       <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-green-600 uppercase mb-1">Estate Macadamias</div>
                          <div className="font-bold text-slate-900">145T @ R3/kg</div>
                          <div className="text-xs text-slate-500 mt-2">From Plan 2. R25.7M savings vs market.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-yellow-600 uppercase mb-1">Cultures</div>
                          <div className="font-bold text-slate-900">Vegan Lactic</div>
                          <div className="text-xs text-slate-500 mt-2">Specific strains for cave ageing.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-orange-600 uppercase mb-1">Wax</div>
                          <div className="font-bold text-slate-900">Carnauba/Bees</div>
                          <div className="text-xs text-slate-500 mt-2">33% own beeswax (internal cycle).</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-blue-600 uppercase mb-1">Energy</div>
                          <div className="font-bold text-slate-900">300kW Solar</div>
                          <div className="text-xs text-slate-500 mt-2">400kWh battery for cave climate control.</div>
                      </div>
                  </div>
              ) : projectId === 'plan3' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                       <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-amber-600 uppercase mb-1">Soybeans</div>
                          <div className="font-bold text-slate-900">150 T/Year</div>
                          <div className="text-xs text-slate-500 mt-2">From Plan 1 (Internal supply).</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-blue-600 uppercase mb-1">Wheat Gluten</div>
                          <div className="font-bold text-slate-900">Seitan Base</div>
                          <div className="text-xs text-slate-500 mt-2">For premium deli cuts.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-emerald-600 uppercase mb-1">Wood Chips</div>
                          <div className="font-bold text-slate-900">Oak/Apple</div>
                          <div className="text-xs text-slate-500 mt-2">For real smoke curing.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-purple-600 uppercase mb-1">Packaging</div>
                          <div className="font-bold text-slate-900">Retort Pouch</div>
                          <div className="text-xs text-slate-500 mt-2">3-layer laminate (18mo shelf life).</div>
                      </div>
                  </div>
              ) : projectId === 'plan2' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                       <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-green-600 uppercase mb-1">Trees</div>
                          <div className="font-bold text-slate-900">36,000 Units</div>
                          <div className="text-xs text-slate-500 mt-2">Macadamias (Beaumont/A4).</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-amber-600 uppercase mb-1">Soybeans</div>
                          <div className="font-bold text-slate-900">180 Hectares</div>
                          <div className="text-xs text-slate-500 mt-2">Intercropped. Fixes N for trees.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-blue-600 uppercase mb-1">Water</div>
                          <div className="font-bold text-slate-900">-20% Usage</div>
                          <div className="text-xs text-slate-500 mt-2">Canopy reduces evapotranspiration.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-purple-600 uppercase mb-1">Pollination</div>
                          <div className="font-bold text-slate-900">200 Hives</div>
                          <div className="text-xs text-slate-500 mt-2">Bee service adds R20M value.</div>
                      </div>
                  </div>
              ) : projectId === 'plan1' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                       <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-green-600 uppercase mb-1">Land</div>
                          <div className="font-bold text-slate-900">445 Hectares</div>
                          <div className="text-xs text-slate-500 mt-2">220ha Cultivation / 220ha Wildlife.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-amber-600 uppercase mb-1">Water</div>
                          <div className="font-bold text-slate-900">9 Boreholes</div>
                          <div className="text-xs text-slate-500 mt-2">19,000 m³ Dam + Rain Harvesting.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-blue-600 uppercase mb-1">Nutrients</div>
                          <div className="font-bold text-slate-900">Manure/Rock</div>
                          <div className="text-xs text-slate-500 mt-2">3,000T Manure + 600T Rock Dust.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-purple-600 uppercase mb-1">Energy</div>
                          <div className="font-bold text-slate-900">500kVA Solar</div>
                          <div className="text-xs text-slate-500 mt-2">Off-grid power for irrigation.</div>
                      </div>
                  </div>
              ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-emerald-600 uppercase mb-1">Municipal</div>
                          <div className="font-bold text-slate-900">9,729 TPA</div>
                          <div className="text-xs text-slate-500 mt-2">We earn R250/T tipping fee.</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-amber-600 uppercase mb-1">Agricultural</div>
                          <div className="font-bold text-slate-900">16,590 TPA</div>
                          <div className="text-xs text-slate-500 mt-2">We pay R200/T (residues).</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-blue-600 uppercase mb-1">Industrial</div>
                          <div className="font-bold text-slate-900">2,145 TPA</div>
                          <div className="text-xs text-slate-500 mt-2">We pay R150/T (chips).</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-xs font-bold text-purple-600 uppercase mb-1">Internal</div>
                          <div className="font-bold text-slate-900">2,533 TPA</div>
                          <div className="text-xs text-slate-500 mt-2">Zero cost (Estate).</div>
                      </div>
                  </div>
              )}
          </div>

          {/* Process & Output */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-4">Operational Workflow</h3>
                  {projectId === 'plan5' ? (
                      <div className="relative space-y-6 pl-8 border-l-2 border-slate-200">
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-green-100 p-2 rounded-full border border-green-200">
                                  <SproutIcon className="h-4 w-4 text-green-600" />
                              </div>
                              <h4 className="font-bold text-slate-800">1. Precision Cultivation</h4>
                              <p className="text-sm text-slate-500">10,240m² Greenhouse. UV-B lighting induces stress response for max potency.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-blue-100 p-2 rounded-full border border-blue-200">
                                  <Recycle className="h-4 w-4 text-blue-600" />
                              </div>
                              <h4 className="font-bold text-blue-800">2. Enzyme Preservation (Moat)</h4>
                              <p className="text-sm text-slate-500">Freeze drying at -40°C preserves Myrosinase. Competitors use heat, destroying it.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-purple-100 p-2 rounded-full border border-purple-200">
                                  <ShieldCheck className="h-4 w-4 text-purple-600" />
                              </div>
                              <h4 className="font-bold text-purple-800">3. Cleanroom Encapsulation</h4>
                              <p className="text-sm text-slate-500">ISO Class 7 environment. 100% Solar ensures zero pressure-loss contamination.</p>
                          </div>
                      </div>
                  ) : projectId === 'plan3b' ? (
                      <div className="relative space-y-6 pl-8 border-l-2 border-slate-200">
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-emerald-100 p-2 rounded-full border border-emerald-200">
                                  <Recycle className="h-4 w-4 text-emerald-600" />
                              </div>
                              <h4 className="font-bold text-slate-800">1. Waste to Value</h4>
                              <p className="text-sm text-slate-500">250T wood prunings chipped and sterilized. From farm waste to high-value substrate.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-purple-100 p-2 rounded-full border border-purple-200">
                                  <SproutIcon className="h-4 w-4 text-purple-600" />
                              </div>
                              <h4 className="font-bold text-purple-800">2. Smart Fruiting</h4>
                              <p className="text-sm text-slate-500">Automated containers trigger pinning via temperature shock. Bio-mimicry of autumn rains.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-blue-100 p-2 rounded-full border border-blue-200">
                                  <Pill className="h-4 w-4 text-blue-600" />
                              </div>
                              <h4 className="font-bold text-blue-800">3. Pharma Encapsulation</h4>
                              <p className="text-sm text-slate-500">Freeze-dried powder encapsulated in ISO 7 cleanroom. 87% Gross Margin product.</p>
                          </div>
                      </div>
                  ) : projectId === 'plan4' ? (
                      <div className="relative space-y-6 pl-8 border-l-2 border-slate-200">
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-yellow-100 p-2 rounded-full border border-yellow-200">
                                  <Beaker className="h-4 w-4 text-yellow-600" />
                              </div>
                              <h4 className="font-bold text-slate-800">1. Culture & Ferment</h4>
                              <p className="text-sm text-slate-500">Macadamia milk (Plan 2) inoculated with specific Lactobacillus strains. Curd formation.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-slate-100 p-2 rounded-full border border-slate-200">
                                  <Box className="h-4 w-4 text-slate-600" />
                              </div>
                              <h4 className="font-bold text-slate-800">2. Cave Ageing</h4>
                              <p className="text-sm text-slate-500">12-14°C controlled environment. 2-12 months maturation develops crystal crunch.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-red-100 p-2 rounded-full border border-red-200">
                                  <ShieldCheck className="h-4 w-4 text-red-600" />
                              </div>
                              <h4 className="font-bold text-red-800">3. Hand Waxing</h4>
                              <p className="text-sm text-slate-500">Seals cheese for 18-month ambient shelf life. Eliminates cold chain costs.</p>
                          </div>
                      </div>
                  ) : projectId === 'plan3' ? (
                      <div className="relative space-y-6 pl-8 border-l-2 border-slate-200">
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-amber-100 p-2 rounded-full border border-amber-200">
                                  <ChefHat className="h-4 w-4 text-amber-600" />
                              </div>
                              <h4 className="font-bold text-slate-800">1. Protein Texturisation</h4>
                              <p className="text-sm text-slate-500">HMMA extrusion creates muscle fibers. Seitan hand-washing creates premium deli texture.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-red-100 p-2 rounded-full border border-red-200">
                                  <Flame className="h-4 w-4 text-red-600" />
                              </div>
                              <h4 className="font-bold text-red-800">2. Authentic Smoking</h4>
                              <p className="text-sm text-slate-500">Real applewood/oak smoke for 2-8 hours. Creates true Boerewors/Bacon flavour.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-slate-100 p-2 rounded-full border border-slate-200">
                                  <Package className="h-4 w-4 text-slate-600" />
                              </div>
                              <h4 className="font-bold text-slate-800">3. Retort Revolution</h4>
                              <p className="text-sm text-slate-500">30% output goes to Retort Pouches. 121°C sterilization = 18-month ambient shelf life.</p>
                          </div>
                      </div>
                  ) : projectId === 'plan2' ? (
                      <div className="relative space-y-6 pl-8 border-l-2 border-slate-200">
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-green-100 p-2 rounded-full border border-green-200">
                                  <Trees className="h-4 w-4 text-green-600" />
                              </div>
                              <h4 className="font-bold text-slate-800">1. Agroforestry System</h4>
                              <p className="text-sm text-slate-500">Macadamia trees planted with Soybean intercrop. Synergistic nutrient exchange and microclimate creation.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-amber-100 p-2 rounded-full border border-amber-200">
                                  <Beaker className="h-4 w-4 text-amber-600" />
                              </div>
                              <h4 className="font-bold text-amber-800">2. Dual-Phase Dairy</h4>
                              <p className="text-sm text-slate-500">Years 1-5: Soy Milk. Years 6+: Premium Mac Milk. Seamless transition in same facility.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-blue-100 p-2 rounded-full border border-blue-200">
                                  <Package className="h-4 w-4 text-blue-600" />
                              </div>
                              <h4 className="font-bold text-blue-800">3. UHT & Cold Chain</h4>
                              <p className="text-sm text-slate-500">UHT for ambient shelf-life (retail). Cold chain for yoghurt/cheese (fresh).</p>
                          </div>
                      </div>
                  ) : projectId === 'plan1' ? (
                      <div className="relative space-y-6 pl-8 border-l-2 border-slate-200">
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-blue-100 p-2 rounded-full border border-blue-200">
                                  <Factory className="h-4 w-4 text-blue-600" />
                              </div>
                              <h4 className="font-bold text-slate-800">1. Water Mastery</h4>
                              <p className="text-sm text-slate-500">Underground harvesting + Magnetic filtration. 23% yield boost.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-slate-100 p-2 rounded-full border border-slate-200">
                                  <Layers className="h-4 w-4 text-slate-600" />
                              </div>
                              <h4 className="font-bold text-slate-800">2. Soil Remineralisation</h4>
                              <p className="text-sm text-slate-500">Rock Dust (Basalt) crushing. Adds trace minerals for 50+ years.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-emerald-100 p-2 rounded-full border border-emerald-200">
                                  <SproutIcon className="h-4 w-4 text-emerald-600" />
                              </div>
                              <h4 className="font-bold text-emerald-800">3. Regenerative Production</h4>
                              <p className="text-sm text-slate-500">Intensive vegetables + Macadamia/Soy intercrop. Zero chemical inputs.</p>
                          </div>
                      </div>
                  ) : (
                      <div className="relative space-y-6 pl-8 border-l-2 border-slate-200">
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-slate-100 p-2 rounded-full border border-slate-200">
                                  <Scale className="h-4 w-4 text-slate-600" />
                              </div>
                              <h4 className="font-bold text-slate-800">1. Receiving & QC</h4>
                              <p className="text-sm text-slate-500">Weighing, moisture testing (&lt;20%), and sorting.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-emerald-100 p-2 rounded-full border border-emerald-200">
                                  <Recycle className="h-4 w-4 text-emerald-600" />
                              </div>
                              <h4 className="font-bold text-emerald-800">2. Pelletisation (Moat)</h4>
                              <p className="text-sm text-slate-500">2.5T/hr unit converts ANY organic material into 6-8mm pellets. Enables diversity.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[41px] top-0 bg-amber-100 p-2 rounded-full border border-amber-200">
                                  <Zap className="h-4 w-4 text-amber-600" />
                              </div>
                              <h4 className="font-bold text-amber-800">3. Continuous Pyrolysis</h4>
                              <p className="text-sm text-slate-500">500°C, Oxygen-free, 24/7 operation (93% uptime).</p>
                          </div>
                      </div>
                  )}
              </div>
              
              <div className="bg-slate-800 text-white p-6 rounded-xl shadow-sm border border-slate-700">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Output Value {projectId === 'plan2' || projectId === 'plan4' ? '(Year 7)' : projectId === 'plan1' ? '(Year 1)' : '(Year 3)'}
                  </h3>
                  {projectId === 'plan5' ? (
                      <div className="space-y-4">
                          <div className="pb-4 border-b border-slate-700">
                              <div className="text-xs text-slate-400 uppercase">Broccoli Powder</div>
                              <div className="text-xl font-bold text-emerald-400">R 325.0M</div>
                              <div className="text-sm text-slate-300">13T Dry / 130T Fresh</div>
                          </div>
                          <div className="pb-4 border-b border-slate-700">
                              <div className="text-xs text-slate-400 uppercase">Retail Capsules</div>
                              <div className="text-xl font-bold text-cyan-400">R 120.0M</div>
                              <div className="text-sm text-slate-300">5 Million Units</div>
                          </div>
                           <div>
                              <div className="text-xs text-slate-400 uppercase">Energy Savings</div>
                              <div className="text-xl font-bold text-amber-400">R 57.0M</div>
                              <div className="text-sm text-slate-300">Avoided grid cost</div>
                          </div>
                      </div>
                  ) : projectId === 'plan3b' ? (
                      <div className="space-y-4">
                          <div className="pb-4 border-b border-slate-700">
                              <div className="text-xs text-slate-400 uppercase">Export Dried</div>
                              <div className="text-xl font-bold text-purple-400">R 9.49M</div>
                              <div className="text-sm text-slate-300">Premium Organic to USA/EU</div>
                          </div>
                          <div className="pb-4 border-b border-slate-700">
                              <div className="text-xs text-slate-400 uppercase">Medicinal Capsules</div>
                              <div className="text-xl font-bold text-blue-400">R 8.15M</div>
                              <div className="text-sm text-slate-300">87% Gross Margin</div>
                          </div>
                           <div>
                              <div className="text-xs text-slate-400 uppercase">Culinary & Blends</div>
                              <div className="text-xl font-bold text-emerald-400">R 12.4M</div>
                              <div className="text-sm text-slate-300">Fresh retail & value added</div>
                          </div>
                      </div>
                  ) : projectId === 'plan4' ? (
                       <div className="space-y-4">
                          <div className="pb-4 border-b border-slate-700">
                              <div className="text-xs text-slate-400 uppercase">Artisan Cheese</div>
                              <div className="text-xl font-bold text-yellow-400">R 36.0M</div>
                              <div className="text-sm text-slate-300">72.6T @ R500/kg</div>
                          </div>
                          <div className="pb-4 border-b border-slate-700">
                              <div className="text-xs text-slate-400 uppercase">Raw Honey</div>
                              <div className="text-xl font-bold text-amber-400">R 3.0M</div>
                              <div className="text-sm text-slate-300">22T Production</div>
                          </div>
                          <div>
                              <div className="text-xs text-slate-400 uppercase">Pollination Value</div>
                              <div className="text-xl font-bold text-emerald-400">R 14.0M</div>
                              <div className="text-sm text-slate-300">To Plan 2 (Macs)</div>
                          </div>
                      </div>
                  ) : projectId === 'plan3' ? (
                       <div className="space-y-4">
                          <div className="pb-4 border-b border-slate-700">
                              <div className="text-xs text-slate-400 uppercase">Smokehouse Range</div>
                              <div className="text-xl font-bold text-orange-400">R 47.9M</div>
                              <div className="text-sm text-slate-300">Boerewors, Bacon, Ribs</div>
                          </div>
                          <div className="pb-4 border-b border-slate-700">
                              <div className="text-xs text-slate-400 uppercase">HMMA & Convenience</div>
                              <div className="text-xl font-bold text-blue-400">R 58.6M</div>
                              <div className="text-sm text-slate-300">Burgers, Nuggets, Mince</div>
                          </div>
                          <div>
                              <div className="text-xs text-slate-400 uppercase">Seitan Deli</div>
                              <div className="text-xl font-bold text-red-400">R 28.3M</div>
                              <div className="text-sm text-slate-300">Premium Cold Cuts</div>
                          </div>
                      </div>
                  ) : projectId === 'plan2' ? (
                      <div className="space-y-4">
                           <div className="pb-4 border-b border-slate-700">
                              <div className="text-xs text-slate-400 uppercase">Mac Dairy Products</div>
                              <div className="text-xl font-bold text-emerald-400">R 90.8M</div>
                              <div className="text-sm text-slate-300">Premium Milk/Yoghurt</div>
                          </div>
                          <div className="pb-4 border-b border-slate-700">
                              <div className="text-xs text-slate-400 uppercase">Mac Confectionery</div>
                              <div className="text-xl font-bold text-amber-400">R 57.5M</div>
                              <div className="text-sm text-slate-300">Chocolate & Ice Cream</div>
                          </div>
                          <div>
                              <div className="text-xs text-slate-400 uppercase">Bee/Honey Value</div>
                              <div className="text-xl font-bold text-yellow-400">R 20.9M</div>
                              <div className="text-sm text-slate-300">Ecosys Services</div>
                          </div>
                      </div>
                  ) : projectId === 'plan1' ? (
                      <div className="space-y-4">
                           <div className="pb-4 border-b border-slate-700">
                              <div className="text-xs text-slate-400 uppercase">Vegetables (Premium)</div>
                              <div className="text-xl font-bold text-green-400">R 20.5M</div>
                              <div className="text-sm text-slate-300">High-Brix (Rock Dust)</div>
                          </div>
                          <div className="pb-4 border-b border-slate-700">
                              <div className="text-xs text-slate-400 uppercase">Logistics Services</div>
                              <div className="text-xl font-bold text-blue-400">R 4.7M</div>
                              <div className="text-sm text-slate-300">Transporting Inputs</div>
                          </div>
                          <div>
                              <div className="text-xs text-slate-400 uppercase">Compost & Dust</div>
                              <div className="text-xl font-bold text-amber-400">R 4.1M</div>
                              <div className="text-sm text-slate-300">Soil Amendments</div>
                          </div>
                      </div>
                  ) : (
                      <div className="space-y-4">
                          <div className="pb-4 border-b border-slate-700">
                              <div className="text-xs text-slate-400 uppercase">Bio-Diesel</div>
                              <div className="text-xl font-bold text-emerald-400">R 60.4M</div>
                              <div className="text-sm text-slate-300">3.45 Million Litres</div>
                          </div>
                           <div className="pb-4 border-b border-slate-700">
                              <div className="text-xs text-slate-400 uppercase">Biochar</div>
                              <div className="text-xl font-bold text-slate-400">R 22.5M</div>
                              <div className="text-sm text-slate-300">3,000 Tonnes</div>
                          </div>
                          <div>
                              <div className="text-xs text-slate-400 uppercase">Logistics Savings</div>
                              <div className="text-xl font-bold text-blue-400">R 6.9M</div>
                              <div className="text-sm text-slate-300">In-house Fleet</div>
                          </div>
                      </div>
                  )}
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemLogic;
