const BackgroundFx = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(139,92,246,0.16),_transparent_60%)]" />
      <div className="absolute inset-0 grid-bg grid-fade animate-grid opacity-40" />

      <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.45),_transparent_70%)] blur-3xl opacity-60 animate-float" />
      <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(139,92,246,0.5),_transparent_70%)] blur-3xl opacity-60 animate-float-slow" />
      <div className="absolute bottom-12 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(244,114,182,0.35),_transparent_70%)] blur-3xl opacity-60 animate-float" />
    </div>
  );
};

export default BackgroundFx;
