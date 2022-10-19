import React from "react";

const Mirror = ({mirror}: any) => {
    return (<>
        <div className="list-group-item no-padding list-group-item-action mirror-item">
            <a className="list-group-item-left-link mirror-link" target="_blank"
               rel="noopener noreferrer" href={mirror.url}>
                {mirror.title ?? "Mirror"}
            </a>
        </div>
    </>);
};

export default Mirror;