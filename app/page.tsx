"use client";

import { Bubble } from "@/components/bubble";
import { Hero } from "@/components/hero";
import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState<"study" | "quiz">("study");
  const [seed, setSeed] = useState<string | null>(null);

  return (
    <div className="w-full flex items-center justify-center overflow-hidden relative">
      <Hero
        onModeSelect={(m) => {
          setMode(m);
          setSeed(m === "study" ? "study mode" : "quiz me");
        }}
      />
      <Bubble
        mode={mode}
        onModeChange={setMode}
        seedMessage={seed}
        onSeeded={() => setSeed(null)}
      />
    </div>
  );
}
