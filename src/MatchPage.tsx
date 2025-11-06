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

const MatchPage = () => {
    const [match, setMatch] = useState<any>(null);
    const [matchLoaded, setMatchLoaded] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [openAllClickCount, setOpenAllClickCount] = useState(0); // 0 = not clicked, 1 = opened once, 2 = warning shown

    // Collect first mirror URLs (dedupe to avoid duplicate tabs)
    const getFirstMirrorUrls = (): string[] => {
        if (!match || !match.videos) return [];
        const setUrls = new Set<string>();
        match.videos.forEach((v: any) => {
            const url = v?.mirrors?.[0]?.url;
            if (url) setUrls.add(url);
        });
        return Array.from(setUrls);
    };

    const openAllFirstMirrors = () => {
        const urls = getFirstMirrorUrls();
        if (urls.length === 0) return;
        if (openAllClickCount === 0 && urls.length > 6) {
            const proceed = window.confirm(`Open ${urls.length} unique video tabs?`);
            if (!proceed) return;
        }
        urls.forEach(url => {
            try { window.open(url, '_blank', 'noopener,noreferrer'); } catch (e) { console.warn('Failed to open', url, e); }
        });
        if (openAllClickCount === 0) {
            setOpenAllClickCount(1);
        } else if (openAllClickCount === 1) {
            setOpenAllClickCount(2); // second click triggers warning display
        }
        // Further clicks (>=2) keep warning; still open tabs each time
    };

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
                if(res.data.videos === null) {
                    res.data.videos = []
                }
                res.data.videos.forEach((v: any, i: number) => {
                    if (v.simple_permalink === permalinkParam) {
                        currentElementId = i;
                        setActiveId(`${i}`);
                    }
                });
                setMatch(res.data);
                setMatchLoaded(true);
                //console.log(currentElementId);
                if (currentElementId >= 0) {
                    setTimeout(() => {
                        let element = document.getElementById(`video${currentElementId}`);
                        if (element) {
                            let rect = element.getBoundingClientRect();
                            window.scrollTo({
                                top: rect.y - 100,
                                left: 0,
                                behavior: "smooth"
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
                            <div id="responsive-1" className="adplus-responsive" />
                            {match && match.videos && match.videos.length > 0 ? (
                                <>
                                    <div className="mb-2">
                                        <button
                                            type="button"
                                            className="open-all-btn"
                                            onClick={openAllFirstMirrors}
                                        >
                                            Open all videos in tabs
                                        </button>
                                        {openAllClickCount >= 2 && (
                                            <div className="open-all-warning">If videos did not open, your browser's pop-up blocker likely prevented them. Enable pop-ups for this site and try refreshing.</div>
                                        )}
                                    </div>
                                    <Accordion defaultActiveKey={activeId} flush className="fade-in">
                                        {match.videos.map((v: any, i: number) => {
                                            v.index = i;
                                            return <Video id={`video${i}`} key={`video${i}`} video={v}/>;
                                        })}
                                    </Accordion>
                                </>
                            ) : (
                                noVideos
                            )}
                        </>
                    ) : (
                        error !== null ? <ErrorMessage message={error} /> : <PuffLoader cssOverride={overrideSpinner} color="#00bc8c" />
                    )}
                </div>
            </div>
        </div>
    </>;

};

export default MatchPage;
