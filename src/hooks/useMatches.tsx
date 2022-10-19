import {useEffect, useState} from "react";
import {getMatchesPage} from "../services/goalsZone.service";

const useMatches = (offset = 0) => {
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<any>({});
    const [hasNextPage, setHasNextPage] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        setError({});

        const controller = new AbortController();
        const {signal} = controller;

        getMatchesPage(offset, {signal})
            .then(data => {
                setResults(prev => [...prev, ...data.results]);
                setHasNextPage(Boolean(data.results.length));
                setIsLoading(false);
            })
            .catch(e => {
                setIsLoading(false);
                if (signal.aborted) return;
                setIsError(true);
                setError({message: e.message});
            });

        return () => controller.abort();
    }, [offset]);

    return {isLoading, isError, error, results, hasNextPage};
};

export default useMatches;