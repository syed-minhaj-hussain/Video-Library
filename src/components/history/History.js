import React from "react";
import { useVideosContext } from "../../context/VideosContext";
import historyStyle from "./history.module.css";

import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";

export const History = () => {
  const {
    state: { history },
    dispatch,
  } = useVideosContext();
  // const rev = history.reverse();
  console.log({ history });
  return (
    <div className={historyStyle.container}>
      <div className={historyStyle.grid}>
        {history?.map(({ id, thumbnail, intro, channel }) => (
          <div className={historyStyle.main}>
            {" "}
            <Link to={`/watch/${id}`} className={historyStyle.link} key={id}>
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
                dispatch({ type: "REMOVE-FROM-HISTORY", payload: id })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
