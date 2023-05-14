import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAlbumId } from "./spotifyAPI";
import { Spotify } from "react-spotify-embed";

export const AlbumDetails = () => {
  const { title, master_id } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-2);
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
          margin: "15px 50px",
        }}
        onClick={goBack}
      >
        {" "}
        X
      </div>

      {/*  <Spotify
        link={`https://open.spotify.com/album/${albumSpotifyID}?si=mTiITmlHQpaGkoivGTv8Jw`}
      /> */}
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <iframe
          style={{ borderRadius: 12 }}
          src={`https://open.spotify.com/embed/album/${albumSpotifyID}?utm_source=generator`}
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          width="100%"
          height={600}
          frameBorder={0}
        />
      </div>
      {/*  <ul style={{ listStyle: "none", padding: "0px" }}>
        {tracklist.map((track, index) => {
          return (
            <li key={index} style={{ margin: "20px" }}>
              <span style={{ color: "grey" }}>{track.position} / </span>
              {track.title}
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};
