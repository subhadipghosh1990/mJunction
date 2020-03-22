import React, {useState,useEffect} from 'react';

import {Link} from "react-router-dom";


const Splash = () => {

    const[first,setFirst] = useState("btn enterBtn mt-5 fade");

    const [splashClass, setSplash] = useState("backGroundImg");

    useEffect(()=>{


        setTimeout(()=>{
            setFirst("btn enterBtn");
            setSplash("backGroundImg blurSplash")
        },1500)

        

    },[first])

    return(
        <div className="splashHolder d-flex justify-content-center align-items-center">
            <img className={splashClass} src={require('../../images/splash.jpg')} alt="#"/>
            {/* <button>Enter</button> */}
            <Link className={first} to="/Landing">Enter</Link>
        </div>
    )
}


export default Splash;