import React, { useState, lazy, Suspense, memo, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import _throttle from "lodash/throttle";
import { isMobile, isBottom } from "../../utils/index";
import Card from "./Card";
import Loader from "../loader/Loader";

import "./card-list.scss";

const CardDetailsDesktop = lazy(() => import("../card-details/CardDetails"));

const CardList = ({ location }) => {
  const [currentElem, setCurrentElem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [models, setModels] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [isloadingNext, setIsLoadingNext] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [reset, setReset] = useState(false);

  const handleScroll = () => {
    setLoadMore(isBottom());
    const mobile = isMobile();
    // hide header when scroll on desktop
    if (!mobile) {
      const expandedEl = document.getElementsByClassName(
        "image--expand is-expanded"
      );
      const headerEl = document.getElementById("header-app");
      if (expandedEl.length && window.scrollY > 80) {
        headerEl.style.display = "none";
      } else {
        headerEl.style.display = "block";
      }
    }
  };

  const trottledFunction = _throttle(handleScroll, 300);

  useEffect(() => {
    window.addEventListener("scroll", trottledFunction);
    return () => {
      //console.log("will unmount");
      window.removeEventListener("scroll", trottledFunction);
    };
  }, []);

  useEffect(() => {
    if (cursor && loadMore) {
      loadModels(location.pathname, loadMore);
      setLoadMore(false);
    }
  }, [loadMore, cursor]);

  useEffect(() => {
    onReset();
  }, [location.pathname]);

  useEffect(() => {
    if (reset && !models.length) {
      loadModels(location.pathname);
    }
  }, [reset, location.pathname, models, cursor, loadMore]);

  const loadModels = (pathname, loadMore) => {
    const next = cursor && loadMore;
    if (next) {
      setIsLoadingNext(true);
    } else {
      setIsLoading(true);
    }
    const url = next ? `api${pathname}?cursors=${cursor}` : `api${pathname}`;

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (next) {
          setIsLoadingNext(false);
        } else {
          setIsLoading(false);
        }
        setModels([...models, ...data.results]);
        setCursor(data.cursors.next);
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  const handleToggle = e => {
    const clickedEl = e.target.closest(".card");
    if (currentElem && clickedEl.id === currentElem.id) {
      onClose();
    } else {
      setCurrentElem(clickedEl);
      setSelectedItem(models.find(item => item.uid === clickedEl.id));
    }
  };

  const onClose = () => {
    setCurrentElem(null);
    setSelectedItem(null);
  };

  const onReset = () => {
    onClose();
    setModels([]);
    setCursor(null);
    setLoadMore(false);
    setReset(true);
  };

  const currentId = currentElem ? currentElem.id : currentElem;
  const isOpen = selectedItem && selectedItem.uid === currentId;
  const hasNext = cursor;
  return (
    <>
      <div className="card--wrapper">
        {isloading ? (
          <Loader />
        ) : (
          <>
            <div
              className={classNames("card-grid", {
                "is-shifted": selectedItem
              })}
            >
              {models.map(item => (
                <Card
                  key={item.uid}
                  item={item}
                  isOpen={item.uid === currentId}
                  onToggle={handleToggle}
                  onClose={onClose}
                />
              ))}
              {hasNext && isOpen && (
                <button
                  type="button"
                  onClick={() => setLoadMore(true)}
                  className="loadMore"
                >
                  Load More
                </button>
              )}
            </div>
            {!isMobile() && selectedItem && (
              <Suspense fallback={<Loader />}>
                <CardDetailsDesktop
                  item={selectedItem}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              </Suspense>
            )}
          </>
        )}
      </div>
      {isloadingNext && <Loader withClassName="next" />}
    </>
  );
};

CardList.propTypes = {
  location: PropTypes.object.isRequired
};

export default memo(withRouter(CardList));
