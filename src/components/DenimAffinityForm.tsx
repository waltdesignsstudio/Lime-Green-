import React, { useState } from "react";
import { Check, Loader2, Sparkles, Send } from "lucide-react";
import { LOGO_IMAGE_URL } from "../constants/assets";

interface Question {
  id: number;
  text: string;
  options: {
    key: string;
    label: string;
    text: string;
  }[];
  targetKey: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "1) Why you have came  for?",
    options: [
      { key: "(i)", label: "(i)", text: "To Know about Lime Green 💚" },
      { key: "(ii)", label: "(ii)", text: "you thought intresting" },
      { key: "(iii)", label: "(iii)", text: "You have to nothing to do ?" },
    ],
    targetKey: "(ii)",
  },
  {
    id: 2,
    text: "2) Do you have or had any loved ones ?",
    options: [
      { key: "(i)", label: "(i)", text: "Yes" },
      { key: "(ii)", label: "(ii)", text: "No" },
      { key: "(iii)", label: "(iii)", text: "Unauthorised" },
    ],
    targetKey: "(iii)",
  },
  {
    id: 3,
    text: "3) Is this autumn ?",
    options: [
      { key: "(i)", label: "(i)", text: "Yes" },
      { key: "(ii)", label: "(ii)", text: "No" },
    ],
    targetKey: "(i)",
  },
  {
    id: 4,
    text: "4) Ever think about Someone at 2 ?",
    options: [
      { key: "(i)", label: "(i)", text: "Yes" },
      { key: "(ii)", label: "(ii)", text: "No" },
      { key: "(iii)", label: "(iii)", text: "May not" },
    ],
    targetKey: "(i)",
  },
];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xljgwkvy";

