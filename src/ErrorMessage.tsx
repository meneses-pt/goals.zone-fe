import React from "react";

const ErrorMessage = ({message}: any) => {
    return (<>
        <span className="center-text">
            <p className="big-text">&#x1F635;</p>
            <p>Something went wrong with your request</p>
            <p className="small-text">({message})</p>
        </span>
    </>);
};

export default ErrorMessage;