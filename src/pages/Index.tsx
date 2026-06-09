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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-lg px-6"
          >
            {/* Floating Gift Icon */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="relative mb-8"
            >
              <div className="relative z-10 bg-white/10 p-5 rounded-full backdrop-blur-sm border border-white/20 shadow-[0_0_50px_hsla(320,90%,60%,0.3)]">
                <Gift className="w-20 h-20 text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="w-10 h-10 text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.8)]" />
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <div className="text-center max-w-xl mx-auto mb-10 space-y-6">
              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-display text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 drop-shadow-sm leading-tight pb-2"
              >
                Hi Nethmi..! අද special දවසක් නේද..? ✨
              </motion.h1>
              
              {/* Message Card - Background අයින් කරලා Border එක විතරක් දුන්නා */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative border border-white/30 rounded-3xl p-6 sm:p-8"
              >
                <p className="text-lg sm:text-xl text-white/90 font-light leading-relaxed">
                  {/* Highlighted Names */}
                  <span className="text-white/80">අද දවස අමතක නොවෙන්න</span>
                  <span className="block text-pink-200 font-medium mb-3 text-xl sm:text-2xl drop-shadow-sm">
                    හසින්තා මිස්, කාවින්ද, මලිඳු මල්ලි<br className="hidden sm:block" /> සහ සෙත්මින මල්ලිගෙන්
                  </span>
                  <span className="text-white/80">චූටි දෙයක්... ☺️</span>
                </p>

                {/* Beautiful Divider */}
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto my-5" />

                {/* Hint & Call to Action */}
                <p className="text-base sm:text-md text-white/90 leading-relaxed">
                  ආ.. පොඩි gift එකකුත් තියෙන්න පුලුවන්! 😉 <br />
                  Try කරල බලන්න 🙈
                </p>
              </motion.div>
            </div>

            {/* Action Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsla(320, 90%, 60%, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGift}
              className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 rounded-full py-4 px-8 text-lg font-bold text-white shadow-[0_0_30px_hsla(320,90%,60%,0.4)] flex items-center gap-3 border border-white/30 transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                Card එක open කරල බලන්න
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                  🎁
                </motion.div>
              </span>
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
              friendName="Nethmi"
              onMusicAutoPlay={() => setAutoPlayMusic(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;