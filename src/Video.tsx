import React from "react";
import Mirror from "./Mirror";
import {Accordion} from "react-bootstrap";
import "./Video.css";

const Video = ({video}: any) => {

    return (
        <>
            <Accordion.Item eventKey={`${video.index}`}>
                <Accordion.Header data-permalink={video.simple_permalink}>
                    <div id={`video${video.index}`} className="list-group-item no-padding list-group-item-action">
                        <span className="btn btn-link list-group-item-left-link">
                            {video.title}
                        </span>
                        <a href={video.reddit_link} className="float-right list-group-small-link">
                            <img alt="reddit" src="/react/images/reddit_logo.png" className="list-group-img"/>
                        </a>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    <ul className="list-group mirror-list">
                        {video.mirrors.map((m: any, i: number) => {
                            return <Mirror key={`mirror${video.index}-${i}`} mirror={m}/>;
                        })}
                    </ul>
                </Accordion.Body>
            </Accordion.Item>
        </>
    );
};

export default Video;