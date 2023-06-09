import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
const Gallery = ({ handleSearch }) => {
  return (
    <div className="collectionGallery">
      {handleSearch.map((value, index) => {
        return (
          <div className="recordContainer" key={index}>
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
            <div
              className="record"
              style={{
                backgroundImage: `url(${value.basic_information.cover_image})`,
              }}
            ></div>
            <Link
              to={`/${value.basic_information.artists[0].name}/${value.basic_information.title}/${value.basic_information.master_id}`}
            >
              <div className="recordOverlay">
                <h3>{value.basic_information.artists[0].name}</h3>
                <h2>{value.basic_information.title}</h2>
                <h5>{value.basic_information.year}</h5>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
