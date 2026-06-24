import type { Variants, Transition } from "framer-motion";

export const easeOutCubic: Transition["ease"] = [0.33, 1, 0.68, 1];
export const easeInOutQuad: Transition["ease"] = [0.45, 0, 0.55, 1];

export const fast: Transition = { duration: 0.15, ease: easeOutCubic };
export const normal: Transition = { duration: 0.25, ease: easeOutCubic };
export const slow: Transition = { duration: 0.35, ease: easeOutCubic };
export const entrance: Transition = { duration: 1.2, ease: easeOutCubic };

// ─── Page Entrance ──────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5, ease: easeOutCubic } },
};

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: entrance },
};

export const fadeSlideDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: entrance },
};

export const fadeSlideLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: entrance },
};

export const fadeSlideRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: entrance },
};

export const fadeScaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: easeOutCubic } },
};

// ─── Staggered Container ────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.25 },
  },
};

// ─── Logo ────────────────────────────────────────────────────────

export const logoReveal: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: easeOutCubic, delay: 0.2 } },
};

// ─── Scale hover ─────────────────────────────────────────────────

export const hoverScale = {
  whileHover: { scale: 1.04, y: -4, transition: fast },
};

export const hoverScaleSmall = {
  whileHover: { scale: 1.03, y: -6, transition: fast },
};

// ─── Button tap ──────────────────────────────────────────────────

export const buttonTap = {
  whileTap: { scale: 0.96, transition: { duration: 0.12 } },
};

export const cardTap = {
  whileTap: { scale: 0.98, transition: { duration: 0.12 } },
};

// ─── Piece animations ────────────────────────────────────────────

export const pieceHover = {
  whileHover: { scale: 1.08, transition: { duration: 0.12 } },
};

export const pieceSelected: Variants = {
  idle: { scale: 1 },
  selected: {
    scale: 1.12,
    transition: { duration: 0.25, ease: easeOutCubic },
  },
};

export const possibleMoveIndicator: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.15, ease: easeOutCubic } },
};

export const pulseIndicator = {
  animate: {
    scale: [1, 1.1, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
};

export const capturePiece: Variants = {
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.25, ease: easeOutCubic } },
};

export const captureBounce: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.03, 1],
    transition: { duration: 0.15, ease: easeOutCubic },
  },
};

// ─── Victory ─────────────────────────────────────────────────────

export const victoryOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: easeOutCubic } },
};

export const victoryCard: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: easeOutCubic } },
};

// ─── Turn indicator pulse ────────────────────────────────────────

export const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(140, 198, 62, 0)",
      "0 0 12px 4px rgba(140, 198, 62, 0.3)",
      "0 0 0 0 rgba(140, 198, 62, 0)",
    ],
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

export const activePlayerScale = {
  whileHover: { scale: 1.02, transition: { duration: 0.2 } },
};

export const opacityPulse = {
  animate: {
    opacity: [0.7, 1, 0.7],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};
