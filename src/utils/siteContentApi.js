import {
  defaultSiteContent,
  editableSectionKeys,
} from "../data/defaultSiteContent";
import { isSupabaseConfigured, supabase } from "./supabase/client";
import {
  sanitizeSectionContent,
  sanitizeSiteContent,
} from "./contentValidation";

const CONTENT_TABLE = "site_content";

const API_BASE = import.meta.env.VITE_SITE_CONTENT_API || "/api/site-content";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const storageBucket =
  import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || "portfolio-assets";

const restBase = supabaseUrl ? `${supabaseUrl.replace(/\/$/, "")}/rest/v1` : "";

const deepClone = (value) => {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value));
};

const buildRestHeaders = (token) => {
  const headers = {
    apikey: supabaseKey,
  };

  headers.Authorization = `Bearer ${token || supabaseKey}`;

  return headers;
};

const getAccessToken = async () => {
  if (!supabase) {
    return "";
  }

  const { data } = await supabase.auth.getSession();

  return data?.session?.access_token || "";
};

const fetchJson = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    let errorPayload = {};
    let rawText = "";

    try {
      errorPayload = await response.clone().json();
    } catch {
      try {
        rawText = await response.text();
      } catch {
        rawText = "";
      }
    }

    const message =
      errorPayload?.message ||
      errorPayload?.error ||
      rawText ||
      response.statusText ||
      "Request failed.";

    throw new Error(`[${response.status}] ${message}`);
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text);
};

const SECTION_KEY_COLUMNS = ["section_key", "section"];

const fetchSectionFromRest = async (sectionKey) => {
  if (!editableSectionKeys.includes(sectionKey)) {
    throw new Error(`Unknown section key: ${sectionKey}`);
  }

  let lastError;

  for (const column of SECTION_KEY_COLUMNS) {
    try {
      const data = await fetchJson(
        `${restBase}/${CONTENT_TABLE}?select=content&${column}=eq.${sectionKey}&limit=1`,
        {
          headers: buildRestHeaders(),
        },
      );

      return data?.[0]?.content || {};
    } catch (error) {
      lastError = error;
      const message = String(error?.message || "");

      if (!message.toLowerCase().includes("column")) {
        break;
      }
    }
  }

  throw lastError || new Error("Failed to fetch section content.");
};

const fetchSiteContentFromRest = async () => {
  const entries = await Promise.all(
    editableSectionKeys.map(async (sectionKey) => {
      const sectionContent = await fetchSectionFromRest(sectionKey);
      return [sectionKey, sectionContent];
    }),
  );

  return Object.fromEntries(entries);
};

const saveSectionToRest = async (sectionKey, sectionContent, token) => {
  if (!editableSectionKeys.includes(sectionKey)) {
    throw new Error(`Unknown section key: ${sectionKey}`);
  }

  let lastError;

  for (const column of SECTION_KEY_COLUMNS) {
    const payload = {
      [column]: sectionKey,
      content: sectionContent ?? {},
      updated_at: new Date().toISOString(),
    };

    try {
      await fetchJson(
        `${restBase}/${CONTENT_TABLE}?on_conflict=section_key`,
        {
        method: "POST",
        headers: {
          ...buildRestHeaders(token),
          Prefer: "resolution=merge-duplicates",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        },
      );

      return;
    } catch (error) {
      lastError = error;
      const message = String(error?.message || "");

      if (!message.toLowerCase().includes("column")) {
        break;
      }
    }
  }

  throw lastError || new Error("Failed to save section content.");
};

const saveAllSectionsToRest = async (siteContent, token) => {
  await Promise.all(
    editableSectionKeys.map((sectionKey) =>
      saveSectionToRest(sectionKey, siteContent[sectionKey], token),
    ),
  );
};

export const getDefaultContent = () => deepClone(defaultSiteContent);

export const fetchSiteContent = async () => {
  const fallbackContent = getDefaultContent();

  try {
    const apiContent = await fetchJson(API_BASE);
    return sanitizeSiteContent(apiContent, { supabaseUrl, storageBucket });
  } catch (error) {
    if (!isSupabaseConfigured || !restBase || !supabaseKey) {
      return fallbackContent;
    }

    const restContent = await fetchSiteContentFromRest();
    return sanitizeSiteContent(restContent, { supabaseUrl, storageBucket });
  }
};

export const saveSiteContentSection = async (sectionKey, sectionContent) => {
  if (!editableSectionKeys.includes(sectionKey)) {
    throw new Error(`Unknown section key: ${sectionKey}`);
  }

  if (!isSupabaseConfigured || !supabaseKey || !restBase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  const token = await getAccessToken();

  if (!token) {
    throw new Error("Your admin session has expired. Please log in again.");
  }

  try {
    await fetchJson(`${API_BASE}?section=${sectionKey}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sectionContent ?? {}),
    });
  } catch (error) {
    const sanitized = sanitizeSectionContent(sectionKey, sectionContent, {
      supabaseUrl,
      storageBucket,
    });
    await saveSectionToRest(sectionKey, sanitized, token);
  }
};

export const saveAllSiteContent = async (siteContent) => {
  if (!isSupabaseConfigured || !supabaseKey || !restBase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  const token = await getAccessToken();

  if (!token) {
    throw new Error("Your admin session has expired. Please log in again.");
  }

  try {
    await fetchJson(`${API_BASE}?bulk=true`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sections: siteContent ?? {} }),
    });
  } catch (error) {
    const sanitized = sanitizeSiteContent(siteContent, {
      supabaseUrl,
      storageBucket,
    });
    await saveAllSectionsToRest(sanitized, token);
  }
};
