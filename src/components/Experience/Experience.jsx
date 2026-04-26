import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {experience.title || "Working Experience"}
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            {experience.subtitle || "A collection of my working experiences."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              viewport={{ once: true }}
              className="w-full bg-white/6 backdrop-blur-md rounded-3xl border border-white/10 p-6 md:p-8 shadow-soft hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {exp.title}
                </h3>
                <p className="text-sm text-white/60">
                  {exp.company} · {exp.year}
                </p>
                <p className="text-base text-white/80 mt-4 leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
