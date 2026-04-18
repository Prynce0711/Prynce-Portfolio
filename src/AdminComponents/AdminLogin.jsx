import { useState } from "react";
import { Link } from "react-router-dom";
import { allowedAdminEmails, isAdminEmailAllowed } from "../utils/adminAuth";
import { supabase } from "../utils/supabase/client";

const AdminLogin = ({ initialMessage = "" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(initialMessage);
  const [feedbackType, setFeedbackType] = useState(
    initialMessage ? "error" : "idle",
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!supabase) {
      setFeedback(
        "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY first.",
      );
      setFeedbackType("error");
      return;
    }

    setIsSubmitting(true);
    setFeedback("");
    setFeedbackType("idle");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setFeedback(error.message || "Login failed.");
      setFeedbackType("error");
      setIsSubmitting(false);
      return;
    }

    if (!isAdminEmailAllowed(data?.user?.email || "")) {
      await supabase.auth.signOut();
      setFeedback(
        "This account is not included in VITE_ADMIN_EMAILS. Update env and try again.",
      );
      setFeedbackType("error");
      setIsSubmitting(false);
      return;
    }

    setFeedback("Login successful. Opening dashboard...");
    setFeedbackType("success");
    setIsSubmitting(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background:
          "radial-gradient(ellipse at 60% 0%, rgba(6,182,212,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 100%, rgba(139,92,246,0.10) 0%, transparent 60%), #0a0f1e",
      }}
    >
      {/* Decorative glow blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "420px",
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "24px",
          padding: "2.5rem",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Top accent line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            width: "80%",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #06b6d4, transparent)",
            borderRadius: "0 0 4px 4px",
          }}
        />

        {/* Header badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
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
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#06b6d4", margin: 0 }}>
              Portfolio CMS
            </p>
            <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#f1f5f9", margin: 0, lineHeight: 1.2 }}>
              Admin Access
            </h1>
          </div>
        </div>

        <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          Restricted area. Sign in with your authorized credentials.
        </p>

        {/* Feedback banner */}
        {feedback ? (
          <div
            style={{
              marginBottom: "1.25rem",
              padding: "10px 14px",
              borderRadius: "12px",
              fontSize: "13px",
              lineHeight: 1.5,
              background:
                feedbackType === "success"
                  ? "rgba(16,185,129,0.12)"
                  : "rgba(239,68,68,0.10)",
              border:
                feedbackType === "success"
                  ? "1px solid rgba(16,185,129,0.35)"
                  : "1px solid rgba(239,68,68,0.30)",
              color: feedbackType === "success" ? "#6ee7b7" : "#fca5a5",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "14px" }}>{feedbackType === "success" ? "✅" : "⚠️"}</span>
            <span>{feedback}</span>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {/* Email */}
          <div>
            <label
              htmlFor="admin-email"
              style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#64748b", marginBottom: "6px" }}
            >
              Email Address
            </label>
            <input
              id="admin-email"
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "10px 14px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "#e2e8f0",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(6,182,212,0.6)";
                e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.08)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="admin-password"
              style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#64748b", marginBottom: "6px" }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="admin-password"
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px 42px 10px 14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#e2e8f0",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(6,182,212,0.6)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.08)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "12px",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: "0.25rem",
              width: "100%",
              padding: "11px",
              borderRadius: "12px",
              border: "none",
              background: isSubmitting
                ? "rgba(6,182,212,0.3)"
                : "linear-gradient(135deg, #06b6d4, #0891b2)",
              color: isSubmitting ? "#94a3b8" : "#fff",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.04em",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "opacity 0.2s, transform 0.1s",
              boxShadow: isSubmitting ? "none" : "0 4px 16px rgba(6,182,212,0.3)",
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseDown={(e) => {
              if (!isSubmitting) e.currentTarget.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link
            to="/"
            style={{ fontSize: "13px", color: "#475569", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = "#94a3b8")}
            onMouseLeave={(e) => (e.target.style.color = "#475569")}
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
