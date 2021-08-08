import React from "react";
import { useVideosContext } from "../../context/VideosContext";
import nameStyle from "./playlist.module.css";

export const PlaylistNames = () => {
  const {
    state: { playlist },
  } = useVideosContext();
  return (
    <>
      {playlist.map(({ id, name }) => (
        <button key={id} className={nameStyle.listBtn}>
          {name}
        </button>
      ))}
    </>
  );
};
