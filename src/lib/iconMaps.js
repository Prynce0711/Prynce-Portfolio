import {
  SiBootstrap,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiPhp,
  SiReact,
  SiTailwindcss,
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
  tailwindcss: SiTailwindcss,
  bootstrap: SiBootstrap,
  laravel: SiLaravel,
  php: SiPhp,
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
  { value: "tailwindcss", label: "Tailwind CSS" },
  { value: "bootstrap", label: "Bootstrap" },
  { value: "laravel", label: "Laravel" },
  { value: "php", label: "PHP" },
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
