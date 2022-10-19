import {useCallback, useRef, useState} from "react";
import useMatches from "./hooks/useMatches";
import Match from "./Match";

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
    const content = results.map((match, i) => {
        if (results.length === i + 1) {
            return <Match ref={lastMatchRef} key={match.id} match={match}/>;
        }
        return <Match key={match.id} match={match}/>;
    });

    return (
        <>
            <div className="container-fluid">
                <div className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content bottom-margin">
                    <div className="container">
                        <h1 id="top">&infin; Infinite Query &amp; Scroll<br/>&infin;
                            Ex. 1 - React only</h1>
                        <ul className="list-group infinite-container">
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