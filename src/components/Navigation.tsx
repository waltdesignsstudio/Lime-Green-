import React, { useState } from "react";
import {
  LOGO_IMAGE_URL,
  LOGO_HREF,
  SITE_TITLE,
  SITE_SUBTITLE,
  MARQUEE_TEXT,
} from "../constants/assets";
import { motion } from "motion/react";

interface NavigationProps {
  currentPage: "red" | "denim" | "magenta" | "yellow";
  onNavigate?: (pageId: string, targetUrl: string) => void;
  showMarquee?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  showMarquee = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    {
      id: "red",
      label: "Red (Home)",
      href: "/index.html",
      badge: "Baby Pink",
      activeBg: "bg-gradient-to-r from-rose-600 to-red-700 text-white border-rose-400 shadow-md",
      inactiveColor: "text-stone-200 hover:text-white hover:bg-white/10",
    },
    {
      id: "denim",
      label: "Denim Blue",
      href: "/denim-blue.html",
      badge: "Light Cyan",
      activeBg: "bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-blue-400 shadow-md",
      inactiveColor: "text-stone-200 hover:text-white hover:bg-white/10",
    },
    {
      id: "magenta",
      label: "Magenta (TBC 💚)",
      href: "/magenta.html",
      badge: "Light Magenta",
      activeBg: "bg-gradient-to-r from-fuchsia-600 to-pink-700 text-white border-fuchsia-400 shadow-md",
      inactiveColor: "text-stone-200 hover:text-white hover:bg-white/10",
    },
    {
      id: "yellow",
      label: "Yellow Autumn",
      href: "/yellow-autumn.html",
      badge: "Light Golden",
      activeBg: "bg-gradient-to-r from-amber-600 to-yellow-700 text-white border-amber-400 shadow-md",
      inactiveColor: "text-stone-200 hover:text-white hover:bg-white/10",
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

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Header with Silver Shiny Creamy A Little Dark Background */}
      <header className="w-full bg-gradient-to-r from-[#282c35] via-[#383e4a] to-[#242730] border-b border-[#7d8799]/50 shadow-[0_4px_25px_rgba(0,0,0,0.35)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-2.5 gap-3">
            
            {/* Logo + Brand Name */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* Official New Logo with Link */}
              <a
                href={LOGO_HREF}
                target="_blank"
                rel="noreferrer"
                className="relative group shrink-0 block"
                title="Lime Green Official Emblem"
              >
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden border-2 border-[#d1d5db]/80 shadow-[0_0_15px_rgba(255,255,255,0.15)] bg-[#1e2229] group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={LOGO_IMAGE_URL}
                    alt="Whats-App-Image-2026-10-12-at-11-58-31"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>

              {/* Title & Subtitle in Creamy Silver Tones */}
              <div className="flex flex-col">
                <a
                  href="/index.html"
                  onClick={(e) => handleLinkClick(e, "red", "/index.html")}
                  className="group inline-flex items-center gap-2 cursor-pointer"
                >
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f3f4f6] group-hover:text-emerald-400 transition-colors font-serif drop-shadow-sm">
                    {SITE_TITLE}
                  </h1>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider rounded bg-[#4b5563]/60 border border-[#9ca3af]/50 text-emerald-300 shadow-inner">
                    Since 2015
                  </span>
                </a>

                <p className="text-xs sm:text-sm text-[#e2e8f0] tracking-wide font-normal flex items-center gap-1 select-none drop-shadow-sm">
                  <span>{SITE_SUBTITLE}</span>
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links (Play button removed as requested) */}
            <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3">
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

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden px-2.5 py-1.5 rounded-lg bg-[#374151] border border-[#6b7280] text-xs font-medium text-stone-100 cursor-pointer"
              >
                {mobileMenuOpen ? "✕" : "Pages 🧭"}
              </button>
            </div>

            {/* Mobile Menu Drawer */}
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="md:hidden flex flex-col gap-2 pt-2 pb-1 border-t border-[#4b5563]"
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
                        : "border-[#4b5563] bg-[#1f2937] text-stone-200"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-stone-300">
                      {link.badge}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}

          </div>
        </div>
      </header>

      {/* Marquee from Right to Left: Below Header and Above Hero as requested */}
      {showMarquee && (
        <div className="w-full bg-[#181a20] border-b border-[#3e4452] overflow-hidden py-1.5 text-xs font-medium text-amber-200 relative flex items-center select-none shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#181a20] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#181a20] to-transparent z-10 pointer-events-none" />
          
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="mx-6 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✨</span>
              <span>{MARQUEE_TEXT}</span>
              <span className="text-rose-400 font-bold mx-3">•</span>
              <span className="text-stone-300 font-mono text-[11px]">Since 2015</span>
              <span className="text-amber-400 font-bold mx-3">•</span>
              <span className="text-sky-300 font-mono text-[11px]">A Deep Fall near Indus</span>
            </span>
            <span className="mx-6 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✨</span>
              <span>{MARQUEE_TEXT}</span>
              <span className="text-rose-400 font-bold mx-3">•</span>
              <span className="text-stone-300 font-mono text-[11px]">Since 2015</span>
              <span className="text-amber-400 font-bold mx-3">•</span>
              <span className="text-sky-300 font-mono text-[11px]">A Deep Fall near Indus</span>
            </span>
            <span className="mx-6 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✨</span>
              <span>{MARQUEE_TEXT}</span>
              <span className="text-rose-400 font-bold mx-3">•</span>
              <span className="text-stone-300 font-mono text-[11px]">Since 2015</span>
              <span className="text-amber-400 font-bold mx-3">•</span>
              <span className="text-sky-300 font-mono text-[11px]">A Deep Fall near Indus</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
