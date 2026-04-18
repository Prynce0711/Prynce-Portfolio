import { useState } from "react";
import { useSiteContent } from "../context/SiteContentContext";

const AdminSectionCard = ({ sectionKey, title, description, children }) => {
  const { saveSection, savingBySection } = useSiteContent();
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const isSaving = Boolean(savingBySection[sectionKey]);

  const handleSave = async () => {
    setStatus({ type: "idle", message: "" });
    try {
      await saveSection(sectionKey);
      setStatus({ type: "success", message: "Section saved to Supabase." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Saving failed. Check your Supabase policies.",
      });
    }
  };

  return (
    <section
      id={`section-${sectionKey}`}
      style={{
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "20px",
        padding: "1.75rem",
        boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
        transition: "box-shadow 0.3s",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: status.message ? "0.5rem" : "1.5rem",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: 800,
              color: "#f1f5f9",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#64748b" }}>
            {description}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            minWidth: "130px",
            padding: "8px 18px",
            borderRadius: "10px",
            border: "none",
            background: isSaving
              ? "rgba(6,182,212,0.2)"
              : "linear-gradient(135deg, #06b6d4, #0891b2)",
            color: isSaving ? "#64748b" : "#fff",
            fontSize: "13px",
            fontWeight: 700,
            cursor: isSaving ? "not-allowed" : "pointer",
            boxShadow: isSaving ? "none" : "0 4px 14px rgba(6,182,212,0.25)",
            transition: "opacity 0.2s, transform 0.1s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { if (!isSaving) e.currentTarget.style.opacity = "0.88"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          onMouseDown={(e) => { if (!isSaving) e.currentTarget.style.transform = "scale(0.97)"; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          {isSaving ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
              </svg>
              Save Section
            </>
          )}
        </button>
      </div>

      {/* Status message */}
      {status.message ? (
        <div
          style={{
            marginBottom: "1.25rem",
            padding: "8px 12px",
            borderRadius: "10px",
            fontSize: "12px",
            fontWeight: 600,
            background:
              status.type === "success"
                ? "rgba(16,185,129,0.10)"
                : "rgba(239,68,68,0.10)",
            border:
              status.type === "success"
                ? "1px solid rgba(16,185,129,0.30)"
                : "1px solid rgba(239,68,68,0.28)",
            color: status.type === "success" ? "#6ee7b7" : "#fca5a5",
          }}
        >
          {status.type === "success" ? "✅ " : "⚠️ "}
          {status.message}
        </div>
      ) : null}

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "1.5rem" }} />

      {/* Section content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {children}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};

export default AdminSectionCard;
