import PropTypes from "prop-types";
import * as React from "react";

import { Head } from "../Head";

export const ContentLayout = ({
  children,
  title,
  button,
  startButton = null,
}) => {
  return (
    <>
      <Head title={title} />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-row justify-between items-center border border-gray-200 bg-white rounded-full p-2">
            {startButton ? (
              startButton
            ) : (
              <div className="mx-4">
                <h1 className="text-xl font-black text-gray-900 uppercase">
                  {title}
                </h1>
              </div>
            )}
            <div>{button}</div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
      </div>
    </>
  );
};

ContentLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
