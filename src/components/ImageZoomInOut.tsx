import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface ImageZoomInOutProps {
  imageUrl: string;
  onSendLevel(arg0: number): number;
}

const ImageZoomInOut = ({ imageUrl, onSendLevel }: ImageZoomInOutProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const internalScaleZoom = 1;

  const handleZoomIn = () => {
    setScale((scale) => {
      return scale + internalScaleZoom;
    });
  };

  const handleZoomOut = () => {
    setScale((scale) => {
      return scale - internalScaleZoom;
    });
  };

  useEffect(() => {
    const image = imageRef?.current;
    let isDragging = false;
    let prevPosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevPosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPosition.x;
      const deltaY = e.clientY - prevPosition.y;
      prevPosition = { x: e.clientX, y: e.clientY };

      setPosition((position) => ({
        x: position.x + deltaX,
        y: position.y + deltaY,
      }));
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    image?.addEventListener("mousedown", handleMouseDown);
    image?.addEventListener("mousemove", handleMouseMove);
    image?.addEventListener("mouseup", handleMouseUp);

    return () => {
      image?.removeEventListener("mousedown", handleMouseDown);
      image?.removeEventListener("mousemove", handleMouseMove);
      image?.removeEventListener("mouseup", handleMouseUp);
    };
  }, [imageRef, scale]);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="btn-container1">
        <button onClick={handleZoomIn}>
          <AddIcon />
        </button>
        <button onClick={handleZoomOut}>
          <RemoveIcon />
        </button>
      </div>
      <div className="btn-container2">
        <button onClick={() => onSendLevel(-1)}>
          <ArrowUpwardIcon />
        </button>
        <button onClick={() => onSendLevel(1)}>
          <ArrowDownwardIcon />
        </button>
      </div>
      <img
        ref={imageRef}
        src={imageUrl}
        alt=""
        style={{
          width: "55vw",
          height: "auto",
          cursor: "move",
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
        }}
        draggable={false}
      />
    </div>
  );
};

export default ImageZoomInOut;
