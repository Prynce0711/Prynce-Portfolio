// import ContactForm from "./ContactForm";
// import LeftCard from "./LeftCard";
// import RightCard from "./RightCard";
// import { useSiteContent } from "../../context/SiteContentContext";
// import Section from "../ui/Section";

// const Contact = () => {
//   const { siteContent } = useSiteContent();
//   const contact = siteContent.contact || {};

//   return (
//     <Section id="contact" className="relative">
//       <div className="container mx-auto px-6 lg:px-16">
//         <div className="grid lg:grid-cols-12 gap-10 items-start">
//           <div className="lg:col-span-5">
//             <LeftCard contact={contact} />
//           </div>

//           <div className="lg:col-span-7 space-y-8">
//             <ContactForm contact={contact} />
//             <RightCard contact={contact} />
//           </div>
//         </div>
//       </div>
//     </Section>
//   );
// };

// export default Contact;

import ContactForm from "./ContactForm";
import LeftCard from "./LeftCard";
import { useSiteContent } from "../../context/SiteContentContext";
import Section from "../ui/Section";

/* ── styles injected once ─────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;1,400;1,600&display=swap');

  @keyframes ctFadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ctSlideIn {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes ctLineGrow {
    from { transform: scaleX(0); opacity: 0; }
    to   { transform: scaleX(1); opacity: 1; }
  }
  @keyframes ctOrbit {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes ctPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }

  /* section wrapper */
  .ct-section {
    position: relative;
    overflow: hidden;
    padding: 6rem 0 5rem;
  }

  /* background canvas */
  .ct-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .ct-bg-blob-a {
    position: absolute;
    top: -15%;
    right: -10%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 65%);
    filter: blur(50px);
  }
  .ct-bg-blob-b {
    position: absolute;
    bottom: -10%;
    left: -8%;
    width: 480px;
    height: 480px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%);
    filter: blur(50px);
  }
  .ct-bg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 70% 70% at 60% 40%, black 20%, transparent 80%);
  }

  /* container */
  .ct-container {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* ── HEADER ── */
  .ct-header {
    margin-bottom: 4rem;
    opacity: 0;
    animation: ctFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.05s forwards;
  }
  .ct-header-eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1rem;
  }
  .ct-eyebrow-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #06b6d4;
    box-shadow: 0 0 10px rgba(6,182,212,0.8);
    flex-shrink: 0;
    animation: ctPulse 2.2s ease-in-out infinite;
  }
  .ct-eyebrow-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.36em;
    text-transform: uppercase;
    color: rgba(103,232,249,0.85);
    font-family: 'Courier New', monospace;
  }
  .ct-eyebrow-line {
    height: 1px;
    width: 80px;
    background: linear-gradient(90deg, #06b6d4, transparent);
    transform-origin: left;
    animation: ctLineGrow 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s both;
  }

  .ct-header-title {
    font-size: clamp(2.4rem, 5.5vw, 4rem);
    font-weight: 700;
    line-height: 1.04;
    color: #fff;
    letter-spacing: -0.04em;
    margin: 0;
    font-family: 'Lora', Georgia, serif;
  }
  .ct-header-title em {
    font-style: italic;
    font-weight: 400;
    background: linear-gradient(125deg, #67e8f9 0%, #a78bfa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── BENTO GRID ── */
  .ct-bento {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 16px;
  }

  @media (min-width: 768px) {
    .ct-bento {
      grid-template-columns: 1fr 1fr;
    }
    .ct-bento-hero    { grid-column: 1; grid-row: 1; }
    .ct-bento-form    { grid-column: 2; grid-row: 1 / 3; }
    .ct-bento-socials { grid-column: 1; grid-row: 2; }
  }

  @media (min-width: 1024px) {
    .ct-bento {
      grid-template-columns: 5fr 7fr;
    }
  }

  /* animation stagger */
  .ct-bento-hero {
    opacity: 0;
    animation: ctSlideIn 0.65s cubic-bezier(0.22,1,0.36,1) 0.2s forwards;
  }
  .ct-bento-form {
    opacity: 0;
    animation: ctFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.32s forwards;
  }
  .ct-bento-socials {
    opacity: 0;
    animation: ctFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.46s forwards;
  }

  /* section label pills above each block */
  .ct-block-label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }
  .ct-block-label-num {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid rgba(6,182,212,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    font-weight: 800;
    color: #67e8f9;
    font-family: 'Courier New', monospace;
    flex-shrink: 0;
  }
  .ct-block-label-text {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(148,163,184,0.55);
    font-family: 'Courier New', monospace;
  }
  .ct-block-label-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,255,255,0.06), transparent);
  }

  /* ── FOOTER BAR ── */
  .ct-footer {
    margin-top: 3.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    opacity: 0;
    animation: ctFadeUp 0.6s ease 0.6s forwards;
  }
  .ct-footer-copy {
    font-size: 10px;
    font-family: 'Courier New', monospace;
    color: rgba(148,163,184,0.35);
    letter-spacing: 0.12em;
  }
  .ct-footer-slug {
    font-size: 10px;
    font-family: 'Courier New', monospace;
    color: rgba(6,182,212,0.45);
    letter-spacing: 0.12em;
  }
