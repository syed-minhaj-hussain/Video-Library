import React, { useState } from "react";
import videoStyle from "./video.module.css";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import { useVideosContext } from "../../context/VideosContext";
import { AiFillEye, AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { Playlist } from "../playlist/Playlist";

export const VideoPlayer = () => {
  const [show, setShow] = useState(false);
  const {
    state: { videos, liked, watchLater },
    dispatch,
  } = useVideosContext();
  const { id } = useParams();

  const findVideoById = videos?.find((video) => video.id === Number(id));

  const isVideoLiked = liked?.find((vid) => vid.id === Number(id));
  const isVideoInWatchLater = watchLater?.find((vid) => vid.id === Number(id));
  return (
    <div className={videoStyle.container}>
      <div className={videoStyle.wrapper}>
        <ReactPlayer
          url={findVideoById?.url}
          playing
          controls
          width="100%"
          height="100%"
          className={videoStyle.player}
        />
      </div>
      <>
        <div className={videoStyle.videoBody}>
          <>
            <p className={videoStyle.title}>{findVideoById?.name}</p>
          </>

          <div className={videoStyle.subTitle}>
            <div className={videoStyle.left}>
              15k <AiFillEye /> | 1 month ago
            </div>
            <div className={videoStyle.right}>
              <span className={videoStyle.icons}>
                <button
                  className={videoStyle.btn}
                  onClick={() => {
                    if (isVideoLiked) {
                      dispatch({
                        type: "REMOVE-FROM-LIKED",
                        payload: Number(id),
                      });
                      return console.log("VIDEO-ALREADY-LIKED");
                    }
                    dispatch({
                      type: "LIKE",
                      payload: videos?.find((vid) => vid.id === Number(id)),
                    });
                  }}
                >
                  <AiFillLike
                    style={{ color: `${isVideoLiked ? "red" : "#fff"}` }}
                  />
                </button>
              </span>
              <span className={videoStyle.icons}>
                <button
                  className={videoStyle.btn}
                  onClick={() => {
                    if (isVideoInWatchLater) {
                      dispatch({
                        type: "REMOVE-FROM-WATCH-LATER",
                        payload: Number(id),
                      });
                      return console.log("Already In List");
                    }
                    dispatch({
                      type: "WATCH-LATER",
                      payload: videos?.find((vid) => vid.id === Number(id)),
                    });
                  }}
                >
                  <MdWatchLater
                    style={{ color: `${isVideoInWatchLater ? "red" : "#fff"}` }}
                  />
                </button>
              </span>
              <span className={videoStyle.icons}>
                <button
                  className={videoStyle.btn}
                  onClick={() => setShow((prev) => !prev)}
                >
                  <FaListAlt />
                </button>
              </span>
            </div>
          </div>
        </div>
      </>
      <div
        style={{ display: `${show ? "block" : "none"}` }}
        className={videoStyle.list}
      >
        <Playlist setShow={setShow} video={findVideoById} id={Number(id)} />
      </div>
    </div>
  );
};
