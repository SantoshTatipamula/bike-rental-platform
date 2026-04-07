import { useState } from "react";
import { Search } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const SearchBar = () => {
  const {search ,setSearch} = useAppContext();

  return (
    < >
      <Search size={16} className="text-muted-foreground mr-2" />

      <input
        type="text"
        placeholder="Search bikes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="outline-none bg-transparent text-sm w-full"
      />
    </>
  );
};

export default SearchBar;