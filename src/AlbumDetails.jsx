import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const AlbumDetails = () => {
  const { master_id } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [details, setDetails] = useState({});
  const [tracklist, setTracklist] = useState([]);

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
  /*  console.log(index); */

  console.log(details);

  return (
    <div className="albumDetails" style={{ overflow: "scroll" }}>
      <h1>{details.title}</h1>
      <div style={{ cursor: "pointer", color: "tomato" }} onClick={goBack}>
        {" "}
        X
      </div>

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
