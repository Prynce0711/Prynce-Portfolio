// import { useSiteContent } from "../context/SiteContentContext";

// const Footer = () => {
//   const { siteContent } = useSiteContent();
//   const footer = siteContent.footer || {};
//   const techStack = footer.techStack || [];

//   return (
//     <footer className="relative border-t border-white/10 py-10 text-slate-400">
//       <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
//       <div className="container mx-auto px-6">
//         <div className="text-center space-y-2">
//           <p className="text-lg font-semibold text-white">
//             {footer.headlinePrefix || "Designed and Built by"}{" "}
//             <span className="text-cyan-200">
//               {footer.ownerName || "Prynce"}
//             </span>
//           </p>
//           <p className="text-sm text-slate-400">
//             © {new Date().getFullYear()}{" "}
//             {footer.rightsText || "All rights reserved"}
//           </p>
//         </div>

//         <div className="mt-6 text-center">
//           <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
//             {footer.madeWithLabel || "Made with"}
//           </p>
//           <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm">
//             {techStack.map((item, index) => (
//               <span
//                 key={`${item}-${index}`}
//                 className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300"
//               >
//                 {item}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { useSiteContent } from "../context/SiteContentContext";
import { socialIconMap } from "../lib/iconMaps";

const Footer = () => {
  const { siteContent, isContentLoading, contentError } = useSiteContent();
  const footer = siteContent.footer || {};
  const techStack = footer.techStack || [];
  const socials = (footer.socials || []).filter((social) => social?.link);
  const hasFooterText = Boolean(
    footer.headlinePrefix || footer.ownerName || footer.rightsText,
  );
  const hasFooterContent =
    hasFooterText || techStack.length > 0 || socials.length > 0;

  return (
    <footer className="relative border-t border-white/10 py-10 text-slate-400">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      <div className="container mx-auto px-6">
        {isContentLoading ? (
          <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center text-sm text-slate-300">
            Loading footer content...
          </div>
        ) : contentError ? (
          <div className="mb-10 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-6 py-4 text-center text-sm text-rose-200">
            Unable to load footer content. {contentError}
          </div>
        ) : !hasFooterContent ? (
          <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center text-sm text-slate-300">
            Footer content is not available yet.
          </div>
        ) : null}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-2 mb-2">
          {/* Social Links - Center Column */}
          {socials.length ? (
            <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
              <div className="ct-block-label mb-8">
                <span className="ct-block-label-num">03</span>
                <span className="ct-block-label-text">Find me elsewhere</span>
                <div className="ct-block-label-line" />
              </div>

              <div className="flex items-center gap-4">
                {socials.map((social, index) => {
                  const Icon =
                    socialIconMap[social.iconKey] || socialIconMap.link;

                  return (
                    <a
                      key={`${social.name || social.link}-${index}`}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10"
                      aria-label={social.name || "Social link"}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-105 -z-10" />
                      <Icon className="w-5 h-5 text-slate-300 group-hover:text-cyan-300 transition-all duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Left Column - Owner Info */}
          <div className="text-center lg:text-left lg:col-start-2">
            {hasFooterText ? (
              <>
                <p className="text-xl font-bold text-white mb-3 leading-tight">
                  {footer.headlinePrefix ? `${footer.headlinePrefix} ` : ""}
                  <span className="text-cyan-300 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {footer.ownerName}
                  </span>
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  © {new Date().getFullYear()} {footer.rightsText}
                </p>
              </>
            ) : null}
          </div>

          {/* Right Column - Tech Stack */}
          <div className="text-center lg:text-right lg:col-start-3">
            {footer.madeWithLabel ? (
              <p className="text-xs uppercase tracking-[0.3em] font-medium text-slate-500 mb-4">
                {footer.madeWithLabel}
              </p>
            ) : null}
            {techStack.length ? (
              <div className="inline-flex flex-wrap gap-2">
                {techStack.map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="group rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Bottom Divider */}
      </div>
    </footer>
  );
};

export default Footer;
