import { useState } from "react";
import { Search } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const SearchBar = () => {
  const {search ,setSearch} = useAppContext();

  return (
    <div className="flex items-center border rounded-md px-3 py-1.5 w-full bg-background">
      <Search size={16} className="text-muted-foreground mr-2" />

      <input
        type="text"
        placeholder="Search bikes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="outline-none bg-transparent text-sm w-full"
      />
    </div>
  );
};

export default SearchBar;