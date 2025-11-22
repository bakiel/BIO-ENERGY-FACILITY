
import React, { useState } from 'react';
import { LayoutDashboard, BarChart3, Cog, Sprout, Box as BoxIcon, Network, Film } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FinancialAnalysis from './components/FinancialAnalysis';
import TechAndOps from './components/TechAndOps';
import Impact from './components/Impact';
import Facility3D from './components/Facility3D';
import SystemLogic from './components/SystemLogic';
import MasterDashboard from './components/MasterDashboard';
import SkeletonLoader from './components/SkeletonLoader';
import LandingPage from './components/LandingPage';
import AnimationStoryboard from './components/AnimationStoryboard';
import Plan1Storyboard from './components/Plan1Storyboard';
import { NavItem } from './types';
import { projects } from './data/projects';

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'financials', label: 'Financial Analysis', icon: BarChart3 },
  { id: 'technology', label: 'Technology & Roadmap', icon: Cog },
  { id: 'system', label: 'System Logic', icon: Network },
  { id: 'model3d', label: '3D Facility Model', icon: BoxIcon },
  { id: 'storyboard', label: 'Visual Storyboard', icon: Film },
  { id: 'impact', label: 'Impact & ESG', icon: Sprout },
];

const App: React.FC = () => {
  // State for Landing Page (The "Packaging")
  const [showLanding, setShowLanding] = useState(true);

  // State for sidebar (mobile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State for Navigation Scope ('master' or specific project id)
  const [activeProjectId, setActiveProjectId] = useState<string | 'master'>('master');
  
  // State for tabs within a project
  const [activeTab, setActiveTab] = useState('dashboard');

  // Loading state for transitions
  const [isLoading, setIsLoading] = useState(false);

  const handleProjectChange = (id: string | 'master') => {
    if (id === activeProjectId) return;
    
    setIsLoading(true);
    
    // Simulate network/data processing delay for smooth transition
    setTimeout(() => {
        setActiveProjectId(id);
        setActiveTab('dashboard'); // Reset to overview when entering a project
        setIsLoading(false);
    }, 800);
  };

  const handleLandingEnter = (targetTab: string = 'dashboard') => {
      if (targetTab === 'storyboard') {
          setActiveProjectId('master');
          setActiveTab('storyboard');
      } else {
          setActiveProjectId('master');
          setActiveTab('dashboard');
      }
      setShowLanding(false);
  };

  // Render the content based on state
  const renderContent = () => {
    if (isLoading) {
        return <SkeletonLoader />;
    }

    // If looking at Master Plan
    if (activeProjectId === 'master') {
        if (activeTab === 'storyboard') return <AnimationStoryboard />;
        return <MasterDashboard onSelectProject={handleProjectChange} />;
    }

    // If looking at a specific project
    // Allow Plan 1, 2, 3, 3B, 4, 5, 6 to render detailed views
    const availableProjects = ['plan1', 'plan2', 'plan3', 'plan3b', 'plan4', 'plan5', 'plan6'];
    
    if (!availableProjects.includes(activeProjectId)) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 max-w-md">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Detailed Plan View Loading...</h2>
                    <p className="text-slate-500 mb-6">
                        The interactive investment model for {projects.find(p => p.id === activeProjectId)?.name} is currently being generated. 
                        <br/><br/>
                        Please navigate to an available plan below:
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                         <button 
                            onClick={() => handleProjectChange('plan1')}
                            className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600"
                        >
                            Plan 1
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} projectId={activeProjectId} />;
      case 'financials':
        return <FinancialAnalysis projectId={activeProjectId} />;
      case 'technology':
        return <TechAndOps projectId={activeProjectId} />;
      case 'system':
        return <SystemLogic projectId={activeProjectId} />;
      case 'model3d':
        return <Facility3D projectId={activeProjectId} />;
      case 'storyboard':
          if (activeProjectId === 'plan1') return <Plan1Storyboard />;
          // Fallback to generic if specific plan storyboard not yet built
          return <AnimationStoryboard />;
      case 'impact':
        return <Impact projectId={activeProjectId} />;
      default:
        return <Dashboard setActiveTab={setActiveTab} projectId={activeProjectId} />;
    }
  };

  if (showLanding) {
      return <LandingPage onEnter={handleLandingEnter} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-900 overflow-hidden">
      <Sidebar 
        items={navItems} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeProjectId={activeProjectId}
        setActiveProjectId={handleProjectChange}
        onBackToHome={() => setShowLanding(true)}
      />
      
      <main className="flex-1 overflow-y-auto h-screen scroll-smooth">
        {/* Mobile Header Spacer - Matched to Sidebar's fixed header height */}
        <div className="h-16 lg:hidden"></div>
        
        <div className="max-w-7xl mx-auto p-4 md:p-8 pb-24">
            
            {/* Breadcrumbs / Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-2">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {activeProjectId === 'master' 
                            ? (activeTab === 'storyboard' ? 'The Visual Journey' : 'Master Investment Portfolio')
                            : projects.find(p => p.id === activeProjectId)?.name}
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm">
                        {activeProjectId === 'master' 
                            ? (activeTab === 'storyboard' ? '10 Illustrative Moments that define the Ubuntu Model' : 'Real-time ecosystem monitoring and capital allocation')
                            : navItems.find(i => i.id === activeTab)?.label}
                    </p>
                </div>
            </div>

            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
