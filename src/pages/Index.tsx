import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";

// ඔයාගේ Components ටික
import { AnimatedBackground } from "@/components/birthday/AnimatedBackground";
import { BirthdayCard } from "@/components/birthday/BirthdayCard";
import { MusicToggle } from "@/components/birthday/MusicToggle";

const Index = () => {
  
  const [introFinished, setIntroFinished] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  const handleOpenGift = () => {
    setIntroFinished(true); 
    setAutoPlayMusic(true); 
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center px-4 py-10 sm:py-16 overflow-hidden">
      
      
      <AnimatedBackground />

      <AnimatePresence mode="wait">
        {!introFinished ? (
          
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
           
            exit={{ opacity: 0, scale: 1.5, filter: "blur(15px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="relative mb-8"
            >
              <Gift className="w-24 h-24 text-[hsl(var(--pink))] drop-shadow-[0_0_30px_hsla(320,90%,60%,0.8)]" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="w-8 h-8 text-[hsl(var(--gold))]" />
              </motion.div>
            </motion.div>

            <h1 className="font-display text-3xl sm:text-4xl text-white mb-10 text-center px-4 drop-shadow-md">
              ඔයාට පොඩි Surprise එකක් තියෙනවා... ✨
            </h1>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGift}
              className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full py-4 px-10 text-lg font-bold text-white shadow-[0_0_40px_hsla(320,90%,60%,0.6)] flex items-center gap-3 border border-white/20 hover:border-white/50 transition-colors"
            >
              Open කරලා බලන්න 🎁
            </motion.button>
          </motion.div>
        ) : (
          
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl flex flex-col items-center justify-center relative z-10"
          >
            <MusicToggle autoPlay={autoPlayMusic} />
            <BirthdayCard
              friendName="Nisansala"
              onMusicAutoPlay={() => setAutoPlayMusic(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;