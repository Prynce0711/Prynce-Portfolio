// import { motion } from "framer-motion";
// import GlowButton from "../ui/GlowButton";

// const ProjectGrid = ({ projects = [] }) => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 18 },
//     show: { opacity: 1, y: 0 },
//   };

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: true, amount: 0.2 }}
//       className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//     >
//       {projects.map((project, index) => (
//         <motion.div key={index} variants={itemVariants}>
//           <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:shadow-neon">
//             <div className="relative overflow-hidden rounded-xl border border-white/10">
//               {project.image ? (
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
//                 />
//               ) : (
//                 <div className="flex h-48 items-center justify-center bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
//                   <span className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
//                     Project Preview
//                   </span>
//                 </div>
//               )}
//               <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/20 to-neon-purple/20 opacity-0 transition duration-300 group-hover:opacity-100" />
//             </div>

//             <div className="mt-6 flex flex-1 flex-col">
//               <h3 className="text-xl font-semibold text-white">
//                 {project.title}
//               </h3>
//               <p className="mt-3 text-sm text-slate-300/80 leading-relaxed">
//                 {project.description}
//               </p>

//               <div className="mt-4 flex flex-wrap gap-2">
//                 {(project.tags || []).map((tag, tagIndex) => (
//                   <span
//                     key={tagIndex}
//                     className="rounded-full border border-cyan-300/20 bg-white/5 px-3 py-1 text-xs font-semibold text-cyan-100/90"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>

//               <div className="mt-6 flex flex-wrap gap-3">
//                 {project.link ? (
//                   <GlowButton
//                     href={project.link}
//                     variant="primary"
//                     className="px-4 py-2 text-xs"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Live Demo
//                   </GlowButton>
//                 ) : null}
//                 {project.github ? (
//                   <GlowButton
//                     href={project.github}
//                     variant="secondary"
//                     className="px-4 py-2 text-xs"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     GitHub
//                   </GlowButton>
//                 ) : null}
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// };

// export default ProjectGrid;

import { motion } from "framer-motion";
import GlowButton from "../ui/GlowButton";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaHeart,
  FaStar,
  FaFire,
} from "react-icons/fa";

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
      scale: 0.8,
      rotateX: -10,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
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
            y: -20,
            scale: 1.02,
            rotateX: 2,
            transition: { duration: 0.3 },
          }}
          className="group"
        >
          {/* Project Card */}
          <div className="relative h-full flex flex-col rounded-3xl border-2 border-white/10 bg-gradient-to-br from-white/5 via-slate-900/50 to-black/30 backdrop-blur-2xl p-8 shadow-2xl hover:shadow-3xl hover:shadow-cyan-500/40 transition-all duration-700 overflow-hidden">
            {/* Multi-layer Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Image Container */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-white/15 shadow-xl mb-8 aspect-video">
              {project.image ? (
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  whileHover={{ scale: 1.1 }}
                />
              ) : (
                <div
                  className={`w-full h-full flex items-center justify-center rounded-xl ${getRandomColor()}/20 border border-white/20`}
                >
                  <div className="text-2xl">🚀</div>
                </div>
              )}

              {/* Live Indicator */}
              <motion.div
                className="absolute top-4 right-4 w-6 h-6 bg-green-500/90 rounded-full border-2 border-white/50 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.3 }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-2xl font-black text-white mb-4 group-hover:text-cyan-300 transition-all duration-300 line-clamp-2">
                {project.title}
              </h3>

              <p className="text-slate-300/90 mb-6 leading-relaxed text-base line-clamp-3 flex-1">
                {project.description}
              </p>

              {/* Interactive Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {(project.tags || []).map((tag, tagIndex) => (
                  <motion.span
                    key={tagIndex}
                    className="group/tag rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 px-4 py-2 text-sm font-bold text-cyan-200/90 backdrop-blur-sm shadow-md hover:shadow-cyan-400/50 transition-all duration-300 cursor-default"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="flex items-center gap-4 mb-8 p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                  <FaFire className="w-3 h-3" />
                  <span>Trending</span>
                </div>
                <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full w-4/5 animate-shimmer" />
                </div>
                <div className="text-xs text-purple-400 font-mono">
                  5K+ views
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                {project.link && (
                  <GlowButton
                    href={project.link}
                    variant="primary"
                    className="px-6 py-3 text-sm font-bold shadow-lg hover:shadow-cyan-500/50 flex-1 min-w-[120px]"
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
                    className="px-6 py-3 text-sm font-bold border-2 border-white/20 backdrop-blur-sm flex-1 min-w-[100px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="w-4 h-4 mr-1" />
                    Code
                  </GlowButton>
                )}
                <motion.button
                  className="p-3 rounded-xl bg-gradient-to-r from-pink-500/20 to-red-500/20 border border-pink-400/30 text-pink-300 hover:text-pink-200 hover:bg-pink-500/30 transition-all duration-300 shadow-lg hover:shadow-pink-500/40 flex items-center justify-center"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaHeart className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectGrid;
