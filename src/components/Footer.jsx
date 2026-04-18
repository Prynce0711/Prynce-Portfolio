import React from "react";
import { useSiteContent } from "../context/SiteContentContext";

const Footer = () => {
  const { siteContent } = useSiteContent();
  const footer = siteContent.footer || {};
  const techStack = footer.techStack || [];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-gray-400 py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* Decorative top line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>

        {/* Content */}
        <div className="text-center space-y-2 mt-4">
          <p className="text-3xl font-light">
            {footer.headlinePrefix || "Designed and Built by"}{" "}
            <span className="text-white font-semibold">
              {footer.ownerName || "Prynce"}
            </span>
          </p>
          <p className="text-2xl text-gray-500">
            © {new Date().getFullYear()}{" "}
            {footer.rightsText || "All rights reserved"}
          </p>
        </div>

        {/* Subtle tech stack credit (optional) */}
        <div className="mt-6 text-center">
          <p className="text-xl text-gray-600 flex items-center justify-center gap-2">
            <span>{footer.madeWithLabel || "Made with"}</span>
            {techStack.map((item, index) => (
              <React.Fragment key={`${item}-${index}`}>
                <span>·</span>
                <span
                  className={
                    index === 0
                      ? "text-blue-400"
                      : index === 1
                        ? "text-cyan-400"
                        : "text-purple-400"
                  }
                >
                  {item}
                </span>
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
