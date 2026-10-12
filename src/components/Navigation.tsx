import React, { useState, useEffect } from "react";
import {
  LEAF_IMAGE_PATH,
  LOGO_IMAGE_URL,
  LOGO_HREF,
  SITE_TITLE,
  SITE_SUBTITLE,
  MUSIC_TITLE,
} from "../constants/assets";
import { motion } from "motion/react";
import { musicEngine } from "../utils/musicPlayer";

interface NavigationProps {
  currentPage: "red" | "denim" | "magenta" | "yellow";
  onNavigate?: (pageId: string, targetUrl: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    const unsub = musicEngine.subscribe((playing) => {
      setIsMusicPlaying(playing);
    });
    return unsub;
  }, []);

  const links = [
    {
      id: "red",
      label: "Red (Home)",
      href: "/index.html",
      badge: "Baby Pink",
      activeBg: "bg-rose-500 text-white border-rose-600 shadow-md",
      inactiveColor: "text-stone-800 hover:text-rose-600 hover:bg-rose-100/60",
    },
    {
      id: "denim",
      label: "Denim Blue",
      href: "/denim-blue.html",
      badge: "Light Cyan",
      activeBg: "bg-blue-600 text-white border-blue-700 shadow-md",
      inactiveColor: "text-stone-800 hover:text-blue-600 hover:bg-blue-100/60",
    },
    {
      id: "magenta",
      label: "Magenta (TBC 💚)",
      href: "/magenta.html",
      badge: "Light Magenta",
      activeBg: "bg-fuchsia-600 text-white border-fuchsia-700 shadow-md",
      inactiveColor: "text-stone-800 hover:text-fuchsia-600 hover:bg-fuchsia-100/60",
    },
    {
      id: "yellow",
      label: "Yellow Autumn",
      href: "/yellow-autumn.html",
      badge: "Light Golden",
      activeBg: "bg-amber-600 text-white border-amber-700 shadow-md",
      inactiveColor: "text-stone-800 hover:text-amber-700 hover:bg-amber-100/60",
    },
  ];

  const handleLinkClick = (e: React.MouseEvent, pageId: string, href: string) => {
    e.preventDefault();
    if (currentPage === pageId) return;
    if (onNavigate) {
      onNavigate(pageId, href);
    } else {
      window.location.href = href;
    }
  };

  const handleToggleMusic = () => {
    musicEngine.toggle();
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/85 border-b border-stone-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-2.5 gap-3">
          
          {/* Logo Replacement + Dry Yellow Leaf + Brand Name */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* User Requested Logo with exact href and image link */}
            <a
              href={LOGO_HREF}
              target="_blank"
              rel="noreferrer"
              className="relative group shrink-0 block"
              title="Lime Green Official Emblem"
            >
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden border-2 border-emerald-500/60 shadow-md bg-white group-hover:scale-105 transition-transform duration-300">
                <img
                  src={LOGO_IMAGE_URL}
                  alt="Whats-App-Image-2026-10-12-at-11-58-31"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </a>

            {/* Dry Yellow Autumn Leaf */}
            <div className="relative group shrink-0 hidden sm:block">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400/80 shadow-sm bg-amber-50 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={LEAF_IMAGE_PATH}
                  alt="Yellow autumn Dry single Leaf"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 text-xs select-none">🍂</span>
            </div>

            {/* Title & Subtitle */}
            <div className="flex flex-col">
              <a
                href="/index.html"
                onClick={(e) => handleLinkClick(e, "red", "/index.html")}
                className="group inline-flex items-center gap-2 cursor-pointer"
              >
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-emerald-700 transition-colors font-serif">
                  {SITE_TITLE}
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider rounded bg-emerald-100 border border-emerald-400 text-emerald-800">
                  Since 2015
                </span>
              </a>

              {/* Exact subtitle requested */}
              <p className="text-xs sm:text-sm text-stone-700 tracking-wide font-medium flex items-center gap-1 select-none">
                <span>{SITE_SUBTITLE}</span>
              </p>
            </div>
          </div>

          {/* Controls: Nav tabs + Mohabbatein continuous music On/Off */}
          <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3">
            
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5">
              {links.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={(e) => handleLinkClick(e, link.id, link.href)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                      isActive
                        ? link.activeBg
                        : `border-transparent ${link.inactiveColor}`
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {link.id === "red" && "🌸"}
                      {link.id === "denim" && "👖"}
                      {link.id === "magenta" && "🟣"}
                      {link.id === "yellow" && "🍂"}
                      {link.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Continuous Mohabbatein Music Theme On / Off Button */}
            <button
              onClick={handleToggleMusic}
              className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm ${
                isMusicPlaying
                  ? "bg-emerald-600 text-white border-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-300"
              }`}
              title="Toggle continuous Mohabbatein love themes instrumental"
            >
              {isMusicPlaying ? (
                <>
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-1 bg-white rounded-full animate-bounce h-3" />
                    <span className="w-1 bg-white rounded-full animate-bounce h-2 delay-100" />
                    <span className="w-1 bg-white rounded-full animate-bounce h-3.5 delay-200" />
                  </span>
                  <span className="font-mono text-[11px] whitespace-nowrap">Music: ON 🎻</span>
                </>
              ) : (
                <>
                  <span>🔇</span>
                  <span className="font-mono text-[11px] whitespace-nowrap">Music: OFF</span>
                </>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden px-2.5 py-1.5 rounded-lg bg-stone-100 border border-stone-300 text-xs font-medium text-stone-800 cursor-pointer"
            >
              {mobileMenuOpen ? "✕" : "Pages 🧭"}
            </button>
          </div>

          {/* Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="md:hidden flex flex-col gap-2 pt-2 pb-1 border-t border-stone-200"
            >
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleLinkClick(e, link.id, link.href);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-between cursor-pointer ${
                    currentPage === link.id
                      ? link.activeBg
                      : "border-stone-200 bg-white text-stone-800"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                    {link.badge}
                  </span>
                </button>
              ))}
            </motion.div>
          )}

        </div>
      </div>

      {/* Ticker subtitle indicating continuous Mohabbatein music status */}
      <div className="bg-stone-900 text-stone-200 px-4 py-0.5 text-[11px] font-mono flex items-center justify-between">
        <span className="truncate">
          ♫ Now Playing: <strong>{MUSIC_TITLE}</strong> (Continuous Instrumental)
        </span>
        <button
          onClick={handleToggleMusic}
          className="underline hover:text-emerald-400 cursor-pointer text-[10px] shrink-0 ml-2"
        >
          {isMusicPlaying ? "Pause ⏸" : "Play ▶"}
        </button>
      </div>
    </header>
  );
};
