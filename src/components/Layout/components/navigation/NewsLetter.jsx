import React from "react";
import { HiOutlineMail } from "react-icons/hi";

export default function NewsLetter() {
  return (
    <>
      <div className="bg-footer-head">
        <div className="py-6 px-4 md:px-10 flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between">
          <div className="text-white w-fit">
            <h1 className="text-3xl font-extrabold">
              NCDC eShop
              <span className="b-superscript" data-text="&trade;">
                <span className="b-superscript__text">&trade;</span>
              </span>{" "}
            </h1>
          </div>
          <div className="md:w-4/12">
            <h1 className="text-white text-xl uppercase mb-3 md:mb-0 ">
              NewsLetter
            </h1>
            <p className="text-white flex flex-wrap mb-2 md:mb-0 ">
              Subsribe for our news letter to receive new offers and great deals
              on a daily and weekly basis
            </p>
          </div>
          <div className="w-3/12 flex items-center">
            <div className="flex w-full bg-white items-center">
              <div className="flex -mr-px w-15 px-2 py-2">
                <span className="flex items-center leading-normal bg-white px-2 border-0 rounded rounded-r-none text-2xl text-gray-600">
                  <HiOutlineMail />
                </span>
              </div>
              <input
                type="email"
                className="border-0 h-10 px-3 outline-none"
                placeholder="johndoe@example.com"
              />
            </div>
          </div>
          <div className="md:-ml-20 flex items-center">
            <button className="py-2 px-2  bg-green-500 ">Join Now</button>
          </div>
        </div>
      </div>
    </>
  );
}
