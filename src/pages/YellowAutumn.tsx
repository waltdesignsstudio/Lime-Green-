import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { AutumnLeavesFrame } from "../components/AutumnLeavesFrame";
import { PageTransitionLoader } from "../components/PageTransitionLoader";
import { LEAF_IMAGE_PATH, SITE_SUBTITLE, SITE_TITLE } from "../constants/assets";
import { RULES_DATA } from "../data/mockData";
import { musicEngine } from "../utils/musicPlayer";

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
    }, 700);
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
    setTimeout(() => setToastMessage(""), 3500);
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
    // Yellow Autumn page bg: Light Golden as requested
    <div className="relative min-h-screen bg-[#fef9c3] text-[#451a03] overflow-x-hidden selection:bg-amber-600 selection:text-white">
      {/* Page Transition overlay */}
      <PageTransitionLoader isLoading={loadingTransition} />

      {/* Detailed realistic drifting leaves */}
      <AutumnLeavesFrame fillSides={false} intensity="dense" />

      {/* Global Navigation Header */}
      <Navigation
        currentPage="yellow"
        onNavigate={(pageId, href) => handleNavigate(pageId, href)}
      />

      {/* Toast Alert */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-24 right-6 z-50 px-4 py-2.5 rounded-xl bg-stone-900 border-2 border-amber-400 text-amber-200 text-xs font-mono shadow-2xl backdrop-blur-md"
        >
          {toastMessage}
        </motion.div>
      )}

      {/* MAIN CONTAINER */}
      <main className="relative z-20 px-6 sm:px-12 md:px-20 lg:px-28 max-w-7xl mx-auto space-y-24 pt-8 pb-16">

        {/* HERO SECTION */}
        <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-4">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900 text-amber-100 text-xs sm:text-sm font-mono font-bold shadow-md border border-amber-700">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
            <span>Autumn Season Gateway</span>
            <span className="text-amber-300">•</span>
            <span className="text-emerald-300">Light Golden Atmosphere</span>
          </div>

          {/* Central Dry Leaf Showcase */}
          <div className="flex justify-center my-2">
            <div className="relative group cursor-pointer" onClick={handleCollectLeaf}>
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden p-1.5 bg-gradient-to-br from-amber-400 via-yellow-200 to-amber-500 border-3 border-amber-600 shadow-xl group-hover:scale-105 transition-all duration-300">
                <img
                  src={LEAF_IMAGE_PATH}
                  alt="Yellow autumn Dry single Leaf"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl filter contrast-110"
                />
              </div>
              <span className="absolute -bottom-2.5 -right-2 px-2.5 py-0.5 rounded-full bg-stone-900 border border-amber-400 text-[10px] text-amber-300 font-mono shadow font-bold">
                Detailed Single Leaf 🍂
              </span>
            </div>
          </div>

          {/* EXACT TITLE REQUESTED */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-[#78350f] drop-shadow-sm leading-tight">
            “Not in Season 🙃:) only visible to authorised characters :)”
          </h1>

          {/* Brand & Subtitle */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-serif text-emerald-800 font-bold">
              {SITE_TITLE}
            </h2>
            <p className="text-sm sm:text-base text-amber-950 max-w-2xl mx-auto font-medium leading-relaxed">
              {SITE_SUBTITLE}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-amber-900 max-w-xl mx-auto font-mono font-semibold italic pt-1">
            The leaves have shed their green. Golden autumn is a sacred chamber where only verified souls hold the key.
          </p>
        </section>

        {/* SECTION 1: AUTHORISATION GATE */}
        {!isAuthorized ? (
          <section className="max-w-xl mx-auto p-8 rounded-3xl bg-white border-3 border-amber-500 shadow-2xl text-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-500 mx-auto flex items-center justify-center text-2xl select-none">
              🔏
            </div>

            <div>
              <h3 className="text-xl font-serif font-black text-amber-950">
                Authorised Characters Clearance Check
              </h3>
              <p className="text-xs text-stone-700 mt-1 font-medium">
                Please present your Chapter Passkey, Rule Code, or Oath Fragment.
              </p>
            </div>

            <form onSubmit={handleAuthorize} className="space-y-3">
              <input
                type="text"
                value={authKeyInput}
                onChange={(e) => {
                  setAuthKeyInput(e.target.value);
                  setAuthError("");
                }}
                placeholder="Enter key (e.g. 803, Loyalty, 2015)..."
                className="w-full px-4 py-3 rounded-xl bg-amber-50 border-2 border-amber-400 text-stone-900 text-sm font-mono text-center font-bold focus:border-amber-600 focus:outline-none"
              />

              {authError && (
                <p className="text-xs text-rose-600 font-mono font-bold">
                  {authError}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-mono text-xs font-bold tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  Authorize Entry 🍂
                </button>
                <button
                  type="button"
                  onClick={bypassClearance}
                  className="py-2.5 px-4 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-mono text-xs font-bold border-2 border-amber-300 transition-colors cursor-pointer"
                >
                  Bypass Clearance (Chapter #18)
                </button>
              </div>
            </form>

            <div className="text-[11px] font-mono text-stone-600 border-t border-amber-200 pt-3 flex justify-between font-bold">
              <span>Hints: '803' • 'Loyalty' • '2015'</span>
              <span>Lime Green 💚</span>
            </div>
          </section>
        ) : (
          /* SECTION 2: AUTHORIZED AUTUMN SANCTUARY */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16"
          >
            {/* Clearance Confirmed Banner */}
            <div className="p-6 rounded-3xl bg-white border-3 border-amber-500 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="text-3xl select-none">🧿</div>
                <div>
                  <h4 className="text-base font-serif font-black text-amber-950">
                    Clearance Level: Authorised Chapter Soul
                  </h4>
                  <p className="text-xs text-stone-700 font-medium">
                    You have unlocked the classified seasonal archives of Lime Green 💚.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300">
                  🍂 Collected Leaves: <strong>{collectedLeaves}</strong>
                </span>
                <button
                  onClick={handleCollectLeaf}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold transition-all cursor-pointer shadow"
                >
                  +1 Leaf
                </button>
              </div>
            </div>

            {/* Secret Manuscripts of Rule 803 */}
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-mono text-amber-900 uppercase font-bold tracking-widest">
                  Classified Records
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-amber-950">
                  The Complete Tenets of Autumn
                </h3>
                <p className="text-xs text-stone-700 font-medium">
                  Excerpts unlocked directly from the 803 rules catalog, preserved since 2015.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {RULES_DATA.map((r) => (
                  <div
                    key={r.id}
                    className="p-6 rounded-2xl bg-white border-2 border-amber-300 shadow-md space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-amber-900 font-bold">
                          {r.id === 1
                            ? "Magenta v1"
                            : r.id === 240
                            ? "Magenta V2"
                            : r.id === 512
                            ? "Magenta v3"
                            : `Rule #${r.id}`}
                        </span>
                        <span className="text-emerald-900 text-[10px] bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-bold">
                          {r.status}
                        </span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-stone-900 mt-2">
                        {r.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-700 font-medium mt-1.5 leading-relaxed">
                        {r.text}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-amber-100 text-[11px] font-mono text-stone-600 font-bold flex justify-between">
                      <span>Season Code: 2015–2026</span>
                      <span>Verified ✓</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seasonal Letters */}
            <div className="p-8 sm:p-12 rounded-3xl bg-white border-3 border-amber-500 shadow-xl space-y-6">
              <div className="max-w-3xl space-y-4">
                <span className="text-xs font-mono text-amber-900 uppercase font-bold tracking-wider">
                  Autumn Epilogue
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-amber-950">
                  The Letter Pressed Under The Dry Leaf
                </h3>
                <p className="text-sm sm:text-base text-stone-800 font-medium leading-relaxed italic">
                  “We never wrote the final rule because doing so would mean acknowledging that the season had ended. As long as a single yellow dry leaf still drifts through the air, Lime Green is alive in every unsaid conversation, every late-night tea cup, and every friendship that refused to fade.”
                </p>
                <div className="pt-2 text-xs font-mono text-emerald-800 font-bold">
                  — The 18 Chapters of Lime Green 💚
                </div>
              </div>
            </div>

          </motion.div>
        )}

      </main>

      {/* MINIMALIST ORANGE FOOTER */}
      <Footer onNavigate={(pageId, href) => handleNavigate(pageId, href)} />
    </div>
  );
};
