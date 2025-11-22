
import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import GlobalAudioControls from './components/GlobalAudioControls';
import AppLoader from './components/AppLoader';
import { NavItem } from './types';
import { projects } from './data/projects';
import { GoogleGenAI, Modality } from '@google/genai';

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'financials', label: 'Financial Analysis', icon: BarChart3 },
  { id: 'technology', label: 'Technology & Roadmap', icon: Cog },
  { id: 'system', label: 'System Logic', icon: Network },
  { id: 'model3d', label: '3D Facility Model', icon: BoxIcon },
  { id: 'storyboard', label: 'Visual Storyboard', icon: Film },
  { id: 'impact', label: 'Impact & ESG', icon: Sprout },
];

// Utility functions for audio encoding/decoding (as per GenAI guidelines)
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const App: React.FC = () => {
  // State for Initial App Load
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const [showLanding, setShowLanding] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | 'master'>('master');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false); // For page transitions

  // --- Audio Playback States ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [currentPlayingTitle, setCurrentPlayingTitle] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioCacheRef = useRef<Map<string, string>>(new Map());
  let nextStartTime = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Initialize AudioContext only once
  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    }
  }, []);

  const stopCurrentAudio = useCallback(() => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current.disconnect();
      audioSourceRef.current = null;
    }
    sourcesRef.current.forEach(source => {
      source.stop();
      source.disconnect();
    });
    sourcesRef.current.clear();
    nextStartTime.current = 0;
    setIsPlaying(false);
    setCurrentPlayingId(null);
    setCurrentPlayingTitle(null);
    setIsLoadingAudio(false);
  }, []);

  const playAudioSegment = useCallback(async (audioData: string) => {
    stopCurrentAudio(); // Stop any current playback

    if (!audioContextRef.current) {
      console.error('AudioContext not initialized.');
      return;
    }

    try {
      setIsPlaying(true);
      const audioBuffer = await decodeAudioData(
        decode(audioData),
        audioContextRef.current,
        24000,
        1,
      );

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination); // Connect directly to destination

      source.onended = () => {
        sourcesRef.current.delete(source);
        if (sourcesRef.current.size === 0) {
          setIsPlaying(false);
          setCurrentPlayingId(null);
          setCurrentPlayingTitle(null);
        }
      };

      // Schedule for immediate playback or after previous chunks
      nextStartTime.current = Math.max(nextStartTime.current, audioContextRef.current.currentTime);
      source.start(nextStartTime.current);
      nextStartTime.current += audioBuffer.duration;
      sourcesRef.current.add(source);
      audioSourceRef.current = source; // Keep ref to current playing source for pause/stop

    } catch (error) {
      console.error('Error playing audio:', error);
      alert('Failed to play audio. Please try again or check your internet connection.');
      stopCurrentAudio();
    } finally {
      setIsLoadingAudio(false);
    }
  }, [stopCurrentAudio]);

  const fetchAndPlayAudio = useCallback(async (text: string, id: string, title: string) => {
    stopCurrentAudio(); // Stop previous audio first
    setCurrentPlayingId(id);
    setCurrentPlayingTitle(title);
    setIsLoadingAudio(true);

    if (!text || text.trim() === '') {
      console.warn('Attempted to play empty text for TTS.');
      setIsLoadingAudio(false);
      setCurrentPlayingId(null);
      setCurrentPlayingTitle(null);
      return;
    }

    let audioData = audioCacheRef.current.get(id);

    if (!audioData) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        // We instruct the model to use a specific accent in the text prompt
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: `Speak with a professional South African accent: ${text}` }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                // Fenrir offers a deeper, more authoritative tone suitable for investment narration
                prebuiltVoiceConfig: { voiceName: 'Fenrir' }, 
              },
            },
          },
        });

        audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

        if (audioData) {
          audioCacheRef.current.set(id, audioData);
        } else {
          throw new Error('No audio data received from TTS API.');
        }
      } catch (error) {
        console.error('TTS API error:', error);
        alert('Failed to generate voice. Please try again later. Ensure you have selected an API key with billing enabled if using Veo models (though TTS is usually available).');
        stopCurrentAudio();
        return;
      }
    }

    if (audioData) {
      await playAudioSegment(audioData);
    } else {
      console.error('No audio data to play after fetch/cache lookup.');
      stopCurrentAudio();
    }
  }, [playAudioSegment, stopCurrentAudio]);

  const pauseAudio = useCallback(() => {
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
      setIsPlaying(false);
    }
  }, []);

  const resumeAudio = useCallback(() => {
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
      setIsPlaying(true);
    } else if (!isPlaying && currentPlayingId && audioCacheRef.current.has(currentPlayingId)) {
        // If paused and then resumed from global control, restart playback from beginning
        const cachedAudio = audioCacheRef.current.get(currentPlayingId);
        if (cachedAudio) {
            playAudioSegment(cachedAudio);
        }
    }
  }, [isPlaying, currentPlayingId, playAudioSegment]);


  const handleGlobalPlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  };

  const handleProjectChange = (id: string | 'master') => {
    if (id === activeProjectId) return;
    
    stopCurrentAudio(); // Stop audio when changing projects
    setIsLoading(true);
    
    setTimeout(() => {
        setActiveProjectId(id);
        setActiveTab('dashboard'); 
        setIsLoading(false);
    }, 800);
  };

  const handleLandingEnter = (targetTab: string = 'dashboard') => {
      stopCurrentAudio(); // Stop audio when leaving landing page
      setActiveProjectId('master');
      setActiveTab(targetTab);
      setShowLanding(false);
  };

  const renderContent = () => {
    if (isLoading) {
        return <SkeletonLoader />;
    }

    const audioProps = {
      isPlaying,
      currentPlayingId,
      isLoadingAudio,
      fetchAndPlayAudio,
      pauseAudio,
    };

    if (activeProjectId === 'master') {
        // Master Plan Routing
        if (activeTab === 'storyboard') return <AnimationStoryboard />;
        if (activeTab === 'model3d') return <Facility3D projectId="master" />;
        if (activeTab === 'system') return <SystemLogic projectId="master" />;
        if (activeTab === 'impact') return <Impact projectId="master" />;
        // Default to Dashboard
        return <MasterDashboard onSelectProject={handleProjectChange} {...audioProps} />;
    }

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
        return <Dashboard setActiveTab={setActiveTab} projectId={activeProjectId} {...audioProps} />;
      case 'financials':
        return <FinancialAnalysis projectId={activeProjectId} />;
      case 'technology':
        return <TechAndOps projectId={activeProjectId} />;
      case 'system':
        return <SystemLogic projectId={activeProjectId} />;
      case 'model3d':
        return <Facility3D projectId={activeProjectId} />;
      case 'storyboard':
          return <AnimationStoryboard />;
      case 'impact':
        return <Impact projectId={activeProjectId} />;
      default:
        return <Dashboard setActiveTab={setActiveTab} projectId={activeProjectId} {...audioProps} />;
    }
  };

  // --- RENDER LOGIC ---
  if (isInitialLoad) {
      return <AppLoader onComplete={() => setIsInitialLoad(false)} />;
  }

  if (showLanding) {
      return <LandingPage onEnter={handleLandingEnter} {...{ isPlaying, currentPlayingId, isLoadingAudio, fetchAndPlayAudio, pauseAudio }} />;
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
        onBackToHome={() => {
          stopCurrentAudio(); // Stop audio when returning to home
          setShowLanding(true);
        }}
      />
      
      <main className="flex-1 overflow-y-auto h-screen scroll-smooth">
        <div className="h-16 lg:hidden"></div>
        
        <div className="max-w-7xl mx-auto p-4 md:p-8 pb-24">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-2">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {activeProjectId === 'master' 
                            ? (activeTab === 'storyboard' ? 'The Visual Journey' : 
                               activeTab === 'model3d' ? 'Estate 3D Digital Twin' :
                               activeTab === 'system' ? 'System Integration Blueprint' :
                               activeTab === 'impact' ? 'Double Bottom Line Impact' :
                               'Master Investment Portfolio')
                            : projects.find(p => p.id === activeProjectId)?.name}
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm">
                        {activeProjectId === 'master' 
                            ? (activeTab === 'storyboard' ? '10 Illustrative Moments that define the Ubuntu Model' : 
                               activeTab === 'model3d' ? '645 Hectare interactive facility and agricultural zones' :
                               activeTab === 'system' ? 'Interconnected flows of energy, water, and biomass' :
                               activeTab === 'impact' ? 'Quantifying the regenerative outcomes' :
                               'Real-time ecosystem monitoring and capital allocation')
                            : navItems.find(i => i.id === activeTab)?.label}
                    </p>
                </div>
            </div>

            {renderContent()}
        </div>
      </main>

      <GlobalAudioControls
        isPlaying={isPlaying}
        isLoading={isLoadingAudio}
        currentTitle={currentPlayingTitle}
        onPlayPause={handleGlobalPlayPause}
        onStop={stopCurrentAudio}
      />
    </div>
  );
};

export default App;
