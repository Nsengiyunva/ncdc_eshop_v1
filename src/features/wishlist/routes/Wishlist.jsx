// import { Pagination } from 'components/elements/Pagination';
import { MainLayout } from "components/Layout";
import React, { useEffect } from "react";
import { BsListUl } from "react-icons/bs";
import { WishlistCard } from "../components/WishlistCard";

export const Wishlist = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout page="wishlist">
      <div
        className="md:mt-8 px-8 py-4 shadow-md rounded-2xl bg-white flex justify-between
					 items-center"
      >
        <div className="font-bold text-md md:text-lg">My Wishlist</div>
        <BsListUl className="text-2xl cursor-pointer" />
      </div>
      <div className="">
        <div className="w-full">
          <div className="my-3">
            <WishlistCard />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
