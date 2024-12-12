import React, { useState } from "react";

const SearchBar = ({query,onSearch}) => {

  return (
    <div className="h-[7vh] content-center">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={onSearch}
        className="border-2 p-2 w-[20vw] text-lg"
      />
    </div>
  );
};

export default SearchBar;
