import { motion } from "framer-motion";

interface Position {
  x: number;
  y: number;
}

interface AddBoxProps {
  positions: Position[];
}

const BoxMotionCursor = ({ positions }: AddBoxProps) => {
  const variants = {
    default: {
      x: positions[0].x - 50,
      y: positions[0].y - 50,
      transition: { delay: -1 },
    },
  };
  return (
    <motion.div className="cursor" animate="default" variants={variants}>
      <h1 className="text-xl mt-[-50px] ml-[-50px]">x: {positions[0]?.x}</h1>
      <h1 className="text-xl mt-[-10px] ml-[-50px]">y: {positions[0]?.y}</h1>
    </motion.div>
  );
};

export default BoxMotionCursor;
