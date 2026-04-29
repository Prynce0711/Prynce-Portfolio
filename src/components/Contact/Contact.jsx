import React from "react";

import ContactForm from "./ContactForm";
import LeftCard from "./LeftCard";
import RightCard from "./RightCard";
import { useSiteContent } from "../../context/SiteContentContext";

const Contact = () => {
  const { siteContent } = useSiteContent();
  const contact = siteContent.contact || {};

  return (
    <section id="contact" className="py-24  dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
          {/* Left Side: Big Text */}
          <LeftCard contact={contact} />

          <div className="lg:w-1/2 w-full space-y-6">
            <ContactForm contact={contact} />

            {/* Right Side: Social Cards */}
            <RightCard contact={contact} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
