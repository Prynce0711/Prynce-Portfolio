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
      <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
        <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">
            Admin Setup
          </p>
          <h1 className="mt-2 text-3xl font-black">Missing Supabase Config</h1>
          <p className="mt-3 text-sm text-slate-300">
            Add the required variables in your local env file before using admin
            login and save features.
          </p>

          <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-700 bg-slate-950 p-4 text-xs text-cyan-200">
            {`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_ADMIN_EMAILS=admin@example.com
VITE_SUPABASE_STORAGE_BUCKET=portfolio-assets`}
          </pre>

          <p className="mt-3 text-xs text-slate-400">
            After updating env, restart the Vite dev server.
          </p>

          <div className="mt-5">
            <Link
              to="/"
              className="inline-flex rounded-xl border border-cyan-300 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-100"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-900 text-slate-100">
        <p className="text-sm tracking-wide text-slate-300">
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
