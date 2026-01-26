import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/experience";
import Contact from "./components/Contact";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SectionTranstion = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function App() {
  return (
      <div className="App">
      <Navbar />
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={SectionTranstion}
        viewport={{ margin: "-100px" }}
      >
        <Hero />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={SectionTranstion}
        viewport={{ margin: "-100px" }}
      >
        <About />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={SectionTranstion}
        viewport={{ margin: "-100px" }}
      >
        <Projects />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={SectionTranstion}
        viewport={{ margin: "-100px" }}
      >
        <Skills />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={SectionTranstion}
        viewport={{ margin: "-100px" }}
      >
        <Experience />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={SectionTranstion}
        viewport={{ margin: "-100px" }}
      >
        <Contact />
      </motion.div>
    </div>
  );
}

export default App;
