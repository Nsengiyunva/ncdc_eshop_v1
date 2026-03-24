import React from "react";

import Gif from "./spinner.gif";

export const CoolSpinner = () => {
  return (
    <div>
      <img src={Gif} className="h-40" alt="Loading..." />
    </div>
  );
};
