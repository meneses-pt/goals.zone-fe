import {useCallback, useRef, useState} from "react";
import useMatches from "./hooks/useMatches";
import Match from "./Match";
import {convertToDateStr} from "./utils/utils";
import {PuffLoader} from "react-spinners";
import ErrorMessage from "./ErrorMessage";
import WeekSearch from "./WeekSearch";
import { overrideSpinner } from "./constants";

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
                setOffset(prev => prev + 50);
            }
        });

        if (match) intObserver.current.observe(match);
    }, [isLoading, hasNextPage]);

    if (isError) return <ErrorMessage message={error.message} />;
    let lastMatchDate: string | null = null;
    const content = results.map((match, i) => {
        let currentMatchDate = convertToDateStr(match.datetime);
        match.showDateSeparator = lastMatchDate === null || lastMatchDate !== currentMatchDate;
        lastMatchDate = currentMatchDate;
        if (results.length === i + 10) { // 10 records before the end
            return <Match ref={lastMatchRef} key={match.id} match={match}/>;
        }
        return <Match key={match.id} match={match}/>;
    });

    return (
        <>
            <div className="container-fluid">
                <div className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content bottom-margin top-padding">
                    <div className="container">
                        <div id="responsive-1" className="adplus-responsive">
                        </div>
                        <ul className="list-group infinite-container fade-in">
                            <WeekSearch />
                            {/* 1xbet START */}
                            <div className="ad-container" style={{marginTop: '10px'}}></div>
                            {/* 1xbet END */}
                            {content}
                        </ul>
                        {isLoading && <PuffLoader cssOverride={overrideSpinner} color="#00bc8c"/>}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Matches;