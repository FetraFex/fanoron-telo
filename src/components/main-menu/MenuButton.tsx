import type { ReactNode } from "react";

interface MenuButtonProps {
  icon: ReactNode;
  label: string;
  subtitle: string;
  badge?: string;
  isActive: boolean;
  onClick: () => void;
}

export const MenuButton = ({ icon, label, subtitle, badge, isActive, onClick }: MenuButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex w-full items-center gap-4 rounded-xl px-[18px] py-3.5 text-left transition-colors duration-150 ease-in-out md:w-3/4 ${
        isActive
          ? "bg-fanorona-green text-white"
          : "bg-fanorona-btn-idle text-fanorona-brown"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-150 ${
          isActive ? "bg-black/25 text-white" : "border-[1.5px] border-fanorona-muted bg-transparent text-fanorona-muted"
        }`}
      >
        {icon}
      </span>

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
    </button>
  );
};
