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

const sectionIcons = {
  hero: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    </svg>
  ),
  about: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  projects: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  skills: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  experience: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  ),
  contact: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  footer: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
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
  const [globalStatus, setGlobalStatus] = useState({ type: "idle", message: "" });
  const [activeSection, setActiveSection] = useState(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setGlobalStatus({ type: "idle", message: "" });
    try {
      await refreshContent();
      setGlobalStatus({ type: "success", message: "Content refreshed successfully." });
    } catch (error) {
      setGlobalStatus({ type: "error", message: error.message || "Failed to refresh content." });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSaveAll = async () => {
    setIsSavingAll(true);
    setGlobalStatus({ type: "idle", message: "" });
    try {
      await saveAllSections();
      setGlobalStatus({ type: "success", message: "All sections saved to Supabase." });
    } catch (error) {
      setGlobalStatus({ type: "error", message: error.message || "Failed to save all sections." });
    } finally {
      setIsSavingAll(false);
    }
  };

  const statusColors = {
    success: { bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.30)", text: "#6ee7b7" },
    error: { bg: "rgba(239,68,68,0.10)", border: "rgba(239,68,68,0.28)", text: "#fca5a5" },
    idle: { bg: "transparent", border: "transparent", text: "#94a3b8" },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 70% 0%, rgba(6,182,212,0.07) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(139,92,246,0.06) 0%, transparent 55%), #080d1a",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(8,13,26,0.82)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #06b6d4, #0e7490)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#06b6d4" }}>
                Portfolio CMS
              </p>
              <h1 style={{ margin: 0, fontSize: "17px", fontWeight: 900, color: "#f1f5f9", lineHeight: 1.2 }}>
                Admin Panel
              </h1>
            </div>
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", color: "#475569", marginRight: "4px" }}>
              {user.email}
            </span>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              style={{
                padding: "7px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.05)",
                color: "#cbd5e1",
                fontSize: "13px",
                fontWeight: 600,
                cursor: isRefreshing ? "not-allowed" : "pointer",
                opacity: isRefreshing ? 0.5 : 1,
                transition: "background 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isSavingAll || !isSupabaseConfigured}
              style={{
                padding: "7px 14px",
                borderRadius: "10px",
                border: "none",
                background:
                  isSavingAll || !isSupabaseConfigured
                    ? "rgba(6,182,212,0.2)"
                    : "linear-gradient(135deg, #06b6d4, #0891b2)",
                color: isSavingAll || !isSupabaseConfigured ? "#64748b" : "#fff",
                fontSize: "13px",
                fontWeight: 700,
                cursor: isSavingAll || !isSupabaseConfigured ? "not-allowed" : "pointer",
                transition: "opacity 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow:
                  isSavingAll || !isSupabaseConfigured
                    ? "none"
                    : "0 4px 12px rgba(6,182,212,0.25)",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
              </svg>
              {isSavingAll ? "Saving..." : "Save All"}
            </button>

            <Link
              to="/"
              style={{
                padding: "7px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(6,182,212,0.25)",
                background: "rgba(6,182,212,0.08)",
                color: "#67e8f9",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "background 0.2s",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              View Site
            </Link>

            <button
              type="button"
              onClick={onSignOut}
              style={{
                padding: "7px 14px",
                borderRadius: "10px",
                border: "1px solid rgba(239,68,68,0.25)",
                background: "rgba(239,68,68,0.08)",
                color: "#fca5a5",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1.5rem",
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: "1.5rem",
        }}
        className="admin-layout"
      >
        {/* Sidebar */}
        <aside
          style={{
            position: "sticky",
            top: "84px",
            height: "fit-content",
            background: "rgba(15,23,42,0.65)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "18px",
            padding: "1.25rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#475569",
              marginBottom: "12px",
            }}
          >
            Quick Jump
          </p>
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {editableSectionKeys.map((sectionKey) => (
              <a
                key={sectionKey}
                href={`#section-${sectionKey}`}
                onClick={() => setActiveSection(sectionKey)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "8px 10px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: activeSection === sectionKey ? "#06b6d4" : "#94a3b8",
                  background:
                    activeSection === sectionKey
                      ? "rgba(6,182,212,0.1)"
                      : "transparent",
                  border:
                    activeSection === sectionKey
                      ? "1px solid rgba(6,182,212,0.2)"
                      : "1px solid transparent",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ opacity: 0.7 }}>{sectionIcons[sectionKey]}</span>
                {sectionLabelMap[sectionKey]}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main style={{ display: "flex", flexDirection: "column", gap: "1.25rem", minWidth: 0 }}>
          {/* Warning/error banners */}
          {!isSupabaseConfigured && (
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "14px",
                background: "rgba(234,179,8,0.08)",
                border: "1px solid rgba(234,179,8,0.25)",
                color: "#fde68a",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span>⚠️</span>
              Supabase environment variables are missing. You can edit locally, but saving to backend will fail.
            </div>
          )}

          {contentError && (
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "14px",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)",
                color: "#fca5a5",
                fontSize: "13px",
              }}
            >
              {contentError}
            </div>
          )}

          {globalStatus.message && (
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "14px",
                background: statusColors[globalStatus.type].bg,
                border: `1px solid ${statusColors[globalStatus.type].border}`,
                color: statusColors[globalStatus.type].text,
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>{globalStatus.type === "success" ? "✅" : "⚠️"}</span>
              {globalStatus.message}
            </div>
          )}

          {isContentLoading ? (
            <div
              style={{
                padding: "3rem",
                textAlign: "center",
                background: "rgba(15,23,42,0.5)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "20px",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>⏳</div>
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

      <style>{`
        @media (max-width: 768px) {
          .admin-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
