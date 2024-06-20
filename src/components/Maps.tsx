import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import floor7 from "/floor-07-map.png";

const Maps = () => {
  return (
    <div>
      <TransformWrapper>
        <TransformComponent>
          <img src={floor7} alt="test" width="90%" />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default Maps;
