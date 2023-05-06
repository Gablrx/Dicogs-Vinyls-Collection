import React, { useState, useEffect } from "react";

import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import './App.css';

import Gallery from "./Gallery";
import { AlbumDetails } from "./AlbumDetails";
import { Rings } from "react-loader-spinner";


export function App() {

  let url = 'https://api.discogs.com/users/Gabisback/collection/folders/0/releases?token=rrMYWfiqXCKLfmkcMuRJsNDhYWvJNhwcVbUsyGKe&per_page=100&sort=year&language=fr-EU';

  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);

  const [isLoaded, setIsLoaded] = useState(false);



  useEffect(() => {
    axios(url)
      .then(response => {
        console.log(response.data.releases);


        setAllData(response.data.releases);
        setFilteredData(response.data.releases);

        setTimeout(() => {
          setIsLoaded(true);
        }, 1000);

      })
      .catch(error => {
        console.log('Error : ' + error);
      })
  }, [url]);


  const handleSearch = (event) => {

    let value = event.target.value.toLowerCase();
    let result = [];

    result = allData.filter((data) => {
      return data.basic_information.artists[0].name.toLowerCase().search(value.toLowerCase()) !== -1 ||
        data.basic_information.title.toLowerCase().search(value.toLowerCase()) !== -1;
    });
    setFilteredData(result);
  }

  if (!isLoaded) {
    return (
      <div className="loader-container">
        <div className="spinner">

          <Rings
            height="80"
            width="80"
            color="white"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />

        </div>
      </div>
    )


  }
  else {

    return (

      <div className="App" >
        <header>
          <h1>Vinyl Collection</h1>

          <form>
            <div>
              <fieldset>
                <legend>Search</legend>
                <input type="text" onChange={(event) => handleSearch(event)} />
              </fieldset>
            </div>

            <div className="reorderBtn" >
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setFilteredData(filteredData.slice(0).reverse());
                  console.log(filteredData);
                }}
              >
                Sort
              </button>
            </div>
          </form>


        </header>


        {/* <Gallery handleSearch={filteredData} /> */}

        <Routes>

          <Route path="/" element={<Gallery handleSearch={filteredData} />} />
          <Route path="/album/:master_id" element={<AlbumDetails handleSearch={filteredData} />} />

        </Routes>
      </div>
    )
  }
}

export default App;
