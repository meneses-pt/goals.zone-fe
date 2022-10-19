import {useEffect, useState} from "react";
import {getTeamDetail} from "../services/goalsZone.service";

const useTeams = (slug: string, offset: number = 0) => {
    const [teamData, setTeamData] = useState<any>([]);
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<any>({});
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        setError({});

        const controller = new AbortController();
        const {signal} = controller;

        getTeamDetail(slug, offset, {signal})
            .then(data => {
                setTeamData(data);
                setResults(prev => [...prev, ...data.matches]);
                setHasNextPage(Boolean(data.matches.length));
                setIsLoading(false);
            })
            .catch(e => {
                if (signal.aborted) return;
                setIsLoading(false);
                setIsError(true);
                setError({message: e.message});
            });

        return () => controller.abort();
    }, [slug, offset]);

    return {isLoading, isError, error, teamData, results, hasNextPage};
};

export default useTeams;