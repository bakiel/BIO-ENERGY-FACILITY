
import { VoiceScripts } from '../types';

/**
 * VoiceScripts stores text content for various UI elements that will receive voice guidance.
 * In a production environment, `audioData` (base64 encoded audio string) would be pre-generated
 * and stored here as part of a build process or a separate content management step.
 * For this demonstration, audio is generated on-demand using the Gemini TTS API and then cached
 * within the application for subsequent playback.
 */
export const voiceScripts: VoiceScripts = {
  landingPage: {
    heroIntro: {
      title: 'Introductory Statement',
      text: 'How one four hundred thirty-eight million rand investment solves eight government priorities simultaneously. Government departments operate in silos. Ubuntu Restoration Farms represents a rare convergence point where infrastructure investment delivers outcomes for Agriculture, Energy, Labour, Environment, and Trade—simultaneously.',
    },
    energyDive: {
      title: 'Energy Security Deep Dive',
      text: 'Complete Energy and Logistics Independence. South African agriculture is one hundred percent dependent on imported diesel. When supply chains break, tractors stop. We are changing that.',
    },
  },
  masterDashboard: {
    intro: {
      title: 'Master Investment Portfolio Introduction',
      text: 'Ubuntu Restoration Farms. South Africa\'s First Integrated Regenerative Food System. A twenty-one year vision becoming reality, transforming six hundred forty-five hectares of Limpopo soil into a one point two three nine billion rand annual revenue engine with complete energy and logistics independence.',
    },
    plan1: {
      title: 'Plan 1: Core Farm',
      text: 'Plan one, Core Farm, Modimolle. Acquisition of four hundred forty-five hectare premier farm. Includes twenty-two hectare Pecans, one hundred seventy square meter Cold Room, nine Boreholes, and Lodge. The two hundred hectare Soy expansion follows in Year 3.',
    },
    plan2: {
      title: 'Plan 2: Agroforestry and Dairy',
      text: 'Plan two, Agroforestry and Dairy. Integrated Macadamia-Soybean Production with Plant-Based Dairy Processing, two million Liters per Year.',
    },
    plan3: {
      title: 'Plan 3: Plant Meat Factory',
      text: 'Plan three, Plant Meat Factory. Complete Plant-Based Protein Factory. Seitan, High Moisture Meat Analogue Extrusion, Smokehouse, and Retort Canning.',
    },
    plan3b: {
      title: 'Plan 3B: Medicinal Mushrooms',
      text: 'Plan three B, Medicinal Mushrooms. High-tech Lion\'s Mane cultivation and pharmaceutical-grade encapsulation facility.',
    },
    plan4: {
      title: 'Plan 4: Artisan Cheese',
      text: 'Plan four, Artisan Cheese. Production of premium waxed aged cheeses for export markets plus two hundred Hive Apiary for pollination.',
    },
    plan5: {
      title: 'Plan 5: High-Tech Pharma',
      text: 'Plan five, High-Tech Pharma. South Africa\'s First one hundred percent Energy-Independent Nutraceutical Facility. Sulforaphane production with pharmaceutical-grade processing.',
    },
    plan6: {
      title: 'Plan 6: Energy Independence',
      text: 'Plan six, Energy Independence. Bio-diesel refinery, biochar production, and carbon-neutral logistics fleet.',
    },
  },
  plan1: {
    investment: {
      title: 'Plan 1: Total Investment',
      text: 'Total Investment for Plan 1 is fifty-seven point one Million Rand. It includes one hundred percent Debt, and zero percent Grant.',
    },
    revenue: {
      title: 'Plan 1: Year 1 Revenue',
      text: 'Plan 1\'s Year 1 Revenue is thirty-four point three million Rand. The EBITDA Margin is seventy-one point five percent.',
    },
    jobs: {
      title: 'Plan 1: Jobs and Impact',
      text: 'Plan 1 generates eighty-five direct jobs, with an additional three hundred seventy indirect jobs.',
    },
    dscr: {
      title: 'Plan 1: DSCR Coverage',
      text: 'Plan 1\'s DSCR Coverage is three point forty-eight times, exceeding the minimum required of one point twenty-five times.',
    },
    risks: {
      title: 'Plan 1: Risk and Resilience',
      text: 'Plan 1 maintains operational viability even under severe market stress. The farm is drought-proof with nine boreholes and nineteen kiloliter dam capacity. Pre-sold NSNP contracts and retail off-take agreements lock in revenue. Five hundred kVA Solar eliminates energy cost risk.',
    },
  },
  plan2: {
    investment: {
      title: 'Plan 2: Total Investment',
      text: 'Total Investment for Plan 2 is seventy-seven point zero Million Rand. It includes sixty-four percent Debt, and thirty-six percent Grant.',
    },
    revenue: {
      title: 'Plan 2: Year 7 Revenue',
      text: 'Plan 2\'s Year 7 Revenue is one hundred ninety-six point eight million Rand. The Soy Margin is seventy-two point zero percent.',
    },
    jobs: {
      title: 'Plan 2: Jobs and Impact',
      text: 'Plan 2 generates sixty-two direct jobs, with an additional forty-eight indirect jobs.',
    },
    dscr: {
      title: 'Plan 2: DSCR Coverage',
      text: 'Plan 2\'s DSCR Coverage is sixteen point six times in Year 7, exceeding the minimum required of one point twenty-five times.',
    },
    risks: {
      title: 'Plan 2: Risk and Resilience',
      text: 'Plan 2\'s dual-commodity model, Soy and Macadamias, hedges against market volatility. The one hundred eighty hectare Agroforestry system creates a microclimate reducing water needs by twenty percent, making it highly climate resilient.',
    },
  },
  plan3: {
    investment: {
      title: 'Plan 3: Total Investment',
      text: 'Total Investment for Plan 3 is sixty-six point zero Million Rand. It includes seventy percent Debt, and thirty percent Grant.',
    },
    revenue: {
      title: 'Plan 3: Year 3 Revenue',
      text: 'Plan 3\'s Year 3 Revenue is one hundred fourteen point nine million Rand. The EBITDA Margin is forty point two percent.',
    },
    jobs: {
      title: 'Plan 3: Jobs and Impact',
      text: 'Plan 3 generates one hundred forty-five direct jobs, with an additional one hundred eighteen indirect jobs.',
    },
    dscr: {
      title: 'Plan 3: DSCR Coverage',
      text: 'Plan 3\'s DSCR Coverage is eight point five times, with Government Contracts locked.',
    },
    risks: {
      title: 'Plan 3: Risk and Resilience',
      text: 'Plan 3\'s diversified revenue streams, Retail, Institutional, and Export, provide extreme resilience. Institutional contracts like Prisons and Hospitals cover one hundred percent of debt service, making the retail upside purely profit.',
    },
  },
  plan3b: {
    investment: {
      title: 'Plan 3B: Total Investment',
      text: 'Total Investment for Plan 3B is thirty-eight point zero Million Rand. It includes seventy percent Debt, and thirty percent Grant.',
    },
    revenue: {
      title: 'Plan 3B: Year 3 Revenue',
      text: 'Plan 3B\'s Year 3 Revenue is thirty point eight million Rand. The EBITDA Margin is forty point zero percent.',
    },
    jobs: {
      title: 'Plan 3B: Jobs and Impact',
      text: 'Plan 3B generates seventy direct jobs, forty-two direct and twenty-eight indirect.',
    },
    dscr: {
      title: 'Plan 3B: DSCR Coverage',
      text: 'Plan 3B\'s DSCR Coverage is two point forty-one times, with an Internal Rate of Return of twenty-four point three percent.',
    },
    risks: {
      title: 'Plan 3B: Risk and Resilience',
      text: 'Plan 3B\'s three to five year first-mover advantage in South Africa Lion\'s Mane production builds an insurmountable brand moat before competitors can exit organic conversion. Diversified export and retail channels mitigate market concentration.',
    },
  },
  plan4: {
    investment: {
      title: 'Plan 4: Total Investment',
      text: 'Total Investment for Plan 4 is fifty-five point zero Million Rand. It includes seventy percent Debt, and thirty percent Grant.',
    },
    revenue: {
      title: 'Plan 4: Year 7 Revenue',
      text: 'Plan 4\'s Year 7 Revenue is thirty-nine point six million Rand. The Net Margin is thirty-four point five percent.',
    },
    jobs: {
      title: 'Plan 4: Jobs and Impact',
      text: 'Plan 4 generates fifty-three direct jobs, with an additional forty indirect jobs.',
    },
    dscr: {
      title: 'Plan 4: DSCR Coverage',
      text: 'Plan 4\'s DSCR Coverage is three point ninety-nine times in Year 7, at full maturity.',
    },
    risks: {
      title: 'Plan 4: Risk and Resilience',
      text: 'Plan 4\'s patient capital model accommodates the cheese ageing period. Risk is mitigated by waxed shelf-stability, meaning no cold chain is required, and extreme margin expansion once estate-grown macadamias come online.',
    },
  },
  plan5: {
    investment: {
      title: 'Plan 5: Total Investment',
      text: 'Total Investment for Plan 5 is ninety-nine point eight Million Rand. It includes seventy percent Debt, and thirty percent Grant.',
    },
    revenue: {
      title: 'Plan 5: Year 3 Revenue',
      text: 'Plan 5\'s Year 3 Revenue is five hundred seventy-five point two million Rand. The EBITDA Margin is seventy-three point eight percent.',
    },
    jobs: {
      title: 'Plan 5: Jobs and Impact',
      text: 'Plan 5 generates eighty-five direct jobs, with an additional one hundred twenty indirect jobs.',
    },
    dscr: {
      title: 'Plan 5: DSCR Coverage',
      text: 'Plan 5\'s DSCR Coverage is thirty-seven point four times, exceeding the minimum required of one point twenty-five times.',
    },
    risks: {
      title: 'Plan 5: Risk and Resilience',
      text: 'Plan 5\'s facility is designed to be completely immune to South African infrastructure risks. One hundred percent Solar plus Battery eliminates load-shedding risk entirely, protecting pharmaceutical batch integrity.',
    },
  },
  plan6: {
    investment: {
      title: 'Plan 6: Total Investment',
      text: 'Total Investment for Plan 6 is forty point zero Million Rand. It includes seventy percent Debt, and thirty percent Grant.',
    },
    revenue: {
      title: 'Plan 6: Year 3 Revenue',
      text: 'Plan 6\'s Year 3 Revenue is eighty-nine point eight million Rand. The EBITDA Margin is eighty point seven percent.',
    },
    jobs: {
      title: 'Plan 6: Jobs and Impact',
      text: 'Plan 6 generates forty-eight direct jobs, with a carbon reduction of twelve thousand five hundred four tonnes.',
    },
    dscr: {
      title: 'Plan 6: DSCR Coverage',
      text: 'Plan 6\'s DSCR Coverage is twelve point nine times, exceeding the minimum required of one point twenty-five times.',
    },
    risks: {
      title: 'Plan 6: Risk and Resilience',
      text: 'Plan 6\'s facility maintains operational viability even under severe market stress. Our debt service coverage ratio, DSCR, provides an extraordinary safety buffer. Ubuntu Energy Independence is not just an infrastructure project, it is a mechanism for rural transformation and climate action. We solve the diesel import crisis while regenerating the soil.',
    },
  },
};
