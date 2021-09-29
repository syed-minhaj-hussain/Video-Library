import React from "react";
import { useVideosContext } from "../../context/VideosContext";
import nameStyle from "./playlist.module.css";

export const PlaylistNames = ({ setName, name }) => {
  const {
    state: { playlist },
  } = useVideosContext();
  return (
    <>
      {playlist.map(({ id, name: pName }) => (
        <button
          key={id}
          className={nameStyle.listBtn}
          onClick={() => setName(pName)}
          style={{
            backgroundColor: `${name === pName ? "red" : "#fff"}`,
            color: `${name === pName ? "#fff" : "#000"}`,
          }}
        >
          {pName}
        </button>
      ))}
    </>
  );
};
