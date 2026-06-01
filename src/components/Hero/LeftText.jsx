// import { motion } from "framer-motion";
// import GlowButton from "../ui/GlowButton";

// const LeftText = ({ hero }) => {
//   const {
//     firstName,
//     lastName,
//     roleText,
//     primaryButtonText,
//     primaryButtonHref,
//     secondaryButtonText,
//     secondaryButtonHref,
//   } = hero || {};

//   const hasName = Boolean(firstName || lastName);
//   const hasRole = Boolean(roleText);
//   const hasPrimary = Boolean(primaryButtonText && primaryButtonHref);
//   const hasSecondary = Boolean(secondaryButtonText && secondaryButtonHref);

//   return (
//     <motion.div
//       className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1"
//       initial={{ opacity: 0, y: 28 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
//     >
//       {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
//         Neon Portfolio
//       </div> */}

//       {hasName ? (
//         <h1 className="text-5xl md:text-6xl xl:text-7xl font-semibold text-white leading-tight">
//           {firstName}
//           {lastName ? (
//             <>
//               <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple text-glow animate-pulse">
//                 {lastName}
//               </span>
//             </>
//           ) : null}
//         </h1>
//       ) : null}

//       {hasRole ? (
//         <p className="text-slate-300/90 mt-6 text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0">
//           {roleText}
//         </p>
//       ) : null}

//       {hasPrimary || hasSecondary ? (
//         <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//           {hasPrimary ? (
//             <GlowButton href={primaryButtonHref} variant="primary">
//               {primaryButtonText}
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M13 7l5 5m0 0l-5 5m5-5H6"
//                 />
//               </svg>
//             </GlowButton>
//           ) : null}

//           {hasSecondary ? (
//             <GlowButton href={secondaryButtonHref} variant="secondary">
//               {secondaryButtonText}
//             </GlowButton>
//           ) : null}
//         </div>
//       ) : null}
//     </motion.div>
//   );
// };

// export default LeftText;

import { motion } from "framer-motion";
import GlowButton from "../ui/GlowButton";

const LeftText = ({ hero }) => {
  const {
    firstName,
    lastName,
    roleText,
    primaryButtonText,
    primaryButtonHref,
    secondaryButtonText,
    secondaryButtonHref,
  } = hero || {};

  const hasName = Boolean(firstName || lastName);
  const hasRole = Boolean(roleText);
  const hasPrimary = Boolean(primaryButtonText && primaryButtonHref);
  const hasSecondary = Boolean(secondaryButtonText && secondaryButtonHref);

  return (
    <motion.div
      className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {hasName ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[0.85] tracking-tight mb-4">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="block"
            >
              {firstName}
            </motion.span>
            {lastName ? (
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl animate-gradient-x"
              >
                {lastName}
              </motion.span>
            ) : null}
          </h1>
        </motion.div>
      ) : null}

      {hasRole ? (
        <motion.p
          className="text-slate-300/95 mt-8 text-lg lg:text-xl xl:text-2xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {roleText}
        </motion.p>
      ) : null}

      {(hasPrimary || hasSecondary) && (
        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {hasPrimary && (
            <GlowButton
              href={primaryButtonHref}
              variant="primary"
              className="px-8 py-4 text-lg shadow-2xl"
            >
              <span>{primaryButtonText}</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </GlowButton>
          )}

          {hasSecondary && (
            <GlowButton
              href={secondaryButtonHref}
              variant="secondary"
              className="px-8 py-4 text-lg border-2 border-white/20 backdrop-blur-sm"
            >
              {secondaryButtonText}
            </GlowButton>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default LeftText;
