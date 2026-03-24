import React from "react";

export const SearchResult = () => {
  return (
    <div>
      <div className="flex px-4 md:px-8 py-5 shadow-lg items-center justify-between">
        <div>
          <h1 className="text-sm md:text-base">
            Search “<span className="font-extrabold "> Trending Items</span>”
          </h1>
        </div>

        {/* <div className="flex md:gap-2 items-center text-sm md:text-base">
          Sort by:
          <span className="md:text-lg">
            <select
              className="form-select form-select-sm font-extrabold block w-full px-2 py-1 text-sm 
              bg-transparent bg-clip-padding bg-no-repeat border rounded transition ease-in-out m-0 
              border-none focus:outline-none"
              aria-label=".form-select-sm example"
            >
              <option selected>Popularity</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </span>
        </div> */}
      </div>
    </div>
  );
};
