import React from "react";

const ProjectGrid = ({ projects = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {projects.map((project, index) => (
        <div
          key={index}
          className="group flex h-full flex-col bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-soft hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 border border-gray-100/60 dark:border-gray-700/40"
        >
          {/* Image Container with Zoom Effect */}
          <div className="relative overflow-hidden h-64">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=Project+Image";
              }}
            />
          </div>

          {/* Content Body */}
          <div className="flex flex-1 flex-col p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>

            <p className="mb-6 flex-1 text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(project.tags || []).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 text-xs font-semibold tracking-wide text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Button */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              View Project
              <svg
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
