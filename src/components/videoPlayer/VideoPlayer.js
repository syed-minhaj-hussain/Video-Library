import React from "react";
import videoStyle from "./video.module.css";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import { useVideosContext } from "../../context/VideosContext";
import { AiFillEye, AiFillLike, AiOutlineLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";

export const VideoPlayer = () => {
  const {
    state: { videos, liked, playlist, watchLater },
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
      <div className={videoStyle.videoBody}>
        <>
          <p className={videoStyle.title}>{findVideoUrlById?.name}</p>
        </>
        <div className={videoStyle.subTitle}>
          <div>
            15k <AiFillEye /> | 1 month ago
          </div>
          <div>
            <span className={videoStyle.right}>
              <AiFillLike /> Liked
            </span>
            <span className={videoStyle.right}>
              <MdWatchLater /> Later
            </span>
            <span className={videoStyle.right}>
              <FaListAlt /> My-Playlist
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
