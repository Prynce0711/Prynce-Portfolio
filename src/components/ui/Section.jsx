import { motion } from "framer-motion";

const Section = ({ id, className = "", children }) => {
  return (
    <motion.section
      id={id}
      className={`relative scroll-mt-28 py-24 sm:py-28 ${className}`}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.section>
  );
};

export default Section;
