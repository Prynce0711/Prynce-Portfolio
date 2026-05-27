import { useEffect, useMemo, useState } from "react";
import NavLink from "./NavLink";
import MobileButton from "./MobileButton";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Tech Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.replace("#", "")),
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0.1,
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const handleNavClick = () => setIsOpen(false);

  return (
    <nav className="fixed w-full z-50 top-4 left-0 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-3 shadow-soft backdrop-blur-xl">
        {/* LOGO */}
        <a href="#hero" className="flex items-center gap-3">
          <span className="text-lg md:text-2xl font-semibold text-white">
            Prynce
          </span>
          <span className="hidden md:inline-block text-xs uppercase tracking-[0.3em] text-cyan-300/70">
            Portfolio
          </span>
        </a>
        {/* Mobile Menu Button */}
        <MobileButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        {/* MENU LINKS */}
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/80 p-4 md:mt-0 md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                isActive={activeId === link.href.replace("#", "")}
                onClick={handleNavClick}
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
