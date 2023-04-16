import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import Gallery from "./Gallery";
import { Rings } from "react-loader-spinner";


function App() {

  let url = 'https://api.discogs.com/users/Gabisback/collection/folders/0/releases?token=rrMYWfiqXCKLfmkcMuRJsNDhYWvJNhwcVbUsyGKe&per_page=100&sort=year';

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
      return data.basic_information.artists[0].name.toLowerCase().search(value.toLowerCase()) !== -1;
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

            <div className="reordeBtn">
              <button
                onClick={(e) => {
                  setFilteredData(filteredData.slice(0).reverse());
                  console.log(filteredData);
                }}
              >
                Sort
              </button>
            </div>



          </form>


        </header>

        <div className="collectionGallery">
          {
            filteredData.map((value, index) => {
              return (
                <Gallery value={value} key={index} />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default App;
