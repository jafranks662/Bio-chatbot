"use client";

import { useEffect, useState } from "react";
import { Bubble } from "@/components/bubble";
import { Hero } from "@/components/hero";

export default function Home() {
  const [mode, setMode] = useState<"study" | "quiz">(() => {
    if (typeof window === "undefined") return "study";
    return (localStorage.getItem("mode") as "study" | "quiz") || "study";
  });
  const [seed, setSeed] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mode", mode);
    }
  }, [mode]);

  return (
    <div className="w-full flex items-center justify-center overflow-hidden relative">
      <Hero mode={mode} setMode={setMode} setSeed={setSeed} />
      <Bubble mode={mode} setMode={setMode} seed={seed} setSeed={setSeed} />
    </div>
  );
}

