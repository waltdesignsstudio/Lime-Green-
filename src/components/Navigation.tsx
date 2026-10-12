import React, { useState } from "react";
import {
  LOGO_IMAGE_URL,
  LOGO_HREF,
  SITE_TITLE,
  SITE_SUBTITLE,
  MARQUEE_TEXT,
} from "../constants/assets";

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

  React.useEffect(() => {
    const handleOpenMenu = () => setMobileMenuOpen(true);
    window.addEventListener("open-pages-menu", handleOpenMenu);
    return () => window.removeEventListener("open-pages-menu", handleOpenMenu);
  }, []);

  const links = [
    {
      id: "red",
      label: "Limegreen",
      href: "/index.html",
      activeBg: "bg-rose-700 text-white border-rose-500 shadow-sm",
      inactiveColor: "text-stone-300 hover:text-white hover:bg-white/10",
    },
    {
      id: "denim",
      label: "Denim Blue",
      href: "/denim-blue.html",
      activeBg: "bg-blue-700 text-white border-blue-500 shadow-sm",
      inactiveColor: "text-stone-300 hover:text-white hover:bg-white/10",
    },
    {
      id: "magenta",
      label: "Magenta (TBC 💚)",
      href: "/magenta.html",
      activeBg: "bg-fuchsia-700 text-white border-fuchsia-500 shadow-sm",
      inactiveColor: "text-stone-300 hover:text-white hover:bg-white/10",
    },
    {
      id: "yellow",
      label: "Yellow Autumn",
      href: "/yellow-autumn.html",
      activeBg: "bg-amber-700 text-white border-amber-500 shadow-sm",
      inactiveColor: "text-stone-300 hover:text-white hover:bg-white/10",
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
    <div className="sticky top-0 z-50 w-full max-w-full">
      {/* Header with Silver Shiny Creamy A Little Dark Background */}
      <header className="w-full bg-gradient-to-r from-[#242830] via-[#333a46] to-[#20242c] border-b border-[#606a7c]/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          
          {/* Main Bar: Single Row on mobile & desktop for zero overlap */}
          <div className="flex items-center justify-between py-2 sm:py-2.5 gap-2">
            
            {/* Logo + Brand Name */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              
              {/* Official New Logo with Link */}
              <a
                href={LOGO_HREF}
                target="_blank"
                rel="noreferrer"
                className="relative group shrink-0 block"
                title="Lime Green Official Emblem"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 border-[#d1d5db]/80 shadow-[0_0_12px_rgba(255,255,255,0.12)] bg-[#1e2229] group-hover:scale-105 transition-transform duration-200">
                  <img
                    src={LOGO_IMAGE_URL}
                    alt="Whats-App-Image-2026-10-12-at-11-58-31"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>

              {/* Title & Subtitle in Creamy Silver Tones */}
              <div className="flex flex-col min-w-0">
                <a
                  href="/index.html"
                  onClick={(e) => handleLinkClick(e, "red", "/index.html")}
                  className="group inline-flex items-center gap-2 cursor-pointer"
                >
                  <h1 className="text-base sm:text-2xl font-bold tracking-tight text-[#f3f4f6] group-hover:text-emerald-400 transition-colors font-serif drop-shadow-sm truncate">
                    {SITE_TITLE}
                  </h1>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider rounded bg-[#4b5563]/60 border border-[#9ca3af]/50 text-emerald-300">
                    Since 2015
                  </span>
                </a>

                <p className="text-[10px] sm:text-xs text-[#e2e8f0] tracking-wide font-normal truncate select-none drop-shadow-sm max-w-[200px] sm:max-w-md">
                  {SITE_SUBTITLE}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 shrink-0">
              {links.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={(e) => handleLinkClick(e, link.id, link.href)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 border cursor-pointer ${
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

            {/* Mobile Menu Toggle Button: Highlighted, vibrating pop-up animation */}
            <div className="flex items-center md:hidden shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`relative px-3 py-1.5 rounded-xl font-bold text-xs tracking-wide cursor-pointer transition-all active:scale-95 flex items-center gap-1.5 shadow-md ${
                  mobileMenuOpen
                    ? "bg-[#374151] border border-stone-400 text-stone-100"
                    : "bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-500 text-stone-950 border-2 border-emerald-200 animate-vibrate-pop shadow-[0_0_15px_rgba(52,211,153,0.7)]"
                }`}
                aria-label="Toggle navigation menu"
              >
                {!mobileMenuOpen && (
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-900 animate-ping shrink-0" />
                )}
                <span>{mobileMenuOpen ? "✕ Close" : "Pages 🧭"}</span>
              </button>
            </div>

          </div>

          {/* Mobile Drawer (Smooth expand without overlapping) */}
          {mobileMenuOpen && (
            <div className="md:hidden flex flex-col gap-1 pt-2 pb-2.5 border-t border-[#4b5563] animate-fadeIn">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleLinkClick(e, link.id, link.href);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold border flex items-center justify-between cursor-pointer ${
                    currentPage === link.id
                      ? link.activeBg
                      : "border-[#4b5563] bg-[#1a1f28] text-stone-200"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.id === "red" && "🌸"}
                    {link.id === "denim" && "👖"}
                    {link.id === "magenta" && "🟣"}
                    {link.id === "yellow" && "🍂"}
                    {link.label}
                  </span>
                  {currentPage === link.id && <span className="text-emerald-400">● Current</span>}
                </button>
              ))}
            </div>
          )}

        </div>
      </header>

      {/* Marquee from Right to Left: Hardware-accelerated with translate3d */}
      {showMarquee && (
        <div className="w-full max-w-full bg-[#14171d] border-b border-[#323846] overflow-hidden py-1.5 text-[11px] sm:text-xs font-medium text-amber-200 relative flex items-center select-none shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#14171d] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#14171d] to-transparent z-10 pointer-events-none" />
          
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="mx-4 sm:mx-6 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✨</span>
              <span>{MARQUEE_TEXT}</span>
              <span className="text-rose-400 font-bold mx-2 sm:mx-3">•</span>
              <span className="text-stone-300 font-mono text-[10px] sm:text-[11px]">Since 2015</span>
              <span className="text-amber-400 font-bold mx-2 sm:mx-3">•</span>
              <span className="text-sky-300 font-mono text-[10px] sm:text-[11px]">A Deep Fall near Indus</span>
            </span>
            <span className="mx-4 sm:mx-6 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✨</span>
              <span>{MARQUEE_TEXT}</span>
              <span className="text-rose-400 font-bold mx-2 sm:mx-3">•</span>
              <span className="text-stone-300 font-mono text-[10px] sm:text-[11px]">Since 2015</span>
              <span className="text-amber-400 font-bold mx-2 sm:mx-3">•</span>
              <span className="text-sky-300 font-mono text-[10px] sm:text-[11px]">A Deep Fall near Indus</span>
            </span>
            <span className="mx-4 sm:mx-6 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✨</span>
              <span>{MARQUEE_TEXT}</span>
              <span className="text-rose-400 font-bold mx-2 sm:mx-3">•</span>
              <span className="text-stone-300 font-mono text-[10px] sm:text-[11px]">Since 2015</span>
              <span className="text-amber-400 font-bold mx-2 sm:mx-3">•</span>
              <span className="text-sky-300 font-mono text-[10px] sm:text-[11px]">A Deep Fall near Indus</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
