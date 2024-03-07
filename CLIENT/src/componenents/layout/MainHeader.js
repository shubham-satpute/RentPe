import React from "react";
import { SiYourtraveldottv } from "react-icons/si";

const MainHeader=()=>{
    return(
        <header className="header-banner">
            <div className="overlay">
                <div className="animated-texts overlay-content">
                    <h1>
                        Welcome to  <span className='hotel-color' id='safarnamalogo'>Rentpe <SiYourtraveldottv /></span>
                    </h1>
                    <h4>Plan your Holidays With Us...</h4>
                </div>
            </div>
        </header>
    )
}

export default MainHeader