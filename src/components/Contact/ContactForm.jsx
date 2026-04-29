import React, { useState } from "react";
import { getContactEmail } from "./contactUtils";

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

    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "Unable to send your message.");
      }

      setStatus({
        type: "success",
        message: "Message sent. I will get back to you soon.",
      });
      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Message sending failed. Please try again in a moment.",
      });
    }
  };

  return (
    <div className="w-full rounded-[2rem] border border-slate-200/70 bg-white/70 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-900/55 md:p-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80 dark:text-cyan-300/80">
          Contact Form
        </p>
        <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
          Send me an email
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Share what you are building and I will reply to your email.
          {directEmail ? (
            <>
              {" "}
              Direct inbox:{" "}
              <a
                href={`mailto:${directEmail}`}
                className="font-semibold text-primary dark:text-cyan-300"
              >
                {directEmail}
              </a>
            </>
          ) : null}
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Name
            </span>
            <input
              type="text"
              value={formData.name}
              onChange={handleChange("name")}
              placeholder="Your name"
              required
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:focus:border-cyan-300 dark:focus:ring-cyan-300/20"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Email
            </span>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="you@example.com"
              required
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:focus:border-cyan-300 dark:focus:ring-cyan-300/20"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Message
          </span>
          <textarea
            rows={5}
            value={formData.message}
            onChange={handleChange("message")}
            placeholder="Tell me about your project, opportunity, or question."
            required
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:focus:border-cyan-300 dark:focus:ring-cyan-300/20"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status.type === "loading"}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-cyan-400 px-6 py-3 font-semibold text-white shadow-md transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status.type === "loading" ? "Sending..." : "Send Email"}
          </button>

          {status.message ? (
            <p
              className={`text-sm ${
                status.type === "error"
                  ? "text-rose-500"
                  : status.type === "success"
                    ? "text-emerald-500"
                    : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {status.message}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
