import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";

interface AutumnLeavesFrameProps {
  fillSides?: boolean; // For Red and Denim Blue pages to fill both sides with zero gaps
  intensity?: "normal" | "dense";
}

interface ParticleLeaf {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  swayAmp: number;
  swaySpeed: number;
  swayOffset: number;
  opacity: number;
  type: number;
  colorVariant: number;
}

export const AutumnLeavesFrame: React.FC<AutumnLeavesFrameProps> = ({
  fillSides = true,
  intensity = "normal",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const count = intensity === "dense" ? 45 : 32;
    const leaves: ParticleLeaf[] = [];

    for (let i = 0; i < count; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 16 + Math.random() * 26,
        speedY: 0.7 + Math.random() * 1.5,
        speedX: -0.5 + Math.random() * 1.0,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2.2,
        swayAmp: 20 + Math.random() * 35,
        swaySpeed: 0.015 + Math.random() * 0.025,
        swayOffset: Math.random() * 100,
        opacity: 0.55 + Math.random() * 0.4,
        type: Math.floor(Math.random() * 3),
        colorVariant: Math.floor(Math.random() * 4),
      });
    }

    // Draw high-detail realistic autumn leaf with veins
    const drawRealisticLeaf = (
      ctx: CanvasRenderingContext2D,
      size: number,
      type: number,
      colorVariant: number
    ) => {
      ctx.save();

      // Shadow for depth
      ctx.shadowColor = "rgba(120, 53, 15, 0.35)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 3;

      // Leaf contour
      ctx.beginPath();
      if (type === 0) {
        // Detailed Maple / Oak hybrid with 5 lobes
        ctx.moveTo(0, -size * 1.1); // Tip
        ctx.bezierCurveTo(size * 0.35, -size * 0.9, size * 0.75, -size * 0.6, size * 0.55, -size * 0.3); // Top lobe right
        ctx.bezierCurveTo(size * 0.85, -size * 0.1, size * 0.9, size * 0.3, size * 0.5, size * 0.5); // Mid lobe right
        ctx.bezierCurveTo(size * 0.6, size * 0.75, size * 0.35, size * 0.95, 0, size * 1.05); // Bottom lobe right to base
        ctx.bezierCurveTo(-size * 0.35, size * 0.95, -size * 0.6, size * 0.75, -size * 0.5, size * 0.5); // Bottom left
        ctx.bezierCurveTo(-size * 0.9, size * 0.3, -size * 0.85, -size * 0.1, -size * 0.55, -size * 0.3); // Mid left
        ctx.bezierCurveTo(-size * 0.75, -size * 0.6, -size * 0.35, -size * 0.9, 0, -size * 1.1); // Top left to tip
      } else if (type === 1) {
        // Detailed Birch / Beech serrated leaf
        ctx.moveTo(0, -size * 1.2);
        ctx.bezierCurveTo(size * 0.65, -size * 0.7, size * 0.75, size * 0.2, size * 0.2, size * 0.9);
        ctx.lineTo(0, size * 1.15);
        ctx.lineTo(-size * 0.2, size * 0.9);
        ctx.bezierCurveTo(-size * 0.75, size * 0.2, -size * 0.65, -size * 0.7, 0, -size * 1.2);
      } else {
        // Curling crisp dry autumn leaf
        ctx.moveTo(-size * 0.15, -size * 1.1);
        ctx.quadraticCurveTo(size * 0.8, -size * 0.3, size * 0.45, size * 0.7);
        ctx.quadraticCurveTo(size * 0.2, size * 1.05, 0, size * 1.2);
        ctx.quadraticCurveTo(-size * 0.3, size * 0.9, -size * 0.55, size * 0.5);
        ctx.quadraticCurveTo(-size * 0.75, -size * 0.3, -size * 0.15, -size * 1.1);
      }

      // Rich gradient representing dry yellow autumn foliage
      const grad = ctx.createLinearGradient(0, -size * 1.1, size * 0.5, size * 1.1);
      if (colorVariant === 0) {
        grad.addColorStop(0, "#fbbf24"); // Bright golden amber
        grad.addColorStop(0.4, "#f59e0b"); // Warm honey
        grad.addColorStop(0.75, "#d97706"); // Ochre
        grad.addColorStop(1, "#92400e"); // Russet dry tip
      } else if (colorVariant === 1) {
        grad.addColorStop(0, "#fde047"); // Crisp yellow
        grad.addColorStop(0.45, "#eab308"); // Golden yellow
        grad.addColorStop(0.8, "#b45309"); // Amber dry
        grad.addColorStop(1, "#78350f"); // Deep dry autumn brown
      } else if (colorVariant === 2) {
        grad.addColorStop(0, "#fcd34d"); // Honey gold
        grad.addColorStop(0.5, "#d97706"); // Burnt amber
        grad.addColorStop(1, "#854d0e"); // Weathered gold
      } else {
        grad.addColorStop(0, "#fef08a"); // Pale dry yellow
        grad.addColorStop(0.4, "#f59e0b"); // Amber
        grad.addColorStop(0.85, "#b45309"); // Rust
        grad.addColorStop(1, "#713f12"); // Dark dry vein
      }
      ctx.fillStyle = grad;
      ctx.fill();

      // Reset shadow for fine vein lines
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Primary Midrib Vein
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.05);
      ctx.quadraticCurveTo(size * 0.04, 0, 0, size * 1.35); // Stem extends beyond base
      ctx.strokeStyle = "rgba(113, 63, 18, 0.75)";
      ctx.lineWidth = Math.max(1.2, size * 0.05);
      ctx.stroke();

      // Intricate Secondary Lateral Veins
      const veinPairs = 5;
      for (let v = 1; v <= veinPairs; v++) {
        const yFrac = -size * 0.8 + (v / veinPairs) * size * 1.5;
        const span = (size * 0.45) * Math.sin((v / veinPairs) * Math.PI);

        // Right vein branch
        ctx.beginPath();
        ctx.moveTo(0, yFrac);
        ctx.quadraticCurveTo(span * 0.5, yFrac - size * 0.1, span, yFrac - size * 0.2);
        ctx.strokeStyle = "rgba(113, 63, 18, 0.45)";
        ctx.lineWidth = Math.max(0.7, size * 0.025);
        ctx.stroke();

        // Left vein branch
        ctx.beginPath();
        ctx.moveTo(0, yFrac);
        ctx.quadraticCurveTo(-span * 0.5, yFrac - size * 0.1, -span, yFrac - size * 0.2);
        ctx.strokeStyle = "rgba(113, 63, 18, 0.45)";
        ctx.lineWidth = Math.max(0.7, size * 0.025);
        ctx.stroke();
      }

      ctx.restore();
    };

    let time = 0;
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];
        leaf.y += leaf.speedY;
        leaf.x += leaf.speedX + Math.sin(time * leaf.swaySpeed + leaf.swayOffset) * 0.8;
        leaf.rotation += leaf.rotSpeed;

        if (leaf.y > height + 60) {
          leaf.y = -50;
          leaf.x = Math.random() * width;
        }
        if (leaf.x < -60) leaf.x = width + 50;
        if (leaf.x > width + 60) leaf.x = -50;

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate((leaf.rotation * Math.PI) / 180);
        ctx.globalAlpha = leaf.opacity;

        drawRealisticLeaf(ctx, leaf.size, leaf.type, leaf.colorVariant);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <>
      {/* Drifting Leaves Canvas across entire screen */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-20"
        style={{ width: "100vw", height: "100vh" }}
      />

      {/* Side borders filled with Detailed Realistic Dry Leaves with ZERO gaps */}
      {fillSides && (
        <>
          {/* LEFT BORDER - Continuous Layered Dry Autumn Leaves with zero gaps */}
          <div
            className="fixed top-0 bottom-0 left-0 w-8 sm:w-16 md:w-20 lg:w-24 pointer-events-none z-30 overflow-hidden flex flex-col justify-between"
            aria-hidden="true"
          >
            {/* Ambient amber side gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-yellow-500/10 to-transparent" />

            {/* Repeating vertical leaf clusters ensuring no gaps from top to bottom */}
            <div className="relative w-full h-full flex flex-col justify-around items-start">
              {Array.from({ length: 15 }).map((_, idx) => {
                const rotation = -15 + (idx % 5) * 10;
                const scale = 0.9 + ((idx * 7) % 5) * 0.08;
                const offsetX = -8 + ((idx * 11) % 5) * 4;
                return (
                  <motion.div
                    key={`left-leaf-${idx}`}
                    animate={{
                      rotate: [rotation, rotation + 7, rotation - 4, rotation],
                      x: [offsetX, offsetX + 3, offsetX],
                    }}
                    transition={{
                      duration: 4 + (idx % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative -my-3 sm:-my-4 select-none opacity-95 hover:opacity-100 transition-opacity"
                    style={{
                      transform: `scale(${scale})`,
                      filter: "drop-shadow(2px 4px 6px rgba(113,63,18,0.35))",
                    }}
                  >
                    <svg
                      viewBox="0 0 110 130"
                      className="w-12 h-16 sm:w-16 sm:h-22 drop-shadow-md"
                    >
                      {/* Leaf Blade with multi-lobed crisp perimeter */}
                      <path
                        d="M 55,5 C 75,20 100,45 80,75 C 95,95 75,115 55,125 C 35,115 15,95 30,75 C 10,45 35,20 55,5 Z"
                        fill="url(#leftRealisticLeafGrad)"
                      />
                      {/* Main Stem & Midrib */}
                      <path
                        d="M 55,5 L 55,128 M 55,125 L 55,135"
                        stroke="#78350f"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Detailed Lateral Vein Network */}
                      <path
                        d="M 55,30 Q 75,22 90,28 M 55,50 Q 80,45 92,60 M 55,75 Q 78,72 85,90 M 55,95 Q 72,96 76,110"
                        stroke="#92400e"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.8"
                      />
                      <path
                        d="M 55,30 Q 35,22 20,28 M 55,50 Q 30,45 18,60 M 55,75 Q 32,72 25,90 M 55,95 Q 38,96 34,110"
                        stroke="#92400e"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.8"
                      />
                      {/* Tertiary micro-vein details */}
                      <path
                        d="M 70,25 L 75,18 M 72,48 L 78,40 M 68,73 L 73,65"
                        stroke="#b45309"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                    </svg>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT BORDER - Continuous Layered Dry Autumn Leaves with zero gaps */}
          <div
            className="fixed top-0 bottom-0 right-0 w-8 sm:w-16 md:w-20 lg:w-24 pointer-events-none z-30 overflow-hidden flex flex-col justify-between"
            aria-hidden="true"
          >
            {/* Ambient amber side gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-l from-amber-600/20 via-yellow-500/10 to-transparent" />

            {/* Repeating vertical leaf clusters ensuring no gaps from top to bottom */}
            <div className="relative w-full h-full flex flex-col justify-around items-end">
              {Array.from({ length: 15 }).map((_, idx) => {
                const rotation = 15 - (idx % 5) * 10;
                const scale = 0.9 + ((idx * 9) % 5) * 0.08;
                const offsetX = 8 - ((idx * 13) % 5) * 4;
                return (
                  <motion.div
                    key={`right-leaf-${idx}`}
                    animate={{
                      rotate: [rotation, rotation - 7, rotation + 4, rotation],
                      x: [offsetX, offsetX - 3, offsetX],
                    }}
                    transition={{
                      duration: 4.2 + (idx % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative -my-3 sm:-my-4 select-none opacity-95 hover:opacity-100 transition-opacity"
                    style={{
                      transform: `scale(${scale})`,
                      filter: "drop-shadow(-2px 4px 6px rgba(113,63,18,0.35))",
                    }}
                  >
                    <svg
                      viewBox="0 0 110 130"
                      className="w-12 h-16 sm:w-16 sm:h-22 drop-shadow-md scale-x-[-1]"
                    >
                      <path
                        d="M 55,5 C 75,20 100,45 80,75 C 95,95 75,115 55,125 C 35,115 15,95 30,75 C 10,45 35,20 55,5 Z"
                        fill="url(#rightRealisticLeafGrad)"
                      />
                      <path
                        d="M 55,5 L 55,128 M 55,125 L 55,135"
                        stroke="#78350f"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 55,30 Q 75,22 90,28 M 55,50 Q 80,45 92,60 M 55,75 Q 78,72 85,90 M 55,95 Q 72,96 76,110"
                        stroke="#92400e"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.8"
                      />
                      <path
                        d="M 55,30 Q 35,22 20,28 M 55,50 Q 30,45 18,60 M 55,75 Q 32,72 25,90 M 55,95 Q 38,96 34,110"
                        stroke="#92400e"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.8"
                      />
                      <path
                        d="M 70,25 L 75,18 M 72,48 L 78,40 M 68,73 L 73,65"
                        stroke="#b45309"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                    </svg>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* SVG Gradients for high quality realistic crisp dry leaves */}
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <linearGradient id="leftRealisticLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="35%" stopColor="#f59e0b" />
                <stop offset="70%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#92400e" />
              </linearGradient>
              <linearGradient id="rightRealisticLeafGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="35%" stopColor="#ea580c" />
                <stop offset="75%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>
          </svg>
        </>
      )}
    </>
  );
};
