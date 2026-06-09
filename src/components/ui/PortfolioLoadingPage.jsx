import { useEffect, useState } from "react";
import SpotlightBackground from "./spotlight-background";

const PortfolioLoadingPage = ({ isReady = false, onComplete }) => {
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    if (isReady) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 94) {
          return current;
        }

        return Math.min(current + Math.floor(Math.random() * 8) + 3, 94);
      });
    }, 260);

    return () => window.clearInterval(interval);
  }, [isReady]);

  useEffect(() => {
    if (!isReady) {
      return undefined;
    }

    setProgress(100);
    const timeout = window.setTimeout(() => {
      onComplete?.();
    }, 650);

    return () => window.clearTimeout(timeout);
  }, [isReady, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black text-white">
      <SpotlightBackground />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6 text-center">
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-2 rounded-full border border-white/10" />
          <div className="h-16 w-16 animate-spin rounded-full border-2 border-white/15 border-t-white" />
          <div className="absolute h-8 w-8 rounded-full bg-white/10 blur-xl" />
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.45em] text-white/45">
          Portfolio
        </p>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Loading Portfolio
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
          Please wait while the backend database prepares the latest content.
        </p>

        <div className="mt-8 w-full">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-white/45">
            <span>{isReady ? "Database ready" : "Connecting to database"}</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioLoadingPage;
