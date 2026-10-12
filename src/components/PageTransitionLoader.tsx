import React, { useEffect, useState } from "react";
import { LEAF_IMAGE_PATH, LOADING_TEXT } from "../constants/assets";
import { motion, AnimatePresence } from "motion/react";

interface PageTransitionLoaderProps {
  isLoading: boolean;
  onFinish?: () => void;
}

export const PageTransitionLoader: React.FC<PageTransitionLoaderProps> = ({
  isLoading,
  onFinish,
}) => {
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onFinish]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0708]/95 backdrop-blur-xl text-center px-6 pointer-events-auto select-none"
      >
        {/* Ambient subtle glow ring */}
        <div className="absolute w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none -bottom-10" />

        {/* Fixed Stationary Yellow Leaf (Does NOT move) */}
        <div className="relative mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-1.5 bg-gradient-to-tr from-amber-500/40 via-yellow-400/30 to-emerald-400/30 shadow-[0_0_40px_rgba(245,158,11,0.35)] border border-amber-400/40">
            <img
              src={LEAF_IMAGE_PATH}
              alt="Yellow Autumn Dry single Leaf"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl filter contrast-110 brightness-105"
            />
          </div>
        </div>

        {/* Loading text exactly as requested */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-3 max-w-lg"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Transitioning Realms
          </div>

          <h2 className="text-xl sm:text-2xl font-serif tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-200 to-emerald-200 drop-shadow-md">
            {LOADING_TEXT}
          </h2>

          <p className="text-xs sm:text-sm text-stone-400 italic">
            Gathering autumn memories across Time, Trust & Loyalty...
          </p>
        </motion.div>

        {/* Progress Bar Line */}
        <div className="w-48 h-1 bg-stone-800/80 rounded-full mt-6 overflow-hidden border border-stone-700/50">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-r from-yellow-500 via-emerald-400 to-amber-500 rounded-full"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
