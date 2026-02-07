import React from "react";
import SocialLinks from "./SocialLink";
import { FiArrowUpRight } from "react-icons/fi";

const RightCard = () => {
  return (
    <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      {SocialLinks.map((social, index) => (
        <a
          key={index}
          href={social.link}
          className="group p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between aspect-square sm:aspect-auto sm:h-48"
        >
          <div className="flex justify-between items-start">
            <div className={`p-3 rounded-2xl text-2xl ${social.color}`}>
              {social.icon}
            </div>
            <FiArrowUpRight className="text-2xl text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>

          <div>
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 mb-1">
              {social.name}
            </p>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-200 truncate">
              {social.value}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default RightCard;
