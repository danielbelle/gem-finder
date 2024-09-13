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
  const dragAreaRef = useRef<HTMLImageElement>(null);
  const internalScaleZoom = 1;

  const handleZoomIn = () => {
    if (scale == 8) return;
    setScale((scale) => {
      return scale + internalScaleZoom;
    });
  };

  const handleZoomOut = () => {
    if (scale == 1) return;
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

    const verifyDelta = (
      e: MouseEvent,
      prevPosition: { x: number; y: number },
    ) => {
      let deltaX = e.clientX - prevPosition.x;
      let deltaY = e.clientY - prevPosition.y;

      if (Math.abs(deltaX) > 8) deltaX = 7;
      if (Math.abs(deltaY) > 8) deltaY = 7;

      if (
        Math.abs(
          Number(imageRef?.current?.getBoundingClientRect().left) -
            Number(dragAreaRef?.current?.getBoundingClientRect().left),
        ) < 10
      ) {
        if (deltaX < 0) {
          deltaX = e.clientX - prevPosition.x;
        } else {
          deltaX = 0;
        }
      }

      if (
        Math.abs(
          Number(imageRef?.current?.getBoundingClientRect().right) -
            Number(dragAreaRef?.current?.getBoundingClientRect().right),
        ) < 10
      ) {
        if (deltaX > 0) {
          deltaX = e.clientX - prevPosition.x;
        } else {
          deltaX = 0;
        }
      }
      if (
        Math.abs(
          Number(imageRef?.current?.getBoundingClientRect().top) -
            Number(dragAreaRef?.current?.getBoundingClientRect().top),
        ) < 10
      ) {
        if (deltaY < 0) {
          deltaY = e.clientY - prevPosition.y;
        } else {
          deltaY = 0;
        }
      }
      if (
        Math.abs(
          Number(imageRef?.current?.getBoundingClientRect().bottom) -
            Number(dragAreaRef?.current?.getBoundingClientRect().bottom),
        ) < 10
      ) {
        if (deltaY > 0) {
          deltaY = e.clientY - prevPosition.y;
        } else {
          deltaY = 0;
        }
      }
      return { x: deltaX, y: deltaY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      if (scale == 1) return;
      let delta = { x: 0, y: 0 };
      delta = verifyDelta(e, prevPosition);

      prevPosition = { x: e.clientX, y: e.clientY };
      setPosition((position) => ({
        x: position.x + delta.x,
        y: position.y + delta.y,
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
      <div ref={dragAreaRef} className="imageWrapper">
        <img
          className="image"
          ref={imageRef}
          src={imageUrl}
          alt=""
          style={{
            width: "55vw",
            height: "auto",
            cursor: "move",
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            borderRadius: "8px",
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ImageZoomInOut;
