import React, { useEffect, useRef } from "react";

interface AutumnLeavesFrameProps {
  fillSides?: boolean; // For Red and Denim Blue pages
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
  spriteIndex: number;
}

export const AutumnLeavesFrame: React.FC<AutumnLeavesFrameProps> = ({
  fillSides = true,
  intensity = "normal",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas based drifting leaves optimized with Offscreen Sprite Caching for buttery 60fps & zero lag
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;

    // PRE-RENDER LEAF SPRITES TO OFFSCREEN CANVASES
    // This turns expensive vector path math into ultra-fast hardware-accelerated drawImage calls!
    const leafPalettes = [
      { fill: "#f59e0b", vein: "#92400e" }, // Warm Amber
      { fill: "#eab308", vein: "#78350f" }, // Golden Ochre
      { fill: "#d97706", vein: "#713f12" }, // Rich Russet
      { fill: "#fbbf24", vein: "#b45309" }, // Honey Gold
    ];

    const spriteCanvases: HTMLCanvasElement[] = leafPalettes.map((col) => {
      const sCanvas = document.createElement("canvas");
      const baseDim = 80;
      sCanvas.width = baseDim;
      sCanvas.height = baseDim;
      const sCtx = sCanvas.getContext("2d");
      if (!sCtx) return sCanvas;

      const cx = baseDim / 2;
      const cy = baseDim / 2;
      const leafRadius = 32;

      sCtx.translate(cx, cy);

      // Leaf Blade
      sCtx.beginPath();
      sCtx.moveTo(0, -leafRadius * 1.15);
      sCtx.bezierCurveTo(leafRadius * 0.75, -leafRadius * 0.5, leafRadius * 0.85, leafRadius * 0.35, 0, leafRadius * 1.15);
      sCtx.bezierCurveTo(-leafRadius * 0.85, leafRadius * 0.35, -leafRadius * 0.75, -leafRadius * 0.5, 0, -leafRadius * 1.15);
      sCtx.fillStyle = col.fill;
      sCtx.fill();

      // Main Stem & Vein
      sCtx.beginPath();
      sCtx.moveTo(0, -leafRadius * 1.0);
      sCtx.lineTo(0, leafRadius * 1.3);
      sCtx.strokeStyle = col.vein;
      sCtx.lineWidth = 2.2;
      sCtx.lineCap = "round";
      sCtx.stroke();

      // Delicate Side Veins
      const sideVeins = [-0.4, 0.1];
      sideVeins.forEach((yRatio) => {
        sCtx.beginPath();
        sCtx.moveTo(0, leafRadius * yRatio);
        sCtx.lineTo(leafRadius * 0.42, leafRadius * (yRatio + 0.18));
        sCtx.moveTo(0, leafRadius * yRatio);
        sCtx.lineTo(-leafRadius * 0.42, leafRadius * (yRatio + 0.18));
        sCtx.strokeStyle = col.vein;
        sCtx.lineWidth = 1.3;
        sCtx.stroke();
      });

      return sCanvas;
    });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Optimized particle count: 8 on mobile, 18 on desktop (eliminates CPU/GPU strain)
    const count = isMobile ? 8 : intensity === "dense" ? 20 : 14;
    const leaves: ParticleLeaf[] = [];

    for (let i = 0; i < count; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isMobile ? 18 + Math.random() * 12 : 24 + Math.random() * 18,
        speedY: 0.5 + Math.random() * 0.8,
        speedX: -0.25 + Math.random() * 0.5,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.2,
        swayAmp: 12 + Math.random() * 20,
        swaySpeed: 0.015 + Math.random() * 0.015,
        swayOffset: Math.random() * 100,
        opacity: 0.5 + Math.random() * 0.35,
        spriteIndex: i % spriteCanvases.length,
      });
    }

    let time = 0;
    let isRunning = true;

    const onVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
      } else {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const render = () => {
      if (!isRunning) return;
      time += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];
        leaf.y += leaf.speedY;
        leaf.x += leaf.speedX + Math.sin(time * leaf.swaySpeed + leaf.swayOffset) * 0.5;
        leaf.rotation += leaf.rotSpeed;

        if (leaf.y > height + 40) {
          leaf.y = -35;
          leaf.x = Math.random() * width;
        }
        if (leaf.x < -40) leaf.x = width + 30;
        if (leaf.x > width + 40) leaf.x = -30;

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate((leaf.rotation * Math.PI) / 180);
        ctx.globalAlpha = leaf.opacity;

        const sprite = spriteCanvases[leaf.spriteIndex];
        const half = leaf.size / 2;
        ctx.drawImage(sprite, -half, -half, leaf.size, leaf.size);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <>
      {/* Drifting Leaves Canvas: zero lag, 100% width and height, pointer events none */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      />

      {/* Side borders: Only rendered on desktop (lg:flex, hidden on mobile/tablet)
          This ensures 100% full-screen coverage for all content on mobile with zero text overlap! */}
      {fillSides && (
        <>
          {/* LEFT BORDER - Continuous Layered Dry Leaves */}
          <div
            className="hidden lg:flex fixed top-0 bottom-0 left-0 w-16 pointer-events-none z-10 overflow-hidden flex-col justify-between"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-transparent" />
            <div className="relative w-full h-full flex flex-col justify-around items-start">
              {Array.from({ length: 10 }).map((_, idx) => {
                const rotation = -15 + (idx % 4) * 8;
                return (
                  <div
                    key={`left-leaf-${idx}`}
                    className="relative -my-2 select-none opacity-80"
                    style={{
                      transform: `rotate(${rotation}deg) scale(0.85)`,
                    }}
                  >
                    <svg viewBox="0 0 110 130" className="w-12 h-14">
                      <path
                        d="M 55,5 C 75,20 100,45 80,75 C 95,95 75,115 55,125 C 35,115 15,95 30,75 C 10,45 35,20 55,5 Z"
                        fill="#d97706"
                      />
                      <path
                        d="M 55,5 L 55,128 M 55,30 Q 75,22 90,28 M 55,50 Q 80,45 92,60 M 55,75 Q 78,72 85,90 M 55,30 Q 35,22 20,28 M 55,50 Q 30,45 18,60 M 55,75 Q 32,72 25,90"
                        stroke="#78350f"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT BORDER - Continuous Layered Dry Leaves */}
          <div
            className="hidden lg:flex fixed top-0 bottom-0 right-0 w-16 pointer-events-none z-10 overflow-hidden flex-col justify-between"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-amber-600/10 to-transparent" />
            <div className="relative w-full h-full flex flex-col justify-around items-end">
              {Array.from({ length: 10 }).map((_, idx) => {
                const rotation = 15 - (idx % 4) * 8;
                return (
                  <div
                    key={`right-leaf-${idx}`}
                    className="relative -my-2 select-none opacity-80"
                    style={{
                      transform: `rotate(${rotation}deg) scale(0.85) scaleX(-1)`,
                    }}
                  >
                    <svg viewBox="0 0 110 130" className="w-12 h-14">
                      <path
                        d="M 55,5 C 75,20 100,45 80,75 C 95,95 75,115 55,125 C 35,115 15,95 30,75 C 10,45 35,20 55,5 Z"
                        fill="#ea580c"
                      />
                      <path
                        d="M 55,5 L 55,128 M 55,30 Q 75,22 90,28 M 55,50 Q 80,45 92,60 M 55,75 Q 78,72 85,90 M 55,30 Q 35,22 20,28 M 55,50 Q 30,45 18,60 M 55,75 Q 32,72 25,90"
                        stroke="#78350f"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};
