import { useState } from "react";

const Squares = () => {
  const [horizontalSplit, setHorizontalSplit] = useState<number>(10);
  const [verticalSplit, setVerticalSplit] = useState<number>(8);

  const tiles = Array.from({
    length: horizontalSplit * verticalSplit,
  });
  const getTileX = (
    i: number,
    horizontalSplit: number,
    verticalSplit: number,
  ) => {
    const currentRow = Math.floor(i / horizontalSplit) + 1;
    const tileHeight = 100 / verticalSplit;

    return tileHeight * currentRow - tileHeight;
  };

  const getTileY = (i: number, horizontalSplit: number) => {
    const currentCol = (i % horizontalSplit) + 1;
    const tileWidth = 100 / horizontalSplit;

    return (100 / horizontalSplit) * currentCol - tileWidth;
  };
  return (
    <>
      {tiles.map((_t, i) => (
        <div
          key={i}
          className="tileBorder"
          style={{
            width: `${100 / horizontalSplit}%`,
            height: `${100 / verticalSplit}%`,
            top: `${getTileX(i, horizontalSplit, verticalSplit)}%`,
            left: `${getTileY(i, horizontalSplit)}%`,
          }}
        >
          <div className="tileBorderContent">{i + 1}</div>
        </div>
      ))}
    </>
  );
};

export default Squares;
