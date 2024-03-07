import React  from "react";
import MainHeader from "../layout/MainHeader";
import Parallax from "../common/Parallax";
import Service from "../common/Service";

const Home = () => {
    return(
        <section>
            <MainHeader/>
            <section className="container">
                <Parallax/>
                <Service/>
            </section>
        </section>
    )
}

export default Home