// src/data/advisory-board.ts

export type AdvisoryMember = {
  name: string;
  title: string;
  role: string;
  description: string;
  linkedin: string;
  image?: string;
};

export const advisoryBoard: AdvisoryMember[] = [
  {
    name: "Michael Wieser",
    title: "Chairman",
    role: "Austrian hotelier and CEO of Dhonakulhi Investments Pvt. Ltd.",
    description:
      "Oversees world-class hospitality properties including Hideaway Beach Resort & Spa and Lily Beach Resort & Spa in the Maldives.",
    linkedin: "https://www.linkedin.com/in/michael-wieser-83664a3a/",
    image: "/images/board/michael-wieser.jpg",
  },
  {
    name: "Dr. Dharshana Weerakoon DBA",
    title: "Managing Director",
    role: "Chairman of Global Cooperation (Private) Limited.",
    description:
      "Specializes in international tourism strategy, global partnerships, destination development, and sustainable tourism initiatives.",
    linkedin: "https://www.linkedin.com/in/dharshana-weerakoon/",
    image: "/images/board/dharshana-weerakoon.jpg",
  },
  {
    name: "Sumudu Masakorala",
    title: "Director",
    role: "Managing Director and Founder of Global Soft Solutions (Private) Limited.",
    description:
      "Brings expertise in technology, innovation, digital transformation, and business solutions.",
    linkedin: "https://www.linkedin.com/in/sumudu-masakorala/",
    image: "/images/board/sumudu-masakorala.jpg",
  },
  // {
  //   name: "Dr. Jayaruwan Bandara",
  //   title: "Director",
  //   role: "Medical Administrator, Clinical Cosmetologist, and healthcare management professional.",
  //   description:
  //     "Provides expertise in medical services and wellness development.",
  //   linkedin: "https://www.linkedin.com/in/jayaruwanbandara/",
  //   image: "/images/board/jayaruwan-bandara.jpg",
  // },
  {
    name: "Dr. Warnika Dhanawansha",
    title: "Director",
    role: "Founder of CareTours Hamburg (Germany).",
    description:
      "Specializes in tourism marketing, customer relationship management, and sustainable tourism development.",
    linkedin: "https://www.linkedin.com/in/warnika-dhanawansha-bb5476222/",
    image: "/images/board/warnika-dhanawansha.jpg",
  },

  {
    name: "Dr. Uditha Samaratunga DBA",
    title: "Director",
    role: "Chief Executive Officer of SaaGo Holdings (Private) Limited.",
    description:
      "Business transformation leader specializing in strategic growth and organizational development.",
    linkedin: "https://www.linkedin.com/in/uditha-samaratunga/",
    image: "/images/board/uditha-samaratunga.jpg",
  },
  {
    name: "Chris Berenger",
    title: "Director",
    role: "International hospitality executive.",
    description:
      "Has extensive leadership experience in luxury hotels, resorts, and global hospitality operations.",
    linkedin: "https://www.linkedin.com/in/chris-berenger-949b1937/",
    image: "/images/board/chris-berenger.jpg",
  },
  {
    name: "Warnika Dhanawansha",
    title: "Director",
    role: "Founder of CareTours Hamburg (Germany).",
    description:
      "Specializes in tourism marketing, customer relationship management, and sustainable tourism development.",
    linkedin: "https://www.linkedin.com/in/warnika-dhanawansha-bb5476222/",
    image: "/images/board/warnika-dhanawansha.jpg",
  },
  {
    name: "Thisara Seneviratne",
    title: "Director",
    role: "UK-based operations executive with over 30 years of international experience.",
    description:
      "Expert in operations management, organizational resilience, and continuous improvement.",
    linkedin: "https://www.linkedin.com/in/thisara-don/",
    image: "/images/board/thisara-seneviratne.jpg",
  },
  {
    name: "Piyumal Herath",
    title: "Director",
    role: "Attorney-at-Law, entrepreneur, and business advisor.",
    description:
      "Provides expertise in legal, commercial, and corporate affairs.",
    linkedin: "https://www.linkedin.com/in/piyumalherath/",
    image: "/images/board/piyumal-herath.jpg",
  },
  {
    name: "Muditha Hapuarachchi",
    title: "Director",
    role: "Entrepreneur and Strategic Consultant to Global Cooperation (Private) Limited.",
    description:
      "Specializes in business development, operational strategy, and corporate advisory services.",
    linkedin: "https://www.linkedin.com/in/muditha-hapuarachchi/",
    image: "/images/board/muditha-hapuarachchi.jpg",
  },
];