interface PawnIconProps {
  player: "X" | "O";
  size?: number;
}

export const PawnIcon = ({ player, size = 16 }: PawnIconProps) => {
  if (player === "X") {
    return (
      <span
        className="inline-block rounded-full bg-[#2E2E2E]"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="inline-block rounded-full border-2 border-[#B37A4C] bg-[#F5EFE0]"
      style={{ width: size, height: size }}
    />
  );
};
