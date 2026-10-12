import React, { useState } from "react";
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
  const [cipherFeedback, setCipherFeedback] = useState("");

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
    const clean = cipherInput.toLowerCase();
    if (clean.includes("tbc") || clean.includes("803") || clean.includes("magenta") || clean.includes("lime")) {
      setCipherDecrypted(true);
      setCipherFeedback("Cipher Decrypted! Unsealed Magenta preview active.");
    } else {
      setCipherFeedback("Cipher incorrect. Hint: Try 'TBC' or '803' or 'magenta'");
    }
  };

  return (
    // Magenta page bg: Light Magenta not dark as requested, full mobile coverage with zero lag
    <div className="relative min-h-screen w-full bg-[#fae8ff] text-[#4a044e] overflow-x-hidden selection:bg-fuchsia-600 selection:text-white">
      {/* Page Transition overlay */}
      <PageTransitionLoader isLoading={loadingTransition} />

      {/* Single Fixed Play/Pause music button */}
      <FixedMusicControl />

      {/* Detailed realistic drifting leaves with hardware acceleration */}
      <AutumnLeavesFrame fillSides={false} intensity="normal" />

      {/* Global Navigation Header */}
      <Navigation
        currentPage="magenta"
        onNavigate={(pageId, href) => handleNavigate(pageId, href)}
      />

      {/* MAIN CONTAINER with full screen coverage on mobile */}
      <main className="relative z-20 w-full max-w-7xl mx-auto px-2 sm:px-6 md:px-12 lg:px-20 space-y-4 sm:space-y-12 md:space-y-16 pt-2 sm:pt-6 pb-24 sm:pb-16">

        {/* HERO SECTION: Right now Not Released :) */}
        <section className="relative text-center max-w-4xl mx-auto space-y-2.5 sm:space-y-4 pt-1 sm:pt-3 px-1">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-900 text-fuchsia-100 text-[10px] sm:text-xs font-mono font-bold shadow-sm border border-fuchsia-700">
            <span className="w-2 h-2 rounded-full bg-fuchsia-300 animate-ping" />
            <span>Chapter Magenta (TBC 💚)</span>
            <span className="text-fuchsia-300">•</span>
            <span className="text-emerald-300">Confidential Codex</span>
          </div>

          {/* Central Dry Leaf Showcase */}
          <div className="flex justify-center my-1.5 sm:my-3">
            <div className="relative group">
              <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-amber-400 via-fuchsia-300 to-amber-500 border-2 border-fuchsia-400 shadow-lg group-hover:scale-105 transition-transform duration-200">
                <img
                  src={LEAF_IMAGE_PATH}
                  alt="Yellow autumn Dry single Leaf"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-stone-900 border border-fuchsia-400 text-[9px] text-fuchsia-200 font-mono shadow font-bold">
                Detailed Leaf 🍂
              </span>
            </div>
          </div>

          {/* EXACT TITLE REQUESTED: Right now Not Released :) */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-[#581c87] drop-shadow-sm px-1 break-words">
            Right now Not Released :)
          </h1>

          {/* Brand & Subtitle */}
          <div className="space-y-0.5">
            <h2 className="text-lg sm:text-xl font-serif text-emerald-800 font-bold">
              {SITE_TITLE}
            </h2>
            <p className="text-xs sm:text-sm text-[#701a75] max-w-2xl mx-auto font-medium leading-relaxed px-1">
              {SITE_SUBTITLE}
            </p>
          </div>

          <p className="text-[11px] sm:text-xs text-fuchsia-900 max-w-xl mx-auto font-mono font-semibold italic pt-0.5">
            This chapter is still being penned under midnight skies. Some stories need time to breathe before they unveil their colors.
          </p>
        </section>

        {/* SECTION 1: THE TBC TEASERS & SEALED ARTIFACTS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
          
          <div className="p-4 sm:p-6 rounded-2xl bg-white/90 border-2 border-fuchsia-300 shadow-sm flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-fuchsia-800">Magenta v1 Archive</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-900 border border-fuchsia-300 font-mono font-bold">
                  Classified
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#581c87] mb-1">
                The Forgotten Train Ticket
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Locked tenet originating from October 2017. Kept inside a vintage leather wallet that hasn't opened since the winter rain.
              </p>
            </div>
            <div className="pt-2 border-t border-fuchsia-100 text-[10px] font-mono text-fuchsia-700 flex justify-between">
              <span>Status: Awaiting Seal</span>
              <span>🔒 00:00</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/90 border-2 border-fuchsia-300 shadow-sm flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-fuchsia-800">Magenta V2 Manuscript</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-900 border border-fuchsia-300 font-mono font-bold">
                  Drafting
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#581c87] mb-1">
                The Unsent 4 AM Voice Note
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                A 3-minute recording recorded during a blackout storm in 2021. Stored in high-fidelity waveform, awaiting the right recipient.
              </p>
            </div>
            <div className="pt-2 border-t border-fuchsia-100 text-[10px] font-mono text-fuchsia-700 flex justify-between">
              <span>Audio: Encrypted</span>
              <span>🎙️ Stored</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/90 border-2 border-fuchsia-300 shadow-sm flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-fuchsia-800">Magenta v3 Vault</span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-900 border border-fuchsia-300 font-mono font-bold">
                  Sealed
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#581c87] mb-1">
                The Empty Chair Paradox
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Why does one unoccupied chair at a reunion dinner weigh more than all the occupied seats combined?
              </p>
            </div>
            <div className="pt-2 border-t border-fuchsia-100 text-[10px] font-mono text-fuchsia-700 flex justify-between">
              <span>Origin: Rule 803</span>
              <span>🔏 Sealed</span>
            </div>
          </div>

        </section>

        {/* SECTION 2: SECRET CIPHER TERMINAL */}
        <section className="w-full p-4 sm:p-8 rounded-2xl bg-white/95 border-2 border-fuchsia-400 shadow-sm space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <div>
              <span className="text-[10px] sm:text-xs font-mono text-fuchsia-800 uppercase font-bold tracking-wider">
                Authorized Decryption Key
              </span>
              <h3 className="text-base sm:text-xl font-serif font-black text-fuchsia-950">
                Unlock Unreleased Chapter Logs
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-100 text-fuchsia-900 border border-fuchsia-300 font-bold self-start sm:self-auto">
              Terminal v3.4
            </span>
          </div>

          <p className="text-xs text-stone-700 font-medium">
            Enter passkey keyword (<code className="bg-fuchsia-100 px-1 py-0.5 rounded font-mono text-fuchsia-900 font-bold">TBC</code> or <code className="bg-fuchsia-100 px-1 py-0.5 rounded font-mono text-fuchsia-900 font-bold">803</code> or <code className="bg-fuchsia-100 px-1 py-0.5 rounded font-mono text-fuchsia-900 font-bold">magenta</code>) to preview encrypted logs:
          </p>

          <div className="flex flex-col sm:flex-row gap-2 max-w-lg">
            <input
              type="text"
              value={cipherInput}
              onChange={(e) => setCipherInput(e.target.value)}
              placeholder="Enter passkey (e.g. TBC or 803)..."
              className="flex-1 px-3 py-2 rounded-xl bg-fuchsia-50/70 border border-fuchsia-300 focus:outline-none focus:border-fuchsia-600 text-xs sm:text-sm font-mono font-semibold"
            />
            <button
              onClick={handleTestCipher}
              className="px-5 py-2 rounded-xl bg-fuchsia-700 hover:bg-fuchsia-800 text-white font-bold text-xs sm:text-sm font-mono cursor-pointer transition-transform active:scale-95 shadow-sm"
            >
              Decrypt 🔓
            </button>
          </div>

          {cipherFeedback && (
            <div className={`p-2.5 rounded-xl text-xs font-mono ${cipherDecrypted ? "bg-emerald-100 border border-emerald-300 text-emerald-900" : "bg-rose-100 border border-rose-300 text-rose-900"}`}>
              {cipherFeedback}
            </div>
          )}

          {cipherDecrypted && (
            <div className="mt-3 p-3.5 rounded-xl bg-fuchsia-50 border border-fuchsia-300 space-y-2 animate-fadeIn">
              <h4 className="text-xs font-mono font-bold text-fuchsia-900 uppercase">
                Decrypted Manuscript Excerpt #LG-MGT-001
              </h4>
              <p className="text-xs text-stone-800 italic leading-relaxed font-serif">
                “We never planned the ending. When the autumn arrived that eleventh year, the wind simply gathered every unsaid word and scattered them across the dry riverbed like golden leaves. Lime Green 💚 wasn't lost; it just stopped needing an explanation.”
              </p>
              <div className="text-[10px] font-mono text-fuchsia-700">
                Authorized clearance recorded. Lime Green ....to be continued 🔏🧿🤌🏻🫠🫶🏻.
              </div>
            </div>
          )}
        </section>

        {/* SECTION 3: WHISPERS INTO THE VOID */}
        <section className="w-full p-4 sm:p-8 rounded-2xl bg-white/95 border-2 border-fuchsia-300 shadow-sm space-y-4">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[10px] sm:text-xs font-mono text-fuchsia-800 uppercase font-bold tracking-wider">
              Ephemeral Ledger
            </span>
            <h3 className="text-base sm:text-xl font-serif font-black text-fuchsia-950">
              Whispers into the Void
            </h3>
            <p className="text-[11px] sm:text-xs text-stone-700 font-medium">
              Leave an unsaid memory that you could never send. It will drift alongside the yellow autumn leaves.
            </p>
          </div>

          <form onSubmit={handleAddWhisper} className="max-w-xl mx-auto space-y-2">
            <textarea
              rows={2}
              value={whisperInput}
              onChange={(e) => setWhisperInput(e.target.value)}
              placeholder="Write a whisper into the void..."
              className="w-full p-3 rounded-xl bg-fuchsia-50/70 border border-fuchsia-300 focus:outline-none focus:border-fuchsia-600 text-xs sm:text-sm font-sans"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-fuchsia-700 hover:bg-fuchsia-800 text-white font-bold text-xs font-mono cursor-pointer transition-transform active:scale-95 shadow-sm"
              >
                Release Whisper 🍂
              </button>
            </div>
          </form>

          {/* Whispers Feed */}
          <div className="max-w-xl mx-auto space-y-2 pt-2">
            {whispers.map((w) => (
              <div
                key={w.id}
                className="p-3 rounded-xl bg-fuchsia-50 border border-fuchsia-200 text-xs flex flex-col justify-between"
              >
                <p className="text-stone-800 font-medium italic mb-1">
                  “{w.text}”
                </p>
                <span className="text-[10px] font-mono text-fuchsia-700 text-right">
                  {w.time}
                </span>
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
