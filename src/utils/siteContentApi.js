import {
  defaultSiteContent,
  editableSectionKeys,
} from "../data/defaultSiteContent";
import { isSupabaseConfigured, supabase } from "./supabase/client";

const SITE_CONTENT_TABLE = "site_content";

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

export const getDefaultContent = () => deepClone(defaultSiteContent);

export const fetchSiteContent = async () => {
  const fallbackContent = getDefaultContent();

  if (!isSupabaseConfigured || !supabase) {
    return fallbackContent;
  }

  const { data, error } = await supabase
    .from(SITE_CONTENT_TABLE)
    .select("section, content");

  if (error) {
    throw new Error(error.message);
  }

  (data || []).forEach((row) => {
    if (!row.section || !(row.section in fallbackContent)) {
      return;
    }

    fallbackContent[row.section] = mergeWithDefaults(
      fallbackContent[row.section],
      row.content,
    );
  });

  return fallbackContent;
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

  const { error } = await supabase.from(SITE_CONTENT_TABLE).upsert(
    {
      section: sectionKey,
      content: sectionContent,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "section",
    },
  );

  if (error) {
    throw new Error(error.message);
  }
};

export const saveAllSiteContent = async (siteContent) => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  const rows = editableSectionKeys.map((sectionKey) => ({
    section: sectionKey,
    content: siteContent[sectionKey],
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase.from(SITE_CONTENT_TABLE).upsert(rows, {
    onConflict: "section",
  });

  if (error) {
    throw new Error(error.message);
  }
};
