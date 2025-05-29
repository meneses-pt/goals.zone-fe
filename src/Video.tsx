import React from "react";
import Mirror from "./Mirror";
import {Accordion} from "react-bootstrap";
import "./Video.css";

const Video = ({video}: any) => {
    const handleHeaderClick = (event: React.MouseEvent) => {
        if (video.mirrors.length === 1) {
            event.preventDefault();
            window.open(video.mirrors[0].url, "_blank");
        }
    };

    return (
        <>
            <Accordion.Item eventKey={`${video.index}`} className="video">
                <Accordion.Header
                    data-permalink={video.simple_permalink}
                    onClick={handleHeaderClick}
                >
                    <div id={`video${video.index}`} className="list-group-item no-padding list-group-item-action">
                        <span className="btn btn-link list-group-item-left-link">
                            {video.title}
                        </span>
                        <a href={video.reddit_link} className="list-group-small-link"
                           onClick={evt => evt.stopPropagation()}>
                            <img alt="reddit" src="/images/reddit_logo.png" className="list-group-img"/>
                        </a>
                    </div>
                </Accordion.Header>
                {video.mirrors.length > 1 && (
                    <Accordion.Body>
                        <ul className="list-group mirror-list">
                            {video.mirrors.map((m: any, i: number) => {
                                return <Mirror key={`mirror${video.index}-${i}`} mirror={m}/>;
                            })}
                        </ul>
                    </Accordion.Body>
                )}
            </Accordion.Item>
        </>
    );
};

export default Video;