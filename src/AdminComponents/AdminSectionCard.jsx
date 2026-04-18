import { useState } from "react";
import { useSiteContent } from "../context/SiteContentContext";

const statusToneClass = {
  success: "text-emerald-600",
  error: "text-rose-600",
  idle: "text-slate-500",
};

const AdminSectionCard = ({ sectionKey, title, description, children }) => {
  const { saveSection, savingBySection } = useSiteContent();
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const isSaving = Boolean(savingBySection[sectionKey]);

  const handleSave = async () => {
    setStatus({ type: "idle", message: "" });

    try {
      await saveSection(sectionKey);
      setStatus({ type: "success", message: "Saved to Supabase." });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message || "Saving failed. Check your Supabase policies.",
      });
    }
  };

  return (
    <section
      id={`section-${sectionKey}`}
      className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex min-w-32 items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSaving ? "Saving..." : "Save Section"}
        </button>
      </div>

      {status.message ? (
        <p className={`mt-3 text-sm ${statusToneClass[status.type]}`}>
          {status.message}
        </p>
      ) : null}

      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
};

export default AdminSectionCard;
