import {
  defaultSiteContent,
  editableSectionKeys,
} from "../data/defaultSiteContent";
import { isSupabaseConfigured, supabase } from "./supabase/client";

const SECTION_TABLE_MAP = {
  hero: "site_content_hero",
  about: "site_content_about",
  projects: "site_content_projects",
  skills: "site_content_skills",
  experience: "site_content_experience",
  contact: "site_content_contact",
  footer: "site_content_footer",
};

const NO_DATA_TEXT = "No data found in section.";
const NO_DATA_IMAGE_URL = "https://via.placeholder.com/960x540?text=No+Data";

const NO_DATA_SECTION_CONTENT = {
  hero: {
    firstName: NO_DATA_TEXT,
    lastName: NO_DATA_TEXT,
    roleText: NO_DATA_TEXT,
    primaryButtonText: NO_DATA_TEXT,
    primaryButtonHref: "#",
    secondaryButtonText: NO_DATA_TEXT,
    secondaryButtonHref: "#",
    imageSrc: NO_DATA_IMAGE_URL,
    imageAlt: NO_DATA_TEXT,
  },
  about: {
    fullText: NO_DATA_TEXT,
  },
  projects: {
    titleLead: NO_DATA_TEXT,
    titleHighlight: NO_DATA_TEXT,
    description: NO_DATA_TEXT,
    items: [
      {
        title: NO_DATA_TEXT,
        description: NO_DATA_TEXT,
        tags: [NO_DATA_TEXT],
        image: NO_DATA_IMAGE_URL,
        link: "#",
      },
    ],
  },
  skills: {
    title: NO_DATA_TEXT,
    subtitle: NO_DATA_TEXT,
    groups: [
      {
        category: NO_DATA_TEXT,
        skills: [
          {
            name: NO_DATA_TEXT,
            iconKey: "react",
            color: "text-slate-500",
          },
        ],
      },
    ],
  },
  experience: {
    title: NO_DATA_TEXT,
    subtitle: NO_DATA_TEXT,
    items: [
      {
        title: NO_DATA_TEXT,
        company: NO_DATA_TEXT,
        year: NO_DATA_TEXT,
        desc: NO_DATA_TEXT,
      },
    ],
  },
  contact: {
    titleLead: NO_DATA_TEXT,
    titleHighlight: NO_DATA_TEXT,
    description: NO_DATA_TEXT,
    availabilityText: NO_DATA_TEXT,
    socials: [
      {
        name: NO_DATA_TEXT,
        value: NO_DATA_TEXT,
        iconKey: "link",
        link: "#",
        color: "bg-slate-200 text-slate-700",
      },
    ],
  },
  footer: {
    headlinePrefix: NO_DATA_TEXT,
    ownerName: NO_DATA_TEXT,
    rightsText: NO_DATA_TEXT,
    madeWithLabel: NO_DATA_TEXT,
    techStack: [NO_DATA_TEXT],
  },
};

const deepClone = (value) => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value));
};

const mergeWithDefaults = (fallbackValue, incomingValue) => {
  if (Array.isArray(fallbackValue)) {
    return Array.isArray(incomingValue) ? incomingValue : fallbackValue;
  }

  if (fallbackValue && typeof fallbackValue === "object") {
    if (!incomingValue || typeof incomingValue !== "object") {
      return fallbackValue;
    }

    const mergedObject = { ...fallbackValue };

    Object.keys(incomingValue).forEach((key) => {
      if (!(key in fallbackValue)) {
        mergedObject[key] = incomingValue[key];
        return;
      }

      mergedObject[key] = mergeWithDefaults(
        fallbackValue[key],
        incomingValue[key],
      );
    });

    return mergedObject;
  }

  return incomingValue ?? fallbackValue;
};

const isEmptyObject = (value) => {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).length === 0
  );
};

const getSectionTableName = (sectionKey) => {
  return SECTION_TABLE_MAP[sectionKey];
};

const getNoDataSectionContent = (sectionKey) => {
  return deepClone(NO_DATA_SECTION_CONTENT[sectionKey] || {});
};

const fetchSectionFromSectionTable = async (sectionKey, fallbackSection) => {
  const sectionTableName = getSectionTableName(sectionKey);

  if (!sectionTableName) {
    throw new Error(`No section table mapping for key: ${sectionKey}`);
  }

  const { data, error } = await supabase
    .from(sectionTableName)
    .select("content")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  const rowContent = data?.content;

  if (
    !rowContent ||
    typeof rowContent !== "object" ||
    isEmptyObject(rowContent)
  ) {
    return getNoDataSectionContent(sectionKey);
  }

  return mergeWithDefaults(fallbackSection, rowContent);
};

const fetchSiteContentFromSectionTables = async (fallbackContent) => {
  const sectionEntries = await Promise.all(
    editableSectionKeys.map(async (sectionKey) => {
      const sectionContent = await fetchSectionFromSectionTable(
        sectionKey,
        fallbackContent[sectionKey],
      );

      return [sectionKey, sectionContent];
    }),
  );

  return Object.fromEntries(sectionEntries);
};

const saveSectionToSectionTable = async (sectionKey, sectionContent) => {
  const sectionTableName = getSectionTableName(sectionKey);

  if (!sectionTableName) {
    throw new Error(`No section table mapping for key: ${sectionKey}`);
  }

  const payload = {
    id: 1,
    content: sectionContent ?? {},
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from(sectionTableName).upsert(payload, {
    onConflict: "id",
  });

  if (error) {
    throw new Error(error.message);
  }
};

const saveAllSectionsToSectionTables = async (siteContent) => {
  await Promise.all(
    editableSectionKeys.map((sectionKey) => {
      return saveSectionToSectionTable(sectionKey, siteContent[sectionKey]);
    }),
  );
};

export const getDefaultContent = () => deepClone(defaultSiteContent);

export const fetchSiteContent = async () => {
  const fallbackContent = getDefaultContent();

  if (!isSupabaseConfigured || !supabase) {
    return fallbackContent;
  }

  try {
    return await fetchSiteContentFromSectionTables(fallbackContent);
  } catch (error) {
    throw new Error(error.message || "Failed to fetch section tables.");
  }
};

export const saveSiteContentSection = async (sectionKey, sectionContent) => {
  if (!editableSectionKeys.includes(sectionKey)) {
    throw new Error(`Unknown section key: ${sectionKey}`);
  }

  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  await saveSectionToSectionTable(sectionKey, sectionContent);
};

export const saveAllSiteContent = async (siteContent) => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  await saveAllSectionsToSectionTables(siteContent);
};
