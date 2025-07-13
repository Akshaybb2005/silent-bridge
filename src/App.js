import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Convert from "./Pages/Convert";
import Home from "./Pages/Home";
import LearnSign from "./Pages/LearnSign";
import Video from "./Pages/Video";
import Navbar from "./Components/Navbar";
import CreateVideo from "./Pages/CreateVideo";

import Videos from "./Pages/Videos";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/silent-bridge/home" element={<Home />} />
          <Route exact path="/silent-bridge/convert" element={<Convert />} />
          <Route
            exact
            path="/silent-bridge/learn-sign"
            element={<LearnSign />}
          />
          <Route exact path="/silent-bridge/all-videos" element={<Videos />} />
          <Route
            exact
            path="/silent-bridge/video/:videoId"
            element={<Video />}
          />
          <Route
            exact
            path="/silent-bridge/create-video"
            element={<CreateVideo />}
          />

          <Route exact path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
