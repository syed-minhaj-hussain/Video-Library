import React from "react";
import videoStyle from "./video.module.css";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import { useVideosContext } from "../../context/VideosContext";
import { AiFillEye } from "react-icons/ai";

export const VideoPlayer = () => {
  const {
    state: { videos },
  } = useVideosContext();
  const { id } = useParams();

  console.log({ id });
  const findVideoUrlById = videos?.find((video) => video.id === Number(id));
  // console.log(findVideoUrlById);
  return (
    <div className={videoStyle.container}>
      <>
        <ReactPlayer
          url={findVideoUrlById?.url}
          playing
          controls
          className={videoStyle.player}
          width="80%"
          height="80%"
        />
      </>
      <>
        <p className={videoStyle.title}>{findVideoUrlById?.name}</p>
      </>
      <p className={videoStyle.subTitle}>
        15k <AiFillEye /> | 1 month ago
      </p>
    </div>
  );
};
