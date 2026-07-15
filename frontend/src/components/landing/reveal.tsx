"use client";

import { motion, type Variants } from "framer-motion";
import { clsx } from "clsx";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
};

export function Reveal({
  children,
  className,
  delay = 0,
  variants = defaultVariants,
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      variants={variants}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
}
