import { CSSProperties } from "react";
import BoxCompass from "./BoxCompass";

interface MyCustomCSS extends CSSProperties {
  left: string | number;
  top: string | number;
}

interface Position {
  x: number;
  y: number;
}
interface AddFixedBoxProps {
  positions: Position[];
}

const BoxFixed = ({ positions }: AddFixedBoxProps) => {
  return (
    <>
      {positions.map((pos, i) => {
        if (i !== 0) {
          return (
            <div key={i} className="container">
              <p className="text-md inline-block">
                X: {pos.x} Y: {pos.y}
              </p>
              <div
                className="cursor-fixed"
                style={
                  {
                    left: Number(`${pos.x - 50}`) + "px",
                    top: Number(`${pos.y - 50}`) + "px",
                  } as MyCustomCSS
                }
              >
                <BoxCompass />
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default BoxFixed;
