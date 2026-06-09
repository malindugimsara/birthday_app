import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHEEL_ITEMS = [
  { label: "Pizza එකක්", icon: "🍕", color: "#ef4444" },
  { label: "Movie ටිකට් 2ක්", icon: "🎬", color: "#f97316" },
  { label: "Surprise Gift", icon: "🎁", color: "#06b6d4" }, 
  { label: "Chocolate එකක්", icon: "🍫", color: "#10b981" },
  { label: "ඇදුමක්", icon: "👕", color: "#8b5cf6" },
  { label: "කෝපි එකක්", icon: "☕", color: "#06b6d4" },
  { label: "ආයේ කරකවන්න", icon: "🔄", color: "#ef4444" },
  { label: "Bag යමු", icon: "🛍️", color: "#f97316" },
  { label: "Phone Reload", icon: "📱", color: "#3b82f6" },
  { label: "Ice Cream", icon: "🍦", color: "#10b981" },
  { label: "Surprise Gift", icon: "🎁", color: "#06b6d4" },
  { label: "මොකුත් නෑ", icon: "😭", color: "#8b5cf6" },
];

export const SpinWheel = ({ onComplete }: { onComplete?: (prize: string) => void }) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const wheelRef = useRef(null);
  
  const totalItems = WHEEL_ITEMS.length;
  const segmentAngle = 360 / totalItems;

  const backgroundGradient = useMemo(() => {
    return `conic-gradient(from 90deg, ${WHEEL_ITEMS.map(
      (item, i) => `${item.color} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`
    ).join(", ")})`;
  }, [segmentAngle]);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setSelectedPrize(null);

    const winningIndex = 2; // හැමතිස්සෙම මොකුත් නෑ එකට එන්න
    
    const currentItemAngle = (winningIndex * segmentAngle) + (segmentAngle / 2);
    const baseTargetAngle = 180 - currentItemAngle; 
    
    const randomOffset = (Math.random() * (segmentAngle - 4)) - ((segmentAngle - 4) / 2);
    
    if (wheelRef.current) {
      const previousSpins = parseInt(wheelRef.current.getAttribute('data-spins') || '0');
      const newSpins = previousSpins + 1;
      
      const newRotation = (newSpins * 6 * 360) + baseTargetAngle + randomOffset;
      
      wheelRef.current.style.transition = `transform 4s cubic-bezier(0.15, 0.95, 0.25, 1)`;
      wheelRef.current.style.transform = `rotate(${newRotation}deg) translateZ(0)`;
      wheelRef.current.setAttribute('data-spins', newSpins.toString());
    }

    setTimeout(() => {
      const prize = WHEEL_ITEMS[winningIndex].label;
      setSelectedPrize(prize);
      setSpinning(false);
      if (onComplete) onComplete(prize);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-8 w-full">
      <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px]">
        
        {/* Pointer */}
        <div className="absolute top-1/2 -left-6 sm:-left-8 -translate-y-1/2 z-20 pointer-shadow">
          <div className="w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-l-[30px] border-l-gray-200"></div>
          <div className="absolute top-1/2 left-[-28px] -translate-y-1/2 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[24px] border-l-white"></div>
        </div>

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full overflow-hidden relative border-4 border-white"
          style={{ 
            background: backgroundGradient,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            willChange: "transform"
          }}
          data-spins="0"
        >
          {WHEEL_ITEMS.map((item, index) => {
            const rotation = index * segmentAngle + (segmentAngle / 2);
            return (
              <div
                key={index}
                // pl-[52px] sm:pl-[64px] දීලා මැද රවුමෙන් එළියට text එක තල්ලු කළා
                className="absolute top-1/2 left-1/2 w-[50%] origin-left flex items-center justify-end pr-2 sm:pr-4 pl-[52px] sm:pl-[64px]"
                style={{ transform: `translateY(-50%) rotate(${rotation}deg)` }}
              >
                <span 
                  // දිග වචන පේළි දෙකකට කැඩෙන්න max-w සහ leading දුන්නා
                  className="text-white font-bold text-[9.5px] sm:text-[11px] tracking-wide mr-1 sm:mr-2 text-right leading-[1.2] max-w-[65px] sm:max-w-[80px]"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                >
                  {item.label}
                </span>
                <span className="text-sm sm:text-xl shrink-0" style={{ filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.3))" }}>
                  {item.icon}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div 
            onClick={handleSpin}
            whileHover={{ scale: spinning ? 1 : 1.05 }}
            whileTap={{ scale: spinning ? 1 : 0.95 }}
            className={`w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center border-[4px] border-gray-100 shadow-[0_0_15px_rgba(0,0,0,0.15)] ${spinning ? 'cursor-default' : 'cursor-pointer'}`}
          >
              <div className="text-center pointer-events-none">
                  <span className="text-sm sm:text-base font-bold text-gray-800 block">🌸 Spring 🌸</span>
                  <span className="text-[10px] text-gray-500 font-semibold block mt-1">Surprise!</span>
              </div>
          </motion.div>
        </div>
      </div>

      <div className="min-h-[120px] w-full flex items-center justify-center mt-4">
        <AnimatePresence mode="wait">
          {!selectedPrize ? (
            <motion.button
              key="spin-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSpin}
              disabled={spinning}
              className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full py-3 px-10 text-base font-bold text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {spinning ? "කැරකෙනවා..." : "දැන් කරකවන්න! 🎰"}
            </motion.button>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-full text-center"
            >
              <div className="bg-zinc-900/80 inline-block rounded-2xl py-4 px-8 border border-white/10 shadow-xl w-full max-w-sm">
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">ඔයා දිනපු තෑග්ග</p>
                <span className="font-display text-3xl sm:text-4xl font-bold text-red-400 mb-4 block" style={{ textShadow: "0 2px 10px rgba(248, 113, 113, 0.4)" }}>
                  {selectedPrize}
                </span>

                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-sm sm:text-base bg-red-500/20 rounded-lg p-3 border border-red-500/30 mt-3"
                >
                  හසින්තා මිස්ගෙන් ලස්ස්න gift එකක් හම්බවේවි! 🎉
                  {/* අයියෝ! තෑග්ගක් දින්නනම් අරන් දෙන්න තිබුනා 😁  */}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};