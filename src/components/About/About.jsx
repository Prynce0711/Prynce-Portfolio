import React from "react";
import MatrixCanvas from "./MatrixCanva";
import CodeWindow from "./CodeWindow";
import TypingText from "./TypingText";
import { useSiteContent } from "../../context/SiteContentContext";

function About() {
  const { siteContent } = useSiteContent();
  const fullText = siteContent.about?.fullText || "";

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#1e1e1e]"
    >
      <MatrixCanvas className="absolute top-0 left-0 z-0 w-full h-full opacity-20" />

      <CodeWindow>
        <TypingText
          key={fullText}
          fullText={fullText}
          speed={20}
          className="whitespace-pre-wrap"
        />
      </CodeWindow>
    </section>
  );
}

export default About;
