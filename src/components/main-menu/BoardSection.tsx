export const BoardSection = () => {
  return (
    <div className="relative flex w-full items-center justify-center md:w-[52%]">
      <img
        src="/board.png"
        alt="Plateau Fanorona"
        className="w-[90%] object-contain"
      />
      <img
        src="/ohabolana.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] right-[4%] w-[38%] rounded-xl"
        style={{ zIndex: 3 }}
      />
    </div>
  );
};
