import React from "react";
import { Link } from "react-router-dom";

export const LogError = () => {
  return (
    <>
      {/* For people who aren't evaluated */}
      <div className="w-full">
        <div className="flex flex-col items-center justify-center">
          <p className="my-4 text-lg md:text-2xl">
            Sorry, you can not access these services without logging in
          </p>
          <p className="my-4 text-lg">
            Please log in to access book evaluation services.
          </p>
          <div>
            <Link to="/auth/login">
              <button className="text-green-500 rounded-lg shadow-sm border border-green-500 font-extrabold px-5 py-1.5 ">
                Log in and evaluate your book
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
