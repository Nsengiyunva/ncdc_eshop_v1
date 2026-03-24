import React, { useEffect, useState } from "react";
import { UPLOADS_API_URL } from "config";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper";
import { Link } from "react-router-dom";
import { ImPriceTag } from "react-icons/im";

export const MostViewed = () => {
  //choose the screen size to determine number of slides displayed in carousel
  const [slides, setSlides] = useState(3);

  const handleResize = () => {
    if (window.innerWidth < 770) {
      return setSlides(1);
    }
    if (window.innerWidth < 1280) {
      return setSlides(2);
    } else {
      return setSlides(3);
    }
  };

  // create an event listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  //   get viewed products from local storage
  const viewedProducts = JSON.parse(localStorage.getItem("viewedProducts"));

  // sort viewed products by view count
  const sortedViewedProducts = viewedProducts?.sort(
    (a, b) => b.view_count - a.view_count
  );

  // get top 5 viewed products
  const topViewedProductsQuery = sortedViewedProducts?.slice(0, 5);

  if (!topViewedProductsQuery) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-green-600 rounded-md p-2 px-4 mb-4">
        <div className="flex items-center justify-between gap-2 md:w-[50%]">
          <h1 className="flex flex-row space-x-2 items-center uppercase text-md font-black text-white">
            <ImPriceTag />
            <span> Most Viewed</span>
          </h1>
          <div className="flex gap-1">
            <div className="py-1 px-3 bg-white rounded-full"></div>
            <div className="py-1 px-1 bg-gray-200 rounded-full"></div>
            <div className="py-1 px-1 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={slides}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {topViewedProductsQuery?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="pb-14 lg:pb-0">
                <Link
                  to={`/products/${item.slug}`}
                  key={index}
                  className=" rounded-lg shadow-md bg-white flex items-center"
                >
                  <div className="w-5/12">
                    <img
                      src={UPLOADS_API_URL + "/" + item.image}
                      alt={item.slug}
                      className="h-52 rounded-l-lg object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-2 py-2 w-7/12 space-y-4">
                    <div>
                      <h1 className="font-extrabold text-xl">
                        {item.name?.length > 15
                          ? item.name?.slice(0, 12) + "..."
                          : item.name}
                      </h1>
                      <p className="text-red-700 font-extrabold text-lg">
                        UGX {item.amount?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
