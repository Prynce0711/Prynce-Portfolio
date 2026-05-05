// import { motion } from "framer-motion";

// const RightImage = ({ hero }) => {
//   const { imageSrc, imageAlt } = hero || {};

//   if (!imageSrc) {
//     return null;
//   }

//   return (
//     <motion.div
//       className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 relative"
//       initial={{ opacity: 0, y: 24 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
//     >
//       <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-blue/50 to-neon-purple/40 blur-3xl opacity-70 animate-float" />
//       <div className="relative rounded-full p-2 bg-white/5 border border-white/15 shadow-neon">
//         <img
//           src={imageSrc}
//           alt={imageAlt || ""}
//           className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full border border-cyan-300/40"
//         />
//       </div>
//     </motion.div>
//   );
// };

// export default RightImage;

import { motion } from "framer-motion";

const RightImage = ({ hero }) => {
  const { imageSrc, imageAlt } = hero || {};

  if (!imageSrc) return null;

  return (
    <motion.div
      className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 relative"
      initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.4,
        scale: { type: "spring", stiffness: 100 },
      }}
    >
      {/* Multi-layered Glow Effects */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl shadow-2xl"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-neon-blue/30 to-neon-purple/30 border border-white/20 shadow-neon-glow"
        animate={{
          scale: [1, 1.02, 1],
          borderRadius: ["3xl", "2xl", "3xl"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      /> */}

      {/* Profile Image Container */}
      <motion.div
        className="relative group rounded-3xl p-4 md:p-6 bg-gradient-to-br from-white/5 to-slate-900/50 border-2 border-white/15 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-all duration-500 hover:scale-105"
        whileHover={{ scale: 1.02, rotateY: 5 }}
        whileTap={{ scale: 0.98 }}
      >
        <img
          src={imageSrc}
          alt={imageAlt || "Developer Portfolio"}
          className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl border-4 border-white/20 shadow-2xl group-hover:shadow-cyan-400/50 transition-all duration-500"
          loading="lazy"
        />

        {/* Floating Code Badge
        <motion.div
          className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 px-4 py-2 rounded-xl text-white text-xs font-mono shadow-lg border border-white/30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, type: "spring" }}
        >
          <div>⌨️ Frontend</div>
          <div className="text-[10px]">Backend Pro</div>
        </motion.div> */}
      </motion.div>
    </motion.div>
  );
};

export default RightImage;
