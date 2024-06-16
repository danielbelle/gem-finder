import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Boxes = () => {
  interface IMousePosition {
    x: number;
    y: number;
  }

  const [mousePosition, setMousePosition] = useState<IMousePosition>({
    x: 0,
    y: 0,
  });

  interface IMousePositionMemory extends Array<IMousePosition> {}

  const [getMousePosition, setGetMousePosition] =
    useState<IMousePositionMemory>([]);

  useEffect(() => {
    const onMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [mousePosition]);

  useEffect(() => {
    const onMouseDown = (e: { clientX: number; clientY: number }) => {
      setGetMousePosition((getMousePosition) => [
        ...getMousePosition,
        ...[mousePosition],
      ]);
    };

    window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  const variants = {
    default: {
      x: Number(mousePosition.x) - 50,
      y: Number(mousePosition.y) - 50,
      transition: { delay: -1 },
    },
  };
  /*
  const handleMouseClick = (e: MouseEvent) => {
    e.preventDefault();
    setGetMousePosition((getMousePosition) => [
      ...getMousePosition,
      ...[mousePosition],
    ]);
    console.log(getMousePosition);
  };*/

  return (
    <div>
      <motion.div className="cursor" variants={variants} animate="default">
        <h1 className="text-xl mt-[-50px] ml-[-50px]">x: {mousePosition.x}</h1>
        <h1 className="text-xl mt-[-10px] ml-[-50px]">y: {mousePosition.y}</h1>
      </motion.div>
    </div>
  );
};

export default Boxes;
