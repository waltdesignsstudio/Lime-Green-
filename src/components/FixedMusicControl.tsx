import React, { useState, useEffect } from "react";
import { musicEngine } from "../utils/musicPlayer";
import { MUSIC_TITLE } from "../constants/assets";

export const FixedMusicControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsub = musicEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      unsub();
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent bubbling
    musicEngine.toggle();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-stone-900/95 backdrop-blur-xl border-2 border-amber-400/80 shadow-[0_8px_30px_rgba(0,0,0,0.45)] text-white">
        
        {/* Main Single Play/Pause Toggle Button */}
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full font-mono text-xs font-bold transition-all duration-300 cursor-pointer shadow-md ${
            isPlaying
              ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]"
              : "bg-gradient-to-r from-amber-600 to-yellow-700 text-white hover:from-amber-500 hover:to-yellow-600"
          }`}
          title="Toggle music: A Deep Fall near Indus"
        >
          {isPlaying ? (
            <>
              {/* Animated Sound Bars */}
              <span className="flex items-end gap-0.5 h-3.5">
                <span className="w-1 bg-white rounded-full animate-bounce h-3.5" />
                <span className="w-1 bg-white rounded-full animate-bounce h-2 delay-100" />
                <span className="w-1 bg-white rounded-full animate-bounce h-3 delay-200" />
              </span>
              <span className="whitespace-nowrap">⏸ Pause Music</span>
            </>
          ) : (
            <>
              <span className="text-sm">▶</span>
              <span className="whitespace-nowrap">Play Music</span>
            </>
          )}
        </button>

        {/* Title Tag */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden sm:flex flex-col pr-3 pl-1 text-left cursor-pointer"
        >
          <span className="text-[11px] font-bold text-amber-200 truncate max-w-[150px]">
            {MUSIC_TITLE}
          </span>
          <span className="text-[9px] font-mono text-stone-400">
            {isPlaying ? "Playing continuously" : "Click button to play"}
          </span>
        </div>

      </div>
    </div>
  );
};
