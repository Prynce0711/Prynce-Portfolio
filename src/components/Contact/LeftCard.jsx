import React from "react";

const LeftCard = ({ contact }) => {
  const {
    titleLead = "Ready to build",
    titleHighlight = "something great?",
    description = "I am currently available for freelance work and full-time opportunities. Lets connect and turn your vision into a reality.",
    availabilityText = "Available for New Projects",
  } = contact || {};

  const mailHref = contact?.email ? `mailto:${contact.email}` : "#contact";

  return (
    <div className="lg:w-1/2">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.05] mb-6 tracking-tight">
        {titleLead} <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
          {titleHighlight}
        </span>
      </h2>
      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-xl">
        {description}
      </p>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-3 text-green-500 font-semibold uppercase tracking-widest text-xs">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          {availabilityText}
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <a
          href={mailHref}
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-cyan-400 text-white rounded-full shadow-md hover:shadow-lg transition"
        >
          Contact Me
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0v6a2 2 0 0 1-2 2h-6m8-8L10 21"
            ></path>
          </svg>
        </a>

        <a
          href="#projects"
          className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition"
        >
          See Featured Work →
        </a>
      </div>
    </div>
  );
};

export default LeftCard;
