import { motion } from "framer-motion";

function NavLink({ href, children, isActive, onClick }) {
  const baseClasses =
    "relative block rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition";
  const activeClasses =
    "text-white bg-white/10 after:content-[''] after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-neon-blue after:to-neon-purple";
  const inactiveClasses = "text-slate-200/80 hover:text-white hover:bg-white/5";

  return (
    <li>
      <motion.a
        href={href}
        onClick={onClick}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        aria-current={isActive ? "page" : undefined}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {children}
      </motion.a>
    </li>
  );
}
export default NavLink;
