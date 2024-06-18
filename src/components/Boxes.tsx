import { useReducer, useEffect, useState } from "react";
import BoxMotionCursor from "./BoxMotionCursor";
import BoxFixed from "./BoxFixed";

const Boxes: React.FC = (): JSX.Element => {
  interface PositionMouse {
    x: number;
    y: number;
  }
  const initialPositions: PositionMouse[] = [{ x: 0, y: 0 }];

  type Action =
    | { type: "added" }
    | { type: "mousemove"; position: PositionMouse }
    | { type: "mousedown"; x: number; y: number };

  const [boxSelector, setBoxSelector] = useState(false);
  const [positions, dispatch] = useReducer(positionsReducer, initialPositions);

  function positionsReducer(
    positions: PositionMouse[],
    action: Action,
  ): PositionMouse[] {
    switch (action.type) {
      case "mousemove":
        return positions.map((t, i) => {
          if (i === 0) {
            return action.position;
          } else {
            return t;
          }
        });

      case "mousedown":
        return [...positions, { x: action.x, y: action.y }];
      default:
        return initialPositions;
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      dispatch({
        type: "mousemove",
        position: { x: e.clientX, y: e.clientY },
      });
      setBoxSelector(true);
    };

    const handleAddBox = (e: { clientX: number; clientY: number }) => {
      dispatch({
        type: "mousedown",
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleAddBox);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleAddBox);
    };
  }, []);

  return (
    <>
      {boxSelector ? "" : <BoxMotionCursor positions={positions} />}
      <BoxFixed positions={positions} />
    </>
  );
};

export default Boxes;
