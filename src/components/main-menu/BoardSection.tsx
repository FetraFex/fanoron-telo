import { motion } from "framer-motion";

export const BoardSection = () => {
  return (
    <motion.div
      className="hidden lg:flex absolute bottom-0 right-0 top-0 w-[55%] items-center justify-center overflow-visible"
      style={{ zIndex: 1 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
    >
      <img
        src="/board.png"
        alt="Plateau Fanorona"
        className="h-[110%] w-auto max-w-none object-contain"
      />
      <img
        src="/ohabolana.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-8%] left-1/2 w-[56%] -translate-x-[70%] rounded-xl"
        style={{ zIndex: 3 }}
      />
    </motion.div>
  );
};
