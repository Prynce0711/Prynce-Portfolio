import React from 'react';

function Hero() {
  return (
    <section className="relative bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center overflow-hidden">
      {/* Background Decorative Blob (Optional) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 hidden lg:block">
        <div className="w-96 h-96 bg-blue-500/20 blur-3xl rounded-full mix-blend-multiply dark:mix-blend-overlay animate-blob"></div>
      </div>

      <div className="container mx-auto px-4 md:px-12 lg:px-24 py-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT TEXT */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              Prynce Carlo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                Clemente
              </span>
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0">
              Student | Full Stack Web Developer
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                Get started
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800"
              >
                View Projects
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 relative">
            {/* Image Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 blur-2xl opacity-30 rounded-full transform scale-90"></div>
            
            <img
              src="pic.jpg" 
              alt="Prynce Carlo Clemente"
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;