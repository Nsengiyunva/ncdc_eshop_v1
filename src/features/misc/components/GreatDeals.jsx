import { UPLOADS_API_URL } from "config";
import React from "react";
import { useAdverts } from "../api/getAdverts";

export default function GreatDeals() {
  const advertsQuery = useAdverts();

  return (
    <div className="relative w-full h-fit overflow-hidden">
      <div className="relative ">
        {advertsQuery.data?.map((advert, index) => {
          if (advert.advert_type === "banner" && advert.active === 1) {
            return (
              <a href={advert?.url} key={index}>
                <img
                  src={UPLOADS_API_URL + "/adverts/" + advert?.location}
                  alt="computing-ad"
                  className=" bg-repeat rounded-lg h-32 md:h-60 shadow-md object-cover rounded-md w-full"
                  loading="lazy"
                />
              </a>
            );
          } else {
            return null; // Display null if active is 0 or advert_type is not "banner"
          }
        })}
        {advertsQuery.isLoading && (
          <div className="w-full flex justify-center items-center shadow-md h-32 md:h-60 skeleton"></div>
        )}
      </div>
    </div>
  );
}
