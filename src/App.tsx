import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function App() {
  const images = [
    "https://tibiamaps.github.io/tibia-map-data/floor-07-map.png",
  ];

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 50,
      y: mousePosition.y - 50,
      transition: { delay: -1 },
    },
  };

  const variants2 = {
    default: {
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      transition: { delay: -1 },
    },
  };

  const variants3 = {
    default: {
      x: mousePosition.x - 12.5,
      y: mousePosition.y - 12.5,
      transition: { delay: -1 },
    },
  };
  return (
    <>
      <div>
        {images.map((image, i) => (
          <div key={i}>
            <img src={image} alt="" />
          </div>
        ))}
      </div>
      <motion.div className="cursor" variants={variants} animate="default" />
      <motion.div className="cursor2" variants={variants2} animate="default" />
      <motion.div className="cursor3" variants={variants3} animate="default" />
    </>
  );
}

export default App;
