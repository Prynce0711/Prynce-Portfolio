import React from "react";

const LeftCard = () => {
  return (
    <div className="lg:w-1/2">
      <h2 className="text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tighter">
        Ready to build <br />
        <span className="text-blue-600">something great?</span>
      </h2>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-md">
        I’m currently available for freelance work and full-time opportunities.
        Let’s connect and turn your vision into a reality.
      </p>

      <div className="flex items-center gap-3 text-green-500 font-semibold uppercase tracking-widest text-xs animate-pulse">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        Available for New Projects
      </div>
    </div>
  );
};

export default LeftCard;
