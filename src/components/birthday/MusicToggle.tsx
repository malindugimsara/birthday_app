import { useEffect, useRef, useState, useCallback } from "react";
import { Music, VolumeX } from "lucide-react";

// (ඔබගේ වෙසක් සංගීතය මෙතැනට ලබා දෙන්න)
const TRACK = "/happy-birthday.mp3"; 

export const MusicToggle = ({ autoPlay }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const hasAttemptedPlay = useRef(false);
  
  // 👈 අලුතින් එකතු කළ Ref එක: User හිතාමතාම Pause කළාද කියලා බලන්න
  const isUserPaused = useRef(false); 

  // 1. Audio object එක හරියට Initialize කිරීම
  useEffect(() => {
    const audio = new Audio(TRACK);
    audio.preload = "auto"; 
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    
    return () => {
      audio.pause();
      audio.src = ""; 
      audioRef.current = null;
    };
  }, []);

  // 2. Play කිරීමේ Function එක
  const attemptPlay = useCallback(() => {
    // User හිතාමතාම pause කරලා නම් හෝ දැනටමත් play වෙනවා නම් ආයෙත් play කරන්නේ නෑ
    if (!audioRef.current || playing || isUserPaused.current) return;
    
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      hasAttemptedPlay.current = true;
      playPromise
        .then(() => {
          setPlaying(true);
          isUserPaused.current = false;
        })
        .catch(() => {
           hasAttemptedPlay.current = false;
           setPlaying(false);
        });
    }
  }, [playing]);

  // 3. AutoPlay Effect එක
  useEffect(() => {
    // පළමු වතාවට පමණක් autoPlay වීමට (hasAttemptedPlay එකෙන් පාලනය වේ)
    if (autoPlay && !hasAttemptedPlay.current) {
      attemptPlay();
    }
  }, [autoPlay, attemptPlay]);

  // 4. Global Event Listeners (Touch/Click Auto-play)
  useEffect(() => {
    // Play වෙනවා නම් හෝ user හිතාමතාම pause කළා නම් listeners අලුතින් attach කරන්නේ නෑ
    if (playing || isUserPaused.current) return; 

    const handleInteraction = () => {
      attemptPlay();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [playing, attemptPlay]);

  // 5. Browser Visibility & Custom Video Events හැසිරවීම
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        audio.pause();
      } else if (playing && !isUserPaused.current) {
        // ආපහු Tab එකට ආවාම, user pause කරලා නැත්නම් විතරක් play වෙනවා
        audio.play().catch(() => setPlaying(false));
      }
    };

    const handlePauseBGM = () => audio.pause();
    const handleResumeBGM = () => {
      if (playing && !isUserPaused.current) {
        audio.play().catch(() => setPlaying(false));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pause-bgm", handlePauseBGM);
    window.addEventListener("resume-bgm", handleResumeBGM);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pause-bgm", handlePauseBGM);
      window.removeEventListener("resume-bgm", handleResumeBGM);
    };
  }, [playing]);

  const toggle = () => {
    if (!audioRef.current) return;
    
    hasAttemptedPlay.current = true; 

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      isUserPaused.current = true; // 👈 User pause button එක එබුවාම මේක true වෙනවා
    } else {
      audioRef.current.play()
        .then(() => {
          setPlaying(true);
          isUserPaused.current = false; // 👈 User ආපහු play කළොත් reset වෙනවා
        })
        .catch(() => setPlaying(false));
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); 
        toggle();
      }}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed top-5 right-5 z-[100] bg-night-deep/80 backdrop-blur-md border border-yellow-500/50 rounded-full p-3 transition-transform active:scale-90 duration-200 cursor-pointer flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.2)]"
      style={{ willChange: "transform" }}
    >
      {playing ? (
        <Music className="w-5 h-5 text-yellow-400 animate-[pulse_2s_ease-in-out_infinite]" />
      ) : (
        <VolumeX className="w-5 h-5 text-yellow-500/50" />
      )}
    </button>
  );
};