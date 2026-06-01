// import { getMailToHref } from "./contactUtils";
// import GlowButton from "../ui/GlowButton";

// const LeftCard = ({ contact }) => {
//   const {
//     titleLead = "Ready to build",
//     titleHighlight = "something great?",
//     description = "I am currently available for freelance work and full-time opportunities. Lets connect and turn your vision into a reality.",
//     availabilityText = "Available for New Projects",
//   } = contact || {};

//   const mailHref = getMailToHref(contact);

//   return (
//     <div>
//       <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/80">
//         Contact
//       </p>
//       <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-white leading-[1.05]">
//         {titleLead}
//         <br />
//         <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
//           {titleHighlight}
//         </span>
//       </h2>
//       <p className="mt-6 text-lg text-slate-300/80 leading-relaxed max-w-xl">
//         {description}
//       </p>

//       <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
//         <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
//         {availabilityText}
//       </div>

//       <div className="mt-8 flex flex-wrap gap-4">
//         <GlowButton href={mailHref} variant="primary">
//           Contact Me
//         </GlowButton>
//         <GlowButton href="#projects" variant="secondary">
//           View Projects
//         </GlowButton>
//       </div>
//     </div>
//   );
// };

// export default LeftCard;

import { getMailToHref } from "./contactUtils";
import GlowButton from "../ui/GlowButton";

const LeftCard = ({ contact }) => {
  const {
    titleLead,
    titleHighlight,
    description,
    availabilityText,
  } = contact || {};

  const hasContent = Boolean(
    titleLead || titleHighlight || description || availabilityText,
  );

  const mailHref = getMailToHref(contact);

  return (
    <div className="left-card-root">
      {/* ── top eyebrow ── */}
      <div className="lc-eyebrow">
        <span className="lc-eyebrow-dot" />
        <span className="lc-eyebrow-text">Contact</span>
      </div>

      {hasContent ? (
        <>
          {/* ── display headline ── */}
          {(titleLead || titleHighlight) && (
            <h2 className="lc-headline">
              {titleLead || ""}
              {titleHighlight ? (
                <>
                  <br />
                  <em className="lc-headline-em">{titleHighlight}</em>
                </>
              ) : null}
            </h2>
          )}

          {/* ── description ── */}
          {description ? <p className="lc-description">{description}</p> : null}

          {/* ── availability chip ── */}
          {availabilityText ? (
            <div className="lc-chip">
              <span className="lc-chip-dot" />
              {availabilityText}
            </div>
          ) : null}

          {/* ── CTA buttons ── */}
          <div className="lc-actions">
            <GlowButton href={mailHref} variant="primary">
              Contact Me
            </GlowButton>
            <GlowButton href="#projects" variant="secondary">
              View Projects
            </GlowButton>
          </div>
        </>
      ) : (
        <p className="lc-description">Contact content is not available yet.</p>
      )}

      {/* ── decorative corner accent ── */}
      <div className="lc-corner-accent" aria-hidden>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle
            cx="40"
            cy="40"
            r="39"
            stroke="rgba(6,182,212,0.15)"
            strokeWidth="1"
          />
          <circle
            cx="40"
            cy="40"
            r="28"
            stroke="rgba(6,182,212,0.08)"
            strokeWidth="1"
          />
          <circle cx="40" cy="40" r="4" fill="rgba(6,182,212,0.4)" />
        </svg>
      </div>

      <style>{`
        .left-card-root {
          position: relative;
          padding: 2.5rem;
          border-radius: 2rem;
          border: 1px solid rgba(255,255,255,0.07);
          background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
          backdrop-filter: blur(20px);
          overflow: hidden;
        }

        .lc-corner-accent {
          position: absolute;
          bottom: -20px;
          right: -20px;
          opacity: 0.6;
          pointer-events: none;
        }

        .lc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 1.5rem;
        }
        .lc-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #06b6d4;
          box-shadow: 0 0 8px #06b6d4;
          animation: lcPulse 2s ease-in-out infinite;
        }
        .lc-eyebrow-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(103,232,249,0.8);
          font-family: 'Courier New', monospace;
        }

        .lc-headline {
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700;
          line-height: 1.08;
          color: #fff;
          letter-spacing: -0.04em;
          margin: 0 0 1.25rem;
          font-family: 'Georgia', 'Times New Roman', serif;
        }
        .lc-headline-em {
          font-style: italic;
          background: linear-gradient(120deg, #06b6d4 20%, #a78bfa 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lc-description {
          font-size: 0.925rem;
          line-height: 1.75;
          color: rgba(203,213,225,0.7);
          margin: 0 0 1.75rem;
          max-width: 36ch;
        }

        .lc-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 100px;
          border: 1px solid rgba(52,211,153,0.3);
          background: rgba(52,211,153,0.08);
          padding: 6px 14px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #6ee7b7;
          margin-bottom: 2rem;
        }
        .lc-chip-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #34d399;
          animation: lcPulse 1.8s ease-in-out infinite;
        }

        .lc-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        @keyframes lcPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};

export default LeftCard;
