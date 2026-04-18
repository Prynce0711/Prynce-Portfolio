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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/80 p-7 shadow-2xl backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">
          Portfolio CMS
        </p>
        <h1 className="mt-2 text-3xl font-black text-white">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-300">
          Sign in with your Supabase Auth email and password.
        </p>

        {allowedAdminEmails.length > 0 ? (
          <p className="mt-3 rounded-xl border border-cyan-800 bg-cyan-950/50 px-3 py-2 text-xs text-cyan-200">
            Allowed admins: {allowedAdminEmails.join(", ")}
          </p>
        ) : (
          <p className="mt-3 rounded-xl border border-amber-800 bg-amber-950/50 px-3 py-2 text-xs text-amber-200">
            VITE_ADMIN_EMAILS is empty. Any authenticated user can enter this
            UI.
          </p>
        )}

        {feedback ? (
          <p
            className={`mt-4 rounded-xl border px-3 py-2 text-sm ${
              feedbackType === "success"
                ? "border-emerald-600 bg-emerald-900/30 text-emerald-200"
                : "border-rose-700 bg-rose-950/30 text-rose-200"
            }`}
          >
            {feedback}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-300">
              Email
            </span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/30"
              placeholder="admin@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-slate-300">
              Password
            </span>
            <input
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/30"
              placeholder="Enter your password"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-cyan-700"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
