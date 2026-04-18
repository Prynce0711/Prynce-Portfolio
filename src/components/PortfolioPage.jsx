import { motion } from "framer-motion";
import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Project";
import Skills from "./Skills";
import Experience from "./Experience";
import Contact from "./Contact";
import Footer from "./Footer";

const sectionTransition = {
  hidden: { opacity: 0.85, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const MotionDiv = motion.div;

const PortfolioPage = () => {
  const sections = [Hero, About, Projects, Skills, Experience, Contact];

  return (
    <div className="App overflow-x-hidden">
      <Navigation />

      {sections.map((Section, index) => (
        <MotionDiv
          key={index}
          initial="hidden"
          whileInView="visible"
          variants={sectionTransition}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Section />
        </MotionDiv>
      ))}

      <Footer />
    </div>
  );
};

export default PortfolioPage;
