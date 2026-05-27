import { motion } from "framer-motion";
import { useSiteContent } from "../../context/SiteContentContext";
import { skillIconMap } from "../../lib/iconMaps";
import Section from "../ui/Section";
import GlassCard from "../ui/GlassCard";

const Skills = () => {
  const { siteContent } = useSiteContent();
  const skillsContent = siteContent.skills || {};
  const skillGroups = skillsContent.groups || [];
  const skillItems = skillGroups.flatMap((group) =>
    (group.skills || []).map((skill) => ({
      ...skill,
      category: group.category,
    })),
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Section id="skills" className="relative">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/80">
            Tech Stack
          </p>
          {skillsContent.title ? (
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-white">
              {skillsContent.title}
            </h2>
          ) : null}
          {skillsContent.subtitle ? (
            <p className="mt-4 text-slate-300/80 max-w-2xl mx-auto">
              {skillsContent.subtitle}
            </p>
          ) : null}
        </div>

        {skillItems.length ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {skillItems.map((skill, idx) => {
              const IconComp =
                skill.icon || skillIconMap[skill.iconKey] || skillIconMap.react;

              return (
                <motion.div
                  key={`${skill.name}-${idx}`}
                  variants={itemVariants}
                >
                  <GlassCard className="h-full group hover:-translate-y-1 transition">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue/40 to-neon-purple/40 text-cyan-100 group-hover:shadow-neon">
                        <IconComp className={`h-6 w-6 ${skill.color || ""}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {skill.name}
                        </p>
                        {skill.category ? (
                          <p className="text-xs text-slate-400">
                            {skill.category}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        ) : null}
      </div>
    </Section>
  );
};

export default Skills;
