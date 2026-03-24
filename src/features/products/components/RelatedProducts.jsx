import { ProductItem } from "components/ProductItem/ProductItem";
import React from "react";
import { useProducts } from "../api/getProducts";
import { ProductFilter } from "utils/productFilter";
import { ImPriceTag } from "react-icons/im";

export const RelatedProducts = () => {
  const productsQuery = useProducts();

  var productList = ProductFilter(productsQuery?.data);

  if (!productList) return null;

  return (
    <div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-green-600 rounded-t-md p-2 px-4 mt-5">
          <div className="flex items-center justify-between gap-2">
            <h1 className="flex flex-row space-x-2 items-center uppercase text-md font-semibold text-white">
              <ImPriceTag />
              <span>More Related Products</span>
            </h1>
          </div>
          <div className="flex gap-1 items-center justify-end text-white">
            <div className="py-1 px-3 bg-white rounded-full"></div>
            <div className="py-1 px-1 bg-gray-200 rounded-full"></div>
            <div className="py-1 px-1 bg-gray-200 rounded-full"></div>
          </div>
        </div>
        <div className="w-full bg-white py-3 shadow rounded-b-md">
          {
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {productList.slice(0, 4).map((product, index) => (
                <div key={index}>
                  <ProductItem product={product} />
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};
