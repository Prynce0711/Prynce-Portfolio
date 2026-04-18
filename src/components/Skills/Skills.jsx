import React from "react";
import { useSiteContent } from "../../context/SiteContentContext";
import { skillIconMap } from "../../lib/iconMaps";

const Skills = () => {
  const { siteContent } = useSiteContent();
  const skillsContent = siteContent.skills || {};
  const skillGroups = skillsContent.groups || [];

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {skillsContent.title || "Technical Stack"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {skillsContent.subtitle ||
              "Tools and technologies I use to bring ideas to life."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group, idx) => (
            <div
              key={idx}
              className="p-8 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 pb-2 border-b border-gray-200 dark:border-slate-600">
                {group.category}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {(group.skills || []).map((skill, sIdx) => {
                  const Icon =
                    skillIconMap[skill.iconKey] || skillIconMap.react;
                  return (
                    <div
                      key={sIdx}
                      className="group flex flex-col items-center p-4 bg-white dark:bg-slate-800 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-200"
                    >
                      <Icon
                        className={`text-3xl mb-2 transition-transform group-hover:scale-110 ${skill.color}`}
                      />
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
