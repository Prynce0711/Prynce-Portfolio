import AdminSectionCard from "./AdminSectionCard";
import {
  AddButton,
  InputField,
  RemoveButton,
  SelectField,
} from "./FormFields";
import { socialIconOptions } from "../lib/iconMaps";
import { useSiteContent } from "../context/SiteContentContext";

const createEmptySocial = () => ({
  name: "",
  iconKey: "link",
  link: "",
});

const FooterAdmin = () => {
  const { siteContent, setSectionContent } = useSiteContent();
  const footer = siteContent.footer || {};
  const socials = footer.socials || [];

  const updateFooterField = (field, value) => {
    setSectionContent("footer", (currentSection = {}) => ({
      ...currentSection,
      [field]: value,
    }));
  };

  const updateSocialField = (index, field, value) => {
    setSectionContent("footer", (currentSection = {}) => ({
      ...currentSection,
      socials: (currentSection.socials || []).map((social, mapIndex) => {
        if (mapIndex !== index) {
          return social;
        }

        return {
          ...social,
          [field]: value,
        };
      }),
    }));
  };

  const addSocial = () => {
    setSectionContent("footer", (currentSection = {}) => ({
      ...currentSection,
      socials: [...(currentSection.socials || []), createEmptySocial()],
    }));
  };

  const removeSocial = (index) => {
    setSectionContent("footer", (currentSection = {}) => ({
      ...currentSection,
      socials: (currentSection.socials || []).filter((_, mapIndex) => {
        return mapIndex !== index;
      }),
    }));
  };

  return (
    <AdminSectionCard
      sectionKey="footer"
      title="Footer Section"
      description="Manage footer text and technology labels."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <InputField
          label="Headline Prefix"
          value={footer.headlinePrefix}
          onChange={(value) => updateFooterField("headlinePrefix", value)}
        />
        <InputField
          label="Owner Name"
          value={footer.ownerName}
          onChange={(value) => updateFooterField("ownerName", value)}
        />
        <InputField
          label="Rights Text"
          value={footer.rightsText}
          onChange={(value) => updateFooterField("rightsText", value)}
          hint="Year is automatically added in the frontend."
        />
        <InputField
          label="Made With Label"
          value={footer.madeWithLabel}
          onChange={(value) => updateFooterField("madeWithLabel", value)}
        />
        <div className="md:col-span-2">
          <InputField
            label="Tech Stack"
            value={(footer.techStack || []).join(", ")}
            onChange={(value) => {
              const parsedTech = value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

              updateFooterField("techStack", parsedTech);
            }}
            hint="Comma separated values, e.g. React, Tailwind CSS, Framer Motion"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Footer Social Links
          </h3>
          <AddButton label="Add Social" onClick={addSocial} />
        </div>

        {socials.map((social, index) => (
          <div
            key={`footer-social-${index}`}
            className="rounded-2xl border border-slate-700/30 bg-slate-900/40 p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h4 className="text-lg font-bold text-slate-800">
                Social {index + 1}
              </h4>
              <RemoveButton
                label="Remove Social"
                onClick={() => removeSocial(index)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Label"
                value={social.name}
                onChange={(value) => updateSocialField(index, "name", value)}
              />
              <SelectField
                label="Icon"
                value={social.iconKey}
                onChange={(value) => updateSocialField(index, "iconKey", value)}
                options={socialIconOptions}
              />
              <div className="md:col-span-2">
                <InputField
                  label="URL"
                  value={social.link}
                  onChange={(value) => updateSocialField(index, "link", value)}
                  hint="Full URL, e.g. https://github.com/username"
                />
              </div>
            </div>
          </div>
        ))}

        {socials.length === 0 ? (
          <p className="rounded-xl border border-amber-600/20 bg-amber-900/10 px-4 py-3 text-sm text-amber-200">
            No footer socials yet. Click Add Social to create one.
          </p>
        ) : null}
      </div>
    </AdminSectionCard>
  );
};

export default FooterAdmin;
