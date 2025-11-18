"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentWordIndex >= words.length) return;

    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (currentCharIndex < currentWord.text.length) {
        setDisplayedText((prev) => prev + currentWord.text[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        // Word complete, add space and move to next word
        setDisplayedText((prev) => prev + " ");
        setCurrentWordIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [currentWordIndex, currentCharIndex, words]);

  const renderWords = () => {
    let charIndex = 0;
    return (
      <div className="flex flex-wrap items-center gap-x-2">
        {words.map((word, idx) => {
          const wordStartIndex = charIndex;
          const wordEndIndex = charIndex + word.text.length;
          const isComplete = idx < currentWordIndex;
          const isCurrent = idx === currentWordIndex;
          
          charIndex += word.text.length + 1; // +1 for space

          if (isComplete) {
            return (
              <span key={`word-${idx}`} className="inline-block">
                <span className={cn("text-black", word.className)}>
                  {word.text}
                </span>
              </span>
            );
          } else if (isCurrent) {
            const displayedWord = displayedText.slice(wordStartIndex, wordEndIndex);
            return (
              <span key={`word-${idx}`} className="inline-block">
                <span className={cn("text-black", word.className)}>
                  {displayedWord}
                </span>
              </span>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <div className="text-2xl md:text-4xl lg:text-5xl font-bold">
        {renderWords()}
      </div>
      <Cursor cursorClassName={cursorClassName} />
    </div>
  );
};

const Cursor = ({ cursorClassName }: { cursorClassName?: string }) => {
  return (
    <span
      className={cn(
        "block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-orange-500",
        cursorClassName
      )}
      style={{
        animation: "blink 1s infinite",
      }}
    />
  );
};

