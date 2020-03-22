import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <nav>
            <ul className="p-0 m-0">
                <li><Link to="/" className="text-center d-block"><i className="fa fa-home" aria-hidden="true"></i></Link></li>
                <li><Link to="/Landing" className="text-center d-block"><i className="fa fa-headphones" aria-hidden="true"></i></Link></li>
                <li><Link to="/Uploader" className="text-center d-block"><i className="fa fa-upload" aria-hidden="true"></i></Link></li>
            </ul>
        </nav>
    )
}

export default Header;