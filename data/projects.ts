
import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'plan1',
    name: 'Plan 1: Core Farm (Modimolle)',
    location: 'Modimolle, Limpopo',
    shortDesc: 'Acquisition of 445ha premier farm (Listing T4772598). Includes 22ha Pecans, 170m² Cold Room, 9 Boreholes, and Lodge. The 200ha Soy expansion follows in Year 3.',
    investment: 'R 57.1M',
    roi: '3.48x DSCR',
    jobs: 85,
    status: 'Investment Ready',
    type: 'Agriculture',
    color: 'bg-emerald-500'
  },
  {
    id: 'plan2',
    name: 'Plan 2: Agroforestry & Dairy',
    location: 'Modimolle, Limpopo',
    shortDesc: 'Integrated Macadamia-Soybean Production with Plant-Based Dairy Processing (2M Litres/Year).',
    investment: 'R 77.0M',
    roi: '16.6x DSCR',
    jobs: 62,
    status: 'Investment Ready',
    type: 'Agro-Forestry',
    color: 'bg-green-600'
  },
  {
    id: 'plan3',
    name: 'Plan 3: Plant Meat Factory',
    location: 'Modimolle, Limpopo',
    shortDesc: 'Complete Plant-Based Protein Factory. Seitan, HMMA Extrusion, Smokehouse & Retort Canning.',
    investment: 'R 66.0M',
    roi: '8.5x DSCR',
    jobs: 145,
    status: 'Investment Ready',
    type: 'Processing',
    color: 'bg-amber-500'
  },
  {
    id: 'plan3b',
    name: 'Plan 3B: Medicinal Mushrooms',
    location: 'Modimolle, Limpopo',
    shortDesc: 'High-tech Lion\'s Mane cultivation and pharmaceutical-grade encapsulation facility.',
    investment: 'R 38.0M',
    roi: '24.3% IRR',
    jobs: 70,
    status: 'Investment Ready',
    type: 'Biotech',
    color: 'bg-purple-600'
  },
  {
    id: 'plan4',
    name: 'Plan 4: Artisan Cheese',
    location: 'Modimolle, Limpopo',
    shortDesc: 'Production of premium waxed aged cheeses for export markets + 200 Hive Apiary for pollination.',
    investment: 'R 55.0M',
    roi: '3.99x DSCR',
    jobs: 53,
    status: 'Investment Ready',
    type: 'Processing',
    color: 'bg-yellow-500'
  },
  {
    id: 'plan5',
    name: 'Plan 5: High-Tech Pharma',
    location: 'Modimolle, Limpopo',
    shortDesc: 'SA\'s First 100% Energy-Independent Nutraceutical Facility. Sulforaphane production with pharmaceutical-grade processing.',
    investment: 'R 99.8M',
    roi: '5.2 Mo Payback',
    jobs: 85,
    status: 'Investment Ready',
    type: 'Nutraceuticals',
    color: 'bg-cyan-600'
  },
  {
    id: 'plan6',
    name: 'Plan 6: Energy Independence',
    location: 'Modimolle, Limpopo',
    shortDesc: 'Bio-diesel refinery, biochar production, and carbon-neutral logistics fleet.',
    investment: 'R 40.0M',
    roi: '290%',
    jobs: 19,
    status: 'Investment Ready',
    type: 'Bio-Energy',
    color: 'bg-emerald-600'
  }
];

export const masterPlanStats = {
  totalInvestment: 'R 432.9M',
  totalJobs: 1475, 
  blendedROI: 'R 1.2B Rev',
  totalImpact: 'Integrated Regenerative Food System'
};
