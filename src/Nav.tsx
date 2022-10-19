import React from "react";

function Nav() {
    return <>
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href={"#top"}>
                <img src="/images/original_icon_w200.png" width="40" height="28" className="d-inline-block align-top"
                     alt=""/>
                &nbsp;goals.zone
            </a>
            <div className="form-inline">
                <button id="moreButton" className="btn btn-success small-btn" data-toggle="modal"
                        data-target="#aboutModal"
                        title="Info">
                    <img src="/images/circle-info.svg" alt="info" height="15"/>
                </button>
            </div>
        </nav>
    </>;
}

export default Nav;