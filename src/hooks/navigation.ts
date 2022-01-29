import React         from "react";
import {useLocation} from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
export const useNavigationQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => {
        if(!search){
            return null;
        }
        const params = new URLSearchParams(search)
        const query: Record<string, string[]> = {}
        for (const key of params.keys()){
            query[key] = params.getAll(key);
        }
        return query
    }, [search]);
}