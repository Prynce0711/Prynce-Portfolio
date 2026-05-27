import BackgroundFx from "./BackgroundFx";
import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Project";
import Skills from "./Skills";
import Experience from "./Experience";
import Contact from "./Contact";
import Footer from "./Footer";

const PortfolioPage = () => {
  const sections = [Hero, About, Skills, Projects, Experience, Contact];

  return (
    <div className="App relative min-h-screen overflow-x-hidden">
      <BackgroundFx />
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
