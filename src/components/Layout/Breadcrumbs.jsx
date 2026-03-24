import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "react-feather";

const Breadcrumbs = ({ routes }) => {
  return (
    <nav
      className="px-4 -mt-1 mb-1"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center text-black">
          <Link
            to="/"
            className="inline-flex items-center text-xs  text-black hover:text-gray-900"
          >
            Home
          </Link>
        </li>
        {routes?.map((route, index) => {
          return (
            <li className="inline-flex items-center" key={index}>
              <ChevronRight size={10} className="mr-4" />
              <Link
                to={route.path}
                className="inline-flex items-center text-xs whitespace-nowrap font-extrabold text-black"
              >
                {route.name}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.propTypes = {};

export default Breadcrumbs;
