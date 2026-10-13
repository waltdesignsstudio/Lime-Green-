import React, { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { AutumnLeavesFrame } from "../components/AutumnLeavesFrame";
import { PageTransitionLoader } from "../components/PageTransitionLoader";
import { FixedMusicControl } from "../components/FixedMusicControl";
import { CHARACTERS_DATA, LANGUAGES_OF_LIME_GREEN } from "../data/mockData";
import { LOGO_IMAGE_URL, LOGO_HREF, SITE_SUBTITLE } from "../constants/assets";
import { DenimAffinityForm } from "../components/DenimAffinityForm";

interface DenimBlueProps {
  onNavigatePage?: (pageId: string, href: string) => void;
}

export const DenimBlue: React.FC<DenimBlueProps> = ({ onNavigatePage }) => {
  const [loadingTransition, setLoadingTransition] = useState(false);

  const handleNavigate = (pageId: string, href: string) => {
    setLoadingTransition(true);
    setTimeout(() => {
      if (onNavigatePage) {
        onNavigatePage(pageId, href);
      } else {
        window.location.href = href;
      }
    }, 550);
  };

  return (
    // Denim Blue page bg: Light Cyan as requested, full mobile coverage with zero lag
    <div className="relative min-h-screen w-full bg-[#cffafe] text-[#0f2942] overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Page Transition overlay */}
      <PageTransitionLoader isLoading={loadingTransition} />

      {/* Single Fixed Play/Pause music button */}
      <FixedMusicControl />

      {/* Zero-lag hardware accelerated Autumn Leaves */}
      <AutumnLeavesFrame fillSides={true} intensity="normal" />

      {/* Global Navigation */}
      <Navigation
        currentPage="denim"
        onNavigate={(pageId, href) => handleNavigate(pageId, href)}
      />

      {/* MAIN CONTAINER with full screen coverage on mobile */}
      <main className="relative z-20 w-full max-w-7xl mx-auto px-2 sm:px-6 md:px-12 lg:px-20 space-y-4 sm:space-y-12 md:space-y-16 pt-2 sm:pt-6 pb-24 sm:pb-16">

        {/* HERO / INTRO */}
        <section className="relative text-center max-w-4xl mx-auto space-y-2.5 sm:space-y-4 pt-1 sm:pt-3 px-1">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900 text-sky-100 text-[10px] sm:text-xs font-mono font-bold shadow-sm border border-blue-700">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Denim Blue Domain</span>
            <span className="text-blue-300">•</span>
            <span className="text-emerald-300">Truth & Resonance</span>
          </div>

          {/* Central Logo Emblem Showcase */}
          <div className="flex justify-center my-1.5 sm:my-3">
            <a
              href={LOGO_HREF}
              target="_blank"
              rel="noreferrer"
              className="relative group cursor-pointer block"
              title="Lime Green Official Emblem"
            >
              <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-[#d1d5db] via-blue-200 to-amber-300 border-2 sm:border-3 border-blue-400 shadow-lg group-hover:scale-105 transition-transform duration-200">
                <img
                  src={LOGO_IMAGE_URL}
                  alt="Lime Green Emblem"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                />
              </div>
              <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-stone-900 border border-emerald-400 text-[9px] sm:text-[10px] text-emerald-300 font-mono shadow font-bold">
                Emblem
              </span>
            </a>
          </div>

          <h1 className="text-xl sm:text-4xl md:text-5xl font-serif font-black text-[#0c2e4e] drop-shadow-sm break-words px-1">
            User Profile & The 62% Affinity
          </h1>

          <p className="text-[11px] sm:text-sm text-[#1b4368] max-w-2xl mx-auto font-medium leading-relaxed px-1">
            {SITE_SUBTITLE}
          </p>

          {/* Benchmark Callout */}
          <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white/90 border-2 border-blue-400 text-blue-950 text-xs sm:text-base font-serif italic shadow-sm max-w-3xl mx-auto font-bold break-words">
            “To be honest, Peoples have ability to become a Chapter of Lime Green 💚 with of 62%...”
          </div>
        </section>

        {/* SECTION 1: QUESTION ANSWER AFFINITY FORM (Replaced Calculator) */}
        <DenimAffinityForm />

        {/* SECTION 2: THE LANGUAGES OF LIME GREEN */}
        <section className="w-full space-y-3.5 sm:space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1 px-1">
            <span className="text-[10px] sm:text-xs font-mono text-blue-900 uppercase font-bold tracking-wider">
              Sacred Vocabulary
            </span>
            <h2 className="text-lg sm:text-2xl font-serif font-black text-[#0c2e4e]">
              “In Lime Green 💚, the Languages are : Time, Trust, Loyalty & ...~~~:)”
            </h2>
            <p className="text-[11px] sm:text-xs text-stone-700 font-medium">
              These four tongues require no audible speech. They are proven across the turning of autumn leaves.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {LANGUAGES_OF_LIME_GREEN.map((lang, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-5 rounded-xl bg-white border-2 border-blue-200 hover:border-blue-400 shadow-sm transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold border border-blue-300">
                      {lang.badge}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-serif font-black text-blue-950 mb-1">
                    {lang.title}
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    {lang.description}
                  </p>
                </div>
                <div className="mt-2.5 pt-1.5 border-t border-blue-100 text-[10px] text-blue-800 font-mono font-semibold">
                  “{lang.quote}”
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: THE 18 CHAPTERS ROSTER */}
        <section className="w-full space-y-3.5 sm:space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1 px-1">
            <span className="text-[10px] sm:text-xs font-mono text-blue-900 uppercase font-bold tracking-wider">
              Current Roster
            </span>
            <h2 className="text-lg sm:text-2xl font-serif font-black text-[#0c2e4e]">
              Still Current of 18 Chapters (Some Founded & Some Lost :)
            </h2>
            <p className="text-[11px] sm:text-xs text-stone-700 font-medium">
              Every Chapter holds a unique Status and Nature within Lime Green. Explore their profiles below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {CHARACTERS_DATA.map((ch) => (
              <div
                key={ch.id}
                className="p-3.5 sm:p-5 rounded-xl bg-white border-2 border-blue-200 hover:border-blue-400 shadow-sm transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl">{ch.symbol}</span>
                      <span className="text-[10px] font-mono text-stone-500 font-bold">{ch.code}</span>
                    </div>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        ch.status === "Founded"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : ch.status === "Active Guardian"
                          ? "bg-blue-100 text-blue-900 border border-blue-300"
                          : "bg-rose-100 text-rose-900 border border-rose-300"
                      }`}
                    >
                      {ch.status}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-serif font-bold text-stone-900 mb-0.5">
                    {ch.name}
                  </h4>
                  <div className="text-[11px] sm:text-xs text-blue-800 font-medium italic mb-1.5">
                    Nature: “{ch.nature}”
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    {ch.notes}
                  </p>
                </div>

                <div className="mt-2.5 pt-1.5 border-t border-blue-100 flex items-center justify-between text-[10px] font-mono text-stone-600">
                  <span>Affinity: {ch.affinity}%</span>
                  <span className="text-emerald-700 font-bold">Bond Established</span>
                </div>
              </div>
            ))}
          </div>

        </section>

      </main>

      {/* MINIMALIST ORANGE FOOTER */}
      <Footer onNavigate={(pageId, href) => handleNavigate(pageId, href)} />
    </div>
  );
};
