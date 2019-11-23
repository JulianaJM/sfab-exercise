import React from "react";
import PropTypes from "prop-types";
import { getAvatar } from "../../utils/index";

import "./tooltip-user.scss";

const TooltipUser = ({ user }) => {
  const userAvatar = getAvatar(user.avatar.images, 32);
  return (
    <div className="image--info">
      <div className="tooltip">
        <img src={userAvatar.url} alt={user.displayName} />
        <div className="tooltiptext">
          <span>by</span> <a href={user.profileUrl}>{user.displayName} </a>
        </div>
      </div>
    </div>
  );
};

TooltipUser.propTypes = {
  user: PropTypes.object.isRequired
};

export default TooltipUser;
