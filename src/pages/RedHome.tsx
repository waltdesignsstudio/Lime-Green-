import React, { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { AutumnLeavesFrame } from "../components/AutumnLeavesFrame";
import { PageTransitionLoader } from "../components/PageTransitionLoader";
import { MILESTONES, RULES_DATA, CHARACTERS_DATA } from "../data/mockData";
import { LEAF_IMAGE_PATH, AUTUMN_TREES_BG, SITE_SUBTITLE } from "../constants/assets";
import { musicEngine } from "../utils/musicPlayer";

interface RedHomeProps {
  onNavigatePage?: (pageId: string, href: string) => void;
}

export const RedHome: React.FC<RedHomeProps> = ({ onNavigatePage }) => {
  const [loadingTransition, setLoadingTransition] = useState(false);
  const [selectedRuleCategory, setSelectedRuleCategory] = useState<"all" | "public" | "authorised" | "private">("all");
  const [activeMilestoneYear, setActiveMilestoneYear] = useState<number | null>(2015);

  // Parallax scroll - gentle position shift without losing ANY brightness or visibility!
  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 600], [0, 40]);

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

  const filteredRules = selectedRuleCategory === "all"
    ? RULES_DATA
    : RULES_DATA.filter((r) => r.category === selectedRuleCategory);

  return (
    // Red whole page bg: Baby Pink with high-contrast text and crisp elements
    <div className="relative min-h-screen bg-[#ffe4e6] text-[#2d0a15] overflow-x-hidden selection:bg-rose-500 selection:text-white">
      {/* Page Transition overlay */}
      <PageTransitionLoader isLoading={loadingTransition} />

      {/* Detailed realistic yellow drifting leaves and continuous side leaf borders with NO gaps */}
      <AutumnLeavesFrame fillSides={true} intensity="normal" />

      {/* Global Navigation Header with new logo and music on/off */}
      <Navigation
        currentPage="red"
        onNavigate={(pageId, href) => handleNavigate(pageId, href)}
      />

      {/* MAIN CONTENT CONTAINER */}
      <main className="relative z-20 px-6 sm:px-12 md:px-20 lg:px-28 max-w-7xl mx-auto space-y-24 pt-6">

        {/* HERO SECTION: Baby Pink base + Transparent Autumn Trees Background */}
        <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center pt-6 pb-14 rounded-3xl overflow-hidden shadow-sm border border-rose-200 bg-white/40 backdrop-blur-sm">
          
          {/* Transparent Autumn Trees Background as requested */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img
              src={AUTUMN_TREES_BG}
              alt="Autumn Trees Backdrop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-35 mix-blend-multiply filter contrast-120 saturate-110"
            />
            {/* Soft pink gradient blend over autumn trees */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#ffe4e6]/30 via-transparent to-[#ffe4e6]/80" />
          </div>

          {/* Central Hero Content - Stays 100% Bright and Visible upon scroll */}
          <motion.div
            style={{ y: heroParallaxY }}
            className="relative z-10 max-w-4xl mx-auto space-y-6 px-4"
          >
            {/* Since 2015 Badge */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-rose-900 text-rose-50 text-xs sm:text-sm font-mono shadow-md border border-rose-700"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold">Since : 2015</span>
              <span className="text-rose-300">•</span>
              <span className="text-amber-300 font-sans font-semibold">11+ Years of Preserved Moments</span>
            </motion.div>

            {/* Central Realistic Dry Yellow Leaf Showcase */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center my-2"
            >
              <div className="relative group cursor-pointer" onClick={() => musicEngine.toggle()}>
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden p-1.5 bg-gradient-to-br from-amber-400 via-rose-300 to-amber-500 border-2 border-amber-500 shadow-xl group-hover:scale-105 transition-all duration-300">
                  <img
                    src={LEAF_IMAGE_PATH}
                    alt="Yellow autumn Dry single Leaf"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl filter contrast-110"
                  />
                </div>
                <span className="absolute -bottom-2.5 -right-2 px-2.5 py-0.5 rounded-full bg-stone-900 border border-amber-400 text-[10px] text-amber-300 font-mono shadow">
                  Yellow autumn Dry Leaf 🍂
                </span>
              </div>
            </motion.div>

            {/* Animated Hero Text: "Some stories stay incomplete 🙃 ~" with full brightness */}
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ y: 35, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-[#4a041f] drop-shadow-sm"
              >
                “Some stories stay incomplete 🙃 ~”
              </motion.h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-[#6b1430] max-w-2xl mx-auto font-medium leading-relaxed tracking-wide">
              {SITE_SUBTITLE}
            </p>

            {/* CTA Button: 'discover my past' -> Redirects to Denim Blue */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleNavigate("denim", "/denim-blue.html")}
                className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white font-bold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-blue-400 flex items-center gap-3"
              >
                <span>discover my past</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-200 text-lg">
                  →
                </span>
                <span className="absolute -top-2.5 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-black font-mono tracking-wider shadow">
                  Denim Blue
                </span>
              </button>

              <button
                onClick={() => musicEngine.toggle()}
                className="px-4 py-2.5 rounded-full bg-white hover:bg-stone-50 border-2 border-rose-300 text-xs font-bold text-rose-900 flex items-center gap-2 cursor-pointer shadow-md transition-colors"
              >
                <span>🎻 Mohabbatein Music Theme</span>
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="pt-4 text-rose-800 font-semibold text-xs flex flex-col items-center gap-1 select-none">
              <span>Scroll down to unveil the 2015–2026 Timeline, 803 Rules & 18 Chapters</span>
              <span className="text-base animate-bounce">↓</span>
            </div>

          </motion.div>
        </section>

        {/* SECTION 1: EMOTIVE QUOTE CARD (Rose & Emotionless Emojis) */}
        <section className="relative">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/85 border-2 border-rose-300 shadow-xl relative overflow-hidden text-center max-w-4xl mx-auto backdrop-blur-md">
            <div className="absolute top-4 right-6 text-3xl opacity-30 select-none">🌹😐</div>
            <div className="absolute bottom-4 left-6 text-3xl opacity-30 select-none">😶🥀</div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-400 text-rose-900 text-xs font-mono font-bold mb-6">
              <span>The Attachment Paradox</span>
              <span>•</span>
              <span>Loyalty Query</span>
            </div>

            <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif text-[#4a041f] font-bold leading-relaxed italic mb-6">
              “Some Loves,friendships,attachment & attractions never forgotablle until they stay...Is this called Loyalty or not 🙃 ???”
            </blockquote>

            <div className="flex items-center justify-center gap-3 text-2xl sm:text-3xl select-none">
              <span className="hover:scale-125 transition-transform" title="Rose 🌹">🌹</span>
              <span className="hover:scale-125 transition-transform" title="Emotionless 😐">😐</span>
              <span className="hover:scale-125 transition-transform" title="Emotionless 😶">😶</span>
              <span className="hover:scale-125 transition-transform" title="Upside down 🙃">🙃</span>
            </div>
            
            <p className="text-xs sm:text-sm text-stone-700 mt-4 max-w-xl mx-auto font-medium">
              Do we hold onto the person, or the version of ourselves that existed when they were still here?
            </p>
          </div>
        </section>

        {/* SECTION 2: LORE & ESSENCE OF LIME GREEN */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Not a single person, but cherished moments */}
          <div className="p-8 rounded-3xl bg-white/90 border-2 border-emerald-400 shadow-lg flex flex-col justify-between relative group hover:shadow-xl transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">💚🍵</span>
                <span className="text-xs font-mono font-bold text-emerald-800 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-400">
                  Core Essence
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-emerald-950 font-bold mb-4 leading-snug">
                The Circle Beyond Individuals
              </h3>
              <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-medium">
                “Lime Green 💚, is not based on a single person but a collection of cherished moments shared with a group of friends or else???”
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-100 text-xs text-stone-600 font-semibold flex items-center justify-between">
              <span>Origin: Autumn 2015</span>
              <span className="text-emerald-700 font-mono">Bound by Memory</span>
            </div>
          </div>

          {/* Card 2: 803 Rules & 18 Chapters */}
          <div className="p-8 rounded-3xl bg-white/90 border-2 border-amber-400 shadow-lg flex flex-col justify-between relative group hover:shadow-xl transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">📜🔏</span>
                <span className="text-xs font-mono font-bold text-amber-900 px-3 py-1 rounded-full bg-amber-100 border border-amber-400">
                  The Archive
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-amber-950 font-bold mb-4 leading-snug">
                Rules & The 18 Chapters
              </h3>
              <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-medium">
                “Lime Green 💚 contains of total 803 rules, while some are private,some are authorised & some are Public...Still Current of 18 Chapters..(some founded & some lost :)”
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-100 text-xs text-stone-600 font-semibold flex items-center justify-between">
              <span>Categories: Public • Auth • Private</span>
              <span className="text-amber-800 font-mono font-bold">Current 18 Chapters</span>
            </div>
          </div>

        </section>

        {/* SECTION 3: LIVE STATS COUNTER BAR */}
        <section className="relative">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border-2 border-rose-300 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              
              {/* Stat 1: Live Status */}
              <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-200 flex flex-col items-center justify-center">
                <span className="text-xs uppercase font-mono tracking-widest text-rose-800 font-bold flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  Status
                </span>
                <span className="text-3xl sm:text-4xl font-serif font-black text-rose-900">
                  Live
                </span>
                <span className="text-xs text-stone-600 font-medium mt-1">Real-time Memory Stream</span>
              </div>

              {/* Stat 2: Rules: 803 */}
              <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200 flex flex-col items-center justify-center">
                <span className="text-xs uppercase font-mono tracking-widest text-amber-900 font-bold mb-1">
                  Total Tenets
                </span>
                <span className="text-3xl sm:text-4xl font-serif font-black text-amber-900">
                  Rules : 803
                </span>
                <span className="text-xs text-stone-600 font-medium mt-1">Public, Authorised & Private</span>
              </div>

              {/* Stat 3: Chapters: 18 */}
              <div className="p-5 rounded-2xl bg-blue-50 border-2 border-blue-200 flex flex-col items-center justify-center">
                <span className="text-xs uppercase font-mono tracking-widest text-blue-900 font-bold mb-1">
                  Living Roster
                </span>
                <span className="text-3xl sm:text-4xl font-serif font-black text-blue-900">
                  Chapters : 18
                </span>
                <span className="text-xs text-stone-600 font-medium mt-1">Some founded & some lost :)</span>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: CONSECUTIVE YEAR MILESTONE TIMELINE (2015 to 2026) */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900 text-rose-100 text-xs font-mono font-bold">
              <span>Chronological Chronicles</span>
              <span>•</span>
              <span>2015 → 2026</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#3a0518]">
              Consecutive Key Milestones
            </h2>
            <p className="text-sm text-stone-700 font-medium">
              Every single year wrote an indelible line in Lime Green 💚. Click any year to explore its memories.
            </p>
          </div>

          {/* Year selector pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 no-scrollbar">
            {MILESTONES.map((m) => {
              const isSelected = activeMilestoneYear === m.year;
              return (
                <button
                  key={m.year}
                  onClick={() => setActiveMilestoneYear(m.year)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-rose-700 text-white shadow-md scale-105 border-2 border-rose-800"
                      : "bg-white text-stone-800 hover:bg-rose-100 border border-rose-300"
                  }`}
                >
                  {m.year}
                </button>
              );
            })}
          </div>

          {/* Timeline Vertical Track */}
          <div className="relative border-l-3 border-rose-400 ml-4 sm:ml-8 md:ml-12 pl-6 sm:pl-10 space-y-10">
            {MILESTONES.map((milestone) => {
              const isActive = activeMilestoneYear === milestone.year;
              return (
                <div
                  key={milestone.year}
                  onClick={() => setActiveMilestoneYear(milestone.year)}
                  className={`relative p-6 sm:p-8 rounded-3xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white border-3 border-rose-600 shadow-xl ring-2 ring-rose-300"
                      : "bg-white/70 border border-rose-200 hover:border-rose-400 hover:bg-white"
                  }`}
                >
                  {/* Timeline Node Point */}
                  <div
                    className={`absolute -left-[32px] sm:-left-[48px] top-8 w-5 h-5 rounded-full border-3 transition-all ${
                      isActive
                        ? "bg-rose-600 border-white shadow-md scale-125"
                        : "bg-rose-300 border-rose-500"
                    }`}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl font-serif font-black text-rose-800">
                        {milestone.year}
                      </span>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-rose-900 font-bold">
                        {milestone.highlightTag}
                      </span>
                    </div>
                    <span className="text-xs text-amber-900 font-mono font-bold">
                      {milestone.emotion}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif text-[#3b0518] font-bold mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 italic font-medium mb-3">
                    “{milestone.subtitle}”
                  </p>

                  <p className="text-sm text-stone-800 font-medium leading-relaxed">
                    {milestone.description}
                  </p>

                  {milestone.archivedRuleRef && (
                    <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-stone-700 font-semibold">
                      <span>Associated Archive Code:</span>
                      <span className="font-mono text-emerald-800 font-bold">
                        {milestone.archivedRuleRef === 1
                          ? "Magenta v1 (Rule #1)"
                          : milestone.archivedRuleRef === 240
                          ? "Magenta V2 (Rule #240)"
                          : milestone.archivedRuleRef === 512
                          ? "Magenta v3 (Rule #512)"
                          : `Rule #${milestone.archivedRuleRef}`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: THE 803 RULES PREVIEW VAULT (Renamed Rule #1 to Magenta v1, #240 to Magenta V2, #512 to Magenta v3) */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-amber-900 uppercase font-bold tracking-wider">
                Vault of 803 Rules
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#3a0518]">
                Public, Authorised & Private Tenets
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-rose-200 text-xs font-bold">
              {(["all", "public", "authorised", "private"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedRuleCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredRules.map((rule) => (
              <div
                key={rule.id}
                className="p-6 rounded-2xl bg-white border-2 border-rose-200 hover:border-rose-400 shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
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
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
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
                  <h4 className="text-base font-serif font-bold text-stone-900 mb-2">
                    {rule.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                    {rule.text}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-rose-100 text-[11px] text-stone-500 font-semibold flex justify-between">
                  <span>Drafted: {rule.yearAdded}</span>
                  <span>Lime Green 💚</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: STILL CURRENT OF 18 CHAPTERS (Renamed from Characters to Chapters) */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono text-blue-900 uppercase font-bold tracking-wider">
              Still Current of 18
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#3a0518]">
              Chapters (Some Founded & Some Lost :)
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-medium">
              The eighteen core chapters of Lime Green. Whether present at the table or wandering in distance, each chapter remains preserved forever.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CHARACTERS_DATA.slice(0, 12).map((chapter) => (
              <div
                key={chapter.id}
                className="p-4 rounded-2xl bg-white border-2 border-rose-200 hover:border-blue-400 transition-colors text-center flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="text-2xl mb-1.5 select-none">{chapter.symbol}</div>
                  <span className="text-[10px] font-mono text-stone-500 font-bold">{chapter.code}</span>
                  <h5 className="text-xs font-serif font-bold text-stone-900 mt-1 line-clamp-1">
                    {chapter.name}
                  </h5>
                  <p className="text-[10px] text-stone-600 line-clamp-1 mt-0.5 font-medium">
                    {chapter.nature}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-rose-100">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
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

          <div className="text-center pt-2">
            <button
              onClick={() => handleNavigate("denim", "/denim-blue.html")}
              className="text-xs font-mono font-bold text-blue-900 hover:text-blue-700 underline underline-offset-4 cursor-pointer"
            >
              Inspect all 18 Chapters & calculate your affinity on the Denim Blue page →
            </button>
          </div>
        </section>

        {/* BOTTOM REDIRECTION CALLOUT */}
        <section className="pt-6 text-center">
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white border-2 border-rose-300 shadow-xl space-y-4">
            <h3 className="text-xl font-serif font-black text-rose-950">
              Ready to delve into your Denim Blue Profile?
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 font-medium">
              Discover your Status, Nature, and test if your resonance crosses the 62% benchmark of Lime Green 💚.
            </p>
            <button
              onClick={() => handleNavigate("denim", "/denim-blue.html")}
              className="px-6 py-2.5 rounded-full bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer transition-transform hover:scale-105"
            >
              Continue to Denim Blue 👖
            </button>
          </div>
        </section>

      </main>

      {/* MINIMALIST ORANGE FOOTER */}
      <Footer onNavigate={(pageId, href) => handleNavigate(pageId, href)} />
    </div>
  );
};
