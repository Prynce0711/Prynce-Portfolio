import AdminSectionCard from "./AdminSectionCard";
import { InputField } from "./FormFields";
import { useSiteContent } from "../context/SiteContentContext";

const FooterAdmin = () => {
  const { siteContent, setSectionContent } = useSiteContent();
  const footer = siteContent.footer || {};

  const updateFooterField = (field, value) => {
    setSectionContent("footer", (currentSection = {}) => ({
      ...currentSection,
      [field]: value,
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
    </AdminSectionCard>
  );
};

export default FooterAdmin;
