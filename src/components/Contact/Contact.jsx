import React from "react";

import LeftCard from "./LeftCard";
import RightCard from "./RightCard";

const Contact = () => {
  return (
    <section id="contact" className="py-24  dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Side: Big Text */}
          <LeftCard />

          {/* Right Side: Social Cards */}
          <RightCard />
        </div>
      </div>
    </section>
  );
};

export default Contact;
