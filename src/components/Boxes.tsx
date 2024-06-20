import BoxFixed from "./BoxFixed";
import BoxMotionCursor from "./BoxMotionCursor";
import HookMouse from "./HookMouse";

const Boxes: React.FC = (): JSX.Element => {
  return (
    <>
      <BoxMotionCursor positions={HookMouse()} />
      <BoxFixed positions={HookMouse()} />
    </>
  );
};

export default Boxes;
