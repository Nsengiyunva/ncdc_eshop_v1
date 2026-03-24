import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const TableFloating = ({ data, columns }) => {
  // eslint-disable-next-line no-unused-vars
  const [posts, setPosts] = useState("");

  useEffect(() => {
    setPosts(data);
  }, [data]);

  if (!posts?.length) {
    return (
      <div className="bg-white text-gray-500 flex justify-center text-center items-center flex-col">
        <h4 className="text-gray-500">No products available</h4>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto relative">
      <div className="">
        {posts.map((entry, entryIndex) => {
          return (
            <div
              key={entry?.id || entryIndex}
              className="bg-white border-b border-gray-100 hover:bg-gray-100"
            >
              {columns.map(({ Cell, field, title }, columnIndex) => (
                <div
                  key={title + columnIndex}
                  className="px-4 py-2 whitespace-nowrap text-xs  font-medium text-gray-600"
                >
                  {Cell ? <Cell entry={entry} /> : entry[field]}
                </div>
              ))}
            </div>
          );
        })}
        {!posts?.length ? (
          <div className="bg-white border-b">
            <div>
              <div className="bg-gray-100 text-gray-600 py-2 rounded-md flex justify-center">
                <h4 className="text-gray-600">You have no more entries</h4>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

TableFloating.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Cell: PropTypes.func,
      field: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};
