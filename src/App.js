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
  const { isUserLoggedIn, setIsUserLoggedIn } = useAuthContext();
  const {
    state: { videos },
    dispatch,
  } = useVideosContext();
  console.log(videos);
  const navigate = useNavigate();
  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("loginStatus"));
    if (response?.status === true) {
      setIsUserLoggedIn(true);
      navigate(response?.path);
      console.log(response?.path);
    }
  }, []);
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
          isUserLoggedIn={isUserLoggedIn}
          path="/likedVideos"
          element={<LikedVideos />}
        />
        <PrivateRoute
          isUserLoggedIn={isUserLoggedIn}
          path="/history"
          element={<History />}
        />
        <PrivateRoute
          isUserLoggedIn={isUserLoggedIn}
          path="/playlist"
          element={<MainPlaylist />}
        />
        <PrivateRoute
          isUserLoggedIn={isUserLoggedIn}
          path="/watchLater"
          element={<WatchLater />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
