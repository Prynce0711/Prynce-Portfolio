import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiLaravel,
  SiTailwindcss,
  SiBootstrap,
  SiPhp,
  SiGit,
  SiGithub,
} from "react-icons/si";

const skillGroups = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "Tailwind", icon: SiTailwindcss, color: "text-[#06B6D4]" },
      { name: "Bootstrap", icon: SiBootstrap, color: "text-[#7952B3]" },
    ],
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Laravel", icon: SiLaravel, color: "text-[#FF2D20]" },
      { name: "PHP", icon: SiPhp, color: "text-[#777BB4]" },
    ],
  },
  {
    category: "Version Control & Tools",
    skills: [
      { name: "Git", icon: SiGit, color: "text-[#F05032]" },
      {
        name: "GitHub",
        icon: SiGithub,
        color: "text-[#181717] dark:text-white",
      },
    ],
  },
];

export default skillGroups;
