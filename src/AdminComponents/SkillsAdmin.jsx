import AdminSectionCard from "./AdminSectionCard";
import { AddButton, InputField, RemoveButton, SelectField } from "./FormFields";
import { skillIconOptions } from "../lib/iconMaps";
import { useSiteContent } from "../context/SiteContentContext";

const createEmptySkill = () => ({
  name: "",
  iconKey: "react",
  color: "text-slate-800",
});

const createEmptySkillGroup = () => ({
  category: "",
  skills: [createEmptySkill()],
});

const SkillsAdmin = () => {
  const { siteContent, setSectionContent } = useSiteContent();
  const skills = siteContent.skills || {};
  const groups = skills.groups || [];

  const updateSkillsField = (field, value) => {
    setSectionContent("skills", (currentSection = {}) => ({
      ...currentSection,
      [field]: value,
    }));
  };

  const updateGroupField = (groupIndex, field, value) => {
    setSectionContent("skills", (currentSection = {}) => ({
      ...currentSection,
      groups: (currentSection.groups || []).map((group, mapIndex) => {
        if (mapIndex !== groupIndex) {
          return group;
        }

        return {
          ...group,
          [field]: value,
        };
      }),
    }));
  };

  const updateSkillField = (groupIndex, skillIndex, field, value) => {
    setSectionContent("skills", (currentSection = {}) => ({
      ...currentSection,
      groups: (currentSection.groups || []).map((group, mapGroupIndex) => {
        if (mapGroupIndex !== groupIndex) {
          return group;
        }

        return {
          ...group,
          skills: (group.skills || []).map((skill, mapSkillIndex) => {
            if (mapSkillIndex !== skillIndex) {
              return skill;
            }

            return {
              ...skill,
              [field]: value,
            };
          }),
        };
      }),
    }));
  };

  const addGroup = () => {
    setSectionContent("skills", (currentSection = {}) => ({
      ...currentSection,
      groups: [...(currentSection.groups || []), createEmptySkillGroup()],
    }));
  };

  const removeGroup = (groupIndex) => {
    setSectionContent("skills", (currentSection = {}) => ({
      ...currentSection,
      groups: (currentSection.groups || []).filter((_, mapIndex) => {
        return mapIndex !== groupIndex;
      }),
    }));
  };

  const addSkill = (groupIndex) => {
    setSectionContent("skills", (currentSection = {}) => ({
      ...currentSection,
      groups: (currentSection.groups || []).map((group, mapIndex) => {
        if (mapIndex !== groupIndex) {
          return group;
        }

        return {
          ...group,
          skills: [...(group.skills || []), createEmptySkill()],
        };
      }),
    }));
  };

  const removeSkill = (groupIndex, skillIndex) => {
    setSectionContent("skills", (currentSection = {}) => ({
      ...currentSection,
      groups: (currentSection.groups || []).map((group, mapGroupIndex) => {
        if (mapGroupIndex !== groupIndex) {
          return group;
        }

        return {
          ...group,
          skills: (group.skills || []).filter((_, mapSkillIndex) => {
            return mapSkillIndex !== skillIndex;
          }),
        };
      }),
    }));
  };

  return (
    <AdminSectionCard
      sectionKey="skills"
      title="Skills Section"
      description="Manage categories, skill names, and icon selections."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <InputField
          label="Section Title"
          value={skills.title}
          onChange={(value) => updateSkillsField("title", value)}
        />
        <InputField
          label="Section Subtitle"
          value={skills.subtitle}
          onChange={(value) => updateSkillsField("subtitle", value)}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Skill Groups
          </h3>
          <AddButton label="Add Group" onClick={addGroup} />
        </div>

        {groups.map((group, groupIndex) => (
          <div
            key={`skill-group-${groupIndex}`}
            className="rounded-2xl border border-slate-700/30 bg-slate-900/40 p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h4 className="text-lg font-bold text-slate-800">
                Group {groupIndex + 1}
              </h4>
              <RemoveButton
                label="Remove Group"
                onClick={() => removeGroup(groupIndex)}
              />
            </div>

            <div className="mb-4">
              <InputField
                label="Category Name"
                value={group.category}
                onChange={(value) =>
                  updateGroupField(groupIndex, "category", value)
                }
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Skills
                </h5>
                <AddButton
                  label="Add Skill"
                  onClick={() => addSkill(groupIndex)}
                />
              </div>

              {(group.skills || []).map((skill, skillIndex) => (
                <div
                  key={`skill-${groupIndex}-${skillIndex}`}
                  className="grid gap-4 rounded-xl border border-slate-700/20 bg-slate-800/40 p-3 md:grid-cols-4"
                >
                  <InputField
                    label="Skill Name"
                    value={skill.name}
                    onChange={(value) =>
                      updateSkillField(groupIndex, skillIndex, "name", value)
                    }
                  />
                  <SelectField
                    label="Icon"
                    value={skill.iconKey}
                    onChange={(value) =>
                      updateSkillField(groupIndex, skillIndex, "iconKey", value)
                    }
                    options={skillIconOptions}
                  />
                  <InputField
                    label="Color Class"
                    value={skill.color}
                    onChange={(value) =>
                      updateSkillField(groupIndex, skillIndex, "color", value)
                    }
                    hint="Tailwind class, e.g. text-[#61DAFB]"
                  />
                  <div className="flex items-end">
                    <RemoveButton
                      label="Remove Skill"
                      onClick={() => removeSkill(groupIndex, skillIndex)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {groups.length === 0 ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            No skill groups yet. Click Add Group to start.
          </p>
        ) : null}
      </div>
    </AdminSectionCard>
  );
};

export default SkillsAdmin;
