import React, { useState, useEffect } from "react";

import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import './App.css';
import logo from "./default-vinyl-612x612.png"

import Gallery from "./Gallery";
import { AlbumDetails } from "./AlbumDetails";
import { Rings } from "react-loader-spinner";

const discogs_token = process.env.REACT_APP_DISCOGS_TOKEN;

export function App() {



  const [user, setUser] = useState('gabisback');
  const [userCollection, setUserCollection] = useState([]);
  const [filteredData, setFilteredData] = useState(userCollection);

  const [isLoaded, setIsLoaded] = useState(false);

  let url = `https://api.discogs.com/users/${user}/collection/folders/0/releases?token=${discogs_token}&per_page=100&sort=year&language=fr-EU`;


  const getCollection = () => {
    axios(url)
      .then(response => {
        console.log(response.data.releases);


        setUserCollection(response.data.releases);
        setFilteredData(response.data.releases);

        setTimeout(() => {
          setIsLoaded(true);
        }, 1000);

      })
      .catch(error => {
        console.log('Error : ' + error);
      })
  }
  useEffect(() => {
    getCollection()
  }, []);


  const onChangeSetUserValue = (event) => {
    const userName = event.target.value;
    setUser(userName)
  };
  const onSubmitSelectUser = (e) => {
    e.preventDefault()
    setIsLoaded(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
    getCollection()
  }


  const handleSearch = (event) => {

    let value = event.target.value.toLowerCase();
    let result = [];

    result = userCollection.filter((data) => {
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


        <div className="Header">
          <div className="logo">
            <Link to={'/'}>
              <img src={logo} />
            </Link>
          </div>
          <div>
            <h1>Vinyl Collection</h1>
          </div>
          <div className="closeBtn">

          </div>


        </div>
        <form onSubmit={onSubmitSelectUser}>
          <input type="text" onChange={onChangeSetUserValue} />
        </form>
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
                e.preventDefault();
                setFilteredData(filteredData.slice(0).reverse());
                console.log(filteredData);
              }}
            >
              Sort
            </button>
          </div>
        </form>




        {/* <Gallery handleSearch={filteredData} /> */}

        <Routes>

          <Route path="/" element={<Gallery handleSearch={filteredData} />} />
          <Route path="/:artist/:title/:master_id" element={<AlbumDetails handleSearch={filteredData} />} />

        </Routes>
      </div>
    )
  }
}

export default App;
