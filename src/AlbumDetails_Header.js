import { Link } from "react-router-dom"
import { AiOutlineClose } from 'react-icons/ai'
import { IconContext } from "react-icons";
export const AlbumDetailsHeader = ({ details }) => {
    return (


        <div className="AlbumDetailsHeader">
            <div>
                <h1>{details.title}</h1>
                <h3>{details.artists[0].name}</h3>
            </div>
            <Link to={`/`}>
                <IconContext.Provider value={{ color: "tomato", size: "25px", className: "global-class-name" }}>
                    <div className="closeBtn">
                        <AiOutlineClose />
                    </div>
                </IconContext.Provider>
            </Link>
        </div>

    )
}