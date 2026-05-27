// import { FiArrowUpRight } from "react-icons/fi";
// import { socialIconMap } from "../../lib/iconMaps";

// const RightCard = ({ contact }) => {
//   const socialLinks = contact?.socials || [];

//   return (
//     <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
//       {socialLinks.map((social, index) => {
//         const Icon = socialIconMap[social.iconKey] || socialIconMap.link;

//         return (
//           <a
//             key={index}
//             href={social.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-neon aspect-square sm:aspect-auto sm:h-48"
//           >
//             <div className="flex justify-between items-start">
//               <div
//                 className={`p-3 rounded-xl text-2xl bg-white/10 shadow ${
//                   social.color || "text-cyan-200"
//                 }`}
//               >
//                 <Icon />
//               </div>
//               <FiArrowUpRight className="text-xl text-slate-400 group-hover:text-cyan-200 transition-all" />
//             </div>

//             <div>
//               <p className="text-sm font-bold text-slate-400 mb-1">
//                 {social.name}
//               </p>
//               <p className="text-lg font-semibold text-slate-200 truncate">
//                 {social.value}
//               </p>
//             </div>
//           </a>
//         );
//       })}
//     </div>
//   );
// };

// export default RightCard;

import { FiArrowUpRight } from "react-icons/fi";
import { socialIconMap } from "../../lib/iconMaps";

const RightCard = ({ contact }) => {
  const socialLinks = contact?.socials || [];

  return (
    <div className="rc-root">
      <div className="rc-grid">
        {socialLinks.map((social, index) => {
          const Icon = socialIconMap[social.iconKey] || socialIconMap.link;
          const isWide =
            socialLinks.length % 2 !== 0 && index === socialLinks.length - 1;

          return (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`rc-card ${isWide ? "rc-card--wide" : ""}`}
              style={{ "--accent": social.accentColor || "#06b6d4" }}
            >
              {/* hover glow layer */}
              <span className="rc-card-glow" aria-hidden />

              {/* top row */}
              <div className="rc-card-top">
                <span className="rc-icon-wrap">
                  <Icon />
                </span>
                <FiArrowUpRight className="rc-arrow" />
              </div>

              {/* bottom row */}
              <div className="rc-card-bottom">
                <p className="rc-label">{social.name}</p>
                <p className="rc-value">{social.value}</p>
              </div>
            </a>
          );
        })}
      </div>

      <style>{`
        .rc-root {
          width: 100%;
        }

        .rc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .rc-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 1.5rem;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          padding: 1.25rem;
          min-height: 140px;
          overflow: hidden;
          text-decoration: none;
          transition: border-color 0.3s ease, transform 0.3s ease;
          backdrop-filter: blur(12px);
        }
        .rc-card:hover {
          border-color: rgba(6,182,212,0.35);
          transform: translateY(-3px);
        }
        .rc-card:hover .rc-card-glow {
          opacity: 1;
        }
        .rc-card:hover .rc-arrow {
          color: #67e8f9;
          transform: translate(2px, -2px);
        }
        .rc-card:hover .rc-icon-wrap {
          background: rgba(6,182,212,0.18);
          box-shadow: 0 0 16px rgba(6,182,212,0.25);
        }

        .rc-card--wide {
          grid-column: 1 / -1;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
          min-height: 80px;
        }
        .rc-card--wide .rc-card-top {
          flex-shrink: 0;
        }
        .rc-card--wide .rc-card-bottom {
          flex: 1;
        }

        .rc-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 80%, rgba(6,182,212,0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .rc-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .rc-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255,255,255,0.07);
          font-size: 18px;
          color: #e2e8f0;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }

        .rc-arrow {
          font-size: 16px;
          color: rgba(148,163,184,0.5);
          transition: color 0.3s ease, transform 0.3s ease;
          flex-shrink: 0;
        }

        .rc-card-bottom {
          margin-top: auto;
        }

        .rc-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.55);
          margin: 0 0 4px;
          font-family: 'Courier New', monospace;
        }

        .rc-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: #e2e8f0;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
};

export default RightCard;
