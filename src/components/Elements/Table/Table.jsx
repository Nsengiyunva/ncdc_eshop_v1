import { ArchiveIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { Pagination } from "../Pagination/Pagination";

export const Table = ({ data, columns }) => {
  // eslint-disable-next-line no-unused-vars
  const [posts, setPosts] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumberLimit = 5;
  const [maxPageNumber, setmaxPageNumber] = useState(5);
  const [minPageNumber, setminPageNumber] = useState(1);

  // Change page
  // const paginateFront = () => setCurrentPage(currentPage + 1);
  // const paginateBack = () => setCurrentPage(currentPage - 1);

  const paginateFront = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumber) {
      setmaxPageNumber(maxPageNumber + pageNumberLimit);
      setminPageNumber(minPageNumber + pageNumberLimit);
    }
  };
  const paginateBack = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumber(maxPageNumber - pageNumberLimit);
      setminPageNumber(minPageNumber - pageNumberLimit);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!posts?.length) {
    return (
      <div className="bg-white text-gray-500 h-80 flex justify-center items-center flex-col">
        <ArchiveIcon className="h-16 w-16 text-gray-100" />
        <h4 className="text-gray-500">You have no entries at the moment</h4>
      </div>
    );
  }

  return (
    <div className="flex flex-col ">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      colIndex={index}
                      key={column.title + index}
                      scope="col"
                      className="py-3 px-6 text-xl"
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((entry, entryIndex) => {
                  return (
                    <tr
                      key={entry?.id || entryIndex}
                      className="bg-white border-b"
                    >
                      {columns.map(({ Cell, field, title }, columnIndex) => (
                        <td
                          key={title + columnIndex}
                          className="px-4 py-2 whitespace-nowrap text-xs  font-medium text-gray-600"
                        >
                          {Cell ? <Cell entry={entry} /> : entry[field]}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                {!currentPosts?.length ? (
                  <tr className="bg-white border-b">
                    <td colSpan={columns.length}>
                      <div className="bg-gray-100 text-gray-600 row py-2 rounded-md flex justify-center">
                        <h4 className="text-gray-600">
                          You have no more entries
                        </h4>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end my-4">
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={paginate}
              currentPage={currentPage}
              paginateFront={paginateFront}
              paginateBack={paginateBack}
              maxPageNumber={maxPageNumber}
              minPageNumber={minPageNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Cell: PropTypes.func,
      field: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};
