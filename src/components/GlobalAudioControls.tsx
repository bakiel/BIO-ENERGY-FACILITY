import React from 'react';
import { PlayCircle, PauseCircle, Square, Volume2, Loader2 } from 'lucide-react';

interface GlobalAudioControlsProps {
  isPlaying: boolean;
  isLoading: boolean;
  currentTitle: string | null;
  onPlayPause: () => void;
  onStop: () => void;
}

const GlobalAudioControls: React.FC<GlobalAudioControlsProps> = ({
  isPlaying,
  isLoading,
  currentTitle,
  onPlayPause,
  onStop,
}) => {
  if (!currentTitle && !isLoading) {
    return null; // Don't render if nothing is playing or loading
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl shadow-xl p-3 flex items-center gap-3 animate-fade-in-up">
      <div className="relative">
        {isLoading ? (
          <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
        ) : (
          <button
            onClick={onPlayPause}
            className="text-white hover:text-emerald-400 transition-colors"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? (
              <PauseCircle className="w-6 h-6" />
            ) : (
              <PlayCircle className="w-6 h-6" />
            )}
          </button>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate max-w-[180px] sm:max-w-[250px] md:max-w-[300px]">
          {currentTitle || 'Loading Audio...'}
        </p>
        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
          <Volume2 className="w-3 h-3" />
          {isLoading ? 'Generating voice...' : (isPlaying ? 'Playing now' : 'Paused')}
        </p>
      </div>

      <button
        onClick={onStop}
        className="text-slate-400 hover:text-red-500 transition-colors ml-2"
        aria-label="Stop audio"
      >
        <Square className="w-5 h-5" />
      </button>
    </div>
  );
};

export default GlobalAudioControls;
