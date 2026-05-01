import { motion } from "framer-motion";

export const BirthdayCake = () => {
  return (
    <motion.div
      className="relative mx-auto"
      style={{ width: 200, height: 220 }}
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
    >
      {/* Candles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative flex flex-col items-center">
            {/* Flame */}
            <div
              className="w-3 h-5 rounded-full origin-bottom"
              style={{
                background: "radial-gradient(circle at 50% 70%, hsl(45 100% 70%), hsl(20 100% 55%) 60%, transparent)",
                boxShadow: "0 0 14px hsl(45 100% 65%), 0 0 28px hsl(20 100% 55%)",
                animation: `flicker ${1 + i * 0.2}s ease-in-out infinite`,
              }}
            />
            {/* Wick */}
            <div className="w-0.5 h-1 bg-foreground/70" />
            {/* Candle */}
            <div
              className="w-2.5 h-12 rounded-sm"
              style={{
                background: i === 1
                  ? "repeating-linear-gradient(45deg, hsl(var(--pink)), hsl(var(--pink)) 4px, hsl(var(--rose)) 4px, hsl(var(--rose)) 8px)"
                  : i === 0
                  ? "repeating-linear-gradient(45deg, hsl(var(--gold)), hsl(var(--gold)) 4px, hsl(45 80% 50%) 4px, hsl(45 80% 50%) 8px)"
                  : "repeating-linear-gradient(45deg, hsl(var(--purple)), hsl(var(--purple)) 4px, hsl(280 70% 55%) 4px, hsl(280 70% 55%) 8px)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Top tier */}
      <div className="absolute top-[68px] left-1/2 -translate-x-1/2 w-32 h-16 rounded-2xl"
        style={{
          background: "linear-gradient(180deg, hsl(var(--rose)) 0%, hsl(var(--pink)) 100%)",
          boxShadow: "0 6px 20px hsla(330,80%,60%,0.5), inset 0 -6px 12px hsla(0,0%,0%,0.15)",
        }}
      >
        {/* Drips */}
        <div className="absolute -bottom-2 left-2 w-4 h-4 rounded-b-full bg-[hsl(var(--rose))]" />
        <div className="absolute -bottom-3 left-12 w-5 h-5 rounded-b-full bg-[hsl(var(--rose))]" />
        <div className="absolute -bottom-2 right-3 w-4 h-4 rounded-b-full bg-[hsl(var(--rose))]" />
      </div>

      {/* Middle tier */}
      <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-44 h-16 rounded-xl"
        style={{
          background: "linear-gradient(180deg, hsl(var(--purple)) 0%, hsl(280 60% 45%) 100%)",
          boxShadow: "0 6px 20px hsla(280,70%,50%,0.5), inset 0 -6px 12px hsla(0,0%,0%,0.2)",
        }}
      >
        {/* Dots */}
        <div className="flex justify-around items-center h-full px-3">
          {[0,1,2,3,4].map(i => (
            <div key={i} className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--gold))] shadow-[0_0_8px_hsl(var(--gold))]" />
          ))}
        </div>
      </div>

      {/* Bottom tier / plate */}
      <div className="absolute top-[170px] left-1/2 -translate-x-1/2 w-52 h-12 rounded-2xl"
        style={{
          background: "linear-gradient(180deg, hsl(var(--blue)) 0%, hsl(220 70% 50%) 100%)",
          boxShadow: "0 10px 30px hsla(220,80%,50%,0.5), inset 0 -6px 12px hsla(0,0%,0%,0.2)",
        }}
      />
      <div className="absolute top-[200px] left-1/2 -translate-x-1/2 w-60 h-3 rounded-full bg-foreground/20 blur-sm" />
    </motion.div>
  );
};
