const GlassCard = ({ className = "", children }) => {
  return (
    <div className={`glass-card glass-card-hover rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
