import React from "react";
import { useVideosContext } from "../../context/VideosContext";
import likedStyle from "../history/history.module.css";

import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";

export const LikedVideos = () => {
  const {
    state: { liked },
    dispatch,
  } = useVideosContext();
  // const rev = liked.reverse();
  console.log({ liked });
  return (
    <div className={likedStyle.container}>
      <h1 className={likedStyle.title}>Videos You've Liked!</h1>
      <div className={likedStyle.grid}>
        {liked?.map(({ id, thumbnail, intro, channel }) => (
          <div className={likedStyle.main}>
            {" "}
            <Link to={`/watch/${id}`} className={likedStyle.link} key={id}>
              <div className={likedStyle.card}>
                <figure>
                  <img src={thumbnail} alt={channel} />
                </figure>
                <div className={likedStyle.cardBody}>
                  <p className={likedStyle.intro}>{intro}</p>
                  <p className={likedStyle.channel}>{channel}</p>
                </div>
              </div>
            </Link>
            <TiDelete
              className={likedStyle.delete}
              onClick={() =>
                dispatch({ type: "REMOVE-FROM-LIKED", payload: id })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
