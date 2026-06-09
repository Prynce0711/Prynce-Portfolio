import {
  sanitizeSectionContent,
  sanitizeSiteContent,
} from "../src/utils/contentValidation.js";
import { editableSectionKeys } from "../src/data/defaultSiteContent.js";

const CONTENT_TABLE = "site_content";

const jsonResponse = (payload, status = 200, headers = {}) => {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};

const getEnv = (name) => {
  return (process.env[name] || "").trim();
};

const supabaseUrl = getEnv("SUPABASE_URL") || getEnv("VITE_SUPABASE_URL");
const supabaseKey =
  getEnv("SUPABASE_ANON_KEY") ||
  getEnv("SUPABASE_PUBLISHABLE_KEY") ||
  getEnv("VITE_SUPABASE_PUBLISHABLE_KEY");
const storageBucket =
  getEnv("SUPABASE_STORAGE_BUCKET") ||
  getEnv("VITE_SUPABASE_STORAGE_BUCKET") ||
  "portfolio-assets";

const restBase = supabaseUrl ? `${supabaseUrl.replace(/\/$/, "")}/rest/v1` : "";

const buildHeaders = (token) => {
  return {
    apikey: supabaseKey,
    Authorization: `Bearer ${token || supabaseKey}`,
    "Content-Type": "application/json",
  };
};

const extractBearerToken = (request) => {
  const header = request.headers.get("authorization") || "";

  if (!header.toLowerCase().startsWith("bearer ")) {
    return "";
  }

  return header.slice(7).trim();
};

const SECTION_KEY_COLUMNS = ["section_key", "section"];

const fetchSection = async (sectionKey) => {
  if (!editableSectionKeys.includes(sectionKey)) {
    throw new Error(`Unknown section: ${sectionKey}`);
  }

  let lastError;

  for (const column of SECTION_KEY_COLUMNS) {
    const response = await fetch(
      `${restBase}/${CONTENT_TABLE}?select=content&${column}=eq.${sectionKey}&limit=1`,
      {
        headers: buildHeaders(),
      },
    );

    if (response.ok) {
      const data = await response.json();
      const content = data?.[0]?.content || {};

      return sanitizeSectionContent(sectionKey, content, {
        supabaseUrl,
        storageBucket,
      });
    }

    const errorPayload = await response.json().catch(() => ({}));
    lastError = new Error(errorPayload?.message || "Failed to fetch section.");
    const message = String(lastError.message || "").toLowerCase();

    if (!message.includes("column")) {
      break;
    }
  }

  throw lastError || new Error("Failed to fetch section.");
};

const upsertSection = async (sectionKey, content, token) => {
  if (!editableSectionKeys.includes(sectionKey)) {
    throw new Error(`Unknown section: ${sectionKey}`);
  }

  let lastError;

  for (const column of SECTION_KEY_COLUMNS) {
    const payload = {
      [column]: sectionKey,
      content,
      updated_at: new Date().toISOString(),
    };

    const response = await fetch(
      `${restBase}/${CONTENT_TABLE}?on_conflict=section_key`,
      {
      method: "POST",
      headers: {
        ...buildHeaders(token),
        Prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify(payload),
      },
    );

    if (response.ok) {
      return;
    }

    const errorPayload = await response.json().catch(() => ({}));
    lastError = new Error(errorPayload?.message || "Failed to save section.");
    const message = String(lastError.message || "").toLowerCase();

    if (!message.includes("column")) {
      break;
    }
  }

  throw lastError || new Error("Failed to save section.");
};

export const config = {
  runtime: "nodejs",
  maxDuration: 15,
};

export const handleSiteContentRequest = async (request) => {
  if (!supabaseUrl || !supabaseKey) {
    return jsonResponse(
      {
        error:
          "Supabase is not configured. Add SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.",
      },
      500,
    );
  }

  const url = new URL(request.url);
  const sectionKey = url.searchParams.get("section");
  const bulkMode = url.searchParams.get("bulk") === "true";

  if (request.method === "GET") {
    if (sectionKey) {
      try {
        const content = await fetchSection(sectionKey);
        return jsonResponse(content);
      } catch (error) {
        return jsonResponse(
          { error: error.message || "Failed to fetch content." },
          500,
        );
      }
    }

    try {
      const entries = await Promise.all(
        editableSectionKeys.map(async (key) => [key, await fetchSection(key)]),
      );

      return jsonResponse(Object.fromEntries(entries));
    } catch (error) {
      return jsonResponse(
        { error: error.message || "Failed to fetch site content." },
        500,
      );
    }
  }

  if (request.method === "PUT") {
    const token = extractBearerToken(request);

    if (!token) {
      return jsonResponse({ error: "Unauthorized." }, 401);
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON payload." }, 400);
    }

    try {
      if (bulkMode || !sectionKey) {
        const sections = body?.sections || body || {};
        const sanitized = sanitizeSiteContent(sections, {
          supabaseUrl,
          storageBucket,
        });

        await Promise.all(
          editableSectionKeys.map((key) =>
            upsertSection(key, sanitized[key], token),
          ),
        );

        return jsonResponse(sanitized);
      }

      if (!editableSectionKeys.includes(sectionKey)) {
        return jsonResponse({ error: "Unknown section key." }, 400);
      }

      const sanitized = sanitizeSectionContent(sectionKey, body, {
        supabaseUrl,
        storageBucket,
      });

      await upsertSection(sectionKey, sanitized, token);

      return jsonResponse(sanitized);
    } catch (error) {
      return jsonResponse(
        { error: error.message || "Failed to save site content." },
        500,
      );
    }
  }

  return jsonResponse({ error: "Method not allowed." }, 405, {
    Allow: "GET, PUT",
  });
};

export default {
  async fetch(request) {
    return handleSiteContentRequest(request);
  },
};
