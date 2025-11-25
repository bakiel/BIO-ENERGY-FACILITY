
import React, { useState, useEffect } from 'react';
import { ArrowRight, Cog, Droplets, Flame, Recycle, Truck, Zap, Thermometer, Gauge, Activity, Scale, Filter, ChevronsRight, ChevronsDown, Sun, Sprout, Snowflake, ShieldCheck, Pill, Trees, Milk, Package, Utensils, Award, ChefHat, Hammer, Beaker, Hexagon, Box } from 'lucide-react';

interface TechAndOpsProps {
    projectId: string;
}

const CapacityRing = ({ label, current, max, unit, icon: Icon, colorClass, displayValue }: any) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    
    useEffect(() => {
        // Animate the value from 0 to current
        let start = 0;
        const end = current;
        const duration = 1500; // 1.5 seconds animation
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out
            
            setAnimatedValue(start + (end - start) * easeOut);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [current]);

    // Segment configuration
    const totalSegments = 48;
    const radiusInner = 54;
    const radiusOuter = 64;
    const center = 80;
    
    // Calculate filled segments based on current animated value
    const percentage = Math.min(1, Math.max(0, animatedValue / max));
    const filledCount = Math.round(percentage * totalSegments);

    const renderSegments = () => {
        return Array.from({ length: totalSegments }).map((_, i) => {
            const isFilled = i < filledCount;
            // Start from -90deg (top)
            const angle = (i * 360) / totalSegments - 90; 
            
            return (
                <line
                    key={i}
                    x1={center + radiusInner}
                    y1={center}
                    x2={center + radiusOuter}
                    y2={center}
                    className={`${isFilled ? colorClass : 'text-slate-100'} transition-colors duration-75`}
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    transform={`rotate(${angle} ${center} ${center})`}
                />
            );
        });
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow w-full">
            <div className="relative w-48 h-48 mb-4 scale-90 sm:scale-100">
                <svg className="w-full h-full" viewBox="0 0 160 160">
                     {renderSegments()}
                </svg>
                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Icon className={`w-6 h-6 mb-2 ${colorClass}`} />
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">{displayValue}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">{unit}</span>
                </div>
            </div>
            <div className="text-center w-full">
                <h4 className="text-sm font-bold text-slate-700 mb-2">{label}</h4>
                <div className="flex items-center justify-between text-xs px-4 mb-1">
                    <span className="text-slate-400 font-medium">Utilization</span>
                    <span className={`${colorClass} font-bold`}>{Math.round(percentage * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${colorClass.replace('text-', 'bg-')} transition-all duration-300`} 
                        style={{ width: `${percentage * 100}%` }}
                    ></div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">Target vs Max Potential</p>
            </div>
        </div>
    );
};

const TechAndOps: React.FC<TechAndOpsProps> = ({ projectId }) => {
  const [activeStep, setActiveStep] = useState<number>(3);

  // --- DATA DEFINITIONS (Unchanged) ---
  // Plan 1 (The Farm) Steps
  const plan1Steps = [
    {
      id: 1,
      title: "Water Mastery",
      icon: Droplets,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      shortDesc: "Harvest & Treat",
      details: {
        temp: "15°C",
        pressure: "4 Bar",
        throughput: "319KL Storage",
        efficiency: "99% Recovery",
        desc: "Underground rainwater harvesting prevents evaporation. 6-stage filtration including Magnetic Resonance increases crop yield by 23%."
      }
    },
    {
      id: 2,
      title: "Rock Dusting",
      icon: Hammer,
      color: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-200",
      shortDesc: "Remineralisation",
      details: {
        temp: "Ambient",
        pressure: "N/A",
        throughput: "600 T/Year",
        efficiency: "<200 Micron",
        desc: "Volcanic basalt crushing to <200 microns. Restores soil minerals for 50-500 years. Increases crop Brix levels from 5 to 10+ (40% premium)."
      }
    },
    {
      id: 3,
      title: "EM-1 Compost",
      icon: Recycle,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      shortDesc: "Fermentation",
      details: {
        temp: "65°C",
        pressure: "Aerobic",
        throughput: "2,300 T/Year",
        efficiency: "100% Organic",
        desc: "Dr. Higa's fermentation protocol converts 3,000T of wildlife manure into probiotic-rich soil food. Zero chemical fertilisers needed."
      }
    },
    {
      id: 4,
      title: "Cultivation",
      icon: Sprout,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      shortDesc: "Regenerative Ag",
      details: {
        temp: "Ambient",
        pressure: "N/A",
        throughput: "1,149 T Veg",
        efficiency: "270T Soy",
        desc: "40ha intensive vegetables + 180ha intercropped soybeans under macadamias. Synergistic planting reduces pest pressure and water use."
      }
    },
    {
      id: 5,
      title: "Energy Independence",
      icon: Sun,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      shortDesc: "500kVA Solar",
      details: {
        temp: "PV Cells",
        pressure: "N/A",
        throughput: "490 kW Peak",
        efficiency: "3-Day Battery",
        desc: "500kVA Solar Array + 2,000 kWh Battery Bank provides complete off-grid power for irrigation, packhouse, and rock crusher."
      }
    }
  ];

  // Plan 3 (Meat Factory) Steps
  const plan3Steps = [
    {
      id: 1,
      title: "Protein Processing",
      icon: ChefHat,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      shortDesc: "Seitan & HMMA",
      details: {
        temp: "160°C",
        pressure: "Twin-Screw",
        throughput: "1 Tonne/Day",
        efficiency: "Meat-Like Texture",
        desc: "Dual technology: Hand-washed Seitan for premium deli cuts (24hr maturation) and High Moisture Meat Analogue (HMMA) extrusion for fibrous textures."
      }
    },
    {
      id: 2,
      title: "Smokehouse",
      icon: Flame,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      shortDesc: "Real Wood Cure",
      details: {
        temp: "80°C",
        pressure: "Ambient",
        throughput: "830 kg/Day",
        efficiency: "Applewood/Oak",
        desc: "Authentic 2-8 hour smoking process using real wood chips. Creates deep flavour profiles for Bacon, Boerewors, and Ribs."
      }
    },
    {
      id: 3,
      title: "Retort Canning",
      icon: Package,
      color: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-200",
      shortDesc: "Institutional Packs",
      details: {
        temp: "121°C",
        pressure: "2 Bar",
        throughput: "1,800 Packs/Hr",
        efficiency: "18-Mo Shelf Life",
        desc: "Military-grade sterilization. 3-layer foil laminate pouches allow ambient storage for 18 months. Critical for government tenders (Prisons, Schools)."
      }
    },
    {
      id: 4,
      title: "Premium Packaging",
      icon: ShieldCheck,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      shortDesc: "Retail Fresh",
      details: {
        temp: "4°C",
        pressure: "Vacuum/MAP",
        throughput: "720 Trays/Hr",
        efficiency: "21-Day Shelf Life",
        desc: "Thermoform vacuum sealing for premium Seitan deli cuts and Modified Atmosphere Packaging (MAP) for fresh sausages/burgers."
      }
    },
    {
      id: 5,
      title: "Nutritional Yeast",
      icon: Beaker,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      shortDesc: "Fortification",
      details: {
        temp: "30°C",
        pressure: "Fermentation",
        throughput: "35.5 T/Year",
        efficiency: "B-Vitamin Rich",
        desc: "Dedicated fermentation line producing fortified Nutritional Yeast flakes. High-margin retail product and essential school feeding supplement."
      }
    }
  ];
  
  // Plan 3B (Medicinal Mushrooms) Steps
  const plan3bSteps = [
    {
      id: 1,
      title: "Substrate Prep",
      icon: Recycle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      shortDesc: "Wood Chip Mix",
      details: {
        temp: "Ambient",
        pressure: "N/A",
        throughput: "14,400 Bags/Day",
        efficiency: "0% Cost",
        desc: "Utilising 250T/year of pecan/macadamia prunings from Plan 1. Chipped, mixed with wheat bran and gypsum. Zero-cost feedstock."
      }
    },
    {
      id: 2,
      title: "Autoclave Sterilisation",
      icon: Zap,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      shortDesc: "Pathogen Kill",
      details: {
        temp: "121°C",
        pressure: "2.5 Bar",
        throughput: "5,760 Bags/Day",
        efficiency: "99.9% Sterile",
        desc: "High-pressure steam sterilization ensures zero contamination from mould or bacteria. Critical for medical-grade mushroom purity."
      }
    },
    {
      id: 3,
      title: "Cleanroom Inoculation",
      icon: ShieldCheck,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      shortDesc: "ISO 5 Lab",
      details: {
        temp: "25°C",
        pressure: "Positive",
        throughput: "2.5% Spawn Rate",
        efficiency: "HEPA Filtered",
        desc: "Sterile bags inoculated with vigorous Lion's Mane spawn in HEPA-filtered laminar flow hoods. Prevents biological competition."
      }
    },
    {
      id: 4,
      title: "Smart Incubation",
      icon: Thermometer,
      color: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-200",
      shortDesc: "Colonisation",
      details: {
        temp: "24°C",
        pressure: "CO2 > 2k ppm",
        throughput: "16 Containers",
        efficiency: "14-Day Cycle",
        desc: "Climate-controlled containers maintain perfect humidity and CO2 for mycelial run. Dark cycle promotes rapid substrate colonisation."
      }
    },
    {
      id: 5,
      title: "Processing & QC",
      icon: Pill,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      shortDesc: "Encapsulation",
      details: {
        temp: "Ambient",
        pressure: "GMP Std",
        throughput: "1,200 Caps/Hr",
        efficiency: "500mg/Cap",
        desc: "Freeze-drying preserves bioactive compounds. Milling to 40-mesh powder and semi-automated encapsulation for premium retail product."
      }
    }
  ];

  // Plan 4 (Artisan Cheese) Steps
  const plan4Steps = [
    {
      id: 1,
      title: "Culture & Curd",
      icon: Beaker,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      shortDesc: "Fermentation",
      details: {
        temp: "38°C",
        pressure: "Ambient",
        throughput: "300kg/Day",
        efficiency: "Live Probiotics",
        desc: "Macadamia milk is inoculated with Lactobacillus cultures. Fermentation lowers pH, creating tangy, complex flavour profiles before coagulation."
      }
    },
    {
      id: 2,
      title: "Pressing",
      icon: Scale,
      color: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-200",
      shortDesc: "Wheel Formation",
      details: {
        temp: "20°C",
        pressure: "2.0 MPa",
        throughput: "200kg/Batch",
        efficiency: "Moisture Control",
        desc: "Curds are transferred to stainless steel moulds and pressed hydraulically to remove excess moisture and form solid 2kg wheels."
      }
    },
    {
      id: 3,
      title: "Cave Ageing",
      icon: Box,
      color: "text-slate-700",
      bg: "bg-slate-100",
      border: "border-slate-300",
      shortDesc: "Maturation",
      details: {
        temp: "12-14°C",
        pressure: "Ambient",
        throughput: "20,000 Wheels",
        efficiency: "75% Humidity",
        desc: "The heart of the operation. Cheese rests on racks for 2-12 months. Climate control allows flavour crystals to develop and textures to firm."
      }
    },
    {
      id: 4,
      title: "Hand Waxing",
      icon: ShieldCheck,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      shortDesc: "Preservation",
      details: {
        temp: "85°C (Wax)",
        pressure: "N/A",
        throughput: "Manual Dip",
        efficiency: "18-Mo Shelf Life",
        desc: "Wheels are hand-dipped in custom wax blends (Carnauba + Beeswax from Plan 4 hives). This creates an ambient-stable barrier, removing cold chain needs."
      }
    },
    {
      id: 5,
      title: "Pollination",
      icon: Hexagon,
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
      shortDesc: "Flow Hives",
      details: {
        temp: "35°C (Hive)",
        pressure: "N/A",
        throughput: "200 Hives",
        efficiency: "+40% Nut Yield",
        desc: "200 Flow Hives pollinate the macadamia orchard. This biological service increases nut yield by 40% (R14M value) while producing 22T of honey."
      }
    }
  ];

  // Plan 6 (Bio-Energy) Steps
  const plan6Steps = [
    {
      id: 1,
      title: "Feedstock Intake",
      icon: Truck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      shortDesc: "Diverse Organic Waste",
      details: {
        temp: "Ambient",
        pressure: "N/A",
        throughput: "85 Tonnes/Day",
        efficiency: "100% Diversion",
        desc: "Automated weighing bridge and tipping floor. Material passes through magnetic separation and visual inspection to remove contaminants before pre-processing."
      }
    },
    {
      id: 2,
      title: "Pelletisation",
      icon: Cog,
      color: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-200",
      shortDesc: "Standardisation",
      details: {
        temp: "60-80°C",
        pressure: "High Comp",
        throughput: "2.5 Tonnes/Hr",
        efficiency: "98% Uniformity",
        desc: "Hammer mill grinds biomass to 3mm particles. Rotary dryer reduces moisture to 8%. Ring-die press forms standardised pellets, unlocking multi-feedstock capability."
      }
    },
    {
      id: 3,
      title: "Pyrolysis Reactor",
      icon: Flame,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      shortDesc: "Thermal Decomposition",
      details: {
        temp: "500°C",
        pressure: "-50 Pa",
        throughput: "2.0 Tonnes/Hr",
        efficiency: "93% Uptime",
        desc: "Continuous screw reactor. Oxygen-free environment prevents combustion. Material residence time of 2-3 seconds maximizes bio-oil vapour yield."
      }
    },
    {
      id: 4,
      title: "Bio-Refinery",
      icon: Filter,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      shortDesc: "Distillation Upgrade",
      details: {
        temp: "180-340°C",
        pressure: "Atmospheric",
        throughput: "1,000 L/Hr",
        efficiency: "<2% Oxygen",
        desc: "Fractional distillation column separates light/heavy ends. Catalytic upgrading removes oxygen. Final 5-micron filtration ensures engine safety."
      }
    },
    {
      id: 5,
      title: "Value Output",
      icon: Recycle,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      shortDesc: "Energy & Biochar",
      details: {
        temp: "Ambient",
        pressure: "Stored",
        throughput: "Continuous",
        efficiency: "80.7% Margin",
        desc: "Finished Bio-diesel pumped to 100,000L storage tanks. Biochar cooled and bagged. Syngas recycled for process heat (energy self-sufficiency)."
      }
    }
  ];

  // Plan 5 (Pharma) Steps
  const plan5Steps = [
    {
      id: 1,
      title: "High-Tech Cultivation",
      icon: Sprout,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      shortDesc: "UV-B Enhanced Growth",
      details: {
        temp: "18-22°C",
        pressure: "Positive",
        throughput: "14 Day Cycle",
        efficiency: "+20% Potency",
        desc: "10,240m² precision greenhouse. UV-B lighting induces stress response, boosting sulforaphane content by 20%. HEPA filtered zones."
      }
    },
    {
      id: 2,
      title: "Harvest & Sanitise",
      icon: ShieldCheck,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      shortDesc: "Ozone Treatment",
      details: {
        temp: "4°C Water",
        pressure: "N/A",
        throughput: "500kg/hr",
        efficiency: "99.99% Kill",
        desc: "Ozone water treatment kills E.coli/Salmonella instantly without chemicals. Cold chain maintenance begins immediately."
      }
    },
    {
      id: 3,
      title: "Freeze Drying",
      icon: Snowflake,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      shortDesc: "Enzyme Preservation",
      details: {
        temp: "-40°C",
        pressure: "Vacuum",
        throughput: "200kg/day",
        efficiency: "100% Bioactive",
        desc: "Critical Step: Freeze drying at -40°C preserves the Myrosinase enzyme. Heat drying (>40°C) destroys it, rendering competitors' product ineffective."
      }
    },
    {
      id: 4,
      title: "Micro-Milling",
      icon: Cog,
      color: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-200",
      shortDesc: "Cryogenic Grinding",
      details: {
        temp: "-20°C",
        pressure: "N/A",
        throughput: "50kg/hr",
        efficiency: "<100 Micron",
        desc: "Liquid Nitrogen cooling during grinding prevents heat buildup, ensuring powder remains bioactive and fine enough for high absorption."
      }
    },
    {
      id: 5,
      title: "Pharma Encapsulation",
      icon: Pill,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      shortDesc: "ISO 7 Cleanroom",
      details: {
        temp: "20°C",
        pressure: "+15 Pa",
        throughput: "72k Caps/Hr",
        efficiency: "GMP Certified",
        desc: "Automated NJP-1200C filler operates in ISO Class 7 cleanroom. 100% Solar uptime guarantees zero contamination events from pressure loss."
      }
    }
  ];

  // Plan 2 (Agroforestry Dairy) Steps
  const plan2Steps = [
    {
      id: 1,
      title: "Agroforestry",
      icon: Trees,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      shortDesc: "Macadamia & Soy",
      details: {
        temp: "Ambient",
        pressure: "N/A",
        throughput: "180 Hectares",
        efficiency: "2,500T CO₂",
        desc: "36,000 Macadamia trees intercropped with soybeans. Trees reduce evaporation by 20% while soybeans fix nitrogen for the trees. A perfect symbiotic system."
      }
    },
    {
      id: 2,
      title: "Harvest",
      icon: Sprout,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      shortDesc: "Dual Yield",
      details: {
        temp: "Ambient",
        pressure: "N/A",
        throughput: "270T Soy / 288T Nuts",
        efficiency: "95% Recovery",
        desc: "Precision harvest of soy (Years 1-6) and Macadamias (Year 4+). Nuts are cracked and shells sent to Plan 1 for compost. Zero waste."
      }
    },
    {
      id: 3,
      title: "Dairy Processing",
      icon: Filter,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      shortDesc: "Milling & Homogenisation",
      details: {
        temp: "85°C",
        pressure: "40 MPa",
        throughput: "2,000 L/hr",
        efficiency: "Alpro Quality",
        desc: "Raw ingredients (Soy or Macs) are soaked, colloid-milled to <10 microns, and homogenised at 40 MPa for premium creamy texture matching dairy milk."
      }
    },
    {
      id: 4,
      title: "UHT Sterilisation",
      icon: Zap,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      shortDesc: "Shelf Stability",
      details: {
        temp: "138°C",
        pressure: "High",
        throughput: "1,000 L/hr",
        efficiency: "6-Mo Shelf Life",
        desc: "Ultra-High Temperature treatment (4 seconds) eliminates bacteria while preserving nutrition. Allows for ambient distribution without cold chain reliance."
      }
    },
    {
      id: 5,
      title: "Distribution",
      icon: Truck,
      color: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-200",
      shortDesc: "Cold Chain",
      details: {
        temp: "-18°C to 4°C",
        pressure: "N/A",
        throughput: "Daily Dispatch",
        efficiency: "ISO 22000",
        desc: "Fresh products (Yoghurt, Cheese) move via refrigerated fleet. UHT milk moves via ambient logistics. Exports to EU commence Year 6."
      }
    }
  ];

  let processSteps = plan6Steps;
  if (projectId === 'plan1') processSteps = plan1Steps;
  if (projectId === 'plan2') processSteps = plan2Steps;
  if (projectId === 'plan3') processSteps = plan3Steps;
  if (projectId === 'plan3b') processSteps = plan3bSteps;
  if (projectId === 'plan4') processSteps = plan4Steps;
  if (projectId === 'plan5') processSteps = plan5Steps;

  const activeData = processSteps.find(s => s.id === activeStep) || processSteps[2];

  return (
    <div className="space-y-8 animate-fade-in">
       <style>{`
        @keyframes moveArrowRight {
          0% { opacity: 0; transform: translateX(-5px); }
          50% { opacity: 1; transform: translateX(0px); }
          100% { opacity: 0; transform: translateX(5px); }
        }
        @keyframes moveArrowDown {
          0% { opacity: 0; transform: translateY(-5px); }
          50% { opacity: 1; transform: translateY(0px); }
          100% { opacity: 0; transform: translateY(5px); }
        }
        .animate-arrow-right {
          animation: moveArrowRight 1.5s infinite ease-in-out;
        }
        .animate-arrow-down {
          animation: moveArrowDown 1.5s infinite ease-in-out;
        }
      `}</style>
      
      {/* Interactive Process Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 md:p-8 pb-4">
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">Process Architecture</h2>
                    <p className="text-slate-500 text-xs md:text-base">Interactive Schematic: Click stages to view telemetry.</p>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 self-start md:self-auto">
                    <Activity className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-bold">System Active: 100% Uptime</span>
                </div>
            </div>
        </div>

        {/* Process Visualization - Flex Layout */}
        <div className="px-4 md:px-8 pb-10">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-0">
                {processSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = activeStep === step.id;
                    const isLast = index === processSteps.length - 1;

                    return (
                        <React.Fragment key={step.id}>
                            {/* Step Node */}
                            <div 
                                onClick={() => setActiveStep(step.id)}
                                className="flex flex-row lg:flex-col items-center lg:items-center relative z-10 flex-1 group cursor-pointer w-full lg:w-auto gap-4 lg:gap-0"
                            >
                                {/* Circle Icon */}
                                <div className={`
                                    w-16 h-16 lg:w-24 lg:h-24 rounded-full border-4 flex items-center justify-center shadow-sm transition-all duration-300 bg-white flex-shrink-0
                                    ${isActive ? `${step.border} ring-4 ring-offset-2 ring-emerald-50 scale-105` : 'border-slate-100 group-hover:border-slate-300'}
                                `}>
                                    <div className={`p-3 rounded-full ${step.bg} transition-colors`}>
                                        <Icon className={`h-6 w-6 lg:h-8 lg:w-8 ${step.color}`} />
                                    </div>
                                </div>
                                
                                {/* Label */}
                                <div className="text-left lg:text-center mt-0 lg:mt-4 mb-0 lg:mb-0 px-2">
                                    <h3 className={`font-bold text-sm lg:text-base transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                                        {step.id}. {step.title}
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-1 lg:max-w-[120px] lg:mx-auto">
                                        {step.shortDesc}
                                    </p>
                                </div>

                                {/* Active Indicator Dot (Desktop) */}
                                <div className={`
                                    hidden lg:block w-3 h-3 rounded-full mt-2 transition-colors
                                    ${isActive ? 'bg-emerald-500' : 'bg-transparent'}
                                `}></div>
                            </div>

                            {/* Connector */}
                            {!isLast && (
                                <div className="flex flex-col lg:flex-row items-center justify-center self-stretch lg:self-auto lg:pt-10 flex-shrink-0 opacity-50">
                                    {/* Mobile Vertical Line */}
                                    <div className="lg:hidden h-8 w-0.5 bg-slate-300 my-1 relative ml-8">
                                         <div className="absolute bottom-0 -left-1.5">
                                            <ChevronsDown className="w-4 h-4 text-slate-400 animate-arrow-down" />
                                         </div>
                                    </div>
                                    
                                    {/* Desktop Horizontal Line */}
                                    <div className="hidden lg:flex items-center px-2 w-16 xl:w-24 justify-center relative">
                                        <div className="h-0.5 w-full bg-slate-200 absolute"></div>
                                        <div className="z-10 bg-white px-1">
                                            <ChevronsRight className="w-5 h-5 text-slate-300 animate-arrow-right" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>

        {/* The "Monitor" Panel */}
        <div className="bg-slate-900 border-t border-slate-800 p-4 md:p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Description */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeData.bg} bg-opacity-20`}>
                            <activeData.icon className={`h-6 w-6 ${activeData.color.replace('text-', 'text-white ')}`} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg md:text-xl">{activeData.title}</h3>
                            <span className="text-xs uppercase tracking-wider text-slate-400">System Status: Nominal</span>
                        </div>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        {activeData.details.desc}
                    </p>
                </div>

                {/* Middle: Telemetry Grid */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                         {/* Metric 1: Temperature */}
                        <div className="bg-slate-800 rounded-lg p-3 md:p-4 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2 text-slate-400 text-[10px] md:text-xs font-bold uppercase">
                                <Thermometer className="h-3 w-3 md:h-4 md:w-4" /> Temperature
                            </div>
                            <div className="text-lg md:text-xl font-mono font-bold text-amber-400">{activeData.details.temp}</div>
                        </div>
                        
                         {/* Metric 2: Pressure */}
                        <div className="bg-slate-800 rounded-lg p-3 md:p-4 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2 text-slate-400 text-[10px] md:text-xs font-bold uppercase">
                                <Gauge className="h-3 w-3 md:h-4 md:w-4" /> Pressure
                            </div>
                            <div className="text-lg md:text-xl font-mono font-bold text-blue-400">{activeData.details.pressure}</div>
                        </div>

                         {/* Metric 3: Throughput */}
                        <div className="bg-slate-800 rounded-lg p-3 md:p-4 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2 text-slate-400 text-[10px] md:text-xs font-bold uppercase">
                                <Activity className="h-3 w-3 md:h-4 md:w-4" /> Throughput
                            </div>
                            <div className="text-lg md:text-xl font-mono font-bold text-emerald-400">{activeData.details.throughput}</div>
                        </div>

                         {/* Metric 4: Key KPI */}
                        <div className="bg-slate-800 rounded-lg p-3 md:p-4 border border-slate-700">
                            <div className="flex items-center gap-2 mb-2 text-slate-400 text-[10px] md:text-xs font-bold uppercase">
                                <Scale className="h-3 w-3 md:h-4 md:w-4" /> Efficiency
                            </div>
                            <div className="text-lg md:text-xl font-mono font-bold text-purple-400">{activeData.details.efficiency}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Production Capacity (Annual)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {projectId === 'plan5' ? (
                    <>
                        <CapacityRing 
                            label="Capsules"
                            current={5}
                            max={5}
                            unit="Million Units"
                            icon={Pill}
                            colorClass="text-blue-600"
                            displayValue="5.0M"
                        />
                        <CapacityRing 
                            label="Powder"
                            current={14.5}
                            max={15}
                            unit="Tonnes"
                            icon={Sprout}
                            colorClass="text-green-600"
                            displayValue="14.5T"
                        />
                        <CapacityRing 
                            label="Energy"
                            current={100}
                            max={100}
                            unit="% Solar"
                            icon={Sun}
                            colorClass="text-amber-500"
                            displayValue="100%"
                        />
                    </>
                ) : projectId === 'plan3b' ? (
                    <>
                        <CapacityRing 
                            label="Capsules"
                            current={2}
                            max={2.5}
                            unit="Million Bottles"
                            icon={Pill}
                            colorClass="text-purple-600"
                            displayValue="2.0M"
                        />
                        <CapacityRing 
                            label="Mushrooms"
                            current={100}
                            max={120}
                            unit="Tonnes"
                            icon={Sprout}
                            colorClass="text-green-600"
                            displayValue="100T"
                        />
                        <CapacityRing 
                            label="Waste Saved"
                            current={550}
                            max={600}
                            unit="Tonnes/Yr"
                            icon={Recycle}
                            colorClass="text-emerald-500"
                            displayValue="550T"
                        />
                    </>
                ) : projectId === 'plan4' ? (
                    <>
                        <CapacityRing 
                            label="Aged Cheese"
                            current={73}
                            max={75}
                            unit="Tonnes"
                            icon={Box}
                            colorClass="text-yellow-600"
                            displayValue="73T"
                        />
                        <CapacityRing 
                            label="Honey"
                            current={22}
                            max={25}
                            unit="Tonnes"
                            icon={Hexagon}
                            colorClass="text-amber-600"
                            displayValue="22T"
                        />
                        <CapacityRing 
                            label="Hives"
                            current={200}
                            max={200}
                            unit="Flow Hives"
                            icon={Hexagon}
                            colorClass="text-slate-600"
                            displayValue="200"
                        />
                    </>
                ) : projectId === 'plan2' ? (
                    <>
                        <CapacityRing 
                            label="Trees"
                            current={36000}
                            max={36000}
                            unit="Macadamias"
                            icon={Trees}
                            colorClass="text-green-600"
                            displayValue="36K"
                        />
                        <CapacityRing 
                            label="Dairy"
                            current={2}
                            max={2.5}
                            unit="Million Litres"
                            icon={Milk}
                            colorClass="text-blue-600"
                            displayValue="2.0M"
                        />
                        <CapacityRing 
                            label="Carbon"
                            current={2500}
                            max={2500}
                            unit="Tonnes CO₂"
                            icon={Recycle}
                            colorClass="text-emerald-600"
                            displayValue="2.5K"
                        />
                    </>
                ) : projectId === 'plan3' ? (
                    <>
                        <CapacityRing 
                            label="Plant Meat"
                            current={858}
                            max={900}
                            unit="Tonnes"
                            icon={Utensils}
                            colorClass="text-amber-600"
                            displayValue="858T"
                        />
                        <CapacityRing 
                            label="Retort"
                            current={257}
                            max={300}
                            unit="Tonnes (Govt)"
                            icon={Package}
                            colorClass="text-slate-600"
                            displayValue="257T"
                        />
                        <CapacityRing 
                            label="Products"
                            current={33}
                            max={35}
                            unit="SKUs"
                            icon={Award}
                            colorClass="text-blue-600"
                            displayValue="33"
                        />
                    </>
                ) : projectId === 'plan1' ? (
                    <>
                        <CapacityRing 
                            label="Vegetables"
                            current={1149}
                            max={1200}
                            unit="Tonnes"
                            icon={Sprout}
                            colorClass="text-green-600"
                            displayValue="1.1KT"
                        />
                        <CapacityRing 
                            label="Compost"
                            current={2300}
                            max={2500}
                            unit="Tonnes"
                            icon={Recycle}
                            colorClass="text-emerald-600"
                            displayValue="2.3KT"
                        />
                        <CapacityRing 
                            label="Water"
                            current={319}
                            max={350}
                            unit="Kilolitres"
                            icon={Droplets}
                            colorClass="text-blue-600"
                            displayValue="319KL"
                        />
                    </>
                ) : (
                    <>
                        <CapacityRing 
                            label="Bio-Diesel"
                            current={3.45}
                            max={5}
                            unit="Million Litres"
                            icon={Droplets}
                            colorClass="text-emerald-600"
                            displayValue="3.45M"
                        />
                        <CapacityRing 
                            label="Biochar"
                            current={3000}
                            max={5000}
                            unit="Tonnes"
                            icon={Recycle}
                            colorClass="text-slate-600"
                            displayValue="3.0K"
                        />
                        <CapacityRing 
                            label="Electricity"
                            current={272}
                            max={600}
                            unit="MWh"
                            icon={Zap}
                            colorClass="text-amber-600"
                            displayValue="272"
                        />
                    </>
                )}
            </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Competitive Moat</h3>
            <p className="text-slate-600 text-sm mb-6">
                {projectId === 'plan5' 
                    ? "Unlike competitors who rely on heat-drying (destroying enzymes) and Eskom (risking contamination), we use freeze-drying and 100% Solar." 
                    : projectId === 'plan3b'
                    ? "With a 3-5 year first-mover advantage, we are SA's only commercial Lion's Mane producer. Retail slotting fees are paid and brand loyalty established before competitors can even certify."
                    : projectId === 'plan4'
                    ? "While competitors require cold chain logistics (R80/kg shipping), our hand-waxed cheese is shelf-stable for 18 months (R8/kg shipping). Estate-grown Macadamia supply at R3/kg destroys the R180/kg market cost."
                    : projectId === 'plan2'
                    ? "Our dual-stream capability (Soy for years 1-5, transitioning to Macadamias) provides immediate cash flow while the high-value orchard matures. The 180ha scale creates a microclimate barrier to entry."
                    : projectId === 'plan3'
                    ? "Most brands fight for retail shelf space. We have locked government institutional contracts (28% revenue) via unique Retort Pouch technology that requires no cold chain."
                    : projectId === 'plan1'
                    ? "We are not just farming; we are manufacturing soil. Our 600T/yr Rock Dust system creates a 50-year fertility advantage that neighbours cannot replicate without massive CAPEX."
                    : "Unlike competitors locked into single feedstocks (e.g., just sunflower oil or woodchips), our 2.5T/hr pelletiser allows us to process 20+ diverse organic sources."}
            </p>
            
            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">{projectId === 'plan5' ? 'Potency Retention' : (projectId === 'plan3b' ? 'Competitor Lag' : (projectId === 'plan4' ? 'Input Cost Advantage' : (projectId === 'plan2' ? 'Orchard Maturity' : (projectId === 'plan3' ? 'Govt Contracts' : (projectId === 'plan1' ? 'Soil Fertility' : 'Feedstock Buffer')))))}</span>
                    <span className="font-bold text-emerald-600">{projectId === 'plan5' ? '98% Active' : (projectId === 'plan3b' ? '3-5 Years' : (projectId === 'plan4' ? '98% Lower Cost' : (projectId === 'plan2' ? '100% (Year 7)' : (projectId === 'plan3' ? '3-Year Lock' : (projectId === 'plan1' ? '500 Years' : '107% Excess Supply')))))}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full animate-[pulse_3s_infinite]" style={{ width: projectId === 'plan2' ? '65%' : '100%' }}></div>
                </div>

                <div className="flex justify-between items-center text-sm mt-4">
                    <span className="text-slate-600">{projectId === 'plan5' ? 'Contamination Risk' : (projectId === 'plan3b' ? 'Export Certification' : (projectId === 'plan4' ? 'Cold Chain Need' : (projectId === 'plan2' ? 'Climate Resilience' : (projectId === 'plan3' ? 'Cold Chain Reliance' : (projectId === 'plan1' ? 'Drought Risk' : 'Supply Chain Risk')))))}</span>
                    <span className="font-bold text-emerald-600">{projectId === 'plan5' ? '0% (Solar)' : (projectId === 'plan3b' ? 'USA/EU Compliant' : (projectId === 'plan4' ? '0% (Ambient)' : (projectId === 'plan2' ? 'High (+20% Water Savings)' : (projectId === 'plan3' ? '0% (Retort)' : (projectId === 'plan1' ? 'Low (9 Boreholes)' : '< 7% Impact')))))}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: projectId === 'plan5' ? '0%' : (projectId === 'plan3b' ? '100%' : (projectId === 'plan4' ? '0%' : (projectId === 'plan2' ? '90%' : (projectId === 'plan3' ? '0%' : (projectId === 'plan1' ? '10%' : '7%'))))) }}></div>
                </div>

                 <div className="flex justify-between items-center text-sm mt-4">
                    <span className="text-slate-600">Processing Uptime Target</span>
                    <span className="font-bold text-emerald-600">100% (24/7 Ops)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TechAndOps;
