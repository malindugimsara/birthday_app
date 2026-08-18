import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

// ඔයාගේ යාලුවගේ උපන්දිනය (දැන් තියෙන්නේ 2000-08-18)
const BIRTH_DATE = new Date("2000-08-18"); 

export const CountdownTimer = () => {
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

  useEffect(() => {
    const calculateAge = () => {
      const now = new Date();
      const birth = BIRTH_DATE;

      let y = now.getFullYear() - birth.getFullYear();
      let m = now.getMonth() - birth.getMonth();
      let d = now.getDate() - birth.getDate();

      if (d < 0) {
        m--;
        const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        d += prevMonthDays;
      }

      if (m < 0) {
        y--;
        m += 12;
      }

      setAge({ years: y, months: m, days: d });
    };

    calculateAge();
    // පැයකට සැරයක් විතරක් update වෙන නිසා මේක mobile CPU එකට ප්‍රශ්නයක් නැහැ
    const id = setInterval(calculateAge, 1000 * 60 * 60);
    return () => clearInterval(id);
    
  }, []);

  // useMemo පාවිච්චි කරලා ගණනය කිරීම් (calculations) cache කරගැනීම
  const items = useMemo(() => {
    const totalDays = Math.floor((Date.now() - BIRTH_DATE.getTime()) / (1000 * 60 * 60 * 24));
    
    return [
      { label: "ජීවිතයේ සුන්දර වසර 🌸", value: age.years },
  { label: "සතුටින් ගෙවුණු දින 🌟", value: `${totalDays}` },
  { label: "බෙදාගත් සිනහවන් 😊", value: `${totalDays * 5}+` }, // දවසකට හිනා 5ක් වත් බෙදාගෙන තියෙනවා කියලා පෙන්වන්න
  { label: "අපේ ආදරය හා ගෞරවය ❤️", value: "අනන්තයි" }
    ];
  }, [age.years]); // age.years වෙනස් වුණොත් විතරක් අලුතින් හදයි

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }} // Simplified transition
      style={{ willChange: "transform, opacity" }} // Hardware Acceleration Hint
      className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md mx-auto"
    >
      {items.map((it) => (
        <div
          key={it.label}
          // Hover effects වලදී shadow එක වෙනස් වෙන එක optimize කර ඇත
          className="optimized-glass-card rounded-2xl py-4 px-2 text-center border border-white/5 transition-colors duration-300"
        >
          <div className="font-display text-3xl sm:text-4xl font-bold text-gradient-birthday tabular-nums">
            {it.value}
          </div>
          <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-2">
            {it.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
};