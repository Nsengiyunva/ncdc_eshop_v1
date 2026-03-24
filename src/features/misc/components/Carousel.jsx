import React from "react";
import { Link } from "react-router-dom";
import { useBanners } from "../api/getBanners";
import { useSpecialSales } from "../api/getSpecialSales";
import { UPLOADS_API_URL } from "config";
import UnavailableBookCover from "assets/unavailable-book-cover.png";
import { useTranslation } from "react-i18next";

export default function Carousel() {
  const { t } = useTranslation();
  const bannersQuery = useBanners();
  const specialSalesQuery = useSpecialSales();

  const placeholderImage = UnavailableBookCover;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Banner Section */}
        <div className="lg:col-span-3">
          {bannersQuery.data?.slice(0, 1).map((banner, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 items-center bg-white rounded-md shadow-md overflow-hidden"
            >
              <img
                src={
                  banner?.coverImage?.location
                    ? `${UPLOADS_API_URL}/products/${banner.coverImage.location}`
                    : banner?.product?.images?.[0]?.location
                    ? `${UPLOADS_API_URL}/products/${banner.product.images[0].location}`
                    : placeholderImage
                }
                alt={banner.product?.name || "Banner Product"}
                onError={(e) => (e.target.src = placeholderImage)}
                loading="lazy"
                className="object-cover w-full h-48 sm:h-64 lg:h-80"
              />
              <div className="p-4 sm:p-6 flex flex-col items-start">
                <h2 className="text-xs sm:text-3xl font-bold text-gray-600 uppercase tracking-wide">
                  {banner.title}
                </h2>
                <h3 className="mt-1 text-base sm:text-lg font-bold text-gray-900 leading-tight">
                  {banner.product?.name?.length > 40
                    ? banner.product?.name.slice(0, 40) + "..."
                    : banner.product?.name}
                </h3>
                <p className="mt-1 text-red-700 font-bold text-lg sm:text-xl">
                  {t("currency")} {banner.product?.amount?.toLocaleString()}
                </p>
                <Link
                  to={`/products/${banner.product?.slug}`}
                  className="mt-3 sm:mt-5 bg-green-700 hover:bg-green-800 text-white uppercase text-sm font-semibold px-5 py-2 rounded-full shadow-md transition"
                >
                  {t("shopNow")}
                </Link>
              </div>
            </div>
          ))}

          {/* Skeleton */}
          {bannersQuery.isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 bg-white rounded-md shadow-md overflow-hidden">
              <div className="skeleton h-48 sm:h-64 w-full" />
              <div className="p-4 space-y-3 w-full">
                <div className="skeleton h-6 w-2/3" />
                <div className="skeleton h-5 w-1/2" />
                <div className="skeleton h-10 w-2/3 mt-4" />
              </div>
            </div>
          )}
        </div>

        {/* Special Sales Section */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {specialSalesQuery.data?.slice(0, 2).map((sale, index) => (
            <Link
              key={index}
              to={`/products/${sale.product?.slug}`}
              className="grid grid-cols-6 bg-white rounded-md shadow hover:shadow-md transition overflow-hidden"
            >
              <div className="col-span-4 p-4 flex flex-col justify-center">
                <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold uppercase px-3 py-1 rounded-full w-fit">
                  {sale.title}
                </span>
                <h4 className="mt-2 font-bold text-sm sm:text-base text-gray-800 leading-tight">
                  {sale.product?.name?.length > 35
                    ? sale.product.name.slice(0, 32) + "..."
                    : sale.product.name}
                </h4>
                <div className="mt-1 text-green-700 font-bold text-sm">
                  UGX {sale.amount?.toLocaleString()}
                </div>
                <div className="text-gray-500 text-xs line-through">
                  UGX {sale.product?.amount?.toLocaleString()}
                </div>
              </div>
              <div className="col-span-2">
                <img
                  src={
                    sale.product?.images?.[0]?.location
                      ? `${UPLOADS_API_URL}/products/${sale.product.images[0].location}`
                      : placeholderImage
                  }
                  alt={sale.title}
                  onError={(e) => (e.target.src = placeholderImage)}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ))}

          {/* Skeleton */}
          {specialSalesQuery.isLoading &&
            [0, 1].map((i) => (
              <div
                key={i}
                className="grid grid-cols-6 bg-white rounded-md shadow-md overflow-hidden"
              >
                <div className="col-span-4 p-4 space-y-2">
                  <div className="skeleton h-5 w-2/3" />
                  <div className="skeleton h-4 w-1/2" />
                  <div className="skeleton h-6 w-1/2" />
                </div>
                <div className="col-span-2">
                  <div className="skeleton h-full w-full" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
