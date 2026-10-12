import React, { useState } from "react";
import { motion } from "motion/react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { AutumnLeavesFrame } from "../components/AutumnLeavesFrame";
import { PageTransitionLoader } from "../components/PageTransitionLoader";
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
    }, 700);
  };

  return (
    // Denim Blue page bg: Light Cyan as requested
    <div className="relative min-h-screen bg-[#cffafe] text-[#0f2942] overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Page Transition overlay */}
      <PageTransitionLoader isLoading={loadingTransition} />

      {/* Detailed realistic drifting leaves and side borders with NO gaps */}
      <AutumnLeavesFrame fillSides={true} intensity="normal" />

      {/* Global Navigation */}
      <Navigation
        currentPage="denim"
        onNavigate={(pageId, href) => handleNavigate(pageId, href)}
      />

      {/* MAIN CONTAINER */}
      <main className="relative z-20 px-6 sm:px-12 md:px-20 lg:px-28 max-w-7xl mx-auto space-y-24 pt-8 pb-16">

        {/* HERO / INTRO */}
        <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-4">
          
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900 text-sky-100 text-xs sm:text-sm font-mono font-bold shadow-md border border-blue-700"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span>Denim Blue Domain</span>
            <span className="text-blue-300">•</span>
            <span className="text-emerald-300">Light Cyan Atmosphere</span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-[#0c2e4e] drop-shadow-sm">
            User Profile & The 62% Affinity
          </h1>

          <p className="text-sm sm:text-base text-[#1b4368] max-w-2xl mx-auto font-medium leading-relaxed">
            {SITE_SUBTITLE}
          </p>

          {/* Benchmark Callout */}
          <div className="p-6 rounded-3xl bg-white/90 border-2 border-blue-400 text-blue-950 text-base sm:text-lg font-serif italic shadow-lg max-w-3xl mx-auto font-bold">
            “To be honest, Peoples have ability to become a Chapter of Lime Green 💚 with of 62%...”
          </div>
        </section>

        {/* SECTION 1: INTERACTIVE USER PROFILE CARD GENERATOR */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono text-blue-900 uppercase font-bold tracking-widest">
              Identity Architect
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0c2e4e]">
              Status : General, Name & Nature
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-medium">
              Craft your chapter card in the Lime Green cosmos and test your threshold against the benchmark.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Controls */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white/95 border-2 border-blue-300 space-y-6 shadow-xl">
              <h3 className="text-base font-serif font-bold text-blue-950 flex items-center justify-between">
                <span>Profile Parameters</span>
                <span className="text-xs font-mono text-blue-700 font-bold">Denim Indigo Controls</span>
              </h3>

              {/* Status Picker */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-stone-800 font-bold flex items-center justify-between">
                  <span>Status:</span>
                  <span className="text-blue-800 font-bold">{profileStatus}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["General", "Authorised", "Candidate", "Observer"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setProfileStatus(st)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border-2 ${
                        profileStatus === st
                          ? "bg-blue-700 text-white border-blue-900 shadow-md"
                          : "bg-blue-50 text-stone-800 border-blue-200 hover:border-blue-400"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-stone-800 font-bold">
                  Name:
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Enter your name or moniker"
                  className="w-full px-4 py-2.5 rounded-xl bg-blue-50/70 border-2 border-blue-200 focus:border-blue-600 focus:outline-none text-stone-900 text-sm font-sans font-semibold"
                />
              </div>

              {/* Nature Input & Presets */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-stone-800 font-bold flex items-center justify-between">
                  <span>Nature:</span>
                  <span className="text-[11px] text-stone-600">Pick preset or type</span>
                </label>
                <input
                  type="text"
                  value={profileNature}
                  onChange={(e) => setProfileNature(e.target.value)}
                  placeholder="Enter your Nature"
                  className="w-full px-4 py-2.5 rounded-xl bg-blue-50/70 border-2 border-blue-200 focus:border-blue-600 focus:outline-none text-stone-900 text-sm font-sans font-semibold mb-2"
                />
                <div className="flex flex-wrap gap-1.5">
                  {naturePresets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setProfileNature(preset)}
                      className="px-2.5 py-1 rounded-lg bg-blue-100 text-[11px] text-blue-900 font-semibold hover:bg-blue-200 transition-colors border border-blue-300 cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* The Three Languages Sliders */}
              <div className="space-y-4 pt-4 border-t border-blue-200">
                <h4 className="text-xs font-mono text-blue-900 uppercase font-bold tracking-wider">
                  Test Your Core Pillar Resonance
                </h4>

                {/* Time */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono font-bold text-stone-700">
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
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono font-bold text-stone-700">
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
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono font-bold text-stone-700">
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
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-md p-8 rounded-3xl bg-white border-3 border-blue-400 shadow-2xl relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-amber-500 shadow-sm bg-amber-50">
                      <img
                        src={LEAF_IMAGE_PATH}
                        alt="Dry Leaf"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-serif font-black text-blue-950 tracking-wide">
                        Lime Green 💚
                      </h4>
                      <span className="text-[11px] font-mono font-bold text-blue-700">
                        Chapter Registry #LG-CH-19
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-mono uppercase bg-blue-100 border border-blue-300 text-blue-900 font-bold">
                    {profileStatus}
                  </span>
                </div>

                {/* Body */}
                <div className="py-6 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-stone-500 font-bold tracking-wider">
                      Name
                    </span>
                    <h3 className="text-2xl font-serif font-black text-blue-950 tracking-wide">
                      {profileName || "Anonymous Soul"}
                    </h3>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-stone-500 font-bold tracking-wider">
                      Nature
                    </span>
                    <p className="text-sm text-stone-700 font-medium italic">
                      “{profileNature}”
                    </p>
                  </div>

                  {/* Affinity Meter */}
                  <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-stone-800">
                        Lime Green Affinity Score:
                      </span>
                      <span className={`text-lg font-mono font-black ${computedAffinity >= 62 ? "text-emerald-700" : "text-amber-800"}`}>
                        {computedAffinity}%
                      </span>
                    </div>

                    <div className="relative w-full h-3.5 bg-blue-200/80 rounded-full overflow-hidden border border-blue-300">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${computedAffinity}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[11px] font-mono pt-1 text-stone-600 font-bold">
                      <span>0%</span>
                      <span className="text-emerald-800 font-black">
                        ★ Benchmark 62%
                      </span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="text-xs text-stone-800 bg-blue-100/60 p-3 rounded-xl border border-blue-200 leading-relaxed font-medium">
                    {computedAffinity >= 62 ? (
                      <span className="text-emerald-900 font-bold flex items-center gap-1.5">
                        <span>✓</span>
                        <span>Resonance Confirmed. You meet the 62% requirement to stand as an active Chapter in Lime Green 💚.</span>
                      </span>
                    ) : (
                      <span className="text-amber-900 font-bold flex items-center gap-1.5">
                        <span>⚠️</span>
                        <span>Approaching threshold. Deepen your Time and Loyalty to reach the 62% baseline.</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-blue-200 flex items-center justify-between text-[11px] font-mono font-bold text-stone-600">
                  <span>Languages: Time • Trust • Loyalty</span>
                  <span>...to be continued 🔏</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: THE 4 LANGUAGES */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono text-blue-900 uppercase font-bold tracking-widest">
              Sacred Vocabulary
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#0c2e4e]">
              “...In Lime Green 💚, the Languages are : Time,Trust,Loyalty & ...~~~:)”
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LANGUAGES_OF_LIME_GREEN.map((lang) => (
              <div
                key={lang.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-blue-300 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-serif font-black text-blue-950">
                      {lang.title}
                    </span>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
                      {lang.badge}
                    </span>
                  </div>

                  <p className="text-sm font-serif italic text-stone-800 mb-4 leading-relaxed font-bold">
                    “{lang.quote}”
                  </p>

                  <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                    {lang.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-xs text-stone-600 font-mono font-bold">
                  <span>Lime Green Dialect</span>
                  <span className="text-emerald-700">Preserved Since 2015</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: THE 18 CHAPTERS (Renamed from Characters to Chapters) */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-800 uppercase font-bold tracking-wider">
                Full Register
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0c2e4e]">
                The 18 Chapters of Lime Green
              </h2>
            </div>
            <p className="text-xs text-stone-700 max-w-sm font-medium">
              Each chapter embodies an unwritten rule, a seasonal shift, or a shared secret.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHARACTERS_DATA.map((chapter) => (
              <div
                key={chapter.id}
                className="p-5 rounded-2xl bg-white border-2 border-blue-200 hover:border-blue-500 shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{chapter.symbol}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        chapter.status === "Founded"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : chapter.status === "Active Guardian"
                          ? "bg-blue-100 text-blue-900 border border-blue-300"
                          : "bg-rose-100 text-rose-900 border border-rose-300"
                      }`}
                    >
                      {chapter.status}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-stone-500 font-bold">{chapter.code}</span>
                  <h4 className="text-base font-serif font-bold text-stone-900 mt-0.5">
                    {chapter.name}
                  </h4>
                  <p className="text-xs text-blue-800 font-mono font-semibold mb-2">
                    {chapter.title}
                  </p>

                  <p className="text-xs text-stone-700 font-medium mb-3">
                    Nature: <span className="text-stone-900 italic font-semibold">{chapter.nature}</span>
                  </p>

                  <p className="text-xs text-stone-700 italic bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                    {chapter.notes}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-blue-100 text-[11px] font-mono flex items-center justify-between text-stone-600 font-bold">
                  <span>Affinity Rating</span>
                  <span className="text-emerald-700 font-black">{chapter.affinity}%</span>
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
