// import { useState } from "react";
// import { getContactEmail } from "./contactUtils";
// import GlowButton from "../ui/GlowButton";

// const INITIAL_FORM_STATE = {
//   name: "",
//   email: "",
//   message: "",
// };

// const CONTACT_FORM_ENDPOINT =
//   import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "/api/contact";

// const ContactForm = ({ contact }) => {
//   const directEmail = getContactEmail(contact);
//   const [formData, setFormData] = useState(INITIAL_FORM_STATE);
//   const [status, setStatus] = useState({ type: "idle", message: "" });

//   const handleChange = (field) => (event) => {
//     const { value } = event.target;

//     setFormData((currentData) => ({
//       ...currentData,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setStatus({ type: "loading", message: "Sending your message..." });

//     try {
//       const response = await fetch(CONTACT_FORM_ENDPOINT, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const payload = await response.json().catch(() => ({}));

//       if (!response.ok) {
//         throw new Error(payload.error || "Unable to send your message.");
//       }

//       setStatus({
//         type: "success",
//         message: "Message sent. I will get back to you soon.",
//       });
//       setFormData(INITIAL_FORM_STATE);
//     } catch (error) {
//       setStatus({
//         type: "error",
//         message:
//           error.message ||
//           "Message sending failed. Please try again in a moment.",
//       });
//     }
//   };

//   return (
//     <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-soft md:p-8">
//       <div className="mb-6">
//         <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
//           Contact Form
//         </p>
//         <h3 className="mt-3 text-2xl font-semibold text-white">
//           Send me an email
//         </h3>
//         <p className="mt-3 text-sm leading-relaxed text-slate-300/80">
//           Share what you are building and I will reply to your email.
//           {directEmail ? (
//             <>
//               {" "}
//               Direct inbox:{" "}
//               <a
//                 href={`mailto:${directEmail}`}
//                 className="font-semibold text-cyan-300"
//               >
//                 {directEmail}
//               </a>
//             </>
//           ) : null}
//         </p>
//       </div>

//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div className="grid gap-4 sm:grid-cols-2">
//           <label className="block">
//             <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
//               Name
//             </span>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={handleChange("name")}
//               placeholder="Your name"
//               required
//               className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
//             />
//           </label>

//           <label className="block">
//             <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
//               Email
//             </span>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={handleChange("email")}
//               placeholder="you@example.com"
//               required
//               className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
//             />
//           </label>
//         </div>

//         <label className="block">
//           <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
//             Message
//           </span>
//           <textarea
//             rows={5}
//             value={formData.message}
//             onChange={handleChange("message")}
//             placeholder="Tell me about your project, opportunity, or question."
//             required
//             className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
//           />
//         </label>

//         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <GlowButton
//             type="submit"
//             disabled={status.type === "loading"}
//             className="disabled:cursor-not-allowed disabled:opacity-70"
//           >
//             {status.type === "loading" ? "Sending..." : "Send Email"}
//           </GlowButton>

//           {status.message ? (
//             <p
//               className={`text-sm ${
//                 status.type === "error"
//                   ? "text-rose-500"
//                   : status.type === "success"
//                     ? "text-emerald-500"
//                     : "text-slate-400"
//               }`}
//             >
//               {status.message}
//             </p>
//           ) : null}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;

import { useState } from "react";
import { getContactEmail } from "./contactUtils";
import GlowButton from "../ui/GlowButton";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  message: "",
};

const CONTACT_FORM_ENDPOINT =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "/api/contact";

const ContactForm = ({ contact }) => {
  const directEmail = getContactEmail(contact);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setFormData((currentData) => ({ ...currentData, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "Unable to send your message.");
      }

      setStatus({
        type: "success",
        message: "Message sent — I'll reply soon!",
      });
      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Failed to send. Please try again.",
      });
    }
  };

  return (
    <div className="cf-root">
      {/* subtle inner top border shine */}
      <div className="cf-shine" aria-hidden />

      {/* header */}
      <div className="cf-header">
        <h3 className="cf-title">Send me a message</h3>
        {directEmail && (
          <a href={`mailto:${directEmail}`} className="cf-direct-link">
            ↗ {directEmail}
          </a>
        )}
      </div>

      {/* form */}
      <form onSubmit={handleSubmit}>
        {/* row: name + email */}
        <div className="cf-row">
          <div className="cf-field">
            <span className="cf-field-label">Name</span>
            <input
              type="text"
              value={formData.name}
              onChange={handleChange("name")}
              placeholder="Your name"
              required
              className="cf-input"
            />
          </div>
          <div className="cf-field">
            <span className="cf-field-label">Email</span>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="you@example.com"
              required
              className="cf-input"
            />
          </div>
        </div>

        {/* message */}
        <div className="cf-field" style={{ marginTop: "14px" }}>
          <span className="cf-field-label">Message</span>
          <textarea
            rows={5}
            value={formData.message}
            onChange={handleChange("message")}
            placeholder="Tell me about your project, opportunity, or question."
            required
            className="cf-input cf-textarea"
          />
        </div>

        {/* submit row */}
        <div className="cf-submit-row">
          <GlowButton
            type="submit"
            disabled={status.type === "loading"}
            className="disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status.type === "loading" ? "Sending…" : "Send Message"}
          </GlowButton>

          {status.message && (
            <p className={`cf-status cf-status--${status.type}`}>
              {status.message}
            </p>
          )}
        </div>
      </form>

      <style>{`
        .cf-root {
          position: relative;
          width: 100%;
          border-radius: 2rem;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          padding: 2rem;
          backdrop-filter: blur(20px);
          overflow: hidden;
        }

        .cf-shine {
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent);
          pointer-events: none;
        }

        .cf-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 1.75rem;
        }

        .cf-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          margin: 0;
          font-family: 'Georgia', serif;
        }

        .cf-direct-link {
          font-size: 11px;
          font-weight: 600;
          color: rgba(103,232,249,0.8);
          text-decoration: none;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }
        .cf-direct-link:hover {
          color: #67e8f9;
        }

        .cf-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 500px) {
          .cf-row { grid-template-columns: 1fr; }
        }

        .cf-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .cf-field-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.6);
          font-family: 'Courier New', monospace;
        }

        .cf-input {
          width: 100%;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          padding: 12px 16px;
          font-size: 0.875rem;
          color: #fff;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          font-family: inherit;
          resize: none;
          box-sizing: border-box;
        }
        .cf-input::placeholder {
          color: rgba(148,163,184,0.35);
        }
        .cf-input:focus {
          border-color: rgba(6,182,212,0.55);
          background: rgba(6,182,212,0.04);
          box-shadow: 0 0 0 3px rgba(6,182,212,0.1), inset 0 1px 0 rgba(6,182,212,0.08);
        }

        .cf-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }

        .cf-submit-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 18px;
        }

        .cf-status {
          font-size: 0.8rem;
          margin: 0;
        }
        .cf-status--error   { color: #f87171; }
        .cf-status--success { color: #6ee7b7; }
        .cf-status--loading { color: rgba(148,163,184,0.7); }
      `}</style>
    </div>
  );
};

export default ContactForm;
