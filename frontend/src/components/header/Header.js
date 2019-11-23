import React from "react";
import { NavLink } from "react-router-dom";

import "./header.scss";

const Header = () => {
  return (
    <div id="header-app" className="header">
      <img
        alt="logo"
        className="logo"
        src="https://static.sketchfab.com/img/press/logos/logo-sketchfab-grey.png"
      />
      <div className="header-right">
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/likes">Likes</NavLink>
        <NavLink to="/models">Models</NavLink>
      </div>
    </div>
  );
};

export default Header;
