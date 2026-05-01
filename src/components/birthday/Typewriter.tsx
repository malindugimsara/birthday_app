import { useEffect, useState } from "react";

export const Typewriter = ({ text, speed = 35, className = "" }: { text: string; speed?: number; className?: string }) => {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <p className={className}>
      {shown}
      <span className="inline-block w-0.5 h-5 bg-[hsl(var(--pink))] ml-0.5 animate-pulse align-middle" />
    </p>
  );
};
