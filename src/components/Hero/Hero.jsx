import LeftText from "./LeftText";
import RightImage from "./RightImage";
import { useSiteContent } from "../../context/SiteContentContext";

function Hero() {
  const { siteContent } = useSiteContent();
  const hero = siteContent.hero || {};

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden scroll-mt-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-16 py-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <LeftText hero={hero} />

          <RightImage hero={hero} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
