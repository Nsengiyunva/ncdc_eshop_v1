/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  maxPageNumber,
  minPageNumber,
  paginateFront,
  paginateBack,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div
        className={pageNumbers.length === 0 ? "hidden" : "flex justify-center"}
      >
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            {/* Button for going previous  */}
            <li className="page-item">
              <button
                onClick={() => {
                  paginateBack();
                }}
                disabled={currentPage === pageNumbers[0] ? true : false}
                className="hover:bg-gray-700 page-link relative block py-1.5 px-3 rounded 
                border-0 bg-transparent outline-none transition-all duration-300 text-gray-300 
                focus:shadow-none"
              >
                <span aria-hidden="true">Previous</span>
              </button>
            </li>

            {/* page numbers  */}
            {pageNumbers.map((number) => {
              if (number < maxPageNumber + 1 && number >= minPageNumber) {
                return (
                  <li key={number} className="page-item">
                    <button
                      onClick={() => paginate(number)}
                      className={
                        currentPage === number
                          ? "page-link relative block py-1.5 px-3 bg-gray-200 outline-none transition-all duration-300 rounded text-black focus:shadow-none"
                          : "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                      }
                    >
                      {number}
                    </button>
                  </li>
                );
              } else return null;
            })}

            {/* Button for going next  */}
            <li className="page-item">
              <button
                onClick={() => {
                  paginateFront();
                }}
                disabled={
                  currentPage === pageNumbers[pageNumbers.length - 1]
                    ? true
                    : false
                }
                className="hover:bg-gray-700 page-link relative block py-1.5 px-3 border-0 
                bg-transparent outline-none transition-all duration-300 rounded text-gray-300"
              >
                <span aria-hidden="true">Next</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
