"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
};

export default function LinkButton({ href, children }: LinkButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        className="relative inline-block px-4 py-2 text-sky-700 font-medium
                   border border-sky-300 rounded-lg
                   hover:bg-sky-100 transition-colors duration-300"
      >
        {children}
      </Link>
    </motion.div>
  );
}
