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
                <Accordion defaultActiveKey="0" className="info-accordion">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>About</Accordion.Header>
                        <Accordion.Body>
                            <p>
                                goals.zone automatically fetches latest posts
                                from <a href="https://www.reddit.com/r/soccer">/r/soccer</a> subreddit that contains
                                videos of goals and that correspond to a football match.
                            </p>
                            <p>
                                The code React project is available at <a href="https://github.com/meneses-pt/goals.zone-fe">goals.zone-fe</a>
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
                                This website is not responsible for, and does not own any of the content of the links
                                that are here published.
                            </p>
                            <p>
                                goals.zone was built with an academic purpose and with no intention of profiting over
                                it.
                            </p>
                            <p>
                                This is an open source project and the ads exist with the sole purpose of helping the
                                owner with the server and maintenance costs.
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Privacy Policy</Accordion.Header>
                        <Accordion.Body>
                            <p>
                                You can visit our Privacy Policy <a
                                href="https://goals.zone/privacy_policy.html">here</a>
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Terms & Conditions</Accordion.Header>
                        <Accordion.Body>
                            <p>
                                You can visit our Terms & Conditions <a
                                href="https://goals.zone/terms_conditions.html">here</a>
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Modal.Body>
        </Modal>
    </>;
};

export default InfoModal;