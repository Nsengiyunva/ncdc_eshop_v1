import React from "react";
import { Image } from "react-feather";

export const UploadField = (props) => {
  const { title, x, y, onChange, preview = "", registration } = props;

  return (
    <>
      <h1 className="text-gray-500 font-bold">{title}</h1>
      <span className="text-gray-400 text-xs">
        Images of ({x} x {y})px are recommended.
      </span>
      <>
        {preview ? (
          <>
            <div className="border border-dotted rounded p-2 flex flex-col items-center justify-center shadow-sm">
              <img src={preview} className="w-100" alt="uploaded to server" />
            </div>
          </>
        ) : (
          <div className="border border-dotted rounded p-10 flex flex-col items-center justify-center mt-4 shadow-sm">
            <Image className="text-gray-300 h-20 w-20" />
            <span className="text-gray-500 text-sm"></span>
            <label className="">
              <span className="mt-2 text-base leading-normal">
                <span className="text-red-500 cursor-pointer">Browse</span> for
                image.
              </span>
              <input
                type="file"
                accept="image/*"
                name="file"
                className="hidden"
                onChange={onChange}
                {...registration}
              />
            </label>
          </div>
        )}
      </>
    </>
  );
};
