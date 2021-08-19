import React, { useEffect } from "react";
import { useVideosContext } from "../../context/VideosContext";
import historyStyle from "./history.module.css";
import axios from "axios";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export const History = () => {
  const {
    state: { history },
    dispatch,
  } = useVideosContext();

  return (
    <div className={historyStyle.container}>
      <h1 className={historyStyle.title}>Your Watch History!</h1>
      <div className={historyStyle.grid}>
        {history?.map(({ history }) => console.log(history))}
        {history?.map((hist) => console.log(hist))}
        {history?.map(({ _id, thumbnail, intro, channel }) => (
          <div className={historyStyle.main} key={_id}>
            <Link to={`/watch/${_id}`} className={historyStyle.link}>
              <div className={historyStyle.card}>
                <figure>
                  <img src={thumbnail} alt={channel} />
                </figure>
                <div className={historyStyle.cardBody}>
                  <p className={historyStyle.intro}>{intro}</p>
                  <p className={historyStyle.channel}>{channel}</p>
                </div>
              </div>
            </Link>
            <TiDelete
              className={historyStyle.delete}
              onClick={() =>
                dispatch({ type: "REMOVE-FROM-HISTORY", payload: _id })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
