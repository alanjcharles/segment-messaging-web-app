import React from "react";
import "./home.css"
import UIEditor from "../UIEditor/UIEditor";
import logo from "../../assets/splash-logo.png";

const Home = () => {
    return (
        <div className="home-container">
            <div className="navigation-header">
                <div className="nav-icon">
                    <img className="nav-logo" src={logo} alt="logo" />
                </div>
                <div className="site-title-container">
                    <h1 className="home-title-bold">Enriched</h1>
                    <h1 className="home-title-light">UI</h1>
                </div>
            </div>
            <div className="home-content"> 
                <div className="side-bar-nav"></div>
                <div className="main-content">
                    <UIEditor />
                </div>
            </div>
        </div>
    )
}

export default Home;