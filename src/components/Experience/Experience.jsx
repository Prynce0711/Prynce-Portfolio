import React, { useEffect, useRef } from "react";
import { useSiteContent } from "../../context/SiteContentContext";

const Experience = () => {
  const { siteContent } = useSiteContent();
  const experience = siteContent.experience || {};
  const experiences = experience.items || [];
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect = null;

    // Check if VANTA is available on the window object
    if (window.VANTA && vantaRef.current) {
      vantaEffect = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xe3e3e3,
        backgroundColor: 0x110d18,
        points: 15.0,
        maxDistance: 19.0,
        spacing: 17.0,
      });
    }

    // Cleanup on unmount
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <section
      id="experience"
      className="relative min-h-screen pt-24 transition-colors duration-300 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Vanta Background Container */}
      <div ref={vantaRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 p-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white">
            {experience.title || "Working Experience"}
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            {experience.subtitle || "A collection of my working experiences."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="card bg-white/10 backdrop-blur-md w-full shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 rounded-3xl border border-white/10 group"
            >
              <div className="card-body p-10">
                <h2 className="card-title text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {exp.title}
                </h2>
                <p className="text-sm text-white/60 mt-1">
                  {exp.company} · {exp.year}
                </p>
                <p className="text-base text-white/80 mt-4 leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
