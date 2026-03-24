import React, { useEffect, useState } from "react";
import { MainLayout } from "components/Layout";

export const Failed = () => {
  return (
    <MainLayout>
      <div className="flex items-center md:mt-8">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full md:h-[60vh]">
          <div className="text-center">
            <>
              <h2 className="text-3xl font-extrabold text-red-600 mb-4">
                Transaction Failed
              </h2>
              <p className="text-gray-700">
                Oops! Something went wrong with your transaction. Please try
                again.
              </p>
              <div className=""></div>
            </>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
