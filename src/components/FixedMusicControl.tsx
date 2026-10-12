import React, { useState, useEffect } from "react";
import { musicEngine } from "../utils/musicPlayer";
import { MUSIC_TITLE } from "../constants/assets";

export const FixedMusicControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsub = musicEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      unsub();
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent bubbling to document
    musicEngine.toggle();
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 select-none">
      <div className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-full bg-stone-900/95 backdrop-blur-md border border-amber-400/80 shadow-[0_4px_20px_rgba(0,0,0,0.4)] text-white">
        
        {/* Main Single Play/Pause Toggle Button */}
        <button
          onClick={handleToggle}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer shadow-md ${
            isPlaying
              ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              : "bg-gradient-to-r from-amber-600 to-yellow-700 text-white hover:from-amber-500 hover:to-yellow-600"
          }`}
          title="Toggle music: A Deep Fall near Indus"
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
        >
          {isPlaying ? (
            <>
              {/* Animated Sound Bars */}
              <span className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 sm:w-1 bg-white rounded-full animate-bounce h-3" />
                <span className="w-0.5 sm:w-1 bg-white rounded-full animate-bounce h-1.5 delay-100" />
                <span className="w-0.5 sm:w-1 bg-white rounded-full animate-bounce h-2.5 delay-200" />
              </span>
              <span className="whitespace-nowrap">⏸ Pause</span>
            </>
          ) : (
            <>
              <span className="text-xs">▶</span>
              <span className="whitespace-nowrap">Play Music</span>
            </>
          )}
        </button>

        {/* Title Tag on wider screens */}
        <div className="hidden sm:flex flex-col pr-3 pl-1 text-left">
          <span className="text-[11px] font-bold text-amber-200 truncate max-w-[140px]">
            {MUSIC_TITLE}
          </span>
          <span className="text-[9px] font-mono text-stone-400">
            {isPlaying ? "Playing continuously" : "Click to play"}
          </span>
        </div>

      </div>
    </div>
  );
};
