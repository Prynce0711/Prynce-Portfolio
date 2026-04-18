import React from "react";
import LeftText from "./LeftText";
import RightImage from "./RightImage";
import { useSiteContent } from "../../context/SiteContentContext";

function Hero() {
  const { siteContent } = useSiteContent();
  const hero = siteContent.hero || {};

  return (
    <section
      id="hero"
      className="relative bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Decorative Blob (Optional) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 hidden lg:block">
        <div className="w-96 h-96 bg-blue-500/20 blur-3xl rounded-full mix-blend-multiply dark:mix-blend-overlay animate-blob"></div>
      </div>

      <div className="container mx-auto px-4 md:px-12 lg:px-24 py-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <LeftText hero={hero} />

          <RightImage hero={hero} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
