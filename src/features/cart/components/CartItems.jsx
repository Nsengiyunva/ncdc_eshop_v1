import React from "react";
import { useCartItems } from "../api/getCartItems";
import { UPLOADS_API_URL } from "config";
import { RemoveCartItem } from "./RemoveCartItem";
import { AddCartQuantity } from "./AddCartQuantity";
import { ReduceCartQuantity } from "./ReduceCartQuantity";

import placeholder from "assets/placeholder.png";

export const CartItems = () => {
  const cartQuery = useCartItems();

  console.log(cartQuery.data)

  return (
    <div className="">
      {cartQuery?.data?.cartItems?.map((item, index) => (
        <div
          key={index}
          className="shadow-lg rounded-md w-full bg-white flex item-center"
        >
          <div className="w-2/6 flex item-center">
            <img
              src={
                item?.product.image === null
                  ? placeholder
                  : UPLOADS_API_URL +
                    "/products/" +
                    item?.product?.image?.location
              }
              alt=""
              className="h-36 md:h-40 object-contain rounded-tl-lg rounded-bl-lg
							 md:rounded-tl-md md:rounded-bl-md"
              loading="lazy"
            />
          </div>
          <div className="px-5 py-2 md:py-5 w-4/6">
            <div>
              <h1 className="font-extrabold my-2">
                {item?.product?.name?.length > 30
                  ? item?.product?.name.slice(0, 28) + "..."
                  : item?.product?.name}
              </h1>
              <span className="text-red-700 uppercase font-extrabold">
                UGX {item?.amount?.toLocaleString()}
              </span>
            </div>

            <div className="mt-7 md:mt-3 flex  justify-between">
              <RemoveCartItem cartItemId={item?.id} />
              {item?.product?.downloadable === 1 ? (
                ""
              ) : (
                <div className="flex justify-evenly  gap-2 md:gap-4 ">
                  <ReduceCartQuantity item={item} />
                  <h1>{item?.quantity}</h1>
                  <AddCartQuantity item={item} />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Skeleton */}
      {cartQuery.isLoading &&
        [0, 1].map((index) => {
          return (
            <div key={index}>
              <div className="shadow-lg rounded-md my-4 w-full bg-white flex item-center">
                <div className="skeleton h-40 w-48"></div>
                <div className="w-full">
                  <div className="skeleton h-8 w-3/4 m-8"></div>
                  <div className="skeleton h-8 w-2/4 m-8"></div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
