import AdminSectionCard from "./AdminSectionCard";
import {
  AddButton,
  InputField,
  RemoveButton,
  TextAreaField,
} from "./FormFields";
import { useSiteContent } from "../context/SiteContentContext";

const createEmptyExperience = () => ({
  title: "",
  company: "",
  year: "",
  desc: "",
});

const ExperienceAdmin = () => {
  const { siteContent, setSectionContent } = useSiteContent();
  const experience = siteContent.experience || {};
  const items = experience.items || [];

  const updateExperienceField = (field, value) => {
    setSectionContent("experience", (currentSection = {}) => ({
      ...currentSection,
      [field]: value,
    }));
  };

  const updateExperienceItem = (index, field, value) => {
    setSectionContent("experience", (currentSection = {}) => ({
      ...currentSection,
      items: (currentSection.items || []).map((item, mapIndex) => {
        if (mapIndex !== index) {
          return item;
        }

        return {
          ...item,
          [field]: value,
        };
      }),
    }));
  };

  const addExperience = () => {
    setSectionContent("experience", (currentSection = {}) => ({
      ...currentSection,
      items: [...(currentSection.items || []), createEmptyExperience()],
    }));
  };

  const removeExperience = (index) => {
    setSectionContent("experience", (currentSection = {}) => ({
      ...currentSection,
      items: (currentSection.items || []).filter((_, mapIndex) => {
        return mapIndex !== index;
      }),
    }));
  };

  return (
    <AdminSectionCard
      sectionKey="experience"
      title="Experience Section"
      description="Add and edit your work timeline cards."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <InputField
          label="Section Title"
          value={experience.title}
          onChange={(value) => updateExperienceField("title", value)}
        />
        <InputField
          label="Section Subtitle"
          value={experience.subtitle}
          onChange={(value) => updateExperienceField("subtitle", value)}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Experience Cards
          </h3>
          <AddButton label="Add Experience" onClick={addExperience} />
        </div>

        {items.map((item, index) => (
          <div
            key={`experience-${index}`}
            className="rounded-2xl border border-slate-700/30 bg-slate-900/40 p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h4 className="text-lg font-bold text-slate-800">
                Entry {index + 1}
              </h4>
              <RemoveButton
                label="Remove Entry"
                onClick={() => removeExperience(index)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Role Title"
                value={item.title}
                onChange={(value) =>
                  updateExperienceItem(index, "title", value)
                }
              />
              <InputField
                label="Year"
                value={item.year}
                onChange={(value) => updateExperienceItem(index, "year", value)}
              />
              <InputField
                label="Company"
                value={item.company}
                onChange={(value) =>
                  updateExperienceItem(index, "company", value)
                }
              />
              <div className="md:col-span-2">
                <TextAreaField
                  label="Description"
                  rows={3}
                  value={item.desc}
                  onChange={(value) =>
                    updateExperienceItem(index, "desc", value)
                  }
                />
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 ? (
          <p className="rounded-xl border border-amber-600/20 bg-amber-900/10 px-4 py-3 text-sm text-amber-200">
            No experience entries yet. Click Add Experience to create one.
          </p>
        ) : null}
      </div>
    </AdminSectionCard>
  );
};

export default ExperienceAdmin;
