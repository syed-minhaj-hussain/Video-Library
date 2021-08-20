import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { Navbar } from "./components/nav/Navbar";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Home } from "./components/home/Home";
import { VideoPlayer } from "./components/videoPlayer/VideoPlayer";
import { PrivateRoute } from "./components/privateRoutes/PrivateRoute";
import { History } from "./components/history/History";
import { LikedVideos } from "./components/liked/LikedVideos";
import { MainPlaylist } from "./components/playlist/MainPlaylist";
import { WatchLater } from "./components/watchLater/WatchLater";
import { Footer } from "./components/footer/Footer";
import axios from "axios";
import { useVideosContext } from "./context/VideosContext";

function App() {
  const { auth } = useAuthContext();
  const { state, dispatch } = useVideosContext();
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://clink-player-backend.herokuapp.com/videos"
        );
        dispatch({ type: "UPLOAD-VIDEOS", payload: response?.data?.videos });
      } catch (err) {
        console.log({ err });
      }
    })();
    (async function () {
      try {
        const response = await axios.get(
          "https://clink-player-backend.herokuapp.com/watchLater",
          { headers: { authorization: auth } }
        );
        dispatch({
          type: "UPLOAD-WATCH-LATER",
          payload: response?.data?.watchLater,
        });
        console.log({ response });
      } catch (err) {
        console.log({ err });
      }
    })();
    (async function () {
      try {
        const {
          data: { playlist },
        } = await axios.get(
          "https://clink-player-backend.herokuapp.com/playlist",
          { headers: { authorization: auth } }
        );
        if (playlist) {
          dispatch({
            type: "UPLOAD-PLAYLIST",
            payload: playlist ? playlist : [],
          });
        }
        console.log(playlist);
      } catch (err) {
        console.log({ err });
      }
    })();
    (async function () {
      try {
        const {
          data: { history },
        } = await axios.get(
          "https://clink-player-backend.herokuapp.com/history",
          { headers: { authorization: auth } }
        );
        if (history) {
          dispatch({
            type: "UPLOAD-HISTORY",
            payload: history ? history : [],
          });
        }
        console.log("Home :", history);
        // const getData = history[0].history.map((item) => item);
        // console.log(getData);
      } catch (err) {
        console.log({ err });
      }
    })();
    (async function () {
      try {
        const response = await axios.get(
          `https://clink-player-backend.herokuapp.com/likedVideos/`,
          { headers: { authorization: auth } }
        );
        // console.log(response);
        dispatch({
          type: "UPLOAD-LIKED-VIDEOS",
          payload: response?.data?.likedVideo,
        });
        console.log(response);
      } catch (err) {
        console.log({ err });
      }
    })();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:_id" element={<VideoPlayer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <PrivateRoute
          auth={auth}
          path="/likedVideos"
          element={<LikedVideos />}
        />
        <PrivateRoute auth={auth} path="/history" element={<History />} />
        <PrivateRoute auth={auth} path="/playlist" element={<MainPlaylist />} />
        <PrivateRoute auth={auth} path="/watchLater" element={<WatchLater />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
