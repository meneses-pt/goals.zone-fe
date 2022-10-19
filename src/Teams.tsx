import {useCallback, useRef, useState} from "react";
import {PuffLoader} from "react-spinners";
import {overrideSpinner} from "./constants";
import ErrorMessage from "./ErrorMessage";
import useTeams from "./hooks/useTeams";
import Team from "./Team";
import TeamSearch from "./TeamSearch";

const Teams = () => {
    const [offset, setOffset] = useState(0);
    const {
        isLoading,
        isError,
        error,
        results,
        hasNextPage
    } = useTeams(offset);

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
    const content = results.map((team, i) => {
        if (results.length === i + 10) { // 10 records before the end
            return <Team ref={lastTeamRef} key={team.id} team={team}/>;
        }
        return <Team key={team.id} team={team}/>;
    });

    return (
        <>
            <div className="container-fluid">
                <div className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content bottom-margin top-padding">
                    <div className="container">
                        <ul className="list-group infinite-container fade-in">
                            <h3>Teams</h3>
                            <br/>
                            <TeamSearch/>
                            <br/>
                            {content}
                        </ul>
                        {isLoading && <PuffLoader cssOverride={overrideSpinner} color="#00bc8c"/>}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Teams;