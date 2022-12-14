import React, {forwardRef} from "react";
import {badgePlaceholder} from "./constants";
import "./Match.css";
import {
    convertToDateStr,
    convertToLocalDayLongStr,
    convertToLocalDayShortStr,
    convertToLocalHourStr
} from "./utils/utils";

const Match = forwardRef<any, any>(({match, showDate, withYear = false}, ref) => {
    const matchBody = (
        <>
            {
                match.showDateSeparator &&
                <div className="date-separator">
                    <div className="mobile">
                        <h2 className="small-header mobile">{convertToLocalDayShortStr(match.datetime)}</h2>
                    </div>
                    <div className="desktop">
                        <h2 className="small-header">{convertToLocalDayLongStr(match.datetime)}</h2>
                    </div>
                </div>
            }
            <div className="mobile">
                <a className="list-group-item list-group-item-action list-group-flex" href={`/${match.slug}`}>
                    <div className="list-hour-mobile">
                        {showDate && <>
                            <span className="no-wrap">{convertToDateStr(match.datetime, withYear)}</span><br/>
                        </>}
                        <span className={`${showDate ? "small-text light-text" : ""}`}>
                            {convertToLocalHourStr(match.datetime)}
                        </span>
                    </div>
                    <div className="list-match-result">
                        <img
                            src={match.home_team.logo_file ?? badgePlaceholder}
                            alt={match.home_team.name}
                            className="img-fluid detail-img-thumb"
                            width="30"
                            height="30"
                        />
                        &nbsp;
                        <span className="list-score">{match.home_team_score ?? "-"}</span>
                        <b>{match.home_team.name} </b>
                        <br/>
                        <img
                            src={match.away_team.logo_file ?? badgePlaceholder}
                            alt={match.away_team.name}
                            className="img-fluid detail-img-thumb"
                            width="30"
                            height="30"
                        />
                        &nbsp;
                        <span className="list-score">{match.away_team_score ?? "-"}</span>
                        <b>{match.away_team.name} </b>
                        <br/>
                    </div>
                </a>
            </div>
            <div className="desktop">
                <a className="list-group-item list-group-item-action" href={`/${match.slug}`}>
                    <div className={`list-hour-desktop ${showDate ? "show-date" : ""}`}>
                        {showDate && <>
                            <span className="no-wrap">{convertToDateStr(match.datetime, withYear)}</span><br/>
                        </>}
                        <span className={`${showDate ? "small-text light-text" : ""}`}>
                            {convertToLocalHourStr(match.datetime)}
                        </span>
                    </div>
                    <div className="list-match-result">
                        <img
                            src={match.home_team.logo_file ?? badgePlaceholder}
                            alt={match.home_team.name}
                            className="img-fluid list-img-thumb"
                            width="30"
                            height="30"
                        />
                        &nbsp;
                        <b> {match.home_team.name} </b>
                        <span className="list-score-desktop">{match.home_team_score ?? "-"}</span>
                        :
                        <span className="list-score-desktop">{match.away_team_score ?? "-"}</span>
                        <b> {match.away_team.name} </b>
                        &nbsp;
                        <img
                            src={match.away_team.logo_file ?? badgePlaceholder}
                            alt={match.away_team.name}
                            className="img-fluid list-img-thumb"
                            width="30"
                            height="30"
                        />
                    </div>
                </a>
            </div>
        </>
    );

    return ref ?
        <div className="infinite-item" ref={ref}>{matchBody}</div> :
        <div className="infinite-item">{matchBody}</div>;
});

export default Match;