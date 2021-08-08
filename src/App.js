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

function App() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("loginStatus"));
    if (response?.status === true) {
      setIsUserLoggedIn(true);
      navigate(response?.path);
      console.log(response?.path);
    }
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<VideoPlayer />} />
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
