import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import floor7 from "/floor-07-map.png";

const Maps = () => {
  //const images = [floor7];

  return (
    /*           {images.map((image, i) => (
            <div key={i}>
              <img src={image} className="kaz" alt="" />
            </div>
          ))}*/
    <div>
      <TransformWrapper>
        <TransformComponent>
          <img src={floor7} alt="test" width="150%" />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default Maps;
