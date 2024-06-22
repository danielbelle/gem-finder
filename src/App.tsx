//import Maps from "./components/Maps.tsx";
//import Boxes from "./components/Boxes.tsx";
import floor0 from "/floor-00-map.png";
import floor1 from "/floor-01-map.png";
import floor2 from "/floor-02-map.png";
import floor3 from "/floor-03-map.png";
import floor4 from "/floor-04-map.png";
import floor5 from "/floor-05-map.png";
import floor6 from "/floor-06-map.png";
import floor7 from "/floor-07-map.png";
import floor8 from "/floor-08-map.png";
import floor9 from "/floor-09-map.png";
import floor10 from "/floor-10-map.png";
import floor11 from "/floor-11-map.png";
import floor12 from "/floor-12-map.png";
import floor13 from "/floor-13-map.png";
import floor14 from "/floor-14-map.png";
import floor15 from "/floor-15-map.png";

import ImageZoomInOut from "./components/ImageZoomInOut.tsx";
import { useState } from "react";

function App() {
  const mapArray = [
    floor0,
    floor1,
    floor2,
    floor3,
    floor4,
    floor5,
    floor6,
    floor7,
    floor8,
    floor9,
    floor10,
    floor11,
    floor12,
    floor12,
    floor13,
    floor14,
    floor15,
  ];
  const [mapLevel, setMapLevel] = useState(7);
  {
    /*  
  <Maps />
  <Boxes /> 

  
*/
  }

  const handleSendLevel = (upOrDown: number) => {
    setMapLevel((mapLevel) => {
      if (mapLevel == 15 && upOrDown == 1) return mapLevel;
      if (mapLevel == 0 && upOrDown == -1) return mapLevel;

      return mapLevel + upOrDown;
    });
    console.log(mapLevel);
    return mapLevel;
  };

  return (
    <ImageZoomInOut
      imageUrl={mapArray[mapLevel]}
      onSendLevel={handleSendLevel}
    />
  );
}

export default App;
