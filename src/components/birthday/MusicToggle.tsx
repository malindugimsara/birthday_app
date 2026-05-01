import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const TRACK = "/happy-birthday.mp3"; 

interface MusicToggleProps {
  autoPlay?: boolean;
}

export const MusicToggle = ({ autoPlay }: MusicToggleProps) => {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLAudioElement | null>(null);
  
  
  const hasAttemptedPlay = useRef(false);

  useEffect(() => {
    const audio = new Audio(TRACK);
    audio.preload = "auto"; 
    audio.load(); 
    audio.loop = true;
    audio.volume = 0.5;
    ref.current = audio;
    
    return () => {
      audio.pause();
      ref.current = null;
    };
  }, []);

  useEffect(() => {
    
    if (autoPlay && ref.current && !playing && !hasAttemptedPlay.current) {
      hasAttemptedPlay.current = true; 
      
      if (ref.current.readyState >= 2) {
        ref.current.play().then(() => setPlaying(true)).catch(() => {});
      } else {
        ref.current.addEventListener('canplay', () => {
          if (!playing) {
            ref.current?.play().then(() => setPlaying(true)).catch(() => {});
          }
        }, { once: true });
      }
    }
  }, [autoPlay, playing]);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (ref.current && !playing && !hasAttemptedPlay.current) {
        hasAttemptedPlay.current = true;
        
        if (ref.current.readyState >= 2) {
          ref.current.play().then(() => {
            setPlaying(true);
          }).catch(() => {});
        } else {
          ref.current.addEventListener('canplay', () => {
            if (!playing) {
                ref.current?.play().then(() => setPlaying(true)).catch(() => {});
            }
          }, { once: true });
        }
      }
      
     
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);
    
    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [playing]);

  const toggle = () => {
    if (!ref.current) return;
    
    hasAttemptedPlay.current = true; 

    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      ref.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      onClick={(e) => {
        e.stopPropagation(); 
        toggle();
      }}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed top-5 right-5 z-50 glass-card rounded-full p-3 hover:glow-pink transition-shadow cursor-pointer"
    >
      {playing ? (
        <Music className="w-5 h-5 text-[hsl(var(--pink))] animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </motion.button>
  );
};