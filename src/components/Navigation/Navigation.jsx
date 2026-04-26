import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import MobileButton from "./MobileButton";

const navLinks = [
  { href: "#", label: "Home", isActive: true },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Tech Stack" },
  { href: "#experience", label: "Work Experience" },
  { href: "#contact", label: "Contact" },
];

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-4 left-0 px-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-white/60 dark:bg-slate-900/60 rounded-xl shadow-soft backdrop-blur-md">
        {/* LOGO */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-lg md:text-2xl font-extrabold whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
            Prynce
          </span>
        </a>
        {/* Mobile Menu Button */}
        <MobileButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        {/* MENU LINKS */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? "block" : "hidden"}`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                isActive={link.isActive}
              >
                {link.label}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
