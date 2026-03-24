import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useProduct } from "../api/getProduct";
import { useAuth } from "lib/auth";

import { Spinner, MDPreview, CoolSpinner } from "components/Elements";
import { MainLayout } from "components/Layout";
import Breadcrumbs from "components/Layout/Breadcrumbs";
import { RelatedProducts } from "../components/RelatedProducts";
import { AddToCart } from "../components/AddToCart";
import { AddToWishlist } from "../components/AddToWishlist";

import { UPLOADS_API_URL } from "config";
import placeholder from "assets/placeholder.png";

export const Product = () => {
  const auth = useAuth();
  const { slug } = useParams();
  const productQuery = useProduct({ slug });

  const product = productQuery.data;

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Log viewed product in localStorage
  useEffect(() => {
    if (!product) return;

    const viewedProducts = JSON.parse(
      localStorage.getItem("viewedProducts") || "[]"
    );
    const productEntry = {
      product_id: product.id,
      name: product.name,
      amount: product.amount,
      image: product.coverImage?.location || "",
      slug: product.slug,
      view_count: 1,
    };

    const index = viewedProducts.findIndex((p) => p.product_id === product.id);
    if (index === -1) {
      viewedProducts.push(productEntry);
    } else {
      viewedProducts[index].view_count += 1;
    }

    localStorage.setItem("viewedProducts", JSON.stringify(viewedProducts));
  }, [product]);

  // Loading state
  if (productQuery.isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <CoolSpinner />
        <span className="ml-2 text-gray-600" role="status">
          Loading product information...
        </span>
      </div>
    );
  }

  // Error state
  if (productQuery.isError) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-700 text-lg font-medium text-center px-4">
        An error occurred while loading the product. Please refresh the page or
        try again later. If the issue persists, contact support.
      </div>
    );
  }

  // Missing product data
  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-700 text-lg font-medium text-center px-4">
        We could not find the product you are looking for.
      </div>
    );
  }

  const routes = [{ name: product.name, path: `/products/${slug}` }];

  return (
    <MainLayout title={product.name}>
      <Breadcrumbs routes={routes} />

      <div className="bg-white shadow rounded-md p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#008000] via-blue-500 to-purple-500 rounded-t-2xl" />
        <div className="md:flex md:gap-8">
          {/* Product Image */}
          <div className="md:w-5/12 flex justify-center">
            <img
              src={
                product.coverImage
                  ? `${UPLOADS_API_URL}/products/${product.coverImage.location}`
                  : placeholder
              }
              alt={`Cover image of ${product.name}`}
              className="w-2/3 rounded border"
              loading="lazy"
            />
          </div>

          {/* Product Summary */}
          <div className="md:w-7/12 mt-6 md:mt-0">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h1>

            {product.daily_deal_amount || product.special_sale_amount ? (
              <p className="text-gray-500 text-sm line-through">
                UGX {product.amount?.toLocaleString()}
              </p>
            ) : null}

            <p className="text-xl font-bold text-red-700 mb-4">
              UGX{" "}
              {product.daily_deal_amount?.toLocaleString() ||
                product.special_sale_amount?.toLocaleString() ||
                product.amount?.toLocaleString()}
            </p>

            {auth.user ? (
              <div className="flex flex-col gap-3">
                <AddToCart product_id={product.id} />
                <AddToWishlist product_id={product.id} />
              </div>
            ) : (
              <div>
                <Link to="/auth/login">
                  <button className="text-blue-700 font-medium underline">
                    Log in to purchase or add to wishlist
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Additional Images */}
        {product.images?.length > 1 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Additional Images</h2>
            <div className="flex gap-4 flex-wrap">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`${UPLOADS_API_URL}/${image.name}`}
                  alt={`Additional image ${index + 1}`}
                  className="w-24 h-auto border rounded"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        )}

        {/* Product Format and Access Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded p-4 my-6 text-sm text-gray-800">
          <h3 className="font-semibold mb-1">Product Format</h3>
          {product.downloadable === 1 ? (
            <>
              <p>This product is available in soft copy (digital format).</p>
              <p>
                Upon successful purchase, a receipt will be sent to your email,
                and your digital copy will be available under your purchases
                dashboard.
              </p>
            </>
          ) : (
            <>
              <p>This product is available in hard copy (printed format).</p>
              <p>
                After completing your purchase, please visit the NCDC
                headquarters with your receipt to collect your copy.
              </p>
            </>
          )}
        </div>

        {/* Stock Information */}
        {product.downloadable !== 1 && product.stock > 0 && (
          <p className="text-gray-700 text-sm font-medium mb-4 mx-1">
            <strong>{product.stock}</strong> copies currently in stock.
          </p>
        )}

        {/* Description */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Product Description</h2>
          {product.description ? (
            <MDPreview value={product.description} />
          ) : (
            <p className="text-gray-600">
              No description available for this product.
            </p>
          )}
        </div>
      </div>

      <section className="mt-6">
        <RelatedProducts />
      </section>
    </MainLayout>
  );
};
