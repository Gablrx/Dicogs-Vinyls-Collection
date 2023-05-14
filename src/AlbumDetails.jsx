import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAlbumId } from "./spotifyAPI";
import { Spotify } from "react-spotify-embed";

export const AlbumDetails = () => {
  const { title, master_id } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  console.log("album " + title);

  const [details, setDetails] = useState({});
  const [tracklist, setTracklist] = useState([]);
  const [albumSpotifyID, setAlbumSpotifyID] = useState("");

  console.log(getAlbumId(title));

  useEffect(() => {
    // Convert promise to array :
    getAlbumId(title).then((albumId) => {
      setAlbumSpotifyID(albumId);
    });
  }, []);
  console.log("id " + albumSpotifyID);
  const getAlbumDetails = async () => {
    let endpoints = [`https://api.discogs.com/masters/${master_id}`];

    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      ([{ data: albumDetails }]) => {
        setDetails(albumDetails);
        setTracklist(albumDetails.tracklist);
        console.log(albumDetails.tracklist);
      }
    );
  };

  useEffect(() => {
    getAlbumDetails();
  }, []);
  // console.log(index);
  // console.log(details);

  return (
    <div className="albumDetails" style={{ overflow: "scroll" }}>
      <h1>{details.title}</h1>
      <div
        style={{
          cursor: "pointer",
          color: "tomato",
          textAlign: "end",
          marginRight: "40px",
        }}
        onClick={goBack}
      >
        {" "}
        X
      </div>

      <Spotify
        link={`https://open.spotify.com/album/${albumSpotifyID}?si=mTiITmlHQpaGkoivGTv8Jw`}
      />

      <ul style={{ listStyle: "none", padding: "0px" }}>
        {tracklist.map((track, index) => {
          return (
            <li key={index} style={{ margin: "20px" }}>
              <span style={{ color: "grey" }}>{track.position} / </span>
              {track.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
