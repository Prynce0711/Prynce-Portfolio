import React, { useEffect, useRef } from "react";

export default function MatrixCanvas({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const keywords = [
      "function",
      "return",
      "if",
      "else",
      "const",
      "let",
      "var",
      "import",
      "class",
      "<div>",
      "console.log",
      "true",
      "false",
      "await",
      "async",
      "=>",
      "{}",
      "[]",
    ];
    const fontSize = 14;
    let columns = Math.floor(canvas.width / 100);
    let drops = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(30, 30, 30, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#4ade80";
      ctx.font = `${fontSize}px monospace`;

      if (drops.length !== Math.floor(canvas.width / 100)) {
        columns = Math.floor(canvas.width / 100);
        drops = new Array(columns).fill(1);
      }

      for (let i = 0; i < drops.length; i++) {
        const text = keywords[Math.floor(Math.random() * keywords.length)];
        ctx.fillText(text, i * 100, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const id = setInterval(draw, 50);
    return () => {
      clearInterval(id);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
