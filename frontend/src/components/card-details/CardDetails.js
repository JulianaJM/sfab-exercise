import React, { useRef, useEffect, memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import ReactMarkdown from "react-markdown/with-html";
import { getAvatar, isMobile } from "../../utils/index";

import "./card-details.scss";

const CardDetails = ({ item, onClose, isOpen }) => {
  const userAvatar = getAvatar(item.user.avatar.images, 48);
  const btnRef = useRef(null);
  const expandRef = useRef(null);

  useEffect(() => {
    if (isMobile()) {
      const expandedEl = document.getElementsByClassName(
        "image--expand is-expanded"
      )[0];

      expandedEl.scrollIntoView({ behavior: "smooth" });
    } else {
      btnRef.current.focus();
    }
  }, [item]);

  return (
    <div
      ref={expandRef}
      tabIndex={-1}
      className={classNames("image--expand", {
        "is-expanded": isOpen,
        "is-collapsed": !isOpen
      })}
    >
      <div className="title">
        <button
          ref={btnRef}
          type="button"
          className="expand__close"
          onClick={onClose}
        >
          <span className="sr-only">close</span>
        </button>
        <h3>{item.name}</h3>
      </div>

      <div className="image--large">
        {isOpen && (
          <iframe
            tabIndex={-1}
            frameBorder="0"
            allowFullScreen
            title={item.name}
            src={`${item.embedUrl}?autostart=1`}
            width="100%"
            height="450px"
          ></iframe>
        )}
      </div>
      <div className="description">
        <div className="user-info">
          <a href={item.user.profileUrl} className="user-info__link">
            <h4 className="label-aut">Author</h4>
            <span className="content-link">
              <img src={userAvatar.url} alt={item.user.displayName} />
              <p className="content-link__text">{item.user.displayName}</p>
            </span>
          </a>
        </div>
        <hr />
        <ReactMarkdown source={item.description} escapeHtml={false} />
      </div>
    </div>
  );
};

CardDetails.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};
export default memo(CardDetails);
