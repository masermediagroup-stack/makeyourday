"use client";

import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AnimatedGradientTextProps = Omit<HTMLMotionProps<"span">, "children"> & {
  children: ReactNode;
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
};

export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = "#a78bfa",
  colorTo = "#7c3aed",
  style,
  ...props
}: AnimatedGradientTextProps) {
  const duration = Math.max(0.6, 8 / speed);

  return (
    <motion.span
      className={cn("inline bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(120deg, ${colorFrom}, ${colorTo}, ${colorFrom})`,
        backgroundSize: "220% 220%",
        WebkitBackgroundClip: "text",
        ...style,
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
      {...props}
    >
      {children}
    </motion.span>
  );
}
