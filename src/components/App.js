import { Home, Login, Sign } from "../pages";

import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <button onClick={putData}>put data</button> */}
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Sign />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
