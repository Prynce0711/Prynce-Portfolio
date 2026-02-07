import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-gray-400 py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* Decorative top line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>

        {/* Content */}
        <div className="text-center space-y-2 mt-4">
          <p className="text-3xl font-light">
            Designed & Built by{" "}
            <span className="text-white font-semibold">Prynce</span>
          </p>
          <p className="text-2xl text-gray-500">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>

        {/* Subtle tech stack credit (optional) */}
        <div className="mt-6 text-center">
          <p className="text-xl text-gray-600 flex items-center justify-center gap-2">
            <span>Made with</span>
            <span className="text-blue-400">React</span>
            <span>·</span>
            <span className="text-cyan-400">Tailwind CSS</span>
            <span>·</span>
            <span className="text-purple-400">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
