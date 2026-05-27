import React from "react";

export default function CodeWindow({ children }) {
  return (
    <div className="relative z-10 w-full max-w-4xl mx-4 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-2xl overflow-hidden mt-20">
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-black">
        <div className="flex items-center gap-2">
          <div className="flex gap-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="bg-[#1e1e1e] px-4 py-1 text-sm text-white rounded-t-md flex items-center gap-2 border-t border-blue-500">
            <span className="text-blue-400">JS</span>
            about_me.js
          </div>
        </div>
      </div>

      <div className="p-6 md:p-10 font-mono text-lg md:text-xl leading-relaxed flex">
        <div className="text-gray-600 select-none text-right pr-4 border-r border-gray-700 mr-4 hidden sm:block">
          1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9
        </div>

        <div className="text-gray-300 w-full">
          <span className="text-purple-400">const</span>{" "}
          <span className="text-blue-400">aboutMe</span> ={" "}
          <span className="text-yellow-300">`</span>
          <br />
          <br />
          {children}
          <br />
          <br />
          <span className="text-yellow-300">`;</span>
        </div>
      </div>
    </div>
  );
}
