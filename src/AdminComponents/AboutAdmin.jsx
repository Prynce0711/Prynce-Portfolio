import AdminSectionCard from "./AdminSectionCard";
import { TextAreaField } from "./FormFields";
import { useSiteContent } from "../context/SiteContentContext";

const AboutAdmin = () => {
  const { siteContent, setSectionContent } = useSiteContent();
  const about = siteContent.about || {};

  const updateAbout = (value) => {
    setSectionContent("about", (currentSection = {}) => ({
      ...currentSection,
      fullText: value,
    }));
  };

  return (
    <AdminSectionCard
      sectionKey="about"
      title="About Section"
      description="Control the full typing text shown in your matrix code window."
    >
      <TextAreaField
        label="About Content"
        rows={10}
        value={about.fullText}
        onChange={updateAbout}
        hint="Use blank lines to create spacing in the output."
      />
    </AdminSectionCard>
  );
};

export default AboutAdmin;
