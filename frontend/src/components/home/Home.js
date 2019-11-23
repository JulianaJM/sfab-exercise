import React, { useState, useEffect } from "react";
import { getAvatar } from "../../utils/index";

import "./home.scss";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/profile")
      .then(response => {
        return response.json();
      })
      .then(user => {
        setUser(user);
      })
      .catch(err => {
        throw new Error(err);
      });
  }, []);

  const avatar = user ? getAvatar(user.avatar.images, 100) : "";
  return (
    <div className="home">
      <div className="outer-div">
        <div className="outer-div__content">
          <p>My likes and models on Sketchfab</p>
          <img
            className="logo"
            src="https://static.sketchfab.com/img/press/logos/logo.png"
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className="inner-div">
          <div className="inner-div__content">
            <div>
              {user && (
                <a
                  className="user-info"
                  href="https://www.linkedin.com/in/juliana-j-45500115b/"
                >
                  <img src={avatar.url} alt={user.displayName} />
                  <p>{user.displayName}</p>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
