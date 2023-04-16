import React from "react";

const Header = ({ setFilteredData, handleSearch, filteredData }) => {
  return (
    <header>
      <h1>Vinyl Collection</h1>
      <div>
        <label>Search:</label>
        <input type="text" onChange={(event) => handleSearch(event)} />
      </div>

      <button
        onClick={(e) => {
          setFilteredData(filteredData.slice(0).reverse());
          console.log(filteredData);
        }}
      >
        Change order
      </button>
    </header>
  );
};

export default Header;
