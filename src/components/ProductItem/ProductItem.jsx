import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { UPLOADS_API_URL } from "config";
import UnavailableBookCover from "assets/unavailable-book-cover.png";
import placeholder from "assets/placeholder.png";

export const ProductItem = ({ product }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const timeoutRef = useRef(null);

  const imageUrl = product?.coverImage?.location
    ? `${UPLOADS_API_URL}/products/${product.coverImage.location}`
    : placeholder;

  const baseAmount = product?.amount || 0;
  const isFree = baseAmount === 0;

  const displayPrice = isFree
    ? "Free"
    : product?.daily_deal_amount?.toLocaleString() ||
      product?.special_sale_amount?.toLocaleString() ||
      baseAmount.toLocaleString();

  const originalPrice =
    (product?.daily_deal_amount || product?.special_sale_amount) && !isFree
      ? baseAmount.toLocaleString()
      : null;

  const isDigital = product?.downloadable === 1;
  const badgeText = isDigital ? "Digital" : "Physical";
  const badgeColor = isDigital
    ? "bg-blue-100 text-blue-700"
    : "bg-yellow-100 text-yellow-700";

  const handleLongPressStart = () => {
    timeoutRef.current = setTimeout(() => {
      setIsZoomed(true);
    }, 500); // half second press triggers zoom
  };

  const handlePressEnd = () => {
    clearTimeout(timeoutRef.current);
    setIsZoomed(false);
  };

  return (
    <>
      {/* Overlay */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-200 pointer-events-none"></div>
      )}

      {/* Product */}
      <div
        className={`bg-white rounded-lg overflow-hidden border border-gray-100 transition-transform duration-200 ease-in-out transform ${
          isZoomed
            ? "scale-110 z-40 relative"
            : "hover:shadow-md hover:scale-[1.02]"
        }`}
        onMouseDown={handleLongPressStart}
        onTouchStart={handleLongPressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchEnd={handlePressEnd}
      >
        <Link to={`/products/${product?.slug}`} className="block">
          {/* Product Image */}
          <div className="w-full h-[240px] bg-gray-10 flex items-center justify-center overflow-hidden border-b border-gray-100">
            <img
              src={imageUrl}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = UnavailableBookCover;
              }}
              alt={product?.name || "Book Cover"}
              loading="lazy"
              className="h-full w-full object-cover p-2"
            />
          </div>

          {/* Product Info */}
          <div className="px-3 py-2 space-y-1">
            {/* Badge */}
            <span
              className={`text-[10px] font-semibold px-2 py-1 rounded-full inline-block w-fit ${badgeColor}`}
            >
              {badgeText}
            </span>

            {/* Product Name - max 2 lines */}
            <h3
              className="text-[13.5px] font-medium text-gray-800 leading-[1.25rem] capitalize line-clamp-2"
              // style={{ minHeight: "2.6rem" }}
            >
              {product?.name}
            </h3>

            <div>
              <p
                className={`font-bold text-md ${
                  isFree ? "text-blue-700" : "text-[#008000]"
                }`}
              >
                {isFree ? (
                  "Free"
                ) : (
                  <span>
                    <span className="text-[10px]">UGX </span>
                    {displayPrice}
                  </span>
                )}
              </p>

              {originalPrice && (
                <p className="text-gray-500 font-medium text-md ">
                  <span className="text-[10px]">UGX </span>{" "}
                  <span className="line-through">{originalPrice}</span>
                </p>
              )}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
