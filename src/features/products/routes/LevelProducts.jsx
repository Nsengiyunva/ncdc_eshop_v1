import { MainLayout } from "components/Layout";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../api/getProducts";
import { ProductItem } from "components/ProductItem/ProductItem";
import { Pagination } from "components/Elements";
import { ChevronRight } from "react-feather";
import { ProductFilter } from "utils/productFilter";
import Breadcrumbs from "components/Layout/Breadcrumbs";

export const LevelProducts = () => {
  const { slug } = useParams();

  const allProductsQuery = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // // Get active products
  // var allProducts = ProductFilter(allProductsQuery);

  // console.log(allProducts);

  // Get products in the level
  const productsQuery = allProductsQuery?.data?.filter((product) => {
    return product.level?.slug === slug && product.active === 1;
  });

  // Get products with filter
  const [softCopy, setSoftCopy] = useState(false);
  var filterProducts = [];

  if (softCopy) {
    filterProducts = productsQuery?.filter((product) => {
      return product.downloadable === 1;
    });
  } else {
    filterProducts = productsQuery;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  // Get current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filterProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumberLimit = 5;
  const [maxPageNumber, setMaxPageNumber] = useState(5);
  const [minPageNumber, setMinPageNumber] = useState(1);

  const paginateFront = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumber) {
      setMaxPageNumber(maxPageNumber + pageNumberLimit);
      setMinPageNumber(minPageNumber + pageNumberLimit);
    }
  };
  const paginateBack = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumber(maxPageNumber - pageNumberLimit);
      setMinPageNumber(minPageNumber - pageNumberLimit);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const routes = [
    {
      path: `/products/${slug}`,
      name: slug,
    },
    {
      path: "/products/levels",
      name: "Products",
    },
  ];

  return (
    <MainLayout>
      <Breadcrumbs routes={routes} />
      <div className="bg-white shadow rounded-md p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#008000] via-blue-500 to-purple-500 rounded-t-2xl" />
        <div className="">
          <div className="flex space-x-2 items-center mb-3 ml-4">
            <input
              type="checkbox"
              value={softCopy}
              onChange={() => setSoftCopy(!softCopy)}
            />
            <label>Select to display only digital products.</label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {currentProducts?.map((product, index) => {
              return (
                <div key={index}>
                  <ProductItem product={product} />
                </div>
              );
            })}

            {currentProducts?.length === 0 && (
              <div className="text-center text-xl my-4">
                <p>No products available</p>
              </div>
            )}

            {/* Skeleton  */}
            {allProductsQuery.isLoading &&
              [0, 1, 2, 3].map((index) => {
                return (
                  <div key={index}>
                    <div className="flex items-center gap-y-3 h-full rounded-lg shadow-md bg-white">
                      <div className="rounded-lg space-y-2 w-full">
                        <div className="skeleton h-48 w-full"></div>
                        <div className="p-4">
                          <div className="skeleton h-6 w-full"></div>
                          <div className="skeleton h-6 w-3/4 my-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {productsQuery?.filter((product) => {
            return product.level.slug === slug;
          }).length === 0 ? (
            <div className="w-full">
              <div className="flex flex-col w-2/3 mx-auto items-center justify-center">
                <p className="my-4 text-2xl">
                  Sorry, we currently don't have any products under this
                  category.
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="my-8">
          <Pagination
            postsPerPage={productsPerPage}
            totalPosts={productsQuery?.length}
            paginate={paginate}
            currentPage={currentPage}
            paginateFront={paginateFront}
            paginateBack={paginateBack}
            maxPageNumber={maxPageNumber}
            minPageNumber={minPageNumber}
          />
        </div>
      </div>
    </MainLayout>
  );
};
