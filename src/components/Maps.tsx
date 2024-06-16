import floor7 from "/floor-07-map.png";

const Maps = () => {
  const images = [floor7];

  return (
    <div>
      {images.map((image, i) => (
        <div key={i}>
          <img src={image} className="kaz" alt="" />
        </div>
      ))}
    </div>
  );
};

export default Maps;
