import React from "react";
import { BsListUl } from "react-icons/bs";

export const Wishlistbar = () => {
  return (
    <div>
      <div className="flex justify-between p-5 shadow-lg bg-white">
        <div className="font-extrabold">Wishlist</div>
        <div>
          <BsListUl className="text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
