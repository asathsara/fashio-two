import { useContext } from "react";
import { SearchContext } from "@/contexts/search/SearchContext";

export const useNavbarSearch = () => {
    const context = useContext(SearchContext);

    if (!context) {
        throw new Error("useNavbarSearch must be used within a SearchProvider");
    }

    return context;
};
