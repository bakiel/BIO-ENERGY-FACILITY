
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface FinancialAnalysisProps {
    projectId: string;
}

const FinancialAnalysis: React.FC<FinancialAnalysisProps> = ({ projectId }) => {
  
  // Plan 1 Data
  const plan1Revenue = [
    { name: 'Vegetables', value: 20.5, color: '#16a34a' }, // Green
    { name: 'Logistics Services', value: 4.7, color: '#2563eb' }, // Blue
    { name: 'Compost/Rock Dust', value: 4.1, color: '#d97706' }, // Amber
    { name: 'Pecans', value: 3.6, color: '#9333ea' }, // Purple
    { name: 'Soybeans', value: 1.4, color: '#facc15' }, // Yellow
  ];

  const plan1Expense = [
    { name: 'Labour', value: 5.3, color: '#3b82f6' },
    { name: 'Seeds/Inputs', value: 1.6, color: '#16a34a' },
    { name: 'Salaries (Mgmt)', value: 1.7, color: '#64748b' },
    { name: 'Maintenance', value: 0.4, color: '#f59e0b' },
    { name: 'Admin/Mktg', value: 0.8, color: '#94a3b8' },
  ];

  const plan1Ratios = [
    { label: 'EBITDA Margin', value: '71.5%', sub: 'High Efficiency' },
    { label: 'DSCR', value: '3.48x', sub: 'Strong' },
    { label: 'Net Profit', value: 'R22.0M', sub: 'Year 1' },
    { label: 'Asset Value', value: 'R43.5M', sub: 'Day 1 Equity' },
  ];

  // Plan 3 Data
  const plan3Revenue = [
    { name: 'Smokehouse Range', value: 47.9, color: '#d97706' }, // Amber
    { name: 'Convenience', value: 31.1, color: '#2563eb' }, // Blue
    { name: 'Seitan Deli', value: 28.3, color: '#dc2626' }, // Red
    { name: 'HMMA Meats', value: 27.5, color: '#16a34a' }, // Green
    { name: 'Nutritional Yeast', value: 8.3, color: '#facc15' }, // Yellow
  ];

  const plan3Expense = [
    { name: 'COGS (Inputs)', value: 31.4, color: '#64748b' },
    { name: 'Salaries', value: 12.8, color: '#3b82f6' },
    { name: 'Packaging', value: 8.9, color: '#f59e0b' },
    { name: 'Energy/Water', value: 2.4, color: '#06b6d4' },
    { name: 'Logistics', value: 4.1, color: '#9333ea' },
  ];

  const plan3Ratios = [
    { label: 'EBITDA Margin', value: '40.2%', sub: 'Manufacturing' },
    { label: 'DSCR', value: '8.5x', sub: 'Exceptional' },
    { label: 'IRR', value: '45%', sub: '10-Year' },
    { label: 'Govt Contracts', value: 'R21.6M', sub: 'Locked Revenue' },
  ];

  // Plan 3B Data
  const plan3bRevenue = [
      { name: 'Export Dried', value: 9.5, color: '#9333ea' }, // Purple
      { name: 'Medicinal Capsules', value: 8.2, color: '#2563eb' }, // Blue
      { name: 'Fresh Culinary', value: 7.5, color: '#16a34a' }, // Green
      { name: 'Value Added', value: 4.9, color: '#d97706' }, // Amber
      { name: 'Other', value: 0.7, color: '#64748b' }, // Slate
  ];

  const plan3bExpense = [
      { name: 'COGS', value: 8.7, color: '#64748b' },
      { name: 'Labour', value: 9.8, color: '#3b82f6' },
      { name: 'Marketing', value: 1.2, color: '#f59e0b' },
      { name: 'Utilities', value: 1.4, color: '#06b6d4' },
      { name: 'Logistics', value: 0.8, color: '#9333ea' },
  ];

  const plan3bRatios = [
      { label: 'EBITDA Margin', value: '40.0%', sub: 'High Value' },
      { label: 'DSCR', value: '2.41x', sub: 'Strong' },
      { label: 'IRR', value: '24.3%', sub: '10-Year' },
      { label: 'Payback', value: '6.8 Yrs', sub: 'Steady' },
  ];

  // Plan 4 Data
  const plan4Revenue = [
    { name: 'Artisan Cheese', value: 36.0, color: '#facc15' }, // Yellow
    { name: 'Raw Honey', value: 2.5, color: '#d97706' }, // Amber
    { name: 'Mac Blossom Honey', value: 0.6, color: '#fb923c' }, // Orange
    { name: 'Honeycomb/Credits', value: 0.5, color: '#16a34a' }, // Green
  ];

  const plan4Expense = [
      { name: 'COGS (Estate Mac)', value: 2.4, color: '#10b981' }, // Super low cost!
      { name: 'Salaries (Expert)', value: 5.4, color: '#3b82f6' },
      { name: 'Logistics', value: 2.1, color: '#f59e0b' },
      { name: 'Packaging (Wax)', value: 1.8, color: '#64748b' },
      { name: 'Marketing/Export', value: 1.5, color: '#9333ea' },
  ];

  const plan4Ratios = [
      { label: 'Gross Margin', value: '94.0%', sub: 'Year 7 (Estate Supply)' },
      { label: 'DSCR', value: '3.99x', sub: 'Year 7' },
      { label: 'Bee ROI', value: '570%', sub: 'Pollination Value' },
      { label: 'Input Saving', value: 'R25.7M', sub: 'Vs Market Price' },
  ];

  // Plan 5 Data
  const plan5Revenue = [
    { name: 'Broccoli Powder (Retail)', value: 325.0, color: '#059669' }, // Emerald
    { name: 'Retail Capsules', value: 120.0, color: '#0891b2' }, // Cyan
    { name: 'Fresh Microgreens', value: 100.7, color: '#84cc16' }, // Lime
    { name: 'Medicinal Powder', value: 27.0, color: '#f59e0b' }, // Amber
    { name: 'Fresh Veg', value: 2.5, color: '#64748b' }, // Slate
  ];
  
  const plan5Expense = [
    { name: 'COGS', value: 120.8, color: '#64748b' },
    { name: 'Salaries', value: 10.0, color: '#3b82f6' },
    { name: 'Marketing', value: 11.5, color: '#06b6d4' },
    { name: 'Solar O&M', value: 0.9, color: '#f59e0b' },
    { name: 'Certifications', value: 1.5, color: '#8b5cf6' },
  ];

  const plan5Ratios = [
    { label: 'EBITDA Margin', value: '73.8%', sub: 'Pharma Grade' },
    { label: 'Payback Period', value: '5.2 Mo', sub: 'Exceptional' },
    { label: 'ROI (Solar)', value: '1.09 Yr', sub: 'R57M Benefit/Yr' },
    { label: 'Year 3 EBITDA', value: 'R424.3M', sub: 'High Growth' },
  ];

  // Plan 6 Data
  const plan6Revenue = [
    { name: 'Bio-Diesel', value: 60.4, color: '#059669' }, // Emerald 600
    { name: 'Biochar', value: 22.5, color: '#1e293b' },    // Slate 800
    { name: 'Fleet Services', value: 6.9, color: '#3b82f6' }, // Blue 500 (Net)
  ];

  const plan6Expense = [
    { name: 'Labour', value: 4.7, color: '#3b82f6' },
    { name: 'Feedstock', value: 2.6, color: '#10b981' },
    { name: 'Maintenance', value: 3.5, color: '#f59e0b' },
    { name: 'Logistics', value: 1.7, color: '#6366f1' },
    { name: 'Other Ops', value: 4.7, color: '#94a3b8' },
  ];

  const plan6Ratios = [
    { label: 'EBITDA Margin', value: '80.7%', sub: 'Energy Indep.' },
    { label: 'Breakeven Sales', value: 'R13.5M', sub: 'Low Risk' },
    { label: 'NPV @ 12%', value: 'R524M', sub: '13.1x Multiple' },
    { label: 'Year 3 EBITDA', value: 'R72.6M', sub: 'Exceptional' },
  ];

  // Plan 2 Data
  const plan2Revenue = [
    { name: 'Mac Dairy Products', value: 90.8, color: '#059669' },
    { name: 'Mac Ice Cream', value: 21.8, color: '#0891b2' },
    { name: 'Mac Chocolate', value: 35.7, color: '#f59e0b' },
    { name: 'External Mac Sales', value: 16.9, color: '#84cc16' },
    { name: 'Residual Soy', value: 8.2, color: '#64748b' },
  ];

  const plan2Expense = [
      { name: 'COGS', value: 39.3, color: '#64748b' },
      { name: 'Salaries', value: 5.7, color: '#3b82f6' },
      { name: 'Logistics', value: 4.5, color: '#f59e0b' },
      { name: 'Marketing', value: 1.1, color: '#06b6d4' },
      { name: 'Admin/Other', value: 1.5, color: '#94a3b8' },
  ];

  const plan2Ratios = [
      { label: 'EBITDA Margin', value: '53.5%', sub: 'Year 7' },
      { label: 'Bee ROI', value: '695%', sub: 'R20.9M Value' },
      { label: 'DSCR', value: '16.6x', sub: 'Year 7' },
      { label: 'Carbon Credit', value: 'R375k', sub: 'Conservative' },
  ];

  let revenueData = plan6Revenue;
  let expenseData = plan6Expense;
  let ratios = plan6Ratios;
  let totalRev = 'R89.8 Million';
  let totalOpex = 'R17.2 Million';

  if (projectId === 'plan1') {
    revenueData = plan1Revenue;
    expenseData = plan1Expense;
    ratios = plan1Ratios;
    totalRev = 'R34.3 Million (Year 1)';
    totalOpex = 'R9.6 Million';
  } else if (projectId === 'plan2') {
    revenueData = plan2Revenue;
    expenseData = plan2Expense;
    ratios = plan2Ratios;
    totalRev = 'R196.8 Million (Year 7)';
    totalOpex = 'R52.1 Million';
  } else if (projectId === 'plan3') {
    revenueData = plan3Revenue;
    expenseData = plan3Expense;
    ratios = plan3Ratios;
    totalRev = 'R114.9 Million';
    totalOpex = 'R37.3 Million';
  } else if (projectId === 'plan3b') {
    revenueData = plan3bRevenue;
    expenseData = plan3bExpense;
    ratios = plan3bRatios;
    totalRev = 'R30.8 Million';
    totalOpex = 'R18.5 Million';
  } else if (projectId === 'plan4') {
    revenueData = plan4Revenue;
    expenseData = plan4Expense;
    ratios = plan4Ratios;
    totalRev = 'R39.6 Million (Year 7)';
    totalOpex = 'R11.9 Million';
  } else if (projectId === 'plan5') {
    revenueData = plan5Revenue;
    expenseData = plan5Expense;
    ratios = plan5Ratios;
    totalRev = 'R575.2 Million';
    totalOpex = 'R30.1 Million (+ COGS)';
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Mix */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Revenue Composition {projectId === 'plan2' || projectId === 'plan4' ? '(Year 7)' : projectId === 'plan1' ? '(Year 1)' : '(Year 3)'}</h3>
          <p className="text-sm text-slate-500 mb-6">Total Revenue: {totalRev}</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R${value}M`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Operating Expenses</h3>
          <p className="text-sm text-slate-500 mb-6">Annual Opex: {totalOpex}</p>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                <Tooltip formatter={(value) => `R${value}M`} cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="#64748b" radius={[0, 4, 4, 0]} barSize={20}>
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Key Financial Ratios</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100">
            {ratios.map((ratio, idx) => (
                <div key={idx} className="p-6 text-center">
                    <p className="text-sm text-slate-500 font-medium mb-1">{ratio.label}</p>
                    <p className="text-3xl font-bold text-slate-900">{ratio.value}</p>
                    <p className="text-xs text-emerald-600 mt-2 font-medium">{ratio.sub}</p>
                </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Debt Structure */}
         <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-4">Debt Service Capability</h4>
            <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex justify-between">
                    <span>Annual Debt Service:</span>
                    <span className="font-bold">{projectId === 'plan5' ? 'R 11.34M' : (projectId === 'plan3b' ? 'R 5.1M' : (projectId === 'plan4' ? 'R 6.35M' : (projectId === 'plan3' ? 'R 5.4M' : (projectId === 'plan2' ? 'R 6.35M' : (projectId === 'plan1' ? 'R 5.71M' : 'R 5.64M')))))}</span>
                </li>
                <li className="flex justify-between">
                    <span>EBITDA (Year {projectId === 'plan4' || projectId === 'plan2' ? '7' : (projectId === 'plan1' ? '1' : '3')}):</span>
                    <span className="font-bold">{projectId === 'plan5' ? 'R 424.3M' : (projectId === 'plan3b' ? 'R 12.2M' : (projectId === 'plan4' ? 'R 25.3M' : (projectId === 'plan3' ? 'R 46.2M' : (projectId === 'plan2' ? 'R 105.4M' : (projectId === 'plan1' ? 'R 24.5M' : 'R 72.6M')))))}</span>
                </li>
                 <li className="flex justify-between pt-2 border-t border-slate-300">
                    <span>Coverage Ratio (DSCR):</span>
                    <span className="font-bold text-emerald-600">{projectId === 'plan5' ? '37.4x' : (projectId === 'plan3b' ? '2.41x' : (projectId === 'plan4' ? '3.99x' : (projectId === 'plan3' ? '8.5x' : (projectId === 'plan2' ? '16.6x' : (projectId === 'plan1' ? '3.48x' : '12.9x')))))}</span>
                </li>
            </ul>
            <p className="text-xs text-slate-500 mt-4 italic">
                {projectId === 'plan5' 
                    ? "\"3,000% above minimum bank requirement of 1.25x.\"" 
                    : projectId === 'plan3b'
                    ? "\"Strong coverage even at 50% revenue scenario due to high margins.\""
                    : projectId === 'plan4'
                    ? "\"Estate macadamia supply drops COGS by 98% in Year 6, driving massive DSCR.\""
                    : (projectId === 'plan3' 
                    ? "\"Institutions alone cover debt service. Retail is pure profit.\""
                    : (projectId === 'plan2' ? "\"Exceptional coverage due to dual revenue streams.\"" : "\"Revenue can decline 87.5% before debt service is challenged.\""))}
            </p>
         </div>

         {/* Working Capital / Capex */}
         <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-4">Capital Allocation {projectId === 'plan5' ? '(R99.8M)' : (projectId === 'plan3b' ? '(R38.0M)' : (projectId === 'plan4' ? '(R55.0M)' : (projectId === 'plan3' ? '(R66.0M)' : (projectId === 'plan2' ? '(R77.0M)' : (projectId === 'plan1' ? '(R57.1M)' : '(R40M)')))))}</h4>
            {projectId === 'plan5' ? (
                <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex justify-between">
                        <span>100% Solar System:</span>
                        <span className="font-bold">R 62.16M</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Greenhouse Infra:</span>
                        <span className="font-bold">R 14.60M</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Processing Plant:</span>
                        <span className="font-bold">R 12.54M</span>
                    </li>
                </ul>
            ) : projectId === 'plan3b' ? (
                <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex justify-between">
                        <span>16x Climate Containers:</span>
                        <span className="font-bold">R 16.45M</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Substrate Line:</span>
                        <span className="font-bold">R 6.85M</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Processing & Lab:</span>
                        <span className="font-bold">R 8.92M</span>
                    </li>
                     <li className="flex justify-between pt-2 border-t border-slate-300">
                        <span>Working Capital:</span>
                        <span className="font-bold">R 3.5M</span>
                    </li>
                </ul>
            ) : projectId === 'plan4' ? (
                <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex justify-between">
                        <span>Cheese Factory & Equipment:</span>
                        <span className="font-bold">R 21.5M</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Solar + Battery (300kW/400kWh):</span>
                        <span className="font-bold">R 4.8M</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Working Capital (Inventory):</span>
                        <span className="font-bold">R 19.0M</span>
                    </li>
                     <li className="flex justify-between pt-2 border-t border-slate-300">
                        <span>Flow Hives (200 Units):</span>
                        <span className="font-bold">R 3.0M</span>
                    </li>
                </ul>
            ) : projectId === 'plan3' ? (
                <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex justify-between">
                        <span>Butcher Line & Factory:</span>
                        <span className="font-bold">R 42.5M</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Extrusion & Seitan Tech:</span>
                        <span className="font-bold">R 16.3M</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Packaging (Retort):</span>
                        <span className="font-bold">R 8.95M</span>
                    </li>
                     <li className="flex justify-between pt-2 border-t border-slate-300">
                        <span>Working Capital:</span>
                        <span className="font-bold">R 7.0M</span>
                    </li>
                </ul>
            ) : projectId === 'plan2' ? (
                <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex justify-between">
                        <span>Agroforestry System:</span>
                        <span className="font-bold">R 22.0M</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Buildings & Infras:</span>
                        <span className="font-bold">R 20.6M</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Dairy Equip & Cold Chain:</span>
                        <span className="font-bold">R 21.0M</span>
                    </li>
                     <li className="flex justify-between pt-2 border-t border-slate-300">
                        <span>Working Capital:</span>
                        <span className="font-bold">R 25.0M</span>
                    </li>
                </ul>
            ) : projectId === 'plan1' ? (
                <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex justify-between">
                        <span>Land Acquisition:</span>
                        <span className="font-bold">R 26.9M</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Solar & Agritech:</span>
                        <span className="font-bold">R 12.5M</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Equipment & Capital:</span>
                        <span className="font-bold">R 12.2M</span>
                    </li>
                </ul>
            ) : (
                <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex justify-between">
                        <span>Bio-Diesel Refinery:</span>
                        <span className="font-bold">R 35.3M</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Logistics Fleet:</span>
                        <span className="font-bold">R 1.79M</span>
                    </li>
                    <li className="flex justify-between pt-2 border-t border-slate-300">
                        <span>Working Capital & Fees:</span>
                        <span className="font-bold">R 2.91M</span>
                    </li>
                </ul>
            )}
         </div>
      </div>
    </div>
  );
};

export default FinancialAnalysis;