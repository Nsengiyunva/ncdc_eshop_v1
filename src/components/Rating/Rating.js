import React from "react";
import { BiStar } from "react-icons/bi";

export const Rating = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<BiStar className="text-yellow-400" />);
    } else {
      stars.push(<BiStar className="text-gray-400" />);
    }
  }
  return stars;
};
