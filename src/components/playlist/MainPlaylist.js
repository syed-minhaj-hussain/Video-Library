import React, { useState } from "react";
import { useVideosContext } from "../../context/VideosContext";
import mainStyle from "./playlist.module.css";
import { PlaylistNames } from "./PlaylistNames";
import { PlaylistVideos } from "./PlaylistVideos";

export const MainPlaylist = () => {
  const [name, setName] = useState();
  const {
    state: { playlist },
  } = useVideosContext();
  const getPlayListNames = playlist?.map(({ name }) => name);
  console.log(getPlayListNames);
  return (
    <div className={mainStyle.container}>
      <PlaylistNames setName={setName} />
      <PlaylistVideos />
    </div>
  );
};
