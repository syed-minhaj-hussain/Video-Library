import React, { useState, useEffect } from "react";
import { useVideosContext } from "../../context/VideosContext";
import mainStyle from "./playlist.module.css";
import { PlaylistNames } from "./PlaylistNames";
import { PlaylistVideos } from "./PlaylistVideos";

export const MainPlaylist = () => {
  const {
    state: { playlist },
    dispatch,
  } = useVideosContext();

  useEffect(() => {
    setTimeout(
      () =>
        dispatch({
          type: "PLAYLIST-UPDATED",
          payload: JSON.parse(localStorage.getItem("myPlaylist")) || [],
        }),
      3000
    );
  }, []);

  useEffect(
    () => localStorage.setItem("myPlaylist", JSON.stringify(playlist)),
    [playlist]
  );

  const getPlayListNames = playlist?.map(({ name }) => name);
  console.log(getPlayListNames);
  const [name, setName] = useState(getPlayListNames[0]);
  return (
    <div className={mainStyle.container}>
      <PlaylistNames setName={setName} />
      <PlaylistVideos name={name} />
    </div>
  );
};
