export const defaultSiteContent = {
  hero: {
    firstName: "Prynce Carlo",
    lastName: "Clemente",
    roleText: "Student | Full Stack Web Developer",
    primaryButtonText: "Get Started",
    primaryButtonHref: "#about",
    secondaryButtonText: "View Projects",
    secondaryButtonHref: "#projects",
    imageSrc: "pic.jpg",
    imageAlt: "Prynce Carlo Clemente",
  },
  about: {
    fullText:
      "I am a dedicated IT student with a passion for web development and design.\n\nMy journey in the tech world has equipped me with skills in various programming languages and frameworks. I thrive on creating innovative solutions.\n\nBeyond academics, I enjoy collaborating on projects that challenge my creativity and technical skills. I am eager to contribute to impactful projects and grow as a professional in the IT industry.",
  },
  projects: {
    titleLead: "Featured",
    titleHighlight: "Projects",
    description:
      "A collection of my technical projects, architectural designs, and case studies.",
    items: [
      {
        title: "Barcie International Center",
        description:
          "Capstone project for LCUP's premier laboratory facility for BS Tourism Management. A full-scale management system.",
        tags: ["PHP", "Tailwind", "JavaScript"],
        image: "barcie.png",
        link: "http://barcie.safehub-lcup.uk",
      },
      {
        title: "Portfolio",
        description:
          "A personal collection of my work built with Laravel. Showcasing my early journey in full-stack development.",
        tags: ["TailwindCSS", "React", "Laravel"],
        image: "portfolio.png",
        link: "https://prynce-portfolio.vercel.app",
      },
    ],
  },
  skills: {
    title: "Technical Stack",
    subtitle: "Tools and technologies I use to bring ideas to life.",
    groups: [
      {
        category: "Frontend Development",
        skills: [
          { name: "React", iconKey: "react", color: "text-[#61DAFB]" },
          {
            name: "JavaScript",
            iconKey: "javascript",
            color: "text-[#F7DF1E]",
          },
          {
            name: "Tailwind",
            iconKey: "tailwindcss",
            color: "text-[#06B6D4]",
          },
          {
            name: "Bootstrap",
            iconKey: "bootstrap",
            color: "text-[#7952B3]",
          },
        ],
      },
      {
        category: "Backend Development",
        skills: [
          { name: "Laravel", iconKey: "laravel", color: "text-[#FF2D20]" },
          { name: "PHP", iconKey: "php", color: "text-[#777BB4]" },
        ],
      },
      {
        category: "Version Control and Tools",
        skills: [
          { name: "Git", iconKey: "git", color: "text-[#F05032]" },
          { name: "GitHub", iconKey: "github", color: "text-[#181717]" },
        ],
      },
    ],
  },
  experience: {
    title: "Working Experience",
    subtitle: "A collection of my working experiences.",
    items: [
      {
        title: "Service Crew",
        company: "Jolly Management Solutions inc. - Greenwich",
        year: "2023",
        desc: "Developed and maintained web applications using PHP and modern CSS frameworks. Collaborated with a team to build functional and responsive systems.",
      },
      {
        title: "Product Re-packer",
        company: "Gorgeous Glow",
        year: "2023",
        desc: "Designed and built responsive websites for personal clients, focusing on clean UI/UX, accessibility, and performance.",
      },
      {
        title: "Assistant Merchandizer",
        company: "Pandayan Bookshop",
        year: "2025",
        desc: "Led the development of an academic web system as a capstone project, handling both frontend and backend logic.",
      },
      {
        title: "Sales Agent",
        company: "Converge ICT Solutions",
        year: "2022 - 2025",
        desc: "Led the development of an academic web system as a capstone project, handling both frontend and backend logic.",
      },
    ],
  },
  contact: {
    titleLead: "Ready to build",
    titleHighlight: "something great?",
    description:
      "I am currently available for freelance work and full-time opportunities. Lets connect and turn your vision into a reality.",
    availabilityText: "Available for New Projects",
    socials: [
      {
        name: "Email",
        value: "pc.clemente11@gmail.com",
        iconKey: "email",
        link: "mailto:pc.clemente11@gmail.com",
        color: "bg-red-500/10 text-red-500",
      },
      {
        name: "GitHub",
        value: "github.com/prynce0711",
        iconKey: "github",
        link: "https://github.com/prynce0711",
        color: "bg-slate-500/10 text-slate-700",
      },
      {
        name: "LinkedIn",
        value: "linkedin.com/in/prynce-carlo-clemente-a380aa25b",
        iconKey: "linkedin",
        link: "https://www.linkedin.com/in/prynce-carlo-clemente-a380aa25b/",
        color: "bg-blue-500/10 text-blue-600",
      },
      {
        name: "Facebook",
        value: "facebook.com/pryncecarlo.clemente11",
        iconKey: "facebook",
        link: "https://www.facebook.com/pryncecarlo.clemente11",
        color: "bg-blue-700/10 text-blue-700",
      },
    ],
  },
  footer: {
    headlinePrefix: "Designed and Built by",
    ownerName: "Prynce",
    rightsText: "All rights reserved",
    madeWithLabel: "Made with",
    techStack: ["React", "Tailwind CSS", "Framer Motion"],
  },
};

export const editableSectionKeys = [
  "hero",
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
  "footer",
];
