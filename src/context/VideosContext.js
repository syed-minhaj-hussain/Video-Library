import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { axios } from "axios";
import { reducerFunc } from "../utilities";

const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, {
    liked: [],
    history: [],
    playlist: [],
    watchLater: [],
    videos: null,
  });
  useEffect(() => {
    dispatch({
      type: "LIKED-UPDATED",
      payload: JSON.parse(localStorage.getItem("myLiked")) || [],
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "HISTORY-UPDATED",
      payload: JSON.parse(localStorage.getItem("myHistory")) || [],
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "WATCH-LATER-UPDATED",
      payload: JSON.parse(localStorage.getItem("myWatchLater")) || [],
    });
  }, []);

  useEffect(
    () =>
      dispatch({
        type: "CHANGE-HISTORY-UPDATED",
        payload: JSON.parse(localStorage.getItem("myHistory")) || [],
      }),
    []
  );

  useEffect(
    () =>
      dispatch({
        type: "PLAYLIST-UPDATED",
        payload: JSON.parse(localStorage.getItem("myPlaylist")) || [],
      }),
    []
  );

  useEffect(
    () => localStorage.setItem("myHistory", JSON.stringify(state.history)),
    [state.history]
  );

  useEffect(
    () => localStorage.setItem("myLiked", JSON.stringify(state.liked)),
    [state.liked]
  );
  useEffect(
    () =>
      localStorage.setItem("myWatchLater", JSON.stringify(state.watchLater)),
    [state.watchLater]
  );
  useEffect(
    () => localStorage.setItem("myPlaylist", JSON.stringify(state.playlist)),
    [state.playlist]
  );

  return (
    <VideosContext.Provider value={{ state, dispatch }}>
      {children}
    </VideosContext.Provider>
  );
};

export const useVideosContext = () => useContext(VideosContext);
