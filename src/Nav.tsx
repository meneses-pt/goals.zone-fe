import {useState} from "react";
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