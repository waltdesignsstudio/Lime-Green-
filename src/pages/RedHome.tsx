import React, { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { AutumnLeavesFrame } from "../components/AutumnLeavesFrame";
import { PageTransitionLoader } from "../components/PageTransitionLoader";
import { FixedMusicControl } from "../components/FixedMusicControl";
import { MILESTONES, RULES_DATA, CHARACTERS_DATA } from "../data/mockData";
import {
  LOGO_IMAGE_URL,
  LOGO_HREF,
  AUTUMN_TREES_BG,
  SITE_SUBTITLE,
} from "../constants/assets";

interface RedHomeProps {
  onNavigatePage?: (pageId: string, href: string) => void;
}

export const RedHome: React.FC<RedHomeProps> = ({ onNavigatePage }) => {
  const [loadingTransition, setLoadingTransition] = useState(false);
  const [selectedRuleCategory, setSelectedRuleCategory] = useState<"all" | "public" | "authorised" | "private">("all");
  const [activeMilestoneYear, setActiveMilestoneYear] = useState<number | null>(2015);
  const [showHeroPagesModal, setShowHeroPagesModal] = useState(false);

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

  const filteredRules = selectedRuleCategory === "all"
    ? RULES_DATA
    : RULES_DATA.filter((r) => r.category === selectedRuleCategory);

  return (
    // Red page: Baby Pink background, covers full screen smoothly with zero lag
    <div className="relative min-h-screen w-full bg-[#ffe4e6] text-[#2d0a15] overflow-x-hidden selection:bg-rose-500 selection:text-white">
      {/* Page Transition overlay */}
      <PageTransitionLoader isLoading={loadingTransition} />

      {/* Single Fixed Play/Pause music button */}
      <FixedMusicControl />

      {/* Zero-lag hardware accelerated Autumn Leaves */}
      <AutumnLeavesFrame fillSides={true} intensity="normal" />

      {/* Header & Marquee */}
      <Navigation
        currentPage="red"
        onNavigate={(pageId, href) => handleNavigate(pageId, href)}
        showMarquee={true}
      />

      {/* MAIN CONTAINER: Covers full screen on mobile, zero overlap, smooth 60fps scrolling */}
      <main className="relative z-20 w-full max-w-7xl mx-auto px-2 sm:px-6 md:px-12 lg:px-20 space-y-4 sm:space-y-12 md:space-y-16 pt-2 sm:pt-6 pb-24 sm:pb-16">

        {/* HERO SECTION: Full width coverage, clean responsive hierarchy */}
        <section className="relative w-full flex flex-col justify-center items-center text-center py-5 sm:py-12 md:py-16 px-2.5 sm:px-6 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-rose-200/90 bg-white/60 backdrop-blur-[2px]">
          
          {/* Transparent Autumn Trees Background */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src={AUTUMN_TREES_BG}
              alt="Autumn Trees Backdrop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-25 mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#ffe4e6]/30 via-transparent to-[#ffe4e6]/80" />
          </div>

          {/* Central Hero Content */}
          <div className="relative z-10 w-full max-w-4xl mx-auto space-y-3 sm:space-y-5">
            
            {/* Since 2015 Badge: wraps neatly on narrow mobile */}
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-rose-900 text-rose-50 text-[11px] sm:text-xs font-mono shadow-md border border-rose-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="font-bold">Since : 2015</span>
              <span className="text-rose-300">•</span>
              <span className="text-amber-300 font-sans font-semibold">11+ Years of Preserved Moments</span>
            </div>

            {/* Central Hero Logo */}
            <div className="flex justify-center my-1.5 sm:my-3">
              <a
                href={LOGO_HREF}
                target="_blank"
                rel="noreferrer"
                className="relative group cursor-pointer block"
                title="Lime Green Official Emblem"
              >
                <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-[#d1d5db] via-rose-200 to-amber-300 border-2 sm:border-3 border-[#9ca3af] shadow-lg group-hover:scale-105 transition-transform duration-200">
                  <img
                    src={LOGO_IMAGE_URL}
                    alt="Whats-App-Image-2026-10-12-at-11-58-31"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                  />
                </div>
                <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-stone-900 border border-emerald-400 text-[9px] sm:text-[10px] text-emerald-300 font-mono shadow font-bold">
                  Emblem
                </span>
              </a>
            </div>

            {/* Hero Heading: animated text appearance */}
            <h1 className="text-xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-[#4a041f] drop-shadow-sm leading-snug break-words px-1 animate-fadeIn">
              “Some stories stay incomplete 🙃 ~”
            </h1>

            {/* Requested Hero Title */}
            <div className="w-full max-w-3xl mx-auto p-3 sm:p-4.5 rounded-xl sm:rounded-2xl bg-white/95 border-2 border-emerald-500/90 shadow-md">
              <h2 className="text-xs sm:text-base md:text-lg font-serif font-black text-[#4a041f] leading-relaxed tracking-wide">
                Lime Green 💚 is Group of Several Memories and Emotional Attachment & promises between its characters (18) which are done earlier & So on :) To be Continued :)
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-base md:text-lg text-[#6b1430] max-w-2xl mx-auto font-medium leading-relaxed tracking-wide px-1 break-words">
              {SITE_SUBTITLE}
            </p>

            {/* UPCOMING INCIDENT: The Left & the Indus */}
            <div className="w-full max-w-xl mx-auto p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-stone-900 via-[#1e2430] to-stone-900 border-2 border-amber-400/80 text-white shadow-xl space-y-2 text-center">
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-amber-300">
                  Upcoming Incident
                </span>
                <span className="text-stone-400">•</span>
                <span className="text-[10px] sm:text-xs font-mono text-emerald-300 font-bold">
                  Classified Event
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-sky-200">
                The Left &amp; the Indus
              </h3>
              <div className="flex items-center justify-center gap-2.5 pt-1">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/50 text-xs font-mono font-bold">
                  Released 14%
                </span>
                <button
                  onClick={() => handleNavigate("yellow", "/yellow-autumn.html#the-left-and-the-indus")}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 text-stone-950 font-black text-xs font-mono cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  click here
                </button>
              </div>
            </div>

            {/* CTA Buttons: Full width on mobile with prominent vibrating Pages button */}
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full">
              {/* Highlighted & Vibrating Pop-up Pages Button */}
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-pages-menu"));
                  setShowHeroPagesModal(true);
                }}
                className="w-full sm:w-auto px-5 py-2.5 sm:px-7 sm:py-3 rounded-full bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-500 text-stone-950 font-black text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(52,211,153,0.75)] active:scale-95 transition-all cursor-pointer border-2 border-emerald-200 animate-vibrate-pop flex items-center justify-center gap-2"
                aria-label="Open Pages menu"
              >
                <span className="w-2 h-2 rounded-full bg-stone-900 animate-ping shrink-0" />
                <span>Pages 🧭</span>
                <span className="px-2 py-0.5 rounded-full bg-stone-900 text-emerald-300 text-[10px] font-mono font-bold shadow-sm">
                  Explore All
                </span>
              </button>

              <button
                onClick={() => handleNavigate("denim", "/denim-blue.html")}
                className="w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg active:scale-95 transition-all cursor-pointer border-2 border-blue-400 flex items-center justify-center gap-2"
              >
                <span>discover my past</span>
                <span className="text-sm sm:text-base">→</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[9px] font-black font-mono tracking-wider shadow">
                  Denim Blue
                </span>
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="pt-1 text-rose-800 font-semibold text-[10px] sm:text-xs flex flex-col items-center gap-0.5 select-none">
              <span>Scroll down to explore 2015–2026 Milestones, 803 Rules & 18 Chapters</span>
              <span className="text-xs sm:text-sm animate-bounce">↓</span>
            </div>

          </div>
        </section>

        {/* SECTION 1: EMOTIVE QUOTE CARD (Card 1: Dark Magenta Background with White Text) */}
        <section className="w-full">
          <div className="w-full p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#4a041f] border-2 border-rose-400/60 shadow-xl text-center max-w-4xl mx-auto space-y-2.5 sm:space-y-4 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-white text-[10px] sm:text-xs font-mono font-bold shadow-sm">
              <span>The Attachment Paradox</span>
              <span>•</span>
              <span>Loyalty Query</span>
            </div>

            <blockquote className="text-sm sm:text-xl md:text-2xl font-serif text-white font-bold leading-relaxed italic break-words px-1 drop-shadow">
              “Some Loves,friendships,attachment & attractions never forgotablle until they stay...Is this called Loyalty or not 🙃 ???”
            </blockquote>

            <div className="flex items-center justify-center gap-2.5 text-lg sm:text-2xl select-none">
              <span title="Rose 🌹">🌹</span>
              <span title="Emotionless 😐">😐</span>
              <span title="Emotionless 😶">😶</span>
              <span title="Upside down 🙃">🙃</span>
            </div>
            
            <p className="text-[11px] sm:text-xs text-rose-100 max-w-lg mx-auto font-medium leading-relaxed">
              Do we hold onto the person, or the version of ourselves that existed when they were still here?
            </p>
          </div>
        </section>

        {/* SECTION 2: LORE & ESSENCE OF LIME GREEN (Card 2: Grassy Green, Card 3: Golden bg) */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 items-stretch">
          
          {/* Card 2: Grassy Green Background */}
          <div className="w-full p-4 sm:p-6 rounded-2xl bg-[#2e7d32] border-2 border-lime-300/80 shadow-xl flex flex-col justify-between text-white">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg sm:text-xl">💚🍵</span>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-white px-2.5 py-0.5 rounded-full bg-black/25 border border-lime-200/50 shadow-sm">
                  Core Essence
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-serif text-lime-100 font-bold mb-1.5 leading-snug drop-shadow-sm">
                The Circle Beyond Individuals
              </h3>
              <p className="text-white text-xs sm:text-sm leading-relaxed font-medium">
                “Lime Green 💚, is not based on a single person but a collection of cherished moments shared with a group of friends or else???”
              </p>
            </div>

            <div className="mt-4 pt-2.5 border-t border-white/25 text-[11px] text-lime-100 font-semibold flex items-center justify-between">
              <span>Origin: Autumn 2015</span>
              <span className="text-white font-mono font-bold bg-black/20 px-2 py-0.5 rounded">Bound by Memory</span>
            </div>
          </div>

          {/* Card 3: Golden Background */}
          <div className="w-full p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-[#f5c531] via-[#e5b326] to-[#d4a017] border-2 border-amber-200 shadow-xl flex flex-col justify-between text-[#2d1804]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg sm:text-xl">📜🔏</span>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-950 px-2.5 py-0.5 rounded-full bg-white/40 border border-amber-900/30 shadow-sm">
                  The Archive
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-serif text-[#2a1400] font-black mb-1.5 leading-snug">
                Rules & The 18 Chapters
              </h3>
              <p className="text-[#381c03] text-xs sm:text-sm leading-relaxed font-bold">
                “Lime Green 💚 contains of total 803 rules, while some are private,some are authorised & some are Public...Still Current of 18 Chapters..(some founded & some lost :)”
              </p>
            </div>

            <div className="mt-4 pt-2.5 border-t border-[#7a4805]/25 text-[11px] text-[#422204] font-bold flex items-center justify-between">
              <span>Categories: Public • Auth • Private</span>
              <span className="text-stone-900 font-mono font-black bg-white/40 px-2 py-0.5 rounded">Current 18 Chapters</span>
            </div>
          </div>

        </section>

        {/* SECTION 3: LIVE STATS COUNTER BAR */}
        <section className="w-full">
          <div className="w-full p-3.5 sm:p-6 rounded-2xl bg-white/90 border-2 border-rose-300 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-center">
              
              <div className="p-3 sm:p-4 rounded-xl bg-rose-50 border border-rose-200 flex flex-col items-center justify-center">
                <span className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-rose-800 font-bold flex items-center gap-1 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Status
                </span>
                <span className="text-2xl sm:text-3xl font-serif font-black text-rose-900">
                  Live
                </span>
                <span className="text-[10px] text-stone-600 font-medium mt-0.5">Real-time Memory Stream</span>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center">
                <span className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-amber-900 font-bold mb-0.5">
                  Total Tenets
                </span>
                <span className="text-2xl sm:text-3xl font-serif font-black text-amber-900">
                  Rules : 803
                </span>
                <span className="text-[10px] text-stone-600 font-medium mt-0.5">Public, Authorised & Private</span>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col items-center justify-center">
                <span className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-blue-900 font-bold mb-0.5">
                  Living Roster
                </span>
                <span className="text-2xl sm:text-3xl font-serif font-black text-blue-900">
                  Chapters : 18
                </span>
                <span className="text-[10px] text-stone-600 font-medium mt-0.5">Some founded & some lost :)</span>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: CONSECUTIVE YEAR MILESTONE TIMELINE - PEACH BACKGROUND SECTION ONLY */}
        <section className="w-full p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#ffe5b4] border-2 sm:border-3 border-[#fbb88e] shadow-md space-y-4 sm:space-y-6 relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto space-y-1.5 px-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8c2d19] text-amber-50 text-[10px] sm:text-xs font-mono font-bold shadow-sm">
              <span>Chronological Chronicles</span>
              <span>•</span>
              <span>2015 → 2026</span>
            </div>
            <h2 className="text-lg sm:text-3xl font-serif font-black text-[#5c1d10]">
              Consecutive Key Milestones
            </h2>
            <p className="text-[11px] sm:text-xs text-[#7c2d12] font-semibold">
              Every single year wrote an indelible line in Lime Green 💚. Tap any year to explore its memories.
            </p>
          </div>

          {/* Year selector tabs */}
          <div className="w-full flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar px-1">
            {MILESTONES.map((m) => {
              const isSelected = activeMilestoneYear === m.year;
              return (
                <button
                  key={m.year}
                  onClick={() => setActiveMilestoneYear(m.year)}
                  className={`px-2.5 py-1 sm:px-3.5 sm:py-1 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-colors cursor-pointer shadow-sm ${
                    isSelected
                      ? "bg-[#c2410c] text-white border border-[#9a3412]"
                      : "bg-white/95 text-stone-800 hover:bg-[#ffedd5] border border-[#fdba74]"
                  }`}
                >
                  {m.year}
                </button>
              );
            })}
          </div>

          {/* Timeline Track: Clean responsive margins, zero dot cutoffs */}
          <div className="relative border-l-2 border-[#ea580c] ml-3 sm:ml-8 pl-3.5 sm:pl-7 space-y-3 sm:space-y-4">
            {MILESTONES.map((milestone) => {
              const isActive = activeMilestoneYear === milestone.year;
              return (
                <div
                  key={milestone.year}
                  onClick={() => setActiveMilestoneYear(milestone.year)}
                  className={`relative p-3.5 sm:p-5 rounded-xl transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-white border-2 border-[#ea580c] shadow-md ring-2 ring-[#fdba74]"
                      : "bg-white/90 border border-[#fed7aa] hover:border-[#fb923c] hover:bg-white"
                  }`}
                >
                  {/* Timeline dot cleanly centered on border-l line */}
                  <div
                    className={`absolute -left-[21px] sm:-left-[35px] top-4 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all ${
                      isActive
                        ? "bg-[#ea580c] border-white shadow-sm scale-110"
                        : "bg-[#fed7aa] border-[#ea580c]"
                    }`}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-2xl font-serif font-black text-[#9a3412]">
                        {milestone.year}
                      </span>
                      <span className="text-[9px] sm:text-xs font-mono px-2 py-0.5 rounded-full bg-[#ffedd5] border border-[#fdba74] text-[#9a3412] font-bold">
                        {milestone.highlightTag}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-[#7c2d12] font-mono font-bold">
                      {milestone.emotion}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-serif text-[#431407] font-bold mb-0.5">
                    {milestone.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-600 italic font-medium mb-1">
                    “{milestone.subtitle}”
                  </p>

                  <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                    {milestone.description}
                  </p>

                  {milestone.archivedRuleRef && (
                    <div className="mt-2 pt-1.5 border-t border-[#fed7aa] flex items-center justify-between text-[10px] sm:text-xs text-stone-700 font-semibold">
                      <span>Associated Code:</span>
                      <span className="font-mono text-emerald-800 font-bold">
                        {milestone.archivedRuleRef === 1
                          ? "Magenta v1"
                          : milestone.archivedRuleRef === 240
                          ? "Magenta V2"
                          : milestone.archivedRuleRef === 512
                          ? "Magenta v3"
                          : `Rule #${milestone.archivedRuleRef}`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: THE 803 RULES PREVIEW VAULT */}
        <section className="w-full space-y-3.5 sm:space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[10px] sm:text-xs font-mono text-amber-900 uppercase font-bold tracking-wider">
                Vault of 803 Rules
              </span>
              <h2 className="text-lg sm:text-2xl font-serif font-black text-[#3a0518]">
                Public, Authorised & Private Tenets
              </h2>
            </div>

            <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-rose-200 text-xs font-bold self-start sm:self-auto">
              {(["all", "public", "authorised", "private"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedRuleCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors cursor-pointer ${
                    selectedRuleCategory === cat
                      ? "bg-rose-700 text-white shadow-sm"
                      : "text-stone-700 hover:text-stone-900 hover:bg-rose-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {filteredRules.map((rule) => (
              <div
                key={rule.id}
                className="p-3.5 sm:p-5 rounded-xl bg-white border-2 border-rose-200 hover:border-rose-400 shadow-sm transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5 text-xs font-mono">
                    <span className="text-amber-900 font-bold">
                      {rule.id === 1
                        ? "Magenta v1"
                        : rule.id === 240
                        ? "Magenta V2"
                        : rule.id === 512
                        ? "Magenta v3"
                        : `Rule #${rule.id}`}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        rule.category === "public"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : rule.category === "authorised"
                          ? "bg-blue-100 text-blue-900 border border-blue-300"
                          : "bg-rose-100 text-rose-900 border border-rose-300"
                      }`}
                    >
                      {rule.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-serif font-bold text-stone-900 mb-1">
                    {rule.title}
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    {rule.text}
                  </p>
                </div>
                <div className="mt-2.5 pt-1.5 border-t border-rose-100 text-[10px] text-stone-500 font-semibold flex justify-between">
                  <span>Drafted: {rule.yearAdded}</span>
                  <span>Lime Green 💚</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: STILL CURRENT OF 18 CHAPTERS */}
        <section className="w-full space-y-3.5 sm:space-y-5">
          <div className="text-center max-w-2xl mx-auto space-y-1 px-1">
            <span className="text-[10px] sm:text-xs font-mono text-blue-900 uppercase font-bold tracking-wider">
              Still Current of 18
            </span>
            <h2 className="text-lg sm:text-2xl font-serif font-black text-[#3a0518]">
              Chapters (Some Founded & Some Lost :)
            </h2>
            <p className="text-[11px] sm:text-xs text-stone-700 font-medium">
              The eighteen core chapters of Lime Green. Whether present at the table or wandering in distance, each chapter remains preserved forever.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {CHARACTERS_DATA.slice(0, 12).map((chapter) => (
              <div
                key={chapter.id}
                className="p-2.5 sm:p-3.5 rounded-xl bg-white border border-rose-200 hover:border-blue-400 transition-colors text-center flex flex-col justify-between shadow-sm min-h-[120px]"
              >
                <div>
                  <div className="text-lg sm:text-xl mb-0.5 select-none">{chapter.symbol}</div>
                  <span className="text-[9px] font-mono text-stone-500 font-bold block">{chapter.code}</span>
                  <h5 className="text-[11px] font-serif font-bold text-stone-900 mt-0.5 line-clamp-1">
                    {chapter.name}
                  </h5>
                  <p className="text-[9px] text-stone-600 line-clamp-1 mt-0.5 font-medium">
                    {chapter.nature}
                  </p>
                </div>

                <div className="mt-1.5 pt-1 border-t border-rose-100">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-mono font-bold ${
                      chapter.status === "Founded"
                        ? "bg-emerald-100 text-emerald-900"
                        : chapter.status === "Active Guardian"
                        ? "bg-blue-100 text-blue-900"
                        : "bg-rose-100 text-rose-900"
                    }`}
                  >
                    {chapter.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-1">
            <button
              onClick={() => handleNavigate("denim", "/denim-blue.html")}
              className="text-xs font-mono font-bold text-blue-900 hover:text-blue-700 underline underline-offset-4 cursor-pointer"
            >
              Inspect all 18 Chapters & calculate your affinity on Denim Blue →
            </button>
          </div>
        </section>

        {/* BOTTOM REDIRECTION CALLOUT */}
        <section className="w-full pt-1 text-center">
          <div className="w-full max-w-2xl mx-auto p-4 sm:p-7 rounded-2xl bg-white border-2 border-rose-300 shadow-sm space-y-2.5">
            <h3 className="text-base sm:text-lg font-serif font-black text-rose-950">
              Ready to delve into your Denim Blue Profile?
            </h3>
            <p className="text-[11px] sm:text-xs text-stone-700 font-medium">
              Discover your Status, Nature, and test if your resonance crosses the 62% benchmark of Lime Green 💚.
            </p>
            <button
              onClick={() => handleNavigate("denim", "/denim-blue.html")}
              className="w-full sm:w-auto px-6 py-2 rounded-full bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow cursor-pointer transition-transform active:scale-95"
            >
              Continue to Denim Blue 👖
            </button>
          </div>
        </section>

      </main>

      {/* MINIMALIST ORANGE FOOTER */}
      <Footer onNavigate={(pageId, href) => handleNavigate(pageId, href)} />

      {/* HERO PAGES MODAL / SHEET */}
      {showHeroPagesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#1e232d] text-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-400 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#374151]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧭</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-emerald-300">
                    Explore Lime Green Pages
                  </h3>
                  <p className="text-[11px] text-stone-300">
                    Switch between active experiences
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHeroPagesModal(false)}
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center font-bold cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setShowHeroPagesModal(false);
                  handleNavigate("red", "/index.html");
                }}
                className="w-full p-3 rounded-2xl bg-rose-900/80 hover:bg-rose-800 border border-rose-500 text-left flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌸</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">Limegreen</h4>
                    <p className="text-[10px] text-rose-200">2015–2026 Key Milestones & 803 Rules</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-stone-950 font-bold text-[10px]">
                  Current
                </span>
              </button>

              <button
                onClick={() => {
                  setShowHeroPagesModal(false);
                  handleNavigate("denim", "/denim-blue.html");
                }}
                className="w-full p-3 rounded-2xl bg-blue-950/80 hover:bg-blue-900 border border-blue-500 text-left flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👖</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">Denim Blue</h4>
                    <p className="text-[10px] text-blue-200">User Profiles & Affinity Calculator</p>
                  </div>
                </div>
                <span className="text-blue-400 font-bold text-sm">→</span>
              </button>

              <button
                onClick={() => {
                  setShowHeroPagesModal(false);
                  handleNavigate("magenta", "/magenta.html");
                }}
                className="w-full p-3 rounded-2xl bg-fuchsia-950/80 hover:bg-fuchsia-900 border border-fuchsia-500 text-left flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🟣</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">Magenta (TBC 💚)</h4>
                    <p className="text-[10px] text-fuchsia-200">The 18 Chapters & Confidential Codex</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 font-bold text-[10px]">
                  TBC
                </span>
              </button>

              <button
                onClick={() => {
                  setShowHeroPagesModal(false);
                  handleNavigate("yellow", "/yellow-autumn.html");
                }}
                className="w-full p-3 rounded-2xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500 text-left flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🍂</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">Yellow Autumn</h4>
                    <p className="text-[10px] text-amber-200">The Dry Leaf of 2015 & Autumn Archives</p>
                  </div>
                </div>
                <span className="text-amber-400 font-bold text-sm">→</span>
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowHeroPagesModal(false)}
                className="px-5 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-300 cursor-pointer"
              >
                Close Menu
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
