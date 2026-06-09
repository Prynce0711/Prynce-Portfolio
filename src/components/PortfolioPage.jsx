import { useCallback, useEffect, useState } from "react";
import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Project";
import Skills from "./Skills/Skills";
import Experience from "./Experience";
import Contact from "./Contact/Contact";
import Footer from "./Footer";
import SpotlightBackground from "./ui/spotlight-background";
import PortfolioLoadingPage from "./ui/PortfolioLoadingPage";
import { useSiteContent } from "../context/SiteContentContext";

const PortfolioPage = () => {
  const { isContentLoading } = useSiteContent();
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const sections = [Hero, About, Skills, Projects, Experience, Contact];

  useEffect(() => {
    if (isContentLoading) {
      setIsLoadingComplete(false);
    }
  }, [isContentLoading]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoadingComplete(true);
  }, []);

  if (isContentLoading || !isLoadingComplete) {
    return (
      <PortfolioLoadingPage
        isReady={!isContentLoading}
        onComplete={handleLoadingComplete}
      />
    );
  }

  return (
    <div className="App relative min-h-screen overflow-x-hidden">
      <SpotlightBackground />

      <Navigation />
      <main className="relative z-10">
        {sections.map((Section, index) => (
          <Section key={index} />
        ))}
        <Footer />
      </main>
    </div>
  );
};

export default PortfolioPage;
