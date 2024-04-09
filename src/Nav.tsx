import {useEffect, useState} from "react";
import InfoModal from "./InfoModal";
import "./Nav.css";

const Nav = () => {
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

    function openInfoModalFromParent() {
        setInfoModalIsOpen(true);
    }

    function handleCloseInfoModal() {
        setInfoModalIsOpen(false);
    }

    //Monetag START
    useEffect(() => {
        const monetagElement = document.getElementById("monetag");
        if (monetagElement !== null) {
            return;
        }
        const navElement = document.querySelector('nav');
        const script = document.createElement("script");
        script.id = "monetag"
        script.async = true;
        script.setAttribute("data-cfasync", "false");
        script.setAttribute("data-size", "300x250");
        script.setAttribute("data-id", "dl-banner-300x250");
        script.setAttribute("data-zone", "7329187");
        script.src = "//thepsimp.net/btag.min.js";
        if (navElement) {
            navElement.insertAdjacentElement('afterend', script);
        }
    }, []);
    //Monetag END

    return <>
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href={"/"}>
                <img src="/images/original_icon_w200.png" width="40" height="28"
                     className="d-inline-block align-top"
                     alt=""/>&nbsp;&nbsp;&nbsp;&nbsp;goals.zone
            </a>
            <div className="form-inline">
                <a id="teamsButton" className="btn btn-success small-btn small-margin-right" data-toggle="tooltip"
                   title="Teams" href="/teams">
                    <img src="/images/shield.svg" alt="teams" height="15"/>
                </a>
                <button id="moreButton" className="btn btn-success small-btn" title="Info"
                        onClick={openInfoModalFromParent}>
                    <img src="/images/circle-info.svg" alt="info" height="15"/>
                </button>
            </div>
        </nav>
        <InfoModal isModalOpened={infoModalIsOpen} onCloseModal={handleCloseInfoModal}/>
    </>;
};

export default Nav;