`;

function injectContactStyles() {
  if (document.getElementById("ct-section-styles")) return;
  const el = document.createElement("style");
  el.id = "ct-section-styles";
  el.textContent = STYLES;
  document.head.appendChild(el);
}

/* ─── component ───────────────────────────────────────────────────────── */
const Contact = () => {
  injectContactStyles();

  const { siteContent, isContentLoading, contentError } = useSiteContent();
  const contact = siteContent.contact || {};
  const hasContactContent = Boolean(
    contact.titleLead ||
      contact.titleHighlight ||
      contact.description ||
      contact.availabilityText ||
      contact.email ||
      (contact.socials || []).length,
  );

  return (
    <Section id="contact" className="ct-section">
      <div className="ct-container">
        {/* ── header ── */}
        <header className="ct-header">
          <div className="ct-header-eyebrow">
            <span className="ct-eyebrow-dot" />
            <span className="ct-eyebrow-label">Let's connect</span>
            <div className="ct-eyebrow-line" />
          </div>
          <h2 className="ct-header-title">
            Get in <em>Touch</em>
          </h2>
          {isContentLoading ? (
            <p className="mt-4 text-sm text-slate-300/80">
              Loading contact content...
            </p>
          ) : contentError ? (
            <p className="mt-4 text-sm text-rose-200">
              Unable to load contact content. {contentError}
            </p>
          ) : !hasContactContent ? (
            <p className="mt-4 text-sm text-slate-300/80">
              Contact content is not available yet.
            </p>
          ) : null}
        </header>
        {/* ── bento grid ── */}
        <div className="ct-bento">
          {/* CELL 1 — hero / left card */}
          <div className="ct-bento-hero">
            <div className="ct-block-label">
              {/* <span className="ct-block-label-num">01</span>
              <span className="ct-block-label-text">About</span> */}
              <div className="ct-block-label-line" />
            </div>
            {!isContentLoading && !contentError && hasContactContent ? (
              <LeftCard contact={contact} />
            ) : null}
          </div>
          {/* CELL 2 — contact form (tall, spans 2 rows on md+) */}
          <div className="ct-bento-form">
            <div className="ct-block-label">
              {/* <span className="ct-block-label-num">02</span>
              <span className="ct-block-label-text">Send a message</span> */}
              <div className="ct-block-label-line" />
            </div>
            <ContactForm contact={contact} />
          </div>
          {/* CELL 3 — social links
          <div className="ct-bento-socials">
            <div className="ct-block-label">
              <span className="ct-block-label-num">03</span>
              <span className="ct-block-label-text">Find me elsewhere</span>
              <div className="ct-block-label-line" />
            </div>
            <RightCard contact={contact} />
          </div> */}
        </div>
        {/* ── footer bar ──
        <div className="ct-footer">
          <span className="ct-footer-copy">
            © {new Date().getFullYear()} — Designed &amp; built with care
          </span>
          <span className="ct-footer-slug">/contact</span>
        </div> */}
      </div>
    </Section>
  );
};

export default Contact;
