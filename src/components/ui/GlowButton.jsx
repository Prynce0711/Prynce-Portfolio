// const GlowButton = ({
//   href,
//   children,
//   variant = "primary",
//   className = "",
//   ...props
// }) => {
//   const baseClasses =
//     "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";

//   const variants = {
//     primary:
//       "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon hover:shadow-neonPurple hover:-translate-y-0.5",
//     secondary:
//       "border border-white/20 bg-white/5 text-white/90 hover:border-cyan-300/60 hover:text-white",
//     ghost: "text-slate-200 hover:text-white",
//   };

//   const classes = `${baseClasses} ${variants[variant] || variants.primary} ${className}`;

//   if (href) {
//     return (
//       <a href={href} className={classes} {...props}>
//         {children}
//       </a>
//     );
//   }

//   return (
//     <button type="button" className={classes} {...props}>
//       {children}
//     </button>
//   );
// };

// export default GlowButton;

import { motion } from "framer-motion";
import GlowButton from "../ui/GlowButton";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectGrid = ({ projects = [] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
      },
    },
  };

  const getRandomColor = () => {
    const colors = [
      "from-cyan-500",
      "from-purple-500",
      "from-pink-500",
      "from-orange-500",
      "from-emerald-500",
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12"
    >
      {projects.map((project, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{
            y: -10,
            scale: 1.01,
            transition: { duration: 0.3 },
          }}
          className="group"
        >
          <div className="relative h-full flex flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-slate-900/50 to-black/30 backdrop-blur-xl p-8 shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-md mb-8 aspect-video">
              {project.image ? (
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center rounded-xl ${getRandomColor()}/20 border border-white/10`}
                >
                  <div className="text-2xl">🚀</div>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl font-black text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
                {project.title}
              </h3>

              <p className="text-slate-300/90 mb-6 leading-relaxed text-base line-clamp-3 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {(project.tags || []).map((tag, tagIndex) => (
                  <motion.span
                    key={tagIndex}
                    className="rounded-full bg-cyan-500/10 border border-cyan-400/20 px-4 py-2 text-sm font-bold text-cyan-200/90 backdrop-blur-sm shadow-sm hover:bg-cyan-500/20 transition-all duration-300 cursor-default"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {project.link && (
                  <GlowButton
                    href={project.link}
                    variant="primary"
                    className="px-6 py-3 text-sm font-bold border border-white/20 shadow-sm hover:shadow-md hover:shadow-cyan-500/10 backdrop-blur-sm flex-1 min-w-[100px] transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt className="w-4 h-4 mr-1" />
                    Live Demo
                  </GlowButton>
                )}

                {project.github && (
                  <GlowButton
                    href={project.github}
                    variant="secondary"
                    className="px-6 py-3 text-sm font-bold border border-white/20 shadow-sm hover:shadow-md hover:shadow-white/10 backdrop-blur-sm flex-1 min-w-[100px] transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="w-4 h-4 mr-1" />
                    Code
                  </GlowButton>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectGrid;