import React, {useEffect, useState} from "react";
import "./Match.css";
import {useLocation, useParams} from "react-router-dom";
import {getMatchDetail} from "./services/goalsZone.service";
import {convertToDateTimeStr} from "./utils/utils";
import Video from "./Video";
import {Accordion} from "react-bootstrap";

const MatchPage = (props: any) => {
    const [match, setMatch] = useState<any>(null);
    const [matchLoaded, setMatchLoaded] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);

    let {slug} = useParams();
    const search = useLocation().search;
    const permalinkParam = new URLSearchParams(search).get("v");


    useEffect(() => {
        const fetchMatch = async () => {
            try {
                let response = await getMatchDetail(`${slug}`);
                return {success: true, data: response};
            } catch (error) {
                console.log(error);
                return {success: false};
            }
        };

        (async () => {
            setMatchLoaded(false);
            let res = await fetchMatch();
            if (res.success) {
                res.data.videos.sort((a: any, b: any) => (a.minute > b.minute) ? 1 : -1);
                res.data.videos.forEach((v: any, i: number) => {
                    if (v.simple_permalink === permalinkParam) {
                        setActiveId(`${i}`);
                    }
                });
                setMatch(res.data);
                setMatchLoaded(true);
            }
        })();
    }, [slug, activeId, permalinkParam]);

    const header = (match: any) => (
        <>
            <div className="mobile">
                <h3 className="small-header mobile">
                    <img src={match.home_team.logo_file ?? "/react/images/badge_placeholder.png"}
                         alt={match.home_team.name}
                         className="img-fluid detail-img-thumb" width="30" height="30"/>
                    &nbsp;<span
                    className="detail-score">{match.home_team_score ?? "-"}</span> {match.home_team.name}
                    <br className="br-spacing"/>
                    <img src={match.away_team.logo_file ?? "/react/images/badge_placeholder.png"}
                         alt={match.away_team.name}
                         className="img-fluid detail-img-thumb" width="30" height="30"/>
                    &nbsp;<span
                    className="detail-score">{match.away_team_score ?? "-"}</span> {match.away_team.name}
                    <br/>
                </h3>
                <p className="mobile-spacing">&nbsp;{convertToDateTimeStr(match.datetime)}</p>
            </div>
            <div className="desktop">
                <h3 className="small-header">
                    <span className={" <!-- style=\"white-space: nowrap\"-->"}>
                        <img src={match.home_team.logo_file ?? "/react/images/badge_placeholder.png"}
                             alt={match.home_team.name}
                             className="img-fluid detail-img-thumb" width="30" height="30"/>
                        &nbsp;
                        <span className="team-a"><b>{match.home_team.name} </b></span>
                        <span className="detail-score-desktop">{match.home_team_score ?? "-"}</span>:<span
                        className="detail-score-desktop">{match.away_team_score ?? "-"}</span>
                        <span className="team-a"><b> {match.away_team.name}</b></span>
                        &nbsp;
                        <img src={match.away_team.logo_file ?? "/react/images/badge_placeholder.png"}
                             alt={match.away_team.name}
                             className="img-fluid detail-img-thumb" width="30" height="30"/>
                    </span>
                    <p className="desktop-spacing">&nbsp;{convertToDateTimeStr(match.datetime)}</p>
                </h3>
            </div>
        </>
    );

    const noVideos = (
        <p>No videos found for this match.</p>
    );

    const noMatch = (
        <p>No match found.</p>
    );

    return <>
        <div className="container-fluid">
            <div className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content bottom-margin">
                <div className="container">
                    {matchLoaded ? (
                            <>
                                {header(match)}
                                {match && match.videos && match.videos.length > 0 ?
                                    <>
                                        <Accordion defaultActiveKey={activeId} flush className="fade-in">
                                            {match.videos.map((v: any, i: number) => {
                                                v.index = i;
                                                return <Video key={`video${i}`} video={v}/>;
                                            })}
                                        </Accordion>
                                    </>
                                    :
                                    noVideos}
                            </>
                        )
                        :
                        noMatch
                    }
                </div>
            </div>
        </div>
    </>;

};

export default MatchPage;