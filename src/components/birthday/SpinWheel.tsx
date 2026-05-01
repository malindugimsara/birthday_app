import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHEEL_ITEMS = [
  { label: "Dinner එකක්", icon: "🍕", color: "#ef4444" },
  { label: "Movie ටිකට් 2ක්", icon: "🎬", color: "#f97316" },
  { label: "මොකුත් නෑ", icon: "💔", color: "#3b82f6" }, 
  { label: "Chocolate එකක්", icon: "🍫", color: "#10b981" },
  { label: "T-Shirt එකක්", icon: "👕", color: "#8b5cf6" },
  { label: "කෝපි එකක්", icon: "☕", color: "#06b6d4" },
  { label: "ආයේ කරකවන්න", icon: "🔄", color: "#ef4444" },
  { label: "Shopping යමු", icon: "🛍️", color: "#f97316" },
  { label: "Phone Reload", icon: "📱", color: "#3b82f6" },
  { label: "Ice Cream", icon: "🍦", color: "#10b981" },
  { label: "මොකුත් නෑ", icon: "😭", color: "#8b5cf6" },
  { label: "Surprise Gift", icon: "🎁", color: "#06b6d4" },
];

export const SpinWheel = ({ onComplete }: { onComplete?: (prize: string) => void }) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  const totalItems = WHEEL_ITEMS.length;
  const segmentAngle = 360 / totalItems;

  const backgroundGradient = `conic-gradient(from 90deg, ${WHEEL_ITEMS.map(
    (item, i) => `${item.color} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`
  ).join(", ")})`;

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setSelectedPrize(null);

  
    const winningIndex = 2; 
    
    const currentItemAngle = (winningIndex * segmentAngle) + (segmentAngle / 2);
    const targetRotation = (6 * 360) + (180 - currentItemAngle);
    
    const randomOffset = (Math.random() * (segmentAngle - 4)) - ((segmentAngle - 4) / 2);
    const finalDegree = targetRotation + randomOffset;

    if (wheelRef.current) {
      wheelRef.current.style.transition = `transform 4s cubic-bezier(0.15, 0.95, 0.25, 1)`;
      const currentRotation = parseFloat(wheelRef.current.getAttribute('data-rotation') || '0');
      const newRotation = currentRotation + finalDegree;
      
      wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
      wheelRef.current.setAttribute('data-rotation', newRotation.toString());
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
        
        <div className="absolute top-1/2 -left-6 sm:-left-8 -translate-y-1/2 z-20 drop-shadow-lg">
          <div className="w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-l-[30px] border-l-gray-200"></div>
          <div className="absolute top-1/2 left-[-28px] -translate-y-1/2 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[24px] border-l-white"></div>
        </div>

        <div
          ref={wheelRef}
          className="w-full h-full rounded-full overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-4 border-white"
          style={{ background: backgroundGradient }}
          data-rotation="0"
        >
          {WHEEL_ITEMS.map((item, index) => {
            const rotation = index * segmentAngle + (segmentAngle / 2);
            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 w-[50%] h-8 origin-left flex items-center justify-end pr-4 sm:pr-6"
                style={{
                  transform: `translateY(-50%) rotate(${rotation}deg)`,
                }}
              >
                <span 
                  className="text-white font-bold text-[10px] sm:text-[12px] tracking-wide mr-2 text-right leading-tight"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                >
                  {item.label}
                </span>
                <span className="text-lg sm:text-2xl drop-shadow-md">
                  {item.icon}
                </span>
              </div>
            );
          })}
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full z-10 flex items-center justify-center border-[4px] border-gray-100 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
            <div className="text-center">
                <span className="text-sm sm:text-base font-bold text-gray-800 block">🌸 Spring 🌸</span>
                <span className="text-[10px] text-gray-500 font-semibold block mt-1">Surprise!</span>
            </div>
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
              className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full py-3 px-10 text-base font-bold text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {spinning ? "කැරකෙනවා..." : "දැන් කරකවන්න! 🎰"}
            </motion.button>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="w-full text-center"
            >
              <div className="bg-white/10 backdrop-blur-md inline-block rounded-2xl py-4 px-8 border border-white/20 shadow-xl w-full max-w-sm">
                <p className="text-gray-300 text-xs uppercase tracking-widest mb-2">ඔයා දිනපු තෑග්ග</p>
                <span className="font-display text-3xl sm:text-4xl font-bold text-red-400 drop-shadow-md block mb-4">
                  {selectedPrize}
                </span>

                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white text-sm sm:text-base bg-red-500/20 rounded-lg p-3 border border-red-500/30"
                >
                  අටියෝ! තෑග්ගක් දින්නනම් අරන් දෙන්න තිබුනා 😁 
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};