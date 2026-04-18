import { useState } from "react";
import AdminSectionCard from "./AdminSectionCard";
import { InputField } from "./FormFields";
import { useSiteContent } from "../context/SiteContentContext";
import {
  getStorageBucketName,
  uploadPortfolioImage,
} from "../utils/supabase/storageApi";




const HeroAdmin = () => {
  const { siteContent, setSectionContent } = useSiteContent();
  const hero = siteContent.hero || {};
  const [uploadState, setUploadState] = useState({
    isUploading: false,
    type: "idle",
    message: "",
  });

  const updateHero = (field, value) => {
    setSectionContent("hero", (currentSection = {}) => ({
      ...currentSection,
      [field]: value,
    }));
  };

  const handleHeroImageUpload = async (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setUploadState({
      isUploading: true,
      type: "idle",
      message: "Uploading image...",
    });

    try {
      const { publicUrl } = await uploadPortfolioImage({
        file: selectedFile,
        folder: "hero",
      });

      updateHero("imageSrc", publicUrl);

      setUploadState({
        isUploading: false,
        type: "success",
        message: "Image uploaded and linked to hero section.",
      });
    } catch (error) {
      setUploadState({
        isUploading: false,
        type: "error",
        message: error.message || "Image upload failed.",
      });
    } finally {
      event.target.value = "";
    }
  };

  return (
    <AdminSectionCard
      sectionKey="hero"
      title="Hero Section"
      description="Edit your homepage intro text, buttons, and hero image."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <InputField
          label="First Name"
          value={hero.firstName}
          onChange={(value) => updateHero("firstName", value)}
        />
        <InputField
          label="Last Name"
          value={hero.lastName}
          onChange={(value) => updateHero("lastName", value)}
        />
        <InputField
          label="Role Text"
          value={hero.roleText}
          onChange={(value) => updateHero("roleText", value)}
          hint="Example: Student | Full Stack Web Developer"
        />
        <InputField
          label="Hero Image"
          value={hero.imageSrc}
          onChange={(value) => updateHero("imageSrc", value)}
          hint="Use a public URL or a file name from public/."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#475569" }}>
            Upload Hero Image
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleHeroImageUpload}
            disabled={uploadState.isUploading}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "8px 12px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              color: "#94a3b8",
              fontSize: "13px",
              cursor: uploadState.isUploading ? "not-allow" : "pointer",
              fontFamily: "inherit",
            }}
          />
          <p style={{ fontSize: "11.5px", color: "#334155", margin: 0 }}>
            Uploads to bucket: {getStorageBucketName()}
          </p>
          {uploadState.message ? (
            <p
              style={{
                fontSize: "12px",
                margin: 0,
                color:
                  uploadState.type === "success" ? "#6ee7b7" :
                  uploadState.type === "error" ? "#fca5a5" : "#64748b",
              }}
            >
              {uploadState.message}
            </p>
          ) : null}
        </div>

        {hero.imageSrc ? (
          <div style={{ gridColumn: "span 2", overflow: "hidden", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", padding: "10px" }}>
            <p style={{ marginBottom: "8px", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#475569" }}>
              Hero Preview
            </p>
            <img
              src={hero.imageSrc}
              alt={hero.imageAlt || "Hero preview"}
              style={{ height: "200px", width: "100%", borderRadius: "8px", objectFit: "cover" }}
            />
          </div>
        ) : null}

        <InputField
          label="Image Alt Text"
          value={hero.imageAlt}
          onChange={(value) => updateHero("imageAlt", value)}
        />
        <div style={{ gridColumn: "span 2", height: "1px", background: "rgba(255,255,255,0.05)" }} />
        <InputField
          label="Primary Button Text"
          value={hero.primaryButtonText}
          onChange={(value) => updateHero("primaryButtonText", value)}
        />
        <InputField
          label="Primary Button Link"
          value={hero.primaryButtonHref}
          onChange={(value) => updateHero("primaryButtonHref", value)}
          hint="Supports hash links like #about or full URLs."
        />
        <InputField
          label="Secondary Button Text"
          value={hero.secondaryButtonText}
          onChange={(value) => updateHero("secondaryButtonText", value)}
        />
        <InputField
          label="Secondary Button Link"
          value={hero.secondaryButtonHref}
          onChange={(value) => updateHero("secondaryButtonHref", value)}
        />
      </div>
    </AdminSectionCard>
  );
};

export default HeroAdmin;
