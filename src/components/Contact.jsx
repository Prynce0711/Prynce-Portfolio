import React from 'react';
import { FaGithub, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

const Contact = () => {
  const socialLinks = [
    { 
      name: "Email", 
      value: "pc.clemente11@gmail.com", 
      icon: <FaEnvelope />, 
      link: "mailto:pc.clemente11@gmail.com",
      color: "bg-red-500/10 text-red-500" 
    },
    { 
      name: "GitHub", 
      value: "github.com/prynce0711", 
      icon: <FaGithub />, 
      link: "https://github.com/prynce0711",
      color: "bg-slate-500/10 text-slate-700 dark:text-slate-300" 
    },
    { 
      name: "LinkedIn", 
      value: "linkedin.com/in/prynce-carlo-clemente-a380aa25b", 
      icon: <FaLinkedinIn />, 
      link: "https://www.linkedin.com/in/prynce-carlo-clemente-a380aa25b/",
      color: "bg-blue-500/10 text-blue-600" 
    },
    { 
      name: "Facebook", 
      value: "https://www.facebook.com/pryncecarlo.clemente11", 
      icon: <FaFacebookF />, 
      link: "https://www.facebook.com/pryncecarlo.clemente11",
      color: "bg-blue-700/10 text-blue-700" 
    }
  ];

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Big Text */}
          <div className="lg:w-1/2">
            <h2 className="text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tighter">
              Ready to build <br />
              <span className="text-blue-600">something great?</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-md">
              I’m currently available for freelance work and full-time opportunities. 
              Let’s connect and turn your vision into a reality.
            </p>
            
            <div className="flex items-center gap-3 text-green-500 font-semibold uppercase tracking-widest text-xs animate-pulse">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Available for New Projects
            </div>
          </div>

          {/* Right Side: Social Cards */}
          <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="group p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between aspect-square sm:aspect-auto sm:h-48"
              >
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-2xl text-2xl ${social.color}`}>
                    {social.icon}
                  </div>
                  <FiArrowUpRight className="text-2xl text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                
                <div>
                  <p className="text-sm font-bold text-slate-400 dark:text-slate-500 mb-1">
                    {social.name}
                  </p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200 truncate">
                    {social.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>



  );
};

export default Contact;