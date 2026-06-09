import ProjectGrid from "./ProjectGrid";
import { useSiteContent } from "../../context/SiteContentContext";
import Section from "../ui/Section";
import { FaPalette, FaRocket } from "react-icons/fa";

function Projects() {
  const { siteContent, isContentLoading, contentError } = useSiteContent();
  const projects = siteContent.projects || {};
  const hasTitle = Boolean(projects.titleLead || projects.titleHighlight);
  const hasDescription = Boolean(projects.description);
  const items = projects.items || [];
  const hasContent = hasTitle || hasDescription || items.length > 0;

  return (
    <Section id="projects" className="relative overflow-hidden">
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
          {isContentLoading ? (
            <p className="mt-6 text-lg text-slate-300/80">
              Loading projects...
            </p>
          ) : contentError ? (
            <p className="mt-6 text-lg text-rose-200">
              Unable to load projects. {contentError}
            </p>
          ) : hasTitle ? (
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl animate-gradient-flow">
              {projects.titleLead ? `${projects.titleLead} ` : ""}
              {projects.titleHighlight ? (
                <span className="block">{projects.titleHighlight}</span>
              ) : null}
            </h2>
          ) : null}

          {!isContentLoading && !contentError && hasDescription ? (
            <p className="mt-8 text-xl lg:text-2xl text-slate-300/90 max-w-3xl mx-auto font-medium leading-relaxed">
              {projects.description}
            </p>
          ) : null}

          {!isContentLoading && !contentError && !hasContent ? (
            <p className="mt-6 text-lg text-slate-300/80">
              Projects content is not available yet.
            </p>
          ) : null}
        </div>

        {!isContentLoading && !contentError && items.length ? (
          <ProjectGrid projects={items} />
        ) : !isContentLoading && !contentError && hasContent ? (
          <p className="text-center text-slate-300/80">
            Project entries are not available yet.
          </p>
        ) : null}
      </div>
    </Section>
  );
}

export default Projects;
