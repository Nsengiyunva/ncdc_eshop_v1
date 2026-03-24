import React from "react";
import { MainLayout } from "components/Layout";
import { SearchResult } from "../components/SearchResult";
// import ItemsCard from "../../misc/components/ItemsCard";

export const Search = () => {
  return (
    <>
      <div className="bg-gray-100">
        <MainLayout page="search">
          <div className="">
            <div className="">
              <SearchResult />
            </div>
            <div className="my-3">{/* <ItemsCard /> */}</div>
          </div>
        </MainLayout>
      </div>
    </>
  );
};