export const DenimAffinityForm: React.FC = () => {
  const [answers, setAnswers] = useState<{ [qId: number]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSelect = (questionId: number, optionKey: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
    if (validationError) setValidationError(null);
  };

  const calculateScore = () => {
    // Condition: 1) = (ii), 2) = (iii), 3) = (i), 4) = (i)
    const isTargetMatch =
      answers[1] === "(ii)" &&
      answers[2] === "(iii)" &&
      answers[3] === "(i)" &&
      answers[4] === "(i)";

    if (isTargetMatch) {
      return 63;
    }

    // If not matching, count partial matches but NEVER drop below 54%
    let matches = 0;
    if (answers[1] === "(ii)") matches++;
    if (answers[2] === "(iii)") matches++;
    if (answers[3] === "(i)") matches++;
    if (answers[4] === "(i)") matches++;

    // Partial scoring: 0 match = 54%, 1 match = 56%, 2 match = 58%, 3 match = 60%
    const computed = 54 + Math.round((matches / 4) * 6);
    return Math.max(54, Math.min(60, computed));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check that all 4 questions are answered
    if (Object.keys(answers).length < QUESTIONS.length) {
      setValidationError("Please select an answer for all 4 questions to submit.");
      return;
    }

    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setSubmitting(true);
    setValidationError(null);

    // Format readable answers for Formspree
    const payload = {
      q1_why_you_have_came_for: answers[1]
        ? `${answers[1]} ${QUESTIONS[0].options.find((o) => o.key === answers[1])?.text}`
        : "",
      q2_loved_ones: answers[2]
        ? `${answers[2]} ${QUESTIONS[1].options.find((o) => o.key === answers[2])?.text}`
        : "",
      q3_is_this_autumn: answers[3]
        ? `${answers[3]} ${QUESTIONS[2].options.find((o) => o.key === answers[3])?.text}`
        : "",
      q4_think_about_someone_at_2: answers[4]
        ? `${answers[4]} ${QUESTIONS[3].options.find((o) => o.key === answers[4])?.text}`
        : "",
      calculated_affinity: `${calculatedScore}%`,
      target_reached_63: calculatedScore === 63 ? "Yes (Reached 63%)" : "No",
      submitted_at: new Date().toLocaleString(),
    };

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.warn("Formspree response not 200, continuing with local confirmation", res.status);
      }
    } catch (err) {
      console.warn("Network error during Formspree submit:", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Section Header */}
      <div className="text-center space-y-1.5 px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900 text-sky-100 text-[10px] sm:text-xs font-mono font-bold border border-blue-700 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>Denim Blue Inquiry Form</span>
          <span className="text-blue-300">•</span>
          <span className="text-emerald-300">Affinity Test</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-serif font-black text-[#0c2e4e] tracking-tight">
          Question & Answer Affinity Assessment
        </h2>
        <p className="text-xs sm:text-sm text-[#1b4368] font-medium max-w-xl mx-auto leading-relaxed">
          Answer the 4 core inquiries below to evaluate your resonant percentage in Lime Green 💚.
        </p>
      </div>

      {/* Main Card Container */}
      <div className="w-full bg-white/95 rounded-2xl sm:rounded-3xl border-2 border-blue-400 shadow-xl overflow-hidden p-4 sm:p-8">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-7">
            {/* Questions Grid */}
            <div className="space-y-5 sm:space-y-6">
              {QUESTIONS.map((q) => {
                const selectedKey = answers[q.id];

                return (
                  <div
                    key={q.id}
                    className="p-3.5 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200/90 hover:border-blue-300 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs sm:text-base font-serif font-black text-[#0c2e4e] leading-snug">
                        {q.text}
                      </h3>
                      {selectedKey && (
                        <span className="shrink-0 px-2 py-0.5 rounded-full bg-blue-700 text-white text-[10px] font-mono font-bold shadow-sm">
                          Selected {selectedKey}
                        </span>
                      )}
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                      {q.options.map((opt) => {
                        const isSelected = selectedKey === opt.key;

                        return (
                          <button
                            type="button"
                            key={opt.key}
                            onClick={() => handleSelect(q.id, opt.key)}
                            className={`p-2.5 sm:p-3 rounded-xl text-left border-2 transition-all flex items-center justify-between gap-2 cursor-pointer ${
                              isSelected
                                ? "bg-gradient-to-r from-blue-700 to-indigo-800 text-white border-blue-900 shadow-md ring-2 ring-blue-400/50"
                                : "bg-white text-stone-800 border-blue-200 hover:border-blue-400 hover:bg-blue-100/50"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className={`text-[11px] sm:text-xs font-mono font-black shrink-0 px-1.5 py-0.5 rounded ${
                                  isSelected
                                    ? "bg-white/20 text-white"
                                    : "bg-blue-100 text-blue-900"
                                }`}
                              >
                                {opt.label}
                              </span>
                              <span className="text-xs sm:text-sm font-medium leading-snug break-words">
                                {opt.text}
                              </span>
                            </div>

                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                                isSelected
                                  ? "bg-emerald-400 border-emerald-300 text-stone-950"
                                  : "border-stone-300 bg-stone-50"
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Validation Message */}
            {validationError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs sm:text-sm font-bold text-center animate-shake">
                ⚠️ {validationError}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-blue-100">
              <span className="text-[11px] sm:text-xs text-stone-500 font-mono">
                {Object.keys(answers).length} of {QUESTIONS.length} questions completed
              </span>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg active:scale-95 transition-all cursor-pointer border-2 border-blue-400 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Calculating & Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Responses & Calculate Affinity 💚</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* RESULT DISPLAY CARD */
          <div className="space-y-6 text-center py-4">
            {/* Result Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-950 text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Assessment Completed & Archived</span>
            </div>

            {/* Big Score Display */}
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50 border-2 border-blue-400 shadow-md space-y-3">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md">
                  <img
                    src={LOGO_IMAGE_URL}
                    alt="Lime Green Emblem"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">
                  Your Resonant Result
                </span>
                <div className="text-4xl sm:text-5xl font-mono font-black text-blue-950 mt-1">
                  {score}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="relative w-full h-4 bg-stone-200 rounded-full overflow-hidden border border-blue-300">
                  <div
                    className={`h-full transition-all duration-700 rounded-full ${
                      score === 63
                        ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500"
                        : "bg-gradient-to-r from-blue-500 to-indigo-600"
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-stone-600 font-bold px-1">
                  <span>Minimum (54%)</span>
                  <span className="text-emerald-700 font-black">★ Benchmark (62%)</span>
                  <span>Target (63%)</span>
                </div>
              </div>

              {/* Explanatory Banner */}
              <div className="pt-2 text-xs sm:text-sm font-medium leading-relaxed">
                {score === 63 ? (
                  <div className="p-3 rounded-xl bg-emerald-100/80 border border-emerald-400 text-emerald-950 font-bold">
                    🎉 63% Affinity Reached! Your answers perfectly align with the Lime Green 💚 criteria, surpassing the 62% benchmark requirement!
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-blue-100/80 border border-blue-300 text-blue-950 font-bold">
                    Resonance evaluated at {score}%. (Score held above the 54% floor). Your answers have been archived successfully.
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};
