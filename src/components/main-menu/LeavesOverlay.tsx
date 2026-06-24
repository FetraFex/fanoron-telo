export const LeavesOverlay = () => {
  return (
    <img
      src="/corner-leaves.png"
      alt=""
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full object-fill"
      style={{ zIndex: 10 }}
    />
  );
};
