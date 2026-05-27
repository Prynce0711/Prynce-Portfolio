import ProjectGrid from "./ProjectGrid";
import { useSiteContent } from "../../context/SiteContentContext";
import Section from "../ui/Section";
import { FaPalette, FaCode, FaRocket } from "react-icons/fa";

function Projects() {
  const { siteContent } = useSiteContent();
  const projects = siteContent.projects || {};
  const hasTitle = Boolean(projects.titleLead || projects.titleHighlight);
  const hasDescription = Boolean(projects.description);

  return (
    <Section id="projects" className="relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-3xl blur-3xl animate-pulse animation-delay-3s" />
        <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-gradient-to-r from-yellow-500/10 to-cyan-500/10 rounded-3xl blur-2xl animate-bounce-slow" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Epic Header */}
        <div className="text-center mb-20 lg:mb-24">
          <div className="inline-flex items-center gap-3 mb-8 px-8 py-4 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border-2 border-white/20 backdrop-blur-xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-105">
            <FaRocket className="w-6 h-6 text-yellow-400 animate-spin-slow" />
            <span className="text-lg font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Featured Works
            </span>
            <FaPalette className="w-5 h-5 text-pink-400 animate-pulse" />
          </div>

          {hasTitle ? (
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl animate-gradient-flow">
              {projects.titleLead ? `${projects.titleLead} ` : ""}
              {projects.titleHighlight ? (
                <span className="block">{projects.titleHighlight}</span>
              ) : null}
            </h2>
          ) : (
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
              My Creations ✨
            </h2>
          )}

          {hasDescription ? (
            <p className="mt-8 text-xl lg:text-2xl text-slate-300/90 max-w-3xl mx-auto font-medium leading-relaxed">
              {projects.description ||
                "Handcrafted projects that showcase my skills and passion for creating awesome digital experiences!"}
            </p>
          ) : null}
        </div>

        <ProjectGrid projects={projects.items || []} />
      </div>
    </Section>
  );
}

export default Projects;
