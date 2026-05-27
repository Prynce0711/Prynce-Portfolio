import {
  FaGithub,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const SocialLinks = [
  {
    name: "Email",
    value: "pc.clemente11@gmail.com",
    icon: <FaEnvelope />,
    link: "mailto:pc.clemente11@gmail.com",
    color: "bg-red-500/10 text-red-500",
  },
  {
    name: "GitHub",
    value: "github.com/prynce0711",
    icon: <FaGithub />,
    link: "https://github.com/prynce0711",
    color: "bg-slate-500/10 text-slate-700 dark:text-slate-300",
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/prynce-carlo-clemente-a380aa25b",
    icon: <FaLinkedinIn />,
    link: "https://www.linkedin.com/in/prynce-carlo-clemente-a380aa25b/",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "Facebook",
    value: "https://www.facebook.com/pryncecarlo.clemente11",
    icon: <FaFacebookF />,
    link: "https://www.facebook.com/pryncecarlo.clemente11",
    color: "bg-blue-700/10 text-blue-700",
  },
];

export default SocialLinks;
