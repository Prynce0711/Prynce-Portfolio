import { motion } from "framer-motion";
import { useSiteContent } from "../../context/SiteContentContext";
import Section from "../ui/Section";
import GlassCard from "../ui/GlassCard";
import {
  FaRocket,
  FaCode,
  FaGraduationCap,
  FaStar,
  FaBolt,
} from "react-icons/fa";

const Experience = () => {
  const { siteContent } = useSiteContent();
  const experience = siteContent.experience || {};
  const experiences = experience.items || [];

  // Fun icons for different experience types
  const getExperienceIcon = (title, company) => {
    const iconMap = {
      internship: FaRocket,
      intern: FaRocket,
      Intern: FaRocket,
      developer: FaCode,
      Developer: FaCode,
      frontend: FaCode,
      backend: FaCode,
      fullstack: FaCode,
      bootcamp: FaGraduationCap,
      Bootcamp: FaGraduationCap,
      university: FaGraduationCap,
      default: FaStar,
    };

    const lowerTitle = title.toLowerCase();
    for (const [key, Icon] of Object.entries(iconMap)) {
      if (lowerTitle.includes(key)) return Icon;
    }
    return iconMap.default;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <Section id="experience" className="relative overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl animate-float-slow" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-xl animate-float animation-delay-2s" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Header - Fun Animated */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border border-cyan-400/30 backdrop-blur-sm shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)",
            }}
          >
            <FaBolt className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300/90">
              Journey
            </span>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full animate-shimmer" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl mb-6"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            {experience.title || "My Developer Journey 🚀"}
          </motion.h2>

          <motion.p
            className="text-lg lg:text-xl text-slate-300/90 max-w-3xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {experience.subtitle ||
              "From code newbie to shipping products. Here's the fun path that made me who I am today! 💻✨"}
          </motion.p>
        </motion.div>

        {/* Timeline - Super Fun! */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated Timeline Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-yellow-400/60 via-cyan-400/80 to-purple-500/60 shadow-lg"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-12"
          >
            {experiences.map((exp, index) => {
              const Icon = getExperienceIcon(exp.title, exp.company);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`relative flex ${isEven ? "flex-row-reverse" : ""} items-center gap-8`}
                >
                  {/* Timeline Dot - Animated */}
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl shadow-xl border-4 border-white/20 flex items-center justify-center"
                    whileHover={{ scale: 1.3, rotate: 180 }}
                    transition={{ type: "spring" }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                  </motion.div>

                  {/* Experience Card */}
                  <GlassCard
                    className={`w-full max-w-md p-8 shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 group hover:-translate-y-2 ${isEven ? "ml-auto" : "mr-auto"}`}
                  >
                    {/* Header with Icon */}
                    <div className="flex items-start gap-4 mb-6">
                      <motion.div
                        className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl border-2 border-white/20 backdrop-blur-sm shadow-lg flex-shrink-0 group-hover:scale-110 transition-all duration-300"
                        whileHover={{ rotate: 360 }}
                      >
                        <Icon className="w-6 h-6 text-cyan-300 shadow-lg" />
                      </motion.div>

                      <div>
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-bold text-cyan-300/80 mb-1">
                          <span>{exp.year}</span>
                          <span className="text-yellow-400">⚡</span>
                          <span>{exp.company}</span>
                        </div>
                        <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors duration-300">
                          {exp.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300/90 leading-relaxed text-sm lg:text-base font-medium">
                      {exp.desc}
                    </p>

                    {/* Fun Stats */}
                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-6">
                      <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
                        <FaStar className="w-3 h-3 fill-current" />
                        <span>Featured Project</span>
                      </div>
                      <div className="w-px h-4 bg-white/20" />
                      <div className="flex items-center gap-1 text-xs text-purple-400 font-mono">
                        <span>💻</span>
                        <span>Production Ready</span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default Experience;
