import React from "react";
import {Accordion, Modal} from "react-bootstrap";
import "./InfoModal.css";

const InfoModal = (props: any) => {
    function onModalClose() {
        props.onCloseModal();
    }

    return <>
        <Modal show={props.isModalOpened} onHide={onModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>About</Accordion.Header>
                        <Accordion.Body>
                            <p>
                                goals.zone automatically fetches latest posts from <a
                                href="https://www.reddit.com/r/soccer">/r/soccer</a> subreddit
                                that contains videos of goals and that correspond to a football
                                match.
                            </p>
                            <p>
                                This is a series of Open Source projects, and the code is available on
                                <ul>
                                    <li>
                                        <a href="https://github.com/meneses-pt/goals.zone">goals.zone</a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/meneses-pt/goals.zone-fe">goals.zone-fe</a>
                                    </li>
                                </ul>
                            </p>
                            <p>
                                You can reach me at <a href="mailto:andre@meneses.pt">andre@meneses.pt</a>
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Disclaimer</Accordion.Header>
                        <Accordion.Body>
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
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Modal.Body>
        </Modal>
    </>;
};

export default InfoModal;