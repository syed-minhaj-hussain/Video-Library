import { createContext, useReducer, useContext, useEffect } from "react";
import { reducerFunc } from "../utilities";
import axios from "axios";
import { useAuthContext } from "./AuthContext";
const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, {
    liked: [],
    history: JSON.parse(localStorage.getItem("history")) || [],
    playlist: JSON.parse(localStorage.getItem("myPlaylist")) || [],
    watchLater: [],
    videos: null,
  });
  const { auth } = useAuthContext();
  useEffect(
    () => localStorage.setItem("myPlaylist", JSON.stringify(state.playlist)),
    [state.playlist]
  );
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(state.history));
  }, [state.history]);
  useEffect(() => {
    (async function () {
      setTimeout(async () => {
        try {
          const response = await axios.post(
            "https://clink-player-backend.herokuapp.com/history",
            state?.history,
            { headers: { authorization: auth } }
          );

          console.log("History");
          // console.log(response?.data?.savedHistory);
        } catch (err) {
          console.log({ historyErr: err });
        }
      }, 1000);
    })();
  }, [state?.history]);
  useEffect(() => {
    (async function () {
      setTimeout(async () => {
        try {
          console.log("PLAYLIST");
          const response = await axios.post(
            "https://clink-player-backend.herokuapp.com/playlist",
            state?.playlist,
            { headers: { authorization: auth } }
          );
          // console.log(response?.data?.savedPlaylist);
        } catch (err) {
          console.log({ err });
        }
      }, 1000);
    })();
  }, [state?.playlist]);

  // useEffect(() => {
  //   (async function () {
  //     // console.log("Liked");
  //     if (auth) {
  //       //   setTimeout(async () => {
  //       try {
  //         const response = await axios.get(
  //           "https://clink-player-backend.herokuapp.com/likedVideos",
  //           { headers: { authorization: auth } }
  //         );
  //         if (response?.data?.success === true) {
  //           // console.log("Like Updated");
  //           dispatch({
  //             type: "UPLOAD-LIKED-VIDEOS",
  //             payload: response?.data?.likedVideo,
  //           });
  //         }
  //       } catch (err) {
  //         console.log({ likedErr: err });
  //       }
  //       //   }, 1000);
  //     }
  //   })();
  // }, [state?.liked, auth]);

  // console.log(state.history);

  return (
    <VideosContext.Provider value={{ state, dispatch }}>
      {children}
    </VideosContext.Provider>
  );
};

export const useVideosContext = () => useContext(VideosContext);
