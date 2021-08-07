import React from "react";
import homeStyle from "./home.module.css";

import { GoVerified } from "react-icons/go";

import { useVideosContext } from "../../context/VideosContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const {
    state: { videos },
  } = useVideosContext();
  return (
    <div className={homeStyle.container}>
      <div className={homeStyle.grid}>
        {videos?.map(
          ({ id, name, logo, channel, thumbnail, verified, url, intro }) => (
            <Link key={id} to={`/watch/${id}`} className={homeStyle.link}>
              <div className={homeStyle.card}>
                <figure>
                  <img
                    src={thumbnail}
                    alt="channel"
                    style={{ width: "100%" }}
                  />
                </figure>
                <div className={homeStyle.cardBody}>
                  <div className={homeStyle.cardHead}>
                    <figure>
                      <img src={logo} alt="channel" />
                    </figure>
                  </div>
                  <div className={homeStyle.cardText}>
                    <p>{intro}</p>
                    <p
                      style={{
                        color: "rgb(170,170,170)",
                        fontSize: "1rem",
                        position: "relative",
                        marginTop: " 0.1rem",
                      }}
                    >
                      {channel} &nbsp;
                      <GoVerified
                        style={{ position: "absolute", top: "0.12rem" }}
                      />
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
