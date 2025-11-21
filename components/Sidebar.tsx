
import React, { useState } from 'react';
import { NavItem } from '../types';
import { Menu, X, Grid, ChevronDown, Check, Search, ArrowLeft } from 'lucide-react';
import { projects } from '../data/projects';

interface SidebarProps {
  items: NavItem[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeProjectId: string | 'master';
  setActiveProjectId: (id: string | 'master') => void;
  onBackToHome: () => void;
}

const UbuntuLogo = ({ className }: { className?: string }) => (
  <div className={`relative flex items-center justify-center rounded-full overflow-hidden ${className}`}>
      <img src="https://i.postimg.cc/9Fp8zz5K/UAEI-Icon.png" alt="Ubuntu Restoration Farms" className="w-full h-full object-cover" />
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ 
  items, 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen,
  activeProjectId,
  setActiveProjectId,
  onBackToHome
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const activeProject = projects.find(p => p.id === activeProjectId);

  const handleProjectSelect = (id: string | 'master') => {
      setActiveProjectId(id);
      setIsDropdownOpen(false);
      setSearchQuery(''); // Reset search on selection
      if (window.innerWidth < 1024) setIsOpen(false);
  };

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-4 z-30 shadow-sm">
        <div className="flex items-center gap-3" onClick={onBackToHome}>
          <UbuntuLogo className="h-8 w-8" />
          <span className="text-emerald-950 font-bold text-lg tracking-tight">Ubuntu Restoration</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 z-40 h-screen w-72 bg-slate-900 text-white transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:block flex-shrink-0 flex flex-col
        `}
      >
        {/* Brand Header - Clickable to Home */}
        <div 
            className="h-16 flex items-center gap-3 px-6 border-b border-slate-800 flex-shrink-0 bg-slate-900 cursor-pointer hover:bg-slate-800 transition-colors group"
            onClick={onBackToHome}
            title="Back to Home Page"
        >
            <div className="group-hover:hidden">
                <UbuntuLogo className="h-10 w-10" />
            </div>
            <div className="hidden group-hover:flex h-10 w-10 items-center justify-center bg-slate-700 rounded-full">
                <ArrowLeft className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-white">Ubuntu Restoration</span>
                <span className="text-[10px] text-slate-400 group-hover:text-emerald-400 uppercase tracking-wider font-bold">Return Home</span>
            </div>
        </div>

        {/* Context Switcher */}
        <div className="p-4 border-b border-slate-800 flex-shrink-0">
            <p className="text-xs text-slate-500 font-bold uppercase mb-2">Current Context</p>
            <button 
                onClick={() => handleProjectSelect('master')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg mb-2 transition-colors ${activeProjectId === 'master' ? 'bg-emerald-900 text-emerald-100 border border-emerald-700' : 'text-slate-400 hover:bg-slate-800'}`}
            >
                <Grid className="h-4 w-4" />
                <span className="text-sm font-medium">Master Portfolio</span>
            </button>

            <div className="relative">
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-slate-800 rounded-lg text-left hover:bg-slate-700 transition-colors"
                >
                    <span className="text-sm font-medium truncate">{activeProject ? activeProject.name : 'Select Plan...'}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 rounded-lg border border-slate-700 shadow-xl z-50 max-h-72 overflow-y-auto flex flex-col">
                        
                        {/* Search Input */}
                        <div className="p-2 sticky top-0 bg-slate-800 z-10 border-b border-slate-700">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
                                <input 
                                    type="text" 
                                    placeholder="Filter plans..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-md py-1.5 pl-8 pr-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-600"
                                    autoFocus
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>

                        {/* Project List */}
                        <div className="py-1">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => (
                                    <button
                                        key={project.id}
                                        onClick={() => handleProjectSelect(project.id)}
                                        className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between group"
                                    >
                                        <span className="truncate">{project.name}</span>
                                        {activeProjectId === project.id && <Check className="h-3 w-3 text-emerald-400 flex-shrink-0 ml-2" />}
                                    </button>
                                ))
                            ) : (
                                <div className="px-3 py-4 text-center">
                                    <p className="text-xs text-slate-500">No plans found</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
            <p className="px-4 text-xs text-slate-500 font-bold uppercase mb-2 mt-2">
                {activeProjectId === 'master' ? 'Master Navigation' : 'Project Navigation'}
            </p>
            
            {items.map((item) => {
                // For Master View, we only show relevant high-level tabs
                // We hide Financials and Tech as those components need specific plan data currently
                if (activeProjectId === 'master') {
                    if (['financials', 'technology'].includes(item.id)) return null;
                }

                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            if (window.innerWidth < 1024) setIsOpen(false);
                        }}
                        className={`
                            w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                            ${isActive 
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }
                        `}
                    >
                        <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        {item.label}
                    </button>
                );
            })}
        </div>

        {/* Status Footer */}
        {activeProject && activeProjectId !== 'master' && (
            <div className="p-4 border-t border-slate-800 flex-shrink-0">
                <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-xs text-slate-400 uppercase font-semibold mb-2">Project Status</p>
                <div className="flex items-center gap-2 mb-2">
                    <div className={`h-2 w-2 rounded-full animate-pulse ${activeProject.status === 'Active' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                    <span className="text-sm font-medium">{activeProject.status}</span>
                </div>
                <p className="text-xs text-slate-500 truncate">{activeProject.location}</p>
                </div>
            </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
