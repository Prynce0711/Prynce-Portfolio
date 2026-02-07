import React from "react";

const RightImage = () => {
  return (
    <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 relative">
      {/* Image Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 blur-2xl opacity-30 rounded-full transform scale-90"></div>

      <img
        src="pic.jpg"
        alt="Prynce Carlo Clemente"
        className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-2xl"
      />
    </div>
  );
};

export default RightImage;
