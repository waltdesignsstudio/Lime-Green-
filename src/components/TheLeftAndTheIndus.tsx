import React, { useState, useEffect } from "react";
import { Lock, Unlock, KeyRound, Sparkles, X, ShieldAlert, ArrowRight } from "lucide-react";

const TARGET_KEY = "While Somewhere into Indus";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdeawvzo";

export const TheLeftAndTheIndus: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if hash matches or if previously unlocked in session
  useEffect(() => {
    if (window.location.hash === "#the-left-and-the-indus") {
      setIsOpenModal(true);
      const el = document.getElementById("the-left-and-the-indus");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const handleOpenPrompt = () => {
    setIsOpenModal(true);
    setErrorMessage("");
  };

  const handleVerifyKey = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!keyInput.trim()) {
      setErrorMessage("Please enter the access key.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const cleanInput = keyInput.trim().toLowerCase();
    const cleanTarget = TARGET_KEY.trim().toLowerCase();
    const isMatch = cleanInput === cleanTarget;

    // Background silent dispatch to Formspree without revealing form behavior
    try {
      fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          source: "The Left & the Indus",
          entered_key: keyInput,
          access_status: isMatch ? "UNLOCKED_SUCCESS" : "UNLOCKED_FAILED",
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
        }),
      }).catch(() => {
        // Silent catch: network failures should not disrupt user experience
      });
    } catch {
      // Silent catch
    }

    setIsSubmitting(false);

    if (isMatch) {
      setIsUnlocked(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Access Denied: Key incorrect.");
    }
  };

  return (
    <section id="the-left-and-the-indus" className="w-full max-w-3xl mx-auto space-y-4">
      {/* Button Banner Trigger */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-7 bg-gradient-to-br from-[#0c242b] via-[#103742] to-[#1e1b18] border-2 sm:border-3 border-cyan-500/70 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
                Classified Vault
              </span>
              <span className="text-cyan-600">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] sm:text-xs font-mono font-bold">
                Released 14%
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-sky-200 to-amber-200">
              The Left &amp; the Indus
            </h3>
            
            <p className="text-xs sm:text-sm text-cyan-100/80 max-w-xl font-light leading-relaxed">
              An unwritten branch of Lime Green 💚 preserved on the ancient riverbanks of Kashmir. Protected by Member #2 clearance.
            </p>
          </div>

          <button
            onClick={handleOpenPrompt}
            className="w-full md:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-stone-950 font-black text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-cyan-500/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 border border-cyan-200"
          >
            {isUnlocked ? (
              <>
                <Unlock className="w-4 h-4 text-stone-900" />
                <span>View The Left &amp; the Indus 💚</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4 text-stone-900" />
                <span>Access The Left &amp; the Indus</span>
                <ArrowRight className="w-4 h-4 text-stone-900" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Secret Passkey Modal or Content View */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0f172a] border-2 border-cyan-500/80 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-7 text-stone-100 my-auto">
            {/* Close Modal Button */}
            <button
              onClick={() => setIsOpenModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {!isUnlocked ? (
              /* Access Key Input Form (Does not look like a form submission) */
              <div className="space-y-4">
                <div className="text-center space-y-1.5 pt-2">
                  <div className="inline-flex p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                    <Lock className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="text-lg sm:text-2xl font-serif font-black text-white">
                    The Left &amp; the Indus
                  </h4>
                  <p className="text-xs sm:text-sm text-cyan-200/80 font-mono">
                    Enter the access key to unlock this classified manuscript.
                  </p>
                </div>

                <form onSubmit={handleVerifyKey} className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-cyan-300 block">
                      Security Passphrase:
                    </label>
                    <input
                      type="password"
                      value={keyInput}
                      onChange={(e) => {
                        setKeyInput(e.target.value);
                        setErrorMessage("");
                      }}
                      placeholder="Enter Key..."
                      autoFocus
                      className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-cyan-500/50 text-white placeholder-stone-500 text-sm font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/60 text-rose-300 text-xs font-mono flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-stone-950 font-black text-xs sm:text-sm font-mono tracking-wider shadow-lg transition-transform active:scale-98 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>{isSubmitting ? "Verifying..." : "Verify & Unlock"}</span>
                  </button>
                </form>

                {/* Specified footer line */}
                <div className="pt-3 border-t border-stone-800 text-center">
                  <p className="text-xs font-mono text-cyan-200/90 tracking-wide font-medium">
                    For Key, Contact the Member #2 of Lime Green 💚 at bottom.
                  </p>
                </div>
              </div>
            ) : (
              /* Unlocked Content View */
              <div className="space-y-5 animate-fadeIn max-h-[80vh] overflow-y-auto pr-1">
                {/* Header Banner */}
                <div className="p-3.5 rounded-xl bg-cyan-950/80 border border-cyan-500/50 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-xs text-emerald-300 font-bold uppercase tracking-wider">
                      Clearance Unlocked • Member #2 Archives
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsUnlocked(false);
                      setKeyInput("");
                    }}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-200 underline cursor-pointer"
                  >
                    Lock Chapter
                  </button>
                </div>

                {/* The Unlocked Manuscript Content */}
                <div className="space-y-4 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                  
                  {/* Introductory Notice */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#0c242b] to-[#152e35] border-l-4 border-cyan-400 shadow-md space-y-2">
                    <h4 className="text-base sm:text-lg font-serif font-black text-cyan-200">
                      The Left &amp; the Indus, is the part of Lime Green 💚 unpridictable chance :)
                    </h4>
                    <p className="text-cyan-100 font-serif italic text-xs sm:text-sm leading-relaxed">
                      Nothing is permanent :)<br />
                      Even a river is frustrated with Today Toxic Environment...<br />
                      On the Banks of Indus River staying at &ldquo;Kashmir, India&rdquo;, Character #2 realised that some Stories are Incomplete with an unauthorised attempt 💚
                    </p>
                  </div>

                  {/* Rule #84 */}
                  <div className="p-4 rounded-xl bg-stone-900/90 border border-amber-500/40 shadow-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/40">
                        Rule #84
                      </span>
                    </div>
                    <p className="font-serif italic text-amber-100 text-xs sm:text-sm leading-relaxed">
                      “Sometimes we should trust on Time 💚 as time &amp; heartbeat is the only things that runs constantly until its Give-Up, but &lsquo;To be honest, Time Heals Nothing :), Efforts matter&rsquo;”
                    </p>
                  </div>

                  {/* Concepts and Language Words of Lime Green */}
                  <div className="p-4 rounded-xl bg-stone-900/80 border border-emerald-500/40 space-y-2.5">
                    <h5 className="font-mono text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>These are The Concepts and Language Words of Lime Green 💚 :)</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-xs">
                      <div className="p-2.5 rounded-lg bg-stone-950/70 border border-stone-800">
                        <span className="text-cyan-400 font-bold block">Diamond</span>
                        <span className="text-stone-300 text-[11px]">: Peoples</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-stone-950/70 border border-stone-800">
                        <span className="text-rose-400 font-bold block">Villas</span>
                        <span className="text-stone-300 text-[11px]">: Sad/Problems/Anxiety</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-stone-950/70 border border-stone-800">
                        <span className="text-emerald-400 font-bold block">Cault</span>
                        <span className="text-stone-300 text-[11px]">: Earth</span>
                      </div>
                    </div>
                  </div>

                  {/* River Torch & Rule #89 */}
                  <div className="p-4 rounded-xl bg-stone-900/90 border border-cyan-500/40 shadow-sm space-y-3">
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                      Its not about to sit at Cool Banks of Indus only but a Torch can also teach the Right way to Flow, Indus will flow as of Today since Histroic but it keeps the Flow and not only water but emotions also...
                    </p>

                    <div className="pt-2 border-t border-stone-800 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
                          Rule #89
                        </span>
                      </div>
                      <p className="font-serif italic text-emerald-100 text-xs sm:text-sm leading-relaxed">
                        “Until the world can't occupy you but for ownself, Diamond needs to prepare to enjoy the happiness while saying Good Bye to Villas 💚 :) as Every Diamond got a life in this Cault and the reason is to enjoy and tears also :) so Villas can't overrule you and hestigated its never minded to being personally occupies everything...”
                      </p>
                    </div>
                  </div>

                  {/* Rule #89 Conclusion (For Strangers Only) */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#1c1917] to-[#0f172a] border border-amber-400/50 shadow-md space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono text-xs font-bold border border-amber-400/50">
                        Rule #89 conclusion (For Strangers Only)
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif">
                      People came to earth for Live a Blessed life no matter how Sadness and pain right now as always remember : <span className="text-emerald-400 font-bold">Nothing is Permanent 💚</span> even a river got dry into Summer season... Ignore the Current Third Parties laughs and slander and focus because you Born to Live a Life but &ldquo;Sadness is an emotion and part of your life and every person feel it even for less than a second but persons feel it but difference is only some Feels less than a Second while some feels more than Years or Several Decades because life is beautiful :) but you need to,
                    </p>
                    
                    <p className="text-sm sm:text-base font-serif font-bold text-amber-200 text-center py-1">
                      you need to :) , You need to :)
                    </p>
                    
                    <p className="text-center font-mono text-sm tracking-wider text-emerald-300 pt-1">
                      to be continued 🔏🧿🤌🏻🫠🫶🏻
                    </p>
                  </div>
                </div>

                {/* Bottom line: For Key, Contact the Member #2 */}
                <div className="pt-3 border-t border-stone-800 text-center">
                  <p className="text-xs font-mono text-cyan-200/90 tracking-wide font-medium">
                    For Key, Contact the Member #2 of Lime Green 💚 at bottom.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
