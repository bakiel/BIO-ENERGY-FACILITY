
import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Area Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-slate-200 rounded-lg w-64"></div>
        <div className="h-8 bg-slate-200 rounded-lg w-32"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-36 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_1.5s_infinite]"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-3 w-full">
                <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                <div className="h-8 bg-slate-200 rounded w-2/3"></div>
              </div>
              <div className="h-10 w-10 bg-slate-200 rounded-lg flex-shrink-0"></div>
            </div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[400px]">
          <div className="h-6 bg-slate-200 rounded w-48 mb-8"></div>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
             {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="w-full bg-slate-100 rounded-t-lg relative overflow-hidden">
                     <div className="absolute bottom-0 left-0 right-0 bg-slate-200" style={{ height: `${Math.random() * 50 + 30}%` }}></div>
                 </div>
             ))}
          </div>
        </div>

        {/* Phases Area */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[400px] flex flex-col">
          <div className="h-6 bg-slate-200 rounded w-40 mb-8"></div>
          <div className="space-y-8 flex-1">
             {[1, 2, 3].map(i => (
                 <div key={i} className="flex gap-4">
                     <div className="w-4 h-4 rounded-full bg-slate-200 flex-shrink-0 mt-1"></div>
                     <div className="space-y-2 w-full">
                         <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                         <div className="h-3 bg-slate-100 rounded w-full"></div>
                         <div className="h-3 bg-slate-100 rounded w-3/4"></div>
                     </div>
                 </div>
             ))}
          </div>
          <div className="h-12 bg-slate-200 rounded-lg w-full mt-auto"></div>
        </div>
      </div>

      {/* Bottom Risk/Footer Skeleton */}
      <div className="bg-slate-800 rounded-xl p-6 h-48">
        <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-6 bg-slate-700 rounded-full"></div>
            <div className="h-6 bg-slate-700 rounded w-64"></div>
        </div>
        <div className="h-4 bg-slate-700/50 rounded w-full max-w-3xl mb-8"></div>
        <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => (
                <div key={i} className="h-16 bg-slate-700 rounded-lg"></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
