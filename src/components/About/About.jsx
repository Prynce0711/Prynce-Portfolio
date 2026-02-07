import React from "react";
import MatrixCanvas from "./MatrixCanva";
import CodeWindow from "./CodeWindow";
import TypingText from "./TypingText";

const fullText =
  "I am a dedicated IT student with a passion for web development and design.\n\nMy journey in the tech world has equipped me with skills in various programming languages and frameworks. I thrive on creating innovative solutions...\n\nBeyond academics, I enjoy collaborating on projects that challenge my creativity and technical skills. I am eager to contribute to impactful projects and grow as a professional in the IT industry.";

function About() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#1e1e1e]"
    >
      <MatrixCanvas className="absolute top-0 left-0 z-0 w-full h-full opacity-20" />

      <CodeWindow>
        <TypingText
          fullText={fullText}
          speed={20}
          className="whitespace-pre-wrap"
        />
      </CodeWindow>
    </section>
  );
}

export default About;
