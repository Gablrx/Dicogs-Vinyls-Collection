import React from "react";

const Gallery = ({ value }) => {
  return (
    <a key={value.id} className="recordContainer" href="#">
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
    </a>
  );
};

export default Gallery;
