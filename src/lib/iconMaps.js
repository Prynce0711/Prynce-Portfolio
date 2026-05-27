import {
  SiBootstrap,
  SiDocker,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiNodedotjs,
  SiPhp,
  SiPrisma,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import { FaCss3Alt } from "react-icons/fa";
import {
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaLink,
} from "react-icons/fa";

export const skillIconMap = {
  react: SiReact,
  javascript: SiJavascript,
  typescript: SiTypescript,
  tailwindcss: SiTailwindcss,
  bootstrap: SiBootstrap,
  nodejs: SiNodedotjs,
  laravel: SiLaravel,
  php: SiPhp,
  prisma: SiPrisma,
  supabase: SiSupabase,
  docker: SiDocker,
  git: SiGit,
  github: SiGithub,
  html5: SiHtml5,
  css: FaCss3Alt,
};

export const socialIconMap = {
  email: FaEnvelope,
  github: FaGithub,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  website: FaGlobe,
  link: FaLink,
};

export const skillIconOptions = [
  { value: "react", label: "React" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "tailwindcss", label: "Tailwind CSS" },
  { value: "bootstrap", label: "Bootstrap" },
  { value: "nodejs", label: "Node.js" },
  { value: "laravel", label: "Laravel" },
  { value: "php", label: "PHP" },
  { value: "prisma", label: "Prisma" },
  { value: "supabase", label: "Supabase" },
  { value: "docker", label: "Docker" },
  { value: "git", label: "Git" },
  { value: "github", label: "GitHub" },
  { value: "html5", label: "HTML5" },
  { value: "css3", label: "CSS3" },
];

export const socialIconOptions = [
  { value: "email", label: "Email" },
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "website", label: "Website" },
  { value: "link", label: "Link" },
];
