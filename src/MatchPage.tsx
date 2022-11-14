import React, {useEffect, useState} from "react";
import {Accordion} from "react-bootstrap";
import {useLocation, useParams} from "react-router-dom";
import {PuffLoader} from "react-spinners";
import {badgePlaceholder, overrideSpinner} from "./constants";
import ErrorMessage from "./ErrorMessage";
import "./Match.css";
import {getMatchDetail} from "./services/goalsZone.service";
import {convertToDateTimeStr} from "./utils/utils";
import Video from "./Video";

const MatchPage = (props: any) => {
    const [match, setMatch] = useState<any>(null);
    const [matchLoaded, setMatchLoaded] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    let {slug} = useParams();
    const search = useLocation().search;
    const permalinkParam = new URLSearchParams(search).get("v");

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                let response = await getMatchDetail(slug as string);
                return {success: true, data: response};
            } catch (error: any) {
                return {success: false, data: error.message};
            }
        };

        (async () => {
            setMatchLoaded(false);
            let res = await fetchMatch();
            if (res.success) {
                document.title = `goals.zone • ${res.data.home_team.name} - ${res.data.away_team.name} `;
                let currentElementId = -1;
                res.data.videos.forEach((v: any, i: number) => {
                    if (v.simple_permalink === permalinkParam) {
                        currentElementId = i;
                        setActiveId(`${i}`);
                    }
                });
                setMatch(res.data);
                setMatchLoaded(true);
                console.log(currentElementId);
                if (currentElementId >= 0) {
                    setTimeout(() => {
                        let element = document.getElementById(`video${currentElementId}`);
                        if (element) {
                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                                inline: "nearest",
                            });
                        }
                    }, 500);
                }
            } else {
                setError(res.data);
            }
        })();
    }, [slug, activeId, permalinkParam]);

    const header = (match: any) => (
        <>
            <div className="mobile">
                <h3 className="small-header mobile">
                    <a className="team-link" href={`/teams/${match.home_team.slug}`}>
                        <img src={match.home_team.logo_file ?? badgePlaceholder}
                             alt={match.home_team.name}
                             className="img-fluid detail-img-thumb" width="30" height="30"/>
                        &nbsp;
                        <span className="detail-score">{match.home_team_score ?? "-"}</span> {match.home_team.name}
                    </a>
                    <br className="br-spacing"/>
                    <a className="team-link" href={`/teams/${match.away_team.slug}`}>
                        <img src={match.away_team.logo_file ?? badgePlaceholder}
                             alt={match.away_team.name}
                             className="img-fluid detail-img-thumb" width="30" height="30"/>
                        &nbsp;
                        <span className="detail-score">{match.away_team_score ?? "-"}</span> {match.away_team.name}
                    </a>
                    <br/>
                </h3>
                <p className="mobile-spacing">&nbsp;{convertToDateTimeStr(match.datetime)}</p>
            </div>
            <div className="desktop">
                <h3 className="small-header">
                    <span className="no-wrap">
                        <a className="team-link" href={`/teams/${match.home_team.slug}`}>
                            <img src={match.home_team.logo_file ?? badgePlaceholder}
                                 alt={match.home_team.name}
                                 className="img-fluid detail-img-thumb" width="30" height="30"/>
                            &nbsp;
                            <span><b>{match.home_team.name} </b></span>
                        </a>
                        <span className="detail-score-desktop">{match.home_team_score ?? "-"}</span>:<span
                        className="detail-score-desktop">{match.away_team_score ?? "-"}</span>
                        <a className="team-link" href={`/teams/${match.away_team.slug}`}>
                            <span><b> {match.away_team.name}</b></span>
                            &nbsp;
                            <img src={match.away_team.logo_file ?? badgePlaceholder}
                                 alt={match.away_team.name}
                                 className="img-fluid detail-img-thumb" width="30" height="30"/>
                        </a>
                    </span>
                    <p className="desktop-spacing">&nbsp;{convertToDateTimeStr(match.datetime)}</p>
                </h3>
            </div>
        </>
    );

    const noVideos = (
        <p>No videos found for this match.</p>
    );

    return <>
        <div className="container-fluid">
            <div className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content bottom-margin top-padding">
                <div className="container">
                    {matchLoaded ? (
                            <>
                                {header(match)}
                                {match && match.videos && match.videos.length > 0 ?
                                    <>
                                        <Accordion defaultActiveKey={activeId} flush className="fade-in">
                                            {match.videos.map((v: any, i: number) => {
                                                v.index = i;
                                                return <Video id={`video${i}`}
                                                              key={`video${i}`}
                                                              video={v}/>;
                                            })}
                                        </Accordion>
                                    </>
                                    :
                                    noVideos}
                            </>
                        )
                        :
                        (error !== null ?
                                <ErrorMessage message={error}/> :
                                <PuffLoader cssOverride={overrideSpinner} color="#00bc8c"/>
                        )
                    }
                </div>
            </div>
        </div>
    </>;

};

export default MatchPage;