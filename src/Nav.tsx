import {useState} from "react";
import InfoModal from "./InfoModal";
import {useTheme} from "./ThemeContext";
import "./Nav.css";

const Nav = () => {
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
    const {theme, toggleTheme} = useTheme();

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
            <div className="d-flex align-items-center gap-2">
                <a id="teamsButton" className="btn btn-success small-btn" data-toggle="tooltip"
                   title="Teams" href="/teams">
                    <img src="/images/shield.svg" alt="teams" height="15"/>
                </a>
                <button id="moreButton" className="btn btn-success small-btn" title="Info"
                        onClick={openInfoModalFromParent}>
                    <img src="/images/circle-info.svg" alt="info" height="15"/>
                </button>
                <button
                    className="btn small-btn theme-toggle"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                    {theme === "dark" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5"/>
                            <line x1="12" y1="1" x2="12" y2="3"/>
                            <line x1="12" y1="21" x2="12" y2="23"/>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                            <line x1="1" y1="12" x2="3" y2="12"/>
                            <line x1="21" y1="12" x2="23" y2="12"/>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                    )}
                </button>
            </div>
        </nav>
        <InfoModal isModalOpened={infoModalIsOpen} onCloseModal={handleCloseInfoModal}/>
    </>;
};

export default Nav;
