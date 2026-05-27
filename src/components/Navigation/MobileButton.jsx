const MobileButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-slate-200 transition hover:border-cyan-300/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/40 md:hidden"
      aria-controls="navbar-sticky"
      aria-expanded={isOpen}
    >
      <span className="sr-only">Open main menu</span>

      {/* Toggle icon: hamburger when closed, X when open */}
      {!isOpen ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </svg>
      )}
    </button>
  );
};

export default MobileButton;
