import {useCallback, useRef, useState} from "react";
import useMatches from "./hooks/useMatches";
import Match from "./Match";
import {convertToDateStr} from "./utils/utils";

const Matches = () => {
    const [offset, setOffset] = useState(0);
    const {
        isLoading,
        isError,
        error,
        results,
        hasNextPage
    } = useMatches(offset);

    const intObserver = useRef<any>();
    const lastMatchRef = useCallback<any>((match: any) => {
        if (isLoading) return;

        if (intObserver.current) intObserver.current.disconnect();

        intObserver.current = new IntersectionObserver(posts => {
            if (posts[0].isIntersecting && hasNextPage) {
                console.log("We are near the last post!");
                setOffset(prev => prev + 50);
            }
        });

        if (match) intObserver.current.observe(match);
    }, [isLoading, hasNextPage]);

    if (isError) return <p className="center">Error {error.message}</p>;
    let lastMatchDate: string | null = null;
    const content = results.map((match, i) => {
        let currentMatchDate = convertToDateStr(match.datetime);
        match.showDate = lastMatchDate === null || lastMatchDate !== currentMatchDate;
        lastMatchDate = currentMatchDate;
        if (results.length === i + 10) { // 10 records before the end
            return <Match ref={lastMatchRef} key={match.id} match={match}/>;
        }
        return <Match key={match.id} match={match}/>;
    });

    return (
        <>
            <div className="container-fluid">
                <div className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content bottom-margin">
                    <div className="container">
                        <ul className="list-group infinite-container fade-in">
                            {content}
                        </ul>
                        {isLoading && <p className="center">Loading More Matches...</p>}
                        <p className="center"><a href={"#top"}>Back to top</a></p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Matches;