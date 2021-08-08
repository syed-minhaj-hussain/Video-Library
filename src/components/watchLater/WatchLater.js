import React from "react";
import { useVideosContext } from "../../context/VideosContext";
import watchLaterStyle from "../history/history.module.css";

import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";

export const WatchLater = () => {
  const {
    state: { watchLater },
    dispatch,
  } = useVideosContext();
  // const rev = watchLater.reverse();
  console.log({ watchLater });
  return (
    <div className={watchLaterStyle.container}>
      <h1 className={watchLaterStyle.title}>Watch When You're Free!</h1>
      <div className={watchLaterStyle.grid}>
        {watchLater?.map(({ id, thumbnail, intro, channel }) => (
          <div className={watchLaterStyle.main}>
            {" "}
            <Link to={`/watch/${id}`} className={watchLaterStyle.link} key={id}>
              <div className={watchLaterStyle.card}>
                <figure>
                  <img src={thumbnail} alt={channel} />
                </figure>
                <div className={watchLaterStyle.cardBody}>
                  <p className={watchLaterStyle.intro}>{intro}</p>
                  <p className={watchLaterStyle.channel}>{channel}</p>
                </div>
              </div>
            </Link>
            <TiDelete
              className={watchLaterStyle.delete}
              onClick={() =>
                dispatch({ type: "REMOVE-FROM-WATCH-LATER", payload: id })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
