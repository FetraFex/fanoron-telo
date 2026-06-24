import { motion } from "framer-motion";

export const LeavesOverlay = () => {
  return (
    <motion.img
      src="/corner-leaves.png"
      alt=""
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full object-fill"
      style={{ zIndex: 10 }}
      initial={{ opacity: 0, x: 120 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1], delay: 0.6 }}
    />
  );
};
