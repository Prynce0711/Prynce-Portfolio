import { useState } from "react";
import AdminSectionCard from "./AdminSectionCard";
import { InputField } from "./FormFields";
import { useSiteContent } from "../context/SiteContentContext";
import {
  getStorageBucketName,
  uploadPortfolioImage,
} from "../utils/supabase/storageApi";

const uploadStatusToneClass = {
  success: "text-emerald-600",
  error: "text-rose-600",
  idle: "text-slate-500",
};

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
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Upload Hero Image
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleHeroImageUpload}
            disabled={uploadState.isUploading}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
          />
          <p className="text-xs text-slate-500">
            Uploads to bucket: {getStorageBucketName()}
          </p>
          {uploadState.message ? (
            <p className={`text-xs ${uploadStatusToneClass[uploadState.type]}`}>
              {uploadState.message}
            </p>
          ) : null}
        </div>

        {hero.imageSrc ? (
          <div className="md:col-span-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
              Hero Preview
            </p>
            <img
              src={hero.imageSrc}
              alt={hero.imageAlt || "Hero preview"}
              className="h-52 w-full rounded-lg object-cover"
            />
          </div>
        ) : null}

        <InputField
          label="Image Alt Text"
          value={hero.imageAlt}
          onChange={(value) => updateHero("imageAlt", value)}
        />
        <div className="md:col-span-2 h-px bg-slate-200" />
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
