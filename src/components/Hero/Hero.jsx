import LeftText from "./LeftText";
import RightImage from "./RightImage";
import { useSiteContent } from "../../context/SiteContentContext";

function Hero() {
  const { siteContent, isContentLoading, contentError } = useSiteContent();
  const hero = siteContent.hero || {};
  const hasHeroContent = Boolean(
    hero.firstName ||
      hero.lastName ||
      hero.roleText ||
      hero.primaryButtonText ||
      hero.secondaryButtonText ||
      hero.imageSrc,
  );

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden scroll-mt-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-16 py-20 relative z-10">
        {isContentLoading ? (
          <div className="text-center text-slate-300/80">
            Loading hero content...
          </div>
        ) : contentError ? (
          <div className="text-center text-rose-200">
            Unable to load hero content. {contentError}
          </div>
        ) : !hasHeroContent ? (
          <div className="text-center text-slate-300/80">
            Hero content is not available yet.
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <LeftText hero={hero} />

            <RightImage hero={hero} />
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;
