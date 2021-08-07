import React from "react";
import homeStyle from "./home.module.css";

import { useVideosContext } from "../../context/VideosContext";
import { videos } from "../../videosDB";

export const Home = () => {
  const { Videos } = useVideosContext();
  return (
    <div className={homeStyle.container}>
      <div className={homeStyle.grid}>
        {videos?.map(
          ({ id, name, logo, channel, thumbnail, verified, url }) => (
            <div className={homeStyle.card}>
              <figure>
                <img src={thumbnail} alt="channel" style={{ width: "100%" }} />
              </figure>
              <div className={homeStyle.cardBody}>
                <div className={homeStyle.cardHead}>
                  <figure>
                    <img src={logo} alt="channel" />
                  </figure>
                </div>
                <div className={homeStyle.cardText}>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Sunt, aperiam?
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
