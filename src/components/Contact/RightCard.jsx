import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { socialIconMap } from "../../lib/iconMaps";

const RightCard = ({ contact }) => {
  const socialLinks = contact?.socials || [];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      {socialLinks.map((social, index) => {
        const Icon = socialIconMap[social.iconKey] || socialIconMap.link;

        return (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-3xl bg-white/60 dark:bg-slate-900/50 border border-slate-100/40 dark:border-slate-800/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between aspect-square sm:aspect-auto sm:h-48"
          >
            <div className="flex justify-between items-start">
              <div
                className={`p-3 rounded-xl text-2xl text-white bg-gradient-to-br from-primary to-cyan-400 shadow ${social.color ? "" : ""}`}
              >
                <Icon />
              </div>
              <FiArrowUpRight className="text-xl text-slate-400 group-hover:text-primary transition-all" />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-400 dark:text-slate-500 mb-1">
                {social.name}
              </p>
              <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 truncate">
                {social.value}
              </p>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default RightCard;
