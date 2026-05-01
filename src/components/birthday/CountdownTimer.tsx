import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ඔයාගේ යාලුවගේ උපන්දිනය (දැන් තියෙන්නේ 2002-05-01)
const BIRTH_DATE = new Date("2002-05-01"); 

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
    const id = setInterval(calculateAge, 1000 * 60 * 60);
    return () => clearInterval(id);
    
  }, []);

  
  const totalDays = Math.floor((Date.now() - BIRTH_DATE.getTime()) / (1000 * 60 * 60 * 24));

  const items = [
    { label: "දැන් වයස 👴", value: age.years },
    { label: "නිදාගත්තු දවස් 😴", value: `${Math.floor(totalDays / 3)}` },
    { label: "ෆෝන් එක ඔබපු පැය 📱", value: `${totalDays * 6}` },
    { label: "නාපු නැති දවස් 🚿", value: "1,205+" }, 
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md mx-auto"
    >
      {items.map((it) => (
        <div
          key={it.label}
          className="glass-card rounded-2xl py-4 px-2 text-center border border-white/5 hover:border-pink-500/30 transition-colors"
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