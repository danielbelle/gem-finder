import { useEffect, useReducer } from "react";

const HookMouse = () => {
  interface PositionMouseProps {
    x: number;
    y: number;
  }

  const initialPositions: PositionMouseProps[] = [{ x: 0, y: 0 }];

  const [positions, dispatch] = useReducer(positionsReducer, initialPositions);

  type Action =
    | { type: "added" }
    | { type: "mousemove"; position: PositionMouseProps }
    | { type: "mousedown"; x: number; y: number };

  function positionsReducer(
    positions: PositionMouseProps[],
    action: Action,
  ): PositionMouseProps[] {
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

  return positions;
};

export default HookMouse;
