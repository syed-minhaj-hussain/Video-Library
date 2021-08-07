import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/nav/Navbar";
import { Home } from "./components/home/Home";
import { Footer } from "./components/footer/Footer";
import { VideoPlayer } from "./components/videoPlayer/VideoPlayer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<VideoPlayer />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
