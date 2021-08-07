import React from "react";
import homeStyle from "./home.module.css";

import { GoVerified } from "react-icons/go";

import { useVideosContext } from "../../context/VideosContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const {
    state: { videos, history },
    dispatch,
  } = useVideosContext();
  return (
    <div className={homeStyle.container}>
      <div className={homeStyle.grid}>
        {videos?.map(
          ({ id, logo, channel, thumbnail, verified, intro, duration }) => (
            <Link
              key={id}
              to={`/watch/${id}`}
              className={homeStyle.link}
              onClick={() => {
                if (history.find((vid) => vid.id === id)) {
                  // return dispatch({
                  //   type: "CHANGE-HISTORY",
                  //   payload: videos?.find((vid) => vid.id === id),
                  // });
                  return console.log("In History");
                }
                dispatch({
                  type: "HISTORY",
                  payload: videos?.find((video) => video.id === id),
                });
              }}
            >
              <div className={homeStyle.card}>
                <figure style={{ position: "relative" }}>
                  <img
                    src={thumbnail}
                    alt="channel"
                    style={{ width: "100%" }}
                  />
                  <span className={homeStyle.duration}>{duration}</span>
                </figure>

                <div className={homeStyle.cardBody}>
                  <div className={homeStyle.cardHead}>
                    <figure>
                      <img src={logo} alt="channel" />
                    </figure>
                  </div>
                  <div className={homeStyle.cardText}>
                    <p>{intro}</p>
                    <p className={homeStyle.channel}>
                      {channel} &nbsp;
                      {verified && (
                        <GoVerified
                          style={{ position: "absolute", top: "0.12rem" }}
                        />
                      )}
                    </p>{" "}
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};
