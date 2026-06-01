import { useMemo, useEffect, useState } from "react";

const COLORS = ["hsl(var(--pink))", "hsl(var(--purple))", "hsl(var(--blue))", "hsl(var(--gold))", "hsl(var(--rose))"];

export const AnimatedBackground = () => {
  // 1. Check screen size to reduce element count on mobile
  const [isMobile, setIsMobile] = useState(true); // Default true for faster initial mobile load

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice(); // Check on mount
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Element counts based on device
  const counts = {
    sparkles: isMobile ? 20 : 60,
    balloons: isMobile ? 5 : 12,
    orbs: isMobile ? 2 : 5,
  };

  const sparkles = useMemo(
    () =>
      Array.from({ length: counts.sparkles }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 2,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
        color: COLORS[i % COLORS.length],
      })),
    [counts.sparkles]
  );

  const balloons = useMemo(
    () =>
      Array.from({ length: counts.balloons }).map((_, i) => ({
        id: i,
        left: Math.random() * 95,
        delay: Math.random() * 8,
        duration: 14 + Math.random() * 10,
        size: 28 + Math.random() * 22,
        color: COLORS[i % COLORS.length],
      })),
    [counts.balloons]
  );

  const orbs = useMemo(
    () =>
      Array.from({ length: counts.orbs }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 200 + Math.random() * 250,
        color: COLORS[i % COLORS.length],
        duration: 18 + Math.random() * 12,
        delay: Math.random() * -10, // Negative delay to start at different animation points
      })),
    [counts.orbs]
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10 bg-transparent">
      {/* Glowing orbs - Moved to CSS for GPU acceleration */}
      {orbs.map((orb) => (
        <div
          key={`orb-${orb.id}`}
          className="absolute rounded-full opacity-30 orb-animate"
          style={{
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
            willChange: "transform", // Hint browser for GPU boost
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <span
          key={`s-${s.id}`}
          className="absolute rounded-full sparkle-animate"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Floating balloons */}
      {balloons.map((b) => (
        <div
          key={`b-${b.id}`}
          className="absolute balloon-animate"
          style={{
            left: `${b.left}%`,
            bottom: `-100px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            willChange: "transform",
          }}
        >
          <div className="relative" style={{ width: b.size, height: b.size * 1.2 }}>
            <div
              className="rounded-full w-full h-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, hsla(0,0%,100%,0.6), ${b.color})`,
                boxShadow: `inset -4px -8px 12px hsla(0,0%,0%,0.1)`, // Removed outer shadow for performance
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