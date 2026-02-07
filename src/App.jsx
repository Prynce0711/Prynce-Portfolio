import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Project";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { motion } from "framer-motion";

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

function App() {
  const sections = [Hero, About, Projects, Skills, Experience, Contact];

  return (
    <div className="App overflow-x-hidden">
      <Navigation />

      {sections.map((Section, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          variants={sectionTransition}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Section />
        </motion.div>
      ))}
      <Footer />
    </div>
  );
}

export default App;
