import React from "react";
import { Instagram, ExternalLink } from "lucide-react";
import { SITE_SUBTITLE, SITE_TITLE, MUSIC_TITLE } from "../constants/assets";

interface FooterProps {
  onNavigate?: (pageId: string, href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNav = (pageId: string, href: string) => {
    if (onNavigate) {
      onNavigate(pageId, href);
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer className="relative z-40 bg-orange-500 text-white py-6 sm:py-12 px-4 sm:px-8 mt-8 sm:mt-24 shadow-2xl border-t-4 border-orange-600">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        
        {/* Left: Brand Identity & Subtitle */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-white text-lg tracking-wide drop-shadow-sm">
              {SITE_TITLE}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-700/80 border border-orange-400 text-white font-mono shadow-sm">
              Since 2015
            </span>
          </div>
          <p className="text-xs sm:text-sm text-orange-100 font-medium tracking-wide drop-shadow-sm">
            {SITE_SUBTITLE}
          </p>
          <p className="text-xs text-orange-200">
            Languages: Time • Trust • Loyalty & ...~~~:)
          </p>
        </div>

        {/* Center: Minimalist links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
          <button
            onClick={() => handleNav("red", "/index.html")}
            className="hover:underline hover:text-orange-100 transition-colors cursor-pointer"
          >
            Limegreen
          </button>
          <span className="text-orange-300">•</span>
          <button
            onClick={() => handleNav("denim", "/denim-blue.html")}
            className="hover:underline hover:text-orange-100 transition-colors cursor-pointer"
          >
            Denim Blue
          </button>
          <span className="text-orange-300">•</span>
          <button
            onClick={() => handleNav("magenta", "/magenta.html")}
            className="hover:underline hover:text-orange-100 transition-colors cursor-pointer"
          >
            Magenta (TBC 💚)
          </button>
          <span className="text-orange-300">•</span>
          <button
            onClick={() => handleNav("yellow", "/yellow-autumn.html")}
            className="hover:underline hover:text-orange-100 transition-colors cursor-pointer"
          >
            Yellow Autumn
          </button>
        </div>

        {/* Right: Chapters counter & Back to top */}
        <div className="flex items-center gap-3 text-xs">
          {/* Chapters Counter */}
          <div className="flex items-center gap-2 font-mono text-[11px] px-3 py-1.5 rounded-full bg-orange-700/90 border border-orange-400 text-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            <span>Rules: 803</span>
            <span className="text-orange-300">|</span>
            <span>Chapters : 18</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 rounded-full bg-orange-700 hover:bg-orange-800 border border-orange-400 text-white transition-all cursor-pointer font-bold shadow-sm"
          >
            ↑
          </button>
        </div>

      </div>

      {/* Follow ID & Learn More Section */}
      <div className="max-w-2xl mx-auto mt-6 pt-5 pb-3 border-t border-orange-400/60 text-center space-y-2">
        <p className="text-sm sm:text-base font-serif font-bold text-white drop-shadow">
          If you want to know more about Lime Green 💚 so,
        </p>
        <p className="text-xs sm:text-sm text-orange-100 font-medium">
          Follow this ID &amp; So on :) to be Continued
        </p>
        <div className="pt-1">
          <a
            href="https://instagram.com/_limegreen_13?exln=MWFhbHJjamo1MXJ4ZA%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 border border-white/30"
          >
            <Instagram className="w-4 h-4" />
            <span>Click Here (Instagram) : @_limegreen_13</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
        <p className="text-[11px] text-orange-200 font-mono break-all px-2">
          Click Here (Instagram) :{" "}
          <a
            href="https://instagram.com/_limegreen_13?exln=MWFhbHJjamo1MXJ4ZA%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            https://instagram.com/_limegreen_13?exln=MWFhbHJjamo1MXJ4ZA%3D%3D
          </a>
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-4 pt-3 border-t border-orange-400/40 text-center text-[11px] sm:text-xs text-orange-200">
        Theme: {MUSIC_TITLE} • © 2015–{new Date().getFullYear()} Lime Green💚🙃. All unforgotten memories and dry leaves preserved.
      </div>
    </footer>
  );
};
