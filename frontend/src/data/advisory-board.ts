// src/data/advisory-board.ts

export type AdvisoryMember = {
  name: string;
  title: string;
  role: string;
  description: string;
  linkedin: string;
  image?: string;
};

export const boardOfDirectors: AdvisoryMember[] = [
  {
    name: "Michael Wieser",
    title: "Chairman",
    role: "Austrian hotelier and CEO of Dhonakulhi Investments Pvt. Ltd.",
    description:
      "Oversees world-class hospitality properties including Hideaway Beach Resort & Spa and Lily Beach Resort & Spa in the Maldives.",
    linkedin: "https://www.linkedin.com/in/michael-wieser-83664a3a/",
    image: "/images/board_of_directers/Michael_Wieser_1.jpeg",
  },
  {
    name: "Dr. Dharshana Weerakoon DBA",
    title: "Managing Director",
    role: "Chairman of Global Cooperation (Private) Limited.",
    description:
      "Specializes in international tourism strategy, global partnerships, destination development, and sustainable tourism initiatives.",
    linkedin: "https://www.linkedin.com/in/dharshana-weerakoon/",
    image: "/images/board_of_directers/Darshana_Weerakoon.jpg",
  },
  // {
  //   name: "Sumudu Masakorala",
  //   title: "Director",
  //   role: "Managing Director and Founder of Global Soft Solutions (Private) Limited.",
  //   description:
  //     "Brings expertise in technology, innovation, digital transformation, and business solutions.",
  //   linkedin: "https://www.linkedin.com/in/sumudu-masakorala/",
  //   image: "/images/board_of_directers/Sumudu_masakorala.jpeg",
  // },
  // {
  //   name: "Dr. Jayaruwan Bandara",
  //   title: "Director",
  //   role: "Healthcare management professional, medical administrator, and clinical cosmetologist",
  //   description:
  //     "Provides expertise in medical services and wellness development.",
  //   linkedin: "https://www.linkedin.com/in/jayaruwanbandara/",
  //   image: "/images/board/jayaruwan-bandara.jpg",
  // },
  {
    name: "Dr. Uditha Samaratunga DBA",
    title: "Director",
    role: "Chief Executive Officer of SaaGo Holdings (Private) Limited.",
    description:
      "Business transformation leader specializing in strategic growth and organizational development.",
    linkedin: "https://www.linkedin.com/in/uditha-samaratunga/",
    image: "/images/board_of_directers/Uditha_1.jpeg",
  },
  {
    name: "Chris Berenger",
    title: "Director",
    role: "International hospitality executive.",
    description:
      "Has extensive leadership experience in luxury hotels, resorts, and global hospitality operations.",
    linkedin: "https://www.linkedin.com/in/chris-berenger-949b1937/",
    image: "/images/board_of_directers/Chris_Berenger_2.jpeg",
  },
  {
    name: "Piyumal Herath",
    title: "Director",
    role: "Attorney-at-Law, entrepreneur, and business advisor.",
    description:
      "Provides expertise in legal, commercial, and corporate affairs.",
    linkedin: "https://www.linkedin.com/in/piyumal-herath/",
    image: "/images/board_of_directers/piyumal_1.jpg",
  },
  {
    name: "Muditha Hapuarachchi",
    title: "Director",
    role: "Entrepreneur and Strategic Consultant to Global Cooperation (Private) Limited.",
    description:
      "Specializes in business development, operational strategy, and corporate advisory services.",
    linkedin: "https://www.linkedin.com/in/muditha-hapuarachchi/",
    image: "/images/board_of_directers/Muditha_Hapuarachchi.jpeg",
  },
  {
    name: "Yoshitha Jayanetty",
    title: "Director",
    role: "Retired Major of the Sri Lanka Army, Entrepreneur and Strategic Consultant.",
    description:
      "Contributes expertise in strategic planning, risk management, and operational excellence.",
    linkedin: "https://www.linkedin.com/in/yoshitha-jayanetty-02481a53/",
    image: "/images/board_of_directers/Yoshitha_Jayanette.jpeg",
  }
];

export const globalRepresentatives: AdvisoryMember[] = [
  {
    name: "Warnika Dhanawansha (Germany)",
    title: "Director",
    role: "Founder of CareTours Hamburg (Germany).",
    description:
      "Specializes in tourism marketing, customer relationship management, and sustainable tourism development.",
    linkedin: "https://www.linkedin.com/in/warnika-dhanawansha-bb5476222/",
    image: "/images/board_of_directers/varnika.jpg",
  },
  {
    name: "Thisara Seneviratne (UK/US)",
    title: "Director",
    role: "UK-based international operations executive with over 30 years of experience.",
    description:
      "Expert in operations management, organizational resilience, and continuous improvement across international markets.",
    linkedin: "https://www.linkedin.com/in/thisara-don/",
    image: "/images/board_of_directers/Thisara_Sen.png",
  }
];