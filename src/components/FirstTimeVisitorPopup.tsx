import React, { useState, useEffect } from "react";
import { LOGO_IMAGE_URL } from "../constants/assets";
import { Check, Loader2, Sparkles, Heart } from "lucide-react";

const STORAGE_KEY = "lg_first_time_survey_completed_v1";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqpednjy";

export function FirstTimeVisitorPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [gender, setGender] = useState<"Boy" | "Girl" | null>(null);
  const [wantToKnowLimeGreen, setWantToKnowLimeGreen] = useState<"Yes" | "No" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    try {
      const alreadySubmitted = localStorage.getItem(STORAGE_KEY);
      if (!alreadySubmitted) {
        setIsOpen(true);
      }
    } catch {
      // If localStorage is unavailable, show popup
      setIsOpen(true);
    }
  }, []);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!gender) {
      setValidationError("Please select Boy or Girl to continue.");
      return;
    }

    if (!wantToKnowLimeGreen) {
      setValidationError("Please answer if you want to know about Lime Green 💚.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      gender: gender,
      wants_to_know_about_lime_green: wantToKnowLimeGreen,
      question_1: gender,
      question_2: wantToKnowLimeGreen,
      submitted_at: new Date().toISOString(),
      page_url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.warn("Formspree response not OK, continuing gracefully:", response.status);
      }
    } catch (err) {
      console.warn("Error sending survey to Formspree, persisting locally:", err);
    } finally {
      // Mark as completed in localStorage so user isn't prompted again
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // Fallback
      }

      setSubmittedSuccess(true);
      setIsSubmitting(false);

      // Smoothly dismiss after feedback
      setTimeout(() => {
        setIsOpen(false);
      }, 1200);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="survey-title"
      className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300 select-none"
    >
      {/* Modal Card - White & Red Combination */}
      <div className="relative w-full max-w-md my-auto rounded-3xl shadow-[0_20px_60px_-15px_rgba(220,38,38,0.5)] border-2 border-red-500/40 overflow-hidden transition-all bg-white">
        
        {submittedSuccess ? (
          /* Success Feedback View */
          <div className="p-8 sm:p-10 flex flex-col items-center text-center bg-white">
            <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-500 flex items-center justify-center text-red-600 mb-3 shadow-md">
              <Check className="w-8 h-8 text-red-600 stroke-[3]" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-serif">Welcome to Lime Green 💚</h3>
            <p className="text-sm text-stone-600 mt-1">
              Your response has been saved. Loading experience...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            
            {/* UPPER SECTION: WHITE BACKGROUND (Contains Header, Boy/Girl, and Yes/No) */}
            <div className="bg-white p-5 sm:p-7 text-stone-900">
              
              {/* Header with Emblem */}
              <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
                <div className="relative mb-3 group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-red-600 via-rose-500 to-lime-500 shadow-md">
                    <img
                      src={LOGO_IMAGE_URL}
                      alt="Lime Green Emblem"
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-red-600 border border-white text-[9px] text-white font-mono font-bold shadow">
                    Emblem
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-50 border border-red-200 text-[11px] font-mono text-red-700 font-bold mb-1.5 shadow-xs">
                  <Sparkles className="w-3 h-3 text-red-500" />
                  <span>Welcome to Lime Green 💚</span>
                </div>

                <h2 id="survey-title" className="text-xl sm:text-2xl font-serif font-black tracking-wide text-stone-900">
                  Visitor Introduction
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Please answer before continuing
                </p>
              </div>

              {/* Question 1: Boy or Girl */}
              <div className="mb-5">
                <div className="mb-2">
                  <label className="text-xs sm:text-sm font-bold text-stone-800 tracking-wide">
                    1) Select 1: <span className="text-red-700 font-black">Boy or Girl?</span>
                  </label>
                </div>

                {/* 2 Big Visual Cards: Boy (Blue) & Girl (Wine) */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Boy Button (Blue Colour) */}
                  <button
                    type="button"
                    onClick={() => {
                      setGender("Boy");
                      if (validationError) setValidationError(null);
                    }}
                    className={`relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-center group ${
                      gender === "Boy"
                        ? "bg-gradient-to-b from-blue-600 to-blue-800 border-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.45)] ring-2 ring-blue-400 scale-[1.02]"
                        : "bg-blue-50/70 border-blue-200 hover:border-blue-400 hover:bg-blue-100/60 text-blue-900"
                    }`}
                  >
                    {/* Active check badge */}
                    {gender === "Boy" && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white text-blue-600 flex items-center justify-center shadow">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}

                    {/* Blue Avatar Silhouette Icon */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-105 ${
                        gender === "Boy"
                          ? "bg-white/20 text-white"
                          : "bg-blue-600 text-white shadow-sm"
                      }`}
                    >
                      <svg
                        className="w-6 h-6 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>

                    <span className="text-sm sm:text-base font-bold tracking-wide font-sans">
                      Boy
                    </span>
                  </button>

                  {/* Girl Button (Wine Colour) */}
                  <button
                    type="button"
                    onClick={() => {
                      setGender("Girl");
                      if (validationError) setValidationError(null);
                    }}
                    className={`relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-center group ${
                      gender === "Girl"
                        ? "bg-gradient-to-b from-[#881337] to-[#4c0519] border-[#be123c] text-white shadow-[0_4px_20px_rgba(190,18,60,0.45)] ring-2 ring-rose-400 scale-[1.02]"
                        : "bg-rose-50/70 border-rose-200 hover:border-rose-400 hover:bg-rose-100/60 text-[#881337]"
                    }`}
                  >
                    {/* Active check badge */}
                    {gender === "Girl" && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white text-[#881337] flex items-center justify-center shadow">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}

                    {/* Wine Avatar Silhouette Icon */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-105 ${
                        gender === "Girl"
                          ? "bg-white/20 text-white"
                          : "bg-[#881337] text-white shadow-sm"
                      }`}
                    >
                      <svg
                        className="w-6 h-6 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C9.24 2 7 4.24 7 7c0 2.45 1.76 4.49 4.08 4.93L11 14H9v2h2v2H9v2h2v2h2v-2h2v-2h-2v-2h2v-2h-2l-.08-2.07C15.24 11.49 17 9.45 17 7c0-2.76-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                      </svg>
                    </div>

                    <span className="text-sm sm:text-base font-bold tracking-wide font-sans">
                      Girl
                    </span>
                  </button>
                </div>
              </div>

              {/* Question 2: Do you want to know about Lime Green 💚? */}
              <div>
                <div className="mb-2">
                  <label className="text-xs sm:text-sm font-bold text-stone-800 tracking-wide">
                    2) Do you want to know about{" "}
                    <span className="text-emerald-700 font-black whitespace-nowrap">
                      Lime Green 💚?
                    </span>
                  </label>
                </div>

                {/* 2 Big Visual Buttons: Yes (Lime Green) & No */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Yes Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setWantToKnowLimeGreen("Yes");
                      if (validationError) setValidationError(null);
                    }}
                    className={`relative flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer font-bold ${
                      wantToKnowLimeGreen === "Yes"
                        ? "bg-gradient-to-r from-lime-500 to-emerald-600 border-lime-600 text-stone-950 shadow-[0_4px_18px_rgba(132,204,22,0.5)] ring-2 ring-lime-400 scale-[1.02]"
                        : "bg-emerald-50/60 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-100/50 text-emerald-900"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wantToKnowLimeGreen === "Yes"
                          ? "fill-stone-950 text-stone-950"
                          : "text-emerald-600 fill-emerald-600/30"
                      }`}
                    />
                    <span className="text-sm sm:text-base font-bold">Yes 💚</span>
                  </button>

                  {/* No Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setWantToKnowLimeGreen("No");
                      if (validationError) setValidationError(null);
                    }}
                    className={`relative flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer font-bold ${
                      wantToKnowLimeGreen === "No"
                        ? "bg-stone-800 border-stone-900 text-white shadow-md ring-2 ring-stone-400 scale-[1.02]"
                        : "bg-stone-50 border-stone-200 hover:border-stone-400 hover:bg-stone-100 text-stone-700"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
                      ✕
                    </span>
                    <span className="text-sm sm:text-base font-bold">No</span>
                  </button>
                </div>
              </div>

            </div>

            {/* LOWER SECTION: RED BACKGROUND (Section below Yes or No) */}
            <div className="bg-gradient-to-b from-red-600 via-red-600 to-rose-700 p-5 sm:p-6 text-white border-t border-red-500">
              
              {/* Validation error if user clicked without answering */}
              {validationError && (
                <div className="mb-3 p-2.5 rounded-xl bg-white/95 border-2 border-red-800 text-red-700 text-xs text-center font-bold shadow-md">
                  ⚠️ {validationError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl font-black font-sans text-sm sm:text-base tracking-wide bg-white text-red-600 shadow-[0_6px_20px_rgba(0,0,0,0.25)] hover:bg-red-50 hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed border border-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-red-600" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <span className="text-lg">💚</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
