import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { AutumnLeavesFrame } from "../components/AutumnLeavesFrame";
import { PageTransitionLoader } from "../components/PageTransitionLoader";
import { FixedMusicControl } from "../components/FixedMusicControl";
import { LEAF_IMAGE_PATH, SITE_SUBTITLE, SITE_TITLE } from "../constants/assets";

interface MagentaTBCProps {
  onNavigatePage?: (pageId: string, href: string) => void;
}

interface WhisperItem {
  id: string;
  text: string;
  time: string;
}

export const MagentaTBC: React.FC<MagentaTBCProps> = ({ onNavigatePage }) => {
  const [loadingTransition, setLoadingTransition] = useState(false);
  const [whisperInput, setWhisperInput] = useState("");
  const [whispers, setWhispers] = useState<WhisperItem[]>([
    { id: "1", text: "I still pass by that tea stall every November, wondering if you do too.", time: "Autumn Dusk" },
    { id: "2", text: "Some apologies are too delicate to ever be spoken out loud.", time: "Midnight 03:14" },
    { id: "3", text: "Even if rule 803 ends, Lime Green stays forever in my silence.", time: "Echo" },
  ]);
  const [cipherInput, setCipherInput] = useState("");
  const [cipherDecrypted, setCipherDecrypted] = useState(false);

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

  const handleAddWhisper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whisperInput.trim()) return;
    const newW: WhisperItem = {
      id: Date.now().toString(),
      text: whisperInput.trim(),
      time: "Just now in the Void",
    };
    setWhispers([newW, ...whispers]);
    setWhisperInput("");
  };

  const handleTestCipher = () => {
    if (cipherInput.toLowerCase().includes("tbc") || cipherInput.includes("803") || cipherInput.toLowerCase().includes("magenta") || cipherInput.toLowerCase().includes("lime")) {
      setCipherDecrypted(true);
    } else {
      alert("Cipher incorrect! Hint: Try 'TBC' or '803' or 'magenta'");
    }
  };

  return (
    // Magenta page bg: Light Magenta not dark as requested
    <div className="relative min-h-screen bg-[#fae8ff] text-[#4a044e] overflow-x-hidden selection:bg-fuchsia-600 selection:text-white">
      {/* Page Transition overlay */}
      <PageTransitionLoader isLoading={loadingTransition} />

      {/* Single Fixed Play/Pause music button */}
      <FixedMusicControl />

      {/* Detailed realistic drifting leaves */}
      <AutumnLeavesFrame fillSides={false} intensity="normal" />

      {/* Global Navigation Header */}
      <Navigation
        currentPage="magenta"
        onNavigate={(pageId, href) => handleNavigate(pageId, href)}
      />

      {/* MAIN CONTAINER */}
      <main className="relative z-20 px-6 sm:px-12 md:px-20 lg:px-28 max-w-7xl mx-auto space-y-24 pt-8 pb-16">

        {/* HERO SECTION: Right now Not Released :) */}
        <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-4">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-900 text-fuchsia-100 text-xs sm:text-sm font-mono font-bold shadow-md border border-fuchsia-700">
            <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-300 animate-ping" />
            <span>Chapter Magenta (TBC 💚)</span>
            <span className="text-fuchsia-300">•</span>
            <span className="text-emerald-300">Light Magenta Atmosphere</span>
          </div>

          {/* Central Dry Leaf Showcase */}
          <div className="flex justify-center my-2">
            <div className="relative group">
              <div className="w-26 h-26 sm:w-34 sm:h-34 rounded-2xl overflow-hidden p-1.5 bg-gradient-to-br from-amber-400 via-fuchsia-300 to-amber-500 border-2 border-fuchsia-400 shadow-xl group-hover:scale-105 transition-all duration-300">
                <img
                  src={LEAF_IMAGE_PATH}
                  alt="Yellow autumn Dry single Leaf"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl filter contrast-110"
                />
              </div>
              <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-stone-900 border border-fuchsia-400 text-[10px] text-fuchsia-200 font-mono shadow">
                Detailed Dry Leaf 🍂
              </span>
            </div>
          </div>

          {/* EXACT TITLE REQUESTED: Right now Not Released :) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-[#581c87] drop-shadow-sm">
            Right now Not Released :)
          </h1>

          {/* Brand & Subtitle */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-serif text-emerald-800 font-bold">
              {SITE_TITLE}
            </h2>
            <p className="text-sm sm:text-base text-[#701a75] max-w-2xl mx-auto font-medium leading-relaxed">
              {SITE_SUBTITLE}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-fuchsia-900 max-w-xl mx-auto font-mono font-semibold italic pt-1">
            This chapter is still being penned under midnight skies. Some stories need time to breathe before they unveil their colors.
          </p>
        </section>

        {/* SECTION 1: THE TBC TEASERS & SEALED ARTIFACTS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-white/90 border-2 border-fuchsia-300 shadow-lg flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-fuchsia-800">Magenta v1 & v2 Archive</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-900 border border-fuchsia-300 font-mono font-bold">
                  Classified
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Chapter 804: The Open Horizon
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 font-medium mt-2 leading-relaxed">
                What happens when the 803 rules are finally exhausted? Does the circle disperse, or does silence become the master rule?
              </p>
            </div>
            <div className="pt-3 border-t border-fuchsia-100 text-[11px] font-mono text-stone-600 font-bold">
              Status: Encrypted under Magenta v3
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/90 border-2 border-fuchsia-300 shadow-lg flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-fuchsia-800">Teaser 02</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-900 border border-fuchsia-300 font-mono font-bold">
                  Awaiting Season
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                The 19th Chapter Paradox
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 font-medium mt-2 leading-relaxed">
                A seventeenth voice whispered: “What if the missing chapter never actually closed, but is reading this right now?”
              </p>
            </div>
            <div className="pt-3 border-t border-fuchsia-100 text-[11px] font-mono text-stone-600 font-bold">
              Affinity Check Required: 62%
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/90 border-2 border-fuchsia-300 shadow-lg flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-fuchsia-800">Teaser 03</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-900 border border-fuchsia-300 font-mono font-bold">
                  Pending Release
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                The Dry Leaf Memorial
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 font-medium mt-2 leading-relaxed">
                A single leaf fell in autumn 2015. It has survived rain, storms, and twelve seasons. It refuses to decay until Lime Green is finished.
              </p>
            </div>
            <div className="pt-3 border-t border-fuchsia-100 text-[11px] font-mono text-stone-600 font-bold">
              Duration: Eternal
            </div>
          </div>

        </section>

        {/* SECTION 2: CIPHER TERMINAL */}
        <section className="max-w-2xl mx-auto p-8 rounded-3xl bg-white border-2 border-fuchsia-300 text-center space-y-6 shadow-xl">
          <span className="text-xs font-mono text-fuchsia-900 uppercase font-bold tracking-widest">
            Cryptographic Lock
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900">
            Preview The Magenta Crypt
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 font-medium">
            Enter an authorized pass-fragment (Hint: type <code className="bg-fuchsia-100 px-1 py-0.5 rounded font-bold text-fuchsia-900">TBC</code>, <code className="bg-fuchsia-100 px-1 py-0.5 rounded font-bold text-fuchsia-900">803</code>, or <code className="bg-fuchsia-100 px-1 py-0.5 rounded font-bold text-fuchsia-900">magenta</code>).
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <input
              type="text"
              value={cipherInput}
              onChange={(e) => setCipherInput(e.target.value)}
              placeholder="Enter cipher key..."
              className="px-4 py-2.5 rounded-xl bg-fuchsia-50 border-2 border-fuchsia-300 text-stone-900 text-sm font-mono focus:border-fuchsia-600 focus:outline-none w-full sm:w-64 text-center font-bold"
            />
            <button
              onClick={handleTestCipher}
              className="px-6 py-2.5 rounded-xl bg-fuchsia-700 hover:bg-fuchsia-600 text-white font-mono text-xs font-bold tracking-wider transition-all cursor-pointer shadow-md w-full sm:w-auto"
            >
              Test Cipher 🔓
            </button>
          </div>

          {cipherDecrypted && (
            <div className="p-5 rounded-2xl bg-fuchsia-50 border-2 border-fuchsia-400 text-left space-y-2 mt-4 shadow">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800">
                <span>✓ CIPHER DECRYPTED:</span>
                <span>Fragment #803-B</span>
              </div>
              <p className="text-sm font-serif italic text-stone-900 font-semibold">
                “When Magenta arrives, all eighteen chapters will gather at the original bench. If you still have your dry leaf, show it. Nothing was ever lost.”
              </p>
              <span className="text-[10px] font-mono font-bold text-fuchsia-800 block pt-1">
                ...to be continued 🔏🧿🤌🏻🫠🫶🏻
              </span>
            </div>
          )}
        </section>

        {/* SECTION 3: WHISPERS IN MAGENTA */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono text-fuchsia-900 uppercase font-bold tracking-wider">
              Memory Drop
            </span>
            <h3 className="text-2xl font-serif font-black text-stone-900">
              Whispers into the Magenta Void
            </h3>
            <p className="text-xs text-stone-700 font-medium">
              Drop an unfinished sentence or unsent confession into the void. It floats among the detailed drifting leaves.
            </p>
          </div>

          <form onSubmit={handleAddWhisper} className="max-w-xl mx-auto flex gap-2">
            <input
              type="text"
              value={whisperInput}
              onChange={(e) => setWhisperInput(e.target.value)}
              placeholder="Type an unsent word... (e.g. 'I still remember 2016')"
              className="flex-1 px-4 py-2.5 rounded-xl bg-white border-2 border-fuchsia-300 text-stone-900 text-xs sm:text-sm font-medium focus:border-fuchsia-600 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-fuchsia-700 hover:bg-fuchsia-600 text-white text-xs font-mono font-bold cursor-pointer transition-colors shrink-0 shadow"
            >
              Release 🫧
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <AnimatePresence>
              {whispers.map((w) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-2xl bg-white border-2 border-fuchsia-200 relative space-y-2 shadow-sm"
                >
                  <span className="text-[10px] font-mono font-bold text-fuchsia-800">
                    {w.time}
                  </span>
                  <p className="text-xs sm:text-sm text-stone-800 font-medium italic">
                    “{w.text}”
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

      </main>

      {/* MINIMALIST ORANGE FOOTER */}
      <Footer onNavigate={(pageId, href) => handleNavigate(pageId, href)} />
    </div>
  );
};
