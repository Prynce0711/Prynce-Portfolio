import React, { useEffect, useState } from "react";

export default function TypingText({
  fullText,
  speed = 20,
  cursor = true,
  className = "",
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let idx = 0;
    const id = setInterval(() => {
      if (idx < fullText.length) {
        setDisplayed((p) => p + fullText[idx]);
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
