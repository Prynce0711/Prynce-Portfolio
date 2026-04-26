import React from "react";

const LeftText = ({ hero }) => {
  const {
    firstName = "Prynce Carlo",
    lastName = "Clemente",
    roleText = "Student | Full Stack Web Developer",
    primaryButtonText = "Get Started",
    primaryButtonHref = "#about",
    secondaryButtonText = "View Projects",
    secondaryButtonHref = "#projects",
  } = hero || {};

  return (
    <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
        {firstName} <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
          {lastName}
        </span>
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0">
        {roleText}
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <a
          href={primaryButtonHref}
          className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 transform bg-gradient-to-r from-primary to-cyan-400 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {primaryButtonText}
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>

        <a
          href={secondaryButtonHref}
          className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800"
        >
          {secondaryButtonText}
        </a>
      </div>
    </div>
  );
};

export default LeftText;
