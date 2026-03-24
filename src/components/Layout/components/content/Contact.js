import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";

export const Contact = () => {
  return (
    <div>
      <div className="md:w-2/3 mx-auto py-8 space-y-4">
        <div>
          <div className="flex space-x-6 items-center">
            <BiPhone className="text-green-700 w-7 h-7" />
            <p className="font-semibold text-lg text-gray-800">
              +256-349-506-234
            </p>
          </div>
        </div>
        <div>
          <div className="flex space-x-6 items-center">
            <BiEnvelope className="text-green-700 w-7 h-7" />
            <p className="font-semibold text-lg text-gray-800">
              marketing.ncdc.go.ug
            </p>
          </div>
        </div>
        <div>
          <div className="flex space-x-6 items-center">
            <BiMap className="text-green-700 w-7 h-7" />
            <p className="font-semibold text-lg text-gray-800">
              NCDC head office, Kyambogo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
