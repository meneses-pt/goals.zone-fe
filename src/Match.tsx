import React from "react";

const Match = React.forwardRef<any, any>(({match}, ref) => {
    const matchBody = (
        <>
            <div className="desktop">
                <a className="list-group-item list-group-item-action" href={"#top"}>
                    <div className="list-hour-desktop">
                        <span>{match.datetime}</span>
                    </div>
                    <div className="list-match-result">
                        <img
                            src={match.home_team.logo_file}
                            alt={match.home_team.name}
                            className="img-fluid list-img-thumb"
                            width="30"
                            height="30"
                        />
                        <b>{match.home_team.name} </b>
                        <span className="list-score-desktop">{match.home_team_score}</span>
                        :
                        <span className="list-score-desktop">{match.away_team_score}</span>
                        <b> {match.away_team.name}</b>
                        <img
                            src={match.away_team.logo_file}
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