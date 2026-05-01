import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Sparkles, Heart } from "lucide-react";
import friendPhoto from "@/assets/friend-photo.jpeg"; 
import { BirthdayCake } from "./BirthdayCake";
import { CountdownTimer } from "./CountdownTimer"; 
import { Typewriter } from "./Typewriter";
import { SpinWheel } from "./SpinWheel"; 
interface Props {
  friendName?: string;
  message?: string;
  surpriseMessage?: string;
  onMusicAutoPlay?: () => void;
}

const fireConfetti = () => {
  const colors = ["#ff6bcb", "#c084fc", "#60a5fa", "#fbbf24", "#fb7185"];
  
  // Mobile වලට ලේසි වෙන්න count එක ටිකක් අඩු කරමු (120 -> 50)
  const burst = (origin: { x: number; y: number }) =>
    confetti({ particleCount: 50, spread: 70, startVelocity: 30, origin, colors, scalar: 1 });
    
  burst({ x: 0.2, y: 0.5 });
  burst({ x: 0.8, y: 0.5 }); // මැද එක අයින් කරලා දෙපැත්තට විතරක් දැම්මා
  
  // Fireworks එකත් ටිකක් අඩු කරමු (200 -> 100)
  setTimeout(() => {
    confetti({ particleCount: 100, spread: 120, startVelocity: 45, origin: { x: 0.5, y: 0.3 }, colors });
  }, 250);
};

export const BirthdayCard = ({
  friendName = "Bestie",
  message = "Wishing you a day full of love, laughter, and happiness. May all your dreams come true and your smile shine brighter than ever. Happy Birthday! 🎉✨",
  onMusicAutoPlay,
}: Props) => {
  const [revealed, setRevealed] = useState(false);

  const handleSurprise = () => {
    if (revealed) return;
    setRevealed(true);
    fireConfetti();
    onMusicAutoPlay?.();
    // Repeat bursts
    setTimeout(fireConfetti, 800);
    setTimeout(fireConfetti, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <div className="glass-card neon-border rounded-[2rem] p-6 sm:p-10 relative overflow-hidden">
        {/* Inner glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[hsl(var(--pink))] opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[hsl(var(--purple))] opacity-20 blur-3xl pointer-events-none" />

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative mx-auto mb-6 w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 gradient-button glow-pink"
        >
          <img
            src={friendPhoto}
            alt={`${friendName} celebrating`}
            width={160}
            height={160}
            className="w-full h-full rounded-full object-cover border-4 border-background/40"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-7 h-7 text-[hsl(var(--gold))] drop-shadow-[0_0_8px_hsl(var(--gold))]" />
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-center leading-tight text-gradient-birthday"
        >
          Happy Birthday
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-script text-3xl sm:text-4xl text-center text-[hsl(var(--rose))] mt-1 drop-shadow-[0_0_12px_hsla(330,90%,70%,0.6)]"
        >
          {friendName} 🎉
        </motion.p>

        {/* Cake */}
        <div className="my-6 flex justify-center">
          <BirthdayCake />
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-center text-foreground/85 max-w-lg mx-auto leading-relaxed text-sm sm:text-base px-2"
        >
          <Typewriter text={message} speed={25} />
        </motion.div>

        {/* Countdown / Age */}
        <div className="mt-8">
          <CountdownTimer /> 
        </div>

        {/* Surprise Section with SpinWheel */}
        <div className="mt-8 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.button
                key="btn"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={handleSurprise}
                className="gradient-button text-primary-foreground font-semibold px-8 py-4 rounded-full text-base sm:text-lg shadow-[0_10px_40px_hsla(320,90%,60%,0.5)] flex items-center gap-3 hover:shadow-[0_15px_50px_hsla(320,90%,60%,0.7)]"
              >
                <Gift className="w-5 h-5" />
                Open Your Surprise Gift
                <span aria-hidden>🎁</span>
              </motion.button>
            ) : (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, scale: 0.7, rotateX: -90 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="w-full flex flex-col items-center mt-4"
              >
                <h3 className="font-display text-2xl sm:text-3xl text-center text-gradient-birthday mb-2">
                  අපි බලමු ඔයාගේ වාසනාව! 🎰
                </h3>
                
                <SpinWheel />

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-center text-xs text-muted-foreground"
        >
          Created by MG ✨.
        </motion.p>
      </div>
    </motion.div>
  );
};