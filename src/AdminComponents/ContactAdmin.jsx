import AdminSectionCard from "./AdminSectionCard";
import {
  AddButton,
  InputField,
  RemoveButton,
  SelectField,
  TextAreaField,
} from "./FormFields";
import { socialIconOptions } from "../lib/iconMaps";
import { useSiteContent } from "../context/SiteContentContext";

const createEmptySocial = () => ({
  name: "",
  value: "",
  iconKey: "link",
  link: "",
  color: "bg-slate-100 text-slate-700",
});

const ContactAdmin = () => {
  const { siteContent, setSectionContent } = useSiteContent();
  const contact = siteContent.contact || {};
  const socials = contact.socials || [];

  const updateContactField = (field, value) => {
    setSectionContent("contact", (currentSection = {}) => ({
      ...currentSection,
      [field]: value,
    }));
  };

  const updateSocialField = (index, field, value) => {
    setSectionContent("contact", (currentSection = {}) => ({
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
    setSectionContent("contact", (currentSection = {}) => ({
      ...currentSection,
      socials: [...(currentSection.socials || []), createEmptySocial()],
    }));
  };

  const removeSocial = (index) => {
    setSectionContent("contact", (currentSection = {}) => ({
      ...currentSection,
      socials: (currentSection.socials || []).filter((_, mapIndex) => {
        return mapIndex !== index;
      }),
    }));
  };

  return (
    <AdminSectionCard
      sectionKey="contact"
      title="Contact Section"
      description="Edit your call-to-action and social cards."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <InputField
          label="Title Lead"
          value={contact.titleLead}
          onChange={(value) => updateContactField("titleLead", value)}
        />
        <InputField
          label="Title Highlight"
          value={contact.titleHighlight}
          onChange={(value) => updateContactField("titleHighlight", value)}
        />
        <InputField
          label="Availability Text"
          value={contact.availabilityText}
          onChange={(value) => updateContactField("availabilityText", value)}
        />
        <div className="md:col-span-2">
          <TextAreaField
            label="Description"
            rows={3}
            value={contact.description}
            onChange={(value) => updateContactField("description", value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Social Cards
          </h3>
          <AddButton label="Add Social" onClick={addSocial} />
        </div>

        {socials.map((social, index) => (
          <div
            key={`social-${index}`}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
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
                label="Name"
                value={social.name}
                onChange={(value) => updateSocialField(index, "name", value)}
              />
              <InputField
                label="Displayed Value"
                value={social.value}
                onChange={(value) => updateSocialField(index, "value", value)}
              />
              <SelectField
                label="Icon"
                value={social.iconKey}
                onChange={(value) => updateSocialField(index, "iconKey", value)}
                options={socialIconOptions}
              />
              <InputField
                label="Card Link"
                value={social.link}
                onChange={(value) => updateSocialField(index, "link", value)}
              />
              <div className="md:col-span-2">
                <InputField
                  label="Color Classes"
                  value={social.color}
                  onChange={(value) => updateSocialField(index, "color", value)}
                  hint="Tailwind classes, e.g. bg-blue-500/10 text-blue-600"
                />
              </div>
            </div>
          </div>
        ))}

        {socials.length === 0 ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            No social cards yet. Click Add Social to create one.
          </p>
        ) : null}
      </div>
    </AdminSectionCard>
  );
};

export default ContactAdmin;
