import React, { lazy, Suspense, memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import TooltipUser from "../tooltip/TooltipUser";
import Loader from "../loader/Loader";
import { isMobile } from "../../utils/index";

import "./card.scss";

const CardDetails = lazy(() => import("../card-details/CardDetails"));

const Card = ({ item, onToggle, isOpen, onClose }) => {
  const {
    uid,
    name,
    thumbnails: { images },
    user
  } = item;
  const image = images.find(image => image.width >= 1024) || images[0];
  const mobile = isMobile();
  return (
    <div id={uid} className="card">
      <button
        onClick={onToggle}
        type="button"
        className={classNames("image--basic", { open: isOpen })}
      >
        <img className="basic__img" src={image.url} alt={name} />
        <div className="image--info">
          {!mobile && <TooltipUser user={user} />}
          <p className="title">{name}</p>
        </div>
      </button>
      <Suspense fallback={<Loader />}>
        {isOpen && mobile && (
          <CardDetails item={item} onClose={onClose} isOpen={isOpen} />
        )}
      </Suspense>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default memo(Card);
