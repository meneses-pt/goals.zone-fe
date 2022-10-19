import React from "react";

function Nav() {
    return <>
        <div className="modal fade" id="aboutModal" tabIndex={-1} role="dialog"
             aria-labelledby="exampleModalCenterTitle"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Info</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div id="accordion">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link" data-toggle="collapse"
                                                data-target="#collapseOne"
                                                aria-expanded="true" aria-controls="collapseOne">
                                            About
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                                     data-parent="#accordion">
                                    <div className="card-body">
                                        <p>
                                            goals.zone automatically fetches latest posts from <a
                                            href="https://www.reddit.com/r/soccer">/r/soccer</a>
                                            subreddit that contain videos of goals and that correspond to a football
                                            match.
                                        </p>
                                        <p>
                                            This is an Open Source project, and the code is available on <a
                                            href="https://github.com/meneses-pt/goals.zone">GitHub</a>
                                        </p>
                                        <p>
                                            You can reach me at <a href="mailto:andre@meneses.pt">andre@meneses.pt</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingTwo">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link collapsed" data-toggle="collapse"
                                                data-target="#collapseTwo"
                                                aria-expanded="false" aria-controls="collapseTwo">
                                            Disclaimer
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                                     data-parent="#accordion">
                                    <div className="card-body">
                                        <p>
                                            This website is not responsible for, and does not own any of the content of
                                            the
                                            links that are here
                                            published.
                                        </p>
                                        <p>
                                            goals.zone was built with an academic purpose and with no intention of
                                            profiting
                                            over it.
                                        </p>
                                        <p>
                                            This is an open source project and the donate button exists with the sole
                                            purpose of
                                            helping the
                                            owner with the server and maintenance costs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingThree">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link collapsed" data-toggle="collapse"
                                                data-target="#collapseThree"
                                                aria-expanded="false" aria-controls="collapseThree">
                                            Cookies Preferences
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                     data-parent="#accordion">
                                    <div className="card-body">
                                        <a href={"#"} className="cky-banner-element">Change Cookie Preferences</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default Nav;