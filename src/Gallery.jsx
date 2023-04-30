import React from "react";

const Gallery = ({ value }) => {
  return (
    <div className="recordContainer">
      <div
        className="record"
        style={{
          backgroundImage: `url(${value.basic_information.cover_image})`,
        }}
      ></div>
      <div className="recordOverlay">
        <h3>{value.basic_information.artists[0].name}</h3>
        <h2>{value.basic_information.title}</h2>
        <h5>{value.basic_information.year}</h5>
      </div>
    </div>
  );
};

export default Gallery;
