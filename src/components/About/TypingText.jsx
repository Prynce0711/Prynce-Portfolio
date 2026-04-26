import React, { useEffect, useState } from "react";

export default function TypingText({
  fullText,
  speed = 20,
  cursor = true,
  className = "",
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const text =
      typeof fullText === "string" ? fullText : String(fullText || "");

    // Reset displayed text before starting a new typing effect
    setDisplayed("");

    if (!text || text.length === 0) {
      return undefined;
    }

    let idx = 0;
    const id = setInterval(() => {
      if (idx < text.length) {
        setDisplayed((p) =>
          typeof p === "string" ? p + text[idx] : text[idx],
        );
        idx++;
      } else {
        clearInterval(id);
      }
    }, speed);

    return () => clearInterval(id);
  }, [fullText, speed]);

  return (
    <div className={className} style={{ whiteSpace: "pre-wrap" }}>
      {displayed}
      {cursor && <span className="animate-pulse">|</span>}
    </div>
  );
}
