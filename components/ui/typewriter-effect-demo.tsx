"use client";

import { TypewriterEffectSmooth } from "./typewriter-effect";
import { Button } from "./button";
import Link from "next/link";

export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Master",
    },
    {
      text: "your",
    },
    {
      text: "skills",
    },
    {
      text: "with",
    },
    {
      text: "GrindApp.",
      className: "text-orange-500",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[40rem] bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <p className="text-gray-600 text-xs sm:text-base mb-4">
        The road to mastery starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-8">
        <Button asChild className="w-40 h-10 rounded-xl bg-black border border-transparent text-white text-sm hover:bg-gray-800">
          <Link href="/signup">Join now</Link>
        </Button>
        <Button asChild variant="outline" className="w-40 h-10 rounded-xl bg-white text-black border border-gray-900 text-sm hover:bg-gray-50">
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </div>
  );
}

