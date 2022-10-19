import {useState} from "react";
import "./Nav.css";
import InfoModal from "./InfoModal";

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