import {useEffect, useState} from "react";
import {getMatchesList} from "../services/goalsZone.service";

const useMatches = (offset = 0) => {
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

        getMatchesList(offset, {signal})
            .then(data => {
                setResults(prev => [...prev, ...data.results]);
                setHasNextPage(Boolean(data.results.length));
                setIsLoading(false);
            })
            .catch(e => {
                if (signal.aborted) return;
                setIsLoading(false);
                setIsError(true);
                setError({message: e.message});
            });

        return () => controller.abort();
    }, [offset]);

    return {isLoading, isError, error, results, hasNextPage};
};

export default useMatches;