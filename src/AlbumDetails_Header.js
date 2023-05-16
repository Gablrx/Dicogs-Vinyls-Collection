import { Link } from "react-router-dom"
import { AiOutlineClose } from 'react-icons/ai'
import { IconContext } from "react-icons";
import logo from "./default-vinyl-612x612.png"


export const AlbumDetailsHeader = ({ details }) => {
    return (


        <div className="Header">
            <div className="logo">
                <Link to={`/`}>
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div>
                <h1>{details.title}</h1>
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