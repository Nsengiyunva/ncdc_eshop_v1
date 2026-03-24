import React from "react";
import { Link } from "react-router-dom";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { ImBook } from "react-icons/im";
import { useTranslation } from "react-i18next";

import { useAdverts } from "../api/getAdverts";
import { useCategories } from "../api/getCategories";
import { useProducts } from "../api/getBooks";
import { UPLOADS_API_URL } from "config";
import placeholder from "assets/placeholder.png";
import UnavailableBookCover from "assets/unavailable-book-cover.png";

import { ProductFilter } from "utils/productFilter";
import { formatText } from "utils/formatText";

export const Sidebar = () => {
  const { t } = useTranslation();
  const categoriesQuery = useCategories();
  const productsQuery = useProducts();
  const advertsQuery = useAdverts();

  const productsList = ProductFilter(productsQuery.data);

  return (
    <aside className="space-y-8">
      {/* Categories Section */}
      <section>
        <Header title={t("categories")} />

        <div className="bg-white rounded-md shadow p-4">
          <ul className="space-y-3 text-sm">
            {categoriesQuery.isLoading && (
              <li className="space-y-2">
                <div className="h-6 w-2/3 bg-gray-200 animate-pulse rounded" />
                <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded" />
              </li>
            )}

            {categoriesQuery.data?.map((category, idx) => (
              <li key={idx}>
                <Link
                  to={`/categories/${category.slug}`}
                  className="flex items-center gap-3 hover:text-green-700 transition"
                >
                  <img
                    src={
                      category?.icon
                        ? `${UPLOADS_API_URL}/categories/${category.icon}`
                        : placeholder
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      const char = category.name[0]?.toUpperCase() || "C";
                      e.target.src = `https://dummyimage.com/40x40/EEFFEE/00A607.png&text=${char}`;
                    }}
                    alt={category.name}
                    className="w-6 h-6 object-cover rounded-full border border-gray-300 shadow-sm"
                    loading="lazy"
                  />
                  <span>{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services Section */}
      <section>
        <Header title={t("services.title")} />
        <div className="bg-white rounded-md shadow p-4">
          <ul className="space-y-5 text-sm">
            <li>
              <Link
                to="/services/bids"
                className="flex items-center gap-3 hover:text-green-700"
              >
                <FaMoneyCheckAlt className="text-green-600 w-5 h-5" />
                {t("bids")}
              </Link>
            </li>
            <li>
              <Link
                to="/services/book-evaluation"
                className="flex items-center gap-3 hover:text-green-700"
              >
                <ImBook className="text-gray-700 w-5 h-5" />
                {t("bookEvaluation")}
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Advert Section */}
      <section>
        {advertsQuery.data
          ?.filter((ad) => ad.active === 1 && ad.advert_type !== "secondary")
          .map((ad, idx) => (
            <a key={idx} href={ad.url}>
              <img
                src={`${UPLOADS_API_URL}/adverts/${ad.location}`}
                alt="advertisement"
                className="rounded-md w-full object-cover"
                loading="lazy"
                onError={(e) => (e.target.src = UnavailableBookCover)}
              />
            </a>
          ))}

        {advertsQuery.isLoading && (
          <div className="h-48 bg-gray-200 animate-pulse rounded-md" />
        )}
      </section>

      {/* Latest Products */}
      <section>
        <Header title={t("latestProducts")} />
        <div className="bg-white rounded-md shadow px-4 py-3">
          <ul className="space-y-4">
            {productsQuery.isLoading &&
              [0, 1].map((i) => (
                <li key={i} className="flex gap-3">
                  <div className="h-20 w-20 bg-gray-300 animate-pulse rounded-md" />
                  <div className="space-y-2 w-full">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                </li>
              ))}

            {productsList?.slice(0, 3).map((product, idx) => (
              <li key={idx}>
                <Link
                  to={`/products/${product.slug}`}
                  className="flex items-start gap-3 hover:scale-[1.02] transition-transform"
                >
                  <img
                    src={
                      product?.coverImage?.location
                        ? `${UPLOADS_API_URL}/products/${product.coverImage.location}`
                        : placeholder
                    }
                    alt={product.name}
                    onError={(e) => (e.target.src = UnavailableBookCover)}
                    className="h-24 w-20 object-cover rounded-md"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm leading-tight">
                      {formatText(product?.name, 40)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product?.level?.name}
                    </p>
                    <p className="font-bold text-green-700 text-sm">
                      UGX{" "}
                      {product?.daily_deal_amount?.toLocaleString() ||
                        product?.special_sale_amount?.toLocaleString() ||
                        product?.amount?.toLocaleString()}
                    </p>
                    {(product?.daily_deal_amount ||
                      product?.special_sale_amount) && (
                      <p className="text-xs line-through text-gray-400">
                        UGX {product?.amount?.toLocaleString()}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Secondary Adverts */}
      <section>
        {advertsQuery.data
          ?.filter((ad) => ad.active === 1 && ad.advert_type === "secondary")
          .map((ad, idx) => (
            <a key={idx} href={ad.url}>
              <img
                src={`${UPLOADS_API_URL}/adverts/${ad.location}`}
                alt="secondary-ad"
                className="rounded-md w-full object-cover mt-5"
                loading="lazy"
              />
            </a>
          ))}
      </section>
    </aside>
  );
};

// Helper for section headers
const Header = ({ title }) => (
  <div className="px-4 mb-2 flex justify-between items-center">
    <h2 className="uppercase text-xs font-bold tracking-wide text-gray-700">
      {title}
    </h2>
    <div className="flex gap-1">
      <div className="w-3 h-1 rounded-full bg-green-600" />
      <div className="w-1 h-1 rounded-full bg-gray-400" />
      <div className="w-1 h-1 rounded-full bg-gray-400" />
    </div>
  </div>
);
