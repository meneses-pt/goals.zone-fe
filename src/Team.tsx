import React, {forwardRef} from "react";
import {badgePlaceholder} from "./constants";

const Team = forwardRef<any, any>(({team}, ref) => {
    const teamBody = (
        <>
            <a className="list-group-item list-group-item-action list-group-flex" href={`/teams/${team.slug}`}>
                <div className="list-match-result">
                    <img src={team.logo_file ?? badgePlaceholder} alt={team.name}
                         className="img-fluid detail-img-thumb" width="30" height="30"/>&nbsp;
                    <b>{team.name} </b>
                </div>
            </a>
        </>
    );

    return ref ?
        <div className="infinite-item" ref={ref}>{teamBody}</div> :
        <div className="infinite-item">{teamBody}</div>;
});

export default Team;