import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import ScoreBoard from "./views/ScoreBoard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
      </Routes>
    </>
  );
}

export default App;
