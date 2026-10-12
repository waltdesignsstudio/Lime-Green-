import React, { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { AutumnLeavesFrame } from "../components/AutumnLeavesFrame";
import { PageTransitionLoader } from "../components/PageTransitionLoader";
import { FixedMusicControl } from "../components/FixedMusicControl";
import { CHARACTERS_DATA, LANGUAGES_OF_LIME_GREEN } from "../data/mockData";
import { LEAF_IMAGE_PATH, SITE_SUBTITLE } from "../constants/assets";

interface DenimBlueProps {
  onNavigatePage?: (pageId: string, href: string) => void;
}

export const DenimBlue: React.FC<DenimBlueProps> = ({ onNavigatePage }) => {
  const [loadingTransition, setLoadingTransition] = useState(false);

  // Profile Customizer State
  const [profileName, setProfileName] = useState("Wanderer 19");
  const [profileStatus, setProfileStatus] = useState<"General" | "Authorised" | "Candidate" | "Observer">("General");
  const [profileNature, setProfileNature] = useState("Quiet Guardian of Moments");
  const [timeValue, setTimeValue] = useState(65);
  const [trustValue, setTrustValue] = useState(60);
  const [loyaltyValue, setLoyaltyValue] = useState(62);

  const computedAffinity = Math.round((timeValue + trustValue + loyaltyValue) / 3);

  const naturePresets = [
    "Quiet Guardian of Moments",
    "The Melancholic Anchor",
    "Unfiltered Truth & Warmth",
    "The Drifting Autumn Leaf",
    "Silent Healer of Wounds",
    "Warden of Unspoken Secrets",
  ];

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
            <span className="text-emerald-300">Light Cyan Atmosphere</span>
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

        {/* SECTION 1: INTERACTIVE USER PROFILE CARD GENERATOR */}
        <section className="w-full space-y-3.5 sm:space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1 px-1">
            <span className="text-[10px] sm:text-xs font-mono text-blue-900 uppercase font-bold tracking-wider">
              Identity Architect
            </span>
            <h2 className="text-lg sm:text-2xl font-serif font-black text-[#0c2e4e]">
              Status : General, Name & Nature
            </h2>
            <p className="text-[11px] sm:text-xs text-stone-700 font-medium">
              Craft your chapter card in the Lime Green cosmos and test your threshold against the benchmark.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-start">
            
            {/* Left: Interactive Controls */}
            <div className="lg:col-span-6 p-3.5 sm:p-6 rounded-2xl bg-white/95 border-2 border-blue-300 space-y-3.5 sm:space-y-5 shadow-sm w-full">
              <h3 className="text-xs sm:text-sm font-serif font-bold text-blue-950 flex items-center justify-between">
                <span>Profile Parameters</span>
                <span className="text-[10px] font-mono text-blue-700 font-bold">Denim Controls</span>
              </h3>

              {/* Status Picker */}
              <div className="space-y-1.5">
                <label className="text-[11px] sm:text-xs font-mono text-stone-800 font-bold flex items-center justify-between">
                  <span>Status:</span>
                  <span className="text-blue-800 font-bold">{profileStatus}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {(["General", "Authorised", "Candidate", "Observer"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setProfileStatus(st)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                        profileStatus === st
                          ? "bg-blue-700 text-white border-blue-900 shadow-sm"
                          : "bg-blue-50 text-stone-800 border-blue-200 hover:border-blue-400"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Input */}
              <div className="space-y-1">
                <label className="text-[11px] sm:text-xs font-mono text-stone-800 font-bold">
                  Name:
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Enter your name or moniker"
                  className="w-full px-3 py-2 rounded-xl bg-blue-50/70 border border-blue-200 focus:border-blue-600 focus:outline-none text-stone-900 text-xs sm:text-sm font-sans font-semibold"
                />
              </div>

              {/* Nature Input & Presets */}
              <div className="space-y-1.5">
                <label className="text-[11px] sm:text-xs font-mono text-stone-800 font-bold flex items-center justify-between">
                  <span>Nature:</span>
                  <span className="text-[10px] text-stone-600">Pick preset or type</span>
                </label>
                <input
                  type="text"
                  value={profileNature}
                  onChange={(e) => setProfileNature(e.target.value)}
                  placeholder="Enter your Nature"
                  className="w-full px-3 py-2 rounded-xl bg-blue-50/70 border border-blue-200 focus:border-blue-600 focus:outline-none text-stone-900 text-xs sm:text-sm font-sans font-semibold mb-1"
                />
                <div className="flex flex-wrap gap-1">
                  {naturePresets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setProfileNature(preset)}
                      className="px-2 py-0.5 rounded-md bg-blue-100 text-[10px] text-blue-900 font-semibold hover:bg-blue-200 transition-colors border border-blue-300 cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* The Three Languages Sliders */}
              <div className="space-y-2.5 pt-2.5 border-t border-blue-200">
                <h4 className="text-[10px] sm:text-xs font-mono text-blue-900 uppercase font-bold tracking-wider">
                  Test Your Core Pillar Resonance
                </h4>

                {/* Time */}
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[11px] sm:text-xs font-mono font-bold text-stone-700">
                    <span>Time ⏳ (Years of Patience)</span>
                    <span className="text-amber-800">{timeValue}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="95"
                    value={timeValue}
                    onChange={(e) => setTimeValue(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                {/* Trust */}
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[11px] sm:text-xs font-mono font-bold text-stone-700">
                    <span>Trust 🤝 (Vulnerability)</span>
                    <span className="text-blue-800">{trustValue}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="95"
                    value={trustValue}
                    onChange={(e) => setTrustValue(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* Loyalty */}
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[11px] sm:text-xs font-mono font-bold text-stone-700">
                    <span>Loyalty 🛡️ (Unshakable Anchor)</span>
                    <span className="text-emerald-800">{loyaltyValue}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="95"
                    value={loyaltyValue}
                    onChange={(e) => setLoyaltyValue(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>

            </div>

            {/* Right: The Profile Badge Card */}
            <div className="lg:col-span-6 flex flex-col items-center w-full">
              <div className="w-full max-w-md p-4 sm:p-6 rounded-2xl bg-white border-2 border-blue-400 shadow-md relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden border-2 border-amber-500 shadow-sm bg-amber-50 shrink-0">
                      <img
                        src={LEAF_IMAGE_PATH}
                        alt="Dry Leaf"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-serif font-black text-blue-950 tracking-wide">
                        Lime Green 💚
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-blue-700">
                        Chapter Registry #LG-CH-19
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono uppercase bg-blue-100 border border-blue-300 text-blue-900 font-bold shrink-0">
                    {profileStatus}
                  </span>
                </div>

                {/* Body */}
                <div className="py-3.5 space-y-2.5">
                  <div>
                    <span className="text-[9px] uppercase font-mono text-stone-500 font-bold tracking-wider">
                      Name
                    </span>
                    <h3 className="text-lg sm:text-2xl font-serif font-black text-blue-950 tracking-wide break-words">
                      {profileName || "Anonymous Soul"}
                    </h3>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-mono text-stone-500 font-bold tracking-wider">
                      Nature
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 font-medium italic break-words">
                      “{profileNature}”
                    </p>
                  </div>

                  {/* Affinity Meter */}
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-stone-800">
                        Lime Green Affinity Score:
                      </span>
                      <span className={`text-base font-mono font-black ${computedAffinity >= 62 ? "text-emerald-700" : "text-amber-800"}`}>
                        {computedAffinity}%
                      </span>
                    </div>

                    <div className="relative w-full h-3 bg-blue-200/80 rounded-full overflow-hidden border border-blue-300">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${computedAffinity}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono pt-0.5 text-stone-600 font-bold">
                      <span>0%</span>
                      <span className="text-emerald-800 font-black">
                        ★ Benchmark 62%
                      </span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="text-[11px] sm:text-xs text-stone-800 bg-blue-100/60 p-2.5 rounded-xl border border-blue-200 leading-relaxed font-medium">
                    {computedAffinity >= 62 ? (
                      <span className="text-emerald-900 font-bold flex items-center gap-1.5">
                        <span>✓</span>
                        <span>Resonance Confirmed. You meet the 62% requirement to stand as an active Chapter in Lime Green 💚.</span>
                      </span>
                    ) : (
                      <span className="text-amber-900 font-semibold flex items-center gap-1.5">
                        <span>•</span>
                        <span>Threshold below 62%. Deepen your Time, Trust, or Loyalty to awaken the Chapter mark.</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="pt-2 border-t border-blue-100 flex items-center justify-between text-[10px] font-mono text-stone-500">
                  <span>Languages: Time • Trust • Loyalty</span>
                  <span>Since 2015</span>
                </div>
              </div>
            </div>

          </div>
        </section>

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
