import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { getAlbumId } from "./spotifyAPI";
import { Oval } from "react-loader-spinner";
import { AlbumDetailsHeader } from "./AlbumDetails_Header";

export const AlbumDetails = () => {
  const { artist, title, master_id } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  console.log("album " + title);

  const [details, setDetails] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const [albumSpotifyID, setAlbumSpotifyID] = useState("");

  /* console.log(getAlbumId(title)); */

  useEffect(() => {
    // Convert promise to array :
    getAlbumId(title + " " + artist).then((albumId) => {
      setAlbumSpotifyID(albumId);
    });
  }, []);
  /*   console.log("id " + albumSpotifyID); */
  const getAlbumDetails = async () => {
    let endpoints = [`https://api.discogs.com/masters/${master_id}`];

    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      ([{ data: albumDetails }]) => {
        setDetails(albumDetails);
        setNotes(albumDetails.notes);
        setTimeout(() => {
          setIsLoaded(true);
        }, 1500);
        console.log(albumDetails.tracklist);
      }
    );
  };

  useEffect(() => {
    getAlbumDetails();
  }, []);
  // console.log(index);
  console.log(details);

  /* let description = notes.replace(/\s*\[(.*?)\]/g, "");
  console.log(description); */

  return (
    <div className="albumDetails" style={{ overflow: "scroll" }}>
      {/* <h1>{details.title}</h1>
      <Link to={`/`}>
        <div
          style={{
            cursor: "pointer",
            color: "tomato",
            textAlign: "end",
            margin: "15px 50px",
          }}
        >
          {" "}
          X
        </div>
      </Link> */}
      <AlbumDetailsHeader details={details} />
      {isLoaded ? (
        <div style={{ maxWidth: "600px", margin: "auto" }}>
          <iframe
            title="spotifyIframe"
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
      ) : (
        <div>
          <div className="redSpinner">
            <Oval
              height={40}
              width={40}
              color="#b10303"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="tomato"
              strokeWidth={1}
              strokeWidthSecondary={2}
            />
          </div>
        </div>
      )}
    </div>
  );
};
