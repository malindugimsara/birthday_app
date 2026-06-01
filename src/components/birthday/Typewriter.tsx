import { useEffect, useRef } from "react";

export const Typewriter = ({ 
  text, 
  speed = 35, 
  className = "" 
}: { 
  text: string; 
  speed?: number; 
  className?: string; 
}) => {
  // State වෙනුවට Ref එකක් පාවිච්චි කරනවා DOM Element එක කෙළින්ම අල්ලගන්න
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let i = 0;
    
    // කලින් තිබුණු text එක clear කරනවා
    if (textRef.current) {
      textRef.current.textContent = "";
    }

    const id = setInterval(() => {
      i++;
      // React Re-render වෙන්නේ නැතුව, කෙළින්ම Browser DOM එක update කරනවා
      if (textRef.current) {
        textRef.current.textContent = text.slice(0, i);
      }
      
      if (i >= text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <p className={className}>
      {/* Type වෙන text එක මේ span එක ඇතුළට කෙළින්ම යනවා */}
      <span ref={textRef} />
      
      {/* Cursor එක (Tailwind CSS animation එකට මාරු කළා GPU එකට ලේසි වෙන්න) */}
      <span className="inline-block w-[2px] h-[1em] bg-[hsl(var(--pink))] ml-1 animate-[pulse_1s_ease-in-out_infinite] align-middle" />
    </p>
  );
};