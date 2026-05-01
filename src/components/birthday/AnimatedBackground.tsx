import { useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = ["hsl(var(--pink))", "hsl(var(--purple))", "hsl(var(--blue))", "hsl(var(--gold))", "hsl(var(--rose))"];

export const AnimatedBackground = () => {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
        color: COLORS[i % COLORS.length],
      })),
    []
  );

  const balloons = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: Math.random() * 95,
        delay: Math.random() * 8,
        duration: 14 + Math.random() * 10,
        size: 28 + Math.random() * 22,
        color: COLORS[i % COLORS.length],
      })),
    []
  );

  const orbs = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 200 + Math.random() * 250,
        color: COLORS[i % COLORS.length],
        duration: 18 + Math.random() * 12,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* Glowing orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{ x: [0, 80, -60, 0], y: [0, -60, 70, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <span
          key={`s-${s.id}`}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Floating balloons */}
      {balloons.map((b) => (
        <div
          key={`b-${b.id}`}
          className="absolute"
          style={{
            left: `${b.left}%`,
            bottom: `-${b.size * 2}px`,
            animation: `float-up ${b.duration}s linear ${b.delay}s infinite`,
          }}
        >
          <div className="relative" style={{ width: b.size, height: b.size * 1.2 }}>
            <div
              className="rounded-full w-full h-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, hsla(0,0%,100%,0.6), ${b.color})`,
                boxShadow: `0 0 20px ${b.color}, inset -4px -8px 12px hsla(0,0%,0%,0.2)`,
              }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                bottom: -4,
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderTop: `8px solid ${b.color}`,
              }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 bg-white/40"
              style={{ top: "100%", width: 1, height: b.size * 1.8 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
