import React from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "../../context/SiteContentContext";
import { skillIconMap } from "../../lib/iconMaps";

const Skills = () => {
  const { siteContent } = useSiteContent();
  const skillsContent = siteContent.skills || {};
  const skillGroups = skillsContent.groups || [];

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            {skillsContent.title || "Technical Stack"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {skillsContent.subtitle ||
              "Tools and technologies I use to bring ideas to life."}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-cyan-400 rounded-full mx-auto mt-6" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {skillGroups.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.45 }}
              className="p-6 md:p-8 bg-white/60 dark:bg-slate-800/50 rounded-3xl border border-gray-100/60 dark:border-slate-700/40 shadow-soft"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                {group.category}
              </h3>

              <div className="flex flex-col gap-3">
                {(group.skills || []).map((skill, sIdx) => {
                  const IconComp = skill.icon
                    ? skill.icon
                    : skillIconMap[skill.iconKey] || skillIconMap.react;
                  return (
                    <div
                      key={sIdx}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/20 dark:hover:bg-slate-700/40 transition-all"
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-cyan-400 text-white shadow">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
                          {skill.name}
                        </div>
                        {skill.description ? (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {skill.description}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
