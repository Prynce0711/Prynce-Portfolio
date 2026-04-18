import { useState } from "react";
import { Link } from "react-router-dom";
import HeroAdmin from "./HeroAdmin";
import AboutAdmin from "./AboutAdmin";
import ProjectsAdmin from "./ProjectsAdmin";
import SkillsAdmin from "./SkillsAdmin";
import ExperienceAdmin from "./ExperienceAdmin";
import ContactAdmin from "./ContactAdmin";
import FooterAdmin from "./FooterAdmin";
import { editableSectionKeys } from "../data/defaultSiteContent";
import { useSiteContent } from "../context/SiteContentContext";

const sectionLabelMap = {
  hero: "Hero",
  about: "About",
  projects: "Projects",
  skills: "Skills",
  experience: "Experience",
  contact: "Contact",
  footer: "Footer",
};

const globalStatusToneClass = {
  success: "text-emerald-600",
  error: "text-rose-600",
  idle: "text-slate-500",
};

const AdminDashboard = ({ user, onSignOut }) => {
  const {
    isContentLoading,
    contentError,
    refreshContent,
    saveAllSections,
    isSupabaseConfigured,
  } = useSiteContent();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [globalStatus, setGlobalStatus] = useState({
    type: "idle",
    message: "",
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setGlobalStatus({ type: "idle", message: "" });

    try {
      await refreshContent();
      setGlobalStatus({ type: "success", message: "Content refreshed." });
    } catch (error) {
      setGlobalStatus({
        type: "error",
        message: error.message || "Failed to refresh content.",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSaveAll = async () => {
    setIsSavingAll(true);
    setGlobalStatus({ type: "idle", message: "" });

    try {
      await saveAllSections();
      setGlobalStatus({
        type: "success",
        message: "All sections saved to Supabase section folders.",
      });
    } catch (error) {
      setGlobalStatus({
        type: "error",
        message: error.message || "Failed to save all sections.",
      });
    } finally {
      setIsSavingAll(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cyan-50 to-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Portfolio CMS
            </p>
            <h1 className="text-2xl font-black text-slate-900">Admin Panel</h1>
            <p className="text-sm text-slate-600">Signed in as {user.email}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isSavingAll || !isSupabaseConfigured}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSavingAll ? "Saving..." : "Save All"}
            </button>
            <Link
              to="/"
              className="rounded-xl border border-cyan-300 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-100"
            >
              View Site
            </Link>
            <button
              type="button"
              onClick={onSignOut}
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 md:grid-cols-[220px_1fr] md:px-6">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:sticky md:top-28 md:h-fit">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Quick Jump
          </p>
          <nav className="space-y-2">
            {editableSectionKeys.map((sectionKey) => (
              <a
                key={sectionKey}
                href={`#section-${sectionKey}`}
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {sectionLabelMap[sectionKey]}
              </a>
            ))}
          </nav>
        </aside>

        <main className="space-y-6">
          {!isSupabaseConfigured ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
              Supabase environment variables are missing. You can still edit
              locally, but saving to backend will fail until env setup is
              complete.
            </div>
          ) : null}

          {contentError ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {contentError}
            </div>
          ) : null}

          {globalStatus.message ? (
            <div
              className={`rounded-2xl border border-slate-200 bg-white p-4 text-sm ${globalStatusToneClass[globalStatus.type]}`}
            >
              {globalStatus.message}
            </div>
          ) : null}

          {isContentLoading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              Loading portfolio content...
            </div>
          ) : (
            <>
              <HeroAdmin />
              <AboutAdmin />
              <ProjectsAdmin />
              <SkillsAdmin />
              <ExperienceAdmin />
              <ContactAdmin />
              <FooterAdmin />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
