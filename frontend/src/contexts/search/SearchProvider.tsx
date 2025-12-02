import { useState, useCallback, useMemo, type ReactNode } from "react";
import { SearchContext } from "./SearchContext";

interface SearchProviderProps {
    children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
    const [query, setQueryState] = useState("");

    const setQuery = useCallback((value: string) => {
        setQueryState(value);
    }, []);

    const clearQuery = useCallback(() => {
        setQueryState("");
    }, []);

    const value = useMemo(
        () => ({
            query,
            setQuery,
            clearQuery,
        }),
        [query, setQuery, clearQuery]
    );

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};
