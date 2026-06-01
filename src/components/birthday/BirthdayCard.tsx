import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Sparkles, Heart, Mail, PhoneOutgoing, Facebook } from "lucide-react";
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

export const BirthdayCard = ({
  friendName = "Nimsha",
  message = "Wishing you a day full of love, laughter, and happiness. May all your dreams come true and your smile shine brighter than ever. Happy Birthday! 🎉✨",
  onMusicAutoPlay,
}: Props) => {
  const [revealed, setRevealed] = useState(false);

  // Optimized Confetti Function inside the component to check screen size
  const fireConfetti = useCallback(() => {
    // Check if it's a mobile device to reduce particle count
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const colors = ["#ff6bcb", "#c084fc", "#60a5fa", "#fbbf24", "#fb7185"];
    
    const burst = (origin: { x: number; y: number }) =>
      confetti({ 
        particleCount: isMobile ? 25 : 50, // Reduced for mobile
        spread: isMobile ? 50 : 70, 
        startVelocity: 30, 
        origin, 
        colors, 
        scalar: isMobile ? 0.8 : 1 // Slightly smaller on mobile
      });
      
    burst({ x: 0.2, y: 0.5 });
    burst({ x: 0.8, y: 0.5 }); 
    
    setTimeout(() => {
      confetti({ 
        particleCount: isMobile ? 40 : 100, 
        spread: isMobile ? 80 : 120, 
        startVelocity: 45, 
        origin: { x: 0.5, y: 0.3 }, 
        colors 
      });
    }, 250);
  }, []);

  const handleSurprise = () => {
    if (revealed) return;
    setRevealed(true);
    fireConfetti();
    onMusicAutoPlay?.();
    // Repeat bursts with safe delays
    setTimeout(fireConfetti, 800);
    setTimeout(fireConfetti, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }} // Simplified transition
      className="relative w-full max-w-2xl mx-auto"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="glass-card neon-border rounded-[2rem] p-6 sm:p-10 relative overflow-hidden">
        
        {/* Optimized Inner glow: Replaced expensive 'blur-3xl' with CSS radial-gradient */}
        <div 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none" 
          style={{ background: "radial-gradient(circle, hsla(330, 100%, 70%, 0.15) 0%, transparent 60%)" }}
        />
        <div 
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none" 
          style={{ background: "radial-gradient(circle, hsla(280, 100%, 70%, 0.15) 0%, transparent 60%)" }}
        />

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative mx-auto mb-6 w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 gradient-button"
          style={{ boxShadow: "0 0 20px hsla(330, 100%, 70%, 0.4)" }} // Avoided heavy drop-shadows
        >
          <img
            src={friendPhoto}
            alt={`${friendName} celebrating`}
            width={160}
            height={160}
            loading="lazy" // Better performance
            decoding="async"
            className="w-full h-full rounded-full object-cover border-4 border-background/40"
          />
          {/* Sparkles: Changed from framer-motion to CSS animation for better GPU usage */}
          <div className="absolute -top-2 -right-2 animate-[spin_6s_linear_infinite]">
            <Sparkles className="w-7 h-7 text-[hsl(var(--gold))]" style={{ filter: "drop-shadow(0 0 4px hsl(var(--gold)))" }} />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-center leading-tight text-gradient-birthday"
        >
          Happy Birthday
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-script text-3xl sm:text-4xl text-center text-[hsl(var(--rose))] mt-1"
          style={{ textShadow: "0 0 10px hsla(330,90%,70%,0.4)" }} // text-shadow is faster than drop-shadow
        >
          {friendName} 🎉
        </motion.p>

        {/* Cake */}
        <div className="my-6 flex justify-center">
          <BirthdayCake />
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center text-foreground/85 max-w-lg mx-auto leading-relaxed text-sm sm:text-base px-2"
        >
          <Typewriter text={message} speed={25} />
        </motion.div>

        {/* Countdown */}
        <div className="mt-8">
          <CountdownTimer /> 
        </div>

        {/* Surprise Section */}
        <div className="mt-8 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.button
                key="btn"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSurprise}
                className="gradient-button text-primary-foreground font-semibold px-8 py-4 rounded-full text-base sm:text-lg flex items-center gap-3"
                style={{ boxShadow: "0 6px 20px hsla(320,90%,60%,0.4)" }} // Lighter shadow
              >
                <Gift className="w-5 h-5" />
                Open Your Surprise Gift
                <span aria-hidden>🎁</span>
              </motion.button>
            ) : (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-full flex flex-col items-center mt-4"
                style={{ willChange: "transform, opacity" }}
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
          transition={{ delay: 1 }}
          className="mt-8 text-center text-xs text-muted-foreground"
        >
            {/* ─── Glowing Horizontal Divider ─── */}
            <div 
              className="w-4/5 sm:w-2/3 max-w-md mx-auto h-[1px] mb-6 sm:mb-8"
              style={{
                background: "linear-gradient(90deg, transparent, hsla(330, 100%, 70%, 0.4), transparent)",
                boxShadow: "0 0 8px hsla(330, 100%, 70%, 0.3)"
              }}
            />
            {/* ───────────────────────────────── */}
            <div className="flex flex-col items-center gap-4 sm:gap-5 mt-2">
    
            {/* Branding Text Section */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 font-display cursor-default select-none flex-wrap">
              <span className="font-bold text-sm sm:text-base text-gradient-birthday tracking-wide drop-shadow-sm">
                CODECRAFT
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/50 font-light mt-0.5">
                Design By
              </span>
              <span className="font-semibold italic text-sm sm:text-base text-[hsl(var(--rose))]" style={{ textShadow: "0 0 12px hsla(330, 90%, 70%, 0.5)" }}>
                Malindu
              </span>
              <span className="inline-block text-[hsl(var(--gold))] text-sm sm:text-base animate-[pulse_2s_ease-in-out_infinite]" style={{ filter: "drop-shadow(0 0 6px hsl(var(--gold)))" }}>
                ❤️
              </span>
            </div>

            {/* Social Links Section */}
            <div className="flex items-center gap-4 sm:gap-6">
              <a 
                href="https://www.facebook.com/profile.php?id=61589021800561" 
                aria-label="Facebook" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full bg-white/5 border border-white/10 text-[hsl(var(--blue))] hover:bg-white/10 hover:shadow-[0_0_15px_hsl(var(--blue))] active:scale-90 transition-all duration-200"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              
              <a 
                href="tel:+94788536767" 
                aria-label="Phone" 
                className="p-2.5 sm:p-3 rounded-full bg-white/5 border border-white/10 text-[hsl(var(--gold))] hover:bg-white/10 hover:shadow-[0_0_15px_hsl(var(--gold))] active:scale-90 transition-all duration-200"
              >
                <PhoneOutgoing className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              
              <a 
                href="mailto:codecraftservicesm@gmail.com" 
                aria-label="Email" 
                className="p-2.5 sm:p-3 rounded-full bg-white/5 border border-white/10 text-[hsl(var(--pink))] hover:bg-white/10 hover:shadow-[0_0_15px_hsl(var(--pink))] active:scale-90 transition-all duration-200"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </motion.p>
      </div>
    </motion.div>
  );
};