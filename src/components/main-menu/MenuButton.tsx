import { motion } from "framer-motion";
import type { ReactNode } from "react";
import styles from "./MenuButton.module.css";
import { useHoverSound } from "../../hooks/useHoverSound";

interface MenuButtonProps {
  icon: ReactNode;
  label: string;
  subtitle: string;
  badge?: string;
  isActive: boolean;
  onClick: () => void;
}

export const MenuButton = ({ icon, label, subtitle, badge, isActive, onClick }: MenuButtonProps) => {
  const playHover = useHoverSound();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={playHover}
      className={`${styles["menu-btn"]} ${isActive ? styles["btn-active"] : ""} relative flex w-full items-center gap-3 rounded-xl px-4 py-5 text-left sm:gap-4 sm:px-[18px] sm:py-6 lg:w-3/4 ${
        isActive
          ? "text-white"
          : "bg-fanorona-btn-idle text-fanorona-brown"
      }`}
      whileHover={{ scale: isActive ? 1.06 : 1.04, y: -4, boxShadow: "0 15px 35px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15, ease: [0.33, 1, 0.68, 1] }}
      animate={isActive ? { scale: 1.06 } : { scale: 1 }}
    >
      <motion.span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-150 ${
          isActive ? "bg-black/25 text-white" : "border-[1.5px] border-fanorona-muted bg-transparent text-fanorona-muted"
        }`}
        whileHover={{ rotate: 5 }}
        transition={{ duration: 0.15, ease: [0.33, 1, 0.68, 1] }}
      >
        {icon}
      </motion.span>

      <div className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
          {label}
          {badge && (
            <span className="rounded bg-fanorona-amber px-1.5 py-0.5 text-[10px] font-bold text-white">
              {badge}
            </span>
          )}
        </span>
        <span
          className={`mt-0.5 block text-xs ${
            isActive ? "text-white/80" : "text-fanorona-muted italic"
          }`}
        >
          {subtitle}
        </span>
      </div>

      {isActive && (
        <img
          src="/hovered-btn-hud.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-1 top-0 h-full w-8 object-contain"
        />
      )}
    </motion.button>
  );
};
