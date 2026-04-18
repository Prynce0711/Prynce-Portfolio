import {
  defaultSiteContent,
  editableSectionKeys,
} from "../data/defaultSiteContent";
import { isSupabaseConfigured, supabase } from "./supabase/client";

const SITE_CONTENT_TABLE = "site_content";
const SITE_CONTENT_STORAGE_ROOT = "site-content";
const SITE_CONTENT_STORAGE_FILE = "content.json";
const SITE_CONTENT_STORAGE_BUCKET =
  import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || "portfolio-assets";

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

const getSectionStorageObjectPath = (sectionKey) => {
  return `${SITE_CONTENT_STORAGE_ROOT}/${sectionKey}/${SITE_CONTENT_STORAGE_FILE}`;
};

const isStorageObjectMissingError = (error) => {
  const message = error?.message?.toLowerCase() || "";
  const statusCode = Number(error?.statusCode || error?.status || 0);

  return (
    statusCode === 404 ||
    message.includes("not found") ||
    message.includes("does not exist") ||
    message.includes("object not found") ||
    message.includes("no such object")
  );
};

const fetchAllSectionsFromStorage = async () => {
  const sectionEntries = await Promise.all(
    editableSectionKeys.map(async (sectionKey) => {
      const objectPath = getSectionStorageObjectPath(sectionKey);
      const { data, error } = await supabase.storage
        .from(SITE_CONTENT_STORAGE_BUCKET)
        .download(objectPath);

      if (error) {
        if (isStorageObjectMissingError(error)) {
          return [sectionKey, null];
        }

        throw new Error(
          `Storage read failed for section "${sectionKey}": ${error.message}`,
        );
      }

      if (!data) {
        return [sectionKey, null];
      }

      const rawText = await data.text();

      if (!rawText.trim()) {
        return [sectionKey, null];
      }

      let parsedContent;

      try {
        parsedContent = JSON.parse(rawText);
      } catch {
        throw new Error(
          `Storage content for section "${sectionKey}" is not valid JSON.`,
        );
      }

      return [sectionKey, parsedContent];
    }),
  );

  return Object.fromEntries(sectionEntries);
};

const saveSectionToStorage = async (sectionKey, sectionContent) => {
  const objectPath = getSectionStorageObjectPath(sectionKey);
  const payload = JSON.stringify(sectionContent ?? {}, null, 2);
  const fileBlob = new Blob([payload], { type: "application/json" });

  const { error } = await supabase.storage
    .from(SITE_CONTENT_STORAGE_BUCKET)
    .upload(objectPath, fileBlob, {
      upsert: true,
      cacheControl: "0",
      contentType: "application/json",
    });

  if (error) {
    throw new Error(
      `Storage write failed for section "${sectionKey}": ${error.message}`,
    );
  }
};

const saveAllSectionsToStorage = async (siteContent) => {
  await Promise.all(
    editableSectionKeys.map((sectionKey) => {
      return saveSectionToStorage(sectionKey, siteContent[sectionKey]);
    }),
  );
};

export const getDefaultContent = () => deepClone(defaultSiteContent);

export const fetchSiteContent = async () => {
  const fallbackContent = getDefaultContent();

  if (!isSupabaseConfigured || !supabase) {
    return fallbackContent;
  }

  let tableFetchError = null;
  let storageFetchError = null;

  try {
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
  } catch (error) {
    tableFetchError = error;
  }

  try {
    const storageSections = await fetchAllSectionsFromStorage();

    editableSectionKeys.forEach((sectionKey) => {
      const storageContent = storageSections[sectionKey];

      if (!storageContent || typeof storageContent !== "object") {
        return;
      }

      fallbackContent[sectionKey] = mergeWithDefaults(
        fallbackContent[sectionKey],
        storageContent,
      );
    });
  } catch (error) {
    storageFetchError = error;
  }

  if (tableFetchError && storageFetchError) {
    throw new Error(
      `Failed to load content from Supabase table and storage. Table: ${tableFetchError.message} | Storage: ${storageFetchError.message}`,
    );
  }

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

  let tableSaveError = null;
  let storageSaveError = null;

  try {
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
  } catch (error) {
    tableSaveError = error;
  }

  try {
    await saveSectionToStorage(sectionKey, sectionContent);
  } catch (error) {
    storageSaveError = error;
  }

  if (storageSaveError && tableSaveError) {
    throw new Error(
      `Saving failed in both table and storage. Table: ${tableSaveError.message} | Storage: ${storageSaveError.message}`,
    );
  }

  if (storageSaveError) {
    throw storageSaveError;
  }

  if (tableSaveError) {
    console.warn(
      `Site content table save failed for section "${sectionKey}": ${tableSaveError.message}`,
    );
  }
};

export const saveAllSiteContent = async (siteContent) => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  let tableSaveError = null;
  let storageSaveError = null;

  try {
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
  } catch (error) {
    tableSaveError = error;
  }

  try {
    await saveAllSectionsToStorage(siteContent);
  } catch (error) {
    storageSaveError = error;
  }

  if (storageSaveError && tableSaveError) {
    throw new Error(
      `Saving failed in both table and storage. Table: ${tableSaveError.message} | Storage: ${storageSaveError.message}`,
    );
  }

  if (storageSaveError) {
    throw storageSaveError;
  }

  if (tableSaveError) {
    console.warn(`Site content table save failed: ${tableSaveError.message}`);
  }
};
