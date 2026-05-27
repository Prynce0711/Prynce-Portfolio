import { useState } from "react";
import AdminSectionCard from "./AdminSectionCard";
import {
  AddButton,
  InputField,
  RemoveButton,
  TextAreaField,
} from "./FormFields";
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

const createEmptyProject = () => ({
  title: "",
  description: "",
  tags: [],
  image: "",
  link: "",
});

const ProjectsAdmin = () => {
  const { siteContent, setSectionContent } = useSiteContent();
  const projects = siteContent.projects || {};
  const items = projects.items || [];
  const [uploadState, setUploadState] = useState({
    projectIndex: null,
    isUploading: false,
    type: "idle",
    message: "",
  });

  const updateProjectsField = (field, value) => {
    setSectionContent("projects", (currentSection = {}) => ({
      ...currentSection,
      [field]: value,
    }));
  };

  const updateProjectItem = (index, field, value) => {
    setSectionContent("projects", (currentSection = {}) => ({
      ...currentSection,
      items: (currentSection.items || []).map((project, projectIndex) => {
        if (projectIndex !== index) {
          return project;
        }

        return {
          ...project,
          [field]: value,
        };
      }),
    }));
  };

  const addProject = () => {
    setSectionContent("projects", (currentSection = {}) => ({
      ...currentSection,
      items: [...(currentSection.items || []), createEmptyProject()],
    }));
  };

  const removeProject = (index) => {
    setSectionContent("projects", (currentSection = {}) => ({
      ...currentSection,
      items: (currentSection.items || []).filter((_, projectIndex) => {
        return projectIndex !== index;
      }),
    }));
  };

  const handleProjectImageUpload = async (projectIndex, event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setUploadState({
      projectIndex,
      isUploading: true,
      type: "idle",
      message: "Uploading image...",
    });

    try {
      const { publicUrl } = await uploadPortfolioImage({
        file: selectedFile,
        folder: "projects",
      });

      updateProjectItem(projectIndex, "image", publicUrl);

      setUploadState({
        projectIndex,
        isUploading: false,
        type: "success",
        message: "Image uploaded and linked to project.",
      });
    } catch (error) {
      setUploadState({
        projectIndex,
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
      sectionKey="projects"
      title="Projects Section"
      description="Manage headings and your full project portfolio cards."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <InputField
          label="Heading Lead"
          value={projects.titleLead}
          onChange={(value) => updateProjectsField("titleLead", value)}
        />
        <InputField
          label="Heading Highlight"
          value={projects.titleHighlight}
          onChange={(value) => updateProjectsField("titleHighlight", value)}
        />
        <div className="md:col-span-2">
          <TextAreaField
            label="Section Description"
            rows={3}
            value={projects.description}
            onChange={(value) => updateProjectsField("description", value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
            Project Items
          </h3>
          <AddButton label="Add Project" onClick={addProject} />
        </div>

        {items.map((project, index) => (
          <div
            key={`project-${index}`}
            className="rounded-2xl border border-slate-700/30 bg-slate-900/40 p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h4 className="text-lg font-bold text-slate-800">
                Project {index + 1}
              </h4>
              <RemoveButton
                label="Remove Project"
                onClick={() => removeProject(index)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Title"
                value={project.title}
                onChange={(value) => updateProjectItem(index, "title", value)}
              />
              <InputField
                label="Project Link"
                value={project.link}
                onChange={(value) => updateProjectItem(index, "link", value)}
              />
              <div className="space-y-2">
                <InputField
                  label="Image URL or File"
                  value={project.image}
                  onChange={(value) => updateProjectItem(index, "image", value)}
                />

                <div className="rounded-xl border border-slate-700/20 bg-slate-800/40 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                    Upload Project Image
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleProjectImageUpload(index, event)}
                    disabled={
                      uploadState.isUploading &&
                      uploadState.projectIndex === index
                    }
                    className="mt-2 w-full rounded-xl border border-slate-700/20 bg-slate-800/30 px-3 py-2 text-sm text-slate-200 shadow-sm outline-none transition file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Uploads to bucket: {getStorageBucketName()}
                  </p>
                  {uploadState.projectIndex === index && uploadState.message ? (
                    <p
                      className={`mt-1 text-xs ${uploadStatusToneClass[uploadState.type]}`}
                    >
                      {uploadState.message}
                    </p>
                  ) : null}
                </div>
              </div>
              <InputField
                label="Tags"
                value={(project.tags || []).join(", ")}
                onChange={(value) => {
                  const parsedTags = value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean);

                  updateProjectItem(index, "tags", parsedTags);
                }}
                hint="Comma separated values"
              />
              <div className="md:col-span-2">
                <TextAreaField
                  label="Description"
                  rows={4}
                  value={project.description}
                  onChange={(value) =>
                    updateProjectItem(index, "description", value)
                  }
                />
              </div>

              {project.image ? (
                <div className="md:col-span-2 overflow-hidden rounded-xl border border-slate-700/20 bg-slate-800/40 p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                    Project Image Preview
                  </p>
                  <img
                    src={project.image}
                    alt={project.title || `Project ${index + 1}`}
                    className="h-52 w-full rounded-lg object-cover"
                  />
                </div>
              ) : null}
            </div>
          </div>
        ))}

        {items.length === 0 ? (
          <p className="rounded-xl border border-amber-600/20 bg-amber-900/10 px-4 py-3 text-sm text-amber-200">
            No projects yet. Click Add Project to create your first item.
          </p>
        ) : null}
      </div>
    </AdminSectionCard>
  );
};

export default ProjectsAdmin;
