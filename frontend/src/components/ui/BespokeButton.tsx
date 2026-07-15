import React from "react";
import { motion } from "framer-motion";

interface BespokeButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark" | "blue" | "emerald";
  onClick?: () => void;
  className?: string;
  href?: string;
}

export const BespokeButton = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  href
}: BespokeButtonProps) => {
  const baseStyles = "rounded-full px-12 py-5 text-[0.75rem] font-black uppercase tracking-[0.2em] transition-all duration-500 text-center flex items-center justify-center";

  const variants = {
    primary: "bg-[#f2c14f] text-black hover:bg-[#ffd573] hover:shadow-[0_20px_50px_-10px_rgba(242,193,79,0.3)]",
    secondary: "border border-white/20 text-white hover:bg-white/5",
    dark: "bg-[#1e2528] text-white hover:bg-black hover:shadow-xl",
    blue: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_20px_50px_-10px_rgba(37,99,235,0.4)]",
    emerald: "bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.4)]"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  const content = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center justify-center gap-3"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {content}
    </button>
  );
};
