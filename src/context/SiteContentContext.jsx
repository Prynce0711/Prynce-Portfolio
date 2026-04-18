/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isSupabaseConfigured } from "../utils/supabase/client";
import {
  fetchSiteContent,
  getDefaultContent,
  saveAllSiteContent,
  saveSiteContentSection,
} from "../utils/siteContentApi";

const SiteContentContext = createContext(null);

export const SiteContentProvider = ({ children }) => {
  const [siteContent, setSiteContent] = useState(getDefaultContent());
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [contentError, setContentError] = useState("");
  const [savingBySection, setSavingBySection] = useState({});

  const refreshContent = useCallback(async () => {
    setIsContentLoading(true);

    try {
      const loadedContent = await fetchSiteContent();
      setSiteContent(loadedContent);
      setContentError("");
    } catch (error) {
      setContentError(error.message || "Failed to load content from Supabase.");
    } finally {
      setIsContentLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  const setSectionContent = useCallback((sectionKey, updater) => {
    setSiteContent((currentContent) => {
      const currentSection = currentContent[sectionKey];
      const nextSectionValue =
        typeof updater === "function" ? updater(currentSection) : updater;

      return {
        ...currentContent,
        [sectionKey]: nextSectionValue,
      };
    });
  }, []);

  const saveSection = useCallback(
    async (sectionKey) => {
      setSavingBySection((currentMap) => ({
        ...currentMap,
        [sectionKey]: true,
      }));

      try {
        await saveSiteContentSection(sectionKey, siteContent[sectionKey]);
        setContentError("");
      } catch (error) {
        setContentError(error.message || "Failed to save section.");
        throw error;
      } finally {
        setSavingBySection((currentMap) => ({
          ...currentMap,
          [sectionKey]: false,
        }));
      }
    },
    [siteContent],
  );

  const saveAllSections = useCallback(async () => {
    await saveAllSiteContent(siteContent);
    setContentError("");
  }, [siteContent]);

  const contextValue = useMemo(
    () => ({
      siteContent,
      isContentLoading,
      contentError,
      setSectionContent,
      saveSection,
      saveAllSections,
      refreshContent,
      savingBySection,
      isSupabaseConfigured,
    }),
    [
      siteContent,
      isContentLoading,
      contentError,
      setSectionContent,
      saveSection,
      saveAllSections,
      refreshContent,
      savingBySection,
    ],
  );

  return (
    <SiteContentContext.Provider value={contextValue}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error("useSiteContent must be used inside SiteContentProvider.");
  }

  return context;
};
