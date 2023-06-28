import { createContext } from "react";

export const SearchContext = createContext({
    searchValue: {
        searchQuery: '',
        searchResult: [],
        originalOrder: []
    },
    setSearchValue: () => { }
})