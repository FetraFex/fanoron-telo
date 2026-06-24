export const BoardSection = () => {
  return (
    <div className="absolute bottom-0 right-0 top-0 flex w-[55%] items-center justify-center overflow-visible" style={{ zIndex: 1 }}>
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
    </div>
  );
};
