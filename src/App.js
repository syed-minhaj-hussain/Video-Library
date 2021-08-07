import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/nav/Navbar";
import { Home } from "./components/home/Home";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
