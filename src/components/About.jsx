import React, { useEffect, useRef, useState } from 'react';

function About() {
  const canvasRef = useRef(null);
  
  // -- 1. Matrix Rain Effect --
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const keywords = ["function", "return", "if", "else", "const", "let", "var", "import", "class", "<div>", "console.log", "true", "false", "await", "async", "=>", "{}", "[]"];
    const fontSize = 14;
    let columns = Math.floor(canvas.width / 100); 
    let drops = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(30, 30, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#4ade80';
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

    const intervalId = setInterval(draw, 50);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // -- 2. Typing Effect (Custom Hook Logic) --
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "I am a dedicated IT student with a passion for web development and design.\n\nMy journey in the tech world has equipped me with skills in various programming languages and frameworks. I thrive on creating innovative solutions...\n\nBeyond academics, I enjoy collaborating on projects that challenge my creativity and technical skills. I am eager to contribute to impactful projects and grow as a professional in the IT industry.";

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length - 1) {
        setDisplayedText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 20); // Typing speed (lower is faster)

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <section id="about" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#1e1e1e]">
      
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 z-0 w-full h-full opacity-20"
      />

      {/* Code Editor Window */}
      <div className="relative z-10 w-full max-w-4xl mx-4 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-2xl overflow-hidden mt-20">
        
        {/* Window Header */}
        <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-black">
          <div className="flex items-center gap-2">
            <div className="flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="bg-[#1e1e1e] px-4 py-1 text-sm text-white rounded-t-md flex items-center gap-2 border-t border-blue-500">
              <span className="text-blue-400">JS</span>
              about_me.js
            </div>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-6 md:p-10 font-mono text-lg md:text-xl leading-relaxed flex">
          {/* Line Numbers */}
          <div className="text-gray-600 select-none text-right pr-4 border-r border-gray-700 mr-4 hidden sm:block">
            1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9
          </div>
          
          {/* Typing Area */}
          <div className="text-gray-300 w-full whitespace-pre-wrap">
            <span className="text-purple-400">const</span> <span className="text-blue-400">aboutMe</span> = <span className="text-yellow-300">`</span>
            <br/><br/>
            {displayedText}
            <span className="animate-pulse">|</span>
            <br/><br/>
            <span className="text-yellow-300">`;</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;