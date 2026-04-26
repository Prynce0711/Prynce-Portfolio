import React from "react";
import { motion } from "framer-motion";

function NavLink({ href, children, isActive }) {
  const baseClasses = "block py-2 px-3 rounded md:p-0";
  const activeClasses =
    "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500";
  const inactiveClasses =
    "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

  return (
    <li>
      <motion.a
        href={href}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        aria-current={isActive ? "page" : undefined}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {children}
      </motion.a>
    </li>
  );
}
export default NavLink;
