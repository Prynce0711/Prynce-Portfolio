
const projectData = [
  {
    title: "Barcie International Center",
    description: "Capstone Project for LCUP’s premier laboratory facility for BS Tourism Management. A full-scale management system.",
    tags: ["PHP", "Tailwind", "JavaScript"],
    image: "barcie.png", // Ensure this image is in your public folder
    link: "http://barcie.safehub-lcup.uk",
  },
  {
    title: "Portfolio",
    description: "A personal collection of my work built with Laravel. Showcasing my early journey in full-stack development.",
    tags: ["TailwindCSS", "React", "Laravel"],
    image: "portfolio.png",
    link: "https://prynce-carlo-portfolio.vercel.app/",
  },

];

function Projects() {
  return (
    <section id="projects" className="bg-gray-50 dark:bg-gray-900 min-h-screen py-24 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-12">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Featured <span className="text-blue-600">Projects</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of my technical projects, architectural designs, and case studies.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projectData.map((project, index) => (
            <div 
              key={index} 
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative overflow-hidden h-64">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=Project+Image'}} 
                />
              </div>

              {/* Content Body */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
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
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Projects;