import { useState } from "react";
import BoxMotionCursor from "./BoxMotionCursor";
import BoxFixed from "./BoxFixed";
import HookMouse from "./HookMouse";

const Boxes: React.FC = (): JSX.Element => {
  const [boxSelector, setBoxSelector] = useState(true);
  /*
  const handleChangeBoxSelector = () => {
    setBoxSelector((prev) => !prev);
  };*/

  return (
    <>
      {boxSelector && <BoxMotionCursor positions={HookMouse()} />}
      <BoxFixed positions={HookMouse()} />
    </>
  );
};

export default Boxes;
