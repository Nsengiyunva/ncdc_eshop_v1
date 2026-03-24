import { MapIcon, PhoneIcon } from "@heroicons/react/outline";
import React from "react";
import { BiEnvelope } from "react-icons/bi";

export const Contact = () => {
  return (
    <div>
      <div className="w-full lg:w-1/2 mx-auto py-8 px-4 space-y-4">
        <div>
          <div className="flex space-x-6 items-center">
            <PhoneIcon className="text-green-700 w-7 h-7" />
            <p className="font-semibold text-lg text-gray-800">
              +256-349-506-234
            </p>
          </div>
        </div>
        <div>
          <div className="flex space-x-6 items-center">
            <BiEnvelope className="text-green-700 w-7 h-7" />
            <p className="font-semibold text-lg text-gray-800">
              info@ncdc.go.ug
            </p>
          </div>
        </div>
        <div>
          <div className="flex space-x-6 items-center">
            <MapIcon className="text-green-700 w-7 h-7" />
            <p className="font-semibold text-lg text-gray-800">
              NCDC head office, Kyambogo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
