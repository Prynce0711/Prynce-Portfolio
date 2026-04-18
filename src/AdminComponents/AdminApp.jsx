import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
import { isAdminEmailAllowed } from "../utils/adminAuth";
import { isSupabaseConfigured, supabase } from "../utils/supabase/client";

const isSessionMissingError = (error) => {
  const errorMessage = error?.message?.toLowerCase() || "";

  return (
    error?.name === "AuthSessionMissingError" ||
    errorMessage.includes("auth session missing")
  );
};

const AdminApp = () => {
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured);
  const [user, setUser] = useState(null);
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    let isMounted = true;

    const bootstrapAuth = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!isMounted) {
        return;
      }

      if (error && !isSessionMissingError(error)) {
        setAuthMessage(error.message || "Failed to validate current session.");
      }

      if (error && isSessionMissingError(error)) {
        setAuthMessage("");
      }

      const currentUser = data?.user || null;

      if (currentUser && !isAdminEmailAllowed(currentUser.email || "")) {
        await supabase.auth.signOut();
        setUser(null);
        setAuthMessage(
          "Current account is not listed as admin. Update VITE_ADMIN_EMAILS to allow this user.",
        );
      } else {
        setUser(currentUser);
      }

      setAuthLoading(false);
    };

    bootstrapAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const nextUser = session?.user || null;

        if (nextUser && !isAdminEmailAllowed(nextUser.email || "")) {
          await supabase.auth.signOut();
          if (!isMounted) {
            return;
          }

          setUser(null);
          setAuthMessage(
            "Signed-in account is not listed in VITE_ADMIN_EMAILS.",
          );
          return;
        }

        if (!isMounted) {
          return;
        }

        setUser(nextUser);
        if (nextUser) {
          setAuthMessage("");
        }
      },
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    if (!supabase) {
      return;
    }

    const { error } = await supabase.auth.signOut();

    if (error && isSessionMissingError(error)) {
      setUser(null);
      setAuthMessage("");
      return;
    }

    if (error) {
      setAuthMessage(error.message || "Logout failed.");
      return;
    }

    setUser(null);
    setAuthMessage("");
  };

  if (!isSupabaseConfigured) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "radial-gradient(ellipse at 70% 0%, rgba(6,182,212,0.07) 0%, transparent 55%), #080d1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "580px",
            background: "rgba(15,23,42,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "24px",
            padding: "2.5rem",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
          }}
        >
          <p style={{ margin: 0, fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#06b6d4" }}>
            Admin Setup
          </p>
          <h1 style={{ marginTop: "8px", fontSize: "26px", fontWeight: 900, color: "#f1f5f9" }}>Missing Supabase Config</h1>
          <p style={{ marginTop: "10px", fontSize: "13px", color: "#94a3b8", lineHeight: 1.6 }}>
            Add the required variables in your local env file before using admin login and save features.
          </p>
          <pre
            style={{
              marginTop: "1.25rem",
              overflowX: "auto",
              borderRadius: "12px",
              border: "1px solid rgba(6,182,212,0.15)",
              background: "rgba(6,182,212,0.04)",
              padding: "1rem",
              fontSize: "12px",
              color: "#67e8f9",
              lineHeight: 1.7,
            }}
          >
            {`VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key\nVITE_ADMIN_EMAILS=admin@example.com\nVITE_SUPABASE_STORAGE_BUCKET=portfolio-assets`}
          </pre>
          <p style={{ marginTop: "10px", fontSize: "12px", color: "#475569" }}>
            After updating env, restart the Vite dev server.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 18px",
                borderRadius: "10px",
                border: "1px solid rgba(6,182,212,0.3)",
                background: "rgba(6,182,212,0.08)",
                color: "#67e8f9",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#080d1a",
          display: "grid",
          placeItems: "center",
        }}
      >
        <p style={{ fontSize: "13px", letterSpacing: "0.06em", color: "#475569" }}>
          Checking session...
        </p>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin initialMessage={authMessage} />;
  }

  return <AdminDashboard user={user} onSignOut={handleSignOut} />;
};

export default AdminApp;
