import React from 'react';
import { Volume2, PauseCircle, Loader2 } from 'lucide-react';

interface AudioButtonProps {
  id: string;
  title: string;
  text: string;
  isPlaying: boolean;
  currentPlayingId: string | null;
  isLoadingAudio: boolean;
  fetchAndPlayAudio: (text: string, id: string, title: string) => void;
  pauseAudio: () => void;
}

const AudioButton: React.FC<AudioButtonProps> = ({
  id,
  title,
  text,
  isPlaying,
  currentPlayingId,
  isLoadingAudio,
  fetchAndPlayAudio,
  pauseAudio,
}) => {
  const isThisPlaying = isPlaying && currentPlayingId === id;
  const isThisLoading = isLoadingAudio && currentPlayingId === id;

  const handleClick = () => {
    if (isThisPlaying) {
      pauseAudio();
    } else {
      fetchAndPlayAudio(text, id, title);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ml-2 inline-flex items-center justify-center p-1.5 rounded-full 
        transition-colors duration-200
        ${isThisPlaying ? 'bg-emerald-100 text-emerald-600' : 'text-slate-500 hover:text-emerald-600'}
        ${isThisLoading ? 'animate-pulse' : ''}
      `}
      aria-label={isThisPlaying ? `Pause ${title}` : `Listen to ${title}`}
      title={isThisPlaying ? `Pause ${title}` : `Listen to ${title}`}
    >
      {isThisLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isThisPlaying ? (
        <PauseCircle className="w-4 h-4" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
    </button>
  );
};

export default AudioButton;
