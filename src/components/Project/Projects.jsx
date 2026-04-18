import React from "react";
import ProjectGrid from "./ProjectGrid";
import { useSiteContent } from "../../context/SiteContentContext";

function Projects() {
  const { siteContent } = useSiteContent();
  const projects = siteContent.projects || {};

  return (
    <section
      id="projects"
      className="bg-gray-50 dark:bg-gray-900 min-h-screen py-24 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 md:px-12">
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {projects.titleLead || "Featured"}{" "}
            <span className="text-blue-600">
              {projects.titleHighlight || "Projects"}
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {projects.description ||
              "A collection of my technical projects, architectural designs, and case studies."}
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </div>
      </div>
      <ProjectGrid projects={projects.items || []} />
    </section>
  );
}

export default Projects;
