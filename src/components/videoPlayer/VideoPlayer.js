import React from "react";
import videoStyle from "./video.module.css";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import { useVideosContext } from "../../context/VideosContext";
import { AiFillEye, AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";

export const VideoPlayer = () => {
  const {
    state: { videos, liked, playlist, watchLater },
    dispatch,
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
          width="95%"
          height="60%"
        />
      </>
      <>
        <div className={videoStyle.videoBody}>
          <>
            <p className={videoStyle.title}>{findVideoUrlById?.name}</p>
          </>

          <div className={videoStyle.subTitle}>
            <div>
              15k <AiFillEye /> | 1 month ago
            </div>
            <div className={videoStyle.icons}>
              <span className={videoStyle.right}>
                <button
                  className={videoStyle.btn}
                  onClick={() => {
                    if (liked?.find((vid) => vid.id === Number(id))) {
                      return console.log("VIDEO-ALREADY-LIKED");
                    }
                    dispatch({
                      type: "LIKE",
                      payload: videos?.find((vid) => vid.id === Number(id)),
                    });
                  }}
                >
                  <AiFillLike /> <br /> Liked
                </button>{" "}
              </span>
              <span className={videoStyle.right}>
                <button
                  className={videoStyle.btn}
                  onClick={() => {
                    if (watchLater?.find((vid) => vid.id === Number(id))) {
                      return console.log("Already In List");
                    }
                    dispatch({
                      type: "WATCH-LATER",
                      payload: videos?.find((vid) => vid.id === Number(id)),
                    });
                  }}
                >
                  {" "}
                  <MdWatchLater /> <br /> Later
                </button>{" "}
              </span>
              <span className={videoStyle.right}>
                <button className={videoStyle.btn}>
                  {" "}
                  <FaListAlt /> <br /> My-Playlist
                </button>
              </span>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
