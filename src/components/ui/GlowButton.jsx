const GlowButton = ({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon hover:shadow-neonPurple hover:-translate-y-0.5",
    secondary:
      "border border-white/20 bg-white/5 text-white/90 hover:border-cyan-300/60 hover:text-white",
    ghost: "text-slate-200 hover:text-white",
  };

  const classes = `${baseClasses} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
};

export default GlowButton;
