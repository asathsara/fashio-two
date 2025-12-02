import { createContext } from "react";

export interface SearchContextValue {
    query: string;
    setQuery: (value: string) => void;
    clearQuery: () => void;
}

export const SearchContext = createContext<SearchContextValue | undefined>(undefined);
