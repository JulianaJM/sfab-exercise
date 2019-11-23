import React from "react";

import "./loader.scss";

const Loader = ({ withClassName }) => {
  return (
    <div className={`loader ${withClassName}`}>
      <p className="sr-only">loading in progress</p>
    </div>
  );
};

export default Loader;
