import React, { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { AutumnLeavesFrame } from "../components/AutumnLeavesFrame";
import { PageTransitionLoader } from "../components/PageTransitionLoader";
import { FixedMusicControl } from "../components/FixedMusicControl";
import { LEAF_IMAGE_PATH, SITE_SUBTITLE, SITE_TITLE } from "../constants/assets";
import { RULES_DATA } from "../data/mockData";

interface YellowAutumnProps {
  onNavigatePage?: (pageId: string, href: string) => void;
}

export const YellowAutumn: React.FC<YellowAutumnProps> = ({ onNavigatePage }) => {
  const [loadingTransition, setLoadingTransition] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authKeyInput, setAuthKeyInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [collectedLeaves, setCollectedLeaves] = useState<number>(() => {
    return Number(localStorage.getItem("lime_green_leaves_count") || "3");
  });
  const [toastMessage, setToastMessage] = useState("");

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

  const handleAuthorize = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = authKeyInput.trim().toLowerCase();
    if (
      clean === "803" ||
      clean === "rule803" ||
      clean === "loyalty" ||
      clean === "2015" ||
      clean === "autumn" ||
      clean === "magenta" ||
      clean === "guest"
    ) {
      setIsAuthorized(true);
      setAuthError("");
      triggerToast("Access Granted: Welcome Authorised Soul 🍃");
    } else {
      setAuthError("Key invalid! Valid keys: '803', 'Loyalty', '2015', or click 'Bypass Clearance'");
    }
  };

  const bypassClearance = () => {
    setIsAuthorized(true);
    setAuthError("");
    triggerToast("Emergency Override Granted as Chapter #18 💚");
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleCollectLeaf = () => {
    const newCount = collectedLeaves + 1;
    setCollectedLeaves(newCount);
    localStorage.setItem("lime_green_leaves_count", newCount.toString());
    const quotes = [
      "Rule 803: 'To be continued...'",
      "Magenta v1: Silence is shelter.",
      "Magenta V2: Midnight burdens withstand sunrise.",
      "Magenta v3: The sacred bond of 18 Chapters.",
      "A dry leaf never forgets the branch it fell from.",
      "Some attachments are written in indelible ink 🙃",
    ];
    const rand = quotes[Math.floor(Math.random() * quotes.length)];
    triggerToast(`+1 Detailed Dry Leaf Gathered! 🍂 "${rand}"`);
  };

  return (
    // Yellow Autumn page bg: Light Golden as requested, full mobile coverage with zero lag
    <div className="relative min-h-screen w-full bg-[#fef9c3] text-[#451a03] overflow-x-hidden selection:bg-amber-600 selection:text-white">
      {/* Page Transition overlay */}
      <PageTransitionLoader isLoading={loadingTransition} />

      {/* Single Fixed Play/Pause music button */}
      <FixedMusicControl />

      {/* Detailed realistic drifting leaves with hardware acceleration */}
      <AutumnLeavesFrame fillSides={false} intensity="dense" />

      {/* Global Navigation Header */}
      <Navigation
        currentPage="yellow"
        onNavigate={(pageId, href) => handleNavigate(pageId, href)}
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-3 sm:right-6 z-50 max-w-xs px-3.5 py-2 rounded-xl bg-stone-900 border-2 border-amber-400 text-amber-200 text-xs font-mono shadow-xl backdrop-blur-md animate-fadeIn">
          {toastMessage}
        </div>
      )}

      {/* MAIN CONTAINER with full screen coverage on mobile */}
      <main className="relative z-20 w-full max-w-7xl mx-auto px-2 sm:px-6 md:px-12 lg:px-20 space-y-4 sm:space-y-12 md:space-y-16 pt-2 sm:pt-6 pb-24 sm:pb-16">

        {/* HERO SECTION */}
        <section className="relative text-center max-w-4xl mx-auto space-y-2.5 sm:space-y-4 pt-1 sm:pt-3 px-1">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900 text-amber-100 text-[10px] sm:text-xs font-mono font-bold shadow-sm border border-amber-700">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
            <span>Autumn Season Gateway</span>
            <span className="text-amber-300">•</span>
            <span className="text-emerald-300">Preserved Leaves</span>
          </div>

          {/* Central Dry Leaf Showcase */}
          <div className="flex justify-center my-1.5 sm:my-3">
            <div className="relative group cursor-pointer" onClick={handleCollectLeaf}>
              <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-amber-400 via-yellow-200 to-amber-500 border-2 sm:border-3 border-amber-600 shadow-lg group-hover:scale-105 transition-transform duration-200">
                <img
                  src={LEAF_IMAGE_PATH}
                  alt="Yellow autumn Dry single Leaf"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-stone-900 border border-amber-400 text-[9px] text-amber-300 font-mono shadow font-bold">
                Single Leaf 🍂
              </span>
            </div>
          </div>

          {/* EXACT TITLE REQUESTED: Not in Season 🙃:) only visible to authorised characters :) */}
          <h1 className="text-xl sm:text-3xl md:text-5xl font-serif font-black text-[#78350f] drop-shadow-sm px-1 break-words">
            Not in Season 🙃:) only visible to authorised characters :)
          </h1>

          {/* Subtitle & Brand */}
          <div className="space-y-0.5">
            <h2 className="text-lg sm:text-xl font-serif text-emerald-800 font-bold">
              {SITE_TITLE}
            </h2>
            <p className="text-xs sm:text-sm text-[#92400e] max-w-2xl mx-auto font-medium leading-relaxed px-1">
              {SITE_SUBTITLE}
            </p>
          </div>

          <p className="text-[11px] sm:text-xs text-amber-950 max-w-xl mx-auto font-mono font-semibold italic pt-0.5">
            The seasonal gateway is currently locked under early autumn frost. Enter your secret character clearance to unlock the confidential harvest archives.
          </p>
        </section>

        {/* SECTION 1: AUTHORISATION GATE */}
        <section className="w-full max-w-2xl mx-auto p-4 sm:p-8 rounded-2xl bg-white/95 border-2 border-amber-400 shadow-sm space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔏</span>
              <h3 className="text-base sm:text-lg font-serif font-bold text-amber-950">
                Authorised Characters Clearance Check
              </h3>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold self-start sm:self-auto ${isAuthorized ? "bg-emerald-100 text-emerald-900 border border-emerald-300" : "bg-amber-100 text-amber-900 border border-amber-300"}`}>
              {isAuthorized ? "Clearance Verified ✓" : "Protected Vault"}
            </span>
          </div>

          {!isAuthorized ? (
            <form onSubmit={handleAuthorize} className="space-y-3">
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                Please enter your Character Passkey (Hint: <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono font-bold">803</code> or <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono font-bold">Loyalty</code> or <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono font-bold">2015</code>):
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={authKeyInput}
                  onChange={(e) => setAuthKeyInput(e.target.value)}
                  placeholder="Enter Passkey..."
                  className="flex-1 px-3 py-2 rounded-xl bg-amber-50/70 border border-amber-300 focus:outline-none focus:border-amber-600 text-xs sm:text-sm font-mono font-bold"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm font-mono cursor-pointer transition-transform active:scale-95 shadow-sm"
                >
                  Verify Key 🔑
                </button>
              </div>

              {authError && (
                <p className="text-xs text-rose-700 font-mono font-semibold">
                  {authError}
                </p>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-amber-100">
                <span className="text-[10px] text-stone-500 font-mono">
                  Forgot your Character code?
                </span>
                <button
                  type="button"
                  onClick={bypassClearance}
                  className="text-xs font-mono font-bold text-amber-900 hover:text-amber-700 underline underline-offset-2 cursor-pointer"
                >
                  Bypass as Chapter #18 Override →
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 animate-fadeIn">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between">
                <span className="font-bold">
                  Access Granted! Authorized Character Status Verified.
                </span>
                <button
                  onClick={() => setIsAuthorized(false)}
                  className="text-[10px] font-mono underline text-emerald-800 hover:text-emerald-950 cursor-pointer"
                >
                  Lock Vault
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-serif font-black text-amber-950">
                  Secret Seasonal Manuscripts (Restricted Circulation)
                </h4>
                <div className="space-y-2 text-xs text-stone-800">
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="font-mono font-bold text-amber-900 block mb-0.5">
                      Archived Note #A-2015:
                    </span>
                    <p className="italic font-serif leading-relaxed">
                      “When the golden leaves hit the asphalt, remember that attachment wasn't a choice; it was an echo of an evening that refused to set.”
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <span className="font-mono font-bold text-amber-900 block mb-0.5">
                      Archived Note #A-2023:
                    </span>
                    <p className="italic font-serif leading-relaxed">
                      “We counted eighteen shadows under the bridge. Even if only three remain to drink tea today, the other fifteen are written in indelible ink.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 2: INTERACTIVE DRY LEAF COLLECTOR */}
        <section className="w-full max-w-2xl mx-auto p-4 sm:p-8 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-sm text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-400 text-amber-900 text-[10px] sm:text-xs font-mono font-bold">
            <span>Autumn Leaf Collector</span>
            <span>•</span>
            <span>Digital Keepsake</span>
          </div>

          <h3 className="text-base sm:text-xl font-serif font-black text-amber-950">
            Gather Your Digital Autumn Leaves
          </h3>
          <p className="text-xs text-stone-700 max-w-md mx-auto leading-relaxed font-medium">
            Click the leaf button to gather falling amber mementos from Lime Green. Each leaf holds an unwritten chapter tenet.
          </p>

          <div className="flex items-center justify-center gap-4 py-2">
            <button
              onClick={handleCollectLeaf}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs sm:text-sm font-mono tracking-wider shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Gather Leaf</span>
              <span>🍂</span>
            </button>
            <div className="text-left font-mono">
              <span className="text-[10px] text-stone-500 block uppercase">Collected</span>
              <span className="text-lg font-black text-amber-900">{collectedLeaves} Leaves</span>
            </div>
          </div>
        </section>

      </main>

      {/* MINIMALIST ORANGE FOOTER */}
      <Footer onNavigate={(pageId, href) => handleNavigate(pageId, href)} />
    </div>
  );
};
