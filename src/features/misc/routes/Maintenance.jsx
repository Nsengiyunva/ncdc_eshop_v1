import React from "react";

import MaintenanceSvg from "assets/Maintenance-pana.svg";

export const Maintenance = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4">
      <div className="max-w-2xl text-center">
        <img
          src={MaintenanceSvg}
          alt="Maintenance Illustration"
          className="w-full max-w-md mx-auto mb-6"
        />
        <h1 className="text-4xl font-extrabold mb-4 text-green-400">
          Unscheduled Maintenance in Progress
        </h1>
        <p className="text-lg mb-6 text-gray-300">
          Our platform is currently undergoing unscheduled maintenance due to
          new security upgrades. These updates are essential to protect your
          data and enhance the security of our eShop.
        </p>
        <p className="mb-8 text-gray-400">
          We are actively working to resolve the issues and restore full
          functionality as quickly as possible. Thank you for your patience and
          understanding.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://ncdc.go.ug"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm font-medium shadow-lg transition-all"
          >
            Visit NCDC Website
          </a>
        </div>
      </div>
    </div>
  );
};
