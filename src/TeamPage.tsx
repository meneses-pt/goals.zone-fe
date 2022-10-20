import {useCallback, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {PuffLoader} from "react-spinners";
import {badgePlaceholder, overrideSpinner} from "./constants";
import ErrorMessage from "./ErrorMessage";
import useTeamPage from "./hooks/useTeamPage";
import Match from "./Match";

const TeamPage = () => {
    let {slug} = useParams<string>();

    const [offset, setOffset] = useState(0);
    const {
        isLoading,
        isError,
        error,
        teamData,
        results,
        hasNextPage
    } = useTeamPage(slug as string, offset);

    const intObserver = useRef<any>();
    const lastTeamRef = useCallback<any>((team: any) => {
        if (isLoading) return;

        if (intObserver.current) intObserver.current.disconnect();

        intObserver.current = new IntersectionObserver(posts => {
            if (posts[0].isIntersecting && hasNextPage) {
                setOffset(prev => prev + 50);
            }
        });

        if (team) intObserver.current.observe(team);
    }, [isLoading, hasNextPage]);

    if (isError) return <ErrorMessage message={error.message}/>;
    const content = (
        <>
            <div className="mobile">
                <h3 className="small-header mobile">
                    <img src={teamData.logo_file ?? badgePlaceholder} alt={teamData.name}
                         className="img-fluid detail-img-thumb-large" width="50" height="50"/>&nbsp; {teamData.name}
                    <br/>
                </h3>
            </div>
            <div className="desktop">
                <h3 className="small-header">
                    <span className="no-wrap">
                        <img src={teamData.logo_file ?? badgePlaceholder} alt={teamData.name}
                             className="img-fluid detail-img-thumb-large" width="50" height="50"/>&nbsp;
                        <b>{teamData.name} </b>
                    </span>
                </h3>
            </div>
            {
                results.map((match, i) => {
                    if (results.length === i + 10) { // 10 records before the end
                        return <Match ref={lastTeamRef} key={match.id} match={match} showDate={true} withYear={true}/>;
                    }
                    return <Match key={match.id} match={match} showDate={true} withYear={true}/>;
                })
            }
        </>
    );

    return (
        <>
            <div className="container-fluid">
                <div className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content bottom-margin top-padding">
                    <div className="container">
                        <ul className="list-group infinite-container fade-in">
                            {content}
                        </ul>
                        {isLoading && <PuffLoader cssOverride={overrideSpinner} color="#00bc8c"/>}
                    </div>
                </div>
            </div>
        </>
    );
};
export default TeamPage;